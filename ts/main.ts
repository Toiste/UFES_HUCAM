import {asyncLocalStorage, createOrLoadSave, localStorageKeyNameReset, saveSave} from "./save";
import {answerOptions, totalLivesPerRound} from "./data";
import {
    EShowAfterQuestion,
    optionsContainer,
    progressContainer,
    roundCounter,
    setAfterAnswerResult,
    setResultAfterEnd,
    setTotalTime,
    startBtnElement,
    startScreen,
    stepContainer,
    toggleAfterAnswerResultVisibility,
    trashNameElement,
    updateQuestionsProgress,
    vidas
} from "./elements";
import {ETypeTimePerQuestion, Save} from "./types";
import {getTimeDifference, getTotalMsTimeAllQuestions} from "./utils";
import {gifCheckMark, gifConfetti, gifLike, gifWarning, gifWrongDecision} from "./assets";

let dots = 0;
let groupSelected: string | null = null;
let saveObject = {} as Save;
let dotsInterval = setInterval(() => {
    startBtnElement.textContent = "Carregando" + ".".repeat(dots);
    if (dots >= 3) dots = 0;
    else dots = dots + 1;
}, 500)

createOrLoadSave().then(x => {
    // console.log("loaded or created")
    saveObject = x;
}).then(() => {
    // console.log("prepping")
    prepStart()
    // console.log("prepped")
}).then(() => {
    // console.log("starting")
    start()
    // console.log("started")
})

function prepStart() {
    // console.log("saveObject",saveObject)
    clearInterval(dotsInterval);
    startBtnElement.textContent = "Começar";
    // startBtnElement.className = "start-button";

    startBtnElement.addEventListener("click", function () {
        startScreen.classList.add("hidden"); // Adiciona a classe que ativa o fade-out
        //Se o save foi carregado finalizado, não mostrar ao carregar
        if (isFinalizedOrHasNoLivesRemaining()) return;
        setTimeout(() => {
            startScreen.style.display = "none"; // Remove a tela depois da animação
            stepContainer.style.display = "block";
            optionsContainer.style.display = "flex";
            progressContainer.style.display = "flex";
        }, 1000); // Tempo deve ser igual ao da animação (1s)
        start()

    });
    // console.log("removing")
    asyncLocalStorage.getItem(localStorageKeyNameReset).then(x=> {
        // console.log("removing 2")
        if(x !== null || window.location.hostname === "localhost"){
            // console.log("removing 3")
            return asyncLocalStorage.removeItem(localStorageKeyNameReset).then(()=> {
                startBtnElement.click()
                // console.log("removed")
            });
        }
    })
    //
    // if (window.localStorage.getItem(localStorageKeyNameReset) !== null) {
    //     // console.log("aaaa")
    //     asyncLocalStorage.removeItem(localStorageKeyNameReset).then(()=> startBtnElement.click());
    //     // showResults()
    // }

}

function start() {
    updateVisuals()
    //Se carregou o save finalizado ou sem vida, mostra direto a parte de resultados
    if (isFinalizedOrHasNoLivesRemaining())
        showResults()
    else
        loadStep()
}

function isFinalizedOrHasNoLivesRemaining() {
    // console.log("isLastQuestionOfLastRound() || hasNoLivesRemaining()", isLastQuestionOfLastRound() || hasNoLivesRemaining())
    return isLastQuestionOfLastRound() || hasNoLivesRemaining();
}

function hasNoLivesRemaining() {
    return saveObject.currentRoundLives === 0
}

/*
* Verifica se a resposta dada era a última do round
*/
function isLastQuestionOfRound() {
    const round = saveObject.rounds[saveObject.currentRound];
    const roundQuestionsNum = round.length;
    const lastQuestion = roundQuestionsNum - 1;
    return saveObject.currentQuestion === lastQuestion
}

function isLastRound() {
    const lastRound = saveObject.rounds.length - 1;
    return saveObject.currentRound === lastRound;
}

/*
* Verifica se a resposta dada era a última do ultimo round
*/
function isLastQuestionOfLastRound() {
    return isLastQuestionOfRound() && isLastRound();
}

/*
* Pula para a próxima pergunta. Caso seja a última pergunta do round, pula para o próximo round.
*/
function updateCurrentRoundAndQuestion() {
    if (isLastQuestionOfRound()) {
        saveObject.currentRound++;
        saveObject.currentQuestion = 0;
        saveObject.currentRoundLives = totalLivesPerRound;
        return;
    }
    //If it's not the end of the round, goes to the next question
    saveObject.currentQuestion++;
}

/*
* Diminui a vida caso tenha errado a resposta
*/
function removerVida() {
    saveObject.currentRoundLives -= 1;
    //Sei la, vai que conseguem burlar a contagem e diminiuir mais vidas
    if (saveObject.currentRoundLives < 0) saveObject.currentRoundLives = 0
}


/*
* Atualiza a visualização do round atual
*/
function updateRoundNumber() {
    roundCounter.innerText = `${saveObject.currentRound + 1} de ${saveObject.rounds.length}`
}

/*
* Atualiza a visualização das vidas
*/
function atualizarVidas() {
    vidas.innerHTML = `<span  style="font-size: 25px;transform: scale(.5,1)">&#129505;&nbsp;x${saveObject.currentRoundLives}</span>`
}

function setTimePerQuestion(
    type: ETypeTimePerQuestion,
) {
    const key = `${saveObject.currentRound}-${saveObject.currentQuestion}`;
    const getUTCMillisecondsNow = () => new Date().getTime();
    if (type === ETypeTimePerQuestion.END) {
        saveObject.timePerQuestion[key][1] = getUTCMillisecondsNow();
        return;
    }
    saveObject.timePerQuestion[key] = [getUTCMillisecondsNow(), 0];
}


/*
* Pega o lixo/resíduo que deve ser categorizado
* Limpa as opções no container de respostas
* Gera as possíveis respostas para ele
* Adiciona as opções no container de respostas
* */
function getNextTrashAndGenerateAnswersOptions() {
    const currentTrash = saveObject.rounds[saveObject.currentRound][saveObject.currentQuestion];

    trashNameElement.textContent = `${currentTrash.name}`;
    optionsContainer.innerHTML = "";

    answerOptions.forEach(group => {
        if (currentTrash.hideGroups.length > 0 && currentTrash.hideGroups.includes(group.name))
            return
        const card = document.createElement("div");
        card.classList.add("option-card");
        card.innerHTML = `
            <img src="assets/images/${group.image}" alt="${group.name}">
            <p>${group.name}</p>
        `;
        card.addEventListener("click", (event) => selectGroup(event, group.name, currentTrash.group));
        optionsContainer.appendChild(card);
    });
}

/*
* Carrega cada passo de pergunta:
* - Salva o progresso até o momento
* - Pega a próxima pergunta
* - Monta as opões e os eventos de resposta
*/
function loadStep() {
    groupSelected = null;
    void saveSave(saveObject);
    getNextTrashAndGenerateAnswersOptions()
    setTimePerQuestion(ETypeTimePerQuestion.START);

}

/*
* Verifica se o grupo selecionado foi correto ou não. Caso não, remove uma vida. Caso sim, adiciona na qtd de respostas corretas
*/
function selectGroup(event: MouseEvent, selectedGroup: string, correctGroup: string) {
    // console.log("groupSelected before", groupSelected);
    if (groupSelected !== null) return;
    const target = event.currentTarget as HTMLElement;
    groupSelected = selectedGroup;
    // console.log("groupSelected after", groupSelected);
    setTimePerQuestion(ETypeTimePerQuestion.END);


    const correctAnswer = selectedGroup === correctGroup;
    if (correctAnswer) {
        saveObject.correctAnswers++;
        target.classList.add("correct")
        if (isLastQuestionOfLastRound())
            return handleRespostaPergunta(EShowAfterQuestion.GAME_END);
        if (isLastQuestionOfRound()) {
            return handleRespostaPergunta(EShowAfterQuestion.ROUND_END);
        }
        return handleRespostaPergunta(EShowAfterQuestion.CORRECT_ANSWER);
    } else {
        target.classList.add("incorrect")
        removerVida();
        atualizarVidas()
        if (hasNoLivesRemaining()) {
            return handleRespostaPergunta(EShowAfterQuestion.NO_MORE_LIVES);
        }
        return handleRespostaPergunta(EShowAfterQuestion.WRONG_ANSWER);
    }
}

export function handleRespostaPergunta(option: EShowAfterQuestion | null = null) {
    toggleAfterAnswerResultVisibility(false)
    if (option === null) return;

    if (option === EShowAfterQuestion.WRONG_ANSWER) {
        setAfterAnswerResult({
            title: "Você errou!",
            img: gifWrongDecision,
            btnClass: "danger",
            btnText: "Tentar novamente",
            btnFn: () => {
                groupSelected = null;
            }
        })
        return
    }
    if (option === EShowAfterQuestion.CORRECT_ANSWER) {
        setAfterAnswerResult({
            title: "Você acertou!",
            img: gifLike,
            btnClass: "success",
            btnText: "Próxima pergunta",
            btnFn: () => {
                groupSelected = null;
                nextStep();
            }
        })
        return
    }
    if (option === EShowAfterQuestion.NO_MORE_LIVES) {

        setAfterAnswerResult({
            title: "Suas vidas acabaram!",
            img: gifWarning,
            btnClass: "danger",
            btnText: "Mostrar resultados",
            btnFn: () => {
                showResults()
            }
        })
        return
    }
    if (option === EShowAfterQuestion.GAME_END) {
        setAfterAnswerResult({
            title: "Você chegou ao final!",
            img: gifConfetti,
            btnClass: "success",
            btnText: "Mostrar resultados",
            btnFn: () => {
                showResults()
            }
        })
        return
    }
    if (option === EShowAfterQuestion.ROUND_END) {
        updateVisuals(true);
        setAfterAnswerResult({
            title: `Round ${saveObject.currentRound + 1} completo!`,
            img: gifCheckMark,
            btnClass: "success",
            btnText: "Próximo round",
            btnFn: () => {
                groupSelected = null;
                nextStep();
            }
        })
        return
    }
}

function showResults() {
    void saveSave(saveObject)
    updateVisuals(isLastQuestionOfLastRound())
    setTotalTime(getTimeDifference(getTotalMsTimeAllQuestions(saveObject.timePerQuestion)));
    setResultAfterEnd(saveObject.correctAnswers, saveObject.totalQuestions);
}

function nextStep() {
    updateCurrentRoundAndQuestion()
    updateVisuals()
    loadStep();
}

function updateVisuals(showFullProgressQuestion = false) {
    updateQuestionsProgress(saveObject.rounds[saveObject.currentRound], saveObject.currentQuestion, showFullProgressQuestion);
    updateRoundNumber();
    atualizarVidas();
}