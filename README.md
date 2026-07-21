

I'll walk you through from 0 to running app. We’ll do it in 8 steps so it doesn’t get overwhelming.

### *Step 1: Setup Repo + Install*
1. Create folder
    mkdir my-content-brain && cd my-content-brain
    pnpm init
2. Add workspaces. In root `package.json`:
    {
      "name": "my-content-brain",
      "private": true,
      "packageManager": "pnpm@9.0.0",
      "workspaces": ["apps/*", "packages/*"]
    }
3. Create folders:
    mkdir -p apps/web packages/database packages/ai packages/publishers
### *Step 2: Create http://Next.js Frontend*
1. ```bash
    cd apps/web
    pnpm dlx create-next-app@latest. --ts --tailwind --app --src-dir false
2. Install Supabase client
    ```bash
    pnpm add @supabase/supabase-js
3. Copy your `.env.example` to `apps/web/.env.local` and leave it blank for now

### *Step 3: Setup Supabase*
1. Go to https://app.supabase.com > New Project
2. Project Settings > API > copy:
    `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
3. Paste them in `.env.local`
4. Go to SQL Editor > paste the full schema I gave you above > Run
5. Enable Email Auth: Authentication > Providers > Email

### *Step 4: Create Database Package*
`packages/database/package.json`
{
  "name": "@my-content-brain/database",
  "version": "1.0.0",
  "main": "client.ts"
}
`packages/database/client.ts`
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const supabaseAdmin = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)
### *Step 5: Create AI Package*
1. ```bash
    cd packages/ai && pnpm add openai
2. `packages/ai/openai.ts`
    ```ts
    import OpenAI from 'openai'
    export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    export async function generateContent(prompt: string) {
      const res = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }]
      })
      return res.choices[0].message.content
    }
3. Get your key: https://platform.openai.com/api-keys > paste in `.env.local` as `OPENAI_API_KEY=sk-...`

### *Step 6: Create Publishers Package*
`packages/publishers/package.json`
{ "name": "@my-content-brain/publishers", "version": "1.0.0" }
Start with just WordPress for now:
export async function publishToWordPress(title: string, content: string) {
  const auth = btoa(`${process.env.WORDPRESS_USERNAME}:${process.env.WORDPRESS_APPLICATION_PASSWORD}`)
  const res = await fetch(`${process.env.WORDPRESS_SITE_URL}/wp-json/wp/v2/posts`, {
    method: 'POST',
    headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, status: 'draft' })
  })
  return res.json()
}
Get WordPress app password: wp-admin > Users > Profile > Application Passwords

### *Step 7: Wire it to http://Next.js API*
`apps/web/app/api/generate/route.ts`
import { NextResponse } from 'next/server'
import { generateContent } from '@my-content-brain/ai'
import { supabaseAdmin } from '@my-content-brain/database'

export async function POST(req: Request) {
  const { prompt, user_id } = await req.json()
  const content = await generateContent(prompt)

  const { data } = await supabaseAdmin
   .from('content_items')
   .insert({ user_id, title: prompt.slice(0,50), content, content_type: 'note', status: 'draft' })
   .select()

  return NextResponse.json(data)
}
Link packages in root: `pnpm i @my-content-brain/database @my-content-brain/ai @my-content-brain/publishers`

### *Step 8: Run It*
1. `pnpm dev` from root
2. Go to `http://localhost:3000`
3. Test with Postman: `POST /api/generate` with `{ "prompt": "Write 3 LinkedIn hooks about AI", "user_id": "your-supabase-user-id" }`

---

#### *What to do next*
Pick which integration you want me to guide you through now:

1. *Auth UI*: Login/Signup pages with Supabase
2. *LinkedIn + Facebook OAuth*: Connect accounts and post
3. *Knowledge Base*: Upload PDF and do semantic search
4. *Publishing Queue*: Cron job that auto-posts


