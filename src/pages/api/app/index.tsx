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
  const location = await prisma.locations.findMany({
    where: {
      companies_id: company_id,
    },
  });
  const locationIds = location.map((location) => location.id as number);
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
  console.log(menus);
  const addon = await prisma.addons.findMany();
  const addonCategories = await prisma.addon_categories.findMany();
  const menuCategories = await prisma.menu_categories.findMany();
  const company = await prisma.companies.findMany({
    where: {
      id: company_id,
    },
  });
  res.send({
    menus,
    location,
    addon,
    addonCategories,
    menuCategories,
    menusLocations,
    company,
  });
}
