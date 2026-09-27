# Setup & Run Instructions

[← Back to README](../README.md)

<!-- A reviewer should get this running in under 10 minutes if the live link is down. -->

## Prerequisites

| Tool | Version |
|---|---|
| `Node.js` | `20.x or later` |
| `npm` | `10.x or later` |
| `Git` | `Latest stable version` |
| `Web browser` | `Chrome` |
## 1. Clone

```bash
git clone https://github.com/greeshmaajgore26/HM26-8941-.git
cd HM26-8941-
```

## 2. Environment Variables

```bash
  cp .env.example .env.local
```

| Variable | Required | Example | Purpose |
|---|---|---|---|
| `OPENAI_API_KEY` | Yes | `sk-....` | `Powers AI features such as personalized learning, question generation, doubt assistance, and contextual re-theming` |


> Never commit real secrets. Commit only `.env.example`.

## 3. Install & Seed Demo Data

```bash
  npm install
  This project does not require a database migration or seed command. Demo learning data is included in the application.
```

## 4. Run

```bash
npm run dev

The Vite development server will display the local URL in the terminal, typically:

http://localhost:5173

npm run server

The AI server runs on:

http://localhost:5000
```

Open `http://localhost:<port>`. Test accounts are listed in [resource.md](../resource.md#5-live-mvp).

## Testing Offline Mode

1. `<Open the app and log in>`
2. `<Chrome DevTools → Network → Offline, or phone airplane mode>`
3. `<File a complaint → it shows "queued">`
4. `<Go back online → it syncs and shows "submitted">`

## Troubleshooting

| Problem | Fix |
|---|---|
| `<Port already in use>` | `<...>` |
