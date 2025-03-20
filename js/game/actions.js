// /js/game/actions.js

function escolherCategoriaDescarte(categoriaEscolhida) {
  const objetoAtual = getObjetoAtual(); // Função que pega o objeto que está sendo exibido
  verificarDescarte(categoriaEscolhida, objetoAtual.correta);
}

function getObjetoAtual() {
  // Retorna o objeto que está sendo exibido no jogo no momento
  return objetosNoJogo[0]; // Para exemplo, sempre pega o primeiro
}
