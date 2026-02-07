from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from autho import get_current_user_id
from db import get_session
from services.preference_service import get_user_preferences
from services.recommendation_service import recommend
from schemas.recommendation import RecommendationRequest, RecommendationResponse
from metrics import RECOMMENDATION_REQUESTS, RECOMMENDATION_ERRORS
import logging

router = APIRouter(prefix="/recommendations", tags=["recommendations"])


@router.post("/", response_model=RecommendationResponse)
async def get_recommendations(
    req: RecommendationRequest,
    user_id: str = Depends(get_current_user_id),
    session: AsyncSession = Depends(get_session),
):
    RECOMMENDATION_REQUESTS.inc()
    logger = logging.getLogger(__name__)
    try:
        prefs = await get_user_preferences(session=session, user_id=user_id)
        candidates = req.candidates or []
        if not candidates:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Candidates list required")
        resp = await recommend(prefs, candidates, top_k=req.top_k)
        return resp
    except Exception as e:
        RECOMMENDATION_ERRORS.inc()
        logger.exception("Recommendation failed: %s", e)
        raise HTTPException(status_code=500, detail="Recommendation failed") from e
