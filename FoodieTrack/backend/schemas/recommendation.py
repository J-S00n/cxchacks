from pydantic import BaseModel
from typing import List, Optional


class RecommendationRequest(BaseModel):
    candidates: Optional[List[str]] = None
    top_k: Optional[int] = 3


class RecommendationItem(BaseModel):
    item: str
    score: float
    reason: Optional[str] = None


class RecommendationResponse(BaseModel):
    recommendations: List[RecommendationItem]
