import { trashGroups, trashListOrig } from "./js/data/trashData.js";

// Função para pegar 10 itens aleatórios da lista original
function getRandomQuestions(list, numQuestions) {
    const shuffled = list.sort(() => 0.5 - Math.random()); // Embaralha a lista
    return shuffled.slice(0, numQuestions); // Retorna os primeiros 'numQuestions' itens
}

const trashList = getRandomQuestions([...trashListOrig], 10); // Pegando 10 perguntas aleatórias

let currentStep = 0;
let correctAnswers = 0;
let currentTrash = null; // Armazena a questão atual

const trashNameElement = document.getElementById("trash-name");
const optionsContainer = document.getElementById("options-container");
const stepContainer = document.getElementById("step-container");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const progressElement = document.getElementById("progress-bar-step");
const progressContainer = document.getElementById("step-counter-container");

function updateProgress() {
    const currProgress = Math.round((100 / 10) * correctAnswers); // Só avança quando acerta
    progressElement.style.width = `${currProgress}%`;
    progressElement.setAttribute("aria-valuenow", `${currProgress}`);
    progressElement.innerText = `${currProgress}%`;
}

function loadStep() {
    updateProgress();
    
    if (trashList.length !== 0) {
        currentTrash = trashList.shift(); // Pega o primeiro da fila

        trashNameElement.textContent = `${currentTrash.name}`;
        optionsContainer.innerHTML = "";

        // Pega o grupo correto e dois errados aleatórios
        const correctGroup = trashGroups.find(group => group.name === currentTrash.group);
        const wrongGroups = trashGroups.filter(group => group.name !== currentTrash.group)
                                       .sort(() => 0.5 - Math.random())
                                       .slice(0, 2);

        const answerOptions = [correctGroup, ...wrongGroups].sort(() => 0.5 - Math.random());

        answerOptions.forEach(group => {
            const card = document.createElement("div");
            card.classList.add("option-card");
            card.innerHTML = `
                <img src="${group.image}" alt="${group.name}">
                <p>${group.name}</p>
            `;
            card.addEventListener("click", () => selectGroup(group.name, currentTrash.group));
            optionsContainer.appendChild(card);
        });

    } else {
        stepContainer.style.display = "none";
        progressContainer.style.display = "none";
        showResults();
    }
}

// Tela de transição com animação
document.getElementById("start-button").addEventListener("click", function() {
    const startScreen = document.getElementById("start-screen");
    
    startScreen.classList.add("hidden"); // Adiciona a classe que ativa o fade-out

    setTimeout(() => {
        startScreen.style.display = "none"; // Remove a tela depois da animação
        document.getElementById("step-container").style.display = "block";
        document.getElementById("options-container").style.display = "flex";
        document.getElementById("step-counter-container").style.display = "flex";
    }, 1000); // Tempo deve ser igual ao da animação (1s)
});



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
        updateProgress(); // Atualiza barra de progresso
        setTimeout(nextStep, 500);
    } else {
        // Adiciona a pergunta de volta ao final da fila
        trashList.push(currentTrash);
        setTimeout(loadStep, 500);
    }
}

function showResults() {
    resultContainer.style.display = "block";
    scoreElement.textContent = `Você acertou todas as 10 questões!`;
}

function nextStep() {
    currentStep++;
    loadStep();
}

// Inicializa o primeiro passo
loadStep();
