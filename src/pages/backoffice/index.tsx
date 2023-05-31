import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function App() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/backoffice/orders");
    } else {
      router.push("/auth/signin");
    }
  }, [session]);
  return null;
}

export default App;
