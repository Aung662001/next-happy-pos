import { OrderContext } from "@/contexts/OrderContext";
import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useRouter } from "next/router";
import { config } from "@/config/config";

const Cart = () => {
  const { orderLines, updateData, ...data } = useContext(OrderContext);
  const router = useRouter();
  const query = router.query;
  //   const [orders, setOrders] = useState(orderLines);
  const removeFromCart = (menuId: number) => {
    // setOrders(orders.filter((ol) => ol.menu.id !== menuId));
    updateData({
      ...data,
      orderLines: orderLines.filter((ol) => ol.menu.id !== menuId),
    });
  };
  ///if no item in cart return to prev page
  useEffect(() => {
    if (!orderLines.length) {
      router.push("./");
    }
  }, [orderLines]);
  const renderOrders = () => {
    return orderLines.map((ol, index) => {
      return (
        <Box
          key={index}
          sx={{
            width: "100vw",
            minHeight: "200px",
            marginLeft: "2rem",
            backgroundColor: "lightcyan",
            padding: "2rem",
            margin: "1rem 0",
          }}
        >
          <Box sx={{}}>
            <h3
              style={{
                display: "inline-block",
                width: "200px",
                marginRight: "200px",
              }}
            >
              {ol.menu.name}
            </h3>
            <Box
              sx={{
                display: "inline-block",
                padding: ".4rem",
                borderRadius: "50%",
              }}
            >
              {ol.quantity}
            </Box>
            <i> {`   ×(${ol.menu.price})ks`}</i>
          </Box>
          {ol.addons?.map((addon, index) => {
            return (
              <Box sx={{}} key={index}>
                <h5 style={{ display: "inline-block", width: "200px" }}>
                  {addon.name}
                </h5>
                <Box
                  sx={{
                    display: "inline-block",
                    padding: ".4rem",
                    borderRadius: "50%",
                    marginRight: "200px",
                  }}
                ></Box>
                1<i> {`   ×(${addon.price})ks`}</i>
              </Box>
            );
          })}
          <Box sx={{ display: "flex", gap: 3 }}>
            <DeleteIcon
              sx={{ cursor: "pointer", color: "red" }}
              onClick={() => removeFromCart(ol.menu.id as number)}
            />
            <ModeEditIcon sx={{ cursor: "pointer" }} />
          </Box>
        </Box>
      );
    });
  };
  const orderClick = async () => {
    const res = await fetch(
      `${config.orderBaseUrl}/orderLine?locationId=${query.locationId}&tableId=${query.tableId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderLines }),
      }
    );
  };
  return (
    <Box sx={{ margin: "3rem" }}>
      {renderOrders()}
      {orderLines.length && (
        <Button
          variant="contained"
          sx={{ position: "absolute", right: "2rem" }}
          onClick={() => orderClick()}
        >
          Confirm Order
        </Button>
      )}
    </Box>
  );
};

export default Cart;
