#include <AltSoftSerial.h>
#include <TinyGPS++.h>
#include <Wire.h>
#include <math.h>
#include <SoftwareSerial.h>
#include <Adafruit_Sensor.h> 
#include <Adafruit_ADXL345_U.h>

const String EMERGENCY_PHONE = "+918766989473";
#define rxPin 2
#define txPin 3

SoftwareSerial sim800(txPin, rxPin);
AltSoftSerial neogps;
TinyGPSPlus gps;
//RX Pin To D9
//TX Pin To D8

String sms_status, sender_number, received_date, msg;
String latitude, longitude;
#define BUZZER 5
#define BUTTON 6
// #define xPin A0
// #define yPin A1
// #define zPin A2

byte updateflag;

int xaxis = 0, yaxis = 0, zaxis = 0;
int deltx = 0, delty = 0, deltz = 0;
int vibration = 2;
int devibrate = 75;
int magnitude = 0;
int sensitivity = 20;
// math debry
double angle;
boolean impact_detected = false;
unsigned long time1;
unsigned long impact_time;
unsigned long alert_delay = 30000;
//the set defined delay
Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified();

void setup()
{
  //begin for sim axdl and serial
  Serial.begin(9600);
  sim800.begin(9600);
  neogps.begin(9600);

  Serial.println("BVC - Accident Detection System");
  if(!accel.begin())
   {
      Serial.println("No valid sensor found");
      while(1);
   }
  pinMode(BUZZER, OUTPUT);
  pinMode(BUTTON, INPUT_PULLUP);

  sms_status = "";
  sender_number = "";
  received_date = "";
  msg = "";
  Serial.print("GSM ACTIVATING....");
  sim800.println("AT");
  delay(1000);
  sim800.println("ATE1");
  delay(1000);
  sim800.println("AT+CPIN?");
  delay(1000);
  sim800.println("AT+CMGF=1");
  delay(1000);
  sim800.println("AT+CNMI=1,1,0,0,0");
  delay(1000);
  Serial.println("Done!");
  //at attachment and signal strength 
  time1 = micros();
  sensors_event_t event; 
   accel.getEvent(&event);
   xaxis = event.acceleration.x;
   yaxis = event.acceleration.y;
   zaxis = event.acceleration.z;
   //coordinates with event 
}

void loop()
{ 
  sensors_event_t event; 
  accel.getEvent(&event);
  if (micros() - time1 > 4999) Impact();
  if (updateflag > 0)
