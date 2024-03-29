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
import FileDropZone from "./FileDropZone";
import { config } from "../../config/config";
import { LoadingButton } from "@mui/lab";
import { create } from "domain";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { AppData } from "@/store/slices/appSlice";
import { addMenu } from "@/store/slices/menuSlice";
interface Props {
  open: () => void;
  close: () => void;
  openModel: boolean;
}
export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
export default function EditModel({ open, close, openModel }: Props) {
  const dispatch = useAppDispatch();
  const [menus, setMenus] = useState<Menu>({
    name: "",
    price: undefined,
    addonCategoriesIds: [],
    menuCategoriesIds: [],
    asseturl: "",
    description: "",
  });
  const [price, setPrice] = useState<string | number>(0);
  const [name, setName] = useState<string>("");
  const [menuImage, setMenuImage] = useState<File>();
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<number[]>(
    []
  );
  const [selectedMenuCategoriesIds, setSelectedMenuCategoriesIds] = useState<
    number[]
  >([]);
  const [visible, setVisible] = useState(false);

  const onFileSelected = (files: File[]) => {
    setMenuImage(files[0]);
  };

  const {
    menuCategories,
    menusMenuCategoriesLocations,
    addonCategories,
    menus: Menus,
    menuAddonCategories,
  } = useAppSelector(AppData);
  const [locationId, setLocationId] = useLocalStorage("locationId")!;

  const createMenu = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (menus.price === undefined) return;
    if (!menus?.name || menus?.price < 0) return;
    if (menuImage) {
      const formData = new FormData();
      formData.append("files", menuImage as Blob);
      const response = await fetch(`${config.backofficeUrl}/assets`, {
        method: "POST",
        body: formData,
      });
      const responseJson = await response.json();
      const asseturl = responseJson.assetUrl;
      menus.asseturl = asseturl;
    }

    const response = await fetch(
      `${config.backofficeUrl}/menus?locationId=${locationId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menus),
      }
    );
    if (response.ok) {
      const jsonData = await response.json();
      setMenus({
        name: "",
        price: undefined,
        addonCategoriesIds: [],
        menuCategoriesIds: [],
        asseturl: "",
        description: "",
      });
      // fetchData();
      dispatch(addMenu(jsonData));
      close();
    }
  };

  const handleChange = (e: SelectChangeEvent<number[] | []>) => {
    const currentCategory = e.target.value as number[];
    setSelectedCategoriesIds(currentCategory);
    setMenus({ ...menus, addonCategoriesIds: currentCategory });
    if (menus.name && menus.price) setVisible(true);
  };
  const handleChangeForMenuCategories = (
    e: SelectChangeEvent<number[] | []>
  ) => {
    const currentMenuCategories = e.target.value as number[];
    setSelectedMenuCategoriesIds(currentMenuCategories);
    setMenus({ ...menus, menuCategoriesIds: currentMenuCategories });
  };
  const buttonVisible = () => {
    if (menus.name && menus.price) {
      setVisible(true);
    }
  };
  ///this section is to filter out relate addonsCategories
  const CategoriesIds = menusMenuCategoriesLocations.filter(
    (mcl) => mcl.locations_id === parseInt(locationId)
  );
  const filteredMenuIds = Menus.filter((item1) => {
    return CategoriesIds.some((item2) => item1.id === item2.menus_id);
  }).map((item) => item.id);
  const filteredAddonCategoriesIds = menuAddonCategories
    .filter((menuAddonCate) =>
      filteredMenuIds.includes(menuAddonCate.menus_id as number)
    )
    .map((item) => item.addon_categories_id);
  const filteredAddonCategories = addonCategories.filter((addonCat) =>
    filteredAddonCategoriesIds.includes(addonCat.id)
  );

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
                  ...menus,
                  name: event.target.value,
                  price: menus?.price ? menus.price : 0,
                  addonCategoriesIds: selectedCategoriesIds,
                });
                buttonVisible();
              }}
            />
            <TextField
              label="Price*"
              variant="outlined"
              type="number"
              sx={{ mb: 2 }}
              value={price ? price : ""}
              onChange={(event) => {
                setPrice(event.target.value);
                setMenus({
                  ...menus,
                  price: parseInt(event.target.value),
                  name: menus?.name ? menus.name : "",
                  addonCategoriesIds: selectedCategoriesIds,
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
                  ...menus,
                  price: menus.price ? menus.price : 0,
                  name: menus?.name ? menus.name : "",
                  addonCategoriesIds: menus.addonCategoriesIds,
                  description: event.target.value,
                });
              }}
            />
            <FormControl sx={{ mb: 1, width: 300 }} required>
              <InputLabel
                id="demo-multiple-checkbox-label"
                sx={{ backgroundColor: "white", px: 2 }}
              >
                Addons Categoriey
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedCategoriesIds}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(value) => {
                  const selectedCategory = selectedCategoriesIds.map(
                    (selectedCategoryId) => {
                      return addonCategories.find(
                        (addonCategory) =>
                          addonCategory.id === selectedCategoryId
                      );
                    }
                  );
                  return selectedCategory
                    .map((category) => category?.name)
                    .join(",");
                }}
              >
                {addonCategories.map((addonCategory) => (
                  <MenuItem key={addonCategory.id} value={addonCategory.id}>
                    <Checkbox
                      checked={
                        addonCategory.id &&
                        selectedCategoriesIds.includes(addonCategory.id)
                          ? true
                          : false
                      }
                    />
                    <ListItemText primary={addonCategory.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* { end addon cate} */}
            <FormControl sx={{ mb: 1, width: 300 }} required>
              <InputLabel
                id="menucat-multiple-checkbox"
                sx={{ backgroundColor: "white", px: 2 }}
              >
                Menus Categoriey
              </InputLabel>
              <Select
                labelId="menucat-multiple-checkbox"
                id="menucat-multiple-checkbox"
                multiple
                value={selectedMenuCategoriesIds}
                onChange={handleChangeForMenuCategories}
                input={<OutlinedInput label="Tag" />}
                renderValue={(value) => {
                  const selectedCategory = selectedMenuCategoriesIds.map(
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
                {menuCategories.map((menuCategory) => (
                  <MenuItem key={menuCategory.id} value={menuCategory.id}>
                    <Checkbox
                      checked={
                        menuCategory.id &&
                        selectedMenuCategoriesIds.includes(menuCategory.id)
                          ? true
                          : false
                      }
                    />
                    <ListItemText primary={menuCategory.name} />
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
