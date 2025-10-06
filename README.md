
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
| Database | PostgreSQL / SQLite (for local) |
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
├── pages/api/ # backend routes for auth, messages, users
├── prisma/ # database schema & migrations
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
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/messenger"

NEXTAUTH_SECRET="your_random_secret"
NEXTAUTH_URL="http://localhost:3000"

PUSHER_APP_ID="your_app_id"
PUSHER_KEY="your_key"
PUSHER_SECRET="your_secret"
PUSHER_CLUSTER="your_cluster"
```

> For local development you can switch to SQLite:
>
> ```
> DATABASE_URL="file:./dev.db"
> ```

---

## 🧩 Database Setup

Generate and migrate your schema:

```bash
npx prisma generate
npx prisma migrate dev
```

To inspect or edit data:

```bash
npx prisma studio
```

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

## 🗃 Example Prisma Schema

```prisma
model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  password  String
  chats     Chat[]   @relation("ChatUsers")
  messages  Message[]
  createdAt DateTime @default(now())
}

model Chat {
  id           String     @id @default(cuid())
  participants User[]     @relation("ChatUsers")
  messages     Message[]
  createdAt    DateTime   @default(now())
}

model Message {
  id        String   @id @default(cuid())
  chat      Chat     @relation(fields: [chatId], references: [id])
  chatId    String
  sender    User     @relation(fields: [senderId], references: [id])
  senderId  String
  body      String
  createdAt DateTime @default(now())
}
```
## ☁️ Deployment

Recommended:

* **Vercel** for hosting the Next.js app
* **Railway / Render / Supabase** for database hosting

Steps:

1. Set up your `.env` variables in the hosting platform.
2. Deploy the project.
3. Run:

   ```bash
   npx prisma migrate deploy
   ```
4. (Optional) Enable **Prisma Data Proxy** for better scalability.

---

## 🧩 API Endpoints

| Method                  | Route                               | Description |
| ----------------------- | ----------------------------------- | ----------- |
| `POST /api/auth/signup` | Register a new user                 |             |
| `POST /api/auth/signin` | Authenticate a user                 |             |
| `GET /api/chats`        | Retrieve user’s chats               |             |
| `GET /api/chats/[id]`   | Get messages in a chat              |             |
| `POST /api/messages`    | Send a new message                  |             |
| `GET /api/pusher/auth`  | Authenticate Pusher private channel |             |

---

## 🧤 Developer Notes

* All protected routes are managed via `middleware.ts`.
* API logic is colocated under `pages/api/`.
* Pusher client and server instances are initialized in `/lib/pusher.ts`.
* Prisma client should be imported from a single shared instance to avoid hot-reload issues.
* Maintain version sync between `prisma` and `@prisma/client`.
