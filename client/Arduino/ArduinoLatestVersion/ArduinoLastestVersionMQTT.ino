
#include <WiFi.h>
#include <PubSubClient.h>
#include <Wire.h>
#include <OneWire.h>
#include <DallasTemperature.h>

WiFiClient espClient;           // Wifi 
PubSubClient client(espClient); // MQTT client


OneWire oneWire(19);
DallasTemperature tempSensor(&oneWire);

/*===== MQTT broker/server and TOPICS ========*/
const char* mqtt_server = "m24.cloudmqtt.com";

#define TOPIC_TEMP "temp"
#define TOPIC_LED  "led"
#define TOPIC_LIGHT  "lum"


/*============= GPIO ======================*/
float temperature = 0;
int sensorValue = 0;
const int ledPin = 23; // LED Pin

/*================ WIFI =======================*/
void print_connection_status() {
  Serial.print("WiFi status : \n");
  Serial.print("\tIP address : ");
  Serial.println(WiFi.localIP());
  Serial.print("\tMAC address : ");
  Serial.println(WiFi.macAddress());
}

void connect_wifi() {
  const char* ssid = "Jeremy Primat";
  const char *password= "jeremy77";
  
  Serial.println("Connecting Wifi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Attempting to connect Wifi ..");
    delay(1000);
  }
  Serial.print("Connected to local Wifi\n");
  print_connection_status();
}

/*=============== SETUP =====================*/
void setup() {  
  pinMode(ledPin, OUTPUT);
  tempSensor.begin();

  Serial.begin(9600);
  connect_wifi();
  
  client.setServer(mqtt_server, 18060);
  client.setCallback(mqtt_pubcallback); 
  
}

/*============== CALLBACK ===================*/
void mqtt_pubcallback(char* topic, byte* message, 
                      unsigned int length) {
  
  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");

  String messageTemp;
  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();

  if (String(topic) == TOPIC_LED) {
    Serial.print("Changing output to ");
    if (messageTemp == "true") {
      Serial.println("on");
      set_LED(HIGH);
    }
    else if (messageTemp == "false") {
      Serial.println("off");
      set_LED(LOW);
    }
  }
}

void set_LED(int v){
  digitalWrite(ledPin, v);
}

/*============= SUBSCRIBE =====================*/
void mqtt_mysubscribe() {
  while (!client.connected()) { // Loop until we're reconnected
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("esp32", "jpuqjxky", "AtH50qUjgJjR")) {
      Serial.println("connected");
      // Subscribe
      client.subscribe((char*)TOPIC_LED);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

float get_Temperature(){
   tempSensor.requestTemperaturesByIndex(0);
}

/*================= LOOP ======================*/
void loop() {
  int32_t period = 5000; // 5 sec
  if (!client.connected()) { 
    mqtt_mysubscribe();
  }

  
  delay(period);
   float t;
   t = tempSensor.getTempCByIndex(0); 
   char tempString[8];
   dtostrf(t, 1, 2, tempString);  
   Serial.println("Température :");
   Serial.println(t);
   client.publish(TOPIC_TEMP, tempString); 
  

  sensorValue = analogRead (A0) ; 
  
  char sensorString[8];
  dtostrf(sensorValue, 1, 2, sensorString);  
  Serial.println("Lumière :");
  Serial.print(sensorValue , DEC) ;
  Serial.print("\n");
  client.publish(TOPIC_LIGHT, sensorString); 
  client.loop(); 
}
