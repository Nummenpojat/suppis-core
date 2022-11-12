import {Router} from "express";
import {db} from "../../main";
import {ScoutingEvent} from "../../types/event";
import {sendAd} from "../../modules/events/commands/sendAd";

const router = Router()

router.get('/', async (req: any, res: any) => {
  const eventSnap = await db.collection("events").doc("pkXvtuCJ6FijdL92Ftc8").get()
  const event: ScoutingEvent = eventSnap.data() as ScoutingEvent
  console.log(event)
  res.send(event)
})

router.post('/sendAd', (req: any, res: any) => {
  sendAd()
})

/**
 * Router constant to be entry point to Events api
 */
export const eventsRouter = router;