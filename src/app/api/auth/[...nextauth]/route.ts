import { User } from "@/db/models";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { UserAttributes } from "@/types";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const user = await User.findOne({
          attributes: {
            exclude: ['createdAt','updatedAt'],
          },
          where: {
            email: email
          }
        })

        if (!user || !(await bcrypt.compare(password, user.get('password') as string))) {
          return null
        }

        return user.get({ plain: true })
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin"
  },
  session: {
    maxAge: 1 * 60 * 60,
    updateAge: 1 * 60 * 60,
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.status = token.status;
        session.user.img_url = token.img_url
        session.user.usable_points = token.usable_points;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.status = user.status;
        token.img_url = user.img_url;
        token.usable_points = user.usable_points;
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
