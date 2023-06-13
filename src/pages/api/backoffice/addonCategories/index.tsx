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
      await prisma.addon_categories.create({
        data: {
          name: name,
          is_required: require,
        },
      });
      res.send(200);
    } catch (err: any) {
      console.log(err.message);
      res.send(500);
    }
  }
}
