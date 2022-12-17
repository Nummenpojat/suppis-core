import {client, isClientReady} from "../main";

/**
 * Send same message to list of people
 * @param message Text that is sent to list provided
 * @param persons Array that contains numbers of people to send the message
 * */
export const sendMessageToList = async (message: string, numbers: string[]) => {

  // Checking that message is not empty
  if (message == "" || message == null) {
    throw "You need to provide message to send"
  }

  // Sending message to each on the list
  for (const num of numbers) {

    //Making chat id from phone number to use at client.sendMessage to identify where to send the message
    let chatId = num + "@c.us"

    // Removing + at the start if it exits so the phone number is in right format
    if (chatId.startsWith('+')) {
      chatId = chatId.substring(1)
    }

    try {

      isClientReady()

      // Sending message to chosen chat
      const returnMessage = await client.sendMessage(chatId, message)

      console.log(`Message ${returnMessage.body} sent to ${num}`);

    } catch (error: any) {
      if (error.message != undefined) {
        throw error.message
      }
      throw error
    }
  }
}