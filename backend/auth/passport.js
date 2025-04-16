const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const AppleStrategy = require("passport-apple");
const User = require("../models/User");

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));

// Facebook
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/auth/facebook/callback",
  profileFields: ["id", "emails", "name", "picture.type(large)"]
}, async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails?.[0].value;
  const existingUser = await User.findOne({ providerId: profile.id });
  if (existingUser) return done(null, existingUser);
  const newUser = await User.create({
    provider: "facebook",
    providerId: profile.id,
    email,
    name: `${profile.name.givenName} ${profile.name.familyName}`,
    picture: profile.photos[0].value,
  });
  done(null, newUser);
}));

// Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (token, tokenSecret, profile, done) => {
  const existingUser = await User.findOne({ providerId: profile.id });
  if (existingUser) return done(null, existingUser);
  const newUser = await User.create({
    provider: "google",
    providerId: profile.id,
    email: profile.emails[0].value,
    name: profile.displayName,
    picture: profile.photos[0].value,
  });
  done(null, newUser);
}));

// Apple
passport.use(new AppleStrategy({
  clientID: process.env.APPLE_CLIENT_ID,
  teamID: process.env.APPLE_TEAM_ID,
  keyID: process.env.APPLE_KEY_ID,
  privateKey: process.env.APPLE_PRIVATE_KEY,
  callbackURL: "/auth/apple/callback"
}, async (accessToken, refreshToken, idToken, profile, done) => {
  const email = idToken.email || profile.email;
  const existingUser = await User.findOne({ providerId: idToken.sub });
  if (existingUser) return done(null, existingUser);
  const newUser = await User.create({
    provider: "apple",
    providerId: idToken.sub,
    email,
    name: profile.name,
  });
  done(null, newUser);
}));
