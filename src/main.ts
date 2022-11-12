import {getFirestore} from "firebase-admin/firestore";
import {initializeApp} from "firebase-admin/app";
import {credential} from "firebase-admin";
import * as express from "express"
import {whatsappRouter} from "./api/modules/whatsapp";

/**
 * Constant that holds Firebase admin sdk service account <br/>
 * @todo Replace file path with your own firebase admin sdk secret key file
  */
const ServiceAccount = require('../config/firebase-admin-secrets/suppis-firebase-admin-secrets.json');
const app = initializeApp({
  credential: credential.cert(ServiceAccount)
});

/**
 * Firestore database instance <br/>
 * It uses old namespaced environment so don't be confused
 */
export const db = getFirestore(app);

const api = express()
const PORT = 3001

api.use('/modules/whatsapp', whatsappRouter)

api.get('/', (req: any, res: any) => {
  res.send("This is Suppis!")
})

api.listen(PORT);
console.log(`App listening on port: ${PORT}`)