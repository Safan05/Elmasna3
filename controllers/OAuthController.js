import userQueries from "../models/userQueries.js";
import bcrypt from "bcrypt";
import signToken from "../utils/jwtAuthToken.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const googleRegister = async (req,res) => {
    passport.authenticate('google',{scope: ['profile','email']});
}
const googleCallback = async (req,res)=>{
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/v1/auth/google/callback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userQueries.findByProviderId('google', profile.id);
            if (!user) {
                const email = profile.emails[0].value;
                const name = profile.displayName;
                user = await userQueries.createOAuthUser(email, name, 'google', profile.id);
            }
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }));
}
const FacebookRegister = async (req,res)=>{

}
export default { googleRegister, FacebookRegister, googleCallback };