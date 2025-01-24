import passport from "passport";
import bcrypt from "bcryptjs";
import { GraphQLLocalStrategy } from "graphql-passport";

import User from "../models/user.model.js";

export const configurePassport = async () => {
  // It stores minimal information (like user ID) in the session after authentication.
  passport.serializeUser((user, done) => {
    console.log("Serializing user", user);
    // the first arugement is error & second is the data we want to send.
    done(null, user.id);
  });
  // It retrieves the full user object from your data store
  // based on the information in the session (usually the user ID).
  passport.deserializeUser(async (id, done) => {
    console.log("Deserializing user");
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      // Adjust this callback to your needs
      try {
        const user = await User.findOne({ username });
        if (!user) throw new Error("Invaild username or password.");
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error("Invaild username or password.");
        return done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );
};
