import {deleteSave, loadOrGenerateSaveObjectAndStart, saveSave} from "./save";
import {answerOptions, totalLivesPerRound} from "./data";
import {
    clearRespostaPergunta,
    EShowAfterQuestion,
    gameEndLivesResultBtn,
    handleRespostaPergunta,
    noMoreLivesResultBtn,
    optionsContainer,
    perguntaCorretaBtn,
    perguntaErradaBtn,
    progressContainer,
    progressElementQuestion,
    resetBtn,
    resetBtnArrow,
    resultContainer,
    resultImg,
    resultScoreElement,
    resultTimeTitle,
    resultTitle,
    roundCompleteBtn,
    roundCompleteContainer,
    roundCompleteTitle,
    roundCounter,
    startBtnElement,
    startScreen,
    stepContainer,
    trashNameElement,
    vidas
} from "./elements";
import {ETypeTimePerQuestion, Save} from "./types";
import {getTimeDifference, getTotalMsTimeAllQuestions} from "./utils";
import {gifTrofeu} from "./assets";

let groupSelected:string|null = null;

let saveObject = {} as Save;
loadOrGenerateSaveObjectAndStart().then(x => {
        saveObject = {...x};
        startBtnElement.addEventListener("click", function () {
            startScreen.classList.add("hidden"); // Adiciona a classe que ativa o fade-out
            //Se o save foi carregado finalizado, não mostrar ao carregar
            if (isFinalizedOrHasNoLivesRemaining()) return;
            start()
            setTimeout(() => {
                startScreen.style.display = "none"; // Remove a tela depois da animação
                stepContainer.style.display = "block";
                optionsContainer.style.display = "flex";
                progressContainer.style.display = "flex";

            }, 1000); // Tempo deve ser igual ao da animação (1s)
        });
    }
).catch(e => console.log(e));

function reset() {
    deleteSave()
    window.location.reload()
}

function isFinalizedOrHasNoLivesRemaining() {
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

function isLastRound(){
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
* Atualiza as barras de progresso das perguntas do round
*/
function updateQuestionsProgress(list: Array<any>, current: number, showFull = false) {
    if (showFull) {
        progressElementQuestion.style.width = `100%`;
        progressElementQuestion.setAttribute("aria-valuenow", `100`);
        progressElementQuestion.innerText = `100%`;
        return
    }
    const currProgressQuestion = Math.round((100 / list.length) * (current));
    progressElementQuestion.style.width = `${currProgressQuestion}%`;
    progressElementQuestion.setAttribute("aria-valuenow", `${currProgressQuestion}`);
    progressElementQuestion.innerText = `${currProgressQuestion}%`;

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
function getNextTrashAndGenerateAnswersOptions(){
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
        card.addEventListener("click", (event) => selectGroup(event, group.name, currentTrash.group), {once: true});
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
    saveSave(saveObject);
    getNextTrashAndGenerateAnswersOptions()
    setTimePerQuestion(ETypeTimePerQuestion.START);

}

/*
* Verifica se o grupo selecionado foi correto ou não. Caso não, remove uma vida. Caso sim, adiciona na qtd de respostas corretas
*/
function selectGroup(event:MouseEvent,selectedGroup: string, correctGroup: string) {
    console.log("groupSelected before", groupSelected)
    if(groupSelected !== null) return;
    const target = event.currentTarget as HTMLElement;
    groupSelected = selectedGroup;
    console.log("groupSelected after", groupSelected)
    setTimePerQuestion(ETypeTimePerQuestion.END);


    const correctAnswer = selectedGroup === correctGroup;
    if(correctAnswer){
        saveObject.correctAnswers ++;
        target.classList.add("correct")
        if(isLastQuestionOfLastRound())
            return handleRespostaPergunta(EShowAfterQuestion.GAME_END);
        if(isLastQuestionOfRound()){
            updateVisuals(true);
            roundCompleteTitle.innerText = `Round ${saveObject.currentRound + 1} completo!`;
            return handleRespostaPergunta(EShowAfterQuestion.ROUND_END)
        }
        return handleRespostaPergunta(EShowAfterQuestion.CORRECT_ANSWER);
    }
    else{
        target.classList.add("incorrect")
        removerVida();
        atualizarVidas()
        if(hasNoLivesRemaining()){
            return handleRespostaPergunta(EShowAfterQuestion.NO_MORE_LIVES);
        }
        return handleRespostaPergunta(EShowAfterQuestion.WRONG_ANSWER);
    }

    //
    // setTimeout(() => {
    //     //Se ficou sem vida após responder ou se respondeu a última pergunta do último round, mostra os resultados
    //     if (isFinalizedOrNoLivesRemaining()) {
    //         return showResults();
    //     }
    //     //Se respondeu a última pergunta do round atual, mostra uma animação de round completo para depois mandar para o próximo round
    //     if (isLastQuestionOfRound()) {
    //         return showRoundComplete();
    //     }
    //     //Vai para a próxima pergunta
    //     return nextStep()
    // }, 500)
}

roundCompleteBtn.addEventListener("click", ()=>{
    groupSelected = null;
    nextStep();
    clearRespostaPergunta()
});

perguntaCorretaBtn.addEventListener("click", function (){
    groupSelected = null;
    nextStep();
    clearRespostaPergunta()
})
perguntaErradaBtn.addEventListener("click", function (){
    groupSelected = null;
    clearRespostaPergunta()
})

noMoreLivesResultBtn.addEventListener("click", function (){
    showResults()
    clearRespostaPergunta()
})
gameEndLivesResultBtn.addEventListener("click", function (){
    showResults()
    clearRespostaPergunta()
})

resetBtn.addEventListener("click", function () {
    reset()
});
resetBtnArrow.addEventListener("click", function () {
    reset()
});

//OBS: Apenas para debug
if (window.location.hostname === "localhost") {
    startBtnElement.click()
    // showResults()
}

function showRoundComplete() {
    updateVisuals(true);

    stepContainer.style.display = "none";
    progressContainer.style.display = "none";
    optionsContainer.style.display = "none";

    // Aguarda um ciclo de renderização antes de mostrar a mensagem
    setTimeout(() => {
        roundCompleteTitle.innerText = `Round ${saveObject.currentRound + 1} completo!`;
        roundCompleteContainer.style.display = "flex";

        // Depois de 3 segundos, esconde novamente e continua
        setTimeout(() => {
            stepContainer.style.removeProperty("display");
            progressContainer.style.removeProperty("display");
            optionsContainer.style.removeProperty("display");

            roundCompleteTitle.innerText = "";
            roundCompleteContainer.style.display = "none";
            nextStep();
        }, 3000);
    }, 0); // ou 50ms se quiser garantir visualmente
}

function showResults() {
    saveSave(saveObject)
    updateVisuals(isLastQuestionOfLastRound())

    const timespan = getTimeDifference(getTotalMsTimeAllQuestions(saveObject.timePerQuestion));

    const temHoras = timespan.hours > 0;
    const temMinutos = timespan.minutes > 0;
    const temSegundos = timespan.seconds > 0;
    let txt = "Tempo total: ";
    if (temHoras) {
        txt += `${timespan.hours} horas`;
        if (temMinutos && temSegundos) {
            txt += ", "
        } else if (temMinutos || temSegundos) {
            txt += " e "
        }
    }
    if (temMinutos) {
        txt += `${timespan.minutes} minutos`;
        if (temSegundos) txt += " e "
    }
    if (temSegundos) {
        txt += `${timespan.seconds} segundos`;
    }
    resultTimeTitle.innerText = txt;

    stepContainer.style.display = "none";
    progressContainer.style.display = "none";
    optionsContainer.style.display = "none"
    resultContainer.style.display = "flex";

    if (saveObject.correctAnswers === saveObject.totalQuestions) {
        resultTitle.textContent = "Parabéns!!";
        resultScoreElement.textContent = `Você acertou todas as ${saveObject.totalQuestions} questões!`;
        resultImg.src = gifTrofeu.src;
        resultImg.alt = gifTrofeu.alt;
    } else if (saveObject.correctAnswers === 0) {
        resultTitle.textContent = "Não foi dessa vez!";
        resultScoreElement.textContent = `Você não acertou nenhuma questão!`;
        resultImg.src = gifTrofeu.src;
        resultImg.alt = gifTrofeu.alt;
    } else {
        resultTitle.textContent = "Parabéns!!";
        resultScoreElement.textContent = `Você acertou ${saveObject.correctAnswers} de ${saveObject.totalQuestions} questões!`;
        resultImg.src = gifTrofeu.src;
        resultImg.alt = gifTrofeu.alt;
    }
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

function start() {
    // setTimePerQuestion(ETypeTimePerQuestion.START);
    updateVisuals()
    //Se carregou o save finalizado ou sem vida, mostra direto a parte de resultados
    if (isFinalizedOrHasNoLivesRemaining())
        showResults()
    else
        loadStep()
}
