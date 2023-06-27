import { OrderLine } from "@/typings/types";
import {
  addon_categories as AddonCategories,
  addons as Addons,
} from "@prisma/client";

export const takeRelatedOtherAddonsIds = (
  id: number,
  orderLine: OrderLine[],
  addonCategories: AddonCategories[],
  addons: Addons[]
) => {
  const connectedAddonCategoryId = addons.find(
    (addon) => addon.id === id
  )?.addon_categories_id;
  const otherAddonInSelectedCategories = addons.filter(
    (addon) => addon.addon_categories_id === connectedAddonCategoryId
  );
  const otherAddonsIds = otherAddonInSelectedCategories.map(
    (other) => other.id
  );
  return otherAddonsIds;
};
