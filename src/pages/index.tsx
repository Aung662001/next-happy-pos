import React, { useEffect } from "react";
import { useRouter } from "next/router";

function App() {
  const router = useRouter();
  useEffect(() => {
    router.push("./auth/signin");
  });
  return <div>Landing Page</div>;
}

export default App;
