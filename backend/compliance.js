const OpenAI = require("openai");
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = async function checkCompliance(text) {
  try {
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
Check ad text for banned claims.
Return JSON:
{ ok:boolean, issues:string[], suggestion:string }

Text: "${text}"
          `
        }
      ],
      max_tokens: 120
    });

    return JSON.parse(res.choices[0].message.content);
  } catch (err) {
    console.warn("⚠️ AI quota exceeded → fallback compliance");

    const banned = ["best", "guarantee", "eco-friendly"];
    const issues = banned.filter(w =>
      text.toLowerCase().includes(w)
    );

    return {
      ok: issues.length === 0,
      issues,
      suggestion:
        issues.length === 0
          ? "Text looks compliant"
          : "Remove exaggerated or banned claims"
    };
  }
};
