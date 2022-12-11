import {Client, LocalAuth} from "whatsapp-web.js";

// Client configuration and exporting to other module parts
export const client = new Client({
  authStrategy: new LocalAuth({dataPath: "./config/whatsapp"}),
  takeoverOnConflict: true
});

export let qr = ""

export const isClientReady = () => {

  if (qr != "") {
    throw {
      type: "qr",
      qr: qr
    }
  }

  if (client.info == undefined) {
    throw "Client wasn't ready and qr was empty. Try again shortly"
  }
}

export const startWhatsappSession = async () => {

  console.log("Starting new Whatsapp session")

  client.initialize()

  client.on('ready', () => {
    qr = ""
    console.log("Whatsapp client is ready!")
    return;
  })

  client.on('qr', (tempQr) => {
    console.log("Login with QR is needed!")
    qr = tempQr
  })
}





