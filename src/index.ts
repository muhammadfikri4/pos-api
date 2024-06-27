import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express from 'express'
// import { dbconect } from './config'
import bodyParser from 'body-parser'
import path from 'path'
import { ENV } from './libs'
import routes from './routes'

const app = express()
const port = ENV.PORT || 5000
dotenv.config();
// dbconect()
app.use(cookieParser())
// app.use(cors({
//     origin: "https://pos-web-app-mu.vercel.app",
//     credentials: true,
// }))
// app.use((req: Request) => {
//     req.headers['access-control-allow-origin'] = "https://pos-web-app-mu.vercel.app"
//     req.
// })
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/images", express.static(path.join(__dirname, "../src/images")));
app.use(routes)

app.listen(port, () => {
    console.log(`Run at port ${port}🚀`)
})

export default app