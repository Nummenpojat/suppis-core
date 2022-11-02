import {Message, Client} from "whatsapp-web.js";
const qrcode = require('qrcode-terminal');

const client = new Client({});

export const newWhatsappSession = () => {

  client.on('qr', (qr: string) => {
    console.clear();
    qrcode.generate(qr, {small: true});
  });

  client.on('ready', () => {
    console.log('Client is ready!');

  });

  client.on('message', (message: Message) => {
    console.log(message.body);
  });

  client.initialize();

}



