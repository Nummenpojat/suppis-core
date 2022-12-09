import {client, isRegisteredWhatsappUser} from "../main";

/**
 *  Send message with Whatsapp to single number
 *  @param phoneNumber Number that message is sent
 *  @param message Text that is sent to phoneNumber provided
 **/
export const sendMessage = async (phoneNumber: string, message: string) => {

  console.log('Sending message...');

  // Checking that phone number is not empty
  if (phoneNumber == "" || phoneNumber == null || phoneNumber == undefined) {
    throw "You need to provide phone number"
  }

  // Checking that message is not empty
  if (message == "" || message == null || message == undefined) {
    throw "You need to provide message to send"
  }


  // Removing + at the start if it exits so the phone number is in right format
  if (phoneNumber.startsWith('+')) {
    phoneNumber = phoneNumber.substring(1)
  }

  //Making chat id from phone number to use at client.sendMessage to identify where to send the message
  const chatId = phoneNumber + "@c.us"

  try {

    // Checking user so application doesn't crash
    await isRegisteredWhatsappUser(chatId);

    // Sending message to chosen chat
    const returnMessage = await client.sendMessage(chatId, message)

    console.log(`Message ${returnMessage.body} sent`);
    return `Message ${returnMessage.body} sent`

  } catch (error) {
    throw error
  }
}