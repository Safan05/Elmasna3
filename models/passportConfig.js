import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userQueries from "../models/userQueries.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Look for existing user
        let user = await userQueries.findByProviderId("google", profile.id);

        if (!user) {
          const email = profile.emails?.[0]?.value;
          const name = profile.displayName;
          console.log("Creating new OAuth user:", profile);
          user = await userQueries.createOAuthUser(email, name, "google", profile.id);
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Needed if you use sessions
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await userQueries.findById(id);
  done(null, user);
});

export default passport;
