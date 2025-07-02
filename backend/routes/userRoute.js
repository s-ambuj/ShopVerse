import express from 'express';
import { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile, changePassword, uploadProfileImage } from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import userModel from '../models/userModel.js';
const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.get("/profile", auth, getUserProfile);
userRouter.put("/profile", auth, updateUserProfile);
userRouter.put("/profile/password", auth, changePassword);
userRouter.put("/profile/image", auth, upload.single("profileImage"), uploadProfileImage);

export default userRouter;