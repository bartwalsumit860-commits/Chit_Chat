import express from 'express';
import { getOtherUsers, login, logout, register_user, updateProfile } from '../controllers/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { singleUpload } from '../middleware/multer.js';

const router = express.Router();


router.route("/register").post(singleUpload,register_user);
router.route("/login").post(login);
router.route("/update").post(isAuthenticated,singleUpload,updateProfile);
router.route("/logout").get(logout);
router.route("/getOtherUsers").get(isAuthenticated,getOtherUsers)

export default router;