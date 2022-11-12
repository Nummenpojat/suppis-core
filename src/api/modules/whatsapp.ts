import {sendBulkMessage, sendMessage} from "../../modules/whatsapp/sendMessage";
import {Router, json} from "express";
import {newWhatsappSession} from "../../modules/whatsapp/main";

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

router.get('/new', async (req, res) => {
  newWhatsappSession()
    .then((value) => {
      res.status(200).send(value)
    }).catch((reason) => {
    res.status(500).send(reason)
  })
})

/**
 * Router constant to be entry point to Whatsapp api
 */
export const whatsappRouter = router;