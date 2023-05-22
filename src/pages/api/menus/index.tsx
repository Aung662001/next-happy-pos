// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { pool } from "@/utils/database";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const menus = await pool.query("select * from menus");

  res.status(200).json(menus.rows);
}
