import {Router} from "express";
import {sendMessage} from "../modules/whatsapp/commands/sendMessage";
import {sendMessageToList} from "../modules/whatsapp/commands/sendMessageToList";
import {client, isClientReady} from "../modules/whatsapp/main";

export const router = Router()

router.all("/status", (req, res) => {
  try {
    isClientReady()
    res.status(200).send("Whatsapp client is ready!")
  } catch (error) {
    res.status(409).send(error)
  }
})

router.use((req, res, next) => {
  if (client.info == undefined) {
    res.status(409).send("Whatsapp client is not ready!")
    return
  }
  next()
})

router.post("/send/one", (req, res) => {
  sendMessage(req.body.number, req.body.message)
    .then((result) => {
      res.status(200).send(result)
    })
    .catch((reason) => {
      res.status(400).send(reason)
    })
})

router.post("/send/list", (req, res) => {
  sendMessageToList(req.body.message, req.body.numbers)
    .then((result) => {
      res.status(200).send(result)
    })
    .catch((reason) => {
      res.status(400).send(reason)
    })
})