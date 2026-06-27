import { useState } from "react";

function SearchBox({ onSearch, loading }) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (!prompt.trim()) return;

    onSearch(prompt);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Example: I want a phone under $500"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading..." : "Recommend"}
      </button>
    </div>
  );
}

export default SearchBox;