import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await prisma.menus_menu_categories_locations.findMany();
    if (!data) {
      return res
        .status(500)
        .json({ message: "cann't get menuMenuCategoriesLocation" });
    }
    res.send(data);
  } else {
    res.status(405);
  }
}
