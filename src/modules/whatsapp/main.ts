import {Client, LocalAuth} from "whatsapp-web.js";

// Client configuration and exporting to other module parts
export const client = new Client({
  authStrategy: new LocalAuth({dataPath: "./config/whatsapp"}),
  takeoverOnConflict: true
});

export let qr = ""

export const isClientReady = () =>
{
  if (qr != "") {
    throw {
      type: "qr",
      data: qr
    }
  }

  if (client.info == undefined) {
    throw {
      type: "not-ready",
      data: "Client wasn't ready and qr was empty. Try again shortly"
    }
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

export const checkNumbers = async (numbers: string[]) => {
  for (const num of numbers) {

    // Making chat id from phone number to use at client.isRegisteredUser to use as number which is checked
    let chatId = num + "@c.us"

    // Removing + at the start if it exits so the phone number is in right format
    if (chatId.startsWith('+')) {
      chatId = chatId.substring(1)
    }

    try {
      const isRegistered = await client.isRegisteredUser(chatId)
      if (!isRegistered) {
        throw new Error()
      }
      console.log(`${num} is valid`)
    } catch (error: any) {
      throw `Number ${num} is invalid`
    }
  }
}





