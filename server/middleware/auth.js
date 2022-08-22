import passport from "passport";
import passportJWT from "passport-jwt";
import User from "../models/userModel.js";

passport.use(
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TODO_SECRET_KEY,
    },
    function (payload, done) {
      return User.findById(payload.id)
        .then((user) => {
          return done(null, user);
        })
        .catch((error) => {
          return done(error);
        });
    }
  )
);
