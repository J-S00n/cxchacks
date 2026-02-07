from typing import List
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from models.preference import Preference
from schemas.preference import PreferenceCreate


async def create_preference(session: AsyncSession, user_id: str, data: PreferenceCreate) -> Preference:
    pref = Preference(user_id=user_id, **data.model_dump())
    session.add(pref)
    await session.commit()
    await session.refresh(pref)
    return pref


async def get_user_preferences(session: AsyncSession, user_id: str) -> List[Preference]:
    q = select(Preference).where(Preference.user_id == user_id)
    results = await session.execute(q)
    return results.scalars().all()


async def get_preference(session: AsyncSession, pref_id: int, user_id: str) -> Preference | None:
    q = select(Preference).where(Preference.id == pref_id, Preference.user_id == user_id)
    result = await session.execute(q)
    return result.scalars().first()


async def delete_preference(session: AsyncSession, pref: Preference) -> None:
    await session.delete(pref)
    await session.commit()


async def update_preference(session: AsyncSession, pref: Preference, data: dict) -> Preference:
    for k, v in data.items():
        setattr(pref, k, v)
    await session.commit()
    await session.refresh(pref)
    return pref
