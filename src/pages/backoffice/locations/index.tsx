import Layout from "@/components/Layout";
import { config } from "@/config/config";
// import Locations from "@/components/Locations";
import { Button, Box, Grid } from "@mui/material";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import React, { useContext, useEffect, useState } from "react";
import { locations as Location } from "@prisma/client";
import Form from "./Form";
import ItemCard from "@/components/ItemCard";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { AppData } from "@/store/slices/appSlice";
import { addLocation, removeLocation } from "@/store/slices/locationSlice";
import { removeAddon } from "@/store/slices/addonsSlice";

interface UpdateHandle {
  updateHandler: () => void;
}
const App = () => {
  const dispatch = useAppDispatch();
  const { Locations, companies } = useAppSelector(AppData);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [newLocation, setNewLocation] = useState<Partial<Location>>({
    name: "",
    address: "",
  });
  //

  //update Handler function
  const updateHandler = async (location: Partial<Location>) => {
    if (!location.address || !location.name) return;
    try {
      const response = await fetch(`${config.backofficeUrl}/location`, {
        method: "PUT",
        body: JSON.stringify(location),
      });
      // fetchData();
      setUpdate(false);
      setOpen(false);
      const jsonData = await response.json();
      dispatch(addLocation(jsonData));
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteHandler = async (locationId: number) => {
    setOpen(false);
    setUpdate(false);
    const response = await fetch(
      `${config.backofficeUrl}/location?locationId=${locationId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      // window.location.reload();
      // fetchData();
      dispatch(removeLocation(locationId));
    }
  };
  const createLocation = async () => {
    if (!newLocation.name || !newLocation.address) return;
    setOpen(false);
    setUpdate(false);
    newLocation.companies_id = companies[0].id!;
    const response = await fetch(`${config.backofficeUrl}/location`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    });
    setNewLocation({ name: "", address: "" });
    //TODO=>to change redux here
    const jsonData = await response.json();
    if (jsonData && response.ok) {
      dispatch(addLocation(jsonData));
    }
    // if (response.ok) {
    //   return fetchData();
    // }
  };
  const ItemClickHandler = (id: number) => {
    setOpen(true);
    setUpdate(true);
    let location = Locations.filter((location) => location.id === id)[0];
    setNewLocation(location);
  };
  return (
    <Layout title="Locations">
      <Button variant="contained" onClick={() => setOpen(true)}>
        Create New Location +
      </Button>
      <Form
        setNewLocation={setNewLocation}
        newLocation={newLocation}
        action={createLocation}
        open={open}
        setOpen={setOpen}
        updateHandler={updateHandler}
        deleteHandler={deleteHandler}
        update={update}
        setUpdate={setUpdate}
      />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        gap={3}
        marginLeft="9rem"
      >
        {Locations.map((location, index) => {
          return (
            // <FormControl
            //   key={index}
            //   sx={{
            //     display: "flex",
            //     flexDirection: "row",
            //     width: "100%",
            //     justifyContent: "center",
            //     alignItems: "center",
            //     marginTop: 3,
            //     gap: 3,
            //   }}
            // >
            //   <Box
            //     sx={{
            //       fontSize: "1.3rem",
            //       height: "100%",
            //     }}
            //   >
            //     {index + 1}.
            //   </Box>
            //   <TextField
            //     label="City"
            //     variant="outlined"
            //     type="text"
            //     defaultValue={location.name}
            //     onChange={(event) => {
            //       const newLocation = updatedActualValue.map((curloca) => {
            //         if (curloca.id === location.id) {
            //           return { ...curloca, name: event.target.value };
            //         }
            //         return curloca;
            //       });
            //       setUpdatedActualValue(newLocation);
            //     }}
            //   />
            //   <TextField
            //     label="Address"
            //     variant="outlined"
            //     type="text"
            //     defaultValue={location.address}
            //     onChange={(event) => {
            //       const newLocation = updatedActualValue.map((curloca) => {
            //         if (curloca.id === location.id) {
            //           return {
            //             ...curloca,
            //             address: event.target.value,
            //           };
            //         } else {
            //           return curloca;
            //         }
            //       });
            //       setUpdatedActualValue(newLocation);
            //     }}
            //   />

            //   <Button
            //     variant="contained"
            //     onClick={() => updateHandler(location)}
            //   >
            //     Update
            //   </Button>
            //   <Button
            //     variant="outlined"
            //     color="error"
            //     onClick={() => deleteHandler(location.id!)}
            //   >
            //     Delete
            //   </Button>
            // </FormControl>
            <Box key={index} onClick={() => ItemClickHandler(location.id)}>
              <ItemCard
                icon={
                  <EditLocationAltIcon
                    sx={{ color: "#208469", fontSize: "2rem" }}
                  />
                }
                name={location.name}
                childName={location.address as string}
              />
            </Box>
          );
        })}
      </Grid>
    </Layout>
  );
};

export default App;
