import { prisma } from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.query.email as string;

  //user
  const user = await prisma.users.findFirst({
    where: { email: email },
  });
  const company_id = user?.companies_id as number;
  //location
  const Locations = await prisma.locations.findMany({
    where: {
      companies_id: company_id,
    },
  });
  const locationIds = Locations.map((location) => location.id as number);
  //menuLocations
  const menusLocations = await prisma.menus_locations.findMany({
    where: {
      locations_id: {
        in: locationIds,
      },
    },
  });
  const menuIds = menusLocations.map((ml) => ml.menus_id);
  //menus
  const menus = await prisma.menus.findMany({
    where: {
      id: {
        in: menuIds,
      },
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
  const addon = await prisma.addons.findMany({
    where: {
      addon_categories_id: {
        in: addonCategoriesIds,
      },
    },
  });
  const menuMenuCategories = await prisma.menus_menu_categories.findMany({
    where: {
      menus_id: {
        in: menuIds,
      },
    },
  });
  const menuCategoriesIds = menuMenuCategories.map(
    (mc) => mc.menu_categories_id
  ) as number[];
  const menuCategories = await prisma.menu_categories.findMany({
    where: {
      id: {
        in: menuCategoriesIds,
      },
    },
  });
  const companies = await prisma.companies.findMany({
    where: {
      id: company_id,
    },
  });
  res.send({
    menus,
    Locations,
    addon,
    addonCategories,
    menuCategories,
    menusLocations,
    companies,
  });
}
