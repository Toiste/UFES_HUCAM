import {generateRandomRounds, localStorageKeyName, totalLivesPerRound} from "./data";
import {Save} from "./types";

function createSave(): Save|null {
    try {
        let roundsGenerated = generateRandomRounds();
        const baseObject = {
            rounds: roundsGenerated,
            totalQuestions: roundsGenerated.flat().length,
            currentRoundLives: totalLivesPerRound,
            currentRound: 0,
            currentQuestion: 0,
            correctAnswers: 0,
            timePerQuestion: {}
        } as Save;
        return {...baseObject} as Save;
    } catch (e) {
        console.log("error creating", e)
        return null;
    }
}

function loadSave():Save|null{
    const item = window.localStorage.getItem(localStorageKeyName);
    if(item === null){
        return null;
    }
    try {
        return JSON.parse(item) as Save;
    }
    catch(e){
        console.log("error parsing");
        console.log(e);
        return null;
    }
}

export const loadOrGenerateSaveObject = () => loadSave() ?? createSave();

export const saveSave = (saveObj:Save) => {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify({...saveObj}))
};

export const deleteSave = () => window.localStorage.removeItem(localStorageKeyName);
