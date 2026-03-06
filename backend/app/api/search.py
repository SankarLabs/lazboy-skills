import math

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session, joinedload

from app.api.deps import get_db
from app.models import Skill
from app.schemas.skill import PaginatedResponse
from app.services.search_service import search_skills

router = APIRouter(prefix="/api/v1/search", tags=["search"])


@router.get("", response_model=PaginatedResponse)
def search(
    q: str = Query(..., min_length=1),
    category: str | None = None,
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    skill_ids = search_skills(db, q, category)
    total = len(skill_ids)
    total_pages = math.ceil(total / per_page) if total > 0 else 1

    # Paginate the IDs
    page_ids = skill_ids[(page - 1) * per_page : page * per_page]

    if not page_ids:
        return PaginatedResponse(
            data=[], page=page, per_page=per_page, total=total, total_pages=total_pages
        )

    skills = (
        db.query(Skill)
        .options(joinedload(Skill.category), joinedload(Skill.author), joinedload(Skill.tags))
        .filter(Skill.id.in_(page_ids))
        .all()
    )

    # Preserve FTS ranking order
    id_order = {sid: i for i, sid in enumerate(page_ids)}
    skills.sort(key=lambda s: id_order.get(s.id, 0))

    return PaginatedResponse(
        data=skills, page=page, per_page=per_page, total=total, total_pages=total_pages
    )
