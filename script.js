const GrupoA = "Grupo A - Resíduo Biológico - Infectante";
const GrupoB = "Grupo B - Resíduos químicos";
const GrupoD = "Grupo D - Resíduos Comuns";
const GrupoE = "Grupo E - Resíduos perfurocortantes";
const Reciclaveis = "Reciclaveis";


const trashListOrig = [
    {name: "ALGODÃO COM SANGUE", group: GrupoA},
    {name: "ALGODÃO COM SECREÇÃO", group: GrupoA},
    {name: "GAZE COM SANGUE", group: GrupoA},
    {name: "GAZE COM SECREÇÃO", group: GrupoA},
    {name: "LUVA", group: GrupoA},
    {name: "ACESSÓRIO VENOSO COM SANGUE.", group: GrupoA},
    {name: "CURATIVOS COM QUALQUER TIPO DE EXCRETA (SECREÇÃO, SANGUE)", group: GrupoA},
    {name: "BOLSAS DE SANGUE TRANSFUNDIDAS USADAS E VAZIAS", group: GrupoA},
    {name: "MÁSCARAS USADA", group: GrupoA},
    {name: "CATÉTER VENOSO PERIFÉRICO SEM AGULHA", group: GrupoA},
    {name: "DIALISADORES USADOS", group: GrupoA},
    {name: "SERINGAS CONTAMINADAS POR QUALQUER FLUIDO, SANGUE/OU SECREÇÕES", group: GrupoA},
    {name: "SONDAS VESICAIS, NASOGÁSTRICAS, OROGÁSTRICAS E ENTÉRICAS USADAS", group: GrupoA},
    {name: "BOLSAS DE COLOSTOMIA E SIMILARES USADAS", group: GrupoA},
    {name: "AVENTAL USADO COM RESÍDUO (QUALQUER SECREÇÃO, EXCRETAS E SANGUE)", group: GrupoA},
    {name: "RECIPIENTE ADEQUADO AO ESTADO FISICO DO RESÍDUO (Sólidos, Gasosos e Líquidos) SEPARADA E IDENTIFFICADA - RESÍDUO QUÍMICO - FRASCO VAZIO DE MEDICAÇÃO COM símbolo universal do risco químico OU FRASCO DE QUIMIOTERÁPICOS", group: GrupoB},
    {name: "CAIXA SEPARADA E IDENTIFICADA - RESÍDUO QUIMICO - FRASCO DE MEDICAÇÃO VENCIDA COM símbolo universal do risco químico", group: GrupoB},
    {name: "PRODUTOS DE MANIPULAÇÃO COM ANTINEOPLÁSICOS, AGULHAS USADAS PARA PREPARO E APLICAÇÃO DO QUIMIOTERÁPICO", group: GrupoB},
    {name: "EQUIPOS UTILIZADOS NO PREPARO E NA MANIPULAÇÃO DE QUIMIOTERÁPICOS.", group: GrupoB},
    {name: "FRASCOS DE SORO UTILIZADOS NO PREPARO E NA MANIPULAÇÃO DE QUIMIOTERÁPICOS.", group: GrupoB},
    {name: "ESPARADRAPOS E ADESIVOS UTILIZADOS NO PREPARO E NA MANIPULAÇÃO DE QUIMIOTERÁPICOS.", group: GrupoB},
    {name: "CATÉTERES EM GERAL UTILIZADOS NO PREPARO E NA MANIPULAÇÃO DE QUIMIOTERÁPICOS.", group: GrupoB},
    {name: "FILTROS E MÁSCARAS UTILIZADOS NO PREPARO E NA MANIPULAÇÃO DE QUIMIOTERÁPICOS.", group: GrupoB},
    {name: "ALGODÃO SEM SANGUE OU SECREÇÃO", group: GrupoD},
    {name: "GAZE SEM SANGUE OU SECREÇÃO", group: GrupoD},
    {name: "AVENTAL USADO SEM RESÍDUO (QUALQUER SECREÇÃO, EXCRETAS E SANGUE)", group: GrupoD},
    {name: "GAZE SEM SANGUE OU SECREÇÃO", group: GrupoD},
    {name: "QUALQUER RESÍDUO QUE NÃO TENHA RISCO DE CONTAMINAÇÃO E NÃO PERFURANTE", group: GrupoD},
    {name: "FRALDA COM URINA E/ OU FEZES", group: GrupoD},
    {name: "RESTOS ALIMENTARES", group: GrupoD},
    {name: "AGULHA GUIA DE QUALQUER TIPO DE CATETER DE PUNÇÃO DE QUALQUER TAMANHO (Punção venosa periférica, punção venosa profunda, Punção arterial )", group: GrupoE},
    {name: "ESTILHAÇOS DE VIDRO", group: GrupoE},
    {name: "SERINGAS COM AGULHAS", group: GrupoE},
    {name: "ESCALPES", group: GrupoE},
    {name: "AMPOLAS DE VIDRO", group: GrupoE},
    {name: "PONTAS DIAMANTADAS", group: GrupoE},
    {name: "LÂMINAS DE BISTURI DE QUALQUER TAMANHO", group: GrupoE},
    {name: "FRASCOS DE VIDRO VAZIOS SEM O SÍMBOLO DE RADIOATIVOS", group: GrupoE},
    {name: "TUBOS CAPILARES", group: GrupoE},
    {name: "LÂMINAS E LAMÍNULAS", group: GrupoE},
    {name: "PLÁSTICOS", group: Reciclaveis},
    {name: "PAPÉIS", group: Reciclaveis},
    {name: "INVÓLUCROS DE PRODUTOS (SERINGAS", group: Reciclaveis},
    {name: "PAPEL", group: Reciclaveis},
    {name: "CATÉTERES", group: Reciclaveis},
    {name: "DE COMPRESSAS )", group: Reciclaveis},
    {name: "PAPELÃO", group: Reciclaveis},
    {name: "GARRAFAS PET", group: Reciclaveis},
    {name: "LATAS DE ALUMÍNIO", group: Reciclaveis},
    {name: "DESDE QUE LIMPOS E SECOS.", group: Reciclaveis},
];

// trashListOrig.splice(10)

const trashList = [...trashListOrig]
// console.log("trashList.len", trashList.trashListOrig)

const trashGroups = [
    {name: GrupoA, image: "GrupoA.jpg"},
    {name: GrupoB, image: "GrupoB.jpg"},
    {name: GrupoD, image: "GrupoD.png"},
    {name: GrupoE, image: "GrupoE.jpg"},
    {name: Reciclaveis, image: "GrupoReciclavel.jpg"},
];

// const trashGroups = [
//     {name: "Grupo A", image: "http://www.atitudeambiental.com/assets/images/groupa.jpg"},
//     {name: "Grupo B", image: "http://www.atitudeambiental.com/assets/images/groupb.jpg"},
//     {name: "Grupo D", image: "https://images.tcdn.com.br/img/img_prod/808734/adesivo_lixo_organico_1_unidade_10cmx10cm_7727_1_11fbbd81121248576acfe6dbf15171ac.jpeg"},
//     {name: "Grupo E", image: "http://www.atitudeambiental.com/assets/images/groupe.jpg"},
//     {name: "Recicláveis", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9XujDZVPoR4cYXeXHLNGIhLWI5PDHpcqTtQ&s"},
// ];

let currentStep = 0;
let correctAnswers = 0;

const trashNameElement = document.getElementById("trash-name");
const optionsContainer = document.getElementById("options-container");
const stepContainer = document.getElementById("step-container");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const progressElement = document.getElementById("progress-bar-step");
const progressContainer = document.getElementById("step-counter-container");

function updateProgress() {
    const currProgress = Math.round((100 / trashListOrig.length) * currentStep);
    console.log(currProgress)
    progressElement.style.width = `${currProgress}%`;
    progressElement.setAttribute("aria-valuenow", `${currProgress}`);
    progressElement.innerText = `${currProgress}%`;
    console.log(progressElement.getAttribute("aria-valuenow"))
}

function loadStep() {
    updateProgress()
    if (trashList.length !== 0) {
        const randomIndex = Math.floor(Math.random() * trashList.length);
        const currentTrash = {...trashList[randomIndex]};
        trashList.splice(randomIndex,1)

        trashNameElement.textContent = `${currentTrash.name}`;
        optionsContainer.innerHTML = "";

        trashGroups.forEach(group => {
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

function selectGroup(selectedGroup, correctGroup) {
    const cards = optionsContainer.querySelectorAll(".option-card");
    cards.forEach(card => {
        card.style.pointerEvents = "none"; // Desativa cliques adicionais
        const groupName = card.querySelector("p").textContent;

        if (groupName === correctGroup) {
            card.classList.add("correct"); // Adiciona classe de acerto
        } else if (groupName === selectedGroup && selectedGroup !== correctGroup) {
            card.classList.add("incorrect"); // Adiciona classe de erro
        }
    });

    if (selectedGroup === correctGroup) {
        correctAnswers++;
    }

    setTimeout(nextStep,500)
}

function showResults() {
    resultContainer.style.display = "block";
    scoreElement.textContent = `Você acertou ${correctAnswers} de ${trashListOrig.length}!`;
    // nextButton.style.display = "none";
}

// nextButton.addEventListener("click", () => {
//     currentStep++;
//     loadStep();
// });

function nextStep() {
    currentStep++;
    loadStep();
}

// Initialize the first step
loadStep();