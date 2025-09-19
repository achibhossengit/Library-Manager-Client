# 📚 Zen Library – Library Management System

Zen Library is a full-stack web application designed for managing a school library. It allows users to browse, add, borrow, and manage books with a clean UI and secure authentication. Built with React, Firebase, MongoDB, and Express, it delivers a seamless experience for both readers and administrators.

---

## 🚀 Live Site

🔗 [Zen Library Live](https://library-manager-99af2.web.app)

---

## 🧠 Project Purpose

To provide a modern, responsive, and secure platform for managing library operations including:

- Book categorization and browsing
- Borrowing and returning books
- Adding and updating book details
- Viewing personal borrowed and added books
- Authentication and protected routes

---

## 🛠️ Technologies Used

### 🔹 Client Side

- React + React Router DOM
- Tailwind CSS + DaisyUI
- Axios
- Firebase Authentication
- React Hot Toast
- Swiper JS

### 🔹 Server Side

- Express.js
- MongoDB
- Firebase-admin
- CORS
- dotenv

---

## 📦 Features

### ✅ Public Pages

- **Home Page**: Banner, Categories, Popular Books, Featured Section
- **All Books**: Filter, search, toggle view (grid/table), update books
- **Login/Register**: Email/password + Google login
- **404 Page**: Custom not-found route

### 🔐 Protected Routes

- **Book Details**: Borrow modal, quantity control, return date
- **Add Book**: Form with validation and rating
- **My Added List**: Books added by the logged-in user
- **Borrowed Books**: View and return borrowed books

---

## 🔒 Authentication & Security

- Firebase Authentication (email/password + Google)
- JWT token stored and verified on protected routes
- Firebase Admin SDK for token verification
- MongoDB credentials secured via `.env`
- Firebase keys secured via `.env`

---

## 📐 Design & UX

- Fully responsive (mobile, tablet, desktop)
- Clean layout with consistent spacing and alignment
- Smooth animations using Framer Motion
- Dynamic page titles using React Helmet Async
- Toast notifications for all CRUD operations

---

## 📊 Deployment

- **Client**: Hosted on Firebase
- **Server**: Deployed on Vercel
- CORS and route protection configured
- Firebase domain authorized for secure access

---

## 📄 Run Locally

1. Clone the repo  
   `git clone https://github.com/achibhossengit/Library-Manager-Client`

2. Install dependencies  
   `npm install`

3. Add `.env` file with Firebase keys

4. Start the development server  
   `npm run dev`

---

## 📬 Contact

Developed by [Achib Hossen](https://achibhossen.netlify.app/)

---

