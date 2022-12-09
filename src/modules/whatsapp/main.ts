import {Client, LocalAuth} from "whatsapp-web.js";

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





