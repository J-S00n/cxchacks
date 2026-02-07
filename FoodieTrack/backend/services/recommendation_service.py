import asyncio
import os
from typing import List

from google import genai
from google.genai import types

from schemas.recommendation import RecommendationResponse, RecommendationItem
from schemas.preference import PreferenceRead


def _get_gemini_key() -> str:
    key = os.getenv("GEMINI_API_KEY", "").strip()
    if not key:
        raise RuntimeError("GEMINI_API_KEY is not configured")
    return key


def _build_prompt(preferences: List[PreferenceRead], candidates: List[str], top_k: int) -> str:
    prefs_text = []
    for p in preferences:
        prefs_text.append(f"- {p.preference_type}: {p.value}")

    cand_text = "\n".join(f"- {c}" for c in candidates)

    prompt = f"""
You are a food recommendation assistant. Given the user's preferences and a set of candidate dishes, rank the top {top_k} best choices for this user and explain briefly why.

User preferences:
{chr(10).join(prefs_text)}

Candidates:
{cand_text}

Return a JSON array of objects with 'item', 'score' (0-1), and 'reason'.
"""
    return prompt


def _call_gemini_sync(prompt: str) -> RecommendationResponse:
    api_key = _get_gemini_key()
    client = genai.Client(api_key=api_key)
    # Use a simple schema -- we'll parse JSON in response.text
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
        config=types.GenerateContentConfig(response_mime_type="application/json"),
    )
    if not response or not response.text:
        raise RuntimeError("Gemini returned empty response")
    # Try to parse JSON array
    import json

    data = json.loads(response.text)
    items = []
    for entry in data:
        items.append(RecommendationItem(item=entry.get("item"), score=float(entry.get("score", 0)), reason=entry.get("reason")))
    return RecommendationResponse(recommendations=items)


async def recommend(preferences: List[PreferenceRead], candidates: List[str], top_k: int = 3) -> RecommendationResponse:
    prompt = _build_prompt(preferences, candidates, top_k)
    return await asyncio.to_thread(_call_gemini_sync, prompt)
