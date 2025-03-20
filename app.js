import { trashListOrig, trashGroups } from './data/trashData.js';
import { loadStep, selectGroup, updateProgress, showResults } from './game/game.js';

let currentStep = 0;
let correctAnswers = 0;

const trashNameElement = document.getElementById("trash-name");
const optionsContainer = document.getElementById("options-container");
const stepContainer = document.getElementById("step-container");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const progressElement = document.getElementById("progress-bar-step");
const progressContainer = document.getElementById("step-counter-container");

function nextStep() {
    currentStep++;
    loadStep(trashListOrig, trashGroups, currentStep, trashNameElement, optionsContainer, updateProgress, showResults);
}

// Initialize the first step
loadStep(trashListOrig, trashGroups, currentStep, trashNameElement, optionsContainer, updateProgress, showResults);
