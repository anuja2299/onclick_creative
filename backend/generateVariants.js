const OpenAI = require("openai");
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = async function generateVariants() {
  try {
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
Return 3 creative layout variants as JSON.
Fields:
templateId (0-2)
logoPos (top-left, top-right, bottom-left, bottom-right, center)
          `
        }
      ],
      max_tokens: 150
    });

    return JSON.parse(res.choices[0].message.content);
  } catch (err) {
    console.warn("⚠️ AI quota exceeded → fallback variants");

    return [
      { templateId: 0, logoPos: "top-right" },
      { templateId: 1, logoPos: "bottom-left" },
      { templateId: 2, logoPos: "center" }
    ];
  }
};
