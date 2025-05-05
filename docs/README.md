# 🎥 YouTube Smart Analyzer

A powerful YouTube-inspired web app that enhances video viewing with AI-powered insights and reminders.

## ✨ Features

### 🧠 1. Comment Summarizer
- Shows a clean, concise summary of comments to save viewer time.

### 🖼️ 2. Thumbnail Product Analyzer
- Analyzes the thumbnail using **Google Vision API**.
- Detects objects/products (e.g., iPhone, gaming chair).
- Adds quick **Amazon** and **Google** search links.

### ⏰ 3. Video Reminder System
- Allows users to **set custom reminders** to watch a video.
- Select time via date & time picker or quick presets (+15m, +30m, +1h).
- Uses **browser notifications** to alert users when it’s time.
- Saves reminders in **localStorage**, so they persist across sessions.

## 🛠️ Tech Stack

- **Next.js 14+** with App Router
- **React**, **Tailwind CSS**
- **Moment.js** for date/time handling
- **HuggingFace Inference API** for comment summarization
- **Google Vision API** for thumbnail object detection
- **TypeScript** for static typing
- **LocalStorage + Notifications API** for reminders

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/youtube-smart-analyzer.git
cd youtube-smart-analyzer
npm install
npm run dev
