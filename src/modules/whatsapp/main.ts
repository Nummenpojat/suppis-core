import {Client, LocalAuth, Message} from "whatsapp-web.js";
const qrcode = require('qrcode-terminal');


const client = new Client({
  authStrategy: new LocalAuth({ dataPath: "./config/whatsapp/session"})
});

export const newWhatsappSession = () => {

  client.on('ready', () => {
    console.log('Client is ready!');
  });

  client.on('qr', (qr: string) => {
    console.clear();
    qrcode.generate(qr, {small: true});
  });

  client.initialize();

}

export const listenWhatsapp = () => {

  client.on('ready', () => {
    console.log('Client is ready!');
  });

  client.on('message', (message: Message) => {
    console.log(message.from)
    console.log(message.body);
  });

}





