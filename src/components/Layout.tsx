import { Box } from "@mui/material";
import NavBar from "./TopBar";
import SideBar from "./SideBar";
import { useAppSelector } from "@/store/hook";
import { selectIsLoading } from "@/store/slices/appSlice";
import { useSelector } from "react-redux";

interface Props {
  title?: string;
  children: string | JSX.Element | JSX.Element[];
}
const Layout = (props: Props) => {
  const loading = useAppSelector(selectIsLoading);
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
          {!loading ? props.children : ""}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
