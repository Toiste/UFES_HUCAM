import {generateRandomRounds, totalLivesPerRound} from "./data";
import {Save} from "./types";

declare var CryptoJS: any;

export const localStorageKeyName = "grrs_progress";
export const localStorageKeyNameK = "grrs_progressk";
export const localStorageKeyNameReset = "grrs_progress-reset";

function generateOrGet(): Promise<string> {
    return new Promise(resolve => {
        asyncLocalStorage.getItem(localStorageKeyNameK).then(value => {
            if (value === null) {
                const randomWordArray = CryptoJS.lib.WordArray.random(16);
                const randomHexString = randomWordArray.toString();
                window.localStorage.setItem(localStorageKeyNameK, randomHexString);
                return resolve(randomHexString);
            }
            return resolve(value);
        })
    })

}

function createSave(): Promise<Save> {
    return new Promise(function (resolve) {
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
        const a = {...baseObject} as Save;
        return resolve(a);
    });


}

export function createOrLoadSave(): Promise<Save> {
    console.log("aaaa")
    return new Promise(function (resolve) {
        loadSave().then(loaded => {
            if (loaded !== null) {
                return resolve(loaded);
            }
            return createSave().then(created => {
                return resolve(created);
            })
        })
    });
}

function loadSave(): Promise<Save | null> {
    return new Promise(function (resolve) {
        asyncLocalStorage.getItem(localStorageKeyName).then(item => {
            if (item === null) {
                return resolve(null);
            }
            generateOrGet().then(k => {
                try {
                    try {
                        CryptoJS.AES.decrypt(item, k);
                    } catch (e) {
                        console.log("error decrypting")
                        return resolve(null);
                    }
                    const d = CryptoJS.AES.decrypt(item, k);
                    const a = JSON.parse(d.toString(CryptoJS.enc.Utf8)) as Save;
                    return resolve(a);
                } catch (e) {
                    console.log("error parsing");
                    console.log(e);
                    return resolve(null);
                }
            })


        })
    })
}

export const saveSave = (saveObj: Save): Promise<void> => {
    return new Promise(function (resolve) {
        generateOrGet().then(k => {
            try {
                const e = CryptoJS.AES.encrypt(
                    JSON.stringify({...saveObj}),
                    k
                ).toString();
                asyncLocalStorage.setItem(localStorageKeyName, e).then(() => resolve())
            } catch (e) {
                console.log("error parsing");
                console.log(e);
                return resolve();
            }
        })
    })

};

const deleteSave = () => asyncLocalStorage.removeItem(localStorageKeyName);

export const resetGame = () => {
    deleteSave().then(() =>
        asyncLocalStorage.setItem(localStorageKeyNameReset, "true")
            .then(() => window.location.reload())
    )
}

export const asyncLocalStorage = {
    setItem(key: string, value: string) {
        return Promise.resolve().then(function () {
            localStorage.setItem(key, value);
        });
    },
    getItem(key: string) {
        return Promise.resolve().then(function () {
            return localStorage.getItem(key);
        });
    },
    removeItem(key: string) {
        return Promise.resolve().then(function () {
            return localStorage.removeItem(key);
        });
    }
};