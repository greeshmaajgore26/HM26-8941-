# Architecture

[← Back to README](../README.md)

## System Diagram

<!-- Required: a diagram, not just text. Mermaid renders natively on GitHub.
An exported PNG under docs/images/ is also fine. -->

```mermaid

```

## Request Walkthrough

<!-- Trace ONE real request end-to-end, e.g. "citizen files a complaint". -->


## Components



```mermaid

| Entity | Key fields | Notes |
|---|---|---|
| `<Complaint>` | `<id, type, lat, lng, photo_url, trust_score, status>` | `<...>` |
| `<...>` | `<...>` | `<...>` |

## Key APIs

| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| `POST` | `/api/complaints` | `<...>` | `<anonymous / token>` |
| `GET` | `/api/wards/:id/status` | `<...>` | `<public>` |

## Tech Stack

| Layer | Choice | Why this over alternatives |
|---|---|---|
| Frontend | `<...>` | `<...>` |
| Backend | `<...>` | `<...>` |
| Database | `<...>` | `<...>` |
| ML / AI | `<...>` (details in [ai.md](../ai.md#3-ai-inside-the-product-runtime)) | `<...>` |
| Hosting | `<...>` | `<...>` |

## Data Sources

| Dataset | Source & licence | Real or synthetic | Used for |
|---|---|---|---|
| `<Ward boundaries>` | `<...>` | `<...>` | `<...>` |
