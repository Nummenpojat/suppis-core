import {Router} from "express";
import {sendAd} from "../../modules/whatsapp/commands/sendAd";
import {getEvent} from "../../modules/events/main";

const router = Router()

router.get('/', async (req: any, res: any) => {
  const event  = await getEvent("pkXvtuCJ6FijdL92Ftc8")
  res.send(event)
})

router.post('/sendAd', (req: any, res: any) => {
  sendAd("persons")
    .then(() => {
      res.status(200).send("Message was sent")
    })
    .catch((reason) => {
      console.log(reason)
      res.status(500).send(`${reason.name}: ${reason.message}, Data: ${reason.data}`)
    })
})

/**
 * Router constant to be entry point to Events api
 */
export const eventsRouter = router;