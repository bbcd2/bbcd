const express = require("express");
const app = express();
const port = 3001;
const main = require("./download");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const bodyParser = require("body-parser");
const sb = require("@supabase/supabase-js");
const axios = require("axios");

const client = sb.createClient(
  "https://hlbdezevgntxspmvfmyv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsYmRlemV2Z250eHNwbXZmbXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzNTA1ODksImV4cCI6MjAyOTkyNjU4OX0.U1pYhVQLSPUegwEaeBwMcApFYMUKzkrQDYo8lkxBIac"
);

app.use(cors());
app.use(bodyParser.json());

app.post("/downloadVideo", async (req, res) => {
  // Extract start and end timestamps from the request query parameters
  const startTimestamp = parseInt(req.body.startTimestamp);
  const endTimestamp = parseInt(req.body.endTimestamp);
  channel = parseInt(req.body.channel);
  if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
    res.status(400).send("Invalid timestamps");
    return;
  }
  // Generate a unique job ID
  const jobId = uuidv4();

  // Call the downloadVideo function
  main(startTimestamp, endTimestamp, jobId, client, channel)
    .then((outputFilename) => {
      console.log("Job completed with output filename:", outputFilename);
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });

  // Continue with the rest of your code here

  // Send a response back to the client with the job ID
  res.send(
    "Your download is in progress. You can download the file later at this URL: http://localhost:3001/download/" +
      jobId
  );
});

// Download route
app.get("/download/:jobId", (req, res) => {
  const jobId = req.params.jobId;

  // Download the MP4 file from the WebDAV server
  const webdavUrl = "https://u382991.your-storagebox.de/bbcd";
  const webdavUsername = "u382991";
  const webdavPassword = "s2q5mLVJcVZz3jDj";
  axios({
    method: "get",
    url: `${webdavUrl}/bbcd/${jobId}.mp4`,
    responseType: "stream",
    auth: {
      username: webdavUsername,
      password: webdavPassword,
    },
  })
    .then((response) => {
      res.setHeader("Content-Disposition", `attachment; filename=${jobId}.mp4`);
      response.data.pipe(res);
    })
    .catch((error) => {
      console.error("Error downloading file:", error);
      res.status(500).send("Error downloading file");
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
