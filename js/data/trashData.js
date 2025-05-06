const GrupoA = "Resíduo Biológico Infectante";
const GrupoB = "Resíduos químicos";
const GrupoD = "Resíduos Comuns";
const GrupoE = "Resíduos perfurocortantes";
const GrupoBE = "Perfurocortante para resíduo químico";
const Reciclaveis = "Reciclaveis";

// const GrupoA = "Grupo A - Resíduo Biológico - Infectante";
// const GrupoB = "Grupo B - Resíduos químicos";
// const GrupoD = "Grupo D - Resíduos Comuns";
// const GrupoE = "Grupo E - Resíduos perfurocortantes";

export const trashListOrig = [
    {name: "ALGODÃO COM SANGUE", group: GrupoA, hideGroups: []},
    {name: "ALGODÃO COM SECREÇÃO", group: GrupoA, hideGroups: []},
    {name: "GAZE COM SANGUE", group: GrupoA, hideGroups: []},
    {name: "GAZE COM SECREÇÃO", group: GrupoA, hideGroups: []},
    {name: "LUVAS", group: GrupoA, hideGroups: []},
    {name: "LUVAS SEM CONTATO COM SANGUE OU LIQUIDOS CORPÓREOS", group: GrupoD, hideGroups: []},
    {name: "LUVAS COM SANGUE OU LIQUIDOS COPÓREOS", group: GrupoA, hideGroups: []},
    {name: "CATETER ARTERIAL COM SANGUE SEM O GUIA", group: GrupoA, hideGroups: []},
    {name: "FRASCOS DE SORO E EQUIPOS USADOS", group: GrupoA, hideGroups: []},
    {name: "COBERTURA DE CURATIVOS COM SECREÇÃO OU SANGUE", group: GrupoA, hideGroups: []},
    {name: "COMPRESSAS CIRURGICAS COM SANGUE OU SECREÇÃO", group: GrupoA, hideGroups: []},
    {name: "BOLSAS DE SANGUE TRANSFUNDIDAS USADAS E VAZIAS", group: GrupoA, hideGroups: []},
    {name: "MÁSCARAS CIRURGICAS USADAS", group: GrupoA, hideGroups: []},
    {name: "MÁSCARAS TIPO N95/EQUIVALENTE USADAS", group: GrupoA, hideGroups: []},
    {name: "CATÉTER VENOSO PERIFÉRICO SEM AGULHA", group: GrupoA, hideGroups: []},
    {name: "DIALISADORES USADOS", group: GrupoA, hideGroups: []},
    {name: "SERINGAS CONTAMINADAS POR QUALQUER FLUIDO, SANGUE/OU SECREÇÕES", group: GrupoA, hideGroups: []},
    {name: "SONDAS VESICAIS, NASOGÁSTRICAS, OROGÁSTRICAS E ENTÉRICAS USADAS", group: GrupoA, hideGroups: []},
    {name: "BOLSAS DE COLOSTOMIA E SIMILARES USADAS", group: GrupoA, hideGroups: []},
    {name: "AVENTAL USADO COM RESÍDUO DE SECREÇÃO, EXCRETAS OU SANGUE", group: GrupoA, hideGroups: []},
    {name: "FRASCO VAZIO COM SIMBOLO UNIVERSAL DE RISCO QUIMICO", group: GrupoB, hideGroups: []},
    {name: "FRASCO DE QUIMIOTERÁPICO VAZIO", group: GrupoB, hideGroups: []},
    {name: "FRASCO DE MEDICAÇÃO VENCIDA COM símbolo universal do risco químico", group: GrupoB, hideGroups: []},
    {name: "EQUIPOS UTILIZADOS NO PREPARO E NA MANIPULAÇÃO DE ANTINEOPLÁSICOS.", group: GrupoB, hideGroups: []},
    {name: "FRASCOS DE SORO UTILIZADOS NO PREPARO E NA MANIPULAÇÃO DE ANTINEOPLÁSICOS", group: GrupoB, hideGroups: []},
    {name: "ESPARADRAPOS E ADESIVOS UTILIZADOS NO PREPARO E NA MANIPULAÇÃO DE ANTINEOPLÁSICOS", group: GrupoB, hideGroups: []},
    {name: "CATÉTERES EM GERAL UTILIZADOS NO PREPARO E NA MANIPULAÇÃO DE ANTINEOPLÁSICOS", group: GrupoB, hideGroups: []},
    {name: "FILTROS E MÁSCARAS UTILIZADOS NO PREPARO E NA MANIPULAÇÃO DE ANTINEOPLÁSICOS", group: GrupoB, hideGroups: []},
    {name: "ALGODÃO SEM SANGUE OU SECREÇÃO", group: GrupoD, hideGroups: []},
    {name: "GAZES SEM SANGUE OU SECREÇÃO", group: GrupoD, hideGroups: []},
    {name: "AVENTAIS USADOS SEM RESÍDUO (QUALQUER SECREÇÃO, EXCRETAS E SANGUE)", group: GrupoD, hideGroups: []},
    {name: "ABSORVENTES HIGIÊNICOS", group: GrupoD, hideGroups: []},
    {name: "FRALDAS COM URINA E/ OU FEZES", group: GrupoD, hideGroups: []},
    {name: "PAPEIS MOLHADOS", group: GrupoD, hideGroups: []},
    {name: "RESTOS ALIMENTARES", group: GrupoD, hideGroups: []},
    {name: "ESTILHAÇOS DE VIDRO", group: GrupoE, hideGroups: []},
    {name: "SERINGAS COM AGULHAS", group: GrupoE, hideGroups: []},
    {name: "ESCALPES", group: GrupoE, hideGroups: []},
    {name: "AMPOLAS DE VIDRO", group: GrupoE, hideGroups: []},
    {name: "PONTAS DIAMANTADAS", group: GrupoE, hideGroups: []},
    {name: "LÂMINAS DE BISTURI", group: GrupoE, hideGroups: []},
    {name: "FRASCOS DE VIDRO VAZIOS SEM O SÍMBOLO DE RADIOATIVOS", group: GrupoE, hideGroups: []},
    {name: "TUBOS CAPILARES", group: GrupoE, hideGroups: []},
    {name: "LÂMINAS E LAMÍNULAS", group: GrupoE, hideGroups: []},
    {name: "PLÁSTICOS LIMPOS E SECOS", group: Reciclaveis, hideGroups: []},
    {name: "INVOLUCROS LIMPOS E SECOS DE PRODUTOS HOSPITALARES", group: Reciclaveis, hideGroups: []},
    {name: "PAPEIS LIMPOS E SECOS", group: Reciclaveis, hideGroups: []},
    {name: "EMBALAGENS LIMPAS E SECAS DE PRODUTOS HOSPITALARES", group: Reciclaveis, hideGroups: []},
    {name: "PAPELÕES LIMPOS E SECOS", group: Reciclaveis, hideGroups: []},
    {name: "GARRAFAS PET VAZIAS, LIMPAS E SECAS", group: Reciclaveis, hideGroups: []},
    {name: "LATAS DE ALUMÍNIO VAZIAS, LIMPAS E SECAS", group: Reciclaveis, hideGroups: []},
    {name: "AGULHAS USADAS PARA PREPARO E APLICAÇÃO DE ANTINEOPLÁSICOS", group: GrupoE, hideGroups: [GrupoB]}, //GrupoBE
    {name: "QUALQUER PERFURO CORTANTE QUE TENHA CONTATO COM ANTINEOPLÁSICOS", group: GrupoE, hideGroups: [GrupoB]}, //GrupoBE
    {name: "ESCALPES USADOS PARA INFUSÃO DE ANTINEOPLASICOS", group: GrupoE, hideGroups: [GrupoB]}, //GrupoBE
];

export const trashGroups = [
    {name: GrupoA, image: "GrupoA.jpg"},
    {name: GrupoB, image: "GrupoB.jpg"},
    {name: GrupoD, image: "GrupoD.png"},
    {name: GrupoE, image: "GrupoE.jpg"},
    {name: Reciclaveis, image: "GrupoReciclavel.jpg"},
];
