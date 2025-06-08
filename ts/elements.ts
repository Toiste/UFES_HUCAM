import {resetGame} from "./save";

export const trashNameElement = getById("trash-name")!;
export const optionsContainer = getById("options-container")!;
export const stepContainer = getById("step-container")!;

export const resultContainer = getById("result-container")!;
export const resultTitle = getById("result-title")!;
export const resultImg = getById("result-img")!;
export const resultScoreElement = getById("result-score")!;
export const resultTimeTitle = getById("time-title")!;

export const roundCompleteContainer = getById("round-complete-container")!;
export const roundCompleteTitle = getById("round-complete-title")!;
export const roundCompleteBtn = getById("round-complete-btn")!;


export const progressElementQuestion = getById("progress-bar-step-question")!;
// export const progressRoundElement = getById("progress-bar-step-round")!;
export const progressContainer = getById("step-counter-container")!;

export const vidas = getById("vidas")!;
export const roundCounter = getById("round-counter")!;

export const startBtnElement = getById("start-button");
export const startScreen = getById("start-screen");

export const resetBtn = getById("reset-button");
export const resetBtnArrow = getById("reset-button-arrow");

export const perguntaCorretaContainer = getById("pergunta-respondida-sucesso-container");
export const perguntaCorretaBtn = getById("next-question-button");

export const perguntaErradaContainer = getById("pergunta-respondida-erro-container");
export const perguntaErradaBtn = getById("try-again-question-button");

export const noMoreLivesResultContainer = getById("pergunta-respondida-no-more-lives-container");
export const noMoreLivesResultBtn = getById("pergunta-respondida-no-more-lives-btn");

export const gameEndLivesResultContainer = getById("pergunta-respondida-game-end-container");
export const gameEndLivesResultBtn = getById("pergunta-respondida-game-end-btn");



export enum EShowAfterQuestion {
    WRONG_ANSWER,
    CORRECT_ANSWER,
    NO_MORE_LIVES,
    GAME_END,
    ROUND_END
}

export function clearRespostaPergunta(){
    toggleNoMoreLives(false);
    togglePerguntaCorreta(false);
    togglePerguntaErrada(false);
    toggleGameEnd(false);
    toggleRoundEnd(false);
}

export function handleRespostaPergunta(option:EShowAfterQuestion|null = null)
{
    clearRespostaPergunta();
    if(option === null) return;

    if(option === EShowAfterQuestion.WRONG_ANSWER) {
        togglePerguntaErrada(true);
        return
    }
    if(option === EShowAfterQuestion.CORRECT_ANSWER) {
        togglePerguntaCorreta(true);
        return
    }
    if(option === EShowAfterQuestion.NO_MORE_LIVES) {
        toggleNoMoreLives(true);
        return
    }
    if(option === EShowAfterQuestion.GAME_END) {
        toggleGameEnd(true);
        return
    }
    if(option === EShowAfterQuestion.ROUND_END) {
        toggleRoundEnd(true);
        return
    }
}



function toggleNoMoreLives(show:boolean){
    if(show) noMoreLivesResultContainer.style.display = "flex";
    else noMoreLivesResultContainer.style.display = "none";
}

function togglePerguntaCorreta(show:boolean){
    if(show) perguntaCorretaContainer.style.display = "flex";
    else perguntaCorretaContainer.style.display = "none";
}

function togglePerguntaErrada(show:boolean){
    if(show) perguntaErradaContainer.style.display = "flex";
    else perguntaErradaContainer.style.display = "none";
}

function toggleGameEnd(show:boolean){
    if(show) gameEndLivesResultContainer.style.display = "flex";
    else gameEndLivesResultContainer.style.display = "none";
}
function toggleRoundEnd(show:boolean){
    if(show) roundCompleteContainer.style.display = "flex";
    else roundCompleteContainer.style.display = "none";
}





function getById(id:string):any{
    return document.getElementById(id)!;
}

resetBtn.addEventListener("click", function () {
    resetGame()
});
resetBtnArrow.addEventListener("click", function () {
    resetGame()
});

/*
* Atualiza as barras de progresso das perguntas do round
*/
export function updateQuestionsProgress(list: Array<any>, current: number, showFull = false) {
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
