import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   const locationIds = Locations.map((location) => location.id as number);
  //   //menuLocations
  //   const menusLocations = await prisma.menus_locations.findMany({
  //     where: {
  //       locations_id: {
  //         in: locationIds,
  //       },
  //     },
  //   });
  //   const menuIds = menusLocations.map((ml) => ml.menus_id);
  //   //menus
  //   const menus = await prisma.menus.findMany({
  //     where: {
  //       id: {
  //         in: menuIds,
  //       },
  //     },
  //   });
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
  //   const menuMenuCategories = await prisma.menus_menu_categories.findMany({
  //     where: {
  //       menus_id: {
  //         in: menuIds,
  //       },
  //     },
  //   });
  //   const menuCategoriesIds = menuMenuCategories.map(
  //     (mc) => mc.menu_categories_id
  //   ) as number[];
  //   const menuCategories = await prisma.menu_categories.findMany();
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
  res.send(200);
}
