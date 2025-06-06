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

export const progressElementQuestion = getById("progress-bar-step-question")!;
// export const progressRoundElement = getById("progress-bar-step-round")!;
export const progressContainer = getById("step-counter-container")!;

export const vidas = getById("vidas")!;
export const roundCounter = getById("round-counter")!;

function getById(id:string):HTMLElement{
    return document.getElementById(id)!;
}