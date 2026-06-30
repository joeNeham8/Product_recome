import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const products = [
    {
    id: 1,
    name: "iPhone 13",
    brand: "Apple",
    category: "Phone",
    price: 699,
  },
  {
    id: 2,
    name: "Samsung Galaxy A55",
    brand: "Samsung",
    category: "Phone",
    price: 420,
  },
  {
    id: 3,
    name: "Google Pixel 8a",
    brand: "Google",
    category: "Phone",
    price: 499,
  },
  {
    id: 4,
    name: "MacBook Air M2",
    brand: "Apple",
    category: "Laptop",
    price: 999,
  },
  {
    id: 5,
    name: "Dell Inspiron 15",
    brand: "Dell",
    category: "Laptop",
    price: 650,
  },
  {
    id: 6,
    name: "HP Pavilion 14",
    brand: "HP",
    category: "Laptop",
    price: 700,
  },
  
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
  console.error("Gemini Error:", err);

  return res.status(500).json({
    error: err.message,
    details: err.toString(),
  });
}
}