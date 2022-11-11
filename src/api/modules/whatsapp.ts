import {sendBulkMessage, sendMessage} from "../../modules/whatsapp/sendMessage";
import {Router, json} from "express";

const router = Router()

router.use(json())

router.get('/', (req: any, res: any) => {
  res.send('This is Whatsapp!')
})

router.post('/send/one', (req, res) => {

  // Sending status message to approve request
  res.status(202).send('Message received. Sending message!')

  // Sending message to number that was given
  sendMessage(req.body.number, req.body.message)
    .catch((reason) => {
      console.error(reason)
    })
})

router.post('/send/list', (req, res) => {

  // Sending status message to approve request
  res.status(202).send('Message received. Sending messages!')

  // Sending messages to list of people
  sendBulkMessage(req.body.message)
    .catch((reason) => {
      console.error(reason)
    })
})

export const whatsappRouter = router;