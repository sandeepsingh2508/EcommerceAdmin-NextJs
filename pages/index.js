import Layout from "@/components/Layout";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="flex justify-between text-blue-900">
        <h1>hello, {session?.user?.name}</h1>
        <div className="flex gap-1 overflow-hidden text-black bg-gray-300 rounded-lg">
          <img src={session?.user?.image} alt="" className="w-9 h-9 " />
          <span className="p-1">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
