import { motion } from "framer-motion";
import React from "react";

const LandingHeader = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        backgroundImage: "url(wave.svg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        transform: "rotate(180deg)",
      }}
    >
      <motion.div
        whileInView={{ x: [70, 0], rotate: [180] }}
        transition={{ duration: 0.5 }}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          position: "relative",
        }}
      >
        <img
          src="cookDadAndSon.png"
          alt="dad and son cooking"
          width={"400px"}
        ></img>
        <h1 style={{ textAlign: "center", width: "100%", fontSize: "4rem" }}>
          Wellcome!
        </h1>
        <img src="panda-cooking.png" alt="panda cooking"></img>
      </motion.div>
    </div>
  );
};

export default LandingHeader;
