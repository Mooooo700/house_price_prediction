import { useEffect, useState } from "react";
import type { PredictionRequest } from "../types/prediction";
import { fetchLocations } from "../api/predictionClient";

interface Props {
  onSubmit: (payload: PredictionRequest) => void;
  loading: boolean;
}

const FURNISHING_OPTIONS = ["Furnished", "Semi-Furnished", "Unfurnished"];
const TRANSACTION_OPTIONS = ["New Property", "Resale"];

export default function PredictionForm({ onSubmit, loading }: Props) {
  const [locations, setLocations] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<PredictionRequest>({
    location: "",
    carpet_area_sqft: 0,
    floor_num: 0,
    bathroom: 1,
    balcony: 0,
    furnishing: FURNISHING_OPTIONS[0],
    transaction: TRANSACTION_OPTIONS[0],
    ownership: "",
    facing: "",
  });

  useEffect(() => {
    fetchLocations().then(setLocations).catch(() => setLocations([]));
  }, []);

  function handleChange<K extends keyof PredictionRequest>(
    key: K,
    value: PredictionRequest[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.location) {
      setError("Please select a location");
      return;
    }
    if (form.carpet_area_sqft <= 0) {
      setError("Area must be greater than 0");
      return;
    }
    setError(null);
    onSubmit(form);
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div className="field">
        <label>Location</label>
        <select
          value={form.location}
          onChange={(e) => handleChange("location", e.target.value)}
        >
          <option value="">Select a location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Carpet Area (sqft)</label>
        <input
          type="number"
          value={form.carpet_area_sqft}
          onChange={(e) =>
            handleChange("carpet_area_sqft", Number(e.target.value))
          }
        />
      </div>

      <div className="field">
        <label>Floor</label>
        <input
          type="number"
          value={form.floor_num}
          onChange={(e) => handleChange("floor_num", Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label>Bathrooms</label>
        <input
          type="number"
          value={form.bathroom}
          onChange={(e) => handleChange("bathroom", Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label>Balconies</label>
        <input
          type="number"
          value={form.balcony}
          onChange={(e) => handleChange("balcony", Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label>Furnishing</label>
        <select
          value={form.furnishing}
          onChange={(e) => handleChange("furnishing", e.target.value)}
        >
          {FURNISHING_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Transaction</label>
        <select
          value={form.transaction}
          onChange={(e) => handleChange("transaction", e.target.value)}
        >
          {TRANSACTION_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Ownership</label>
        <input
          type="text"
          value={form.ownership}
          onChange={(e) => handleChange("ownership", e.target.value)}
        />
      </div>

      <div className="field">
        <label>Facing</label>
        <input
          type="text"
          value={form.facing}
          onChange={(e) => handleChange("facing", e.target.value)}
        />
      </div>

      {error && <div className="error-box">{error}</div>}

      <button className="submit-button" type="submit" disabled={loading}>
        {loading ? "Predicting..." : "Predict Price"}
      </button>
    </form>
  );
}
