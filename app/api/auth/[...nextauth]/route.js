import NextAuth from "next-auth/next";

import GoogleProvier from "next-auth/providers/google";
import { connectToDb } from "@utils/database";

import User from "@models/users";

console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

const handler = NextAuth({
  providers: [
    GoogleProvier({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {
    const sessionUser = await User.findOne({
      email: session.user.email,
    });
    session.user.id = sessionUser._id.toString();
    return session;
  },
  async signIn({ profile }) {
    try {
      await connectToDb();
      //check if user already exists?
      const userExists = await User.findOne({ email: profile.email });

      //if not create a new user
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }

      return true;
    } catch (error) {
      console.log("error while sighing in", error);
      return false;
    }
  },
});
export { handler as GET, handler as POST };