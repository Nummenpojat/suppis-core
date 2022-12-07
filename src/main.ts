import {getFirestore} from "firebase-admin/firestore";
import {initializeApp} from "firebase-admin/app";
import {credential} from "firebase-admin";
import * as express from "express"
import {whatsappRouter} from "./api/modules/whatsapp";
import {checkAuth, setUserToAdmin, verifyIdToken} from "./auth";
import {json} from "express";
import {WebSocketServer} from "ws";
import {whatsapp} from "./modules/whatsapp/main";
import {Server, Socket} from "socket.io";

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

const PORT = 3001

const httpLibrary = require("http")
const http = express()
const httpServer = httpLibrary.createServer(http)
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
})

http.use(cors())
http.use(json())
http.use(checkAuth)
http.use('/modules/whatsapp', whatsappRouter)

io.use((socket, next) => {
  verifyIdToken(socket.handshake.headers.idtoken)
    .then(() => {
      next()
    })
    .catch((reason) => {
      next(new Error(reason))
    })
})

io.on('connection', (socket: Socket) => {
  console.log(`User ${socket.id} connected!`)
  whatsapp(socket)
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