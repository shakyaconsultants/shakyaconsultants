# 🚀 Shakya Foundations - Premium SaaS Agency Platform

## 📌 Overview

**Shakya Foundations** is a production-grade, high-performance web application designed for a modern SaaS/Consultancy agency. It serves as both a high-converting landing page and a robust management system for business operations.

*   **Problem it solves**: Centralizes client lead generation, project showcasing, and brand authority through a unified, premium digital presence.
*   **Target Users**: Business consultants, SaaS agencies, and enterprise clients looking for professional services.
*   **Key Highlights**:
    *   ✨ **Premium UI/UX**: Built with a "warm white luxury" aesthetic, featuring glassmorphism and smooth animations.
    *   📊 **Admin Dashboard**: Secure, role-based access to manage testimonials, projects, and client listings.
    *   📅 **Integrated Booking**: A custom-built calendar widget for scheduling consultations directly.
    *   📧 **Lead Automation**: Automated email notifications for contact forms and booking requests.

---

## 🧱 Tech Stack

### Frontend
*   **Framework**: Next.js 15 (App Router)
*   **Styling**: Tailwind CSS (Custom Design System)
*   **Icons**: Lucide React
*   **State Management**: React Context API & Server Actions

### Backend
*   **Environment**: Node.js (Next.js API Routes)
*   **Database**: MongoDB (via Mongoose ORM)
*   **Authentication**: JWT (JSON Web Tokens) & Bcrypt.js for secure hashing
*   **Media Hosting**: Cloudinary (Cloud-based image management)

### Dev Tools & Others
*   **Email Service**: Nodemailer (SMTP Integration)
*   **Language**: TypeScript (Type-safe development)
*   **Deployment**: Optimized for Vercel/DigitalOcean

---

## 🏗️ Architecture

The project follows a **Layered Monolithic Architecture** within the Next.js ecosystem:

*   **Presentation Layer**: Highly modular React components categorized into `ui` (primitives), `sections` (page blocks), and `common` (global layouts).
*   **API Layer**: RESTful endpoints handled by Next.js Route Handlers, implementing middleware for authentication and validation.
*   **Data Access Layer**: Mongoose models acting as an abstraction over MongoDB, ensuring schema consistency and data integrity.
*   **Service Layer**: External integrations (Cloudinary, Nodemailer) abstracted into reusable utility functions in the `lib/` directory.

### Design Pattern: MVC (Model-View-Controller)
While Next.js blurs these lines, the project maintains a clear separation:
*   **Models**: Located in `/models` (Admin, Project, Testimonial, Client).
*   **Views**: React Server & Client components in `/app` and `/components`.
*   **Controllers**: Logic reside within `/app/api` route handlers.

---

## 📂 Project Structure

```text
/root
 ├── app/                   # Next.js App Router (Pages & API)
 │   ├── admin/             # Admin Dashboard UI & Protected Routes
 │   ├── api/               # Backend API Endpoints (Auth, CRUD, Forms)
 │   ├── layout.tsx         # Global Layout & Providers
 │   └── page.tsx           # Main Landing Page
 ├── components/            # Reusable React Components
 │   ├── sections/          # Page-specific sections (Hero, Features, etc.)
 │   ├── ui/                # Base UI primitives (Buttons, Modals, Widgets)
 │   └── common/            # Global components (Navbar, Footer)
 ├── lib/                   # Core Utilities (DB Connection, Cloudinary, Auth)
 ├── models/                # Mongoose Database Schemas
 ├── context/               # React Context for Global State
 ├── public/                # Static Assets (Images, Icons)
 ├── styles/                # Global CSS & Design System Tokens
 ├── scripts/               # Maintenance & Seeding Scripts
 └── tailwind.config.ts     # Custom Design System Configuration
```

### Folder Breakdown:
*   **`app/api/`**: The heart of the backend logic. Handles everything from JWT issuance to multipart form data for image uploads.
*   **`components/sections/`**: Modularized landing page components allowing for easy reordering and maintenance.
*   **`lib/db.ts`**: Implements a cached connection pattern to prevent database connection exhaustion in serverless environments.

---

## 🔄 Application Workflow

### 1. Client-Side Lead Generation
1.  **Interaction**: A user fills out the **Contact Form** or **Booking Widget**.
2.  **API Call**: Frontend sends a POST request to `/api/contact` or `/api/booking`.
3.  **Validation**: API validates fields and triggers **Nodemailer**.
4.  **Notification**: An automated email is sent to the agency owner with lead details.

### 2. Admin Content Management
1.  **Auth**: Admin logs in via `/admin/login` -> JWT stored in HTTP-only cookies.
2.  **Action**: Admin adds a new Project or Testimonial with an image.
3.  **Processing**: The backend receives `FormData`, uploads the image to **Cloudinary**, and saves the returned URL + metadata to **MongoDB**.
4.  **Update**: The landing page revalidates and displays the new content immediately.

---

## ⚙️ Core Features & Functionalities

### 1. Dynamic Admin Dashboard
*   **Secure Access**: Protected routes using JWT verification middleware.
*   **Content CRUD**: Full Create, Read, Update, Delete capabilities for Projects, Testimonials, and Clients.
*   **Media Management**: Automatic image optimization and hosting via Cloudinary.

### 2. Lead Management Systems
*   **Booking Calendar**: A custom UI for selecting dates/times, integrated with timezone detection.
*   **Contact Ecosystem**: Validated forms with real-time feedback and server-side email dispatch.

### 3. SEO & Performance
*   **Semantic HTML**: Proper use of sectioning tags and heading hierarchy.
*   **Image Optimization**: Next.js `Image` component used for responsive, lazy-loaded assets.

---

## 🔌 API Documentation

| Endpoint | Method | Purpose | Auth Required |
| :--- | :--- | :--- | :--- |
| `/api/auth/login` | POST | Authenticates admin & sets cookie | No |
| `/api/projects` | GET | Fetches all active projects | No |
| `/api/projects` | POST | Creates a new project (with image) | Yes |
| `/api/testimonials`| POST | Client submission (Inactive) / Admin add (Active) | Optional |
| `/api/booking` | POST | Sends booking request email | No |
| `/api/clients` | GET | Fetches client logos for marquee | No |

---

## 🧠 Key Logic Breakdown

### 🔐 Authentication Strategy
The system uses a custom JWT implementation:
*   Passwords hashed with **Bcrypt** (10 rounds).
*   JWT tokens issued upon login and validated via a `verifyAuth` utility.
*   Sensitive fields (like passwords) are excluded from database queries by default using Mongoose's `select: false`.

### 🖼️ Image Processing Flow
When an admin uploads a file:
1.  Frontend sends `multipart/form-data`.
2.  Backend converts the file into a `Buffer`.
3.  The buffer is streamed to **Cloudinary** using a custom `uploadImage` utility.
4.  Only the resulting secure URL is stored in MongoDB.

---

## 🗄️ Database Design

### Mongoose Schemas:
*   **Admin**: `email`, `password` (hashed).
*   **Project**: `title`, `description`, `imageUrl`, `link`, `tags`.
*   **Testimonial**: `name`, `message`, `role`, `company`, `rating`, `imageUrl`, `isActive`.
*   **Client**: `name`, `logoUrl`, `order`.

---

## 🚀 Setup & Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/your-repo/shakya-foundations.git
    cd shakya-foundations
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file based on `.env.example`:
    ```env
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_secret
    CLOUDINARY_CLOUD_NAME=name
    CLOUDINARY_API_KEY=key
    CLOUDINARY_API_SECRET=secret
    EMAIL_USER=your_gmail
    EMAIL_PASS=app_password
    ```

4.  **Seed Admin Account**:
    ```bash
    npm run seed
    ```

5.  **Run Development Server**:
    ```bash
    npm run dev
    ```

---

## 📈 Possible Improvements

*   **Caching Strategy**: Implement Redis for caching frequently accessed project data.
*   **Real-time Analytics**: Integrate a dashboard for tracking lead conversion rates.
*   **Multi-Role Auth**: Expand the Admin model to support "Editor" and "Viewer" roles.

---

## 📚 Conclusion

**Shakya Foundations** stands as a testament to modern web engineering—balancing aesthetic brilliance with functional depth. Its modular architecture ensures it can scale from a simple landing page to a complex enterprise management portal with minimal friction.
