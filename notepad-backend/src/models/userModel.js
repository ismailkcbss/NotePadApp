import mongoose from "mongoose";
import validator from 'validator'; // Girilen inputlarda istediğimiz koşulda veri alabilmek için pu paketi kullanıyoruz
import bcrypt from 'bcrypt'; // Kullanıcının şifresini DB ye kaydetmeden önce şifrelemek için kullandığımız paket


const { Schema } = mongoose; // mongoose paketinden schema yapısını çekiyoruz.

const userSchema = new Schema(
    {
        FullName: {
            type: String,
            required: [true, "Fullname Girmediniz."], // Buraya sadece true yazmak yeterli (Bu alanın zorunlu olduğunu belirtiyoruz) fakat burda hata mesajı yazdırmak için bu şekilde yazmak daha doğru.
            lowercase: true, // Kullanıcı ne girerse girsin küçük harfe döndürür
            validate: [validator.isAscii, "Sadece sayı ve harf girmelisiniz."],
        },
        Email: {
            type: String,
            required: [true, "Email Adresi Girmediniz"],
            unique: true, // Sadece bir kere alınabilirliği belirtiyoruz bu sayede başka bir hesapda bu email kullanılmaycak.
            validate: [validator.isEmail, "Email formatında giriş yapmadınız"],
        },
        Password: {
            type: String,
            required: [true, "Parola girişi yapmadınız"],
            minLength: [4, "En az 4 karakterli bir şifre oluşturun."],
        },
        Phone: {
            type: Number,
            required: [true, "Telefon Numaranızı girmediniz"],
            maxLength: [11, "Telefon numarası girerken fazla tuşlama yaptınız"],
        },
        Image: {
            type:String,
            required: [true, "Fotoğraf yüklemediniz"],
        },
    },
    {
        timestamps: true, // Mongoose da createdAt ile UpdatedAt oluşturur. Bunu kullanıcı kayıt tarihi vs için işe yarar.
    }
);

userSchema.pre("save", function (next) {
    const user = this // Kayıt esnasındaki kullanıcıyı belirtirir.
    bcrypt.hash(user.Password, 10, (err, hash) => { // ilk bilgi hash işlemi yapılacak veriyi yazarız / ikinci veri ise kaç kere koruma yapılacak sayıyı veririrz / 3 de hata durumunda verilecek mesaj için ve aynı zamanda veri biriktirme için kullanılan söz (?)
        user.Password = hash;// bulunan kullanıcı  parolasını hashler.
        next(); // işlem bittikten sonraki işleme geçmesi için kullandığımız parametre
    })
})

const User = mongoose.model('User', userSchema); // User anahtar kelimesi ile model oluşturma ve dış parçada kullanıcalak değişkene atadık.

export default User;