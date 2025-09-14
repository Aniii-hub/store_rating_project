# store_rating_project
# 🏪 Store Ratings – Fullstack Project

A full-stack web app for managing **stores and ratings**, built with:

- **Backend:** Node.js + Express + Sequelize + PostgreSQL
- **Frontend:** React + Axios + React Router
- **Database:** PostgreSQL
- **Auth:** JWT-based authentication
- **Dev environment:** GitHub Codespaces (ready with `.devcontainer`)

---

## 🚀 Features

- 👤 User Signup & Login with validation  
- 🔑 Roles: `SystemAdmin`, `StoreOwner`, `Normal`  
- 🛍️ Stores can be created and managed  
- ⭐ Users can give ratings (1–5)  
- 📊 Admin dashboard: users, stores, ratings count  
- 🔍 Search and sort (users & stores)  

---

## ⚡ Quick Start (GitHub Codespaces)

1. Open this repo in GitHub.  
2. Click **Code → Open with Codespaces → New Codespace**.  
3. Wait for setup to finish (dependencies auto-install).  
4. Open a terminal in Codespaces:

### ▶️ Backend
```bash
cd backend
cp .env.example .env   # update if needed
npm install
npm run dev

store_ratings_codespace/
├── backend/          # Express + Sequelize API
├── frontend/         # React app
├── .devcontainer/    # Codespaces setup
├── docker-compose.yml
├── README.md
└── .gitignore
