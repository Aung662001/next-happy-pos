import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const newMenuCategories = req.body;
    const locationId = parseInt(req.query.locationId as string);
    console.log(newMenuCategories, locationId);
    if (!newMenuCategories) return res.send(400);
    try {
      const menuCategories = await prisma.menu_categories.create({
        data: {
          name: newMenuCategories,
        },
      });
      const data = await prisma.menus_menu_categories_locations.create({
        data: {
          locations_id: locationId,
          menu_categories_id: menuCategories.id,
        },
      });
      if (!data) return res.send(500);
      res.status(200).json({ data, menuCategories });
    } catch (err: any) {
      return res.json({ error: err.message });
    }
  }
  res.send(200);
}
