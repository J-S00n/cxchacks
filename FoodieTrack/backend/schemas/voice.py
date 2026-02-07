"""
Pydantic models for voice analysis request/response.
"""

from pydantic import BaseModel, Field
from typing import Literal

# Primary emotion labels for user state (sad, happy, etc.)
EmotionLabel = Literal[
    "happy",
    "sad",
    "neutral",
    "excited",
    "frustrated",
    "anxious",
    "calm",
    "disappointed",
    "satisfied",
    "confused",
    "grateful",
    "stressed",
    "curious",
]


class VoiceInsights(BaseModel):
    """Structured insights from voice transcription and Gemini analysis."""

    transcript: str = Field(description="The transcribed text from the audio.")
    sentiment: Literal["positive", "neutral", "negative"] = Field(
        description="Overall emotional tone of the speech."
    )
    emotion: EmotionLabel = Field(
        default="neutral",
        description="Primary emotion detected (e.g., happy, sad, frustrated, calm).",
    )
    intent: str = Field(description="Detected user intent (e.g., food order, feedback, question).")
    keywords: list[str] = Field(
        default_factory=list,
        description="Key terms or phrases extracted from the transcript.",
    )
    summary: str | None = Field(
        default=None,
        description="Optional brief summary of what was said.",
    )


class VoiceAnalysisResponse(BaseModel):
    """Response returned to the frontend after voice analysis."""

    transcript: str
    sentiment: str
    emotion: str = "neutral"
    intent: str
    keywords: list[str]
    summary: str | None
    language_code: str | None = None
