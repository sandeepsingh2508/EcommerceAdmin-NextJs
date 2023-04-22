import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";
export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className={"bg-blue-900 w-screen h-screen flex items-center "}>
        <div className={"text-center w-full"}>
          <button
            onClick={() => signIn("google")}
            className={"bg-white rounded-lg p-2 px-4 "}
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen bg-blue-900 ">
      <Nav />
      <div className="flex-grow p-4 mt-3 mb-2 mr-2 bg-white rounded-lg">
        {children}
      </div>
    </div>
  );
}
