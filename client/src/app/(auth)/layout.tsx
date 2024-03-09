import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/');
  }

  return <>{children}</>
}