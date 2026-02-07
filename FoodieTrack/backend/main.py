from fastapi import FastAPI, Depends
from typing import Annotated
import logging

# Import the Auth0 JWT dependencies & helpers
from autho import get_current_user_id
from routes.voice import router as voice_router
from routes.preferences import router as preferences_router
from routes.recommendations import router as recommendations_router
from db import init_db
from metrics import metrics_app

app = FastAPI()
app.include_router(voice_router)
app.include_router(preferences_router)
app.include_router(recommendations_router)


@app.on_event("startup")
async def on_startup():
    # Configure logging
    logging.basicConfig(level=logging.INFO)
    logging.getLogger("uvicorn.access").setLevel(logging.INFO)
    await init_db()


# Mount Prometheus metrics ASGI app at /metrics
app.mount("/metrics", metrics_app())
app.include_router(preferences_router)


@app.on_event("startup")
async def on_startup():
    await init_db()

# Example dependency for requiring an authenticated user and extracting their user_id
def require_user(
    user_id: Annotated[str, Depends(get_current_user_id)],
) -> str:
    return user_id


@app.get("/")
def root(user_id: Annotated[str, Depends(require_user)]):
    # user_id is extracted from the validated JWT
    return {"message": f"Hello, user {user_id}!"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
