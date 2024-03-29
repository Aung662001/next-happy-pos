import React, { useContext, useEffect } from "react";
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
import Row from "./Row";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAppSelector } from "@/store/hook";
import { AppData } from "@/store/slices/appSlice";
import { orders as Orders } from "@prisma/client";

function App() {
  const { orders, orderLines, Locations } = useAppSelector(AppData);
  const [location, setLocation] = useLocalStorage("locationId");
  const [locationId] = useLocalStorage("locationId");
  const connectedOrders = orders.filter(
    (order) => order.location_id === parseInt(locationId)
  );
  //for init app
  useEffect(() => {
    if (Locations?.length) {
      setLocation(Locations[0]?.id);
    }
  }, [Locations]);
  return (
    <Layout title="Orders">
      <TableContainer
        component={Paper}
        sx={{
          marginTop: "20px",
          position: "fixed",
          overflowY: "scroll",
          height: 550,
        }}
      >
        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
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
            {/* to map order and insert tablecell */}
            {connectedOrders.map((order) => {
              return (
                <Row key={order.id} order={order} orderLines={orderLines} />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}

export default App;
