import {loadOrGenerateSaveObject} from "./save";
import {totalLivesPerRound} from "./data";
import {progressElementQuestion, roundCounter, vidas} from "./elements";

let saveObject = loadOrGenerateSaveObject()!;
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
    // updateProgressOfElement(progressRoundElement, saveObject.rounds, saveObject.currentRound, showFullProgressRound);
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
