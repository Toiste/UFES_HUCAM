import {resetGame} from "./save";

export const trashNameElement = getById("trash-name")!;
export const optionsContainer = getById("options-container")!;
export const stepContainer = getById("step-container")!;

export const resultContainer = getById("result-container")!;
export const resultTitle = getById("result-title")!;
export const resultImg = getById("result-img")! as HTMLImageElement;
export const resultScoreElement = getById("result-score")!;
export const resultTimeTitle = getById("time-title")!;

export const progressElementQuestion = getById("progress-bar-step-question")!;
export const progressContainer = getById("step-counter-container")!;

export const vidas = getById("vidas")!;
export const roundCounter = getById("round-counter")!;

export const startBtnElement = getById("start-button");
export const startScreen = getById("start-screen");

export const resetBtn = getById("reset-button");
export const resetBtnArrow = getById("reset-button-arrow");

export const afterAnswerClickContainer = getById("after-answer-click-container");
export const afterAnswerClickTitle = getById("after-answer-click-title");
export const afterAnswerClickImg = getById("after-answer-click-img") as HTMLImageElement    ;
export const afterAnswerClickButton = getById("after-answer-click-button") as HTMLButtonElement;


export type AfterAnswerConfig = {
    title:string,
    imgSrc:string,
    imgAlt:string,
    btnText:string|null,
    btnClass:"success"|"danger"|null,
    btnFn:any,
}

export function toggleAfterAnswerResultVisibility(visible:boolean){
    if(visible)
        afterAnswerClickContainer.style.display = "flex";
    else
        afterAnswerClickContainer.style.display = "none";
}

export function setAfterAnswerResult (config:AfterAnswerConfig){
    toggleAfterAnswerResultVisibility(true)
    afterAnswerClickButton.onclick = null;
    afterAnswerClickTitle.textContent = config.title;
    afterAnswerClickImg.src = config.imgSrc;
    afterAnswerClickImg.alt = config.imgAlt;
    if(config.btnText !== null){
        afterAnswerClickButton.classList.remove("btn-danger");
        afterAnswerClickButton.classList.remove("btn-success");
        afterAnswerClickButton.classList.add(`btn-${config.btnClass}`);
        afterAnswerClickButton.style.removeProperty("display");
        afterAnswerClickButton.innerText = config.btnText;
        afterAnswerClickButton.onclick = ()=> {
            config.btnFn();
            toggleAfterAnswerResultVisibility(false)
        };
    }
    else{
        afterAnswerClickButton.style.display = "none";
    }
}

export enum EShowAfterQuestion {
    WRONG_ANSWER,
    CORRECT_ANSWER,
    NO_MORE_LIVES,
    GAME_END,
    ROUND_END
}




function getById(id:string):HTMLElement{
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
