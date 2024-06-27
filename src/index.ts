import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express, { type NextFunction, type Request, type Response } from 'express'
// import { dbconect } from './config'
import bodyParser from 'body-parser'
import cors from 'cors'
import { ENV } from './libs'
import routes from './routes'

const app = express()
const port = ENV.PORT || 5000
dotenv.config();
// dbconect()

app.use(cookieParser())
app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    };
    next();
});
// app.use("/images", express.static(path.join(__dirname, "../src/images")));
app.use(routes)

app.listen(port, () => {
    console.log(`Run at port ${port}🚀`)
})

export default app