#include <WiFi.h>
#include <HTTPClient.h>

int lightPin = 0;  //define a pin for Photo resistor
int ledPin=23;     //define a pin for LED

int sensorValue;
int coef = 1;

char receivedChar;

void print_ip_status(){
  Serial.print("WiFi connected \n");
  Serial.print("IP address: ");
  Serial.print(WiFi.localIP());
  Serial.print("\n");
  Serial.print("MAC address: ");
  Serial.print(WiFi.macAddress());
  Serial.print("\n"); 
}

void connect_wifi(){
 const char* ssid = "adrien";
 const char *password= "adrien06"; 
 
 Serial.println("\nConnecting Wifi...");
 WiFi.begin(ssid, password);
 while(WiFi.status() != WL_CONNECTED){
   Serial.print("Attempting to connect ..\n");
   delay(1000);
 }
 Serial.print("Connected to local Wifi\n");  
 print_ip_status();
}

void updateLed() {
    HTTPClient serv;
  const char* url_serv_name = "https://arduino-miage.herokuapp.com/api/led_state";
  serv.begin(url_serv_name); // Ce serveur est suppose renvoyer 
                         // une page Web contenant votre IP

  // start connection and send HTTP header
  int HttpRetCode=serv.GET();
  
  if (HttpRetCode > 0){
      // HTTP header has been send and Server response header has been handled
      Serial.print("Led state ...");
      String Contents = serv.getString();
      Serial.print(HttpRetCode);
      Serial.print("\n");
      Serial.print(Contents);
      Serial.print("\n");
      
      serv.end(); // End connection

      if (Contents.equals("true")) {
        digitalWrite(ledPin, HIGH);
      } else {
        digitalWrite(ledPin, LOW);
      }
    }
}

void setup () {
  Serial.begin(9600); // starts the serial port at 9600
  while (!Serial); // wait for a serial connection

  connect_wifi();

  // configure targeted server and url  
  pinMode( ledPin, OUTPUT);
}

void sendSensorValue(int value){

  HTTPClient serv;
  const char* url_serv_name = "https://arduino-miage.herokuapp.com/api/lumiere";
  serv.begin(url_serv_name); // Ce serveur est suppose renvoyer 
                         // une page Web contenant votre IP
  serv.addHeader("Content-Type", "application/x-www-form-urlencoded");

  String postValue = "lumiere="+ String(value);
  Serial.print(postValue);
  // start connection and send HTTP header
  int HttpRetCode=serv.POST(postValue);
  
  if (HttpRetCode > 0){
      // HTTP header has been send and Server response header has been handled
      Serial.print("\n");
      Serial.print("Lumiere resp ...");
      String Contents = serv.getString();
      Serial.print(HttpRetCode);
      Serial.print("\n");
      Serial.print(Contents);
      Serial.print("\n");
      
      serv.end(); // End connection
    }
    
}

void loop() {
  
  sensorValue = analogRead (A0) ; // read analog input pin 0  

  updateLed();
  sendSensorValue(sensorValue);

  
  Serial.print(sensorValue , DEC) ; // Prints the value to the serial port
  Serial.print("\n" );
  
  delay(1000); // wait 1s for next reading
}
