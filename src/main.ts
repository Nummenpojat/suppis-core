import * as express from "express"
const app = express()
const PORT = 3001

app.get('/', (req: any, res: any) => {
  res.send('This is Suppis!')
})

import {router as whatsapp} from "./routes/modules/whatsapp";
app.use('/modules/whatsapp', whatsapp)

app.listen(PORT);
console.log(`App listening on port: ${PORT}`)