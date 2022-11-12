import {Router} from "express";
import {db} from "../../main";
import {ScoutingEvent} from "../../types/event";

const router = Router()

router.get('/', async (req: any, res: any) => {
  const eventSnap = await db.collection("events").doc("pkXvtuCJ6FijdL92Ftc8").get()
  const event: ScoutingEvent = eventSnap.data() as ScoutingEvent
  console.log()
  res.send({
    message: ` Hei! Oletko kuullut tapahtumasta nimeltä ${event.name}
  ${event.description}
  Tapahtuma ajankohta on: ${new Date(event.date.starts._seconds * 1000)} - ${new Date(event.date.ends._seconds * 1000)}
  ${event.linkToEventCalendar}
  `,
    rawEventData: event
  })
})

/**
 * Router constant to be entry point to Events api
 */
export const eventsRouter = router;