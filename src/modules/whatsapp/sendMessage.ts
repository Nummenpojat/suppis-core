import {Message} from "whatsapp-web.js";
import {client} from "./main";
import {Person} from "../../../types/person";
import {db} from "../../../config/firebase-admin";

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

  client.on('auth_failure', (message: string) => {
    console.log(message)
  })

  client.initialize();
}

export const sendBulkMessage = async (message: string) => {

  console.log('Sending messages...');

  // Getting number list from db to know which persons to send the message
  const personsSnap = await db.collection("persons").get()
  const persons = personsSnap.docs.map((doc: any) => {
    return {
      ...doc.data()
    }
  })

  client.on('ready', () => {

    console.log("Client ready!")

    // Sending message to each on the list
    persons.forEach((person: any) => {

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
  });

  client.on('auth_failure', (message: string) => {
    console.log(message)
  })

  client.initialize();
}