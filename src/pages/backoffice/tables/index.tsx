import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useState, useContext } from "react";
import { prisma } from "@/utils/db";
import { config } from "@/config/config";
import { BackofficeContext } from "@/contexts/BackofficeContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { style } from "@/components/editMenuModel/CreateMenuModel";
import Layout from "@/components/Layout";

const AddonCategories = () => {
  const {
    fetchData,
    addonCategories: addonCategoriesFromContext,
    menusMenuCategoriesLocations,
    menuAddonCategories,
    addons,
    tables: Tables,
  } = useContext(BackofficeContext);
  const [locationId] = useLocalStorage("locationId");
  const [open, setOpen] = useState(false);
  const [tables, setTables] = useState({
    name: "",
    locationId: locationId,
  });

  const filteredTables = Tables.filter(
    (table) => table.location_id === locationId
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
                <Card
                  sx={{
                    width: 200,
                    backgroundColor: "#E7EBF0",
                    height: 200,
                    marginTop: 9,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                  onClick={() => null}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {data.name}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      <Box sx={{ fontWeight: "bold", display: "inline" }}></Box>
                    </Typography>
                  </CardContent>
                  <Typography>Click To Edit</Typography>
                </Card>
              </Box>
            </section>
          );
        })}
      </Grid>
    </Layout>
  );
  async function submitHandler() {
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
      setOpen(false);
      setTables({ ...tables, name: "" });
      fetchData();
    }
  }
};

export default AddonCategories;
