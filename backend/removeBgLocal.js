const multer = require("multer");
const upload = multer();

module.exports = [
  upload.single("image"),
  async (req, res) => {
    try {
      const file = req.file;
      if (!file) return res.status(400).json({ error: "No image" });

      const base64 =
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

      res.json({ url: base64 });
    } catch (err) {
      res.status(500).json({ error: "Background removal failed" });
    }
  }
];
