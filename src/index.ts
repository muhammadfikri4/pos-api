import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express, { type NextFunction, type Request, type RequestHandler, type Response } from 'express'
// import { dbconect } from './config'
import cors from 'cors'
import { ENV } from './libs'
import routes from './routes'

const app = express()
const port = ENV.PORT || 5000
dotenv.config();
// dbconect()

const allowCors = (fn: RequestHandler) => async (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Credentials', "true")
    res.setHeader('Access-Control-Allow-Origin', 'https://pos-web-app-mu.vercel.app')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res, next)
}


app.use(cookieParser())
app.use(cors())
// app.use(cors({
//     origin: "https://pos-web-app-mu.vercel.app",
//     credentials: true,
// }))
// app.use((req: Request) => {
//     req.headers['access-control-allow-origin'] = "https://pos-web-app-mu.vercel.app"
//     req.
// })
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// app.use("/images", express.static(path.join(__dirname, "../src/images")));
app.use(allowCors(routes))

app.listen(port, () => {
    console.log(`Run at port ${port}🚀`)
})

export default app