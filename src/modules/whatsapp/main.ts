import {Client, LocalAuth} from "whatsapp-web.js";
import {sendMessage} from "./commands/sendMessage";
import {sendBulkMessage} from "./commands/sendBulkMessage";
import {Socket} from "socket.io";

// Client configuration and exporting to other module parts
export const client = new Client({
  authStrategy: new LocalAuth({dataPath: "./config/whatsapp"}),
  takeoverOnConflict: true
});

let clientReady = false
let qr = ""

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

function messageListener(socket: Socket) {
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
}

export const handleSocketConnection = (socket: Socket) => {
  console.log(`User ${socket.id} connected!`)

  client.on('ready', () => {
    messageListener(socket);
  })

  if (clientReady) {
    messageListener(socket)
  }

  socket.send("Client is not yet ready")

  if (qr != "") {
    socket.send({
      type: "qr",
      message: qr
    })
  }

  client.on('qr', (qrLocal) => {
    socket.send(qrLocal)
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





