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
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AppContext } from "../contexts/AppContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useRouter } from "next/router";
import Link from "next/link";
const NavBar = () => {
  const { Locations } = useContext(AppContext);
  const [token, setToken] = useLocalStorage("accessToken");
  const [locationId, setLocationId] = useLocalStorage("locationId");
  const router = useRouter();
  function loginHandler() {
    router.push(`/login`);
  }
  const navItems = [
    { id: 1, label: "Orders", icon: <DinnerDiningIcon />, route: "/orders" },

    { id: 2, label: "Menu", icon: <DinnerDiningIcon />, route: "/menus" },
    {
      id: 3,
      label: "Menu Categories",
      icon: <SetMealIcon />,
      route: "/menu-categories",
    },
    { id: 4, label: "Addon", icon: <FastfoodIcon />, route: "/addons" },
    {
      id: 5,
      label: "Addon Categories",
      icon: <EggIcon />,
      route: "/addon-categories",
    },
    {
      id: 6,
      label: "Locations",
      icon: <EditLocationAltIcon />,
      route: "/locations",
    },
    { id: 7, label: "Setting", icon: <SettingsIcon />, route: "/setting" },
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
    setToken("");
    window.location.reload();
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
          </Typography>

          <Button
            color="inherit"
            onClick={token ? logoutHandler : loginHandler}
          >
            {token ? "Log Out" : " Log In"}
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
