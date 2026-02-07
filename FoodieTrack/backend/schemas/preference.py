from pydantic import BaseModel
from typing import Optional


class PreferenceCreate(BaseModel):
    preference_type: str
    value: str
    category: Optional[str] = "food"
    metadata: Optional[dict] = None


class PreferenceRead(PreferenceCreate):
    id: int
    user_id: str
    created_at: str
    updated_at: str
