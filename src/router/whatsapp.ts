import {Router} from "express";
import {sendMessage} from "../modules/whatsapp/commands/sendMessage";
import {sendMessageToList} from "../modules/whatsapp/commands/sendMessageToList";
import {isClientReady} from "../modules/whatsapp/main";

export const router = Router()

router.all("/status", (req, res) => {
  try {
    isClientReady()
    res.status(200).send("Whatsapp client is ready!")
  } catch (error) {
    res.status(409).send(error)
  }
})

router.post("/send/one", (req, res) => {
  sendMessage(req.body.number, req.body.message)
    .then((result) => {
      res.status(200).send(result)
    })
    .catch((reason) => {
      res.status(500).send(reason)
    })
})

router.post("/send/list", (req, res) => {
  sendMessageToList(req.body.message, req.body.numbers)
    .then(() => {
      res.status(200).send("Messages sent")
    })
    .catch((reason) => {
      res.status(500).send(reason)
    })
})