import {trashGroups, trashListOrig} from "./data/trashData.js";

let trashList = [...trashListOrig];

let currentStep = 0;
let correctAnswers = 0;
let vidasAtuais = 7;

const trashNameElement = document.getElementById("trash-name");
const optionsContainer = document.getElementById("options-container");
const stepContainer = document.getElementById("step-container");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("result-score");
const progressElement = document.getElementById("progress-bar-step");
const progressContainer = document.getElementById("step-counter-container");
const questionCounter = document.getElementById("question-counter");
const vidas = document.getElementById("vidas");
const resultTitle = document.getElementById("result-title");
const resultImg = document.getElementById("result-img");


const imgTrofeu = {src:"assets/images/icones/sucesso.gif", alt:"gif de uma mão segurando um troféu"}

//Atualiza a partir da quantidade de perguntas totais e quantas ja foram
function updateProgress() {
    const currProgress = Math.round((100 / trashListOrig.length) * currentStep);
    progressElement.style.width = `${currProgress}%`;
    progressElement.setAttribute("aria-valuenow", `${currProgress}`);
    progressElement.innerText = `${currProgress}%`;
    questionCounter.innerText = `(${currentStep}/${trashListOrig.length})`
}

function removerVida() {
    vidasAtuais -= 1
    //Sei la, vai que conseguem burlar a contagem e diminiuir mais vidas
    if (vidasAtuais < 0) vidasAtuais = 0
    atualizarVidas()

}
function atualizarVidas(){
    vidas.innerHTML = `<span  style="font-size: 30px;transform: scale(.5,1)">&#129505;&nbsp;x${vidasAtuais}</span>`
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
    updateProgress();
    //Pega um indice aleatorio das perguntas faltantes
    const randomIndex = Math.floor(Math.random() * trashList.length);
    const currentTrash = {...trashList[randomIndex]};
    trashList.splice(randomIndex, 1) //Remove a pergunta atual do "pool" de possíveis perguntas

    trashNameElement.textContent = `${currentTrash.name}`;
    optionsContainer.innerHTML = "";

    const answerOptions = [...trashGroups];

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
    currentStep = 0;
    correctAnswers = 0;
    vidasAtuais = 7;
    trashList = [...trashListOrig];
    atualizarVidas()
    hideResults()
    loadStep()
});

//TODO: REMOVER, apenas para debug
// document.getElementById("start-button").click()
// showResults()
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

function hideResults(){
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

    if (correctAnswers === trashList.length) {
        resultTitle.textContent = "Parabéns!!";
        scoreElement.textContent = `Você acertou todas as ${trashList.length} questões!`;
        resultImg.src = imgTrofeu.src;
        resultImg.alt = imgTrofeu.alt;
    }
    else if (correctAnswers === 0) {
        resultTitle.textContent = "Não foi dessa vez!";
        scoreElement.textContent = `Você não acertou nenhuma questão!`;
        resultImg.src = imgTrofeu.src;
        resultImg.alt = imgTrofeu.alt;
    } else {
        resultTitle.textContent = "Parabéns!!";
        scoreElement.textContent = `Você acertou ${correctAnswers} de ${trashList.length} questões!`;
        resultImg.src = imgTrofeu.src;
        resultImg.alt = imgTrofeu.alt;
    }
}

function nextStep() {
    if (vidasAtuais === 0 || trashList.length === 0) {
        updateProgress();
        showResults()
        return;
    }
    currentStep++;
    loadStep();
}


// Inicializa o primeiro passo
loadStep();
