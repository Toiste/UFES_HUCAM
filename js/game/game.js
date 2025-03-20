// /js/game/game.js

let pontos = 0;
let objetosNoJogo = [...objetos]; // Copia os objetos para o jogo

function iniciarJogo() {
  pontos = 0;
  // Inicializar o jogo, exibir a primeira tela, etc.
  mostrarObjetoParaDescarte();
}

function mostrarObjetoParaDescarte() {
  const objetoAleatorio = objetosNoJogo[Math.floor(Math.random() * objetosNoJogo.length)];
  // Exibir o objeto na tela (nome, imagem, etc.)
  atualizarUI(objetoAleatorio);
}

function verificarDescarte(categoriaEscolhida, categoriaCorreta) {
  if (categoriaEscolhida === categoriaCorreta) {
    pontos += 10; // Pontuação por descarte correto
    mostrarFeedback('Correto!', true);
  } else {
    mostrarFeedback('Errado, tente novamente!', false);
  }
}

function mostrarFeedback(mensagem, sucesso) {
  // Atualizar a interface com a mensagem de feedback
  // Pode incluir animações ou mudanças visuais para dar uma resposta ao jogador
  if (sucesso) {
    // Exibir animação de sucesso
  } else {
    // Exibir animação de erro
  }
}
