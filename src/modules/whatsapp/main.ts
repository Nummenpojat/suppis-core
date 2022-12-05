import {Client, LocalAuth, Message} from "whatsapp-web.js";
import {sendMessage} from "./commands/sendMessage";
import {sendBulkMessage} from "./commands/sendBulkMessage";
import {WebSocket} from "ws";

const qrcode = require('qrcode-terminal');

// Client configuration and exporting to other module parts
export const client = new Client({
  authStrategy: new LocalAuth({dataPath: "./config/whatsapp"}),
  takeoverOnConflict: true
});

// Making new Whatsapp Web session to use when user wants to do something with Whatsapp module
/**
 * Generates new Whatsapp session
 * @param maxAllowedLoadTime Is milliseconds that function allows Whatsapp to load new session. Default 30000 milliseconds
 * @return Promise<string> that is used to generate new Whatsapp session
 * */
export const newWhatsappSession = async (maxAllowedLoadTime?: number): Promise<string> => {
  return await new Promise((resolve, reject) => {
    console.log("Generating QR code...")

    client.initialize()

    client.on("ready", () => {
      reject("Whatsapp session already existed")
    })

    client.on('qr', (qr) => {
      resolve(qr)
    })

    setTimeout(() => {
      reject("Qr wasn't emitted in 30 seconds")
    }, maxAllowedLoadTime || 30000);
  })
}

/**
 * Listens for messages in Whatsapp <br/>
 * Prints messages to the terminal
 * */
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

export const whatsapp = (socket: WebSocket) => {
  client.initialize()

  client.on("qr", (qr) => {
    socket.send(qr)
  })

  client.on("ready", () => {

    socket.send("Client is ready")

    socket.on('message', (rawMessage: any) => {
      handleWhatsappSend(rawMessage);
    })
  })
}

export const handleWhatsappSend = (rawMessage: any) => {
  const message: { type: string, number: string, message: string } = JSON.parse(rawMessage)
  if (message.type == "one") {
    sendMessage(message.number, message.message)
  }
  if (message.type == "list") {
    sendBulkMessage(message.message, ["NUMBER HERE"])
  }
}





