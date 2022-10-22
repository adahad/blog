import express from "express";
import dotenv from "dotenv";
import * as testData from "./tests/testData.json";

import { Post } from "./types";

dotenv.config();

const app = express();
const port = process.env.PORT;

const testPosts: Post[] = testData.samplePosts;

app.get("/", (request, response) => {
  response.send(JSON.stringify(testPosts));
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
