from time import sleep
from flask import Flask, render_template, json
import serial


app = Flask(__name__)


@app.route("/api/verde", methods=["GET"])
def api_verde():
    print("OK, Verde")
    return espera_secuencia("1")


@app.route("/api/rojo", methods=["GET"])
def api_rojo():
    print("OK, Rojo")
    return espera_secuencia("2")


@app.route("/api/amarillo", methods=["GET"])
def api_amarillo():
    print("OK, Amarillo")
    return espera_secuencia("3")


@app.route("/api/azul", methods=["GET"])
def api_azul():
    print("OK, Azul")
    return espera_secuencia("4")


@app.route("/api/empezar", methods=["GET"])
def api_empezar():
    print("OK, Empezar")
    return espera_secuencia("5")


@app.route("/api/reset", methods=["GET"])
def api_reset():
    print("OK, Reset")
    return espera_secuencia("6")


@app.route("/")
def home():
    return render_template("index.html")


def espera_secuencia(cadena):
    with serial.Serial("COM2", 9600) as ser:
        ser.write(cadena.encode())
        print("Esperando respuesta")
        respuestas = []
        while not ser.in_waiting:
            continue
        while ser.in_waiting:
            line = ser.read_until().decode()
            respuestas.append(
                {
                    "secuencia": line.split(",")[:5],
                    "estado": line.split(",")[-1].strip(),
                }
            )
            sleep(0.5)
        res = dict((i, j) for i, j in enumerate(respuestas))
        return (
            json.dumps({"success": True, "response": res}),
            200,
            {"ContentType": "application/json"},
        )


if __name__ == "__main__":
    app.run()
