import express from 'express';
import authController from '../../controllers/authController.js';
import OAuthController from '../../controllers/OAuthController.js';
import authToken from '../../middlewares/authmiddleware.js';
const authRouter = express.Router();

authRouter.post('/register', authController.CustomerRegisterController);
authRouter.post('/login', authController.LoginController);
authRouter.post('/verify', authController.VerifyController);
authRouter.post('/resend-code', authController.ResendCodeController);
authRouter.post('/logout', authController.LogoutController);
authRouter.get('/me', authToken, authController.getMe);
authRouter.get('/google', OAuthController.googleRegister);
authRouter.get('/google/callback', OAuthController.googleCallback);
authRouter.post('/facebook', OAuthController.FacebookRegister);
export default authRouter;