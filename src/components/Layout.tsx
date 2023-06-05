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
      <Box sx={{ position: "sticky", top: 0 }}>
        <NavBar label={props.title} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ position: "fixed" }}>
          <SideBar />
        </Box>
        <Box
          sx={{
            p: 3,
            marginLeft: "250px",
          }}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
