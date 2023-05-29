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
  title?: string;
}
const NavBar = (props: NavProps) => {
  const [accState, setAccState] = useState({
    LoginLogout: "Sign In",
    Orders: "",
    Locations: "",
    Menu: "",
    MenuCategories: " ",
    Addon: "",
    AddonCategories: " ",
    Setting: "",
  });
  const { Locations } = useContext(BackofficeContext);
  const { data: session } = useSession();
  const [locationId, setLocationId] = useLocalStorage("locationId");
  const router = useRouter();
  function loginHandler() {
    signIn("google", { callbackUrl: "/backoffice/orders" });
  }
  useEffect(() => {
    if (session) {
      setAccState({
        LoginLogout: "Sign Out",
        Orders: "Orders",
        Locations: "Locations",
        Menu: "Menu",
        MenuCategories: "Menu Categories",
        Addon: "Addon",
        AddonCategories: "Addon Categories",
        Setting: "Setting",
      });
    }
  }, [session]);
  const navItems = [
    {
      id: 1,
      label: accState.Orders,
      icon: <DinnerDiningIcon />,
      route: "/backoffice/orders",
    },

    {
      id: 2,
      label: accState.Menu,
      icon: <DinnerDiningIcon />,
      route: "/backoffice/menus",
    },
    {
      id: 3,
      label: accState.MenuCategories,
      icon: <SetMealIcon />,
      route: "/backoffice/menu-categories",
    },
    {
      id: 4,
      label: accState.Addon,
      icon: <FastfoodIcon />,
      route: "/backoffice/addons",
    },
    {
      id: 5,
      label: accState.AddonCategories,
      icon: <EggIcon />,
      route: "/backoffice/addon-categories",
    },
    {
      id: 6,
      label: accState.Locations,
      icon: <EditLocationAltIcon />,
      route: "/backoffice/locations",
    },
    {
      id: 7,
      label: accState.Setting,
      icon: <SettingsIcon />,
      route: "/backoffice/setting",
    },
  ];

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

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      position="sticky"
    >
      <List>
        {navItems.slice(0, navItems.length - 1).map((item) => (
          <Link
            href={item.route}
            key={item.id}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>

                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {navItems.slice(-1).map((item) => (
          <Link
            href={item.route}
            style={{ textDecoration: "none", color: "#000" }}
            key={item.id}
          >
            <ListItem key={item.id} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
  let navTitle =
    typeof window !== "undefined"
      ? navItems.find((item) => item.route === window.location.pathname)?.label
      : "";
  return (
    <Box sx={{ flexGrow: 1, position: "sticky", top: 2 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {" "}
            <IconButton
              onClick={() => setOpen((prev) => !prev)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              {
                Locations.find(
                  (location) => location.id === parseInt(locationId as string)
                )?.name
              }
            </Typography>
          </Box>
          <Typography variant="h6" component="div">
            {navTitle}
            <ListItemText primary={props.title ? props.title : ""} />
          </Typography>
          <Button
            color="inherit"
            onClick={session ? logoutHandler : loginHandler}
          >
            {accState.LoginLogout}
          </Button>
        </Toolbar>
      </AppBar>
      <div>
        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </div>
    </Box>
  );
};

export default NavBar;
