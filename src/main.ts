import {getFirestore} from "firebase-admin/firestore";
import {initializeApp} from "firebase-admin/app";
import {credential} from "firebase-admin";
import * as express from "express"
import {whatsappRouter} from "./api/modules/whatsapp";
import {eventsRouter} from "./api/modules/events";
import {getAuth} from "firebase-admin/auth";
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

const checkAuth = (req: any, res: any, next: any) => {
  if (req.headers.idtoken) {
    const idToken = req.headers.idtoken.toString()
    getAuth().verifyIdToken(idToken)
      .then((result) => {
        if (result.email_verified && result.email == "aaro.heroja@nummenpojat.fi") {
          console.log("ok!")
          next()
        } else {
          console.log("wrong email")
          res.status(403).send("Unauthorized!")
        }
      })
      .catch(() => {
        res.status(403).send("Unauthorized!")
      })
  } else {
    res.status(403).send("Unauthorized!")
  }
}

api.use(cors())
api.use("/", checkAuth)

api.use('/modules/whatsapp', whatsappRouter)
api.use('/modules/events', eventsRouter)

api.get('/', (req: any, res: any) => {
  res.send("This is Suppis!")
})

api.listen(PORT);
console.log(`App listening on port: ${PORT}`)