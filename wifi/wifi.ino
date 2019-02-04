int lightPin = 0;  //define a pin for Photo resistor
int ledPin=23;     //define a pin for LED

int sensorValue;
int coef = 1;

char receivedChar;

void setup () {
  Serial.begin(9600); // starts the serial port at 9600
  pinMode( ledPin, OUTPUT );
}

void loop() {
  if (coef == 1) {
    sensorValue = analogRead (A0) ; // read analog input pin 0  
  } else {
    sensorValue = 0;
  }

  if (coef == 1) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
  
  //Serial.print(sensorValue , DEC) ; // Prints the value to the serial port
  //Serial.print("\n" );

  if (Serial.available() > 0) {
      receivedChar = Serial.read();

      Serial.print("I received : ");
      Serial.print(receivedChar);
      Serial.print("\n");

      if (receivedChar == '1') {
        coef = 1;
      } else {
        coef = 0;
      }
  }
  
  delay(100); // wait 1s for next reading
}
