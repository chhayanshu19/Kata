# 🚗 Kata Motors

A full-stack Vehicle Inventory Management System built with **React**, **Django REST Framework**, and **PostgreSQL**.

The system provides secure JWT authentication, role-based access control, vehicle inventory management, stock operations, search, filtering, sorting, pagination, and a responsive modern user interface.

---

## Features

### Authentication

- JWT Authentication
- Login & Registration
- Access Token + Refresh Token
- Protected Routes
- Role-based Authorization
- Persistent Login

### Customer Features

- Browse Vehicles
- Search Vehicles
- Filter by Category
- Sort by Price / Quantity
- Pagination
- Purchase Confirmation Modal
- Live Inventory Updates

### Admin Features

- Dashboard
- Add Vehicle
- Edit Vehicle
- Delete Vehicle
- Restock Inventory
- Duplicate Vehicle Prevention
- Form Validation

### User Experience

- Responsive Design
- Loading Spinner
- Toast Notifications
- Confirmation Modals
- Empty States
- Modern Dashboard UI

---

# Tech Stack

## Frontend

- React
- React Router DOM
- Axios
- Tailwind CSS

## Backend

- Django
- Django REST Framework
- Simple JWT
- Django Filters

## Database

- PostgreSQL

---

# API Endpoints

Authentication

POST /api/auth/register/
POST /api/auth/login/
POST /api/token/refresh/

Vehicles

GET /api/vehicles/
POST /api/vehicles/
GET /api/vehicles/:id/
PUT /api/vehicles/:id/
DELETE /api/vehicles/:id/
POST /api/vehicles/:id/purchase/
POST /api/vehicles/:id/restock/
