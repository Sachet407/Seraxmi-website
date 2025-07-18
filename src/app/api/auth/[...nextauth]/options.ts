import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
interface AuthUser {
  id: string;
  role: string;
  email: string;
  username: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<string, string> | undefined
      ): Promise<AuthUser | null> {
        await dbConnect();
        if (!credentials) {
          throw new Error("No credentials provided");
        }
        try {
          const user = await UserModel.findOne(
            {
              $or: [
                { email: credentials.identifier },
                { username: credentials.identifier },
              ],
            },
            "email username password role"
          ).lean<{ _id: string; email: string; username: string; password: string; role: string }>();
          console.log(user);

          if (!user) {
            throw new Error("No user found with this email");
          }
          console.log("compairing:", credentials.password, user.password);
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password.trim(),
            user.password
          );
          if (isPasswordCorrect) {
            return {
              id: user._id.toString(),
              role: user.role,
              email: user.email,
              username: user.username,
            };
          }

          throw new Error("Incorrect password");
        } catch (err: unknown) {
          if (err instanceof Error) {
            throw new Error(err.message);
          }
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.role = token.role;
        session.user.username = token.username;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};
