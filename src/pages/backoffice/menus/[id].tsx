import React from "react";
import EditMenus from "@/components/EditMenus";
import { useRouter } from "next/router";

function App() {
  const router = useRouter();
  const id = router.query.id;
  console.log(id);
  return (
    <div className="App">
      <EditMenus />
    </div>
  );
}

export default App;
