import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <div>
      <h1>{session?.user.nickName}</h1>
    </div>
  )
}