from contextlib import asynccontextmanager

import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.prediction import router as prediction_router
from app.core.config import settings
from app.services.inference import load_model


@asynccontextmanager
async def lifespan(app: FastAPI):
    load_model()
    yield


app = FastAPI(title="House Price Prediction API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prediction_router)

@app.get("/locations")
def get_locations():
    with open(settings.locations_path) as f:
        return json.load(f)

