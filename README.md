# Novus

Novus is a robust content platform designed for modern storytelling. It allows users to share high-quality articles with an emphasis on visual reliability and performance through Cloudinary integration.

## Overview
Novus enables users to share their expertise through beautifully crafted articles. Built with modern web technologies, it offers a seamless writing and reading experience with features like real-time article updates, user authentication, and social interactions.

## Key Features

### 1. Secure Authentication System
- JWT-based authentication
- Protected routes for content management
- Secure password hashing with bcrypt
- Client-side session management

### 2. Article Management
- Create, Read, Update, and Delete (CRUD) articles
- Image management powered by Cloudinary (Auto-upload & Optimization)
- Upvoting system for community engagement
- Search functionality based on titles and categories

### 3. User Features
- Custom user profiles and portfolios
- Bio and account management
- Public profile views for discoverability

### 4. Modern UI/UX
- Responsive design for mobile and desktop
- Intuitive navigation with Tailwind CSS
- Real-time loading states and optimized image delivery

## Tech Stack

### Frontend
- **React 19** - UI library
- **React Router 7** - Navigation
- **Tailwind CSS 4** - Modern styling
- **Vite** - High-performance build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB & Mongoose** - Database & ODM
- **Cloudinary** - Image hosting and transformation
- **JWT & bcrypt** - Security and authentication

## Prerequisites
- Node.js >= 18.x
- npm >= 9.x
- MongoDB (Local or Atlas)

## Quick Start

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/RanaVinit/novus.git

# Install dependencies (Root, Backend, and Frontend)
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 2. Environment Setup
Create a `.env` file in the `backend/` directory with the following:
```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Development
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```
Visit `http://localhost:5173` to see the app in action.

## Project Structure
```text
novus/
├── backend/                # Backend API (Express)
│   ├── config/            # DB Configuration
│   ├── controllers/       # Business Logic
│   ├── middleware/        # Auth & Security
│   ├── models/           # Data Schemas
│   ├── routes/           # API Endpoints
│   └── scripts/          # Seeding & Migration tools
└── frontend/             # Frontend UI (React)
    ├── public/           # Static assets
    └── src/
        ├── components/   # UI Components
        ├── lib/          # Utilities (Image optimization, etc.)
        ├── pages/        # View Components
        └── App.jsx       # Routing & App Root
```

## Acknowledgments
- React Documentation
- Tailwind CSS
- MongoDB & Mongoose
- Cloudinary SDK