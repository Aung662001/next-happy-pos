import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { unique } from "next/dist/build/utils";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method, "METHODDDD");
  if (req.method === "POST") {
    const { selectedLocationIds, name } = JSON.parse(req.body);
    if (!name || !selectedLocationIds) return res.send(400);
    const alreadyExist = await prisma.menu_categories.findFirst({
      where: {
        name: name,
      },
    });
    if (alreadyExist !== null)
      return res.send({ message: "That Categories is Already exist" });
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
    } finally {
      prisma.$disconnect();
    }
  } else if (req.method === "PATCH") {
    const {
      name,
      selectedLocationIds,
    }: { name: string; selectedLocationIds: number[] } = JSON.parse(req.body);
    const catId = parseInt(req.query.id as string);
    const allIds = await prisma.menus_menu_categories_locations.findMany({
      where: {
        menu_categories_id: catId,
      },
    });
    const prevLocationId = allIds.map((all) => all.locations_id);
    const uniqueIds = Array.from(new Set(prevLocationId));
    await prisma.menu_categories.update({
      where: {
        id: catId,
      },
      data: {
        name: name,
      },
    });
    const toDeleteId = uniqueIds.filter(
      (uniq) => !selectedLocationIds.includes(uniq)
    );
    const toAddId = selectedLocationIds.filter(
      (sele) => !uniqueIds.includes(sele)
    );
    console.log(toDeleteId, "this is to delete");
    console.log(toAddId, "this is to add");
    if (toDeleteId.length) {
      const data = await prisma.$transaction(
        toDeleteId.map((data: any) =>
          prisma.menus_menu_categories_locations.deleteMany({
            where: {
              locations_id: data,
            },
          })
        )
      );
    }
    if (toAddId.length) {
      const newLocation = toAddId.map((toAdd: number) => {
        return { locations_id: toAdd, menu_categories_id: catId };
      });
      await prisma.$transaction(
        newLocation.map((data: any) =>
          prisma.menus_menu_categories_locations.create({
            data: data,
          })
        )
      );
    }
    await prisma.$disconnect();
    res.send(200);
    ///////////////////////////////////////////
  } else if (req.method === "DELETE") {
    //this is delete route
    const id = parseInt(req.query.id as string);
    try {
      await prisma.menus_menu_categories_locations.deleteMany({
        where: {
          menu_categories_id: id,
        },
      });
      await prisma.menu_categories.delete({
        where: {
          id: id,
        },
      });
      res.send(204);
    } catch (error: any) {
      res.send({ error: error.message });
    } finally {
      prisma.$disconnect();
    }
  }
}
