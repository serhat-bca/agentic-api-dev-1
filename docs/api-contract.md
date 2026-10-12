# Campus Pulse API Contract

## Rule

This document is the source of truth for the Campus Pulse API. Before adding
or changing an endpoint, update this document and check the change with the
human developer. Do not implement endpoint behavior that is not documented and
approved here.

## Endpoint index

- `GET /api/announcements` — List all announcements
- `GET /api/announcements/:id` — Get one announcement
- `POST /api/announcements` — Create an announcement
- `PATCH /api/announcements/:id` — Update an announcement
- `DELETE /api/announcements/:id` — Delete an announcement

## Endpoints

### `GET /api/announcements`

- **Path:** `/api/announcements`
- **Purpose:** Return all announcements.
- **Input:** No path parameters, query parameters, or request body.
- **Success:** `200 OK` with an array of announcements. Each announcement
  includes `announcement_id`, `title`, `body`, and `clubIds`.
- **Failures:**
  - `500 Internal Server Error` if the server or database operation fails.

### `GET /api/announcements/:id`

- **Path:** `/api/announcements/:id`
- **Purpose:** Return one announcement by ID.
- **Input:** `id` is a required positive integer path parameter.
- **Success:** `200 OK` with the announcement identified by `id`, including
  `announcement_id`, `title`, `body`, and `clubIds`.
- **Failures:**
  - `400 Bad Request` if `id` is not a valid positive integer.
  - `404 Not Found` if the announcement does not exist.
  - `500 Internal Server Error` if the server or database operation fails.

### `POST /api/announcements`

- **Path:** `/api/announcements`
- **Purpose:** Create an announcement and associate it with zero or more clubs.
- **Input:** JSON body:

  ```json
  {
    "title": "Fall Club Fair Registration",
    "body": "Student organizations can register for a table.",
    "clubIds": [1, 2, 3]
  }
  ```

  `title` and `body` are required non-empty strings. `clubIds` is a required
  array of club ID integers and may be empty.
- **Success:** `201 Created` with the created announcement, including
  `announcement_id`, `title`, `body`, and `clubIds`.
- **Failures:**
  - `400 Bad Request` for malformed JSON, missing or invalid fields, or
    nonexistent club IDs.
  - `500 Internal Server Error` if the server or database operation fails.

### `PATCH /api/announcements/:id`

- **Path:** `/api/announcements/:id`
- **Purpose:** Update selected fields of an existing announcement. Omitted
  fields remain unchanged.
- **Input:** `id` is a required positive integer path parameter. The JSON body
  may include one or more of:

  ```json
  {
    "title": "Updated title",
    "body": "Updated body",
    "clubIds": [1, 3]
  }
  ```

  `title` and `body`, when provided, must be non-empty strings. `clubIds`, when
  provided, must be an array of club ID integers and may be empty. At least one
  supported field is required.
- **Success:** `200 OK` with the updated announcement, including
  `announcement_id`, `title`, `body`, and `clubIds`.
- **Failures:**
  - `400 Bad Request` for an invalid ID, malformed JSON, an empty update,
    unknown fields, invalid field values, or nonexistent club IDs.
  - `404 Not Found` if the announcement does not exist.
  - `500 Internal Server Error` if the server or database operation fails.

### `DELETE /api/announcements/:id`

- **Path:** `/api/announcements/:id`
- **Purpose:** Delete an existing announcement and its associated club links.
- **Input:** `id` is a required positive integer path parameter.
- **Success:** `204 No Content` with no response body.
- **Failures:**
  - `400 Bad Request` if `id` is not a valid positive integer.
  - `404 Not Found` if the announcement does not exist.
  - `500 Internal Server Error` if the server or database operation fails.
