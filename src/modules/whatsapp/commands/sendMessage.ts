import {client, isClientReady} from "../main";

/**
 *  Send message with Whatsapp to single number
 *  @param phoneNumber Number that message is sent
 *  @param message Text that is sent to phoneNumber provided
 **/
export const sendMessage = async (phoneNumber: string, message: string) => {

  // Checking that phone number is not empty
  if (phoneNumber == "" || phoneNumber == null) {
    throw "You need to provide phone number"
  }

  // Checking that message is not empty
  if (message == "" || message == null) {
    throw "You need to provide message to send"
  }


  // Removing + at the start if it exits so the phone number is in right format
  if (phoneNumber.startsWith('+')) {
    phoneNumber = phoneNumber.substring(1)
  }

  //Making chat id from phone number to use at client.sendMessage to identify where to send the message
  const chatId = phoneNumber + "@c.us"

  try {

    isClientReady()

    // Sending message to chosen chat
    const returnMessage = await client.sendMessage(chatId, message)

    console.log(`Message ${returnMessage.body} sent`);
    return `Message ${returnMessage.body} sent`

  } catch (error: any) {
    if (error.message != undefined) {
      throw error.message
    }
    throw error
  }
}