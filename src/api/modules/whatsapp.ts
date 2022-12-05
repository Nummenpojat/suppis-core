import {sendMessage} from "../../modules/whatsapp/commands/sendMessage";
import {Router, json} from "express";
import {newWhatsappSession} from "../../modules/whatsapp/main";
import {sendBulkMessage} from "../../modules/whatsapp/commands/sendBulkMessage";

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
  sendBulkMessage(req.body.message, ["3584578385899"])
    .catch((reason) => {
      console.error(reason)
    })
})

router.get('/new', async (req, res) => {
  newWhatsappSession()
    .then((value) => {
      res.status(200).send(value)
    }).catch((reason) => {
    res.status(500).send(`${reason.name}: ${reason.message}, Data: ${reason.data}`)
  })
})

/**
 * Router constant to be entry point to Whatsapp api
 */
export const whatsappRouter = router;