import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const locationid = query.locationId as string;
  const locationId = parseInt(locationid);
  if (!locationId) return res.status(400).json({ message: "bad request" });
  //menuLocations
  const menusMenuCategoriesLocations =
    await prisma.menus_menu_categories_locations.findMany({
      where: {
        locations_id: locationId,
      },
    });
  const menuIds = menusMenuCategoriesLocations
    .map((ml) => ml.menus_id)
    .filter((mcl) => mcl !== null) as number[];
  //menus
  const menus = await prisma.menus.findMany({
    where: {
      id: {
        in: menuIds,
      },
      is_archived: false,
    },
  });
  const menuAddonCategoriesIds = await prisma.menus_addon_categories.findMany({
    where: {
      menus_id: {
        in: menuIds,
      },
    },
  });
  const addonCategoriesIds = menuAddonCategoriesIds.map(
    (ma) => ma.addon_categories_id
  ) as number[];
  const addonCategories = await prisma.addon_categories.findMany({
    where: {
      id: {
        in: addonCategoriesIds,
      },
    },
  }); //
  const addons = await prisma.addons.findMany({
    where: {
      addon_categories_id: {
        in: addonCategoriesIds,
      },
    },
  });
  const location = await prisma.locations.findFirst({
    where: {
      id: locationId,
    },
  });
  const menuCategoriesIds = menusMenuCategoriesLocations.map(
    (MCL) => MCL.menu_categories_id
  );
  const menuCategories = await prisma.menu_categories.findMany({
    where: {
      id: {
        in: menuCategoriesIds,
      },
    },
  });
  const menuAddonCategories = await prisma.menus_addon_categories.findMany({
    where: {
      addon_categories_id: {
        in: addonCategoriesIds,
      },
    },
  });
  const orders = await prisma.orders.findMany({
    where: {
      location_id: {
        in: locationId,
      },
    },
  });
  const orderIds = orders.map((order) => order.id);
  const orderLines = await prisma.orderLine.findMany({
    where: {
      id: {
        in: orderIds,
      },
    },
  });
  await prisma.$disconnect();
  res.send({
    location,
    menuCategories,
    menus,
    addonCategories,
    addons,
    menusMenuCategoriesLocations,
    menuAddonCategories,
    orders,
    orderLines,
  });
}
