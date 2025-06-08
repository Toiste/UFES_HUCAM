import {resetGame} from "./save";
import {Timespan} from "./types";
import {gifTrofeu} from "./assets";

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

export function setTotalTime(ts:Timespan){
    const temHoras = ts.hours > 0;
    const temMinutos = ts.minutes > 0;
    const temSegundos = ts.seconds > 0;
    let txt = "Tempo total: ";
    if (temHoras) {
        txt += `${ts.hours} horas`;
        if (temMinutos && temSegundos) {
            txt += ", "
        } else if (temMinutos || temSegundos) {
            txt += " e "
        }
    }
    if (temMinutos) {
        txt += `${ts.minutes} minutos`;
        if (temSegundos) txt += " e "
    }
    if (temSegundos) {
        txt += `${ts.seconds} segundos`;
    }
    resultTimeTitle.innerText = txt;
}

export function setResultAfterEnd(correctAnswers:number,totalQuestions:number){
    stepContainer.style.display = "none";
    progressContainer.style.display = "none";
    optionsContainer.style.display = "none"
    resultContainer.style.display = "flex";

    if (correctAnswers === totalQuestions) {
        resultTitle.textContent = "Parabéns!!";
        resultScoreElement.textContent = `Você acertou todas as ${totalQuestions} questões!`;
        resultImg.src = gifTrofeu.src;
        resultImg.alt = gifTrofeu.alt;
    } else if (correctAnswers === 0) {
        resultTitle.textContent = "Não foi dessa vez!";
        resultScoreElement.textContent = `Você não acertou nenhuma questão!`;
        resultImg.src = gifTrofeu.src;
        resultImg.alt = gifTrofeu.alt;
    } else {
        resultTitle.textContent = "Parabéns!!";
        resultScoreElement.textContent = `Você acertou ${correctAnswers} de ${totalQuestions} questões!`;
        resultImg.src = gifTrofeu.src;
        resultImg.alt = gifTrofeu.alt;
    }
}