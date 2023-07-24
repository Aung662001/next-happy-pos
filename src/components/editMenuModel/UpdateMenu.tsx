import {
  Box,
  Button,
  Modal,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Menu } from "../../typings/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { config } from "@/config/config";
import { useRouter } from "next/router";
import DeleteDialog from "../DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { AppData } from "@/store/slices/appSlice";
import { removeMenu } from "@/store/slices/menuSlice";
interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  menus: Partial<Menu>;
  setMenus: React.Dispatch<React.SetStateAction<Partial<Menu>>>;
}
export default function UpdateMenu({ open, setOpen, menus, setMenus }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<number[]>(
    []
  );

  const { menuCategories, menusMenuCategoriesLocations } =
    useAppSelector(AppData);
  const [locationId, setLocationId] = useLocalStorage("locationId")!;
  const [openArchived, setOpenArchived] = useState(false);
  //   const createMenu = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     if (menus.price === undefined) return;
  //     if (!menus?.name || menus?.price < 0) return;
  //     if (menuImage) {
  //       const formData = new FormData();
  //       formData.append("files", menuImage as Blob);
  //       const response = await fetch(`${config.backofficeUrl}/assets`, {
  //         method: "POST",
  //         body: formData,
  //       });
  //       const responseJson = await response.json();
  //       const asseturl = responseJson.assetUrl;
  //       menus.asseturl = asseturl;
  //     }

  //     await fetch(`${config.backofficeUrl}/menus?locationId=${locationId}`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(menus),
  //     });
  //     fetchData();
  //   };
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
    const currentCategory = e.target.value as number[];
    setSelectedCategoriesIds(currentCategory);
    // setMenus({ ...menus, menuCategoriesIds: currentCategory });
  };

  const CategoriesIds = menusMenuCategoriesLocations.filter(
    (mcl) => mcl.locations_id === parseInt(locationId)
  );

  const menuCategoriesAtCurrentLocation = menuCategories.filter((item1) => {
    return CategoriesIds.some((item2) => item1.id === item2.menu_categories_id);
  });
  function closeHandler() {
    setMenus({
      ...menus,
      name: "",
      price: undefined,
      // menuCategoriesIds: [],
      asseturl: "",
      description: "",
    });
    setOpen(false);
  }

  async function UpdateMenu(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!menus.name || !menus.price) {
      return;
    }
    const response = await fetch(
      `${config.backofficeUrl}/menus?id=${menus.id}`,
      {
        method: "PUT",
        body: JSON.stringify(menus),
      }
    );
    if (response.ok) {
      closeHandler();
      // fetchData();
    }
  }
  const deleteHandler = async () => {
    const response = await fetch(
      `${config.backofficeUrl}/menus?id=${menus.id}&locationId=${locationId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      setOpenArchived(false);
      setOpen(false);
      // fetchData();
      dispatch(removeMenu(menus.id!));

      router.push("/backoffice/menus");
    }
  };
  return (
    <Modal
      open={open}
      onClose={closeHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={(e) => UpdateMenu(e)}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 300,
              m: "0 auto",
            }}
          >
            <h1 style={{ textAlign: "center" }}>Update menu</h1>
            <TextField
              label="Name*"
              variant="outlined"
              sx={{ mb: 2 }}
              value={menus.name}
              onChange={(event) => {
                setMenus({
                  ...menus,
                  name: event.target.value,
                  price: menus?.price ? menus.price : 0,
                  menuCategoriesIds: selectedCategoriesIds,
                });
              }}
            />
            <TextField
              label="Price*"
              variant="outlined"
              type="number"
              sx={{ mb: 2 }}
              value={menus.price ? menus.price : ""}
              onChange={(event) => {
                setMenus({
                  ...menus,
                  price: parseInt(event.target.value),
                  name: menus?.name ? menus.name : "",
                  menuCategoriesIds: selectedCategoriesIds,
                });
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
                  ...menus,
                  price: menus.price ? menus.price : 0,
                  name: menus?.name ? menus.name : "",
                  // menuCategoriesIds: menus.menuCategoriesIds,
                  description: event.target.value,
                });
              }}
            />
            {/* <FormControl sx={{ mb: 1, width: 300 }} required>
              <InputLabel
                id="demo-multiple-checkbox-label"
                sx={{ backgroundColor: "white", px: 2 }}
              >
                Menu Categoriey
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={menus.menuCategoriesIds}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(value) => {
                  const selectedCategory = menus.menuCategoriesIds!.map(
                    (selectedCategoryId) => {
                      return menuCategories.find(
                        (menuCategory) => menuCategory.id === selectedCategoryId
                      );
                    }
                  );
                  return selectedCategory
                    .map((category) => category?.name)
                    .join(",");
                }}
              >
                {menuCategoriesAtCurrentLocation.map((menuCategory) => (
                  <MenuItem key={menuCategory.id} value={menuCategory.id}>
                    <Checkbox
                      checked={
                        menuCategory.id &&
                        selectedCategoriesIds.includes(menuCategory.id)
                          ? true
                          : false
                      }
                    />
                    <ListItemText primary={menuCategory.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}

            <Button variant="contained" type="submit" sx={{ marginTop: 3 }}>
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              type="button"
              sx={{ marginTop: 3 }}
              onClick={() => setOpenArchived(true)}
            >
              Delete
            </Button>
          </Box>
          <DeleteDialog
            open={openArchived}
            setOpen={setOpenArchived}
            callback={deleteHandler}
            title={`Do You Want to Delete this Menu ${menus.name}`}
          />
        </Box>
      </form>
    </Modal>
  );
}
