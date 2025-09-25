import userQueries from "../models/userQueries.js";
import bcrypt from "bcrypt";
import signToken from "../utils/jwtAuthToken.js";

const ChangePassword = async (req, res) => {
    const { currentPassword, newPassword, email } = req.body;
    if (!currentPassword || !newPassword || !email) {
        return res.status(400).json({ message: "Current and new passwords are required" });
    }
    try {
        const user = await userQueries.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (passwordMatch) {
            await userQueries.changeUserPassword(email, newPassword);
            const token = signToken(user.uuid, user.role, user.email, user.name);
            res.cookie("auth-token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "None",
            });
            return res.status(200).json(
                {
                    message: "Password changed successfully",
                    uuid: user.uuid,
                    email: user.email,
                    role: user.role,
                    name: user.name
                }
            );
        }

    }
    catch(err){
        console.error("Error changing password:", err.message);
        return res.status(500).json({ message: "Error changing password" });
    }
};

const UpdateProfile = async (req, res) => {
    const {email,name} = req.body;
    if (!email || !name) {
        return res.status(400).json({ message: "Email and name are required" });
    }
    try {
        const user = await userQueries.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await userQueries.updateProfile(email, name);
        const token = signToken(user.uuid, user.role, email, name);
        res.cookie("auth-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
        });
        return res.status(200).json(
            {
                message: "Profile updated successfully",
                uuid: user.uuid,
                email: email,
                role: user.role,
                name: name
            }
        );
    }
    catch(err){
        console.error("Error updating profile:", err.message);
        return res.status(500).json({ message: "Error updating profile" });
    }
}

const uploadPhoto = async (req, res) => {
try {
    console.log(req.file); // multer adds file info
    res.json({
      message: "Upload successful",
      url: req.file.path, // Cloudinary URL
      public_id: req.file.filename, // public ID in Cloudinary
    });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
}

export default { ChangePassword, UpdateProfile, uploadPhoto };