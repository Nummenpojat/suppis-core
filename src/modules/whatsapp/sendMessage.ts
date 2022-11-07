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
        console.log("Now you can exit program")

      })
      .catch((error: Error) => {
        throw error
      })
  });

  client.initialize();
}

const DUMMY_NUMBERS = [
  {
    name: "example",
    number: 1234,
    agegroup: "sudenpentu",
    group: "ViMa tiimi"
  }
]

export const sendBulkMessage = (message: string) => {

  console.log('Sending messages...');

  client.on('ready', () => {

    console.log("Client ready!")

    // Sending message to each on the list
    DUMMY_NUMBERS.forEach((person: any) => {

      console.log(`trying to send message to ${person.name}`)

      //Making chat id from phone number to use at client.sendMessage to identify where to send the message
      let chatId = person.number + "@c.us"

      // Removing + at the start if it exits so the phone number is in right format
      if (chatId.startsWith('+')) {
        chatId = chatId.substring(1)
      }

      // Sending message to chosen chat
      client.sendMessage(chatId, message)
        .then((message: Message) => {
          console.log(`Message ${message.body} sent to ${person.name}`);
        })
        .catch((error: Error) => {
          throw error
        })
    })
    console.log("Now you can exit program")
  });

  client.initialize()
    .then(() => {
      console.log("initialized")
    });

}