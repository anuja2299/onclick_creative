const axios = require("axios");
const FormData = require("form-data");

module.exports = async function removeBg(imageBuffer) {
  const formData = new FormData();

  formData.append("image_file", imageBuffer, "input.jpg");
  formData.append("size", "auto");

  const response = await axios.post(
    "https://api.remove.bg/v1.0/removebg",
    formData,
    {
      headers: {
        ...formData.getHeaders(),
        "X-Api-Key": process.env.REMOVE_BG_KEY,
      },
      responseType: "arraybuffer",
    }
  );

  return response.data;
};
