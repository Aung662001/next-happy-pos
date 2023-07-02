import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { orders as Order, orderLine as OrderLine } from "@prisma/client";

import { IconButton } from "@mui/material";
interface Props {
  order: Order;
  orderLines: OrderLine[];
}
const Row = ({ order, orderLines }: Props) => {
  const [open, setOpen] = useState(false);
  //order id
  //Number of menu
  //tableId
  //paid
  //total price
  const getNumberOfMenu = (id: number) => {
    const connectedOrderLines = orderLines.filter(
      (orderline) => orderline.orders_id === id
    );
    const menuIds = connectedOrderLines.map((orderline) => orderline.menus_id);
    const unique = Array.from(new Set(menuIds));
    return unique.length;
  };
  return (
    <TableRow>
      <TableCell>
        <IconButton size="small" onClick={() => setOpen(!open)}>
          {open ? <p>&uarr;</p> : <p>&darr;</p>}
        </IconButton>
      </TableCell>
      <TableCell>{order.id}</TableCell>
      <TableCell>{getNumberOfMenu(order.id)}</TableCell>
      <TableCell>{order.table_id}</TableCell>
      <TableCell>{order.is_paid === true ? "YES" : "NO"}</TableCell>
      <TableCell>{order.price}</TableCell>
    </TableRow>
  );
};

export default Row;
