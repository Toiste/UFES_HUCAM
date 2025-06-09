import {generateRandomRounds, localStorageKeyName, localStorageKeyNameReset, totalLivesPerRound} from "./data";
import {Save} from "./types";

export const saveCreatedOrLoadedEvent = "saveCreatedOrLoaded";

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
        return JSON.parse(item) as Save;
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

export const loadOrGenerateSaveObjectAndStartEvent = (): void => {
    try {
        const loaded = loadSave();
        // console.log("loaded", loaded);
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

export const loadOrGenerateSaveObjectAndStart = async (): Promise<Save> => {
    return new Promise((resolve, reject) => {
        try {
            const loaded = loadSave();
            if (loaded !== null) return resolve(loaded!);
            let created = createSave();
            while (created === null) {
                created = createSave()
            }
            return resolve(created!);
        } catch (e) {
            throw e;
        }
    })
};

export const saveSave = (saveObj: Save) => {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify({...saveObj}))
};

const deleteSave = () => window.localStorage.removeItem(localStorageKeyName);

export const resetGame = () => {
    deleteSave()
    window.localStorage.setItem(localStorageKeyNameReset,"true");
    window.location.reload()
}
