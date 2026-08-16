# Post Organizer

A frontend-only, role-based post management dashboard built with React + Vite, Tailwind CSS,
Framer Motion, React Hook Form, and React Toastify. Everything — auth, users, posts — is
simulated with React Context and persisted to `localStorage`. There is no backend, database,
or API of any kind.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## Demo accounts

Passwords are intentionally simple since this is a local simulation, not a real auth system.

| Role         | Email                                | Password    |
|--------------|---------------------------------------|-------------|
| Admin        | ariana.admin@postorganizer.com        | admin123    |
| Admin        | marcus.admin@postorganizer.com        | admin123    |
| Admin        | priya.admin@postorganizer.com         | admin123    |
| Collaborator | leo.collab@postorganizer.com          | collab123   |
| Collaborator | nina.collab@postorganizer.com         | collab123   |
| Collaborator | diego.collab@postorganizer.com        | collab123   |
| Collaborator | sara.collab@postorganizer.com         | collab123   |
| Collaborator | owen.collab@postorganizer.com         | collab123   |
| Collaborator | meera.collab@postorganizer.com        | collab123   |
| User         | jordan.user@postorganizer.com         | user123     |
| User         | aisha.user@postorganizer.com          | user123     |

Select the matching role in the login form's "Login as" dropdown before signing in.

## How the data model works

- **Admins** can create, edit, and delete only the posts they created.
- **Collaborators** belong to exactly one Admin (`adminId` on the user record). They can upload
  posts into that Admin's workspace, but cannot edit or delete any post.
- **Users** can browse published posts from every Admin, with search and category filtering.

All seed data lives in `src/data/dummyData.js`. On first load, `AuthContext` and `PostContext`
seed `localStorage` with 3 admins, 6 collaborators (2 per admin), 2 users, and 15 posts (5 per
admin). After that, everything you do — creating, editing, deleting, uploading, logging in —
reads and writes directly to `localStorage`, so your changes persist across refreshes.

To fully reset the demo, clear your browser's localStorage for this site (or open dev tools →
Application → Local Storage → remove the `po_*` keys).

## Project structure

```
src/
  components/     Reusable UI building blocks (Navbar, Sidebar, PostCard, forms, etc.)
  context/        AuthContext + PostContext — the simulated backend
  data/           Dummy users, admins, collaborators, and posts
  pages/          Route-level pages (Login, Admin*, Collaborator*, UserDashboard)
  utils/          localStorage helpers and small formatting utilities
```
