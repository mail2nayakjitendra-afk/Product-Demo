# Vercel Next.js App

This is a minimal Next.js (React + Node) app scaffolded for deployment to Vercel.

It now includes a demo Product Dashboard (frontend) and simple in-memory product API endpoints under `/api/products` for GET/POST and `/api/products/[id]` for GET/PUT/DELETE.

Quick start

1. Install dependencies:

```powershell
cd vercel-nextjs-app; npm install
```

2. Run in development:

```powershell
npm run dev
```

3. Build and start:

```powershell
npm run build; npm start
```

Deploy to Vercel

1. Install the Vercel CLI (optional): `npm i -g vercel`
2. From the project root run `vercel` and follow prompts, or push to a Git provider connected to Vercel.

Vercel notes

- The project is a Next.js app; Vercel will detect it automatically when you run `vercel` or import the repo into the Vercel dashboard.
- Ensure your Node version is >=18; you can set this in the Vercel dashboard or rely on the `engines` field in `package.json`.
 - This project pins Next.js to `13.5.8` for compatibility with Node.js 18.16.1. The `engines` field requires `node >=18.0.0 <19`.
 - If you prefer to use Next.js 14+, upgrade your local Node to `>=18.17.0` (or use `nvm` / `volta` on local dev machines).
- Serverless functions are located under `pages/api` and will be deployed as separate serverless endpoints.

Product dashboard

- Visit `/` to open the Product Dashboard.
- API endpoints:
	- `GET /api/products` — list products
	- `POST /api/products` — create product { name, price, description }
	- `GET /api/products/:id` — get product
	- `PUT /api/products/:id` — update product
	- `DELETE /api/products/:id` — delete product


