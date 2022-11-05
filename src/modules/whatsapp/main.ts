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

export const sendMessage = (number: string, message: string) => {
  client.on('ready', () => {
    console.log('Client is ready!');
  });

  const chatId = number + "@c.us"

  client.sendMessage(chatId, message)
    .then((message: Message) => {
      console.log(`Message ${message.body} sent`)
    }).catch((error: Error) => {
      console.error(error)
  })
}





