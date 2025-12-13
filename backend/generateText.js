const OpenAI = require("openai");
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = async function generateHeadlines(productName) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Create 6 short ad headlines (max 30 chars) for "${productName}". Avoid banned words: best, guarantee, eco-friendly.`
        }
      ],
      max_tokens: 120
    });

    return response.choices[0].message.content
      .split("\n")
      .map(x => x.trim())
      .filter(Boolean);
  } catch (err) {
    console.warn("⚠️ AI quota exceeded → fallback headlines");

    return [
      `${productName} You’ll Love`,
      `New ${productName} Launch`,
      `Try ${productName} Today`,
      `Everyday ${productName}`,
      `Simple. Smart. ${productName}`,
      `${productName} Made Easy`
    ];
  }
};
