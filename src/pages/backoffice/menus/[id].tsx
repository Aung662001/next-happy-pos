import React from "react";
import { useRouter } from "next/router";

function App() {
  const router = useRouter();
  const id = router.query.id;
  console.log(id);
  return <div className="App"></div>;
}

export default App;
