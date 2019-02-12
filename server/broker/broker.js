const mosca = require('mosca');


class Broker {
    start() {
        const settings = { port:1883 };
        this.server = new mosca.Server(settings);

        this.server.on('ready', function(){
            console.log(`mqtt running on port ${1883}`)
        });
    }
}

module.exports = new Broker();



