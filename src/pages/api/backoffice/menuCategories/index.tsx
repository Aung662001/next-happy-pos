import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { selectedLocationIds, name } = JSON.parse(req.body);
    const locationId = parseInt(req.query.locationId as string);
    console.log(selectedLocationIds);
    if (!name || !selectedLocationIds) return res.send(400);
    try {
      const menuCategories = await prisma.menu_categories.create({
        data: {
          name: name,
        },
      });
      const newThreeDatas = selectedLocationIds.map((lo: number) => {
        return { locations_id: lo, menu_categories_id: menuCategories.id };
      });
      const data = await prisma.$transaction(
        newThreeDatas.map((data: any) =>
          prisma.menus_menu_categories_locations.create({ data: data })
        )
      );

      if (!data) return res.send(500);
      res.status(200).json({ data, menuCategories });
    } catch (err: any) {
      return res.json({ error: err.message });
    }
  }
}
