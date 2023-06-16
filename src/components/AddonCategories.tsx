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
import { useState, useContext } from "react";
import { style } from "./editMenuModel/CreateMenuModel";
import { config } from "@/config/config";
import { BackofficeContext } from "@/contexts/BackofficeContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import EditAddonCategories from "@/pages/backoffice/addon-categories/Edit";
import { addon_categories } from "@prisma/client";

interface AddonCategories {
  id: null | number;
  name: string;
  isRequired: string;
}
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
  const [update, setUpdate] = useState(false);
  const [addonCategories, setAddonCategories] = useState<AddonCategories>({
    id: null,
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
        Add New AddonCategories +
      </Button>

      <EditAddonCategories
        open={open}
        setOpen={setOpen}
        setAddonCategories={setAddonCategories}
        addonCategories={addonCategories}
        update={update}
        setUpdate={setUpdate}
      />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        gap={3}
      >
        {filteredAddonCategories?.map((data, index) => {
          return (
            <section key={index}>
              <Box onClick={() => clickHandle(data)}>
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

  function clickHandle(data: addon_categories) {
    setAddonCategories({
      id: data.id,
      name: data.name,
      isRequired: data.is_required === true ? "true" : "false",
    });
    setUpdate(true);
    setOpen(true);
  }
};

export default AddonCategories;
