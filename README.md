# 🛒 MERN E-Commerce Platform

A full-stack e-commerce web application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). This project focuses on **backend architecture and REST API design**, with a functional frontend to demonstrate all APIs.

> Built by **Rehan** · Portfolio Project for Backend Developer Role

---

## 🔗 Live Demo

| Service | URL |
|---|---|
| Frontend | https://rehan-shop.vercel.app |
| Backend API | [https://your-api.onrender.com](https://mern-ecommerce-backend-2lg3.onrender.com) |

---

## ✨ Features

### Backend
- RESTful API with Express.js
- JWT Authentication with role-based access control (User / Admin)
- MongoDB with Mongoose schemas and aggregation pipelines
- Stripe payment gateway integration
- Product search, filtering, and pagination
- Order management with status workflow
- Admin analytics with aggregation queries
- Input validation with express-validator
- Security: rate limiting, CORS, helmet, morgan logging
- Modular MVC architecture

### Frontend
- React with Redux Toolkit for state management
- Axios with JWT interceptor
- Product filters (category, brand, price, rating, seller, stock)
- 3-step checkout with delivery simulation
- Order tracking timeline
- Admin dashboard with Chart.js graphs
- Fully responsive (mobile, tablet, desktop)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Redux Toolkit, React Router, React Bootstrap |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Payments | Stripe |
| Validation | express-validator |
| Security | express-rate-limit, cors, morgan |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas (DB) |

---

## 📁 Project Structure
```
mern-ecommerce-platform/
├── backend/
│   ├── config/         # Database connection
│   ├── controllers/    # Route handlers
│   ├── middleware/     # Auth, error handling
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── utils/          # JWT generator
│   └── server.js       # Entry point
└── frontend/
    └── src/
        ├── components/ # Reusable UI components
        ├── pages/      # Page components
        ├── redux/      # State management slices
        └── utils/      # Axios instance
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Stripe account

### Installation
```bash
# Clone the repo
git clone https://github.com/yourusername/mern-ecommerce-platform.git
cd mern-ecommerce-platform

# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### Environment Variables

Create `backend/.env` based on `.env.example`:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
NODE_ENV=development
```

### Running the App
```bash
# Run both frontend and backend together
npm run dev

# Seed the database with sample products
npm run seed
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All protected routes require a Bearer token in the header:
```
Authorization: Bearer <your_jwt_token>
```

---

### 👤 User Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/users/register` | Public | Register new user |
| POST | `/users/login` | Public | Login and get token |
| GET | `/users/profile` | Private | Get user profile |
| PUT | `/users/profile` | Private | Update user profile |

**Register Request:**
```json
{
  "name": "Rehan Khan",
  "email": "rehan@example.com",
  "password": "123456"
}
```

**Login Response:**
```json
{
  "_id": "64f...",
  "name": "Rehan Khan",
  "email": "rehan@example.com",
  "role": "user",
  "token": "eyJhbGci..."
}
```

---

### 📦 Product Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/products` | Public | Get all products (with filters) |
| GET | `/products/:id` | Public | Get single product |
| POST | `/products` | Admin | Create product |
| PUT | `/products/:id` | Admin | Update product |
| DELETE | `/products/:id` | Admin | Delete product |

**Query Parameters for GET /products:**
```
keyword     - Search by name
category    - Filter by category
brand       - Filter by brand
seller      - Filter by seller
minPrice    - Minimum price
maxPrice    - Maximum price
rating      - Minimum rating
inStock     - true/false
page        - Page number (default: 1)
```

---

### 🛒 Order Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/orders` | Private | Place new order |
| GET | `/orders/myorders` | Private | Get logged-in user's orders |
| GET | `/orders/:id` | Private | Get order by ID |
| PUT | `/orders/:id/status` | Admin | Update order status |

**Place Order Request:**
```json
{
  "orderItems": [
    {
      "product": "64f...",
      "name": "MacBook Pro",
      "price": 199999,
      "qty": 1,
      "image": "https://..."
    }
  ],
  "shippingAddress": {
    "address": "123 Main St",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "postalCode": "600001",
    "country": "India",
    "phone": "+91 98765 43210"
  },
  "paymentMethod": "Stripe",
  "totalPrice": 199999
}
```

---

### 💳 Payment Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/payment/create-payment-intent` | Private | Create Stripe payment intent |

---

### 👑 Admin Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/admin/stats` | Admin | Dashboard statistics |
| GET | `/admin/orders` | Admin | Get all orders |
| PUT | `/admin/orders/:id/status` | Admin | Update order status |
| GET | `/admin/users` | Admin | Get all users |
| PUT | `/admin/users/:id` | Admin | Update user |
| DELETE | `/admin/users/:id` | Admin | Delete user |
| GET | `/admin/products` | Admin | Get all products |
| POST | `/admin/products` | Admin | Create product |
| PUT | `/admin/products/:id` | Admin | Update product |
| DELETE | `/admin/products/:id` | Admin | Delete product |

---

## 🗄️ Database Schemas

### User
```js
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "user" | "admin",
  phone: String,
  address: {
    street, city, state, postalCode, country
  }
}
```

### Product
```js
{
  name: String,
  price: Number,
  description: String,
  image: String,
  brand: String,
  category: String,
  countInStock: Number,
  rating: Number,
  numReviews: Number,
  seller: String
}
```

### Order
```js
{
  user: ObjectId (ref: User),
  orderItems: [{ product, name, price, qty, image }],
  shippingAddress: { address, city, state, postalCode, country, phone },
  paymentMethod: String,
  totalPrice: Number,
  isPaid: Boolean,
  paidAt: Date,
  status: "Pending"|"Processing"|"Shipped"|"Delivered"|"Cancelled",
  deliveryOption: "standard" | "express"
}
```

---

## 🔐 Test Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@test.com | 123456 |
| User | user@test.com | 123456 |

---

## 📜 License

MIT License © 2026 Rehan Pvt Ltd.
