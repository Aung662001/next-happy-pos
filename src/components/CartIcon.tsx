import React, { useContext, useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box } from "@mui/material";
import { OrderContext } from "@/contexts/OrderContext";
import { useRouter } from "next/router";

const CartIcon = () => {
  const router = useRouter();
  const { orderLines } = useContext(OrderContext);
  const [total, setTotal] = useState(0);
  const totalItem = () => {
    let total = 0;
    orderLines.map((ol) => {
      total = total + ol.quantity;
    });
    return total;
  };
  useEffect(() => {
    setTotal(totalItem());
  }, []);
  const cartOpen = () => {
    router.push(`./orders/cart`);
  };
  return (
    <div
      style={{ position: "fixed", bottom: 0, right: 0 }}
      onClick={() => cartOpen()}
    >
      <ShoppingCartIcon
        sx={{
          color: "blue",
          width: "4rem",
          height: "4rem",
          padding: ".5rem",
          backgroundColor: "gray",
          borderRadius: "50%",
          fontSize: "1rem",
          alignSelf: "right",
          cursor: "pointer",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          backgroundColor: "red",
          top: "-.8rem",
          right: 0,
          margin: ".6rem",
          padding: ".5rem",
          borderRadius: "40%",
        }}
      >
        {total}
      </Box>
    </div>
  );
};

export default CartIcon;
