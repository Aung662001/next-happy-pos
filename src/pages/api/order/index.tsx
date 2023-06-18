import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const locationid = query.locationId as string;
  const locationId = parseInt(locationid);
  if (!locationId) return res.status(400).json({ message: "bad request" });
  // const locationIds = Locations.map((location) => location.id as number);
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
    },
  });
  //   const menuAddonCategoriesIds = await prisma.menus_addon_categories.findMany({
  //     where: {
  //       menus_id: {
  //         in: menuIds,
  //       },
  //     },
  //   });
  //   const addonCategoriesIds = menuAddonCategoriesIds.map(
  //     (ma) => ma.addon_categories_id
  //   ) as number[];
  //   const addonCategories = await prisma.addon_categories.findMany({
  //     where: {
  //       id: {
  //         in: addonCategoriesIds,
  //       },
  //     },
  //   }); //
  //   const addons = await prisma.addons.findMany({
  //     where: {
  //       addon_categories_id: {
  //         in: addonCategoriesIds,
  //       },
  //     },
  //   });
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
  //   const companies = await prisma.companies.findMany({
  //     where: {
  //       id: company_id,
  //     },
  //   });
  //   await prisma.$disconnect();
  //   res.send({
  //     menus,
  //     Locations,
  //     addons,
  //     addonCategories,
  //     menuCategories,
  //     menusLocations,
  //     companies,
  //   });
  return res.send(200);
  res.send({
    location,
    menuCategories,
    menus,
    menusMenuCategoriesLocations,
  });
}
