# TruthPoll — Setup & Run Guide

## Requirements
- Node.js 18+ (download from nodejs.org)
- npm (comes with Node.js)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
# → http://localhost:3000
```

## Environment Variables

The `.env.local` file already contains your app_id:
```
NEXT_PUBLIC_APP_ID=app_31adba95583c21abe8d72d933c351d44
```

To test World ID verification in the browser (without World App on phone),
go to developer.worldcoin.org → your app → enable **Simulator** mode.

## Deploy to Vercel (for World App submission)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts — it will give you a URL like:
# https://truthpoll.vercel.app
```

Then go to developer.worldcoin.org → your app → set that URL as the Mini App URL.

## Project Structure

```
truthpoll-app/
├── app/
│   ├── page.tsx          ← Main feed page
│   ├── layout.tsx        ← MiniKit initialization
│   ├── globals.css       ← Global styles
│   └── api/
│       ├── verify/       ← World ID proof verification endpoint
│       └── surveys/      ← Survey list API
├── components/
│   ├── SurveyCard.tsx    ← Feed card component
│   ├── SurveyDetail.tsx  ← Survey + World ID widget
│   └── BottomNav.tsx     ← Navigation + Create + Profile views
└── lib/
    └── surveys.ts        ← Survey data (replace with DB later)
```
