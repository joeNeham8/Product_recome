import { useState } from "react";

import products from "./products";
import ProductList from "./components/ProductList";
import SearchBox from "./components/SearchBox";
import Recommendation from "./components/Recommendation";
import { getRecommendation } from "./gemini";

import "./App.css";

function App() {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

async function handleSearch(prompt) {
  setLoading(true);

  try {
    const answer = await getRecommendation(prompt, products);

    setAnswer(answer);
  } catch (error) {
    console.error(error);
    setAnswer("Failed to get recommendations.");
  }

  setLoading(false);
}

  return (
    <div className="container">
      <h1>AI Product Recommendation System</h1>

      <SearchBox
        onSearch={handleSearch}
        loading={loading}
      />

      <Recommendation answer={answer} />

      <ProductList products={products} />
    </div>
  );
}

export default App;