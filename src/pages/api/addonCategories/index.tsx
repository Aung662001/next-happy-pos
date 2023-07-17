import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, isRequired } = JSON.parse(req.body);
    if (!name || !isRequired) return res.send(400);
    let require;
    if (isRequired === "true") {
      require = true;
    } else if (isRequired === "false") {
      require = false;
    } else {
      return res.status(400).json({ message: "bad request" });
    }
    try {
      const data = await prisma.addon_categories.create({
        data: {
          name: name,
          is_required: require,
        },
      });
      res.status(200).json(data);
    } catch (err: any) {
      res.send(500);
    }
  } else if (req.method === "PUT") {
    const { id, name, isRequired } = JSON.parse(req.body);
    if (!id || !name || !isRequired) return res.send(400);
    try {
      await prisma.addon_categories.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          is_required: isRequired === "true" ? true : false,
        },
      });
      res.send(200);
    } catch (err) {
      res.status(500).json({ message: "Internal server Error" });
    }
  } else if (req.method === "DELETE") {
    const id = parseInt(req.query.id as string);
    if (!id) return res.send(400);
    try {
      await prisma.menus_addon_categories.deleteMany({
        where: {
          addon_categories_id: id,
        },
      });
      await prisma.addons.updateMany({
        where: {
          addon_categories_id: id,
        },
        data: {
          is_archived: true,
        },
      });
      await prisma.addon_categories.update({
        where: {
          id: id,
        },
        data: {
          is_archived: true,
        },
      });
      res.send(203);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.send(405);
  }
}
