from flask import Flask, render_template, json
import serial

ser = serial.Serial("COM2", 9600)

app = Flask(__name__)

@app.route('/api/verde', methods=['GET'])
def api_verde():
    ser.write(b"1")
    print("OK, Verde")
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/api/rojo', methods=['GET'])
def api_rojo():
    ser.write(b"2")
    print("OK, Rojo")
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/api/amarillo', methods=['GET'])
def api_amarillo():
    ser.write(b"3")
    print("OK, Amarillo")
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/api/azul', methods=['GET'])
def api_azul():
    ser.write(b"4")
    print("OK, Azul")
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/api/empezar', methods=['GET'])
def api_empezar():
    ser.write(b"5")
    print("OK, Empezar")
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/api/reset', methods=['GET'])
def api_reset():
    ser.write(b"6")
    print("OK, Reset")
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/')
def home():
   return render_template('index.html')

if __name__ == '__main__':
   app.run()