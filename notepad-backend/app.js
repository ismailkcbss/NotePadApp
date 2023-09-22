import express from 'express';
import dotenv from 'dotenv';
import conn from './db.js';
import cookieParser from 'cookie-parser';
import { CheckUser } from './src/middlewares/authMiddleWare.js'
import userRoute from "./src/routes/userRoute.js";
import notesRoute from './src/routes/notesRoute.js'
import panelRoute from './src/routes/panelRoute.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';

dotenv.config(); // ENV dosyasına erişim

conn();//DataBase e erişim için

const app = express();

const port = process.env.PORT;


// Static files middleware
app.use(express.json()); // Json veriyi yazmak için

//Cookie yaparken kullandıklarım.
app.use(cookieParser()); // Cookie ye çerezleri göndermek için ekliyoruz
app.use(bodyParser.urlencoded({ extended: true })); // Eğerki bu durumu belirtmez isek put ve post isteği atamayız.
app.use(cors({
    origin: ['http://localhost:3000'], //Hedef gösterme
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200
})) // Frontend den gelen istekleri backende iletmesini sağlayan paket

app.use(
    session({
        key: "jwt",
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            exprires: 60 * 60 * 24,
        },
    })
)


// Route
app.use('*', CheckUser); //Herhangi bir sayfadan Get isteği atıldığı zaman checkuser fonksiyonuna gider ve orda token kontrol edilir
app.use("/Users", userRoute);
app.use("/Notes", notesRoute);
app.use("/Panel", panelRoute);

app.listen(port, () => {
    console.log(`Port çalıştı : ${port}`);
})
