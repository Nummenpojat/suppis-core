import {Client, LocalAuth} from "whatsapp-web.js";

// Client configuration and exporting to other module parts
export const client = new Client({
  authStrategy: new LocalAuth({dataPath: "./config/whatsapp"}),
  takeoverOnConflict: true
});
export let qr = ""

export const isClientReady = () => {

  if (client.info == undefined) {
    throw "Client wasn't ready and qr was empty. Try again shortly"
  }

  if (qr != "") {
    throw {
      type: "qr",
      message: qr
    }
  }
}

export const startWhatsappSession = async () => {

  client.initialize()

  client.on('ready', () => {
    console.log("Whatsapp client is ready!")
    return;
  })

  client.on('qr', (tempqr) => {
    qr = tempqr
  })
}





