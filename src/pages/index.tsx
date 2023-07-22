import React, { useEffect } from "react";
import { useRouter } from "next/router";
import LandingCenterText from "@/components/LandingCenterText";
import LandingIcons from "@/components/LandingIcons";
import LandingHeader from "@/components/LandingHeader";

function App() {
  const router = useRouter();
  useEffect(() => {
    // router.push("./orders");
  });
  return (
    <div>
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <LandingHeader />
      </div>
      <div style={{ position: "absolute", top: "30%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            msWrapFlow: "auto",
          }}
        >
          <LandingCenterText />
        </div>
      </div>
      <LandingIcons />
    </div>
  );
}

export default App;
