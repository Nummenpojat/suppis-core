import {db} from "../../../main";
import {client} from "../main";
import {Message} from "whatsapp-web.js";

/**
 * Send same message to list of people
 * @param message Text that is sent to list provided
 * @param listId Id that identifies which list of persons to send the message
 * */
export const sendBulkMessage = async (message: string, listId: string) => {

  console.log('Sending messages...');

  // Checking that message is not empty
  if (message == "" || message == null) {
    throw "You need to provide message to send"
  }

  if (listId == "" || listId == null) {
    throw "You need to provide listId to know which people to send the message"
  }

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

    client.on('auth_failure', (message: string) => {
      console.log(message)
    })

  });

  client.initialize();
}