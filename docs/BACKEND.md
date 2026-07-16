# Backend Status & Guide (Member 3)

Last updated: 2026-07-16

## ✅ What's ready

### Authentication (working end-to-end)
- Email + password signup with email confirmation
- Login / logout
- Pages: `/signup`, `/login`, `/dashboard` (placeholder UI — Member 1 replaces these)
- Server actions: `login`, `signup`, `logout` in `app/auth/actions.ts`
- Email confirmation handled at `/auth/callback`

### Session management
- `middleware.ts` refreshes the session on every request
- Protected routes: `/dashboard`, `/boardroom`, `/reports` → redirect to `/login` if not signed in
- Add more protected paths in `lib/supabase/middleware.ts` (`protectedPaths` array)

### Database (Supabase Postgres)
Schema in `supabase/schema.sql`. Tables:

| Table | What it stores |
|---|---|
| `profiles` | User info (auto-created on signup by trigger) |
| `pitches` | Startup idea: name, problem, solution, audience, business/revenue model |
| `board_meetings` | One debate session per pitch: status, decision (invest/pivot/reject), score |
| `debate_messages` | Every executive statement, ordered (`agent`, `content`, `round`, `order_index`) |
| `scores` | Per-executive, per-category scores 0–100 |
| `reports` | Final AI report as JSON |

Agent roles enum: `ceo, cto, cfo, cmo, vc, moderator`
Score categories enum: `market_opportunity, technology, finance, marketing, innovation, execution, risk`

### Security
- Row Level Security ON for all tables — users can only access their own data
- Private storage bucket `pitch-decks` (files go in `{user_id}/filename`)

### REST APIs (all require login; return JSON)

**Pitches**

| Method | Endpoint | What it does |
|---|---|---|
| GET | `/api/pitches` | List your pitches |
| POST | `/api/pitches` | Create pitch — body: `startup_name, problem_statement, solution, target_audience, business_model, revenue_model` |
| GET | `/api/pitches/:id` | Get one pitch |
| PATCH | `/api/pitches/:id` | Update fields |
| DELETE | `/api/pitches/:id` | Delete (cascades to meetings) |

**Meetings & debate (Member 2's main endpoints)**

| Method | Endpoint | What it does |
|---|---|---|
| GET | `/api/meetings` | List meetings (`?pitch_id=` to filter) |
| POST | `/api/meetings` | Start meeting — body: `{ pitch_id }` |
| GET | `/api/meetings/:id` | Full meeting: pitch + transcript + scores + report |
| PATCH | `/api/meetings/:id` | Update `{ status, decision, overall_score }` |
| DELETE | `/api/meetings/:id` | Delete meeting |
| GET | `/api/meetings/:id/messages` | Debate transcript in order |
| POST | `/api/meetings/:id/messages` | Append `{ agent, content, round }` or `{ messages: [...] }` — ordering handled automatically |
| GET/POST | `/api/meetings/:id/scores` | Get / upsert `{ scores: [{ agent, category, value }] }` |
| GET/POST | `/api/meetings/:id/report` | Get / save the final report JSON |

Errors come back as `{ "error": "message" }` with proper status codes (401 not logged in, 400 bad input, 404 not found).

## 🔜 Not ready yet (in progress)

- Pitch deck upload endpoint
- Vercel deployment

## How to use it (Members 1 & 2)

### Setup on your machine
1. `git pull`, then `npm install`
2. Copy `.env.example` → `.env.local`, get the URL + anon key from Sumeet (do NOT commit `.env.local`)
3. `npm run dev`

### Get the logged-in user (Server Component / API route)
```ts
import { createClient } from "@/lib/supabase/server";

const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();
```

### Query data (RLS automatically scopes to the logged-in user)
```ts
const { data: pitches } = await supabase
  .from("pitches")
  .select("*")
  .order("created_at", { ascending: false });
```

### Insert data
```ts
const { data, error } = await supabase.from("pitches").insert({
  user_id: user.id,
  startup_name: "...",
  problem_statement: "...",
  solution: "...",
  target_audience: "...",
  business_model: "...",
  revenue_model: "...",
}).select().single();
```

### Client Components
Use `createClient` from `@/lib/supabase/client` instead (no `await`).

## Questions
Ping Srushti (Member 3).
