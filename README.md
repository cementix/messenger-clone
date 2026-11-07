
# Messenger Clone

A full-stack **real-time messenger** built with Next.js, Prisma, NextAuth, Pusher, and Tailwind CSS.  
It replicates the core logic of a modern messaging app — authentication, chats, and live message updates — while keeping the code modular and readable.

---

## 📖 Overview

Messenger Clone is a simple and extendable chat application focused on backend logic and developer experience.  
It demonstrates how to combine **Next.js App Router**, **Prisma ORM**, and **Pusher** to build a reactive and type-safe communication system.

This project can serve as:
- a base for your own messenger or social app,  
- a portfolio piece to demonstrate full-stack development skills,  
- or a sandbox to explore real-time features, authentication, and database design.

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Framework | [Next.js 14](https://nextjs.org) |
| Language | TypeScript |
| ORM | [Prisma](https://www.prisma.io) |
| Database | MongoDB (replica set) |
| Authentication | [NextAuth.js](https://next-auth.js.org) |
| Real-time | [Pusher](https://pusher.com) |
| Styling | Tailwind CSS + Headless UI |
| Utilities | Axios, Lodash, date-fns, bcrypt |

---

## 🧱 Project Structure

```

messenger-clone/

├── app/ # Next.js App Router structure
├── components/ # UI components
├── lib/ # helpers (auth, prisma, pusher, etc.)
├── pages/api/ # Pusher channel authorization
├── prisma/ # database schema
├── public/ # static assets
├── styles/ # Tailwind config & globals
├── middleware.ts # access control middleware
├── next.config.mjs # Next.js config
├── postcss.config.mjs # PostCSS config
├── package.json
└── tsconfig.json

````

---

## 🚀 Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/cementix/messenger-clone.git
cd messenger-clone
````

### 2. Install dependencies

```bash
yarn install --frozen-lockfile
```

### 3. Environment variables

Copy `.env.example` to `.env` and fill in the values. Generate a local `NEXTAUTH_SECRET` with:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

In the Google and GitHub OAuth app settings, register the corresponding callback URL:

| Provider | Local callback |
| -------- | -------------- |
| Google | `http://localhost:3000/api/auth/callback/google` |
| GitHub | `http://localhost:3000/api/auth/callback/github` |

Use the same scheme, host, and port in `NEXTAUTH_URL` and the registered callback URLs. On production, use the public HTTPS origin. Use a separate GitHub OAuth app for development if the production app already has its callback configured.

For real-time updates, set the credentials for a Pusher Channels app in the `eu` cluster. For image uploads, set the Cloudinary cloud name and configure an unsigned upload preset named `oeigxkxm`.

---

## 🧩 Database Setup

Set `DATABASE_URL` to a MongoDB replica set connection string with the database name in the path. For MongoDB Atlas, check that the original cluster is running and that the database user and network access are configured for your app. To keep existing accounts and messages, reconnect to the original database or restore a backup.

For a new empty database, create the indexes from the Prisma schema:

```bash
yarn prisma db push
```

To start fresh on an existing deployment, run this command with the new database's URL in your local `.env`, then set the deployment's `DATABASE_URL` to the same value and redeploy. Existing accounts, OAuth links, and messages stay in the old database.

If both OAuth providers time out after redirecting back to the app, check the deployment logs for `/api/auth/callback/google` and `/api/auth/callback/github`. Both callbacks access MongoDB through the Prisma adapter. For a timeout before reaching the provider, check the OAuth configuration and the host's outbound connectivity.

---

## 🧠 Development

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

### Lint check

```bash
npm run lint
```

---

## 🔗 Core Features

* 🔐 Secure authentication with NextAuth
* 💬 Real-time messaging powered by Pusher
* 🔄 Reactive chat updates across clients
* 🧍 User presence and online status
* 🪶 Lightweight Tailwind UI
* 🧩 Clean modular architecture for scaling

---

## ☁️ Deployment

1. Set the production environment variables on the hosting platform and allow the deployed app to reach MongoDB.
2. Set `NEXTAUTH_URL` to the production origin and register the production OAuth callbacks.
3. Prepare the database as described above, then deploy and test both sign-in flows.

---

## 🧩 API Endpoints

| Method                  | Route                               | Description |
| ----------------------- | ----------------------------------- | ----------- |
| `POST /api/register` | Register a new user |
| `GET/POST /api/auth/[...nextauth]` | NextAuth sign-in and callbacks |
| `POST /api/conversations` | Open or create a conversation |
| `POST /api/messages`    | Send a new message                  |             |
| `POST /api/pusher/auth`  | Authenticate Pusher private channel |             |

---

## 🧤 Developer Notes

* All protected routes are managed via `middleware.ts`.
* App API routes live under `app/api/`, with Pusher authorization under `pages/api/`.
* Pusher client and server instances are initialized in `/lib/pusher.ts`.
* Prisma client should be imported from a single shared instance to avoid hot-reload issues.
* Maintain version sync between `prisma` and `@prisma/client`.
