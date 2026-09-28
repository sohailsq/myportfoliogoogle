# Sohail Shah Quadri — Senior Full-Stack & DevOps Portfolio

> "I don't just write code — I build and deploy complete products."

A modern, production-grade personal engineering website for **Sohail Shah Quadri**, Software Engineer & Full-Stack Developer based in Hyderabad, India.

---

## 1. Overview & Key Capabilities

- **Role:** Software Engineer | Full-Stack Developer | React Native Developer | DevOps Enthusiast
- **Location:** Hyderabad, Telangana, India
- **Experience:** 2+ Years of Software Development Experience
- **Education:** Bachelor's in Computer Science, Deccan College of Engineering and Technology (2021 – 2025)
- **Specializations:** Full-Stack JavaScript, React, Next.js, Node.js, Express, MongoDB, React Native, AWS, Docker, CI/CD, DevOps

---

## 2. Core Architecture

The application is structured as a full-stack system with Express REST APIs, MongoDB Mongoose data modeling with an automatic in-memory persistence fallback, and a React SPA frontend:

```text
portfolio/
├── Dockerfile                   # Multi-stage production container build
├── docker-compose.yml           # Local dev orchestrator for App + MongoDB
├── .env.example                 # Environment variables specification
├── index.html                   # SEO, OpenGraph, JSON-LD schema
├── metadata.json                # Project capabilities & permissions
├── server.ts                    # Full-stack Express server with Vite middleware integration
│
├── server/                      # Backend Architecture
│   ├── config/                  # DB connector & unified repository layer
│   ├── controllers/             # Auth, projects, experience, skills, contact, github
│   ├── data/                    # Seed data with Sohail's verified career history
│   ├── middleware/              # JWT verification & admin authorization
│   ├── models/                  # Mongoose schemas (User, Project, Experience, Skill, Contact)
│   ├── routes/                  # Express REST API routes
│   └── types.ts                 # Backend data models
│
└── src/                         # Frontend Architecture
    ├── assets/images/           # High-resolution generated project mockups & portrait
    ├── components/              # Navbar, Footer, CommandPalette, TerminalWidget, Modals
    ├── context/                 # ThemeContext (dark/light) & AuthContext (JWT)
    ├── sections/                # Hero, About, Skills, Projects, Experience, DevOps, Github, Contact
    ├── services/                # Type-safe API client
    ├── App.tsx                  # Root application orchestrator
    └── main.tsx                 # DOM mount
```

---

## 3. Key Features

- **Interactive Command Center (Hero):**
  - Integrated interactive shell supporting real commands (`help`, `projects`, `skills`, `experience`, `contact`, `whoami`, `curl -s /api/health`).
  - Architecture pipeline visualization and stack telemetry metrics.
- **Project Case Studies:**
  - In-depth case studies for **JetFyx** (Forex trading app with React Native & WebSockets), **Richesse Solutions** (Fintech wealth suite), **NexaDeutsch** (German A1 learning portal), **SmartSync** (Medical vitals tracker), and **Prodify** (Productivity platform).
  - Architecture breakdown, technical hurdles, and measurable production metrics.
- **From Code to Production (DevOps Section):**
  - Interactive pipeline visualizer showing: Git Developer Workflow → GitHub Actions CI/CD → Docker Multi-Stage Container → AWS EC2 & NGINX Reverse Proxy → MongoDB Atlas Cluster.
  - Interactive code viewer with copyable configurations.
- **ATS-Compliant Printable Resume:**
  - Full-screen resume viewer with 1-click "Print / Save PDF" support.
- **Live Contact Form with Anti-Spam:**
  - POST `/api/contact` endpoint with rate-limiting, email validation, and direct storage in database.
- **Secured Admin Portal (CRUD):**
  - JWT authentication using secure cookies / bearer tokens.
  - 1-click test credentials fill (`admin@sohailshah.dev` / `admin123`).
  - Manage projects, experience, skills, and view inbound client messages.
- **Command Palette (`Ctrl+K` / `⌘K`):**
  - Keyboard navigation for jumping to sections, copying email, switching theme, and opening admin.
- **Strict Anti-AI Slop Design Compliance:**
  - Zero-pill metadata discipline with unboxed text and typographic separators (`·`, `/`).
  - Natural editorial typography without mechanical prefixes (`// 01`).
  - WCAG AA contrast compliance and dark/light mode toggle.

---

## 4. API Endpoints

### Public Endpoints
- `GET  /api/health` — System health and uptime
- `GET  /api/projects` — List projects (optional `?category=` filter)
- `GET  /api/projects/:slug` — Single project details
- `GET  /api/experience` — Timeline records
- `GET  /api/skills` — Skills catalog (optional `?category=` filter)
- `GET  /api/github/stats` — GitHub profile and repository telemetry
- `POST /api/contact` — Submit inbound inquiry (rate-limited)

### Authentication & Admin Endpoints (Protected by JWT)
- `POST /api/auth/login` — Admin login (issues JWT token)
- `POST /api/auth/logout` — Admin logout (clears cookie)
- `GET  /api/auth/me` — Verify session
- `POST /api/projects` — Create project
- `PUT  /api/projects/:id` — Update project
- `DELETE /api/projects/:id` — Delete project
- `POST /api/projects/reset/seeds` — Restore seed projects
- `GET  /api/contact` — View all inbound messages
- `PUT  /api/contact/:id/status` — Mark message as read/replied
- `DELETE /api/contact/:id` — Delete message

---

## 5. Development & Deployment

### Local Development
```bash
# Install dependencies
npm install

# Start full-stack dev server (Express + Vite on Port 3000)
npm run dev
```

### Docker Deployment
```bash
# Build and run container with MongoDB
docker-compose up --build -d
```

### Environment Variables
Configure `.env`:
```ini
PORT=3000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/sohail_portfolio
JWT_SECRET=your_secure_jwt_secret
GITHUB_USERNAME=sohailshah
NEXT_PUBLIC_API_URL=http://localhost:3000
```
*Note: If `MONGODB_URI` is omitted, the application automatically runs in in-memory repository mode with full persistence for testing and evaluation.*
