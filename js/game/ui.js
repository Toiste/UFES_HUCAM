// /js/game/ui.js

function atualizarUI(objeto) {
  // Atualiza a interface com as informações do objeto a ser descartado
  document.getElementById('nome-objeto').innerText = objeto.nome;
  document.getElementById('imagem-objeto').src = `assets/images/${objeto.imagem}`;
  document.getElementById('descricao-objeto').innerText = objeto.descricao;
}

function exibirPontuacao(pontos) {
  // Atualiza a pontuação na interface
  document.getElementById('pontuacao').innerText = `Pontuação: ${pontos}`;
}
