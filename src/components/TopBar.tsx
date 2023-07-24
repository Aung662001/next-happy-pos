import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import SetMealIcon from "@mui/icons-material/SetMeal";
import EggIcon from "@mui/icons-material/Egg";
import SettingsIcon from "@mui/icons-material/Settings";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import { useState, useEffect, useContext } from "react";
import { signOut, signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAppSelector } from "@/store/hook";
import { AppData } from "@/store/slices/appSlice";
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
    label: "MenuCategories",
    icon: <DinnerDiningIcon />,
    route: "/backoffice/menu-categories",
  },
  {
    id: 3,
    label: "Menu",
    icon: <SetMealIcon />,
    route: "/backoffice/menus",
  },
  {
    id: 4,
    label: "AddonCategories",
    icon: <FastfoodIcon />,
    route: "/backoffice/addon-categories",
  },
  {
    id: 5,
    label: "Addon",
    icon: <EggIcon />,
    route: "/backoffice/addons",
  },
  {
    id: 6,
    label: "Locations",
    icon: <EditLocationAltIcon />,
    route: "/backoffice/locations",
  },
  {
    id: 7,
    label: "Tables",
    icon: <TableRestaurantIcon />,
    route: "/backoffice/tables",
  },
  {
    id: 8,
    label: "Setting",
    icon: <SettingsIcon />,
    route: "/backoffice/setting",
  },
];
const NavBar = (props: NavProps) => {
  const { Locations } = useAppSelector(AppData);
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
            backgroundColor: "#208469",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Image
            src="https://msquarefdc.sgp1.digitaloceanspaces.com/happy-pos/wma/Fri%20Jun%2016%202023%2009%3A58%3A57%20GMT%2B0630%20%28Myanmar%20Time%29Screenshot%202023-06-16%20094700.png"
            alt="logo"
            width="150"
            height={80}
            style={{ marginLeft: "-25px" }}
          />
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
