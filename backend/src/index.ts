import { clip } from "./download";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import bodyParser from "body-parser";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";

// Config
dotenv.config();
export const port = process.env.PORT ?? 3001;
export const videosDirectory = process.env.VIDEOS_DIRECTORY ?? "./bbcd/bbcd";
export const webdavUrl = process.env.WEBDAV_URL!;
export const webdavUsername = process.env.WEBDAV_USERNAME!;
export const webdavPassword = process.env.WEBDAV_PASSWORD!;
export const supabaseUrl = process.env.PUBLIC_SUPABASE_URL!;
export const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY!;

const app = express();
const sb_client = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(bodyParser.json());

/** Create a clip */
app.post("/downloadVideo", async (req, res) => {
  const [startTimestamp, endTimestamp, channelId] = [
    req.body.startTimestamp,
    req.body.endTimestamp,
    req.body.channel,
  ].map(parseInt);

  const jobId = uuidv4();
  res.send(jobId);

  clip({
    range: [startTimestamp, endTimestamp],
    jobUuid: jobId,
    client: sb_client,
    channelId,
  })
    .then(() => console.log(`Job \`${jobId}\` finished`))
    .catch(console.error);
});

/** Download an existing clip */
app.get("/download/:jobId", (req, resp) => {
  const filename = `${req.params.jobId!}.mp4`;
  const videoPath = path.join(videosDirectory, filename);
  fs.access(videoPath, fs.constants.F_OK | fs.constants.R_OK, (err) => {
    if (err) return resp.status(404).send("Video not found");
    const videoStream = fs.createReadStream(videoPath);
    videoStream.pipe(resp);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});
