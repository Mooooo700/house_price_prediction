
# House Price Prediction

An end-to-end machine learning web app that predicts property prices in India, from raw data to a trained model served through a REST API and a React frontend.

## Overview

The project has three parts:

1. **notebooks/** — a Jupyter notebook that cleans the [House Price dataset](https://www.kaggle.com/datasets/juhibhojani/house-price) from Kaggle, trains and evaluates regression models, and exports the final model.
2. **backend/** — a FastAPI service that loads the trained model and serves predictions through a REST API.
3. **frontend/** — a React + TypeScript app where a user enters property details and sees the predicted price.

## Architecture

```
notebooks/house_price_model.ipynb
        │
        ▼  exports
backend/models/house_price.pkl, locations.json
        │
        ▼  loaded at startup
backend/app  (FastAPI)  ── POST /predict, GET /health
        │
        ▼  fetch
frontend/src  (React + Vite)  ── form → result page
```

## Tech Stack

- **Data & ML:** Python, pandas, scikit-learn, matplotlib, seaborn, joblib
- **Backend:** FastAPI, Pydantic, uvicorn
- **Frontend:** React, TypeScript, Vite, react-router-dom

## Project Structure

```
house-price-project/
├── notebooks/
│   ├── data/house_prices.csv
│   └── house_price_model.ipynb
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/routes/prediction.py
│   │   ├── core/config.py
│   │   ├── schemas/prediction.py
│   │   └── services/preprocessing.py, inference.py
│   ├── models/house_price.pkl, locations.json
│   ├── tests/test_prediction.py
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/predictionClient.ts
    │   ├── components/PredictionForm.tsx
    │   ├── pages/HomePage.tsx, ResultPage.tsx, NotFoundPage.tsx
    │   ├── types/prediction.ts
    │   └── App.tsx
    └── .env.example
```

## Dataset

**House Price** by Juhi Bhojani — https://www.kaggle.com/datasets/juhibhojani/house-price

Download it manually from the link above, or with the Kaggle CLI:

```
pip install kaggle
kaggle datasets download -d juhibhojani/house-price -p notebooks/data --unzip
```

Place `house_prices.csv` inside `notebooks/data/`.

## Running the Notebook

```
cd notebooks
pip install jupyter pandas numpy scikit-learn matplotlib seaborn joblib
jupyter notebook
```

Run all cells top to bottom. This produces `house_price.pkl` and `locations.json`, which should be copied into `backend/models/`.

## Backend Setup

```
cd backend
python -m venv .venv
.venv\Scripts\activate      # Windows
# source .venv/bin/activate # macOS/Linux
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000`. Interactive docs are available at `http://localhost:8000/docs`.

### Environment Variables (backend)

| Variable | Description | Default |
|---|---|---|
| `MODEL_PATH` | Path to the trained model file | `models/house_price.pkl` |
| `LOCATIONS_PATH` | Path to the allowed locations file | `models/locations.json` |
| `CORS_ORIGINS` | Allowed frontend origins | `["http://localhost:5173"]` |

### Running Tests

```
pytest
```

## Frontend Setup

```
cd frontend
npm install
cp .env.example .env
npm run dev
```

The app runs at `http://localhost:5173`.

### Environment Variables (frontend)

| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API | `http://localhost:8000` |

## API Reference

### `GET /health`

Returns the service status.

```
curl http://localhost:8000/health
```

Response:

```json
{ "status": "ok" }
```

### `POST /predict`

Returns the predicted price for a property.

```
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "location": "other",
    "carpet_area_sqft": 1200,
    "floor_num": 3,
    "bathroom": 2,
    "balcony": 1,
    "furnishing": "Semi-Furnished",
    "transaction": "Resale",
    "ownership": "Freehold",
    "facing": "East"
  }'
```

Response:

```json
{ "predicted_price": 4500000.0 }
```
## Model Metrics

| Model | MAE | RMSE | R² |
|---|---|---|---|
| Linear Regression | 4,571,537 | 7,542,830 | 0.717 |
| Random Forest | 1,270,824 | 4,233,270 | 0.911 |

Random Forest was chosen as the final model since it achieves lower error (MAE, RMSE) and a higher R² than Linear Regression, meaning it explains more of the variance in property prices and gives more accurate predictions.
<img width="1332" height="401" alt="Screenshot 2026-09-17 083352" src="https://github.com/user-attachments/assets/a309791e-fe64-4154-8fab-20697bc8781e" />

## Screenshots

_Add screenshots of the running app here._
