import { OrganizationMember, User } from "@/db/models";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
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

        const orgMember = await OrganizationMember.findOne({
          where: { user_id: user.get('id') }
        });

        const userPlain = user.get({ plain: true })
        userPlain.organization_id = orgMember ? orgMember.get('organization_id') : null;
        return userPlain
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
    async session({ session, token } : any) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.status = token.status;
        session.user.img_url = token.img_url
        session.user.usable_points = token.usable_points;
        session.user.organization_id = token.organization_id ?? null;
      }
      return session;
    },
    async jwt({ token, user } : any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.status = user.status;
        token.img_url = user.img_url;
        token.usable_points = user.usable_points;
        token.organization_id = user.organization_id ?? null
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}