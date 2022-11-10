import * as express from "express"
const app = express()
const PORT = 3001

app.get('/', (req: any, res: any) => {
  res.send('This is Suppis!')
})

const whatsapp = require('./routes/modules/whatsapp')
app.use('/modules/whatsapp', whatsapp)

app.listen(PORT);