import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

import GoogleProvider from "next-auth/providers/google";
// import dbConnect from "@/library/mongoDb";
import clientPromise from "../../../lib/mongoDb";



export default NextAuth({
 
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
 
});
