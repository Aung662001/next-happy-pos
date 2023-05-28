import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Layout from "./Layout";
import { AppContext } from "../contexts/AppContext";
import { Box, Button, Chip, TextField } from "@mui/material";
import { config } from "@/config/config";
import { prisma } from "@/utils/db";
import { apiBaseUrl } from "next-auth/client/_utils";
interface Categories {
  menu: "string";
  categories: "string";
}
const MenuCategories = () => {
  const [newMenuCategories, setNewMenuCategories] = useState("");
  const [categories, setCategories] = useState<Categories[]>();
  const { menuCategories, fetchData } = useContext(AppContext);
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
      <Box>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center", mt: 4 }}>
          <TextField
            label="New MenuCategories"
            variant="outlined"
            sx={{ mx: 3 }}
            value={newMenuCategories}
            onChange={(e) => setNewMenuCategories(e.target.value)}
          />
          <Button variant="contained" onClick={() => createNewMenuCategories()}>
            ADD
          </Button>
        </Box>

        {!menuCategories ? (
          <h2>Loading...</h2>
        ) : (
          menuCategories.map((cat, index) => {
            return (
              <Box sx={{ margin: "10px" }} key={index}>
                <Chip
                  label={cat.name}
                  sx={{ mr: 1, mb: 2, cursor: "pointer" }}
                  onDelete={() => {
                    cat.id && deleteMenuCategories(cat.id);
                  }}
                />
              </Box>
            );
          })
        )}
      </Box>
    </Layout>
  );
  async function deleteMenuCategories(id: number) {
    const response = await fetch(`${config.apiUrl}/menuCategories/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      alert("Please delete relation menus");
    }
    fetchData();
  }
  async function createNewMenuCategories() {
    const response = await fetch(`${config.apiUrl}/menuCategories`, {
      method: "POST",
      body: newMenuCategories,
    });
    setNewMenuCategories("");
    fetchData();
  }
};

export default MenuCategories;
