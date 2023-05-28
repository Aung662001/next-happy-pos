import NavBar from "./NavBar";

interface Props {
  title?: string;
  children: string | JSX.Element | JSX.Element[];
}

const Layout = (props: Props) => {
  return (
    <div>
      <NavBar title={props.title} />
      {props.children}
    </div>
  );
};

export default Layout;
