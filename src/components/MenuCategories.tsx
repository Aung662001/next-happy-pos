import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Layout from "./Layout";
import { AppContext } from "../contexts/AppContext";
import { Box } from "@mui/material";
interface Categories {
  menu: "string";
  categories: "string";
}
const MenuCategories = () => {
  const [categories, setCategories] = useState<Categories[]>();
  const { menuCategories } = useContext(AppContext);
  console.log(menuCategories);
  const getData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASEURL}/menu_categories`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const result = await response.json();
    setCategories(result);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {}, [categories]);
  return (
    <Layout>
      {!categories
        ? "Loading...."
        : categories.map((cat, index) => {
            return (
              <Box
                sx={{ border: "1px solid black", margin: "10px" }}
                key={index}
              >
                <h1>{cat.menu}</h1>
                <button
                  style={{
                    backgroundColor: "lightblue",
                    outline: "none",
                    border: "none",
                    margin: "5px",
                  }}
                >
                  {cat.categories}
                </button>
              </Box>
            );
          })}
    </Layout>
  );
};

export default MenuCategories;
