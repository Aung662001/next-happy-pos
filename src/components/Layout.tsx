import NavBar from "./NavBar";
import { BrowserRouter, Link } from "react-router-dom";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const Layout = (props: Props) => {
  return (
    <div>
      <NavBar />
      {props.children}
    </div>
  );
};

export default Layout;
