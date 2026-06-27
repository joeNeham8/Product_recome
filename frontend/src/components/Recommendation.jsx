function Recommendation({ answer }) {
  if (!answer) return null;

  return (
    <div className="recommendation">
      <h2>AI Recommendation</h2>

      <p>{answer}</p>
    </div>
  );
}

export default Recommendation;