import React, { useContext, useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {
  orders as Order,
  orderLine as OrderLine,
  OrderStatus,
} from "@prisma/client";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import {
  getConnectedOrderLines,
  getOrderLineStatus,
} from "@/utils/otherFunctions";
import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { AppData } from "@/store/slices/appSlice";
import { setOrderLines } from "@/store/slices/orderLineSlice";
interface Props {
  order: Order;
  orderLines: OrderLine[];
}
const Row = ({ order, orderLines }: Props) => {
  const dispatch = useAppDispatch();
  const { menus, addons } = useAppSelector(AppData);
  const [open, setOpen] = useState(false);
  //order id
  //Number of menu
  //tableId
  //paid
  //total price
  const getNumberOfMenu = (id: number) => {
    const connectedOrderLines = getConnectedOrderLines({ orderLines, id });
    const menuIds = connectedOrderLines.map((orderline) => orderline.menus_id);
    const unique = Array.from(new Set(menuIds));
    return unique.length;
  };
  //collapse
  const renderMenuInfo = (id: number) => {
    const connectedOrderLinesIds = getConnectedOrderLines({
      orderLines,
      id,
    }).map((ol) => ol.menus_id);
    const connectedMenus = menus.filter((menu) =>
      connectedOrderLinesIds.includes(menu.id)
    );
    const getConnectedAddons = (menuId: number, orderId: number) => {
      const addonIds = orderLines
        .filter(
          (orderLine) =>
            orderLine.menus_id === menuId && orderLine.orders_id === orderId
        )
        .map((ol) => ol.addons_id);
      //addons that connected to orderLine
      const connectedAddons = addons.filter((addon) =>
        addonIds.includes(addon.id)
      );
      return connectedAddons.map((addon) => {
        return (
          <Typography variant="body2" key={addon.id}>
            .{addon.name}
          </Typography>
        );
      });
    };
    const statusOnchange = async (
      e: SelectChangeEvent<"PENDING" | "PREPARING" | "COMPLETE" | "REJECTED">,
      menuId: number,
      orderId: number
    ) => {
      const response = await fetch(`${config.backofficeUrl}/orderStatus`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: e.target.value, menuId, orderId }),
      });
      const data = await response.json();
      if (response.ok) {
        // fetchData();
        dispatch(setOrderLines(data));
      }
    };
    return (
      <Box
        sx={{ display: "flex", flexDirection: "row", paddingY: "2rem", gap: 2 }}
      >
        {connectedMenus.map((menu) => {
          return (
            <Box key={menu.id}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {menu.name}
                  </Typography>
                  <Box>
                    <h3>Addons</h3>
                    {getConnectedAddons(menu.id, order.id)}
                  </Box>
                </CardContent>
                <CardActions>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={getOrderLineStatus(menu.id, order.id, orderLines)}
                      label="Status"
                      onChange={(e) => statusOnchange(e, menu.id, order.id)}
                    >
                      <MenuItem value={OrderStatus.PENDING}>Pending</MenuItem>
                      <MenuItem value={OrderStatus.PREPARING}>
                        Preparing
                      </MenuItem>
                      <MenuItem value={OrderStatus.COMPLETE}>Complete</MenuItem>
                      <MenuItem value={OrderStatus.REJECTED}>Reject</MenuItem>
                    </Select>
                  </FormControl>
                </CardActions>
              </Card>
            </Box>
          );
        })}
      </Box>
    );
  };
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <p>&uarr;</p> : <p>&darr;</p>}
          </IconButton>
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>{order.id}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          {getNumberOfMenu(order.id)}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>{order.table_id}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          {order.is_paid === true ? "YES" : "NO"}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>{order.price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout={"auto"}>
            {renderMenuInfo(order.id)}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;
