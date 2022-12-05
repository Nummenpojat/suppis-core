import {getFirestore} from "firebase-admin/firestore";
import {initializeApp} from "firebase-admin/app";
import {credential} from "firebase-admin";
import * as express from "express"
import {whatsappRouter} from "./api/modules/whatsapp";
import {eventsRouter} from "./api/modules/events";
import {checkAuth, setUserToAdmin} from "./auth";
import {json} from "express";

const cors = require("cors")
import {WebSocketServer} from "ws";
import {client} from "./modules/whatsapp/main";
import {Message} from "whatsapp-web.js";

/**
 * Constant that holds Firebase admin sdk service account <br/>
 * @todo Replace file path with your own firebase admin sdk secret key file
 */
const ServiceAccount = require('../config/firebase-admin-secrets/suppis-firebase-admin-secrets.json');
const firebase = initializeApp({
  credential: credential.cert(ServiceAccount)
});

// Firestore database instance
export const db = getFirestore(firebase);

const PORT = 3001

const http = express()
const socketServer = new WebSocketServer({
  port: 3002
})

socketServer.on('connection', (socket) => {
  client.initialize()

  client.on("qr", (qr) => {
    socket.send(qr)
  })

  client.on("ready", () => {

    socket.send("Client is ready")

    socket.on('message', (rawMessage: any) => {
      const message: { type: string, number: string, message: string } = JSON.parse(rawMessage)
      console.log(message)
      if (message.type == "one") {

      }
      if (message.type == "list") {

      }
    })
  })

})

http.use(cors())
http.use(json())
http.use("/", checkAuth)
http.use('/modules/whatsapp', whatsappRouter)
http.use('/modules/events', eventsRouter)

http.get('/', (req: any, res: any) => {
  res.send("This is Suppis!")
})

http.put('/admin', (req, res) => {
  setUserToAdmin(req)
    .then(() => res.status(201).send(`${req.body.email} is now admin`))
    .catch((reason) => res.status(reason.status).send(reason.reason))
})

http.listen(PORT);
console.log(`App listening on port: ${PORT}`)