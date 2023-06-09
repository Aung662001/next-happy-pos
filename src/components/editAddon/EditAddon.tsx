import { config } from "@/config/config";
import { BackofficeContext } from "@/contexts/BackofficeContext";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Button,
  Dialog,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useContext } from "react";
interface Props {
  addonData: {
    name: string;
    price: number;
    is_avaiable: string | boolean;
    addonCategories: string;
  };
  setAddonData: Dispatch<
    SetStateAction<{
      name: string;
      price: number;
      is_avaiable: string | boolean;
      addonCategories: string;
    }>
  >;
  check: string | boolean;
  setCheck: Dispatch<SetStateAction<string | boolean>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  updateHandler: () => Promise<void>;
  createNewAddon: () => Promise<void>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
function EditAddon(props: Props) {
  const {
    addonData,
    setAddonData,
    check,
    setCheck,
    update,
    setUpdate,
    updateHandler,
    createNewAddon,
    open,
    setOpen,
  } = props;
  const { addonCategories } = useContext(BackofficeContext);

  function closeHandler() {
    setAddonData({
      name: "",
      price: 0,
      is_avaiable: check,
      addonCategories: "",
    });
    setOpen(false);
    setUpdate(false);
  }

  return (
    <Dialog open={open} onClose={closeHandler}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          marginY: "2rem",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "2px solid lightgray",
          paddingBottom: "2rem",
        }}
      >
        <TextField
          label="New Addon"
          variant="outlined"
          autoComplete="off"
          sx={{ mx: 3, width: "300px" }}
          value={addonData.name}
          onChange={(event) =>
            setAddonData({ ...addonData, name: event.target.value })
          }
        />
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          sx={{ mx: 3, width: "300px" }}
          value={addonData.price ? addonData.price : ""}
          onChange={(e) =>
            setAddonData({ ...addonData, price: parseInt(e.target.value) })
          }
        />

        <FormControl sx={{ width: "300px" }}>
          <InputLabel id="demo-simple-select-label">
            AddOn Categories
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={addonData.addonCategories}
            label="Age"
            onChange={(e) =>
              setAddonData({
                ...addonData,
                addonCategories: e.target.value as string,
              })
            }
          >
            {addonCategories.map((addOnCat) => {
              return (
                <MenuItem value={addOnCat.id} key={addOnCat.id}>
                  {addOnCat.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={check as boolean}
              onClick={() => {
                setAddonData({ ...addonData, is_avaiable: !check });
                setCheck((prev) => !prev);
              }}
            />
          }
          label="IsAvaiable"
        />
        <Box>
          <Button
            variant="contained"
            onClick={() => (update ? updateHandler() : createNewAddon())}
            sx={{ margin: "2rem" }}
          >
            {update ? "Update" : "Submit"}
          </Button>
          {update ? (
            <Button variant="outlined" onClick={() => closeHandler()}>
              Cancel
            </Button>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Dialog>
  );
}

export default EditAddon;
