import {getFirestore} from "firebase-admin/firestore";
import {getApps, initializeApp} from "firebase-admin/app";
import {credential} from "firebase-admin";
import * as express from "express"
import {whatsappRouter} from "./api/modules/whatsapp";

// Replace file path with your own firebase admin sdk secret key file
const ServiceAccount = require('../config/firebase-admin-secrets/suppis-firebase-admin-secrets.json');
const app = initializeApp({
  credential: credential.cert(ServiceAccount)
});

// exporting db to be used on other parts of application
export const db = getFirestore(app);

const api = express()
const PORT = 3001

api.get('/', (req: any, res: any) => {
  res.send('This is Suppis!')
})


api.use('/modules/whatsapp', whatsappRouter)

api.listen(PORT);
console.log(`App listening on port: ${PORT}`)