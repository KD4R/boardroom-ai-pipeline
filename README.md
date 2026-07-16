# BoardroomAI

A virtual Board of Directors that helps founders validate startup ideas. AI executives (CEO, CTO, CFO, CMO, VC) debate your pitch and deliver an investment decision.

## Tech Stack

Next.js (App Router) · TypeScript · Tailwind CSS · Supabase (Postgres, Auth, Storage) · Vercel

## Setup

1. **Clone & install**

   ```bash
   git clone https://github.com/GitBeat16/boardroom.git
   cd boardroom
   npm install
   ```

2. **Create a Supabase project** at [supabase.com](https://supabase.com) (free tier is fine).

3. **Run the schema**: open Supabase Dashboard → SQL Editor → paste the contents of `supabase/schema.sql` → Run.

4. **Configure env vars**:

   ```bash
   cp .env.example .env.local
   ```

   Fill in the values from Supabase Dashboard → Project Settings → API.

5. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/                  # Next.js App Router pages & API routes
lib/supabase/         # Supabase clients (browser, server, middleware)
middleware.ts         # Session refresh + route protection
supabase/schema.sql   # Database schema, RLS policies, storage buckets
```

## Database

Core tables: `profiles`, `pitches`, `board_meetings`, `debate_messages`, `scores`, `reports`. All tables have Row Level Security — users can only access their own data. A trigger auto-creates a profile on signup. Pitch decks live in the private `pitch-decks` storage bucket.
