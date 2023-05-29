import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const newMenuCategories = req.body;
    if (!newMenuCategories) return res.send(400);
    try {
      const data = await prisma.menu_categories.create({
        data: {
          name: newMenuCategories,
        },
      });
      if (!data) return res.send(500);
      res.status(200).json(data);
    } catch (err: any) {
      return res.json({ error: err.message });
    }
  }
  res.send(200);
}
