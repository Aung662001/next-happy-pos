import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "PUT") {
    const { menuId, orderId, status } = req.body;
    if (!menuId || !orderId || !status) {
      return res.send(400);
    }
    const ans = await prisma.orderLine.updateMany({
      where: {
        menus_id: menuId,
        orders_id: orderId,
      },
      data: {
        order_status: status,
      },
    });
    const newData = await prisma.orderLine.findMany();
    res.status(200).json(newData);
  } else {
    res.send(405);
  }
}
