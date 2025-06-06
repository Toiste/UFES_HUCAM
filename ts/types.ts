export type Tuple<T> = [start:T, end:T]
export type TimesPerQuestionDict = Dictionary<Dictionary<Tuple<number>>>;


export type TimesPerQuestionDictV2 = Map<string, Tuple<number>>



export interface Save {
    rounds: RoundList,
    totalQuestions: number,
    currentRoundLives: number,
    currentRound: number,
    currentQuestion: number,
    correctAnswers: number,
    timePerQuestion: Map<string, Tuple<number>>
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
export enum ETypeTimePerQuestion{
    START,
    END
}