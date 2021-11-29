int secuencia[5];
int pos = 0;
int nivel = 0;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  init_leds();
}

void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available()) {
    int entrada = Serial.parseInt();
    switch (entrada)
    {
    case 5:
      play();
      break;
    default:
      break;
    }
  }
}

void play() {
  int pos = 0;
  for (int i = 0; i < 5; i++) {
    secuencia[i] = 0;
  }

  while (pos < 5)
  {
    secuencia[pos] = random(1, 5);
    pos++;
    update_level(pos);
    for (int i = 0; i < 5; i++)
    {
      String temp = "";
      Serial.print(temp + secuencia[i] + ",");
    }
    Serial.println("inicio");
    for (int i = 0; i < pos; i++)
    {
      while (!Serial.available()) {}
      int entrada = Serial.parseInt();
      if (entrada == 6) {
        Serial.println("reset");
        break;
      }
      else if (entrada == secuencia[i]) {
        Serial.println("bien");
      }
      else {
        Serial.println("mal");
        return;
      }
    }
  }
  Serial.println("fin");
}

void update_level(int valor) {
  if (nivel == valor)
    return;

  switch (valor)
  {
  case 1:
    digitalWrite(13, 1);
    digitalWrite(12, 0);
    digitalWrite(11, 0);
    break;
  case 2:
    digitalWrite(13, 0);
    digitalWrite(12, 1);
    digitalWrite(11, 0);
    break;
  case 3:
    digitalWrite(13, 1);
    digitalWrite(12, 1);
    digitalWrite(11, 0);
    break;
  case 4:
    digitalWrite(13, 0);
    digitalWrite(12, 0);
    digitalWrite(11, 1);
    break;
  case 5:
    digitalWrite(13, 1);
    digitalWrite(12, 0);
    digitalWrite(11, 1);
  default:
    break;
  }

}


void init_leds() {
  for (int i = 13; i > 5; i--)
  {
    /* code */
    pinMode(i, OUTPUT);
  }


}
