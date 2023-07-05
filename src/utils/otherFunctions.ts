import { OrderLine } from "@/typings/types";
import {
  addon_categories as AddonCategories,
  addons as Addons,
  orderLine as OrderLines,
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
interface Prop {
  orderLines: OrderLines[];
  id: number;
}
export const getConnectedOrderLines = ({ orderLines, id }: Prop) => {
  const connectedOrderLines = orderLines.filter(
    (orderline) => orderline.orders_id === id
  );
  return connectedOrderLines;
};
export const getOrderLineStatus = (
  menuId: number,
  orderId: number,
  orderLines: OrderLines[]
) => {
  const connectedOrderLines = orderLines.filter(
    (orderLine) =>
      orderLine.menus_id === menuId && orderLine.orders_id === orderId
  );
  return connectedOrderLines[0].order_status;
};
