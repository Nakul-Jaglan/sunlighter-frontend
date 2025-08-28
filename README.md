
<p align="center">
  <img src="public/letter.png" alt="SunLighter Logo" width="240" height="120" />
</p>

# 🌞 SunLighter

> **Privacy-first employment verification platform**
>
> Live: [https://sunlighter.in](https://sunlighter.in)

---

## 🚀 Overview

SunLighter is a modern platform for secure, privacy-focused employment verification. Employees can manage their employment history and generate verification codes, while employers can verify candidates with confidence.

---

## ✨ Features

- Employee dashboard for managing employment records
- Generate and revoke verification codes
- Employer dashboard for verification requests
- Secure authentication (JWT, refresh tokens)
- Privacy-first: you control your data
- Responsive, beautiful UI

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Framer Motion
- **Backend:** FastAPI, PostgreSQL (see backend repo)
- **Auth:** JWT, refresh tokens, secure localStorage

---

## 🖥️ Local Development

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/sunlighter-frontend.git
   cd sunlighter-frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or yarn install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in your values.
   - Example:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
     ```
4. **Run the dev server:**
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables

| Name                  | Description                        |
|-----------------------|------------------------------------|
| NEXT_PUBLIC_API_URL   | Backend API base URL (required)    |

**Never commit secrets or production credentials to the repo.**

---

## ☁️ Deployment

- Deploys instantly on [Vercel](https://vercel.com/)
- Set `NEXT_PUBLIC_API_URL` in Vercel project settings
- [Live Demo](https://sunlighter.nakul.click)

---

## 🙌 Credits

- Built by [Nakul Jaglan](mailto:jaglan.nakul@gmail.com)
- Powered by [Next.js](https://nextjs.org/) & [FastAPI](https://fastapi.tiangolo.com/)

---

<p align="center"><b>🌞 SunLighter — Secure, simple, and privacy-first employment verification.</b></p>
