import joblib

from app.core.config import settings

_model = None


def load_model():
    global _model
    _model = joblib.load(settings.model_path)
    return _model


def get_model():
    if _model is None:
        raise RuntimeError("Model is not loaded")
    return _model


def predict_price(dataframe) -> float:
    model = get_model()
    prediction = model.predict(dataframe)
    return float(prediction[0])
