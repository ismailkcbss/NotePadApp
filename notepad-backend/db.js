import mongoose, {mongo} from 'mongoose';


const conn = () => {
    try {
        mongoose.connect(process.env.DB_URL,{
            dbName:'NotePadApp', // Database ismi
            useNewUrlParser:true, // Hata almamak için yapılıyor sebebini bilmiyorum
            useUnifiedTopology:true // Hata almamak için yapılıyor sebebini bilmiyorum
        })
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log(`DB Connected err : ${error}`);
    }
}
export default conn;