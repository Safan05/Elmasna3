import userQueries from "../models/userQueries.js";
import bcrypt from "bcrypt";
import signToken from "../utils/jwtAuthToken.js";
import { sendMail } from "../utils/mailer.js";
import { verificationEmail } from "../utils/emailTemplates.js";

function generateSixDigitCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const CustomerRegisterController = async (req, res) => {
    try {
        console.log("Registering user...");
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ message: "Email, password, and name are required" });
        }
        const exists = await userQueries.checkEmailExists(email);
        if (exists) {
            return res.status(409).json({ message: "Email already in use" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userUuid = await userQueries.registerUser(email, hashedPassword, name);

        const code = generateSixDigitCode();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        await userQueries.setVerificationCode(email, code, expiresAt);

                (async () => {
                    try {
                        const { subject, text, html } = verificationEmail({
                          appName: 'Elmasnaa',
                          code,
                          supportEmail: 'support@elmasnaa.com',
                          frontendUrl: process.env.FRONTEND_URL
                        });
                        await sendMail({ to: email, subject, text, html });
                    } catch (mailErr) {
                        console.error("Failed to send verification email:", mailErr.message);
                    }
                })();

        return res.status(201).json({ message: "User registered. Verification code sent to email.", uuid: userUuid });
    } catch (err) {
        console.error("Error registering user:", err.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const ResendCodeController = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });
        const user = await userQueries.getUserByEmail(email);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.role !== 'none') return res.status(400).json({ message: "User already verified" });
        const code = generateSixDigitCode();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await userQueries.setVerificationCode(email, code, expiresAt);
                (async () => {
                    try {
                        const { subject, text, html } = verificationEmail({
                          appName: 'Elmasna3',
                          code,
                          supportEmail: 'support@elmasna3.com',
                          frontendUrl: process.env.FRONTEND_URL
                        });
                        await sendMail({ to: email, subject, text, html });
                    } catch (mailErr) {
                        console.error("Failed to resend verification email:", mailErr.message);
                    }
                })();
        return res.status(200).json({ message: "Verification code resent" });
    } catch (err) {
        console.error("Error resending code:", err.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const VerifyController = async (req, res) => {
    try {
        const { email, code } = req.body;
        if (!email || !code) return res.status(400).json({ message: "Email and code are required" });
        const result = await userQueries.verifyCodeAndPromote(email, code);
        if (!result) return res.status(400).json({ message: "Invalid or expired code" });
        return res.status(200).json({ message: "Email verified. Role updated to customer" });
    } catch (err) {
        console.error("Error verifying code:", err.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const LoginController = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    userQueries.getUserByEmail(email)
        .then(async (user) => {
            if (!user) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
            const token = signToken(user.uuid, user.role, user.email);
            res.cookie("auth_token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });
            res.status(200).json({ message: "Login successful", token });
        })
        .catch((err) => {
            console.error("Error during login:", err.message);
            res.status(500).json({ message: "Internal server error" });
        });
};
export const getMe = (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.status(200).json({ 
    uuid:user._id,
    email:user._email,
    role:user._role
   });
};

export default { CustomerRegisterController, LoginController, VerifyController, ResendCodeController, getMe };