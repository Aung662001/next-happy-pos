import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const locationId = parseInt(req.query.id as string);
  if (req.method === "PUT") {
    const { menuIds, menuCategorieId } = JSON.parse(req.body);
    if (!menuIds || !menuCategorieId) return res.send(400);
    try {
      menuIds.map(async (menuId: number) => {
        // const canUpdate =
        //   await prisma.menus_menu_categories_locations.findFirst({
        //     where: {
        //       menus_id: null,
        //       locations_id: locationId,
        //       menu_categories_id: menuCategorieId,
        //     },
        //   });
        // if (canUpdate !== null) {
        //   await prisma.menus_menu_categories_locations.updateMany({
        //     where: {
        //       locations_id: locationId,
        //       menu_categories_id: menuCategorieId as number,
        //     },
        //     data: {
        //       menus_id: menuId,
        //     },
        //   });
        //   menuIds.shift();
        // } else {
        await prisma.menus_menu_categories_locations.create({
          data: {
            menus_id: menuId,
            locations_id: locationId,
            menu_categories_id: menuCategorieId,
          },
        });
        // }
        /////
      });
      res.send(202);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.send(405);
  }
}
