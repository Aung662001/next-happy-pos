import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import NavBar from "./NavBar";
import { sidebarMenuItems } from "./NavBar";

interface Props {
  title?: string;
  children: string | JSX.Element | JSX.Element[];
}

const Layout = (props: Props) => {
  return (
    <Box>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box
          sx={{
            minWidth: 250,
            backgroundColor: "#1B9C85",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <List sx={{ p: 0 }}>
            {sidebarMenuItems.slice(0, 6).map((item) => (
              <Link
                key={item.id}
                href={item.route}
                style={{ textDecoration: "none", color: "#313131" }}
              >
                <ListItem
                  disablePadding
                  sx={{
                    "&.hover": {
                      backgroundColor: "blue",
                    },
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon sx={{ color: "#E8F6EF" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={{ color: "#E8F6EF" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider
            variant={"middle"}
            sx={{ backgroundColor: "#FFE194", mt: 2 }}
          />
          <List>
            {sidebarMenuItems.slice(-1).map((item) => (
              <Link
                key={item.id}
                href={item.route}
                style={{ textDecoration: "none", color: "#313131" }}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon sx={{ color: "#E8F6EF" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={{ color: "#E8F6EF" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Box sx={{ flexGrow: 1 }}>
            <NavBar />
          </Box>
        </Box>
        <Box sx={{ p: 3, flexGrow: 1, overflow: "scroll" }}>
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
