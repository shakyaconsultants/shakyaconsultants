# CRM under `/crm` deployment guide

This project is configured to reverse-proxy your CRM under:

- `https://shakyaconsultants.com/crm`

Current CRM upstream:

- `https://crm-eight-lac.vercel.app`

## What is already implemented in this repo

1. `next.config.js`
   - Rewrites `/crm/:path*` -> `${CRM_ORIGIN}/:path*`
   - Redirects `/crm` -> `/crm/login`
   - Adds `X-Robots-Tag` for `/crm/*`
2. `middleware.ts`
   - Canonical host redirect support for `/crm/*` via `CANONICAL_HOSTNAME`
3. `.env.example`
   - `CRM_ORIGIN`
   - `CANONICAL_HOSTNAME`

## Main site environment variables

Set these in Vercel (main site project):

- `CRM_ORIGIN=https://crm-eight-lac.vercel.app`
- `CANONICAL_HOSTNAME=shakyaconsultants.com`

## Deploy commands (main site)

```bash
npm install
npm run build
vercel --prod
```

## Direct `vercel.app` domain redirect requirement

To force direct CRM domain hits to your main domain path:

1. Open the CRM repository.
2. Add the template from:
   - `deploy/crm-app/middleware.ts.template`
3. Deploy CRM again.

This redirects:

- `https://crm-eight-lac.vercel.app/login`

to:

- `https://shakyaconsultants.com/crm/login`

## Vercel domain setup checklist

### Main site project
- Ensure `shakyaconsultants.com` and `www.shakyaconsultants.com` are attached.
- Keep TLS active (default Vercel certs).

### CRM project
- Keep default `*.vercel.app` domain active.
- Do **not** attach `shakyaconsultants.com` to CRM project, since main site proxies `/crm`.

## DNS notes

- Keep `A`/`CNAME` records for `shakyaconsultants.com` pointing to main-site Vercel project.
- No new DNS records required specifically for `/crm` path routing.

## Auth/session/cookies guidance

- Prefer host-only cookies (no explicit Domain) in CRM app.
- If CRM sets explicit cookie domain to `*.vercel.app`, sessions will break under `/crm`.
- Keep callback URLs updated to `https://shakyaconsultants.com/crm/...`

## API/CORS guidance

- Browser requests from CRM pages under `/crm` are same-origin with main domain.
- Avoid hardcoding `crm-eight-lac.vercel.app` in frontend API calls.

## Websocket guidance

- Next.js external rewrites may be sufficient for many HTTP flows.
- If your CRM relies on strict websocket upgrades at scale, prefer edge proxy:
  - Cloudflare Worker: `deploy/cloudflare/crm-proxy-worker.js`
  - Nginx: `deploy/nginx/crm-reverse-proxy.conf`

## Rollback plan

1. Remove `/crm` rewrite and redirect entries from `next.config.js`.
2. Remove `/crm` matcher from `middleware.ts` (or remove file).
3. Redeploy main site.
4. Share direct CRM URL temporarily while fix is applied.
