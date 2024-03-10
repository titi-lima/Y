import nextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      nickName: string;
      name: string;
      description: string;
    };
  }
}
