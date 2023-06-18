import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const data = JSON.parse(req.body);
    let Addonid = parseInt(req.query.id as string);
    if (!data.name || data.price < 0 || !data.hasOwnProperty("is_avaiable")) {
      return res.status(400).json({ error: "dataFromUi incomplete" });
    }
    try {
      const response = await prisma.addons.update({
        where: {
          id: Addonid,
        },
        data: {
          name: data.name,
          price: data.price,
          is_avaiable: data.is_avaiable,
          addon_categories_id: parseInt(data.addonCategories),
        },
      });
      res.send(200);
    } catch (err: any) {
      res.send(500);
    } finally {
      prisma.$disconnect();
    }
  } else if (req.method === "DELETE") {
    const id = parseInt(req.query.id as string);
    try {
      const dbRes = await prisma.addons.update({
        where: {
          id: id,
        },
        data: {
          is_archived: true,
        },
      });
      res.send(dbRes);
    } catch (err) {
      res.send(500);
    }
  }
}
