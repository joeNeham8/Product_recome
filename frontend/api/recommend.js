import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const products = [
  // <-- Copy your existing products array here
];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { prompt } = req.body;

    const aiPrompt = `
Recommend ONLY from these products:

${JSON.stringify(products, null, 2)}

User request:
${prompt}

Rules:
- Recommend only products from the list.
- Mention product name.
- Mention price.
- Give one short reason.
`;

    const result = await model.generateContent(aiPrompt);

    res.status(200).json({
      answer: result.response.text(),
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      answer: "Something went wrong.",
    });
  }
}