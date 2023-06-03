import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import SetMealIcon from "@mui/icons-material/SetMeal";
import EggIcon from "@mui/icons-material/Egg";
import SettingsIcon from "@mui/icons-material/Settings";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import { useState, useEffect, useContext } from "react";
import { signOut, signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { BackofficeContext } from "../contexts/BackofficeContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useRouter } from "next/router";
import Link from "next/link";
interface NavProps {
  label?: string;
}
export const sidebarMenuItems = [
  {
    id: 1,
    label: "Orders",
    icon: <DinnerDiningIcon />,
    route: "/backoffice/orders",
  },

  {
    id: 2,
    label: "Menu",
    icon: <DinnerDiningIcon />,
    route: "/backoffice/menus",
  },
  {
    id: 3,
    label: "MenuCategories",
    icon: <SetMealIcon />,
    route: "/backoffice/menu-categories",
  },
  {
    id: 4,
    label: "Addon",
    icon: <FastfoodIcon />,
    route: "/backoffice/addons",
  },
  {
    id: 5,
    label: "AddonCategories",
    icon: <EggIcon />,
    route: "/backoffice/addon-categories",
  },
  {
    id: 6,
    label: "Locations",
    icon: <EditLocationAltIcon />,
    route: "/backoffice/locations",
  },
  {
    id: 7,
    label: "Setting",
    icon: <SettingsIcon />,
    route: "/backoffice/setting",
  },
];
const NavBar = (props: NavProps) => {
  const { Locations } = useContext(BackofficeContext);
  const { data: session } = useSession();
  const [locationId, setLocationId] = useLocalStorage("locationId");
  const router = useRouter();
  function loginHandler() {
    signIn("google", { callbackUrl: "/backoffice/orders" });
  }

  const [open, setOpen] = useState<boolean>(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };
  function logoutHandler() {
    // setToken("");
    signOut();
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            backgroundColor: "#1B9C85",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <h1>Logo</h1>
          <h2>{props.label}</h2>
          <Button
            color="inherit"
            onClick={session ? logoutHandler : loginHandler}
            // sx={{ width: "100%" }}
          >
            {session ? "LogOut" : "LogIn"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
