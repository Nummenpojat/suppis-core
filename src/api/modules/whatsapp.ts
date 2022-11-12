import {sendBulkMessage, sendMessage} from "../../modules/whatsapp/sendMessage";
import {Router, json} from "express";
import {client} from "../../modules/whatsapp/main";

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

/**
 * Router constant to be entry point to Whatsapp api
 */
router.get('/new', async (req, res) => {

  // TODO refactor to /modules/whatsapp/main.ts
  // Generating and sending qr code to scan to log in to Whatsapp
  try {
    let qr = await new Promise((resolve, reject) => {
      client.initialize()
      client.on('qr', (qr) => resolve(qr))
      setTimeout(() => {
        reject(new Error("QR event wasn't emitted in 15 seconds."))
      }, 15000)
    })
    res.send(qr)
  } catch (error) {
    res.status(500).send(error)
  }

})
export const whatsappRouter = router;