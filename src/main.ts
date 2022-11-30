import {getFirestore} from "firebase-admin/firestore";
import {initializeApp} from "firebase-admin/app";
import {credential} from "firebase-admin";
import * as express from "express"
import {whatsappRouter} from "./api/modules/whatsapp";
import {eventsRouter} from "./api/modules/events";
import {checkAuth, setUserToAdmin} from "./auth";
import {json} from "express";
const cors = require("cors")

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

const api = express()
const PORT = 3001

api.use(cors())
api.use(json())
api.use("/", checkAuth)
api.use('/modules/whatsapp', whatsappRouter)
api.use('/modules/events', eventsRouter)

api.get('/', (req: any, res: any) => {
  res.send("This is Suppis!")
})

api.put('/admin', (req, res) => {
  if (req.body.email != "" && req.body.email) {
    setUserToAdmin(req.body.email)
      .then(() => {
        res.status(201).send(`${req.body.email} is now admin`)
      })
      .catch((reason) => {
        res.status(500).send(reason)
      })
  } else {
    res.status(400).send("Server didn't receive valid email")
  }
})

api.listen(PORT);
console.log(`App listening on port: ${PORT}`)