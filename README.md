# Voting App UI

The front-end for the Voting App, built with **Angular 21**. Connects to the [Voting App API](../voting-app-api) running on `http://localhost:5000`.

---

## Requirements

- **Node.js** v18+
- **npm** v9+
- Voting App API running locally

---

## Getting Started

```bash
# 1. Clone the repository
git clone <repo-url> voting-app-ui
cd voting-app-ui

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

Open your browser and navigate to `http://localhost:4200`. The app will automatically reload on file changes.

---

## Login Credentials

Use the following pre-seeded accounts to access the application.

**Admin**

| Field | Value |
|-------|-------|
| Email | `administrator@yopmail.com` |
| Password | `Administrator123!` |

**Regular Users**

| Name | Email | Password |
|------|-------|----------|
| user 2 | `user-2@yopmail.com` | `User2222!` |
| user 3 | `user-3@yopmail.com` | `User3333!` |

---

## Pages

### Login — `/login`

- **Access:** Public (redirects to the appropriate page if already logged in)
- **How to use:**
  1. Enter your email and password.
  2. Click **Login**.
  3. Admins are redirected to the **Dashboard**; regular users are redirected to the **Cast Vote** page.

---

### Cast Vote — `/vote`

- **Access:** Logged-in users with role `user` only. Admins cannot access this page.
- **How to use:**
  1. A list of available candidates is displayed — click a candidate's name to select them.
  2. Alternatively, type a candidate name manually in the text field at the bottom.
  3. Click **Submit Vote** to cast your vote.
  4. Each user may only vote **once**. After voting, a confirmation message is shown and the voting form is replaced with a thank-you screen.

---

### Vote Results (Dashboard) — `/admin/dashboard`

- **Access:** Admin only.
- **How to use:**
  1. The page loads automatically with a table of all candidates ordered by vote count (highest first).
  2. The total number of votes cast is shown in the header badge.
  3. The top-ranked candidate is highlighted in the table.

---

### User Management — `/admin/users`

- **Access:** Admin only.
- **How to use:**

  **View users**
  - All registered users (non-admin) are listed in a table showing their name and role.

  **Create a user**
  1. Click **+ New User**.
  2. Fill in the name, email, and password fields.
  3. Click **Save** — the new user will appear in the table immediately.

  **Edit a user**
  1. Click **Edit** on the row of the user you want to modify.
  2. Update the name, email, and/or password as needed. Leave the password field blank to keep the current password unchanged.
  3. Click **Save** to apply the changes.

  **Delete a user**
  1. Click **Delete** on the row of the user you want to remove.
  2. Confirm the prompt — the user and all their votes are permanently deleted.
