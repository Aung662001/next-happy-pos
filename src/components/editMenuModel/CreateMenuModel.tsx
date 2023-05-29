import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Menu, Location } from "../../typings/types";
import { BackofficeContext } from "../../contexts/BackofficeContext";
import FileDropZone from "./FileDropZone";
import { config } from "../../config/config";
import { LoadingButton } from "@mui/lab";
import { create } from "domain";
interface Props {
  open: () => void;
  close: () => void;
  openModel: boolean;
}
export default function EditModel({ open, close, openModel }: Props) {
  const [menus, setMenus] = useState<Menu>({
    name: "",
    price: 0,
    locationIds: [],
    asseturl: "",
    description: "",
  });
  const [price, setPrice] = useState<string | number>(0);
  const [name, setName] = useState<string>("");
  const [menuImage, setMenuImage] = useState<File>();
  const [selectedLocationIds, setSelectedLocationIds] = useState<number[]>([]);
  const [visible, setVisible] = useState(false);

  const onFileSelected = (files: File[]) => {
    setMenuImage(files[0]);
  };

  const { fetchData, Locations } = useContext(BackofficeContext);
  const createMenu = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!menus?.name || menus?.price < 0) return;
    if (menuImage) {
      const formData = new FormData();
      formData.append("files", menuImage as Blob);
      const response = await fetch(`${config.backofficeUrl}/assets`, {
        method: "POST",
        body: formData,
      });
      const responseJson = await response.json();
      const asseturl = responseJson.asseturl;
      menus.asseturl = asseturl;
    }

    // menus.locationIds?.push(locationId!);
    // const locationId = localStorage.getItem("locationId")!;

    await fetch(`${process.env.REACT_APP_SERVER_BASEURL}/menus/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menus),
    });
    fetchData();
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const handleChange = (e: SelectChangeEvent<number[] | []>) => {
    const curLoca = e.target.value as number[];
    setSelectedLocationIds(curLoca);
    setMenus({ ...menus, locationIds: curLoca });
    if (menus.name && menus.price) setVisible(true);
  };
  const buttonVisible = () => {
    if (menus.name && menus.price) {
      setVisible(true);
    }
  };
  return (
    <Modal
      open={openModel}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={(e) => createMenu(e)}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 300,
              m: "0 auto",
            }}
          >
            <h1 style={{ textAlign: "center" }}>Create a new menu</h1>
            <TextField
              label="Name*"
              variant="outlined"
              sx={{ mb: 2 }}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setMenus({
                  name: event.target.value,
                  price: menus?.price ? menus.price : 0,
                  locationIds: [],
                });
                buttonVisible();
              }}
            />
            <TextField
              label="Price*"
              variant="outlined"
              type="number"
              sx={{ mb: 2 }}
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
                setMenus({
                  price: parseInt(event.target.value),
                  name: menus?.name ? menus.name : "",
                  locationIds: [],
                });
                buttonVisible();
              }}
            />
            <TextField
              label="Description"
              variant="outlined"
              type="string"
              sx={{ mb: 2 }}
              value={menus.description}
              onChange={(event) => {
                setMenus({
                  price: menus.price ? menus.price : 0,
                  name: menus?.name ? menus.name : "",
                  locationIds: menus.locationIds,
                  description: event.target.value,
                });
              }}
            />
            <FormControl sx={{ mb: 1, width: 300 }} required>
              <InputLabel
                id="demo-multiple-checkbox-label"
                sx={{ backgroundColor: "white", px: 2 }}
              >
                Locations
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedLocationIds}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(value) => {
                  const selectedLocations = selectedLocationIds.map(
                    (selectedLocationId) => {
                      return Locations.find(
                        (location) => location.id === selectedLocationId
                      );
                    }
                  );
                  return selectedLocations
                    .map((selectedLocation) => selectedLocation?.name)
                    .join(",");
                }}
              >
                {Locations.map((location) => (
                  <MenuItem key={location.id} value={location.id}>
                    <Checkbox
                      checked={
                        location.id && selectedLocationIds.includes(location.id)
                          ? true
                          : false
                      }
                    />
                    <ListItemText primary={location.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FileDropZone onFileSelected={onFileSelected} />
            {visible && (
              <Button variant="contained" type="submit" sx={{ marginTop: 3 }}>
                Create
              </Button>
            )}

            {!visible && (
              <LoadingButton
                loading
                loadingIndicator="Create"
                variant="contained"
                sx={{ marginTop: 3 }}
              >
                Create
              </LoadingButton>
            )}
          </Box>
        </Box>
      </form>
    </Modal>
  );
}
