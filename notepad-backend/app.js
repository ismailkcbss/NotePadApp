import express from 'express';
import dotenv from 'dotenv';
import conn from './db.js';
import { CheckUser } from './src/middlewares/authMiddleWare.js'

dotenv.config(); // ENV dosyasına erişim

conn();//DataBase e erişim için

const app = express();

const port = process.env.PORT;

// Route
app.get('*', CheckUser);

app.listen(port, () => {
    console.log(`Port çalıştı : ${port}`);
})


//PageControlleri incele ve ardından PageRoute // Logout için
//