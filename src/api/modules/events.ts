import {Router} from "express";
import {sendAd} from "../../modules/whatsapp/commands/sendAd";
import {getEvent} from "../../modules/events/main";

const router = Router()

router.get('/', async (req: any, res: any) => {
  const event  = await getEvent("pkXvtuCJ6FijdL92Ftc8")
  res.send(event)
})

/**
 * Router constant to be entry point to Events api
 */
export const eventsRouter = router;