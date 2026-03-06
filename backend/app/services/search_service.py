from sqlalchemy import text
from sqlalchemy.orm import Session


def search_skills(db: Session, query: str, category_slug: str | None = None) -> list[int]:
    """Search skills using FTS5 and return matching skill IDs ranked by relevance."""
    sql = """
        SELECT s.id, rank
        FROM skills_fts fts
        JOIN skills s ON s.id = fts.rowid
    """
    params: dict = {"query": query}

    if category_slug:
        sql += " JOIN categories c ON s.category_id = c.id AND c.slug = :category"
        params["category"] = category_slug

    sql += """
        WHERE skills_fts MATCH :query
        AND s.is_published = 1
        ORDER BY rank
    """

    result = db.execute(text(sql), params)
    return [row[0] for row in result.fetchall()]
