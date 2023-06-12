import { prisma } from "@/utils/db";
import { METHODS } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const locationId = parseInt(req.query.locationId as string);
    const {
      name,
      price,
      menuCategoriesIds,
      asseturl = "",
      description = "",
    } = req.body;

    const invalid = !name && !price && price < 0 && !menuCategoriesIds.length;
    if (invalid) return res.status(400).json({ error: "invalid input values" });
    const menu = await prisma.menus.create({
      data: {
        name: name,
        price: price,
        description,
        asseturl: asseturl,
      },
    });
    const menuId = menu.id;
    if (menuCategoriesIds.length > 1) {
      const data = menuCategoriesIds.map((menuCategoryId: number) => ({
        menus_id: menuId,
        locations_id: locationId,
        menu_categories_id: menuCategoryId,
      }));
      await prisma.menus_menu_categories_locations.createMany({
        data,
      });
    } else {
      await prisma.menus_menu_categories_locations.create({
        data: {
          menus_id: menuId,
          locations_id: locationId,
          menu_categories_id: menuCategoriesIds[0],
        },
      });
    }
    await prisma.$disconnect();
    res.send(200);
  } else if (req.method === "PUT") {
    console.log("updataging....");
    const menuId = req.query.id as string;
    if (!req.body || !menuId)
      return res.status(400).json({ message: "Invalid Input" });
    const { name, price, description } = JSON.parse(req.body);
    try {
      await prisma.menus.update({
        where: {
          id: parseInt(menuId),
        },
        data: {
          name,
          price,
          description,
        },
      });
      res.send(200);
    } catch (err) {
      res.send(500);
    }
  }
}
