// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";
// import { Request, Response } from "express";
// import { fileUpload } from "./assets/upload";

// type Data = {
//   name: string;
// };
// const config = {
//   api: {
//     bodyParser: false,
//   },
// };
// type CustomApiRequest = Request &
//   NextApiRequest & {
//     files: any[];
//   };
// type CustomApiResponse = Response & NextApiResponse;
// export default function handler(req: CustomApiRequest, res: CustomApiResponse) {
//   try {
//     fileUpload(req, res, async (error) => {
//       if (error) return res.status(500).json({ error: "inside file upload" });

//       const files = req.files;
//       const file = files[0];
//       const assetUrl = file.location;
//       res.send(assetUrl);
//     });
//   } catch (error) {
//     res.status(500).json({ error: "error inside file upload catch" });
//   }
// }
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}
