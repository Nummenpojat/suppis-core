import {sendBulkMessage} from "./sendBulkMessage";
import {getEvent} from "../../events/main";

/**
 * Sends basic ad for an event
 */
export const sendAd = async (listId: string) => {
  try {

    // Getting event data from firebase to get details to send as ad
    const event = await getEvent("pkXvtuCJ6FijdL92Ftc8")

    sendBulkMessage(`
  Hei! Oletko kuullut tapahtumasta nimeltä ${event.name}
  ${event.description}
  Tapahtuma ajankohta on: ${new Date(event.date.starts._seconds * 1000)} - ${new Date(event.date.ends._seconds * 1000)}
  ${event.linkToEventCalendar}`, listId)

  } catch (error) {
    throw error
  }
}