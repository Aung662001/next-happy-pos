import { Box } from "@mui/material";
import NavBar from "./NavBar";

interface Props {
  title?: string;
  children: string | JSX.Element | JSX.Element[];
}

const Layout = (props: Props) => {
  return (
    <Box>
      <NavBar title={props.title} />
      {props.children}
    </Box>
  );
};

export default Layout;
