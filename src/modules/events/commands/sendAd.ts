import {db} from "../../../main";
import {sendBulkMessage} from "../../whatsapp/commands/sendBulkMessage";
import {ScoutingEvent} from "../../../types/event";

/**
 * Sends basic ad for an event
 */
export const sendAd = async (listId: string) => {
  try {

    // Getting event data from firebase to get details to send as ad
    const eventSnap = await db.collection("events").doc("pkXvtuCJ6FijdL92Ftc8").get()
    const event = eventSnap.data() as ScoutingEvent
    console.log(event)

    sendBulkMessage(`
  Hei! Oletko kuullut tapahtumasta nimeltä ${event.name}
  ${event.description}
  Tapahtuma ajankohta on: ${new Date(event.date.starts._seconds * 1000)} - ${new Date(event.date.ends._seconds * 1000)}
  ${event.linkToEventCalendar}`, listId)

  } catch (error) {
    throw error
  }
}