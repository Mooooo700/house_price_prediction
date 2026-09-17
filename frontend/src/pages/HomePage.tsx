import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PredictionForm from "../components/PredictionForm";
import { predictPrice } from "../api/predictionClient";
import type { PredictionRequest } from "../types/prediction";

export default function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(payload: PredictionRequest) {
    setLoading(true);
    setError(null);
    try {
      const result = await predictPrice(payload);
      navigate("/result", { state: { predictedPrice: result.predicted_price } });
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">House Price Predictor</h1>
        <PredictionForm onSubmit={handleSubmit} loading={loading} />
        {error && <div className="error-box">{error}</div>}
      </div>
    </div>
  );
}
