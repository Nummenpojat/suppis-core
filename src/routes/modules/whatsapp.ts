import * as express from "express"
import {sendMessage} from "../../modules/whatsapp/sendMessage";
export const router = express.Router()

router.use(express.json())

router.get('/', (req: any, res: any) => {
  res.send('This is Whatsapp!')
})

router.post('/send/one', (req, res) => {
    res.status(202).send('Message received. Sending message!')
    console.log(req.body.number, req.body.message)
    sendMessage(req.body.number, req.body.message)
})