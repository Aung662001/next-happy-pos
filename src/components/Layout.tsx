import { Box } from "@mui/material";
import NavBar from "./TopBar";
import SideBar from "./SideBar";

interface Props {
  title?: string;
  children: string | JSX.Element | JSX.Element[];
}
const Layout = (props: Props) => {
  return (
    <Box>
      <NavBar label={props.title} />
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box sx={{ p: 3, flexGrow: 1, maxHeight: "100vh", overflow: "scroll" }}>
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
