import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';


const CheckUser = async (req, res, next) => {// Bu fonksiyonda get isteği geldiği herhangi bir sayfada token varmı yokmu eğerki varsa isteğin cevabını veriğimiz yer.
    const token = req.cookies.jwt; // Eğerki kullanıcı giriş yaptıysa ona verilmiş olan token cookie de gömülüdür burda kontrolümüzü sağlamak için ordan alıp token değişkenine atadık.
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => { // Coocieden gelen token bizim üretmiş olduğumuz bir token olup olmadığını çözümlüyoruz eğerki evetse işlemlerine devam ediyor.
            if (err) {
                res.status(401).json({
                    succeeded:false,
                    err:"You are not authorized to access the page"
                })
                res.locals.user = null; // Error veriyorsa eğer böyle bir kullanıcı yok demektir ve bu durumda null atarız.
                next(); // Sonraki işleme geçmesini sağlar.
            } else {
                const user = await User.findById(decodedToken.userId);// DB de bulunan kayıtlı kişi varmı yok mu ona bakıyoruz eğerki varsa userid ile tokenı eşliyoruz ve işleme devam etmesini sağlıyor
                res.locals.user = user; // Eğerki yukarıda kullanıcı eşlenmesi oldu ise bu kullanıcıyı localde tanımlıyoruz ve cevap olarak atıyoruz.
                next();
            }
        });
    } else { // Yularıda en basşında token yok ise cevap olarak null atayıp yolluyoruz 
        res.locals.user = null;
        next();
    }
};



const AuthenticateToken = async (req, res, next) => { // Bu fonksiyon kullanıcı kısıtlaması için token kotnrol etme ve eğerki yoksa giriş yapması için yönlendirme yapıyoruz.
    try {
        const token = req.cookies.jwt;// Eğerki kullanıcı giriş yaptıysa ona verilmiş olan token cookie de gömülüdür burda kontrolümüzü sağlamak için ordan alıp token değişkenine atadık.
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err) => { // tokenı ve güvenlik kodlarımızı yazıktan sonra eğerki hata durumu oluşursa yani token olmadan yetkisiz sayfaya erişim durumunda mesaj veriyoruz.
                if (err) {
                    res.status(401).json({
                        succeeded: false,
                        err:"You are not authorized to access the page"
                    })
                    res.redirect('/'); // Login sayfasına yönlendirme
                } else {
                    next(); // eğerki tokenı varsa sonraki aşamaya yani sayfaya erişim sağlayabilir.
                }
            });
        } else {
            res.redirect('/') // Token olmaması durumunda yönlendirilen sayfa
        }
    } catch (error) { // Catche ye düştüyse eğer yetkisi olmadığını yani token sahibi olmadığını anlıyoruz ve hata mesajı veriyoruz
        res.status(401).json({
            succeeded: false,
            error: 'You are not authorized to access the page',
        });
    }
}

export { CheckUser, AuthenticateToken }