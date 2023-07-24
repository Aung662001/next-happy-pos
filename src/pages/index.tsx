import React, { useEffect } from "react";
import { useRouter } from "next/router";
import LandingCenterText from "@/components/LandingCenterText";
import LandingIcons from "@/components/LandingIcons";
import LandingHeader from "@/components/LandingHeader";
import LandingFooter from "@/components/LandingFooter";
import { motion } from "framer-motion";

function App() {
  const router = useRouter();
  useEffect(() => {
    // router.push("./orders");
  });

  return (
    <motion.div
      whileInView={{ y: [30, 20, 10, 0], opacity: [0, 1] }}
      transition={{ duration: 0.2 }}
      style={{ overflow: "hidden", height: "100vh" }}
    >
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
      <LandingFooter />
    </motion.div>
  );
}

export default App;
