import { prisma } from "@/utils/db";
import { METHODS } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "PUT") {
    const { id, name, address } = JSON.parse(req.body);
    if (!name || !address || !id)
      return res.status(400).json({ message: "bad request" });
    try {
      await prisma.companies.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          address: address,
        },
      });
      res.send(200);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.send(405);
  }
}
