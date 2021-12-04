console.log("new")

var base = 'http://127.0.0.1:5000'
var green = document.getElementById("verde");
var red = document.getElementById("rojo");
var blue = document.getElementById("azul");
var yellow = document.getElementById("amarillo");
var empezar = document.getElementById("btn-start");
var reset = document.getElementById("btn-reset");

let lock = false;

document.querySelectorAll('.boton').forEach(function (boton) {
    boton.classList.add("apagado")
    boton.addEventListener('mousedown', () => {
        parpadear_color(boton)

    })
})

function parpadear_color (boton) {
    boton.classList.remove("apagado")
    return new Promise(resolve => {
        setTimeout(() => {
            boton.classList.add("apagado")
            resolve('resolved');
        }, 1000);
    })
}

async function parpadear_esperar (boton, espera = 500) {
    await parpadear_color(boton)
    return new Promise(resolve => setTimeout(resolve, espera))
}

async function asyncCall (secuencia) {
    for (let index = 0;index < secuencia.length;index++) {
        switch (parseInt(secuencia[index])) {
            case 1:
                await parpadear_esperar(green)
                break;
            case 2:
                await parpadear_esperar(red)
                break
            case 3:
                await parpadear_esperar(yellow)
            case 4:
                await parpadear_esperar(blue)
            default:
                break;
        }
    }
}


function llamar (url) {
    fetch(url)
        .then(function (responseText) {
            return responseText.json()
        })
        .then(function (myJson) {
            console.log(myJson.response)
            Object.keys(myJson.response).forEach((key, index) => {
                console.log(myJson.response[key]);
                lock = true
                if (myJson.response[key].estado == "inicio") {
                    asyncCall(myJson.response[key].secuencia)
                }
            });
        })
        .catch(function (e) {
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