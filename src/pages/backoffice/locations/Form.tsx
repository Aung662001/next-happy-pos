import { Box, Button, FormControl, Modal, TextField } from "@mui/material";
import React from "react";
import { locations as Location } from "@prisma/client";
import { style } from "@/components/editMenuModel/CreateMenuModel";

interface Prop {
  setNewLocation: React.Dispatch<React.SetStateAction<Partial<Location>>>;
  newLocation: Partial<Location>;
  action: () => Promise<void>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  update: boolean;
  updateHandler: (location: Partial<Location>) => Promise<void>;
  deleteHandler: (locationId: number) => Promise<void>;
}
const Form = ({
  setNewLocation,
  newLocation,
  action,
  setOpen,
  open,
  updateHandler,
  update,
  setUpdate,
  deleteHandler,
}: Prop) => {
  const closeModal = () => {
    setUpdate(false);
    setOpen(false);
  };
  return (
    <Modal open={open} onClose={() => closeModal()}>
      <Box sx={style}>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "column",
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
          {update && (
            <Box gap={9}>
              <Button
                variant="contained"
                onClick={() => updateHandler(newLocation)}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteHandler(newLocation.id!)}
              >
                Delete
              </Button>
            </Box>
          )}
          {!update && (
            <Button variant="contained" onClick={() => action()}>
              Create
            </Button>
          )}
        </FormControl>
      </Box>
    </Modal>
  );
};

export default Form;
