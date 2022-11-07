import {Client, LocalAuth, Message} from "whatsapp-web.js";

const qrcode = require('qrcode-terminal');

// Client configuration and exporting to other module parts
export const client = new Client({
  authStrategy: new LocalAuth({dataPath: "../../config/whatsapp"}),
  takeoverOnConflict: true
});

// Making new Whatsapp Web session to use when user wants to do something with Whatsapp module
export const newWhatsappSession = () => {

  client.on('ready', () => {
    console.log('Client is ready, but wait until the session is synchronized!');
    console.log('Then you can exit')
  });

  // Generating qr code if session does not already exist
  client.on('qr', (qr: string) => {
    console.clear();
    qrcode.generate(qr, {small: true});
  });

  client.initialize();

}

export const listenWhatsapp = () => {
  console.log("Connecting to Whatsapp...")

  client.on('ready', () => {
    console.log('Ready to receive messages!');
  });

  client.on('message', (message: Message) => {
    console.log(message.from)
    console.log(message.body);
  });

  client.initialize()
    .then(() => {
      console.log("initialized")
    });
}





