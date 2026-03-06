def _create_skill(client, name, description, content, category_id=1):
    return client.post(
        "/api/v1/skills",
        json={
            "name": name,
            "description": description,
            "content": content,
            "category_id": category_id,
        },
    )


def test_search_returns_results(client):
    _create_skill(client, "Python Guide", "Learn Python basics", "# Python\nVariables and loops")
    _create_skill(client, "React Guide", "Learn React hooks", "# React\nuseState and useEffect")

    resp = client.get("/api/v1/search", params={"q": "python"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["total"] >= 1
    assert any("Python" in s["name"] for s in data["data"])


def test_search_empty_results(client):
    resp = client.get("/api/v1/search", params={"q": "nonexistent12345"})
    assert resp.status_code == 200
    assert resp.json()["total"] == 0


def test_search_requires_query(client):
    resp = client.get("/api/v1/search")
    assert resp.status_code == 422


def test_register_and_login(client):
    # Register
    resp = client.post(
        "/api/v1/auth/register",
        json={
            "username": "newuser",
            "email": "new@test.com",
            "password": "password123",
        },
    )
    assert resp.status_code == 201
    assert resp.json()["username"] == "newuser"

    # Login
    resp = client.post(
        "/api/v1/auth/login",
        json={"username": "newuser", "password": "password123"},
    )
    assert resp.status_code == 200
    token = resp.json()["access_token"]
    assert token

    # Get me
    resp = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert resp.status_code == 200
    assert resp.json()["username"] == "newuser"


def test_login_invalid_credentials(client):
    resp = client.post(
        "/api/v1/auth/login",
        json={"username": "nonexistent", "password": "wrong"},
    )
    assert resp.status_code == 401


def test_me_without_token(client):
    resp = client.get("/api/v1/auth/me")
    assert resp.status_code == 401


def test_duplicate_username(client):
    client.post(
        "/api/v1/auth/register",
        json={"username": "dupe", "email": "dupe1@test.com", "password": "pass123"},
    )
    resp = client.post(
        "/api/v1/auth/register",
        json={"username": "dupe", "email": "dupe2@test.com", "password": "pass123"},
    )
    assert resp.status_code == 409
