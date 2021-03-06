const mqtt = require('mqtt');
const url = require('url');
const LedState = require('../models/led_state');
const Lumiere = require('../models/lumiere');
const Temperature = require('../models/temperature');

// Parse
const mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');

class Broker {
    start() {
        console.log('====== MQTT SERVER URL: ======');
        console.log(JSON.stringify(mqtt_url));

        this.client = mqtt.connect(mqtt_url);
        this.client.on('connect', () => {
          console.log('connected');
            this.client.subscribe('led');
            this.client.subscribe('temp');
            this.client.subscribe('lum');
        });

        this.client.on('message', (topic, message) => {
            console.log('---- New MQTT Message:'+ topic +' ----')
            console.log(JSON.stringify(message.toString()));
            console.log('--------------------------------');

            if (topic === 'led') {
                this.ledMessage(message);
            } else if (topic === 'temp') {
                this.tempMessage(message);
            } else if (topic === 'lum') {
                this.lumMessage(message);
            }
        })
    }

    ledMessage(message) {
        const query = {};
        const update = { value: message.toString()};
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        LedState.updateOne(query, update, options).then(() => {
            LedState.findOne({id: 1}).then((result) => {
              console.log('Led state updated with MQTT, new value:' + message.toString());
            })
          }).catch((err) => {
            console.log(err);
          });
    }

    tempMessage(message) {
      const value = parseInt(message.toString());

      Temperature.create({temperature : value}).then((temp) => {
        console.log('New lum added: ' + temp);
      }).catch((err) => {
        console.log(err);
      });
    }

    lumMessage(message) {
        const value = parseInt(message.toString());

        Lumiere.create({lumiere : value}).then((lum) => {
          console.log('New lum added: ' + lum);
        }).catch((err) => {
          console.log(err);
        });
    }
}

module.exports = new Broker();