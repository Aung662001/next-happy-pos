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
import Layout from "./Layout";
import { FormEvent, useState, useContext } from "react";
import { style } from "./editMenuModel/CreateMenuModel";
import { prisma } from "@/utils/db";
import { config } from "@/config/config";
import { BackofficeContext } from "@/contexts/BackofficeContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const AddonCategories = () => {
  const {
    fetchData,
    addonCategories: addonCategoriesFromContext,
    menusMenuCategoriesLocations,
    menuAddonCategories,
    addons,
  } = useContext(BackofficeContext);
  const [locationId] = useLocalStorage("locationId");
  const [open, setOpen] = useState(false);
  const [addonCategories, setAddonCategories] = useState({
    name: "",
    isRequired: "false",
  });
  const menuIds = menusMenuCategoriesLocations
    .filter((mcl) => mcl.locations_id === locationId)
    .map((mclIds) => mclIds.menus_id);
  const addonCategorieIds = menuAddonCategories
    .filter((menuAddonCategorie) =>
      menuIds.includes(menuAddonCategorie.menus_id)
    )
    .map((ids) => ids.addon_categories_id);
  const filteredAddonCategories = addonCategoriesFromContext.filter(
    (addonCate) => addonCategorieIds.includes(addonCate.id)
  );
  return (
    <Layout title="AddonCategories">
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ position: "absolute", right: 0 }}
      >
        Add New MenuCategories +
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setAddonCategories({ ...addonCategories, name: "" });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 style={{ textAlign: "center" }}>Create a new menu</h1>
          <TextField
            label="Name"
            variant="outlined"
            sx={{ mb: 2, width: "100%" }}
            onChange={(e) =>
              setAddonCategories({ ...addonCategories, name: e.target.value })
            }
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">IsRequired</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={addonCategories.isRequired}
              onChange={(e) => {
                setAddonCategories({
                  ...addonCategories,
                  isRequired: e.target.value,
                });
              }}
              label="Is_Required"
            >
              <MenuItem value={"false"}>False</MenuItem>
              <MenuItem value={"true"}>True</MenuItem>
            </Select>
          </FormControl>
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
        {filteredAddonCategories?.map((data, index) => {
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
                      <Box sx={{ fontWeight: "bold", display: "inline" }}>
                        {
                          addons.filter(
                            (addon) => addon.addon_categories_id === data.id
                          ).length
                        }
                      </Box>
                      {" -"}
                      Addons
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
    if (!addonCategories.name || !addonCategories.isRequired) {
      return;
    }
    const response = await fetch(`${config.backofficeUrl}/addonCategories`, {
      method: "POST",
      body: JSON.stringify(addonCategories),
    });
    if (response.ok) {
      setOpen(false);
      setAddonCategories({ ...addonCategories, name: "" });
      fetchData();
    }
  }
};

export default AddonCategories;
