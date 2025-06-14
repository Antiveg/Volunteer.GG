import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      status?: string; // if applicable
      img_url?: string;
      usable_points: number;
      organization_id: number | null
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    status?: string;
    img_url?: string;
    usable_points: number;
    organization_id: number | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    status?: string;
    img_url?: string;
    usable_points: number;
    organization_id: number | null
  }
}