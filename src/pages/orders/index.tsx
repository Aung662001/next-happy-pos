import { OrderContext } from "@/contexts/OrderContext";
import { MenuCategory } from "@/typings/types";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

function Order() {
  const router = useRouter();
  const { menuCategories, menus } = useContext(OrderContext);
  const [selectedMenuCategory, setSelectedMenuCategories] =
    useState<MenuCategory>();
  // useEffect(() => {
  //   setSelectedMenuCategories(menuCategories[0]);
  // }, []);
  return (
    <Box>
      {menuCategories.map((menuCategorie, index) => {
        return (
          <Button
            onClick={() => {
              setSelectedMenuCategories(menuCategorie);
            }}
            variant={
              selectedMenuCategory &&
              menuCategorie.id === selectedMenuCategory.id
                ? "contained"
                : "outlined"
            }
            key={index}
            sx={{ width: "200px", margin: 2 }}
          >
            {menuCategorie.name}
          </Button>
        );
      })}
    </Box>
  );
}

export default Order;
