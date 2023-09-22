import mongoose from "mongoose";
import validator from "validator"; // Girilen inputlarda istediğimiz koşulda veri alabilmek için pu paketi kullanıyoruz
import bcrypt from "bcrypt"; // Kullanıcının şifresini DB ye kaydetmeden önce şifrelemek için kullandığımız paket

const { Schema } = mongoose; // mongoose paketinden schema yapısını çekiyoruz.

const userSchema = new Schema(
  {
    FullName: {
      type: String,
      required: [true, "You did not Enter a Full Name."], // Buraya sadece true yazmak yeterli (Bu alanın zorunlu olduğunu belirtiyoruz) fakat burda hata mesajı yazdırmak için bu şekilde yazmak daha doğru.
      lowercase: true, // Kullanıcı ne girerse girsin küçük harfe döndürür
      //karakter sınırlaması için kullanılabilir = validate: [validator.isAscii, "Sadece sayı ve harf girmelisiniz."],
    },
    Email: {
      type: String,
      required: [true, "You Did Not Enter an Email Address"],
      unique: true, // Sadece bir kere alınabilirliği belirtiyoruz bu sayede başka bir hesapda bu email kullanılmaycak.
      validate: [validator.isEmail, "You have not logged in to the email format"],
    },
    Password: {
      type: String,
      required: [true, "You have not entered a password"],
      minLength: [4, "Create a password with at least 4 characters."],
    },
    Phone: {
      type: Number,
      required: [true, "You did not enter your Phone Number"],
      minLength:[11,"Missing phone information"],
      maxLength: [11, "You made too much dialing when entering the phone number"],
    },
    Image: {
      type: String,
      required: [true, "You have not uploaded a photo"],
    },
    Admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Mongoose da createdAt ile UpdatedAt oluşturur. Bunu kullanıcı kayıt tarihi vs için işe yarar.
  }
);

userSchema.pre("save", function (next) {
  const user = this; // Kayıt esnasındaki kullanıcıyı belirtirir.
  bcrypt.hash(user.Password, 10, (err, hash) => {
    // ilk bilgi hash işlemi yapılacak veriyi yazarız / ikinci veri ise kaç kere koruma yapılacak sayıyı veririrz / 3 de hata durumunda verilecek mesaj için ve aynı zamanda veri biriktirme için kullanılan söz (?)
    user.Password = hash; // bulunan kullanıcı  parolasını hashler.
    next(); // işlem bittikten sonraki işleme geçmesi için kullandığımız parametre
  });
});

const User = mongoose.model("User", userSchema); // User anahtar kelimesi ile model oluşturma ve dış parçada kullanıcalak değişkene atadık.

export default User;
