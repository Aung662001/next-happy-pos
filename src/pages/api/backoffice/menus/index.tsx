import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      name,
      price,
      locationIds,
      menuCategoryIds,
      assetUrl = "",
      description = "",
    } = req.body;
    const invalid =
      !name &&
      !price &&
      price < 0 &&
      !locationIds.length &&
      !menuCategoryIds.length;
    if (invalid) return res.status(400).json({ error: "invalid input values" });
    const menu = await prisma.menus.create({
      data: {
        name: name,
        price: price,
        description,
        asseturl: assetUrl,
      },
    });
    const menuId = menu.id;
    if (menuCategoryIds.length > 1) {
      const data = menuCategoryIds.map((menuCategoryId: number) => ({
        menus_id: menuId,
        locations_id: locationIds[0],
        menu_categories_id: menuCategoryId,
      }));
      await prisma.menus_menu_categories_locations.createMany({
        data,
      });
    } else {
      await prisma.menus_menu_categories_locations.create({
        data: {
          menus_id: menuId,
          locations_id: locationIds[0],
          menu_categories_id: menuCategoryIds[0],
        },
      });
    }
    res.send(200);
  }
}
