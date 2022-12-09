import {getFirestore} from "firebase-admin/firestore";
import {initializeApp} from "firebase-admin/app";
import {credential} from "firebase-admin";
import * as express from "express"
import {httpCheckAuth, setUserToAdmin, wsCheckAuth} from "./auth";
import {json} from "express";
import {startWhatsappSession} from "./modules/whatsapp/main";

const cors = require("cors")

/**
 * Constant that holds Firebase admin sdk service account <br/>
 * @todo Replace file path with your own firebase admin sdk secret key file
 */
const ServiceAccount = require('../config/firebase-admin-secrets/suppis-firebase-admin-secrets.json');
const firebase = initializeApp({
  credential: credential.cert(ServiceAccount)
});

// Firestore database entrypoint
export const db = getFirestore(firebase);

const PORT = 3001

const httpLibrary = require("http")
const http = express()
const httpServer = httpLibrary.createServer(http)

http.use(cors())
http.use(json())
http.use(httpCheckAuth)

startWhatsappSession()
  .then((result) => {
    console.log(result)
  })

http.get('/', (req: any, res: any) => {
  res.send("This is Suppis!")
})

http.put('/admin', (req, res) => {
  setUserToAdmin(req)
    .then(() => res.status(201).send(`${req.body.email} is now admin`))
    .catch((reason) => res.status(reason.status).send(reason.reason))
})

httpServer.listen(PORT);
console.log(`App listening on port: ${PORT}`)