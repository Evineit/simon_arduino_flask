console.log("new")

var base = 'http://127.0.0.1:5000'
var green = document.getElementById("verde");
var red = document.getElementById("rojo");
var blue = document.getElementById("azul");
var yellow = document.getElementById("amarillo");
var empezar = document.getElementById("btn-start");
var reset = document.getElementById("btn-reset");

let state = 0;

function llamar (url) {
    fetch(url)
    .then(function (responseText){
        return responseText.json()
    })
    .then(function (myJson){
        console.log(myJson.response)
    })
    .catch(function(e) {
        console.error(e);
    })
}

green.addEventListener("click", () => {
    llamar(base + '/api/verde')
});

green.addEventListener("mousedown", () => {
    green.style.backgroundColor = "rgb(0, 256, 0)";
});

green.addEventListener("mouseup", () => {
    green.style.backgroundColor = "rgb(0, 150, 0)";
});

red.addEventListener("click", () => {
    llamar(base + '/api/rojo')
});

red.addEventListener("mousedown", () => {
    red.style.backgroundColor = "red";
});

red.addEventListener("mouseup", () => {
    red.style.backgroundColor = "rgb(150, 0, 0)";
});

blue.addEventListener("click", () => {
    llamar(base + '/api/azul')
});

blue.addEventListener("mousedown", () => {
    blue.style.backgroundColor = "blue";
});

blue.addEventListener("mouseup", () => {
    blue.style.backgroundColor = "rgb(0, 0, 150)";
});

yellow.addEventListener("click", () => {
    llamar(base + '/api/amarillo')
});

yellow.addEventListener("mousedown", () => {
    yellow.style.backgroundColor = "yellow";
});

yellow.addEventListener("mouseup", () => {
    yellow.style.backgroundColor = "rgb(150, 150, 0)";
});

empezar.addEventListener("click", () => {
    llamar(base + '/api/empezar')
});

reset.addEventListener("click", () => {
    llamar(base + '/api/reset')
});