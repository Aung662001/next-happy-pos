import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Layout from "./Layout";
import { useContext, useEffect, useState } from "react";
import { menus as Menu } from "@prisma/client";
import { BackofficeContext } from "../contexts/BackofficeContext";
import EditModel from "./editMenuModel/CreateMenuModel";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/router";
import UpdateMenu from "./editMenuModel/UpdateMenu";
import { Menu as menuUpdateType } from "../typings/types";

const Menus = () => {
  const [locationId] = useLocalStorage<number>("locationId");
  const [UpdateOpen, setUpdateOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const open = () => setOpenModel(true);
  const close = () => setOpenModel(false);
  const [menus, setMenus] = useState<menuUpdateType>({
    name: "",
    price: undefined,
    menuCategoriesIds: [],
    asseturl: "",
    description: "",
  });
  const {
    menus: menusData,
    fetchData,
    menusMenuCategoriesLocations,
    token,
  } = useContext(BackofficeContext);
  useEffect(() => {}, [token]);

  const router = useRouter();
  const editHandle = (data: Menu) => {
    const { id, name, price, description } = data;
    // const menuCategoriesIds = menusMenuCategoriesLocations
    //   .filter((mcl) => mcl.menus_id === id)
    //   .map((mc) => mc.menu_categories_id);
    setMenus({
      id: id,
      name,
      price,
      description: description as string,
      // menuCategoriesIds,
    });
    setUpdateOpen(true);
  };

  const menuIds = menusMenuCategoriesLocations
    .filter((mcl) => mcl.locations_id === locationId)
    .map((mcl) => mcl.menus_id);

  const filteredMenus = menusData.filter((menu) =>
    menuIds.includes(menu.id as number)
  );
  return (
    <Layout title="Menus">
      <Button
        variant="contained"
        onClick={() => setOpenModel(true)}
        sx={{ position: "absolute", right: 0 }}
      >
        Add new Item +
      </Button>
      <>
        <Stack
          direction="column"
          spacing={1}
          sx={{
            mt: 3,
            display: "grid",
            gridTemplateColumns: `repeat(2, auto)`,
            gap: 5,
            margin: "1rem 2rem",
          }}
        >
          <EditModel open={open} close={close} openModel={openModel} />
          <UpdateMenu
            open={UpdateOpen}
            setOpen={setUpdateOpen}
            menus={menus}
            setMenus={setMenus}
          />
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            gap={3}
          >
            {filteredMenus?.map((data, index) => {
              return (
                <section key={index}>
                  <Box>
                    <Card
                      sx={{
                        width: 300,
                        backgroundColor: "#E7EBF0",
                        height: 300,
                        marginTop: 3,
                      }}
                      onClick={() => editHandle(data)}
                    >
                      <CardContent>
                        <CardMedia
                          component="img"
                          height="194"
                          image={data.asseturl ? data.asseturl : ""}
                          alt="Paella dish"
                        />
                        <Typography gutterBottom variant="h5">
                          {data.name}
                          <span style={{ color: "red" }}>{data.price}</span>
                          <span style={{ fontSize: "18px" }}>Ks</span>
                        </Typography>
                        <Typography>{data.description}</Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </section>
              );
            })}
          </Grid>
        </Stack>
      </>
    </Layout>
  );
};

export default Menus;
