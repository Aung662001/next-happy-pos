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
import { Menu } from "../typings/types";
import { AppContext } from "../contexts/AppContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import EditForm from "./EditForm";
import EditModel from "./editMenuModel/CreateMenuModel";

const Menus = () => {
  const [openModel, setOpenModel] = useState(false);
  const open = () => setOpenModel(true);
  const close = () => setOpenModel(false);
  const locationId = localStorage.getItem("locationId");
  const {
    menus: menusData,
    fetchData,
    menusLocations,
    token,
  } = useContext(AppContext);

  useEffect(() => {}, [token]);
  useEffect(() => {
    fetchData();
  }, []);
  // const handleDelete = async (id: number | undefined) => {
  //   await fetch(`${process.env.REACT_APP_SERVER_BASEURL}/menus/delete/${id}`, {
  //     method: "DELETE",
  //   });
  //   fetchData();
  // };
  const navigate = useNavigate();
  const editHandle = (data: Menu) => {
    navigate(`/menus/${data.id}?locationId=${locationId}`);
  };
  if (!token) return <h1>sorry</h1>;
  const menuIdWithLocationId = menusLocations
    .filter(
      (menusLocation) => String(menusLocation.locations_id) === locationId
    )
    .map((menuLocation) => menuLocation.menus_id);
  const filteredMenus = menusData.filter((menu) =>
    menuIdWithLocationId.includes(menu.id as number)
  );

  return (
    <Layout>
      {locationId ? (
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
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Box
                onClick={() => setOpenModel(true)}
                sx={{ minWidth: 280, minHeight: 280, marginTop: 3 }}
                style={{
                  border: "2px solid black",
                  borderStyle: "dashed",
                  borderRadius: "10px",
                  marginLeft: "20px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                Add new Item
                <span style={{ fontSize: "50px" }}>+</span>
              </Box>
              {filteredMenus?.map((data, index) => {
                return (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <div>
                      {/* ///////////////////////////// */}
                      <Card
                        sx={{
                          maxWidth: 300,
                          backgroundColor: "#E7EBF0",
                          maxHeight: 300,
                        }}
                        onClick={() => editHandle(data)}
                      >
                        <CardContent>
                          <CardMedia
                            component="img"
                            height="194"
                            image={data.asseturl}
                            alt="Paella dish"
                          />
                          <Typography gutterBottom variant="h5">
                            {data.name}:{" "}
                            <span style={{ color: "red" }}>{data.price}</span>
                            <span style={{ fontSize: "18px" }}>Ks</span>
                          </Typography>
                        </CardContent>
                        <CardActions>
                          {/* <Link
                            to={`/menus/${data.id}?locationId=${locationId}`}
                          >
                            <Button size="small">Edit</Button>
                          </Link> */}
                          {/* <Button
                            size="small"
                            onClick={() => handleDelete(data?.id)}
                          >
                            Delete
                          </Button> */}
                        </CardActions>
                      </Card>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </Stack>
          <Link to="/">
            <Button
              variant="outlined"
              style={{ marginLeft: "2rem" }}
              sx={{ "&:hover": { backgroundColor: "skyblue" } }}
            >
              Back
            </Button>
          </Link>
        </>
      ) : (
        <Box>
          <h2>Missig Location...</h2>
        </Box>
      )}
    </Layout>
  );
};

export default Menus;
