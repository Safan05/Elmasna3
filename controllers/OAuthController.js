import userQueries from "../models/userQueries.js";
import bcrypt from "bcrypt";
import signToken from "../utils/jwtAuthToken.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const googleRegister = async (req,res,nxt) => {
    console.log("Initiating Google OAuth");
    return passport.authenticate('google',{scope: ['profile','email']})(req,res,nxt);
}
const googleCallback = (req, res, next) => {
  passport.authenticate("google", { failureRedirect: "/login" }, (err, user) => {
    if (err || !user) {
      return res.redirect("/login");
    }

    console.log("OAuth user:", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = signToken(user.uuid, user.role, user.email, user.name);
    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
    res.redirect("http://localhost:3000"); // frontend URL
  })(req, res, next);
};
const FacebookRegister = async (req,res)=>{

}
export default { googleRegister, FacebookRegister, googleCallback };