import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const menuId = parseInt(req.query.id as string);
    const { menuCategoriesId, locationId } = JSON.parse(req.body);
    if (!menuId || !menuCategoriesId) return res.send(400);
    try {
      await prisma.menus_menu_categories_locations.updateMany({
        where: {
          menus_id: menuId,
          menu_categories_id: menuCategoriesId,
          locations_id: locationId,
        },
        data: {
          menus_id: null,
        },
      });
      res.send(203);
    } catch (error) {
      res.send(500);
    }
  }
}
