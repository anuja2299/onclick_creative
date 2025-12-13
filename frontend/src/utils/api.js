const API = "http://localhost:4000";

/* ---------------------------
   BACKGROUND REMOVAL (LOCAL)
   BASE64 ONLY ✅ (NO CORS)
---------------------------- */
export async function removeBackgroundLocal(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result); // ✅ base64 string
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsDataURL(file); // 🔥 KEY LINE
  });
}

/* ---------------------------
   AI HEADLINES (WITH FALLBACK)
---------------------------- */
export async function generateHeadlines(productName) {
  try {
    const res = await fetch(`${API}/ai/headlines`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productName }),
    });

    if (!res.ok) throw new Error("AI unavailable");

    const data = await res.json();
    return data.headlines;
  } catch (err) {
    console.warn("⚠️ Using fallback headlines");

    return [
      `${productName} You’ll Love`,
      `New ${productName} Launch`,
      `Try ${productName} Today`,
      `${productName} Made Easy`,
      `Everyday ${productName}`,
      `Simple. Smart. ${productName}`
    ];
  }
}

/* ---------------------------
   AI VARIANTS (WITH FALLBACK)
---------------------------- */
export async function generateVariants(productName) {
  try {
    const res = await fetch(`${API}/ai/variants`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName,
        dominantColors: ["#b07a5a"]
      }),
    });

    if (!res.ok) throw new Error("AI unavailable");

    return await res.json();
  } catch (err) {
    console.warn("⚠️ Using fallback variants");

    return [
      { templateId: 0, logoPos: "top-right" },
      { templateId: 1, logoPos: "bottom-left" },
      { templateId: 2, logoPos: "center" }
    ];
  }
}

/* ---------------------------
   COMPLIANCE CHECK (FALLBACK)
---------------------------- */
export async function checkCompliance(text) {
  try {
    const res = await fetch(`${API}/ai/compliance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) throw new Error("AI unavailable");

    return await res.json();
  } catch (err) {
    console.warn("⚠️ Using fallback compliance");

    const banned = ["best", "guarantee", "eco-friendly"];
    const found = banned.filter((w) =>
      text.toLowerCase().includes(w)
    );

    return {
      ok: found.length === 0,
      issues: found,
      suggestion:
        found.length === 0
          ? "Text looks compliant"
          : "Remove exaggerated or banned claims"
    };
  }
}
