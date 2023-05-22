import { config } from "@/config/config";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
// create s3 instance using S3Client
// (this is how we create s3 instance in v3)
const s3 = new S3Client({
  credentials: {
    accessKeyId: config.spaceAccessKeyId,
    secretAccessKey: config.spaceSecrectKey,
  },
  endpoint: config.spaceEndPoint,
  region: "sgp1", // this is the region that you select in AWS account
});

export const fileUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "msquarefdc",
    acl: "public-read",
    key: function (request, file, cb) {
      cb(null, "happy-pos/wma/" + new Date() + file.originalname);
    },
  }),
}).array("files", 1);
