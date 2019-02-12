const mqtt = require('mqtt');
const url = require('url');
// Parse
const mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
const auth = (mqtt_url.auth || ':').split(':');

class Broker {
    start() {
        this.client = mqtt.connect(mqtt_url);
        this.client.on('connect', () => {
            this.client.subscribe('myTopic');
            console.log('mqtt connected to: ' + mqtt_url);
        });

        this.client.on('message', function (topic, message) {
            let context = message.toString();
            console.log(context)
        })
    }
}

module.exports = new Broker();