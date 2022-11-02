import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import express, { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const region = "us-east-2";
const bucketName = "project2627";

const s3Client = new S3Client({ region });

router.get(
  "/",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (request: Request, response: Response, next: NextFunction) => {
    console.log("S3 Router");

    const key = nanoid();
    const command = new PutObjectCommand({ Bucket: bucketName, Key: key });

    try {
      const signedURL = await getSignedUrl(s3Client, command, {
        expiresIn: 60,
      });
      response.status(200).send({ signedURL });
    } catch (error) {
      response.status(500).end();
    }
  }
);

export default router;
