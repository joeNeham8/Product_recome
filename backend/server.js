import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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

app.get("/", (req, res) => {
  res.send("Gemini Backend Running");
});

app.post("/recommend", async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiPrompt = `
You are an AI shopping assistant.

Recommend ONLY products from this list:

${JSON.stringify(products, null, 2)}

User Request:
"${prompt}"

Rules:
- Recommend only products from the list.
- Mention product name.
- Mention price.
- Give one short reason.
- If nothing matches, explain why.
- Keep the answer under 120 words.
`;

    const result = await model.generateContent(aiPrompt);

    const response = result.response.text();

    res.json({
      answer: response,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      answer: "Failed to generate recommendations.",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});