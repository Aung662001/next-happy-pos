import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { sidebarMenuItems } from "./TopBar";

export default function SideBar() {
  return (
    <Box
      sx={{
        minWidth: 250,
        backgroundColor: "#208469",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <List sx={{ p: 0 }}>
        {sidebarMenuItems.slice(0, 7).map((item) => (
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
                <ListItemText primary={item.label} sx={{ color: "#E8F6EF" }} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider variant={"middle"} sx={{ backgroundColor: "#FFE194", mt: 2 }} />
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
                <ListItemText primary={item.label} sx={{ color: "#E8F6EF" }} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
}
