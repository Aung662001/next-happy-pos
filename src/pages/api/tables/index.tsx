import { prisma } from "@/utils/db";
import { qrCodeImageUpload } from "@/utils/qrUpload";
import { METHODS } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const location_id = parseInt(req.query.lcoationId as string);
    const { name } = JSON.parse(req.body);
    if (!location_id || !name)
      return res.status(400).json({ message: "bad request" });
    try {
      const table = await prisma.tables.create({
        data: {
          name: name,
          location_id: location_id,
        },
      });
      const tableId = table.id;
      await qrCodeImageUpload(location_id, tableId);
      await prisma.tables.update({
        where: {
          id: tableId,
        },
        data: {
          assetUrl: `https://msquarefdc.sgp1.digitaloceanspaces.com/happy-pos/qrcode/aungaung/locationId-${location_id}-tableId-${tableId}.png`,
        },
      });
      res.send(201);
    } catch (err) {
      res.status(500).json({ message: "internal server error" });
    }
  }
}
