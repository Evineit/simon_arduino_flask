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
  // for (int i = 1; i <= 5; i++)
  // {
  //   update_level(i);
  //   delay(500);
  //   /* code */
  // }

}

void play() {
  while (pos <= 5)
  {
    secuencia[pos] = random(5);
    pos++;
    for (auto&& i : secuencia)
    {
      String temp = "";
      Serial.print(temp + i + ",");
    }
    Serial.println();
    while (!Serial.available()) {}
    int entrada = Serial.parseInt();
    for (int i = 0; i <= pos; i++)
    {
      while (!Serial.available()) {}
      int entrada = Serial.parseInt();
      if (entrada == 6) {
        break;
      }
      if (entrada == secuencia[i]) {
        Serial.println("bien");
        break;
      }
      else {
        Serial.println("mal");
      }
    }
    Serial.println(pos);
    update_level(pos);
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
