import {initializeApp} from "firebase-admin/app";
import {credential} from "firebase-admin";
import * as express from "express"
import {json} from "express";
import {startWhatsappSession} from "./modules/whatsapp/main";
import {router as whatsappRouter} from "./router/whatsapp"
import {checkAuth} from "./auth/core";
import {setUserToAdmin} from "./auth/setUserToAdmin";
import {appCheck} from "./auth/appCheck";

const {config} = require("dotenv")
config()

const cors = require("cors")

// Constant that holds Firebase admin sdk service account
const ServiceAccount = require(`..${process.env.FIREBASE_SECRET_KEY_PATH}`);

// Even thought "firebase" shows as unused, it's used as the default app automatically
const firebase = initializeApp({
  credential: credential.cert(ServiceAccount)
});

const PORT = process.env.PORT || 3000

const httpLibrary = require("http")
const http = express()
const httpServer = httpLibrary.createServer(http)

http.use(cors())
http.use(json())
http.use(appCheck)
http.use(checkAuth)
http.use("/whatsapp", whatsappRouter)

startWhatsappSession()
  .catch((reason) => {
    console.log(reason)
  })

http.all('/', (req: any, res: any) => {
  res.send("This is Suppis!")
})

http.put('/admin', (req, res) => {
  setUserToAdmin(req.body.email)
    .then(() => res.status(201).send(`${req.body.email} is now admin`))
    .catch((reason) => res.status(500).send(reason))
})

httpServer.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`)
});
