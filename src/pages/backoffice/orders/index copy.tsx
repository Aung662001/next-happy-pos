import Layout from "@/components/Layout";
import { BackofficeContext } from "@/contexts/BackofficeContext";
import { getNumberOfMenusByOrderId, getselectedLocationId } from "@/utils";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  addons as Addon,
  addon_categories as AddonCategory,
  menus as Menu,
  orders as Order,
  OrderStatus,
  orderLine as Orderline,
} from "@prisma/client";
import { useContext, useState } from "react";

interface Props {
  menus: Menu[];
  addonCategories: AddonCategory[];
  addons: Addon[];
  order: Order;
  orderLines: Orderline[];
}

const Row = ({ order, orderLines, menus, addons, addonCategories }: Props) => {
  const [open, setOpen] = useState(false);

  const renderMenusAddonsFromOrder = () => {
    const orderlineMenuIds = orderLines.map((item) => item.menus_id);
    const menuIds: number[] = [];
    orderlineMenuIds.forEach((item) => {
      const hasAdded = menuIds.includes(item);
      if (!hasAdded) menuIds.push(item);
    });

    const orderlineMenus = menuIds.map((menuId) => {
      const orderlineAddonIds = orderLines
        .filter((item) => item.menus_id === menuId)
        .map((item) => item.addons_id);
      // addon
      const orderlineAddons = addons.filter((item) =>
        orderlineAddonIds.includes(item.id)
      );
      // menu
      const orderlineMenu = menus.find((item) => item.id === menuId) as Menu;
      // status
      const status = orderLines.find(
        (item) => item.menus_id === menuId
      )?.order_status;
      // quantiy
      const quantity = orderLines.find(
        (item) => item.menus_id === menuId
      )?.quantity;
      // find respective addons' addoncategories
      const addonsWithCategories: { [key: number]: Addon[] } = {};
      orderlineAddons.forEach((item) => {
        const addonCategory = addonCategories.find(
          (addonCategory) => addonCategory.id === item.addon_categories_id
        ) as AddonCategory;
        if (!addonsWithCategories[addonCategory.id]) {
          addonsWithCategories[addonCategory.id] = [item];
        } else {
          addonsWithCategories[addonCategory.id] = [
            ...addonsWithCategories[addonCategory.id],
            item,
          ];
        }
      });
      console.log(addonsWithCategories);
      return { menu: orderlineMenu, addonsWithCategories, status, quantity };
    });

    return orderlineMenus.map((item) => (
      <Box key={item.menu.id} sx={{ mr: 2 }}>
        <Paper
          elevation={3}
          sx={{
            width: 250,
            height: 300,
            p: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">{item.menu.name}</Typography>
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor: "#1B9C85",
                    borderRadius: "50%",
                    width: 30,
                    height: 30,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  {item.quantity}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box
                sx={{
                  maxHeight: "180px",
                  overflow: "scroll",
                }}
              >
                {Object.keys(item.addonsWithCategories).map(
                  (addonCategoryId) => {
                    const addonCategory = addonCategories.find(
                      (item) => item.id === Number(addonCategoryId)
                    ) as AddonCategory;
                    const addons = item.addonsWithCategories[
                      Number(addonCategoryId)
                    ] as Addon[];
                    return (
                      <Box sx={{ mb: 1.5 }} key={addonCategoryId}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {addonCategory.name}
                        </Typography>
                        <Box sx={{ pl: 2 }}>
                          {addons.map((item) => {
                            return (
                              <Box key={item.id}>
                                <Typography
                                  variant="body1"
                                  sx={{ fontStyle: "italic" }}
                                >
                                  {item.name}
                                </Typography>
                              </Box>
                            );
                          })}
                        </Box>
                      </Box>
                    );
                  }
                )}
              </Box>
            </Box>
            <Box>
              <Divider sx={{ mb: 2 }} />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={item.status}
                    label="Status"
                    onChange={() => {}}
                  >
                    <MenuItem value={OrderStatus.PENDING}>Pending</MenuItem>
                    <MenuItem value={OrderStatus.PREPARING}>Preparing</MenuItem>
                    <MenuItem value={OrderStatus.COMPLETE}>Complete</MenuItem>
                    <MenuItem value={OrderStatus.REJECTED}>Reject</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    ));
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{order.id}</TableCell>
        <TableCell align="right">
          {getNumberOfMenusByOrderId(orderLines, order.id)}
        </TableCell>
        <TableCell align="right">{order.tables_id}</TableCell>
        <TableCell align="right">{order.is_paid ? "Yes" : "No"}</TableCell>
        <TableCell align="right">{order.price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit sx={{ my: 2 }}>
            <Box sx={{ display: "flex" }}>{renderMenusAddonsFromOrder()}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const Orders = () => {
  const { orders, orderLines, menus, addons, addonCategories } =
    useContext(BackofficeContext);
  const selectedLocationId = getselectedLocationId() as string;
  const currentLocationOrders = orders.filter(
    (item) => item.location_id === Number(selectedLocationId)
  );

  const getOrderLinesByOrderId = (orderId: number) => {
    return orderLines.filter((item) => item.orders_id === orderId);
  };

  return (
    <Layout title="Orders">
      <TableContainer component={Paper} sx={{ maxHeight: "100%" }}>
        <Table aria-label="collapsible table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="right">Order Id</TableCell>
              <TableCell align="right">No. of menus</TableCell>
              <TableCell align="right">Table Id</TableCell>
              <TableCell align="right">Paid</TableCell>
              <TableCell align="right">Total price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentLocationOrders.map((order) => (
              <Row
                key={order.id}
                menus={menus}
                addonCategories={addonCategories}
                addons={addons}
                order={order}
                orderLines={getOrderLinesByOrderId(order.id)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};
export default Orders;
