import {db} from "../../../main";
import {sendBulkMessage} from "../../whatsapp/commands/sendBulkMessage";
import {ScoutingEvent} from "../../../types/event";

export const sendAd = async () => {

  // Getting event data from firebase to get details to send as ad
  const eventSnap = await db.collection("persons").doc("pkXvtuCJ6FijdL92Ftc8").get()
  const event = eventSnap.data()
  console.log(event)

  /*sendBulkMessage(`
  Hei! Tiesitkö että on olemassa tapahtuma ${event.}
  `)*/
}