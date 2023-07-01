import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const locationId = req.query.locationId as string;
    const tableId = req.query.tableId as string;
    const data = req.body;
    if (!locationId || !tableId || !data.orderLines) return res.send(400);
    //create one order
    const order = await prisma.orders.create({
      data: {
        location_id: Number(locationId),
        table_id: Number(tableId),
      },
    });
    //

    const orderId = order.id;
    const extractedOrderLines = data.orderLines.map(async (orderLine: any) => {
      const { menu, addons, quantity } = orderLine;
      const hasAddons = addons.length;
      if (hasAddons) {
        const orderLineData = addons.map((addon: any) => ({
          menus_id: menu.id,
          orders_id: orderId,
          addons_id: addon.id,
        }));
        await prisma.orderLine.createMany({ data: orderLineData });
      } else {
        await prisma.orderLine.create({
          data: {
            menus_id: menu.id,
            orders_id: orderId,
          },
        });
      }
    });
    res.send({ order });
  }
}
