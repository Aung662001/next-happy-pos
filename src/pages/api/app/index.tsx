import { prisma } from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.query.email as string;
  const user = await prisma.users.findFirst({
    where: { email: email },
  });
  const company_id = user?.companies_id as number;
  const location = await prisma.locations.findMany({
    where: {
      companies_id: company_id,
    },
  });
  const menus = await prisma.menus.findMany();
  const addon = await prisma.addons.findMany();
  const addonCategories = await prisma.addon_categories.findMany();
  const menuCategories = await prisma.menu_categories.findMany();
  const menusLocations = await prisma.menus_locations.findMany();
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
