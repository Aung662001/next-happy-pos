import React from "react";
import Layout from "@/components/Layout";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function App() {
  function createData(
    firstCol: string,
    orderId: number,
    nOfMenu: number,
    tableId: number,
    paid: string,
    totalPrice: number
  ) {
    return { firstCol, orderId, nOfMenu, tableId, paid, totalPrice };
  }
  //order id
  //Number of menu
  //tableId
  //paid
  //total price
  const rows = [createData("", 1, 159, 6.0, "true", 4.0)];
  return (
    <Layout title="Orders">
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="right">Orders Id</TableCell>
              <TableCell align="right">Number of menus</TableCell>
              <TableCell align="right">Table Id</TableCell>
              <TableCell align="right">Paid</TableCell>
              <TableCell align="right">Total price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.firstCol}</TableCell>

                <TableCell component="th" scope="row">
                  {row.orderId}
                </TableCell>
                <TableCell align="right">{row.nOfMenu}</TableCell>
                <TableCell align="right">{row.tableId}</TableCell>
                <TableCell align="right">{row.paid}</TableCell>
                <TableCell align="right">{row.totalPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}

export default App;
