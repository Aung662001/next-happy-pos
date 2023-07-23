import MenuBookIcon from "@mui/icons-material/MenuBook";
import HistoryIcon from "@mui/icons-material/History";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import DevicesIcon from "@mui/icons-material/Devices";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import React from "react";
import { motion } from "framer-motion";

const LandingIcons = () => {
  const style = {
    fontSize: "90px",
  };
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  const contents = [
    {
      _id: 1,
      icon: <MenuBookIcon sx={style} />,
      text: "Can Show All Menus And Details To Customer Easily",
    },
    {
      _id: 2,
      icon: <HistoryIcon sx={style} />,
      text: "You Can View Sale History And Caculate All Details",
    },
    {
      _id: 3,
      icon: <AddLocationAltIcon sx={style} />,
      text: "You Can Mange All Shops From One Location",
    },
    {
      _id: 4,
      icon: <DevicesIcon sx={style} />,
      text: "You Can Easily Manage From Phone Or PC",
    },
    {
      _id: 5,
      icon: <HourglassTopIcon sx={style} />,
      text: "Save Time With One App",
    },
  ];
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      style={{
        marginTop: "3rem",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {contents.map((content) => {
        return (
          <motion.div
            variants={item}
            key={content._id}
            style={{ width: "400px", textAlign: "center", marginTop: "1rem" }}
          >
            <span style={{ color: "green" }}>{content.icon}</span>
            <p>{content.text}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default LandingIcons;
