
var title = document.querySelector(".game-title");

function loadContent() {
    if (sessionStorage.getItem("game-title")) {title.innerHTML = "Game | " + sessionStorage.getItem("game-title");}
}