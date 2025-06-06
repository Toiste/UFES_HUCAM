import {Save, TimesPerQuestionDict} from "./types";
import {totalLivesPerRound} from "./data";
import {progressElementQuestion} from "./elements";

export function getTotalMsTimePerQuestion(dict: TimesPerQuestionDict) {
    let totalMsAllQuestion = 0;
    const keysRounds: string[] = Object.keys(dict);

    keysRounds.forEach((kr: string) => {
        const roundQuestions = dict[Number(kr)];
        const keysQuestions: string[] = Object.keys(roundQuestions);
        keysQuestions.forEach((kq: string) => {
            const questionTimes = roundQuestions[Number(kq)];
            const questionTimeEnd = questionTimes[1];
            const questionTimeBegin = questionTimes[0];
            totalMsAllQuestion += questionTimeEnd - questionTimeBegin;
        });
    });

    return totalMsAllQuestion;
}