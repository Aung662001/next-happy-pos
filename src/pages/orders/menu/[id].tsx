import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import { increaseQuantity, decreaseQuantity } from "@/utils/addorder";
interface cart {
  menuId: number | undefined;
  addonIds: number[] | [];
  quantity: number;
}
const OrderMenu = () => {
  const router = useRouter();
  const { locationId, tableId } = router.query;
  const menuId = parseInt(router.query.id as string);
  const { menuAddonCategories, addons, addonCategories } =
    useContext(OrderContext);
  const addonCategoriesId = menuAddonCategories
    .filter((mac) => mac.menus_id === menuId)
    .map((all) => all.addon_categories_id);
  const connectedAddonCategories = addonCategories.filter((addonCategories) =>
    addonCategoriesId.includes(addonCategories.id)
  );
  const requireAddonCount = connectedAddonCategories.filter(
    (addonCate) => addonCate.is_required === true
  ).length;
  const [quantity, setQuantity] = useState(1);
  const [disabled, setdisabled] = useState(false);
  const [count, setCount] = useState<number>();
  const [requireAddon, setRequireAddon] = useState<number[]>([]);
  const [optional, setOptional] = useState<number[]>([]);
  const [cartData, setCartData] = useState<cart>({
    menuId: menuId || undefined,
    addonIds: [],
    quantity: 1,
  });
  useEffect(() => {
    if (count === requireAddonCount) {
      setdisabled(true);
    }
  }, [count]);
  const radioOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const addonId = parseInt(e.target.value);
    const addonCatId = addons.find(
      (addon) => addon.id === addonId
    )?.addon_categories_id;
    if (addonCatId) {
      const allRequireAddonInOneCate = addons
        .filter((addon) => {
          return addon.addon_categories_id === addonCatId;
        })
        .map((all) => all.id);
      const isExist = requireAddon.find((addonId) => {
        return allRequireAddonInOneCate.find((allAddons) => {
          return addonId === allAddons;
        });
      });
      if (isExist) {
        console.log("exist");
        setRequireAddon([
          ...requireAddon.filter((addon) => addon !== isExist),
          addonId,
        ]);
      } else {
        setRequireAddon([...requireAddon, addonId]);
      }
    }
    setCount((prev) => (prev ? prev + 1 : 1));
  };
  const checkBoxCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(e.target.value);
    optional.includes(id)
      ? setOptional([...optional.filter((opt) => opt !== id)])
      : setOptional([...optional, id]);
  };
  const renderAddons = (addonCategorieId: number, isRequire: boolean) => {
    const relatedAddons = addons.filter((addon) => {
      return addon.addon_categories_id === addonCategorieId;
    });
    return relatedAddons.map((addon) => {
      return (
        <FormControlLabel
          value={addon.id}
          control={
            isRequire ? (
              <Radio onChange={(e) => radioOnChange(e)} />
            ) : (
              <Checkbox onChange={(e) => checkBoxCheck(e)} />
            )
          }
          label={addon.name}
          key={addon.id}
        />
      );
    });
  };
  function addToCart() {
    setCartData({
      ...cartData,
      menuId: menuId,
      addonIds: [...requireAddon, ...optional],
      quantity: quantity,
    });
  }
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
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{
                width: "300px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{addonCategorie.name}</span>
              <span
                style={{
                  backgroundColor: `${
                    addonCategorie.is_required ? "orange" : "gray"
                  }`,
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: ".2rem",
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
              {renderAddons(
                addonCategorie.id,
                addonCategorie.is_required as boolean
              )}
            </RadioGroup>
          </FormControl>
        );
      })}
      <Box sx={{ display: "flex", gap: 3 }}>
        <Button
          variant="contained"
          sx={{ borderRadius: "10px" }}
          onClick={() => increaseQuantity(quantity, setQuantity)}
        >
          +
        </Button>
        <span style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
          {quantity}
        </span>
        <Button
          variant="contained"
          sx={{ borderRadius: "10px" }}
          onClick={() => decreaseQuantity(quantity, setQuantity)}
        >
          -
        </Button>
      </Box>
      <span className="tooltiptext">Double Click To Add</span>
      <Button
        variant="contained"
        onClick={() => addToCart()}
        onDoubleClick={() => console.log(cartData)}
        disabled={!disabled}
        aria-label="double click"
        className="tooltip"
      >
        Add to Cart
      </Button>
    </Box>
  );
};

export default OrderMenu;
