import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const dataFromUi = JSON.parse(req.body);
    if (
      !dataFromUi.name ||
      dataFromUi.price < 0 ||
      !dataFromUi.hasOwnProperty("is_avaiable")
    )
      return res.status(400).json({ error: "dataFromUi incomplete" });

    try {
      const dbRes = await prisma.addons.create({
        data: {
          name: dataFromUi.name,
          price: dataFromUi.price,
          is_avaiable: dataFromUi.is_avaiable,
          addon_categories_id: dataFromUi.addonCategories,
        },
      });
      res.status(200).json(dbRes);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    } finally {
      prisma.$disconnect();
    }
  }
}
