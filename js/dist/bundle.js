/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ts/data.ts":
/*!********************!*\
  !*** ./ts/data.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   answerOptions: () => (/* binding */ answerOptions),\n/* harmony export */   generateRandomRounds: () => (/* binding */ generateRandomRounds),\n/* harmony export */   localStorageKeyName: () => (/* binding */ localStorageKeyName),\n/* harmony export */   questionsPerRound: () => (/* binding */ questionsPerRound),\n/* harmony export */   totalLivesPerRound: () => (/* binding */ totalLivesPerRound),\n/* harmony export */   totalRounds: () => (/* binding */ totalRounds),\n/* harmony export */   trashListOrig: () => (/* binding */ trashListOrig)\n/* harmony export */ });\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar GrupoA = \"Resíduo Biológico Infectante\";\nvar GrupoB = \"Resíduos químicos\";\nvar GrupoD = \"Resíduos Comuns\";\nvar GrupoE = \"Resíduos perfurocortantes\";\nvar Reciclaveis = \"Reciclaveis\";\nvar totalRounds = 10;\nvar questionsPerRound = 5;\nvar localStorageKeyName = \"grrs_progress\";\nvar totalLivesPerRound = 3;\nvar trashListOrig = [\n    { name: \"ALGODÃO COM SANGUE\", group: GrupoA, hideGroups: [] },\n    { name: \"ALGODÃO COM SECREÇÃO\", group: GrupoA, hideGroups: [] },\n    { name: \"GAZE COM SANGUE\", group: GrupoA, hideGroups: [] },\n    { name: \"GAZE COM SECREÇÃO\", group: GrupoA, hideGroups: [] },\n    { name: \"LUVAS SEM CONTATO COM SANGUE OU LIQUIDOS CORPÓREOS\", group: GrupoD, hideGroups: [] },\n    { name: \"LUVAS COM SANGUE OU LIQUIDOS COPÓREOS\", group: GrupoA, hideGroups: [] },\n    { name: \"CATETER ARTERIAL COM SANGUE SEM O GUIA\", group: GrupoA, hideGroups: [] },\n    { name: \"FRASCOS DE SORO E EQUIPOS USADOS\", group: GrupoA, hideGroups: [] },\n    { name: \"COBERTURA DE CURATIVOS COM SECREÇÃO OU SANGUE\", group: GrupoA, hideGroups: [] },\n    { name: \"COMPRESSAS CIRURGICAS COM SANGUE OU SECREÇÃO\", group: GrupoA, hideGroups: [] },\n    { name: \"BOLSAS DE SANGUE TRANSFUNDIDAS USADAS E VAZIAS\", group: GrupoA, hideGroups: [] },\n    { name: \"MÁSCARAS CIRURGICAS USADAS\", group: GrupoA, hideGroups: [] },\n    { name: \"MÁSCARAS TIPO N95/EQUIVALENTE USADAS\", group: GrupoA, hideGroups: [] },\n    { name: \"CATÉTER VENOSO PERIFÉRICO SEM AGULHA\", group: GrupoA, hideGroups: [] },\n    { name: \"DIALISADORES USADOS\", group: GrupoA, hideGroups: [] },\n    { name: \"SERINGAS CONTAMINADAS POR QUALQUER FLUIDO, SANGUE/OU SECREÇÕES\", group: GrupoA, hideGroups: [] },\n    { name: \"SONDAS VESICAIS, NASOGÁSTRICAS, OROGÁSTRICAS E ENTÉRICAS USADAS\", group: GrupoA, hideGroups: [] },\n    { name: \"BOLSAS DE COLOSTOMIA E SIMILARES USADAS\", group: GrupoA, hideGroups: [] },\n    { name: \"AVENTAL USADO COM RESÍDUO DE SECREÇÃO, EXCRETAS OU SANGUE\", group: GrupoA, hideGroups: [] },\n    { name: \"FRASCO VAZIO COM SIMBOLO UNIVERSAL DE RISCO QUIMICO\", group: GrupoB, hideGroups: [] },\n    { name: \"FRASCO DE QUIMIOTERÁPICO VAZIO\", group: GrupoB, hideGroups: [] },\n    { name: \"FRASCO DE MEDICAÇÃO VENCIDA COM símbolo universal do risco químico\", group: GrupoB, hideGroups: [] },\n    { name: \"EQUIPOS UTILIZADOS NO PREPARO E NA MANIPULAÇÃO DE ANTINEOPLÁSICOS.\", group: GrupoB, hideGroups: [] },\n    { name: \"FRASCOS DE SORO UTILIZADOS NO PREPARO E NA MANIPULAÇÃO DE ANTINEOPLÁSICOS\", group: GrupoB, hideGroups: [] },\n    { name: \"ESPARADRAPOS E ADESIVOS UTILIZADOS NO PREPARO E NA MANIPULAÇÃO DE ANTINEOPLÁSICOS\", group: GrupoB, hideGroups: [] },\n    { name: \"CATÉTERES EM GERAL UTILIZADOS NO PREPARO E NA MANIPULAÇÃO DE ANTINEOPLÁSICOS\", group: GrupoB, hideGroups: [] },\n    { name: \"FILTROS E MÁSCARAS UTILIZADOS NO PREPARO E NA MANIPULAÇÃO DE ANTINEOPLÁSICOS\", group: GrupoB, hideGroups: [] },\n    { name: \"ALGODÃO SEM SANGUE OU SECREÇÃO\", group: GrupoD, hideGroups: [] },\n    { name: \"GAZES SEM SANGUE OU SECREÇÃO\", group: GrupoD, hideGroups: [] },\n    { name: \"AVENTAIS USADOS SEM RESÍDUO (QUALQUER SECREÇÃO, EXCRETAS E SANGUE)\", group: GrupoD, hideGroups: [] },\n    { name: \"ABSORVENTES HIGIÊNICOS\", group: GrupoD, hideGroups: [] },\n    { name: \"FRALDAS COM URINA E/ OU FEZES\", group: GrupoD, hideGroups: [] },\n    { name: \"PAPEIS MOLHADOS\", group: GrupoD, hideGroups: [] },\n    { name: \"RESTOS ALIMENTARES\", group: GrupoD, hideGroups: [] },\n    { name: \"ESTILHAÇOS DE VIDRO\", group: GrupoE, hideGroups: [] },\n    { name: \"SERINGAS COM AGULHAS\", group: GrupoE, hideGroups: [] },\n    { name: \"ESCALPES\", group: GrupoE, hideGroups: [] },\n    { name: \"AMPOLAS DE VIDRO\", group: GrupoE, hideGroups: [] },\n    { name: \"PONTAS DIAMANTADAS\", group: GrupoE, hideGroups: [] },\n    { name: \"LÂMINAS DE BISTURI\", group: GrupoE, hideGroups: [] },\n    { name: \"FRASCOS DE VIDRO VAZIOS SEM O SÍMBOLO DE RADIOATIVOS\", group: GrupoE, hideGroups: [] },\n    { name: \"TUBOS CAPILARES\", group: GrupoE, hideGroups: [] },\n    { name: \"LÂMINAS E LAMÍNULAS\", group: GrupoE, hideGroups: [] },\n    { name: \"PLÁSTICOS LIMPOS E SECOS\", group: Reciclaveis, hideGroups: [] },\n    { name: \"INVOLUCROS LIMPOS E SECOS DE PRODUTOS HOSPITALARES\", group: Reciclaveis, hideGroups: [] },\n    { name: \"PAPEIS LIMPOS E SECOS\", group: Reciclaveis, hideGroups: [] },\n    { name: \"EMBALAGENS LIMPAS E SECAS DE PRODUTOS HOSPITALARES\", group: Reciclaveis, hideGroups: [] },\n    { name: \"PAPELÕES LIMPOS E SECOS\", group: Reciclaveis, hideGroups: [] },\n    { name: \"GARRAFAS PET VAZIAS, LIMPAS E SECAS\", group: Reciclaveis, hideGroups: [] },\n    { name: \"LATAS DE ALUMÍNIO VAZIAS, LIMPAS E SECAS\", group: Reciclaveis, hideGroups: [] },\n    { name: \"AGULHAS USADAS PARA PREPARO E APLICAÇÃO DE ANTINEOPLÁSICOS\", group: GrupoE, hideGroups: [GrupoB] }, //GrupoBE\n    { name: \"QUALQUER PERFURO CORTANTE QUE TENHA CONTATO COM ANTINEOPLÁSICOS\", group: GrupoE, hideGroups: [GrupoB] }, //GrupoBE\n    { name: \"ESCALPES USADOS PARA INFUSÃO DE ANTINEOPLASICOS\", group: GrupoE, hideGroups: [GrupoB] }, //GrupoBE\n];\nvar trashGroups = [\n    { name: GrupoA, image: \"GrupoA.jpg\" },\n    { name: GrupoB, image: \"GrupoB.jpg\" },\n    { name: GrupoD, image: \"GrupoD.png\" },\n    { name: GrupoE, image: \"GrupoE.jpg\" },\n    { name: Reciclaveis, image: \"GrupoReciclavel.jpg\" },\n];\nvar answerOptions = __spreadArray([], trashGroups, true);\nfunction generateRandomRounds() {\n    //Copies original list to manipulate\n    var trashList = __spreadArray([], trashListOrig, true);\n    var roundList = [];\n    for (var r = 0; r < totalRounds; r++) {\n        var round = [];\n        for (var q = 0; q < questionsPerRound; q++) {\n            //If the list doesnt have more questions, return the current round list\n            if (trashList.length === 0) {\n                //If the round has any questions, adds the current round before returning\n                if (round.length !== 0)\n                    roundList.push(round);\n                return roundList;\n            }\n            var randomIndex = Math.floor(Math.random() * trashList.length);\n            var currentTrash = __assign({}, trashList[randomIndex]);\n            trashList.splice(randomIndex, 1); //Remove a pergunta atual do \"pool\" de possíveis perguntas\n            round.push(currentTrash);\n        }\n        roundList.push(round);\n    }\n    return roundList;\n}\n\n\n//# sourceURL=webpack://UFES_HUCAM/./ts/data.ts?");

/***/ }),

/***/ "./ts/elements.ts":
/*!************************!*\
  !*** ./ts/elements.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   optionsContainer: () => (/* binding */ optionsContainer),\n/* harmony export */   progressContainer: () => (/* binding */ progressContainer),\n/* harmony export */   progressElementQuestion: () => (/* binding */ progressElementQuestion),\n/* harmony export */   resultContainer: () => (/* binding */ resultContainer),\n/* harmony export */   resultImg: () => (/* binding */ resultImg),\n/* harmony export */   resultScoreElement: () => (/* binding */ resultScoreElement),\n/* harmony export */   resultTimeTitle: () => (/* binding */ resultTimeTitle),\n/* harmony export */   resultTitle: () => (/* binding */ resultTitle),\n/* harmony export */   roundCompleteContainer: () => (/* binding */ roundCompleteContainer),\n/* harmony export */   roundCompleteTitle: () => (/* binding */ roundCompleteTitle),\n/* harmony export */   roundCounter: () => (/* binding */ roundCounter),\n/* harmony export */   stepContainer: () => (/* binding */ stepContainer),\n/* harmony export */   trashNameElement: () => (/* binding */ trashNameElement),\n/* harmony export */   vidas: () => (/* binding */ vidas)\n/* harmony export */ });\nvar trashNameElement = getById(\"trash-name\");\nvar optionsContainer = getById(\"options-container\");\nvar stepContainer = getById(\"step-container\");\nvar resultContainer = getById(\"result-container\");\nvar resultTitle = getById(\"result-title\");\nvar resultImg = getById(\"result-img\");\nvar resultScoreElement = getById(\"result-score\");\nvar resultTimeTitle = getById(\"time-title\");\nvar roundCompleteContainer = getById(\"round-complete-container\");\nvar roundCompleteTitle = getById(\"round-complete-title\");\nvar progressElementQuestion = getById(\"progress-bar-step-question\");\n// export const progressRoundElement = getById(\"progress-bar-step-round\")!;\nvar progressContainer = getById(\"step-counter-container\");\nvar vidas = getById(\"vidas\");\nvar roundCounter = getById(\"round-counter\");\nfunction getById(id) {\n    return document.getElementById(id);\n}\n\n\n//# sourceURL=webpack://UFES_HUCAM/./ts/elements.ts?");

/***/ }),

/***/ "./ts/main.ts":
/*!********************!*\
  !*** ./ts/main.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./save */ \"./ts/save.ts\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ \"./ts/data.ts\");\n/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./elements */ \"./ts/elements.ts\");\n\n\n\nvar saveObject = (0,_save__WEBPACK_IMPORTED_MODULE_0__.loadOrGenerateSaveObject)();\n/*\n* Verifica se a a resposta dada era a última do round\n*/\nfunction isLastQuestionOfRound() {\n    var round = saveObject.rounds[saveObject.currentRound];\n    var roundQuestionsNum = round.length;\n    var lastQuestion = roundQuestionsNum - 1;\n    return saveObject.currentQuestion === lastQuestion;\n}\n/*\n* Verifica se a a resposta dada era a última do ultimo round\n*/\nfunction isLastQuestionOfLastRound() {\n    var lastRound = saveObject.rounds.length - 1;\n    return isLastQuestionOfRound() && saveObject.currentRound === lastRound;\n}\n/*\n* Pula para a próxima pergunta. Caso seja a última pergunta do round, pula para o próximo round.\n*/\nfunction updateCurrentRoundAndQuestion() {\n    if (isLastQuestionOfRound()) {\n        saveObject.currentRound++;\n        saveObject.currentQuestion = 0;\n        saveObject.currentRoundLives = _data__WEBPACK_IMPORTED_MODULE_1__.totalLivesPerRound;\n        return;\n    }\n    //If its not the end of the round, goes to the next question\n    saveObject.currentQuestion++;\n}\n/*\n* Diminui a vida caso tenha errado a resposta\n*/\nfunction removerVida() {\n    saveObject.currentRoundLives -= 1;\n    //Sei la, vai que conseguem burlar a contagem e diminiuir mais vidas\n    if (saveObject.currentRoundLives < 0)\n        saveObject.currentRoundLives = 0;\n}\n/*\n* Atualiza as barras de progresso a partir do elemento\n*/\nfunction updateProgressOfElement(element, list, current, showFull) {\n    if (showFull === void 0) { showFull = false; }\n    if (showFull) {\n        element.style.width = \"100%\";\n        element.setAttribute(\"aria-valuenow\", \"100\");\n        element.innerText = \"100%\";\n        return;\n    }\n    var currProgressQuestion = Math.round((100 / list.length) * (current));\n    element.style.width = \"\".concat(currProgressQuestion, \"%\");\n    element.setAttribute(\"aria-valuenow\", \"\".concat(currProgressQuestion));\n    element.innerText = \"\".concat(currProgressQuestion, \"%\");\n}\n/*\n* Atualiza as barras de progresso de pergunta e round\n*/\nfunction updateRoundProgress(showFullProgressQuestion) {\n    if (showFullProgressQuestion === void 0) { showFullProgressQuestion = false; }\n    updateProgressOfElement(_elements__WEBPACK_IMPORTED_MODULE_2__.progressElementQuestion, saveObject.rounds[saveObject.currentRound], saveObject.currentQuestion, showFullProgressQuestion);\n    // updateProgressOfElement(progressRoundElement, saveObject.rounds, saveObject.currentRound, showFullProgressRound);\n}\n/*\n* Atualiza a visualização do round atual\n*/\nfunction updateRoundNumber() {\n    _elements__WEBPACK_IMPORTED_MODULE_2__.roundCounter.innerText = \"\".concat(saveObject.currentRound + 1, \" de \").concat(saveObject.rounds.length);\n}\n/*\n* Atualiza a visualização das vidas\n*/\nfunction atualizarVidas() {\n    _elements__WEBPACK_IMPORTED_MODULE_2__.vidas.innerHTML = \"<span  style=\\\"font-size: 25px;transform: scale(.5,1)\\\">&#129505;&nbsp;x\".concat(saveObject.currentRoundLives, \"</span>\");\n}\n\n\n//# sourceURL=webpack://UFES_HUCAM/./ts/main.ts?");

/***/ }),

/***/ "./ts/save.ts":
/*!********************!*\
  !*** ./ts/save.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   deleteSave: () => (/* binding */ deleteSave),\n/* harmony export */   loadOrGenerateSaveObject: () => (/* binding */ loadOrGenerateSaveObject),\n/* harmony export */   saveSave: () => (/* binding */ saveSave)\n/* harmony export */ });\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./ts/data.ts\");\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\n\nfunction createSave() {\n    try {\n        var roundsGenerated = (0,_data__WEBPACK_IMPORTED_MODULE_0__.generateRandomRounds)();\n        var baseObject = {\n            rounds: roundsGenerated,\n            totalQuestions: roundsGenerated.flat().length,\n            currentRoundLives: _data__WEBPACK_IMPORTED_MODULE_0__.totalLivesPerRound,\n            currentRound: 0,\n            currentQuestion: 0,\n            correctAnswers: 0,\n            timePerQuestion: {}\n        };\n        return __assign({}, baseObject);\n    }\n    catch (e) {\n        console.log(\"error creating\", e);\n        return null;\n    }\n}\nfunction loadSave() {\n    var item = window.localStorage.getItem(_data__WEBPACK_IMPORTED_MODULE_0__.localStorageKeyName);\n    if (item === null) {\n        return null;\n    }\n    try {\n        return JSON.parse(item);\n    }\n    catch (e) {\n        console.log(\"error parsing\");\n        console.log(e);\n        return null;\n    }\n}\nvar loadOrGenerateSaveObject = function () { var _a; return (_a = loadSave()) !== null && _a !== void 0 ? _a : createSave(); };\nvar saveSave = function (saveObj) {\n    window.localStorage.setItem(_data__WEBPACK_IMPORTED_MODULE_0__.localStorageKeyName, JSON.stringify(__assign({}, saveObj)));\n};\nvar deleteSave = function () { return window.localStorage.removeItem(_data__WEBPACK_IMPORTED_MODULE_0__.localStorageKeyName); };\n\n\n//# sourceURL=webpack://UFES_HUCAM/./ts/save.ts?");

/***/ }),

/***/ "./ts/utils.ts":
/*!*********************!*\
  !*** ./ts/utils.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getTotalMsTimePerQuestion: () => (/* binding */ getTotalMsTimePerQuestion)\n/* harmony export */ });\nfunction getTotalMsTimePerQuestion(dict) {\n    var totalMsAllQuestion = 0;\n    var keysRounds = Object.keys(dict);\n    keysRounds.forEach(function (kr) {\n        var roundQuestions = dict[Number(kr)];\n        var keysQuestions = Object.keys(roundQuestions);\n        keysQuestions.forEach(function (kq) {\n            var questionTimes = roundQuestions[Number(kq)];\n            var questionTimeEnd = questionTimes[1];\n            var questionTimeBegin = questionTimes[0];\n            totalMsAllQuestion += questionTimeEnd - questionTimeBegin;\n        });\n    });\n    return totalMsAllQuestion;\n}\n\n\n//# sourceURL=webpack://UFES_HUCAM/./ts/utils.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./ts/data.ts");
/******/ 	__webpack_require__("./ts/main.ts");
/******/ 	var __webpack_exports__ = __webpack_require__("./ts/utils.ts");
/******/ 	
/******/ })()
;