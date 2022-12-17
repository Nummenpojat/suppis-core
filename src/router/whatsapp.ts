import {Router} from "express";
import {sendMessage} from "../modules/whatsapp/commands/sendMessage";
import {qr} from "../modules/whatsapp/main";
import {sendMessageToList} from "../modules/whatsapp/commands/sendMessageToList";

export const router = Router()

router.post("/send/one", (req, res) => {
  sendMessage(req.body.number, req.body.message)
    .then((result) => {
      res.status(200).send(result)
    })
    .catch((reason) => {
      if (reason.type == "qr") {
        res.status(409).send(qr)
      } else {
        res.status(500).send(reason)
      }
    })
})

router.post("/send/list", (req, res) => {
  sendMessageToList(req.body.message, req.body.numbers)
    .then(() =>  {
      res.status(200).send("Messages sent")
    })
    .catch((reason) => {
        res.status(500).send(reason)
    })
})