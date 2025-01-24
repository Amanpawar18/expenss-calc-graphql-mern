import { users } from "../dummyData/data.js";
import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const userResolver = {
  Mutation: {
    // Context holds the data we passed in context in server.js
    signUp: async (_, { input }, context) => {
      try {
        const { username, password, gender, name } = input;
        if (!username || !password || !gender || !name)
          throw new Error("All fields are required.");

        const existingUser = await User.findOne({ username });

        if (existingUser) throw new Error("User already exists.");

        const hashedPassword = await bcrypt.hash(password, 10);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          name,
          gender,
          password: hashedPassword,
          profilePic: gender == "male" ? boyProfilePic : girlProfilePic,
        });
        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (err) {
        console.error("Error in signUp: ", err);
        throw new Error(err.message || "Internal server error");
        return;
      }
    },
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });
        await context.login(user);
        return user;
      } catch (err) {
        console.error("Error in login: ", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    logout: async (_, { input }, context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          if (err) throw err;
        });
        context.res.clearCookie("connect.sid");
        return { message: "Logged out successfully." };
      } catch (err) {
        console.error("Error in logout: ", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
  Query: {
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (err) {
        console.error("Error in logout: ", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    user: async (_, { userId }) => {
      try {
        return await User.findById(userId);
      } catch (err) {
        console.error("Error in logout: ", err);
        throw new Error(err.message || "Error getting user");
      }
    },
  },
  User: {
    transactions: async (parent) => {
      try {
        console.log(parent)
        const transactions = await Transaction.find({ userId: parent._id });
        return transactions
      } catch (error) {
        console.log("Error user.transaction resolver", error);
      }
    },
  },
};
