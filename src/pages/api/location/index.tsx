import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const data = JSON.parse(req.body);
    const LocationId = parseInt(JSON.parse(req.body).id as string);
    if (!LocationId || !data) {
      res.status(400).send({ error: "Bad Request, No Update Avaiable" });
    }
    try {
      const resDb = await prisma.locations.update({
        where: {
          id: LocationId,
        },
        data: {
          name: data.name,
          address: data.address,
        },
      });
      res.send(resDb);
    } catch (err: any) {
      return res.send(err.message);
    }
  } else if (req.method === "POST") {
    const data = req.body;
    try {
      const resDb = await prisma.locations.create({
        data: {
          name: data.name,
          address: data.address,
          companies_id: data.companies_id,
        },
      });
      res.status(200).json(resDb);
    } catch (err: any) {
      res.send(err.message);
    } finally {
      prisma.$disconnect();
    }
  } else if (req.method === "DELETE") {
    const query = req.query;
    const LocationId = (query["locationId"] ||
      (query["locationId"] && query["locationId"][0])) as string;
    if (!LocationId) return res.send(400);
    try {
      const data = await prisma.locations.update({
        where: {
          id: parseInt(LocationId),
        },
        data: {
          is_archived: true,
        },
      });
      res.send(202);
    } catch (err: any) {
      res.send(err.message);
    } finally {
      prisma.$disconnect();
    }
  }
  res.status(400).send({ error: "Bad Request" });
}
