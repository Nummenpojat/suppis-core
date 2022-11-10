import * as express from "express"
const router = express.Router()

router.get('/', (req: any, res: any) => {
  res.send('This is Whatsapp!')
})

module.exports = router