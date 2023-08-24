import express from 'express';
import * as userController from '../controller/userController.js'; // Bu durum userController içindeki verileri kullanıcam anlamındadır.
import * as authMiddleware from '../middlewares/authMiddleWare.js';


const router = express.Router(); // Router işlemi yapılması için kısaca router değişkenine atadık.

router.route('/Register').post(userController.CreateUser); // Eğerki bir yerden /Register endpointi ile bir post isteği gelirse userControllerda yazmış olduğumuz createUser fonksiyonuna yönlendiriyoruz. 
router.route('/Login').post(userController.LoginUser);// Eğerki bir yerden /Login endpointi ile bir post isteği gelirse userControllerda yazmış olduğumuz LoginUser fonksiyonuna yönlendiriyoruz. 
router.route('/GetAllUser').get(userController.GetAllUser);
router.route('/UserMe')
    .get(authMiddleware.AuthenticateToken, userController.UserMe);

router.route('/Contact').post(userController.SendMail);

export default router;