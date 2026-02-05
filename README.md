# Novus - Modern Storytelling Platform

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)](https://www.mongodb.com/mern-stack)
[![Cloudinary](https://img.shields.io/badge/Image-Cloudinary-orange?style=for-the-badge)](https://cloudinary.com)
[![JWT](https://img.shields.io/badge/Auth-JWT-black?style=for-the-badge)](https://jwt.io)

**Novus** is a production-ready content platform designed for modern storytelling. Built with the MERN stack, it prioritizes security, performance, and a seamless developer experience.

---

## System Architecture

Novus follows a decoupled Client-Server architecture with centralized state management and cloud integration.

```mermaid
graph TD
    User([User / Browser])
    subgraph "Frontend (React + Vite)"
        UI[Tailwind UI]
        State[React Hooks/Context]
        Axios[API Client]
    end
    subgraph "Backend (Express + Node)"
        Router[API Router]
        Auth[JWT Authentication]
        Controllers[Business Logic]
        Error[Global Error Handler]
    end
    Cloudinary[Cloudinary CDN]
    DB[(MongoDB Atlas)]

    User <--> UI
    UI <--> State
    State <--> Axios
    Axios <--> Router
    Router <--> Auth
    Auth <--> Controllers
    Controllers <--> DB
    Controllers <--> Cloudinary
    Error -.-> User
```

---

## Authentication Flow

Secure implementation of Stateless Authentication using JSON Web Tokens (JWT).

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant DB

    User->>Frontend: Enter Credentials
    Frontend->>Backend: POST /api/auth/login
    Backend->>DB: Verify User
    DB-->>Backend: User Found
    Backend->>Backend: Sign JWT (Secret key)
    Backend-->>Frontend: HTTP 200 + JWT Token
    Frontend->>Frontend: Store Token in LocalStorage
    Note over User,DB: Subsequent Requests
    Frontend->>Backend: Authorization: Bearer <token>
    Backend->>Backend: Verify Signature
    Backend-->>Frontend: Dynamic Data
```

---

## Data Model (ERD)

Optimized MongoDB schemas designed for high performance and scalability.

```mermaid
erDiagram
    USER ||--o{ ARTICLE : authors
    USER {
        string _id
        string username
        string email
        string password
        string bio
        string profileImage
    }
    ARTICLE {
        string _id
        string title
        string content
        string category
        string coverImage
        objectId author
        array upvotes
        date createdAt
    }
    SUBSCRIBER {
        string _id
        string email
    }
```

---

## Key Features & Interview Talking Points

### 1. **Stateless Security**
- **JWT & Bcrypt**: Stateless authentication and password hashing.
- **Production Middleware**: Integrated `Helmet` for secure headers and `express-rate-limit` to prevent Brute-Force/DDoS attacks.

### 2. **Cloud-Native Media**
- **Cloudinary Integration**: Direct-to-cloud image uploads with server-side validation, ensuring the database only stores optimized CDN URLs.

### 3. **Developer Experience (DX)**
- **Centralized Error Handling**: A global middleware captures all asynchronous errors, preventing server crashes and returning clean, consistent JSON responses.

### 4. **Modern Frontend Architecture**
- **React 19 Hooks**: Utilizing the latest React features for efficient state management.
- **Code Splitting**: implemented `React.lazy` and `Suspense` for faster initial page loads and reduced bundle sizes.

---

## Tech Stack

- **Frontend**: React 19, Tailwind CSS 4, Vite, Axios, Lucide React.
- **Backend**: Node.js, Express.js (v5), MongoDB (Mongoose), JWT, Cloudinary.
- **Security**: Helmet, Express Rate Limit, Bcrypt, CORS Hardening.
- **Optimization**: Compression (Gzip/Brotli), Code Splitting.

---

## Getting Started

### Prerequisites
- Node.js >= 18.x
- MongoDB (Running locally or via Atlas)

### Setup
1. **Clone the Repo**
   ```bash
   git clone https://github.com/RanaVinit/novus.git
   ```
2. **Backend Configuration**
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run dev
   ```
3. **Frontend Configuration**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

## Roadmap & Future Enhancements
- [ ] **Unit & Integration Testing**: Implementing Jest and Supertest.
- [ ] **Caching Layer**: Integrating Redis for high-traffic article feeds.
- [ ] **Social Features**: Commenting system and real-time notifications.
- [ ] **CI/CD**: GitHub Actions for automated deployment and quality checks.

---

## License
ISC License. Feel free to use this project for learning or as a foundation for your own platform!