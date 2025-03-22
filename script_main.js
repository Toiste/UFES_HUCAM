document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("game-rules-modal");
    const openModalBtn = document.getElementById("open-modal");
    const closeModalBtn = document.getElementById("close-modal");

    // Abre o modal
    openModalBtn.addEventListener("click", function() {
        modal.classList.add("show");
    });

    // Fecha o modal
    closeModalBtn.addEventListener("click", function() {
        modal.classList.remove("show");
    });

    // Fecha o modal ao clicar fora dele
    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
});