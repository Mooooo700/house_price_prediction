import json

import pandas as pd

from app.core.config import settings
from app.schemas.prediction import PredictionRequest

with open(settings.locations_path) as f:
    ALLOWED_LOCATIONS = set(json.load(f))


def request_to_dataframe(request: PredictionRequest) -> pd.DataFrame:
    location = request.location if request.location in ALLOWED_LOCATIONS else "other"

    row = {
        "carpet_area_sqft": request.carpet_area_sqft,
        "floor_num": request.floor_num,
        "bathroom": request.bathroom,
        "balcony": request.balcony,
        "location_grouped": location,
        "Furnishing": request.furnishing,
        "Transaction": request.transaction,
        "Ownership": request.ownership,
        "facing": request.facing,
    }

    return pd.DataFrame([row])
