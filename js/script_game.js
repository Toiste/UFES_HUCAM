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

/* ------------------------------------------------ GERENCIAMENTE DE SAVE ------------------------------------------------ */
function createSave() {
    try{
        let roundsGenerated = generateRandomRounds();
        const baseObject = {
            rounds:roundsGenerated,
            totalQuestions: roundsGenerated.flat().length,
            currentRoundLives: totalLivesPerRound,
            currentRound: 0,
            currentQuestion: 0,
            correctAnswers: 0,
            startDateTime: new Date(),
            timePerQuestion:[]
        }
        let lst = [];
        roundsGenerated.forEach(r=> {
            let lstR = [];
            for(let i = 0; i<r.length; i++) lstR.push([]);
            lst.push(lstR);
        })
        baseObject.timePerQuestion = lst;
        const newObj ={...baseObject};
        console.log("created", newObj)
        return {...baseObject};
    }catch (e) {
        console.log("error creating", e)
        return null;
    }
}


//Retorna o json do save ou null caso não exista
const loadSave = () => {

    const item = window.localStorage.getItem(localStorageKeyName);
    if(item === null){
        console.log("not found, creating");
        return null;
    }

    try {
        const json = JSON.parse(item);
        console.log("found, parsed");
        return json;
    }
    catch(e){
        console.log("found, parsed");
        console.log(e);
    }


}

//Caso exista save, carrega ele, se não cria um novo save
const loadOrGenerateSaveObject = () => loadSave() ?? createSave();

//Salva o progresso atual
const saveSave = () => {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify({...saveObject}))
};
//Deleta o save para gerar um novo ao reiniciar
const deleteSave = () => window.localStorage.removeItem(localStorageKeyName);

let saveObject = loadOrGenerateSaveObject()
console.log("saveObject first",saveObject)
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
    saveObject.currentRoundLives -= 1;
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
function updateRoundProgress(showFullProgressQuestion = false) {
    updateProgressOfElement(progressElementQuestion, saveObject.rounds[saveObject.currentRound], saveObject.currentQuestion, showFullProgressQuestion);
    // updateProgressOfElement(progressRoundElement, saveObject.rounds, saveObject.currentRound, showFullProgressRound);
}
/*
* Atualiza a visualização do round atual
*/
function updateRoundNumber() {
    roundCounter.innerText = `Round ${saveObject.currentRound + 1} de ${saveObject.rounds.length}`
}

/*
* Atualiza a visualização das vidas
*/
function atualizarVidas() {
    vidas.innerHTML = `<span  style="font-size: 30px;transform: scale(.5,1)">&#129505;&nbsp;x${saveObject.currentRoundLives}</span>`
}

/*
* Carrega cada passo de pergunta:
* - Salva o progresso até o momento
* - Pega a próxima pergunta
* - Monta as opões e os eventos de resposta
*/
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

    saveObject.timePerQuestion[saveObject.currentRound][saveObject.currentQuestion][0] = new Date();

}

// Tela de transição com animação

document.getElementById("start-button").addEventListener("click", function () {
    const startScreen = document.getElementById("start-screen");

    startScreen.classList.add("hidden"); // Adiciona a classe que ativa o fade-out
    //Se o save foi carregado finalizado, não mostrar ao carregar
    if(isFinalizedOrNoLivesRemaining()) return;
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
/*
* Verifica se o grupo selecionado foi correto ou não. Caso não, remove uma vida. Caso sim, adiciona na qtd de respostas corretas
*/
function selectGroup(selectedGroup, correctGroup) {
    saveObject.timePerQuestion[saveObject.currentRound][saveObject.currentQuestion][1] = new Date();
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
        //Se ficou sem vida após responder ou se respondeu a última pergunta do último round, mostra os resultados
        if(isFinalizedOrNoLivesRemaining()){
            return showResults();
        }
        //Se respondeu a última pergunta do round atual, mostra uma animação de round completo para depois mandar para o próximo round
        if(isLastQuestionOfRound()){
            return showRoundComplete();
        }
        //Vai para a próxima pergunta
        return nextStep()
    },500)
}

function showRoundComplete(){
    updateVisuals(true)
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

function getTotalMs(){
    let diffInMs = 0;

    for (let r=0; r<saveObject.timePerQuestion.length; r++){
        const round  = saveObject.timePerQuestion[r];
        for (let q=0; q<round.length; q++){
            const question  = round[q];
            if(question.length === 0) continue;
            if(question.length === 2){
                diffInMs+= Math.abs(new Date(question[1])-new Date(question[0]));
            }
        }
    }

    return diffInMs;
}

function showResults() {
    saveSave()
    updateVisuals(isLastQuestionOfLastRound())

    const timespan = getTimeDifference(getTotalMs());

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
    updateVisuals()
    loadStep();
}

function getTimeDifference(diffInMs) {
    // Calculate difference in milliseconds
    // const diffInMs = Math.abs(endDate - startDate);

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

function updateVisuals(showFullProgressQuestion = false){
    updateRoundProgress(showFullProgressQuestion);
    updateRoundNumber();
    atualizarVidas();
}
function isFinalizedOrNoLivesRemaining(){
    return isLastQuestionOfLastRound() || saveObject.currentRoundLives === 0
}

while (Object.keys(saveObject).length === 0){
    console.log("saveObject entrou while",saveObject)
    saveObject = loadOrGenerateSaveObject()
    console.log("saveObject saindo while",saveObject)
}

updateVisuals()
//Se carregou o save finalizado ou sem vida, mostra direto a parte de resultados
if(isFinalizedOrNoLivesRemaining())
    showResults()
else
    loadStep()
