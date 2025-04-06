# SimpleTimesheets - Project Plan

## 1. Overview

This project aims to create a modern, web-based time tracking application inspired by Anuko Time Tracker. Users will be able to log time spent on specific tasks associated with projects, which in turn belong to clients. The application will feature reporting capabilities and user authentication.

## 2. Technology Stack

*   **Monorepo Tool:** pnpm workspaces
*   **Backend:**
    *   Language/Framework: Node.js + TypeScript + NestJS
    *   Database: PostgreSQL
    *   ORM: Prisma
    *   Authentication: Passport.js (JWT strategy initially)
*   **Frontend:**
    *   Framework/Library: React + TypeScript
    *   Build Tool: Vite
    *   UI Library: Mantine
    *   Routing: React Router
    *   API Communication: axios (or fetch)
*   **Development Environment:** Docker Compose (for PostgreSQL)

## 3. Architecture

*   **Monorepo Structure:**
    *   `root/`
        *   `apps/`
            *   `backend/` (NestJS application)
            *   `frontend/` (React/Vite application)
        *   `packages/` (Optional: for shared code later)
        *   `docker-compose.yml`
        *   `pnpm-workspace.yaml`
        *   `package.json`
        *   `PROJECT.md`
*   **Backend:** RESTful API providing endpoints for authentication and CRUD operations on core data models.
*   **Frontend:** Single Page Application (SPA) interacting with the backend API.

## 4. Core Features (Initial Focus - Phase 1)

*   **User Authentication:** Internal database authentication (Register, Login).
*   **Data Models:** Clients, Projects, Tasks, Time Entries, Users.
*   **Basic CRUD APIs:** Endpoints for managing Clients, Projects, Tasks (creation/reading initially).
*   **Basic Frontend Pages:** Login, Registration, Placeholder Dashboard.
*   **Core Time Entry API:** Endpoint to submit time entries.

## 5. Database Schema (Conceptual - via Prisma)

*   `User`: id, email, password (hashed), etc.
*   `Client`: id, name, etc.
*   `Project`: id, name, clientId (FK to Client), etc.
*   `Task`: id, name, projectId (FK to Project), etc.
*   `TimeEntry`: id, userId, clientId, projectId, taskId, duration, notes, date, etc.

## 6. Authentication Strategy

*   **Phase 1:** Implement internal username/password authentication using Passport.js and JWTs.
*   **Future Phases:** Architect the system to allow for the integration of LDAP and OpenID Connect authentication methods.

## 7. Phased Implementation Plan

1.  **Phase 1: Project Setup & Core Authentication**
    *   Initialize monorepo (`pnpm`).
    *   Set up Docker Compose for PostgreSQL.
    *   Scaffold NestJS backend (`apps/backend`).
    *   Scaffold React+Vite frontend (`apps/frontend`).
    *   Install core dependencies (NestJS modules, Prisma, React, Mantine, React Router).
    *   Configure Prisma, define initial schema, run first migration.
    *   Implement User model and basic internal authentication (register, login endpoints & frontend flow).
    *   Set up basic API modules/controllers/services for Clients, Projects, Tasks.
    *   Create basic Login, Register, and Dashboard pages in the frontend.
2.  **Phase 2: Time Entry**
    *   Implement the Time Entry form on the frontend (Client -> Project -> Task selection, duration, notes, date).
    *   Implement the backend API endpoint to receive and store time entries.
    *   Display submitted time entries (basic list).
3.  **Phase 3: CRUD Management Pages**
    *   Implement frontend pages and backend APIs for full CRUD operations on Clients, Projects, and Tasks.
4.  **Phase 4: Reporting**
    *   Define and implement backend API endpoints for generating time reports (e.g., time per project, time per client, time per user within a date range).
    *   Implement frontend reporting views to display the data.
5.  **Phase 5: Advanced Authentication (Future)**
    *   Integrate LDAP authentication.
    *   Integrate OpenID Connect authentication.

## 8. Development Environment

*   Local development relies on Node.js, pnpm, and Docker (for PostgreSQL).
*   Environment variables (`.env` files) will be used for configuration (database connection strings, JWT secrets, etc.).
