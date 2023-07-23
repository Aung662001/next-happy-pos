import React from "react";

const LandingFooter = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "200px",
        backgroundImage: "url(wave1.svg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPositionY: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <address style={{ display: "flex", flexDirection: "row" }}>
        Yangon,Kamar Yuut &nbsp;&nbsp;&nbsp;
        <span>
          <b>Ph:</b>09753912127
        </span>
        &nbsp;&nbsp;&nbsp;
        <span>
          <b>Email:</b>setannatsoegodzzz@gmal.com
        </span>
      </address>
    </div>
  );
};

export default LandingFooter;
