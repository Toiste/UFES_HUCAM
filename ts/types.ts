export type Tuple<T> = [T, T]
export type TimesPerQuestionDict = Dictionary<Dictionary<Tuple<number>>>;

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