import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { config } from "@/config/config";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { style } from "@/components/editMenuModel/CreateMenuModel";
import Layout from "@/components/Layout";
import ItemCard from "@/components/ItemCard";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { AppData } from "@/store/slices/appSlice";
import { addTable } from "@/store/slices/tableSlice";

const AddonCategories = () => {
  const {
    addonCategories: addonCategoriesFromContext,
    menusMenuCategoriesLocations,
    menuAddonCategories,
    addons,
    tables: Tables,
  } = useAppSelector(AppData);
  const dispatch = useAppDispatch();
  const [locationId] = useLocalStorage("locationId");
  const [open, setOpen] = useState(false);
  const [tables, setTables] = useState({
    name: "",
    locationId: locationId,
  });

  const filteredTables = Tables.filter(
    (table) => table.location_id === parseInt(locationId)
  );
  return (
    <Layout title="Tables">
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ position: "absolute", right: 0 }}
      >
        Add New Table +
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setTables({ ...tables, name: "" });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 style={{ textAlign: "center" }}>Create a new Table</h1>
          <TextField
            label="Name"
            variant="outlined"
            sx={{ mb: 2, width: "100%" }}
            onChange={(e) => setTables({ ...tables, name: e.target.value })}
          />

          <Button variant="contained" onClick={submitHandler}>
            Create
          </Button>
        </Box>
      </Modal>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        gap={3}
      >
        {filteredTables?.map((data, index) => {
          return (
            <section key={index}>
              <Box>
                <ItemCard
                  icon={
                    <TableRestaurantIcon
                      sx={{ color: "#208469", fontSize: "2rem" }}
                    />
                  }
                  name={data.name}
                />
              </Box>
            </section>
          );
        })}
      </Grid>
    </Layout>
  );
  async function submitHandler() {
    setOpen(false);
    if (!tables.name) {
      return;
    }
    const response = await fetch(
      `${config.backofficeUrl}/tables?lcoationId=${locationId}`,
      {
        method: "POST",
        body: JSON.stringify(tables),
      }
    );
    if (response.ok) {
      const jsonData = await response.json();
      setTables({ ...tables, name: "" });
      dispatch(addTable(jsonData));
      // fetchData();
    }
  }
};

export default AddonCategories;
