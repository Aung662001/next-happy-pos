import DeleteDialog from "@/components/DeleteDialog";
import { style } from "@/components/editMenuModel/CreateMenuModel";
import { config } from "@/config/config";
import { BackofficeContext } from "@/contexts/BackofficeContext";
import { useRouter } from "next/router";

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
import { SetStateAction, useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  addAddonCategories,
  removeAddonCAtegories,
} from "@/store/slices/addonCategoriesSlice";
import { AppData } from "@/store/slices/appSlice";
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
  const router = useRouter();
  const { addonCategories: addonCategoriesFromState } = useAppSelector(AppData);
  const toRemoveAddonCategories = addonCategoriesFromState.find(
    (item) => item.id === addonCategories.id
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const dispatch = useAppDispatch();
  const deleteHandler = async () => {
    const response = await fetch(
      `${config.backofficeUrl}/addonCategories?id=${addonCategories.id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      setOpenDeleteDialog(false);
      setOpen(false);
      // fetchData();
      dispatch(removeAddonCAtegories(toRemoveAddonCategories!));
      router.push("/backoffice/addon-categories");
    }
  };
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
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button
            variant="contained"
            sx={{ marginTop: 2 }}
            onClick={update ? updateHandler : submitHandler}
          >
            {update ? "Update" : "Create"}
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ marginTop: 2, display: `${update ? "" : "none"}` }}
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete
          </Button>
        </Box>
        <DeleteDialog
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          title={`Dou You Want To Delete This ${addonCategories.name}`}
          callback={deleteHandler}
        />
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
      // fetchData();
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
    const data = await response.json();
    if (response.ok) {
      setOpen(false);
      setAddonCategories({ ...addonCategories, name: "" });
      // fetchData();
      dispatch(addAddonCategories(data));
    }
  }
};
export default EditAddonCategories;
