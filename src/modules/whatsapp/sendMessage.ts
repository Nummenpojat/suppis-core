import {Message} from "whatsapp-web.js";
import {client} from "./main";

export const sendMessage = (phoneNumber: string, message: string) => {

  console.log('Sending message...');

  client.on('ready', () => {

    // Removing + at the start if it exits so the phone number is in right format
    if (phoneNumber.startsWith('+')) {
      phoneNumber = phoneNumber.substring(1)
    }

    //Making chat id from phone number to use at client.sendMessage to identify where to send the message
    const chatId = phoneNumber + "@c.us"

    // Sending message to chosen chat
    client.sendMessage(chatId, message)
      .then((message: Message) => {
        console.log(`Message ${message.body} sent`);
        console.log('Now you can exit the program!');
      })
      .catch((error: Error) => {
        throw error
      })
  });

  client.initialize();
}