require("dotenv").config();
console.log("Loaded API key:", process.env.REMOVE_BG_KEY);

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const removeBg = require("./removeBg");

const app = express();
app.use(cors()); // <-- important

const upload = multer();

app.post("/remove-bg", upload.single("image"), async (req, res) => {
  try {
    const output = await removeBg(req.file.buffer);

    res.set("Content-Type", "image/png");
    res.send(output);
  } catch (err) {
    console.error("Error removing background:", err);
    res.status(500).send("BG removal failed");
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
