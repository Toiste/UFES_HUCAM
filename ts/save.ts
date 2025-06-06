import {generateRandomRounds, localStorageKeyName, totalLivesPerRound} from "./data";
import {Save, Tuple} from "./types";

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

export const loadOrGenerateSaveObjectAndStart = async ():Promise<Save> => {
    return new Promise((resolve, reject)=>{
        try{
            const loaded = loadSave();
            if(loaded !== null)  return resolve(loaded);
            let created = createSave();
            while(created === null){
                created = createSave()
            }
            return resolve(created);
        }
        catch (e){
            throw e;
        }
    })
};

export const saveSave = (saveObj:Save) => {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify({...saveObj}))
};

export const deleteSave = () => window.localStorage.removeItem(localStorageKeyName);
