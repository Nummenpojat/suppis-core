import {db} from "../../main";
import {ScoutingEvent} from "../../types/event";

/**
 * gets event with given id from the database
 * @param eventId
 */
export const getEvent = async (eventId: string): Promise<ScoutingEvent> => {

  // Gets event snapshot from database
  const eventSnap = await db.collection("events").doc(eventId).get()

  // Formats event snapshot to readable form
  return eventSnap.data() as ScoutingEvent

}