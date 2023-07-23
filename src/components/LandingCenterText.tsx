import { Button } from "@mui/material";
import React from "react";

const LandingCenterText = () => {
  return (
    <section
      style={{
        width: "60%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.5)",
      }}
    >
      <p style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center" }}>
        Streamline Your Food Shop Operations with Our Cutting-Edge Management
        Software! .Boost Productivity, Increase Sales, and Delight Customers
        with Our Food Shop Management Software.Say Goodbye to Hassles: Embrace
        the Future of Food Shop Management with Our Software.
      </p>
      <div style={{ display: "flex", gap: 5 }}>
        <Button variant="contained" sx={{ bgcolor: "gray" }}>
          Order App
        </Button>
        <Button variant="contained" sx={{ bgcolor: "gray" }}>
          Backoffice Manage
        </Button>
      </div>
    </section>
  );
};

export default LandingCenterText;
