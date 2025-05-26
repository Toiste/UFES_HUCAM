import {generateRandomRounds, trashGroups} from "./data/trashData.js";
/* ------------------------------------------------ VALORES CONSTANTES ------------------------------------------------ */
const localStorageKeyName = "grrs_progress";
const totalLivesPerRound = 5;
const answerOptions = [...trashGroups];
/* ------------------------------------------------ VALORES CONSTANTES ------------------------------------------------ */

/* ------------------------------------------------ ELEMENTOS ------------------------------------------------ */
const trashNameElement = document.getElementById("trash-name");
const optionsContainer = document.getElementById("options-container");
const stepContainer = document.getElementById("step-container");

const resultContainer = document.getElementById("result-container");
const resultTitle = document.getElementById("result-title");
const resultImg = document.getElementById("result-img");
const resultScoreElement = document.getElementById("result-score");
const resultTimeTitle = document.getElementById("time-title");

const roundCompleteContainer = document.getElementById("round-complete-container");
const roundCompleteTitle = document.getElementById("round-complete-title");

const progressElementQuestion = document.getElementById("progress-bar-step-question");
// const progressRoundElement = document.getElementById("progress-bar-step-round");
const progressContainer = document.getElementById("step-counter-container");

const vidas = document.getElementById("vidas");
const roundCounter = document.getElementById("round-counter");

const gifTrofeu = {src: "assets/images/icones/sucesso.gif", alt: "gif de uma mão segurando um troféu"}
/* ------------------------------------------------ ELEMENTOS ------------------------------------------------ */

/* ------------------------------------------------ ELEMENTOS ------------------------------------------------ */
function createSave() {
    let roundsGenerated = generateRandomRounds();
    const baseObject = {
        rounds:roundsGenerated,
        totalQuestions: roundsGenerated.flat().length,
        currentRoundLives: totalLivesPerRound,
        currentRound: 0,
        currentQuestion: 0,
        correctAnswers: 0,
        startDateTime: new Date(),

    }
    return {...baseObject};
}

/* ------------------------------------------------ GERENCIAMENTE DE SAVE ------------------------------------------------ */
//Retorna o json do save ou null caso não exista
const loadSave = () => JSON.parse(window.localStorage.getItem(localStorageKeyName)) ?? null;

//Caso exista save, carrega ele, se não cria um novo save
const loadOrGenerateSaveObject = () => ({...loadSave() ?? createSave()});

//Salva o progresso atual
const saveSave = () => {
    const json = JSON.stringify(saveObject, function(key, value) {
        if (typeof value === 'function') {
            return value.toString();
        } else {
            return value;
        }
    });
    window.localStorage.setItem(localStorageKeyName, JSON.stringify({...saveObject}))
};
//Deleta o save para gerar um novo ao reiniciar
const deleteSave = () => window.localStorage.removeItem(localStorageKeyName);

const saveObject = loadOrGenerateSaveObject()
/* ------------------------------------------------ GERENCIAMENTE DE SAVE ------------------------------------------------ */

/*
* Verifica se a a resposta dada era a última do round
*/
function isLastQuestionOfRound() {
    const round = saveObject.rounds[saveObject.currentRound];
    const roundQuestionsNum = round.length;
    const lastQuestion = roundQuestionsNum - 1;
    return saveObject.currentQuestion === lastQuestion
}

/*
* Verifica se a a resposta dada era a última do ultimo round
*/
function isLastQuestionOfLastRound(){
    const lastRound = saveObject.rounds.length - 1;
    return isLastQuestionOfRound() && saveObject.currentRound === lastRound;
}

/*
* Pula para a próxima pergunta. Caso seja a última pergunta do round, pula para o próximo round.
*/
function updateCurrentRoundAndQuestion() {
    if (isLastQuestionOfRound()) {
        saveObject.currentRound++;
        saveObject.currentQuestion = 0;
        saveObject.currentRoundLives = totalLivesPerRound;
        return;
    }
    //If its not the end of the round, goes to the next question
    saveObject.currentQuestion++;
}

/*
* Diminui a vida caso tenha errado a resposta
*/
function removerVida() {
    saveObject.currentRoundLives -= 1
    //Sei la, vai que conseguem burlar a contagem e diminiuir mais vidas
    if (saveObject.currentRoundLives < 0) saveObject.currentRoundLives = 0
}


/*
* Atualiza as barras de progresso a partir do elemento
*/
function updateProgressOfElement(element,list, current, showFull = false){
    if(showFull){
        element.style.width = `100%`;
        element.setAttribute("aria-valuenow", `100`);
        element.innerText = `100%`;
        return
    }
    const currProgressQuestion = Math.round((100 / list.length) * (current));
    element.style.width = `${currProgressQuestion}%`;
    element.setAttribute("aria-valuenow", `${currProgressQuestion}`);
    element.innerText = `${currProgressQuestion}%`;

}

/*
* Atualiza as barras de progresso de pergunta e round
*/
function updateRoundProgress(showFullProgressQuestion = false, showFullProgressRound = false) {
    updateProgressOfElement(progressElementQuestion, saveObject.rounds[saveObject.currentRound], saveObject.currentQuestion, showFullProgressQuestion);
    // updateProgressOfElement(progressRoundElement, saveObject.rounds, saveObject.currentRound, showFullProgressRound);
}

function updateRoundNumber() {
    roundCounter.innerText = `Round ${saveObject.currentRound + 1} de ${saveObject.rounds.length}`
}


function atualizarVidas() {
    vidas.innerHTML = `<span  style="font-size: 30px;transform: scale(.5,1)">&#129505;&nbsp;x${saveObject.currentRoundLives}</span>`
}

/*Carrega cada passo de pergunta
* Isso envolve:
* - Atualiza a barra de progresso
* - Caso ainda tenham perguntas:
*   - Pegar uma aleatória da lista
*   - Criar os cards de respostas
* - Caso as perguntas tenham terminado:
*   - Mostrar resultados
* */
function loadStep() {
    saveSave();
    const currentTrash = saveObject.rounds[saveObject.currentRound][saveObject.currentQuestion];

    trashNameElement.textContent = `${currentTrash.name}`;
    optionsContainer.innerHTML = "";

    answerOptions.forEach(group => {
        if (currentTrash.hideGroups.length > 0 && currentTrash.hideGroups.includes(group.name))
            return
        const card = document.createElement("div");
        card.classList.add("option-card");
        card.innerHTML = `
            <img src="assets/images/${group.image}" alt="${group.name}">
            <p>${group.name}</p>
        `;
        card.addEventListener("click", () => selectGroup(group.name, currentTrash.group));
        optionsContainer.appendChild(card);
    });

}

// Tela de transição com animação
document.getElementById("start-button").addEventListener("click", function () {
    const startScreen = document.getElementById("start-screen");

    startScreen.classList.add("hidden"); // Adiciona a classe que ativa o fade-out

    setTimeout(() => {
        startScreen.style.display = "none"; // Remove a tela depois da animação
        document.getElementById("step-container").style.display = "block";
        document.getElementById("options-container").style.display = "flex";
        document.getElementById("step-counter-container").style.display = "flex";
    }, 1000); // Tempo deve ser igual ao da animação (1s)
});
function reset(){
    deleteSave()
    window.location.reload()
}
document.getElementById("reset-button").addEventListener("click", function () {
    reset()
});
document.getElementById("reset-button-arrow").addEventListener("click", function () {
    reset()
});

//OBS: Apenas para debug
if (window.location.hostname === "localhost") {
    document.getElementById("start-button").click()
    // showResults()
}


///
function selectGroup(selectedGroup, correctGroup) {
    const cards = optionsContainer.querySelectorAll(".option-card");
    cards.forEach(card => {
        card.style.pointerEvents = "none"; // Bloqueia cliques adicionais
        const groupName = card.querySelector("p").textContent;

        if (groupName === correctGroup) {
            card.classList.add("correct"); // Adiciona classe de acerto
        } else if (groupName === selectedGroup) {
            card.classList.add("incorrect"); // Adiciona classe de erro
        }
    });

    if (selectedGroup === correctGroup) {
        saveObject.correctAnswers++;
    } else {
        removerVida()
    }

    setTimeout(()=>{
        if(saveObject.currentRoundLives === 0 || isLastQuestionOfLastRound()){
            return showResults();
        }

        if(isLastQuestionOfLastRound()){
            return showRoundComplete();
        }

        return nextStep()
    },500)
}

function hideResults() {
    stepContainer.style.removeProperty("display");
    progressContainer.style.removeProperty("display");
    optionsContainer.style.removeProperty("display");
    resultContainer.style.display = "none";
}

function showRoundComplete(){
    updateThings(true)
    stepContainer.style.display = "none";
    progressContainer.style.display = "none";
    optionsContainer.style.display = "none"
    roundCompleteTitle.innerText = `Round ${saveObject.currentRound+1} completo!`
    roundCompleteContainer.style.display = "flex";

    setTimeout(()=>{
        stepContainer.style.removeProperty("display");
        progressContainer.style.removeProperty("display");
        optionsContainer.style.removeProperty("display");

        roundCompleteTitle.innerText = ""
        roundCompleteContainer.style.display = "none";
        nextStep()
    }, 3000)
}

function showResults() {
    const isEnd = isLastQuestionOfLastRound()
    updateThings(isEnd, isEnd)

    const timespan = getTimeDifference(saveObject.startDateTime, new Date());

    const temHoras = timespan.hours > 0;
    const temMinutos = timespan.minutes > 0;
    const temSegundos = timespan.seconds > 0;
    let txt = "Tempo total: ";
    if(temHoras) {
        txt += `${timespan.hours} horas`;
        if(temMinutos && temSegundos) {
            txt += ", "
        }
        else if(temMinutos || temSegundos){
            txt+= " e "
        }
    }
    if(temMinutos) {
        txt += `${timespan.minutes} minutos`;
        if (temSegundos) txt += " e "
    }
    if(temSegundos){
        txt += `${timespan.seconds} segundos`;
    }
    resultTimeTitle.innerText = txt;

    stepContainer.style.display = "none";
    progressContainer.style.display = "none";
    optionsContainer.style.display = "none"
    resultContainer.style.display = "flex";

    if (saveObject.correctAnswers === saveObject.totalQuestions) {
        resultTitle.textContent = "Parabéns!!";
        resultScoreElement.textContent = `Você acertou todas as ${saveObject.totalQuestions} questões!`;
        resultImg.src = gifTrofeu.src;
        resultImg.alt = gifTrofeu.alt;
    } else if (saveObject.correctAnswers === 0) {
        resultTitle.textContent = "Não foi dessa vez!";
        resultScoreElement.textContent = `Você não acertou nenhuma questão!`;
        resultImg.src = gifTrofeu.src;
        resultImg.alt = gifTrofeu.alt;
    } else {
        resultTitle.textContent = "Parabéns!!";
        resultScoreElement.textContent = `Você acertou ${saveObject.correctAnswers} de ${saveObject.totalQuestions} questões!`;
        resultImg.src = gifTrofeu.src;
        resultImg.alt = gifTrofeu.alt;
    }
}

function nextStep() {
    updateCurrentRoundAndQuestion()
    updateThings()
    loadStep();
}

function getTimeDifference(startDate, endDate) {
    // Calculate difference in milliseconds
    const diffInMs = Math.abs(endDate - startDate);

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

function updateThings(showFullProgressQuestion = false, showFullProgressRound = false){
    updateRoundProgress(showFullProgressQuestion, showFullProgressRound);
    updateRoundNumber();
    atualizarVidas();
}
// Inicializa o primeiro passo
updateThings()
loadStep();
