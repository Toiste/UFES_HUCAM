import {Tuple} from "./types";

export function getTotalMsTimeAllQuestions(dict: { [key:string]:Tuple<number> }) {
    let totalMsAllQuestion = 0;
    const keysRounds: string[] = Object.keys(dict);

    keysRounds.forEach((kr: string) => {
        const timeTuple = dict[kr]!;
        const questionTimeEnd = timeTuple[1];
        const questionTimeBegin = timeTuple[0];
        totalMsAllQuestion += questionTimeEnd - questionTimeBegin;
    });

    return totalMsAllQuestion;
}

export function getTimeDifference(diffInMs: number) {
    // Calculate difference in milliseconds
    // const diffInMs = Math.abs(endDate - startDate);

    // Convert to different units
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    // Get remaining units after larger ones are accounted for
    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;

    return {
        hours,
        minutes: remainingMinutes,
        seconds: remainingSeconds,
        totalHours: diffInMs / (1000 * 60 * 60),
        totalMinutes: diffInMs / (1000 * 60),
        totalSeconds: diffInMs / 1000
    };
}