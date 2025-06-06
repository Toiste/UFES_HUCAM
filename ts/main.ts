import {deleteSave, loadOrGenerateSaveObjectAndStart, saveSave} from "./save";
import {answerOptions, totalLivesPerRound} from "./data";
import {
    optionsContainer,
    progressContainer,
    progressElementQuestion,
    resetBtn,
    resetBtnArrow,
    resultContainer, resultImg, resultScoreElement,
    resultTimeTitle, resultTitle,
    roundCompleteContainer,
    roundCompleteTitle,
    roundCounter,
    startBtnElement,
    startScreen,
    stepContainer,
    trashNameElement,
    vidas
} from "./elements";
import {ETypeTimePerQuestion, Save, Tuple} from "./types";
import {getTimeDifference, getTotalMsTimeAllQuestions} from "./utils";
import {gifTrofeu} from "./assets";

let saveObject = {} as Save;
loadOrGenerateSaveObjectAndStart().then(x=> {
        saveObject = x
        start()
    }
).catch(e=> console.log(e));

function reset(){
    deleteSave()
    window.location.reload()
}

function isFinalizedOrNoLivesRemaining(){
    return isLastQuestionOfLastRound() || saveObject.currentRoundLives === 0
}

/*
* Verifica se a a resposta dada era a última do round
*/
function isLastQuestionOfRound() {
    const round = saveObject.rounds[saveObject.currentRound];
    const roundQuestionsNum = round.length;
    const lastQuestion = roundQuestionsNum - 1;
    return saveObject.currentQuestion === lastQuestion
}

/*
* Verifica se a a resposta dada era a última do ultimo round
*/
function isLastQuestionOfLastRound(){
    const lastRound = saveObject.rounds.length - 1;
    return isLastQuestionOfRound() && saveObject.currentRound === lastRound;
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
    //If its not the end of the round, goes to the next question
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
* Atualiza as barras de progresso a partir do elemento
*/
function updateProgressOfElement(element:HTMLElement,list:Array<any>, current:number, showFull = false){
    if(showFull){
        element.style.width = `100%`;
        element.setAttribute("aria-valuenow", `100`);
        element.innerText = `100%`;
        return
    }
    const currProgressQuestion = Math.round((100 / list.length) * (current));
    element.style.width = `${currProgressQuestion}%`;
    element.setAttribute("aria-valuenow", `${currProgressQuestion}`);
    element.innerText = `${currProgressQuestion}%`;

}

/*
* Atualiza as barras de progresso de pergunta e round
*/
function updateRoundProgress(showFullProgressQuestion = false) {
    updateProgressOfElement(progressElementQuestion, saveObject.rounds[saveObject.currentRound], saveObject.currentQuestion, showFullProgressQuestion);
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
    type:ETypeTimePerQuestion,
){
    debugger;
    // if(!saveObject.timePerQuestion) saveObject.timePerQuestion = {};
    const key = `${saveObject.currentRound}-${saveObject.currentQuestion}`;
    const getUTCMillisecondsNow = ()=> new Date().getUTCMilliseconds();
    if(type === ETypeTimePerQuestion.END){
        saveObject.timePerQuestion[key][1] = getUTCMillisecondsNow();
        // saveObject.timePerQuestion.set(key, [curr[0], ]);
        return;
    }
    saveObject.timePerQuestion[key] = [getUTCMillisecondsNow(), 0];

}

/*
* Carrega cada passo de pergunta:
* - Salva o progresso até o momento
* - Pega a próxima pergunta
* - Monta as opões e os eventos de resposta
*/
function loadStep() {
    saveSave(saveObject);
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
        card.addEventListener("click", () => selectGroup(group.name, currentTrash.group));
        optionsContainer.appendChild(card);
    });

    // saveObject.timePerQuestion[saveObject.currentRound][saveObject.currentQuestion][0] = new Date();
    setTimePerQuestion(ETypeTimePerQuestion.START);

}

/*
* Verifica se o grupo selecionado foi correto ou não. Caso não, remove uma vida. Caso sim, adiciona na qtd de respostas corretas
*/
function selectGroup(selectedGroup:string, correctGroup:string) {
    setTimePerQuestion(ETypeTimePerQuestion.END);
    const cards = optionsContainer.querySelectorAll(".option-card");
    cards.forEach((card:any) => {
        card.style.pointerEvents = "none"; // Bloqueia cliques adicionais
        const groupName = card.querySelector("p").textContent;

        if (groupName === correctGroup) {
            card.classList.add("correct"); // Adiciona classe de acerto
        } else if (groupName === selectedGroup) {
            card.classList.add("incorrect"); // Adiciona classe de erro
        }
    });

    if (selectedGroup === correctGroup) {
        saveObject.correctAnswers++;
    } else {
        removerVida()
    }

    setTimeout(()=>{
        //Se ficou sem vida após responder ou se respondeu a última pergunta do último round, mostra os resultados
        if(isFinalizedOrNoLivesRemaining()){
            return showResults();
        }
        //Se respondeu a última pergunta do round atual, mostra uma animação de round completo para depois mandar para o próximo round
        if(isLastQuestionOfRound()){
            return showRoundComplete();
        }
        //Vai para a próxima pergunta
        return nextStep()
    },500)
}




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
    if(temHoras) {
        txt += `${timespan.hours} horas`;
        if(temMinutos && temSegundos) {
            txt += ", "
        }
        else if(temMinutos || temSegundos){
            txt+= " e "
        }
    }
    if(temMinutos) {
        txt += `${timespan.minutes} minutos`;
        if (temSegundos) txt += " e "
    }
    if(temSegundos){
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

function updateVisuals(showFullProgressQuestion = false){
    updateRoundProgress(showFullProgressQuestion);
    updateRoundNumber();
    atualizarVidas();
}

function start(){
    startBtnElement.addEventListener("click", function () {
        startScreen.classList.add("hidden"); // Adiciona a classe que ativa o fade-out
        //Se o save foi carregado finalizado, não mostrar ao carregar
        if(isFinalizedOrNoLivesRemaining()) return;
        setTimeout(() => {
            startScreen.style.display = "none"; // Remove a tela depois da animação
            stepContainer.style.display = "block";
            optionsContainer.style.display = "flex";
            progressContainer.style.display = "flex";
        }, 1000); // Tempo deve ser igual ao da animação (1s)
    });
    updateVisuals()
    //Se carregou o save finalizado ou sem vida, mostra direto a parte de resultados
    if(isFinalizedOrNoLivesRemaining())
        showResults()
    else
        loadStep()
}