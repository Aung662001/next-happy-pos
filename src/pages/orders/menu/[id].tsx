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
import { menus as Menu } from "@prisma/client";
import { takeRelatedOtherAddonsIds } from "@/utils/otherFunctions";
interface cart {
  menu: Menu;
  addonIds: number[] | [];
  quantity: number;
}
const OrderMenu = () => {
  const router = useRouter();
  const { locationId, tableId } = router.query;
  const menuId = parseInt(router.query.id as string);
  const {
    menuAddonCategories,
    addons,
    addonCategories,
    menus,
    updateData,
    orderLines,
    ...data
  } = useContext(OrderContext);
  const [quantity, setQuantity] = useState(1);
  const [disabled, setdisabled] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [firseClick, setFirstClick] = useState(true);
  const [requireAddon, setRequireAddon] = useState<number[]>([]);
  const [optional, setOptional] = useState<number[]>([]);
  const [selectedAddonIds, setSelectedAddonIds] = useState<
    (number | undefined)[] | undefined
  >();
  const [updating, setUpdating] = useState(false);
  const menu = menus.find((menu) => menu.id === menuId)!;
  const [cartData, setCartData] = useState<cart>({
    menu: menu,
    addonIds: [],
    quantity: 1,
  });
  //for update an cart item
  useEffect(() => {
    const found = orderLines.find((orderLine) => orderLine.menu.id === menuId);
    if (found) {
      setUpdating(true);
      setQuantity(found.quantity);
      const allAddonIds = addons
        .filter((addon) =>
          addonCategoriesId.includes(addon.addon_categories_id)
        )
        .map((a) => a.id);
      const selectedAddons = orderLines.map((orderLine) => {
        return orderLine.addons?.filter((addon) =>
          allAddonIds.includes(addon.id as number)
        );
      })[0];
      setSelectedAddonIds(
        selectedAddons &&
          selectedAddons.map((selected) => selected && selected.id)
      );
      const { requireAddonIdsInCart, optionalAddonIdsInCart } = filterAddon();
      console.log(requireAddonIdsInCart, optionalAddonIdsInCart, "log");
      setRequireAddon(requireAddonIdsInCart as number[]);
      setOptional(optionalAddonIdsInCart as number[]);
    }
  }, []);
  const addonCategoriesId = menuAddonCategories
    .filter((mac) => mac.menus_id === menuId)
    .map((all) => all.addon_categories_id);
  const connectedAddonCategories = addonCategories.filter((addonCategories) =>
    addonCategoriesId.includes(addonCategories.id)
  );
  //this is for update in first Enter
  const filterAddon = () => {
    let requireAddonIdsInCart, optionalAddonIdsInCart;
    const requireAddonCateForFirstEnter = connectedAddonCategories
      .filter((addonCate) => addonCate.is_required === true)
      .map((addonCate) => addonCate.id);
    const requireAddonsForFirstEnter = addons.filter((addon) => {
      return requireAddonCateForFirstEnter.includes(
        addon.addon_categories_id as number
      );
    });
    const requireAddonIdsForFirstEnter = requireAddonsForFirstEnter.map(
      (addon) => addon.id
    );
    const filetrOrderLines = orderLines.filter(
      (orderLine) => orderLine.menu.id === menuId
    );
    const allAddonIdsInCart = filetrOrderLines.map((ol) =>
      ol.addons?.map((addon) => addon.id)
    )[0];
    if (allAddonIdsInCart) {
      //filter all require addon that selected in cart
      requireAddonIdsInCart = allAddonIdsInCart.filter((all) =>
        requireAddonIdsForFirstEnter.includes(all as number)
      );
      //all optional addon id in cart for update
      optionalAddonIdsInCart = allAddonIdsInCart.filter(
        (all) => !requireAddonIdsForFirstEnter.includes(all as number)
      );
    }
    console.log(requireAddonIdsInCart);
    return { requireAddonIdsInCart, optionalAddonIdsInCart };
  };
  //
  const requireAddonCount = connectedAddonCategories.filter(
    (addonCate) => addonCate.is_required === true
  ).length;
  useEffect(() => {
    if (count === requireAddonCount) {
      setdisabled(true);
    }
    updating && setdisabled(true);
  }, [count, updating]);
  const radioOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const connectedAddonIds = takeRelatedOtherAddonsIds(
      Number(e.target.value),
      orderLines,
      addonCategories,
      addons
    );

    const addonId = parseInt(e.target.value);
    //find addonCategoriesId that related to target
    const addonCatId = addons.find(
      (addon) => addon.id === addonId
    )?.addon_categories_id;
    if (addonCatId) {
      //addonIds that connected with selected addon
      // const allRequireAddonInOneCate = addons
      //   .filter((addon) => {
      //     return addon.addon_categories_id === addonCatId;
      //   })
      //   .map((all) => all.id);
      ///
      const isExist = requireAddon.find((addonId) => {
        return connectedAddonIds.find((allAddons) => {
          return addonId === allAddons;
        });
      });
      if (isExist) {
        //if updating
        if (updating) {
          setSelectedAddonIds([
            ...requireAddon.filter((addon) => addon !== isExist),
            addonId,
          ]);
        }
        setRequireAddon([
          ...requireAddon.filter((addon) => addon !== isExist),
          addonId,
        ]);
      } else {
        if (updating) {
          setSelectedAddonIds([...requireAddon, addonId]);
        }
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
              <Radio
                onChange={(e) => radioOnChange(e)}
                checked={selectedAddonIds?.includes(addon.id)}
              />
            ) : (
              <Checkbox
                onChange={(e) => checkBoxCheck(e)}
                checked={optional.includes(addon.id)}
              />
            )
          }
          label={addon.name}
          key={addon.id}
        />
      );
    });
  };
  function setData() {
    setFirstClick(false);
    setCartData({
      ...cartData,
      menu: menu,
      addonIds: [...requireAddon, ...optional],
      quantity: quantity,
    });
  }
  //to add to cart
  const addToCart = () => {
    const selectedAddons = addons.filter(
      (addon) => requireAddon.includes(addon.id) || optional.includes(addon.id)
    );
    if (updating) {
      updateData({
        ...data,
        menuAddonCategories,
        addonCategories,
        menus,
        addons,
        orderLines: [
          ...orderLines.filter((ol) => ol.menu.id !== menuId),
          {
            menu,
            addons: [...selectedAddons],
            quantity,
          },
        ],
      });
      router.push(`../cart?locationId=${locationId}&tableId=${tableId}`);
      return;
    }
    updateData({
      ...data,
      menuAddonCategories,
      addonCategories,
      menus,
      addons,
      orderLines: [...orderLines, { menu, addons: selectedAddons, quantity }],
    });
    router.push(`../?locationId=${locationId}&tableId=${tableId}`);
  };
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
      <h1>Select Addon For {menu ? menu.name : menuId}</h1>
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
      {firseClick && (
        <Button
          variant="contained"
          onClick={() => setData()}
          disabled={!disabled}
          sx={{ marginBottom: "5rem" }}
        >
          Confirm
        </Button>
      )}
      {!firseClick && (
        <Button
          variant="contained"
          onClick={() => addToCart()}
          disabled={!disabled}
          sx={{ marginBottom: "5rem" }}
        >
          {updating ? "Update" : "Add To Cart"}
        </Button>
      )}
    </Box>
  );
};

export default OrderMenu;
