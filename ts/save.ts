import {generateRandomRounds, totalLivesPerRound} from "./data";
import {Save} from "./types";

declare var CryptoJS:any;

export const localStorageKeyName = "grrs_progress";
export const localStorageKeyNameK = "grrs_progressk";
export const localStorageKeyNameReset = "grrs_progress-reset";
export const saveCreatedOrLoadedEvent = "saveCreatedOrLoaded";
function generateOrGet(){
    const k = window.localStorage.getItem(localStorageKeyNameK);
    if(k === null) {
        const randomWordArray = CryptoJS.lib.WordArray.random(16);
        const randomHexString = randomWordArray.toString();
        window.localStorage.setItem(localStorageKeyNameK,randomHexString);
        return randomHexString;
    }
    return k;
}

function createSave(): Save | null {
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

function loadSave(): Save | null {
    const item = window.localStorage.getItem(localStorageKeyName);
    if (item === null) {
        return null;
    }
    try {
        try{
            CryptoJS.AES.decrypt(item, generateOrGet());
        }
        catch (e) {
            return null;
        }
        const d = CryptoJS.AES.decrypt(item, generateOrGet());
        return JSON.parse(d.toString(CryptoJS.enc.Utf8)) as Save;
    } catch (e) {
        console.log("error parsing");
        console.log(e);
        return null;
    }
}

function createEvent(save: Save): CustomEvent<Save> {
    return new CustomEvent<Save>(saveCreatedOrLoadedEvent, {
        detail: save,
        bubbles: true,    // Whether the event bubbles up through the DOM
        cancelable: true  // Whether the event can be canceled
    });
}

export const saveSave = (saveObj: Save) => {
    const e = CryptoJS.AES.encrypt(
        JSON.stringify({...saveObj}),
        generateOrGet()
    ).toString();
    window.localStorage.setItem(localStorageKeyName, e);
};

const deleteSave = () => window.localStorage.removeItem(localStorageKeyName);

export const resetGame = () => {
    deleteSave()
    window.localStorage.setItem(localStorageKeyNameReset,"true");
    window.location.reload()
}


export const loadOrGenerateSaveObjectAndStartEvent = (): void => {
    try {
        const loaded = loadSave();
        if (loaded !== null) {
            // console.log("despachou")
            document.dispatchEvent(createEvent(loaded));
            return;
        }
        let created = createSave();
        // console.log("created", created);
        if (created === null) {
            let intervalId = setInterval(() => {
                created = createSave();
                if (created !== null) {
                    document.dispatchEvent(createEvent(created!));
                    clearInterval(intervalId)
                    return;
                }
            }, 1000)
        } else {
            document.dispatchEvent(createEvent(created!));
            return;
        }
    } catch (e) {
        throw e;
    }

};