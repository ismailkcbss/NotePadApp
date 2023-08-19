import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


/* STATUS KOD AÇIKLAMASI
200 = TAMAM / OK, genellikle her şey yolunda olduğu zaman kullanılır
201 = OLUŞTURULDU / CREATED,
202 = ONAYLANDI / ACCEPTED,
400 = KÖTÜ İSTEK / BAD_REQUEST,
401 = YETKİSİZ / UNAUTHORIZED,
415 = DESTEKLENMEYEN MEDYA TÜRÜ / UNSUPPORTED MEDİA TYPE
500 = INTERNAL SERVER ERROR
*/


const CreateUser = async (req, res) => { // Kullanıcı kayıt fonksiyonu
    try {
        const user = await User.create(req.body) // body den gelen istek doğrultusunda User modalda kullanıcı oluşturma.
        res.status(200).json({ user: user._id }); // Başarılı bir istek ise cevap olarak json bir veri dönüyoruz.

    } catch (error) {
        let errors2 = {}; // let ile tanımlamamızın sebebi ilerleryen durumlarda değişiklik olabileceği için

        if (error.code === 11000) { // DB den gelen hata kodu unique olmasını istediğimiz veriler için daha önceden kullanıldıysa
            errors2.email = "Bu email ile daha önceden kayıt olunmuş";
        }
        if (error.name === "ValidationError") { // Yapılan hataları teker teker bulmak için bu koşulu yazıyoruz
            Object.keys(error.errors).forEach((key) => { //Error objesinin içinde errorsda yazan birden fazla hata olması durumda hepsini yazdırmak için foreach metodunu kullanıyoruz.ve key parametresi ile teker teker yazdırmak için ayrıştıyoruz.
                errors2[key] = error.errors[key].message; // Teker teker errorde çıkan hataları errors2 değişkenine atıyoruz.
            });
        }
        res.status(400).json(errors2); // Eğer girilen bilgilerde yanlışlık var ise hatayı ekrana json verisi şeklinde basıyoruz.
        console.log(error);
    }
}

const LoginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body; // Body den gelen email ve parolayı alıyoruz.
        const user = await User.findOne({ Email }) // Bu kısımda body den gelen email ile user modalımızda aynı emaile ait birisi varmı diye kontrol ediyoruz.

        let check = false; // Kullanıcı girip girmediğini kontrol etmek için değişken atadık.

        if (user) { // Eğerki yukarıdaki arama işleminden bir kullanıcı olduğu için ture cevabı aldıysak eğer parola kontrolü yapıcaz
            check = await bcrypt.compare(Password, user.Password) // Bu işlem bize true ya da false dönecek işlemin içeriği ise daha önce kayır işleminde bcrypt edilmiş şifreyi çözüp inputa girilen şifre ile karşılaştırmak için

        } else {
            return res.status(401).json({ // Eğerki girilen emaile daha önce kayıtlı değilse json olarak cevap dönüyoruz.
                succeded: false,
                error: "Girilen bilgilere ait kullanıcı bulunamadı"
            });
        }

        if (check) { // Yukarıdaki işlem başarılı bir şekilde olduysa check değişkeni true olmuştur ve artık token oluşturup cookie de saklayabiliriz.
            const token = CreateToken(user._id) // DB de oluşan tabloda user lar için id yi _id kelimesi ile tuttuğumuz için bu şekilde yazdık. Burda yaptığımız işlem ise token anahtar kelimesi içine userID yi kullarak token oluşturduk.
            res.cookie("jwt", token, { // ilk değişken cookie de tutulacak isim, ikincisi tutulacak veri, üçüncü durumda hem  hem de milisaniye cinsinden cookie süresi belirleniyor.
                httpOnly: false, // JavaScript ile herhangi bir manipüle edilmemesi için yapılmış olan sadece http isteklerinde kullanmak için güvenlik önlemi
                maxAge: 1000 * 60 * 60 * 24 // Milisaniye cinsinden cookie süresini belirlemek için kullanılır bizde 1 güne eşitledik
            })
            res.status(201).json({ // Başarılı giriş olursa json olarak bilgilerini dönüyorum.
                succeded: true,
                user,
                token,
            })
        } else { // Bu durumda check false gelmiştir ve kullanıcı parolasını yanlış yazmıştır bunun için bir json cevabı dönüyoruz.
            res.status(401).json({
                succeded: false,
                error: "Girilen parola yanlış",
            });
        }
    } catch (error) { // Yukarıdaki durumlardan herhangi bir durum yanlış giderse cathce düşer ve json veri olarak hatayı ekrana basıyoruz. 
        res.status(500).json({
            succeded: false,
            error,
        });
        console.log(error);
    }
}

const GetAllUser = async (req, res) => {
    try {
        const user = await User.find({})
        res.status(200).json({
            succeded: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
        console.log(error);
    }
}

const UserMe = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => { // Coocieden gelen token bizim üretmiş olduğumuz bir token olup olmadığını çözümlüyoruz eğerki evetse işlemlerine devam ediyor.
            if (err) { // Hata durumunda mesajı döner.
                res.status(401).json({
                    succeded:false,
                    err
                }) // Error veriyorsa eğer böyle bir kullanıcı yok demektir ve bu durumda null atarız.
                next(); // Sonraki işleme geçmesini sağlar.
            } else {
                const user = await User.findById(decodedToken.userId);// DB de bulunan kayıtlı kişi varmı yok mu ona bakıyoruz eğerki varsa userid ile tokenı eşliyoruz ve işleme devam etmesini sağlıyor
                res.status(200).json({
                    succeded:true,
                    user
                }) // Eğerki yukarıda kullanıcı eşlenmesi oldu ise bu kullanıcıyı localde tanımlıyoruz ve cevap olarak atıyoruz.
                next();
            }
        });
    } else { // Yularıda en basşında token yok ise cevap olarak null atayıp yolluyoruz 
        res.locals.user = null;
        next();
    }
}


const CreateToken = (userId) => { // userid yi kullanarak jwt token oluşturma
    return jwt.sign({ userId }, process.env.JWT_SECRET, { // ilk veri kullanıcıya hangi verisine göre token verileceği, ikinci veri ise jwt yi gönderen kişinin kimliğini doğrulamak ve güvenliği sağlamak için
        expiresIn: "1d" // 1 gün geçerlilik süresi ardından token süresi dolar
    })
}


export { CreateUser, CreateToken, LoginUser, GetAllUser, UserMe } // Bu şekilde export etme sebebimiz bu js dosyasında birden fazla fonksiyonu dışarı atayacağımız için.