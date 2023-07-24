import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Button,
} from "@mui/material";
import { locations as Location } from "@prisma/client";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/router";
import { companies } from "@prisma/client";
import NavBar from "./TopBar";
import { config } from "@/config/config";
import { useAppSelector } from "@/store/hook";
import { AppData, selectIsLoading } from "@/store/slices/appSlice";

export default function Setting() {
  const [locationId, setLocationId] = useLocalStorage("locationId");
  const [updateCompany, setUpdateCompany] = useState<Partial<companies>>({
    name: "",
    address: "",
  });
  const router = useRouter();
  const { Locations, companies } = useAppSelector(AppData);
  const isLoading = useAppSelector(selectIsLoading);

  const [selectedLocation, setSelectedLocation] = useState<
    Location | undefined
  >();
  useEffect(() => {
    if (Locations.length) {
      if (!locationId) {
        setLocationId(Locations[0].id as number);
        setSelectedLocation(Locations[0]);
      } else {
        const selectedLocation = Locations.find(
          (location) => String(location.id) === locationId
        );
        setSelectedLocation(selectedLocation);
        // const companyId = Locations.filter(
        //   (location) => location.id === locationId
        // ).map((all) => all.companies_id);
        // console.log(companyId);
        setUpdateCompany({
          id: companies[0].id,
          name: companies[0].name,
          address: companies[0].address,
        });
      }
    }
  }, [Locations, companies]);
  function handleChange(e: SelectChangeEvent<{}>) {
    setLocationId(e.target.value as number);
    const selectedLocation = Locations.find(
      (location) => location.id === e.target.value
    );
    setSelectedLocation(selectedLocation);
    // router.push(`/menus`);
  }
  const updateHandler = async () => {
    const response = await fetch(`${config.backofficeUrl}/settings`, {
      method: "PUT",
      body: JSON.stringify(updateCompany),
    });
  };
  return (
    <Layout title="Setting">
      <Box sx={{ maxWidth: 500, margin: "0 auto", marginTop: "25%" }}>
        <TextField
          id="outline-basic"
          label="Company Name"
          fullWidth
          sx={{ my: 2 }}
          value={updateCompany.name}
          onChange={(e) =>
            setUpdateCompany({ ...updateCompany, name: e.target.value })
          }
        />
        <TextField
          id="outline-basic"
          label="Company Address"
          fullWidth
          sx={{ my: 2 }}
          value={updateCompany.address}
          onChange={(e) =>
            setUpdateCompany({ ...updateCompany, address: e.target.value })
          }
        />
        <FormControl fullWidth>
          <InputLabel
            id="demo-simple-select-label"
            sx={{ backgroundColor: "white", mx: 2 }}
          >
            Locations
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={locationId ? locationId : ""}
            label="Age"
            onChange={handleChange}
          >
            {Locations &&
              Locations.map((location) => {
                return (
                  <MenuItem value={location.id} key={location.id}>
                    {location.name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{ marginTop: 4 }}
          onClick={updateHandler}
        >
          Update
        </Button>
      </Box>
    </Layout>
  );
}
