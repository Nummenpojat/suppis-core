import {Router} from "express";
import {sendMessage} from "../modules/whatsapp/commands/sendMessage";

export const router = Router()

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
  res.status(503).send("Sending messages to list of people is not yet implemented")
})