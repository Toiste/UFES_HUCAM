export type Tuple<T> = [start: T, end: T]
export type TimesPerQuestionDict = { [key: string]: Tuple<number> };


export interface Save {
    rounds: RoundList,
    totalQuestions: number,
    currentRoundLives: number,
    currentRound: number,
    currentQuestion: number,
    correctAnswers: number,
    timePerQuestion: TimesPerQuestionDict
}

export interface Dictionary<T> {
    [key: number]: T;
}

export type Question = {
    name: string
    group: string
    hideGroups: string[]
};
export type Round = Array<Question>;
export type RoundList = Array<Round>;
export type TrashGroup = { name: string, image: string };

export enum ETypeTimePerQuestion {
    START,
    END
}

export type Timespan = {
    hours:number,
    minutes:number,
    seconds:number,
    totalHours:number,
    totalMinutes:number,
    totalSeconds:number,
}

export type AfterAnswerConfig = {
    title: string,
    img:ImgAsset,
    btnText: string | null,
    btnClass: "success" | "danger" | null,
    btnFn: any,

}
export type ImgAsset = {src: string, alt: string}