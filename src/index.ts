import dotenv from 'dotenv'
import express from 'express'
import { dbconect } from './config'
import routes from './routes'

const app = express()
const port = process.env.PORT || 5000
dotenv.config()
app.use(express.json())
dbconect()

app.use(routes)

app.listen(port, () => {
    console.log("Run at port 3000🚀")
})
