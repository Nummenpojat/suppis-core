import {Client, LocalAuth} from "whatsapp-web.js";
import {sendMessage} from "./commands/sendMessage";
import {sendBulkMessage} from "./commands/sendBulkMessage";
import {Socket} from "socket.io";

const qrCodeTerminal = require('qrcode-terminal');

// Client configuration and exporting to other module parts
export const client = new Client({
  authStrategy: new LocalAuth({dataPath: "./config/whatsapp"}),
  takeoverOnConflict: true
});

export let clientReady = false
export let qr = ""

export const startWhatsappSession = async () => {
  console.log("Initializing client")

  client.initialize()

  client.on('ready', () => {
    console.log("Client is ready!")
    clientReady = true
    return;
  })

  client.on('qr', (tempqr) => {
    qr = tempqr
  })
}

export const whatsapp = (socket: Socket) => {

  socket.send("Client is ready!")

  socket.on('message', (message: any) => {
    handleWhatsappSend(message)
      .then(() => {
        socket.send("Message sent!")
      })
      .catch((reason) => {
        socket.send(reason)
      })
  })

  socket.on("disconnect", (disconnectReason) => {
    qr = ""
    console.log(disconnectReason)
  })
}

export const handleWhatsappSend = async (message: any) => {
  try {
    if (message.type == "one") {
      await sendMessage(message.number, message.message)
      return
    }
    if (message.type == "list") {
      await sendBulkMessage(message.message, ["NUMBER HERE"])
      return
    }
  } catch (error) {
    throw `Error "${error}" occured when trying to send message`
  }
}

export async function isRegisteredWhatsappUser(chatId: string) {
  await client.isRegisteredUser(chatId)
    .then((result) => {
      if (!result) {
        throw "Person you are trying to send the message is not registered user"
      }
    })
    .catch((reason) => {
      throw reason
    })
}





