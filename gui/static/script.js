var base = "http://127.0.0.1:5000";
var green = document.getElementById("verde");
var red = document.getElementById("rojo");
var blue = document.getElementById("azul");
var yellow = document.getElementById("amarillo");
var empezar = document.getElementById("btn-start");
var reset = document.getElementById("btn-reset");
var txtnivel = document.getElementById("nivel");
var txtestado = document.getElementById("estado");
let txtRespuesta = document.getElementById("respuesta");

let lock_secuencia = false;
let lock_peticion = false;
let lock_resultado_respuesta = false;

document.querySelectorAll(".boton").forEach(function (boton) {
    boton.classList.add("apagado");
    boton.addEventListener("mousedown", () => {
        if (lock_secuencia || lock_peticion || lock_resultado_respuesta) return;
        parpadear_color(boton);
    });
});

function parpadear_color(boton) {
    boton.classList.remove("apagado");
    return new Promise((resolve) => {
        setTimeout(() => {
            boton.classList.add("apagado");
            resolve("resolved");
        }, 1000);
    });
}

async function parpadear_esperar(boton, espera = 500) {
    await parpadear_color(boton);
    return new Promise((resolve) => setTimeout(resolve, espera));
}

async function mostrarSecuencia(secuencia) {
    lock_secuencia = true;
    for (let index = 0; index < secuencia.length; index++) {
        switch (parseInt(secuencia[index])) {
            case 1:
                await parpadear_esperar(green);
                break;
            case 2:
                await parpadear_esperar(red);
                break;
            case 3:
                await parpadear_esperar(yellow);
                break;
            case 4:
                await parpadear_esperar(blue);
                break;
            default:
                break;
        }
    }
    lock_secuencia = false;
}

function verificar_nivel(secuencia) {
    let cont_nivel = 0;

    for (let index = 0; index < secuencia.length; index++) {
        switch (parseInt(secuencia[index])) {
            case 0:
                break;
            default:
                cont_nivel++;
                break;
        }
    }
    actualizarNivel(cont_nivel);
}

function actualizarNivel(nivel) {
    txtnivel.textContent = "Nivel: " + nivel;
}

function llamar(url) {
    if (lock_secuencia || lock_peticion || lock_resultado_respuesta) return;
    lock_peticion = true;
    fetch(url)
        .then(function (responseText) {
            return responseText.json();
        })
        .then((myJson) => resolverRespuestas(myJson.response))
        .catch(function (e) {
            console.error(e);
        })
        .finally(function (e) {
            lock_peticion = false;
        });
}

async function resolverRespuestas(respuestas) {
    for (let index = 0; index < Object.keys(respuestas).length; index++) {
        const estado = respuestas[Object.keys(respuestas)[index]].estado;
        const secuencia = respuestas[Object.keys(respuestas)[index]].secuencia;
        // Reiniciar estado de respuesta si se reinicio
        // o no hay secuencia
        if (secuencia.every((x) => x == "0")) {
            txtRespuesta.textContent = "?";
        }
        if (estado == "inicio") {
            verificar_nivel(secuencia);
            mostrarSecuencia(secuencia);
        }
        if (estado == "bien" || estado == "mal") {
            if (estado == "mal") {
                actualizarNivel(0);
            }
            await mostrarRespuesta(estado);
        } else {
            txtestado.innerText = estado;
        }
    }
}

async function mostrarRespuesta(estado) {
    lock_resultado_respuesta = true;
    txtRespuesta.textContent = estado;
    return new Promise((resolve) => {
        setTimeout(() => {
            txtRespuesta.textContent = "?";
            lock_resultado_respuesta = false;
            resolve("resuelta");
        }, 800);
    });
}

function resetled() {
    parpadear_color(green);
    parpadear_color(red);
    parpadear_color(blue);
    parpadear_color(yellow);
}

green.addEventListener("click", () => {
    llamar(base + "/api/verde");
});

red.addEventListener("click", () => {
    llamar(base + "/api/rojo");
});

blue.addEventListener("click", () => {
    llamar(base + "/api/azul");
});

yellow.addEventListener("click", () => {
    llamar(base + "/api/amarillo");
});

empezar.addEventListener("click", () => {
    llamar(base + "/api/empezar");
});

reset.addEventListener("click", () => {
    llamar(base + "/api/reset");
    resetled();
});
