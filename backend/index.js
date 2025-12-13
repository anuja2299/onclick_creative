require("dotenv").config();
const express = require("express");
const cors = require("cors");

const generateHeadlines = require("./generateText");
const generateVariants = require("./generateVariants");
const checkCompliance = require("./compliance");
const removeBgLocal = require("./removeBgLocal");

const app = express();
app.use(cors());
app.use(express.json());

// ---------------------------
// HEALTH CHECK
// ---------------------------
app.get("/", (req, res) => {
  res.send("Backend running");
});

// ---------------------------
// LOCAL BACKGROUND REMOVAL
// ---------------------------
app.post("/remove-bg-local", removeBgLocal);

// ---------------------------
// AI ROUTES
// ---------------------------
app.post("/ai/headlines", async (req, res) => {
  try {
    const { productName } = req.body;
    const headlines = await generateHeadlines(productName);
    res.json({ headlines });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Headlines failed" });
  }
});

app.post("/ai/variants", async (req, res) => {
  try {
    const result = await generateVariants(req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Variants failed" });
  }
});

app.post("/ai/compliance", async (req, res) => {
  try {
    const result = await checkCompliance(req.body.text);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Compliance failed" });
  }
});

// ---------------------------
const PORT = 4000;
app.listen(PORT, () =>
  console.log(`✅ Backend running on port ${PORT}`)
);
