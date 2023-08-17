import express from 'express';
import * as userController from '../controller/userController'; // Bu durum userController içindeki verileri kullanıcam anlamındadır.
import * as authMiddleWare from '../middlewares/authMiddleWare';

const router = express.Router(); // Router işlemi yapılması için kısaca router değişkenine atadık.

router.route('/Register').post(userController.CreateUser); // Eğerki bir yerden /Register endpointi ile bir post isteği gelirse userControllerda yazmış olduğumuz createUser fonksiyonuna yönlendiriyoruz. 
router.route('/Login').post(userController.LoginUser);// Eğerki bir yerden /Login endpointi ile bir post isteği gelirse userControllerda yazmış olduğumuz LoginUser fonksiyonuna yönlendiriyoruz. 
router.route('/Dashboard')
.get(authMiddleWare.AuthenticationToken , userController.GetDashboardPage); // Eğerki bir kullanıcı Dashboard sayfasına erişmek istiyorsa controllerda bulunan getDashboardPage yönlendirmesini yapmadan önce token var mı yokmu kontrol ediyoruz ve eğerki var ise yönlendirmeyi yaparak sayfaya erişmesine izin veriyoruz.

export default router;