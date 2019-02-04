int lightPin = 0;  //define a pin for Photo resistor
int ledPin=23;     //define a pin for LED

int sensorValue;
int coef = 0;

char receivedChar;

void setup () {
  Serial.begin(9600); // starts the serial port at 9600
  pinMode( ledPin, OUTPUT );
}

void loop() {
   sensorValue = analogRead (A0) ; // read analog input pin 0  
  
  Serial.print(sensorValue , DEC) ; // Prints the value to the serial port
  Serial.print("\n" );

  if (Serial.available() > 0) {
      receivedChar = Serial.read();

      if (receivedChar == '1') {
        digitalWrite(ledPin, HIGH);
      } else {
        digitalWrite(ledPin, LOW);
      }
  }
  
  delay(1000); // wait 1s for next reading
}
