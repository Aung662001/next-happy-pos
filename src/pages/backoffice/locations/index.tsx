import Layout from "@/components/Layout";
import { config } from "@/config/config";
// import Locations from "@/components/Locations";
import { BackofficeContext } from "@/contexts/BackofficeContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { FormControl, TextField, Button, Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { locations as Location } from "@prisma/client";

interface UpdateHandle {
  updateHandler: () => void;
}
const App = () => {
  const [token, setToken] = useLocalStorage("accessToken");
  const { Locations, companies, fetchData } = useContext(BackofficeContext);
  const [updatedActualValue, setUpdatedActualValue] =
    useState<Location[]>(Locations);
  const [newLocation, setNewLocation] = useState<Partial<Location>>({
    name: "",
    address: "",
  });
  useEffect(() => {
    setUpdatedActualValue(Locations);
    // fetchData();
  }, [Locations]);
  useEffect(() => {
    fetchData();
  }, []);

  //update Handler function
  const updateHandler = async (location: Location) => {
    const oldLocaValue = Locations.find((Loca) => Loca.id === location.id);
    const newLocaValue = updatedActualValue.find(
      (upt) => upt.id === location.id
    );
    if (oldLocaValue === null) return;
    if (
      oldLocaValue?.name === newLocaValue?.name &&
      oldLocaValue?.address === newLocaValue?.address
    ) {
      return;
    }

    try {
      await fetch(`${config.backofficeUrl}/location`, {
        method: "PUT",
        // headers: {
        //   Autorization: `Bearer ${token}`,
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify(location),
      });
      fetchData();
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteHandler = async (locationId: number) => {
    console.log(locationId);
    const response = await fetch(
      `${config.backofficeUrl}/location?locationId=${locationId}`,
      {
        method: "DELETE",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    );
    if (response.ok) {
      // window.location.reload();
      fetchData();
    }
  };
  const createLocation = async () => {
    if (!newLocation.name || !newLocation.address) return;
    newLocation.companies_id = companies[0].id!;
    console.log(newLocation);
    const response = await fetch(`${config.backofficeUrl}/location`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    });
    setNewLocation({ name: "", address: "" });
    if (response.ok) {
      return fetchData();
    }
  };
  return (
    <Layout title="Locations">
      <>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 3,
            gap: 3,
          }}
        >
          <TextField
            label="City"
            variant="outlined"
            type="text"
            value={newLocation.name}
            onChange={(event) => {
              setNewLocation({
                ...newLocation,
                address: newLocation.address,
                name: event?.target.value,
              });
            }}
          />
          <TextField
            label="Address"
            variant="outlined"
            type="text"
            value={newLocation.address}
            onChange={(eve) => {
              setNewLocation({
                ...newLocation,
                name: newLocation.name,
                address: eve?.target.value,
              });
            }}
          />
          <Button variant="contained" onClick={() => createLocation()}>
            Create
          </Button>
        </FormControl>
        <Box
          sx={{
            width: "90%",
            height: "3px",
            backgroundColor: "black",
            margin: "0 auto",
            marginTop: 3,
          }}
        ></Box>
        {updatedActualValue.map((location, index) => {
          return (
            <FormControl
              key={index}
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 3,
                gap: 3,
              }}
            >
              <Box
                sx={{
                  fontSize: "1.3rem",
                  height: "100%",
                }}
              >
                {index + 1}.
              </Box>
              <TextField
                label="City"
                variant="outlined"
                type="text"
                defaultValue={location.name}
                onChange={(event) => {
                  const newLocation = updatedActualValue.map((curloca) => {
                    if (curloca.id === location.id) {
                      return { ...curloca, name: event.target.value };
                    }
                    return curloca;
                  });
                  setUpdatedActualValue(newLocation);
                }}
              />
              <TextField
                label="Address"
                variant="outlined"
                type="text"
                defaultValue={location.address}
                onChange={(event) => {
                  const newLocation = updatedActualValue.map((curloca) => {
                    if (curloca.id === location.id) {
                      return {
                        ...curloca,
                        address: event.target.value,
                      };
                    } else {
                      return curloca;
                    }
                  });
                  setUpdatedActualValue(newLocation);
                }}
              />

              <Button
                variant="contained"
                onClick={() => updateHandler(location)}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteHandler(location.id!)}
              >
                Delete
              </Button>
            </FormControl>
          );
        })}
      </>
    </Layout>
  );
};

export default App;
