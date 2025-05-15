import {generateRandomRounds, trashGroups} from "./data/trashData.js";

let rounds = generateRandomRounds()

const totalQuestions = rounds.flat().length;
const answerOptions = [...trashGroups];
const totalLivesPerRound = 5;


let currentRound = 0;
let currentRoundLives = totalLivesPerRound;
let currentQuestion = 0;
let correctAnswers = 0;


//Se acertar a pergunta, passa para proxima pergunta/round
function updateRoundAndQuestion() {
    const round = rounds[currentRound];
    const lastRound = rounds.length - 1;

    const roundQuestionsNum = round.length;
    const lastQuestion = roundQuestionsNum - 1;

    //If its the last question of the round
    if (currentQuestion === lastQuestion) {
        //And If its the last round, terminates the game
        if (currentRound === lastRound) {
            return true;
        }
        //If not, proceeds to the next round
        currentRound++;
        currentQuestion = 0;
        currentRoundLives = totalLivesPerRound;
        atualizarVidas()
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
const scoreElement = document.getElementById("result-score");
const progressElement = document.getElementById("progress-bar-step");
const progressContainer = document.getElementById("step-counter-container");
const vidas = document.getElementById("vidas");
const roundCounter = document.getElementById("round-counter");

const resultTitle = document.getElementById("result-title");
const resultImg = document.getElementById("result-img");


const imgTrofeu = {src: "assets/images/icones/sucesso.gif", alt: "gif de uma mão segurando um troféu"}

function updateRoundProgress() {
    const currProgress = Math.round((100 / rounds[currentRound].length) * (currentQuestion+1));
    console.log("(100 / rounds[currentRound].length) * currentQuestion", (100 / rounds[currentRound].length) * currentQuestion);

    progressElement.style.width = `${currProgress}%`;
    progressElement.setAttribute("aria-valuenow", `${currProgress}`);
    progressElement.innerText = `${currProgress}%`;
}

function updateRoundNumber() {
    roundCounter.innerText = `Round ${currentRound + 1}`
}

function removerVida() {
    currentRoundLives -= 1
    //Sei la, vai que conseguem burlar a contagem e diminiuir mais vidas
    if (currentRoundLives < 0) currentRoundLives = 0
    atualizarVidas()

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
    updateRoundProgress();
    updateRoundNumber();
    atualizarVidas();
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
    currentRound = 0;
    currentQuestion = 0;
    currentRoundLives = totalLivesPerRound;
    rounds = generateRandomRounds()
    atualizarVidas()
    hideResults()
    loadStep()
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

    setTimeout(nextStep, 500)
}

function hideResults() {
    stepContainer.style.removeProperty("display");
    progressContainer.style.removeProperty("display");
    optionsContainer.style.removeProperty("display");
    resultContainer.style.display = "none";
}

function showResults() {
    stepContainer.style.display = "none";
    progressContainer.style.display = "none";
    optionsContainer.style.display = "none"
    resultContainer.style.display = "flex";

    if (correctAnswers === totalQuestions) {
        resultTitle.textContent = "Parabéns!!";
        scoreElement.textContent = `Você acertou todas as ${totalQuestions} questões!`;
        resultImg.src = imgTrofeu.src;
        resultImg.alt = imgTrofeu.alt;
    } else if (correctAnswers === 0) {
        resultTitle.textContent = "Não foi dessa vez!";
        scoreElement.textContent = `Você não acertou nenhuma questão!`;
        resultImg.src = imgTrofeu.src;
        resultImg.alt = imgTrofeu.alt;
    } else {
        resultTitle.textContent = "Parabéns!!";
        scoreElement.textContent = `Você acertou ${correctAnswers} de ${totalQuestions} questões!`;
        resultImg.src = imgTrofeu.src;
        resultImg.alt = imgTrofeu.alt;
    }
}

function nextStep() {
    updateRoundProgress();
    if (currentRoundLives === 0 || updateRoundAndQuestion()) {
        return showResults();
    }

    loadStep();
}

// Inicializa o primeiro passo
loadStep();
