import { style } from "@/components/editMenuModel/CreateMenuModel";
import { config } from "@/config/config";
import { BackofficeContext } from "@/contexts/BackofficeContext";

import {
  Modal,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { SetStateAction, useContext } from "react";
interface EditAddonCategories {
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
  update: boolean;
  setUpdate: (value: SetStateAction<boolean>) => void;
  setAddonCategories: (
    value: SetStateAction<{
      id: null | number;
      name: string;
      isRequired: string;
    }>
  ) => void;
  addonCategories: {
    id: null | number;
    name: string;
    isRequired: string;
  };
}
const EditAddonCategories = (props: EditAddonCategories) => {
  const {
    open,
    setOpen,
    addonCategories,
    setAddonCategories,
    update,
    setUpdate,
  } = props;
  const { fetchData } = useContext(BackofficeContext);
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setUpdate(false);
        setAddonCategories({
          ...addonCategories,
          name: "",
        });
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1 style={{ textAlign: "center" }}>Create a AddonCategories</h1>
        <TextField
          label="Name"
          variant="outlined"
          sx={{ mb: 2, width: "100%" }}
          value={addonCategories.name}
          onChange={(e) =>
            setAddonCategories({ ...addonCategories, name: e.target.value })
          }
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">IsRequired</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={addonCategories.isRequired}
            onChange={(e) => {
              setAddonCategories({
                ...addonCategories,
                isRequired: e.target.value,
              });
            }}
            label="Is_Required"
          >
            <MenuItem value={"false"}>False</MenuItem>
            <MenuItem value={"true"}>True</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={update ? updateHandler : submitHandler}
        >
          {update ? "Update" : "Create"}
        </Button>
      </Box>
    </Modal>
  );
  async function updateHandler() {
    const { name, isRequired } = addonCategories;
    if (!name || !isRequired) {
      return;
    }
    const response = await fetch(`${config.backofficeUrl}/addonCategories`, {
      method: "PUT",
      body: JSON.stringify(addonCategories),
    });
    if (response.ok) {
      setUpdate(false);
      setOpen(false);
      setAddonCategories({
        ...addonCategories,
        name: "",
        id: null,
      });
      fetchData();
    }
  }
  async function submitHandler() {
    if (!addonCategories.name || !addonCategories.isRequired) {
      return;
    }
    const response = await fetch(`${config.backofficeUrl}/addonCategories`, {
      method: "POST",
      body: JSON.stringify(addonCategories),
    });
    if (response.ok) {
      setOpen(false);
      setAddonCategories({ ...addonCategories, name: "" });
      fetchData();
    }
  }
};
export default EditAddonCategories;
