import { prisma } from "../../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let menusCategoriesId = req.query.id as string;
  let id = parseInt(menusCategoriesId);
  try {
    const result = await prisma.menu_categories.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: `${result.name} is deleted successfully` });
  } catch (err: any) {
    res.send({ error: err.message });
  } finally {
    await prisma.$disconnect();
  }
}
