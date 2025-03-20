const GrupoA = "Resíduo Biológico Infectante";
const GrupoB = "Resíduos químicos";
const GrupoD = "Resíduos Comuns";
const GrupoE = "Resíduos perfurocortantes";
const Reciclaveis = "Reciclaveis";

// const GrupoA = "Grupo A - Resíduo Biológico - Infectante";
// const GrupoB = "Grupo B - Resíduos químicos";
// const GrupoD = "Grupo D - Resíduos Comuns";
// const GrupoE = "Grupo E - Resíduos perfurocortantes";

export const trashListOrig = [
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

export const trashGroups = [
    {name: GrupoA, image: "GrupoA.jpg"},
    {name: GrupoB, image: "GrupoB.jpg"},
    {name: GrupoD, image: "GrupoD.png"},
    {name: GrupoE, image: "Grupoe.jpg"},
    {name: Reciclaveis, image: "GrupoReciclavel.jpg"},
];