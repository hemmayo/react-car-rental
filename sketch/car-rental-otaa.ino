#include <NMEAGPS.h>
#include <lmic.h>
#include <hal/hal.h>
#include <SoftwareSerial.h>
#include <SPI.h>

SoftwareSerial GPSSerial(0, 1);
NMEAGPS  gps; // This parses the GPS characters
gps_fix  fix; // This holds on to the latest values

typedef struct sensorData {
  uint32_t angle;
  uint64_t latitude;
  uint64_t longitude;
  uint32_t speed;
  uint32_t temperature;
};

#define PACKET_SIZE sizeof(sensorData)

typedef union LoRa_Packet {
  sensorData sensor;
  byte LoRaPacketBytes[PACKET_SIZE];
};

//now create a variable called levelinfo to hold the data
LoRa_Packet levelinfo;

static const u1_t PROGMEM APPEUI[8] = { 0x7D, 0x3F, 0x02, 0xD0, 0x7E, 0xD5, 0xB3, 0x70 };
void os_getArtEui (u1_t* buf) {
  memcpy_P(buf, APPEUI, 8);
}

static const u1_t PROGMEM DEVEUI[8] = { 0xE0, 0xFA, 0xE3, 0x5A, 0xC9, 0x11, 0x51, 0x00 };
void os_getDevEui (u1_t* buf) {
  memcpy_P(buf, DEVEUI, 8);
}

static const u1_t PROGMEM APPKEY[16] = { 0x88, 0x25, 0xDA, 0xDF, 0xF0, 0x31, 0x48, 0x5F, 0xE3, 0x7B, 0xA6, 0x5E, 0x6D, 0x32, 0xAA, 0xDB };
void os_getDevKey (u1_t* buf) {
  memcpy_P(buf, APPKEY, 16);
}

const unsigned TX_INTERVAL = 60;

static osjob_t sendjob;


const lmic_pinmap lmic_pins = {
  .nss = 10,
  .rxtx = LMIC_UNUSED_PIN,
  .rst = 9,
  .dio = {2, 6, 7},
};

void onEvent (ev_t ev) {
  Serial.print(os_getTime());
  Serial.print(": ");
  switch (ev) {
    case EV_SCAN_TIMEOUT:
      Serial.println(F("EV_SCAN_TIMEOUT"));
      break;
    case EV_BEACON_FOUND:
      Serial.println(F("EV_BEACON_FOUND"));
      break;
    case EV_BEACON_MISSED:
      Serial.println(F("EV_BEACON_MISSED"));
      break;
    case EV_BEACON_TRACKED:
      Serial.println(F("EV_BEACON_TRACKED"));
      break;
    case EV_JOINING:
      Serial.println(F("EV_JOINING"));
      break;
    case EV_JOINED:
      Serial.println(F("EV_JOINED"));

      LMIC_setLinkCheckMode(0);
      break;
    case EV_RFU1:
      Serial.println(F("EV_RFU1"));
      break;
    case EV_JOIN_FAILED:
      Serial.println(F("EV_JOIN_FAILED"));
      break;
    case EV_REJOIN_FAILED:
      Serial.println(F("EV_REJOIN_FAILED"));
      break;
      break;
    case EV_TXCOMPLETE:
      Serial.println(F("EV_TXCOMPLETE (includes waiting for RX windows)"));

      if (LMIC.txrxFlags & TXRX_ACK)
        Serial.println(F("Received ack"));
      if (LMIC.dataLen) {
        Serial.println(F("Received "));
        Serial.println(LMIC.dataLen);
        Serial.println(F(" bytes of payload"));
      }
      // Schedule next transmission
      os_setTimedCallback(&sendjob, os_getTime() + sec2osticks(TX_INTERVAL), do_send);
      break;
    case EV_LOST_TSYNC:
      Serial.println(F("EV_LOST_TSYNC"));
      break;
    case EV_RESET:
      Serial.println(F("EV_RESET"));
      break;
    case EV_RXCOMPLETE:
      // data received in ping slot
      Serial.println(F("EV_RXCOMPLETE"));
      break;
    case EV_LINK_DEAD:
      Serial.println(F("EV_LINK_DEAD"));
      break;
    case EV_LINK_ALIVE:
      Serial.println(F("EV_LINK_ALIVE"));
      break;
    default:
      Serial.println(F("Unknown event"));
      break;
  }
}

void do_send(osjob_t* j) {
  // Check if there is not a current TX/RX job running
  if (LMIC.opmode & OP_TXRXPEND) {
    Serial.println(F("OP_TXRXPEND, not sending"));
  } else {

    // For one second we parse GPS data and report some key values
    for (unsigned long start = millis(); millis() - start < 1000;)
    {
      while (gps.available( GPSSerial )) {
        fix = gps.read();

        if (fix.valid.location) {
          levelinfo.sensor.latitude = fix.latitude() * 100000000;
          levelinfo.sensor.longitude = fix.longitude() * 100000000;
          levelinfo.sensor.speed = fix.speed_kph();
          levelinfo.sensor.angle = fix.heading();
        }

      }
    }

    // Prepare upstream data transmission at the next possible time.

    LMIC_setTxData2(1, levelinfo.LoRaPacketBytes, sizeof(levelinfo.LoRaPacketBytes) - 1, 0);
    Serial.println(F("Packet queued"));

  }
  // Next TX is scheduled after TX_COMPLETE event.
}

void setup () {
  Serial.begin(115200);
  GPSSerial.begin(9600);

  // LMIC init
  os_init();
  LMIC_reset();

  // Start job
  do_send(&sendjob);
}

void loop() {
  os_runloop_once();
}