import mongoose, {mongo} from 'mongoose';


const conn = () => {
    try {
        mongoose.connect(process.env.DB_URL,{
            dbName:'NotePadApp', // Database ismi
            useNewUrlParser:true, // Hata vermemesi için
            useUnifiedTopology:true // Hata vermemesi için
        })
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log(`DB Connected err : ${error}`);
    }
}
export default conn;