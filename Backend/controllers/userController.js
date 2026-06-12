import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register_user = async (req, res) => {
    try {
        const { fullName, userName, password, gender } = req.body;
        const file = req.file;

        //validate the entries   
        if (!fullName || !userName || !password || !gender) {
            return res.status(400).json({
                message: "Some fields are missing",
                success: false
            })
        }

        //validate the user
        let user = await User.findOne({ userName });

        if (user) {
            return res.status(400).json({
                message: "User already existed with this User Name",
                success: false
            })
        }
        let cloudResponse;
        if (file) {

            const fileUri = getDataUri(file);

            cloudResponse = await cloudinary.uploader.upload(
                fileUri.content,
                {
                    resource_type: "image"
                }
            );

            if (!cloudResponse || !cloudResponse.secure_url) {
                return res.status(500).json({
                    message: "Profile photo upload failed",
                    success: false
                });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePhoto: cloudResponse?.secure_url || ""


        });

        return res.status(201).json({
            message: "User successfully created",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}


export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({
                message: "Some fields are missing",
                success: false
            });
        }

        let user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({
                message: "incorrect user name or password",
                success: true
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "incorrect user name or password",
                success: false
            });
        }

        //token genration
        const tokenData = {
            userId: user._id
        };

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        //return the user

        user = {
            _id: user._id,   // ✅ ADD THIS
            fullName: user.fullName,
            userName: user.userName,
            profilePhoto: user.profilePhoto,
            gender: user.gender
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome Back ${user.fullName}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }

}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { fullName, gender } = req.body;
        const file = req.file;

        let user = await User.findById(userId);
        //cloudinary
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        if (fullName) {
            user.fullName = fullName;
        }
        if (gender) {
            user.gender = gender;
        }


        let cloudResponse;
        if (file) {

            const fileUri = getDataUri(file);

            cloudResponse = await cloudinary.uploader.upload(
                fileUri.content,
                {
                    resource_type: "image"
                }
            );

            if (!cloudResponse || !cloudResponse.secure_url) {
                return res.status(500).json({
                    message: "Profile photo upload failed",
                    success: false
                });
            }
        }


        await user.save();

        const updatedUser = {
            fullName: user.fullName,
            gender: user.gender,
            profilePhoto: cloudResponse?.secure_url || ""
        }

        await user.save();

        return res.status(200).json({
            message: "Profile Updated Successfully",
            success: true
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Something went wrong",
            updatedUser,
            success: false
        })
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout successsfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}

export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUser = req.id;

        const OtherUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

        return res.status(200).json({
            OtherUsers,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}