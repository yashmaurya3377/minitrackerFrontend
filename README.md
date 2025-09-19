#  Mini Event Tracker – Frontend

This is the **frontend** for the **Mini Event Tracker** app.
It is built with **React (Vite)**, **TailwindCSS**, **Framer Motion**, and integrates with the backend API for authentication and event management.

---

##  Tech Stack

* **React 19** + **Vite** (modern build tool)
* **React Router v7** (routing)
* **Axios** (API requests)
* **TailwindCSS** (styling)
* **Framer Motion** (animations)
* **Lucide Icons** (modern icons)

---

##  Features

*  User authentication (signup, login, logout)
*  Profile management with user stats (upcoming & past events)
*  Event management (create, view, share, filter)
*  Share events via **Copy Link** or **WhatsApp**
*  Separate event views: upcoming, past, all
*  Create **online** or **venue** events with rich UI
*  Responsive design with smooth animations

---

##  Project Structure

```frontend/
│── public/
│            
│── src/
│   ├── Pages/                # Page components
│   │   ├── event/            # Event-related pages
│   │   │   ├── EventForm.jsx
│   │   │   ├── EventList.jsx
│   │   │   ├── MyEvent.jsx
│   │   │   └── SingleEvent.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── ProfileCard.jsx
│   │   └── Signup.jsx
│   ├── routes/               # Route guards
│   │   ├── PrivateRoute.jsx
│   │   └── PublicRoute.jsx
│   ├── services/             # API configuration
│   │   └── api.js
│   ├── App.jsx               # Main app with routes
│   ├── App.css               # Global styles
│   ├── index.css             # Tailwind & reset styles
│   └── main.jsx              # React entry
|   └── index.html             # Main HTML entry
│── .gitignore
│── eslint.config.js
│── index.html
│── package.json
│── package-lock.json
│── vite.config.js
│── vercel.json
│── README.md
---

##  Setup & Installation

1. Clone repository:

   ```bash
   git clone https://github.com/yashmaurya3377/minitrackerfrontend.git
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Run development server:

   ```bash
   npm run dev
   ```
4. Build for production:

   ```bash
   npm run build
   ```

---

##  Working Process

1. **Authentication Flow**

   * User **signup/login** via form → API call to backend.
   * Backend returns a **JWT token** stored in localStorage.
   * Protected routes (Dashboard, Create Event, My Events) require the token.

2. **Event Creation**

   * User chooses event type (Online ).
   * Fill in form (title, date, time, location, description).
   * Submit → API request → Backend validates & saves event → Event list .

3. **Event Management**
   * Authenticated users see **their created events** with upcoming/past filters.
   * Events can be **shared** (copy link / WhatsApp).

4. **Profile Dashboard**

   * Shows user info (name, email, phone).
   * Displays **Upcoming vs Past event count**.
   * Logout clears token & resets state.

5. **Routing**

   * `PrivateRoute` ensures only logged-in users can access protected pages.
   * `PublicRoute` redirects authenticated users away from login/signup.

---

## 🔗 API Integration

The frontend communicates with the backend API:

**Base URL:**

```
https://minitrackerbackend.onrender.com/api
```

Protected requests require:

```
Authorization: Bearer <token>
```


```

 Backend Render Link: [https://minitrackerbackend.onrender.com](https://minitrackerbackend.onrender.com)

---

##  Deployment

Frontend is deployed on **Vercel**.
 [Live App](https://mini-event-tracker-react.vercel.app/)

---

##  Overview

The **Mini Event Tracker** frontend is a responsive, user-friendly interface for managing events.
It provides seamless integration with the backend, offering authentication, CRUD operations, and event sharing.

---

## Future Work

*  Mobile PWA support.
*  Event analytics dashboard.
*  Ticket booking & QR code generation.
*  Notifications & reminders.
*  Multi-language support.

---

##  Author & Contact

**Yash Maurya**
 Email: [yashmaurya3377@gmail.com](mailto:yashmaurya3377@gmail.com)
 GitHub: [yashmaurya3377](https://github.com/yashmaurya3377)

---
\