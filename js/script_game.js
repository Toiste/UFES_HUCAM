import {generateRandomRounds, trashGroups} from "./data/trashData.js";

let rounds = generateRandomRounds()

const totalQuestions = rounds.flat().length;
const answerOptions = [...trashGroups];
const totalLivesPerRound = 5;

let currentRound = 0;
let currentRoundLives = totalLivesPerRound;
let currentQuestion = 0;
let correctAnswers = 0;

let startDateTime = new Date();

function wasLastQuestionOfRound(){
    const round = rounds[currentRound];
    const roundQuestionsNum = round.length;
    const lastQuestion = roundQuestionsNum - 1;
    return currentQuestion === lastQuestion
}

function wasLastQuestionOfLastRound(){
    const lastRound = rounds.length - 1;

    return wasLastQuestionOfRound() && currentRound === lastRound;
}

function updateCurrentRoundAndQuestion() {
    if (wasLastQuestionOfRound()) {
        currentRound++;
        currentQuestion = 0;
        currentRoundLives = totalLivesPerRound;

        return false;
    }

    //If its not the end of the round, goes to the next question
    currentQuestion++;
    return false;
}

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
const progressRoundElement = document.getElementById("progress-bar-step-round");
const progressContainer = document.getElementById("step-counter-container");

const vidas = document.getElementById("vidas");
const roundCounter = document.getElementById("round-counter");

const gifTrofeu = {src: "assets/images/icones/sucesso.gif", alt: "gif de uma mão segurando um troféu"}

function updateRoundProgress(showFullProgressQuestion = false, showFullProgressRound = false) {
    if(showFullProgressQuestion){
        progressElementQuestion.style.width = `100%`;
        progressElementQuestion.setAttribute("aria-valuenow", `100`);
        progressElementQuestion.innerText = `100%`;
    }
    else{
        const currProgressQuestion = Math.round((100 / rounds[currentRound].length) * (currentQuestion));
        progressElementQuestion.style.width = `${currProgressQuestion}%`;
        progressElementQuestion.setAttribute("aria-valuenow", `${currProgressQuestion}`);
        progressElementQuestion.innerText = `${currProgressQuestion}%`;
    }

    if(showFullProgressRound){
        progressRoundElement.style.width = `100%`;
        progressRoundElement.setAttribute("aria-valuenow", `100`);
        progressRoundElement.innerText = `100%`;

        progressElementQuestion.style.width = `100%`;
        progressElementQuestion.setAttribute("aria-valuenow", `100`);
        progressElementQuestion.innerText = `100%`;
    }
    else{
        const currProgressRound = Math.round((100 / rounds.length) * (currentRound));

        progressRoundElement.style.width = `${currProgressRound}%`;
        progressRoundElement.setAttribute("aria-valuenow", `${currProgressRound}`);
        progressRoundElement.innerText = `${currProgressRound}%`;
    }





}

function updateRoundNumber() {
    roundCounter.innerText = `Round ${currentRound + 1}`
}

function removerVida() {
    currentRoundLives -= 1
    //Sei la, vai que conseguem burlar a contagem e diminiuir mais vidas
    if (currentRoundLives < 0) currentRoundLives = 0
    // atualizarVidas()

}

function atualizarVidas() {
    vidas.innerHTML = `<span  style="font-size: 30px;transform: scale(.5,1)">&#129505;&nbsp;x${currentRoundLives}</span>`
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
    console.log(`Current Question: ${currentQuestion+1}(${currentQuestion})/${rounds[currentRound].length}`)
    console.log(`Current Round: ${currentRound+1}(${currentRound})/${rounds.length}`)
    const currentTrash = rounds[currentRound][currentQuestion];

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

document.getElementById("reset-button").addEventListener("click", function () {
    startDateTime = new Date()
    currentRound = 0;
    currentQuestion = 0;
    currentRoundLives = totalLivesPerRound;
    rounds = generateRandomRounds()
    atualizarVidas()
    hideResults()
    loadStep()
    updateThings()
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
        correctAnswers++;
    } else {
        removerVida()
    }

    setTimeout(()=>{
        if(currentRoundLives === 0 || wasLastQuestionOfLastRound()){
            return showResults();
        }

        if(wasLastQuestionOfRound()){
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
    roundCompleteTitle.innerText = `Round ${currentRound+1} completo!`
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
    const isEnd = wasLastQuestionOfLastRound()
    updateThings(isEnd, isEnd)

    const timespan = getTimeDifference(startDateTime, new Date());

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

    if (correctAnswers === totalQuestions) {
        resultTitle.textContent = "Parabéns!!";
        resultScoreElement.textContent = `Você acertou todas as ${totalQuestions} questões!`;
        resultImg.src = gifTrofeu.src;
        resultImg.alt = gifTrofeu.alt;
    } else if (correctAnswers === 0) {
        resultTitle.textContent = "Não foi dessa vez!";
        resultScoreElement.textContent = `Você não acertou nenhuma questão!`;
        resultImg.src = gifTrofeu.src;
        resultImg.alt = gifTrofeu.alt;
    } else {
        resultTitle.textContent = "Parabéns!!";
        resultScoreElement.textContent = `Você acertou ${correctAnswers} de ${totalQuestions} questões!`;
        resultImg.src = gifTrofeu.src;
        resultImg.alt = gifTrofeu.alt;
    }
}

function nextStep() {
    updateCurrentRoundAndQuestion()
    updateThings()
    loadStep();
}

export function getTimeDifference(startDate, endDate) {
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
