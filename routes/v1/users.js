import express from "express";
import authToken from "../../middlewares/authmiddleware.js";
import userController from "../../controllers/userController.js";
import { upload } from "../../utils/cloudinary.js";
const usersRouter = express.Router();

usersRouter.post('/add-photo', authToken, upload.single("photo"), userController.uploadPhoto);
usersRouter.put('/update-password', authToken, userController.ChangePassword);
usersRouter.put('/update-profile', authToken, userController.UpdateProfile);
//usersRouter.get('/profile', authToken, userController.GetProfile);

export default usersRouter;