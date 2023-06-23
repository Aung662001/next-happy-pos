import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { table } from "console";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { OrderContext } from "@/contexts/OrderContext";

const OrderMenu = () => {
  const router = useRouter();
  const { locationId, tableId } = router.query;
  const menuId = router.query.id;
  const { menuAddonCategories, addons, addonCategories } =
    useContext(OrderContext);
  const addonCategoriesId = menuAddonCategories
    .filter((mac) => mac.menus_id === parseInt(menuId as string))
    .map((all) => all.addon_categories_id);
  const connectedAddonCategories = addonCategories.filter((addonCategories) =>
    addonCategoriesId.includes(addonCategories.id)
  );
  const [quantity, setQuantity] = useState(1);
  const [requireAddon, setRequireAddon] = useState<number[]>([]);

  const radioOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
      }}
    >
      <h1>Select Addon For {menuId}</h1>
      {connectedAddonCategories.map((addonCategorie) => {
        return (
          <FormControl key={addonCategorie.id}>
            <FormLabel id="demo-radio-buttons-group-label" sx={{}}>
              <span>{addonCategorie.name}</span>
              <span
                style={{
                  backgroundColor: "gray",
                  border: "1px solid black",
                  borderRadius: "10px",
                }}
              >
                {addonCategorie.is_required === true ? "Required" : "Optional"}
              </span>
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {addons.map((addon) => {
                return (
                  <FormControlLabel
                    value={addon.id}
                    control={
                      addonCategorie.is_required ? (
                        <Radio onChange={(e) => radioOnChange(e)} />
                      ) : (
                        <Checkbox />
                      )
                    }
                    label={addon.name}
                    key={addon.id}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        );
      })}
      <Box sx={{ display: "flex", gap: 3 }}>
        <Button variant="contained">+</Button>
        <span style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
          {quantity}
        </span>
        <Button variant="contained" sx={{ borderRadius: "10px" }}>
          -
        </Button>
      </Box>
      <Button variant="contained" sx={{ borderRadius: "10px" }}>
        Add to Cart
      </Button>
    </Box>
  );
};

export default OrderMenu;
