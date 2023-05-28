import React, { useContext, useEffect, useState } from "react";
import Layout from "./Layout";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { AppContext } from "../contexts/AppContext";
import { Location } from "../typings/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/router";

export default function Setting() {
  const [locationId, setLocationId] = useLocalStorage("locationId");
  const router = useRouter();
  const { Locations, fetchData, companies, token } = useContext(AppContext);
  console.log(Locations, "jdlkfjdsfkjdsflkdjo");

  const [selectedLocation, setSelectedLocation] = useState<
    Location | undefined
  >();
  console.log(companies);
  useEffect(() => {
    if (Locations.length) {
      if (!locationId) {
        setLocationId(String(Locations[0].id));
        setSelectedLocation(Locations[0]);
      } else {
        const selectedLocation = Locations.find(
          (location) => String(location.id) === locationId
        );
        setSelectedLocation(selectedLocation);
      }
    }
  }, [Locations, companies]);
  function handleChange(e: SelectChangeEvent<number>) {
    setLocationId(String(e.target.value));
    const selectedLocation = Locations.find(
      (location) => location.id === e.target.value
    );
    setSelectedLocation(selectedLocation);
    router.push(`/menus`);
  }
  return (
    <Layout>
      <Box sx={{ maxWidth: 500, margin: "0 auto", marginTop: "25%" }}>
        <TextField
          id="outline-basic"
          label="Company"
          fullWidth
          sx={{ my: 2 }}
          value={companies.length && companies[0].name}
          disabled
        />
        <TextField
          id="outline-basic"
          label="Company"
          fullWidth
          sx={{ my: 2 }}
          value={companies.length && companies[0].address}
          disabled
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
            value={selectedLocation ? selectedLocation.id : ""}
            label="Age"
            onChange={(e) => handleChange(e)}
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
      </Box>
    </Layout>
  );
}
