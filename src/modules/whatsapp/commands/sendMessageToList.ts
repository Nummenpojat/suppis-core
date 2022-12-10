import {client} from "../main";

/**
 * Send same message to list of people
 * @param message Text that is sent to list provided
 * @param persons Array that contains numbers of people to send the message
 * */
export const sendMessageToList = async (message: string, persons: string[]) => {

  console.log('Sending messages...');

  // Checking that message is not empty
  if (message == "" || message == null) {
    throw "You need to provide message to send"
  }

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
      .then((message) => {
        console.log(`Message ${message.body} sent to ${person.name}`);
      })
      .catch((error: Error) => {
        throw error
      })
  })
}