import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express from 'express'
// import { dbconect } from './config'
import bodyParser from 'body-parser'
import cors from 'cors'
import { ENV } from './libs'
import routes from './routes'

const app = express()
const port = ENV.PORT || 5000
dotenv.config();
// dbconect()
app.use(cors())
app.use(cookieParser())

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes)

app.listen(port, () => {
    console.log(`Run at port ${port}🚀`)
})

export default app