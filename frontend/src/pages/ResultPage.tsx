import { useLocation, Link } from "react-router-dom";

function formatPrice(price: number): string {
  if (price >= 1e7) {
    return `₹ ${(price / 1e7).toFixed(2)} Cr`;
  }
  if (price >= 1e5) {
    return `₹ ${(price / 1e5).toFixed(2)} Lac`;
  }
  return `₹ ${price.toFixed(0)}`;
}

export default function ResultPage() {
  const location = useLocation();
  const predictedPrice = location.state?.predictedPrice;

  if (predictedPrice === undefined) {
    return (
      <div className="page">
        <div className="card result-box">
          <p>No prediction available.</p>
          <Link to="/">Go back</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card result-box">
        <h1>Predicted Price</h1>
        <p className="result-price">{formatPrice(predictedPrice)}</p>
        <Link to="/">Try another prediction</Link>
      </div>
    </div>
  );
}
