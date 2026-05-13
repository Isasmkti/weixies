# Mini E-Commerce App
Project ini adalah sebuah mini e-commerce yang menjual product digital seperti asset digital source code dll.
dikembangkan untuk kebutuhan personal dalam berwirausaha pada tren digitalisasi seperti saat ini

# Tech Stack

## Frontend

* Vue 3
* Vite
* Tailwind CSS
* Vue Router
* Pinia
* Axios

---

## Backend

Menggunakan Supabase sebagai backend utama.

Services:

* PostgreSQL Database
* Supabase Auth
* Supabase Storage
* Edge Functions (Deno)
* Row Level Security (RLS)

---

# System Architecture

```txt
Frontend (Vue)
       ↓
Supabase Client SDK
       ↓
Supabase Backend
 ├── Auth
 ├── PostgreSQL
 ├── Storage
 ├── Realtime
 └── Edge Functions (Deno)
```

---

# Main Features

## Authentication

* Register
* Login
* Logout
* Session persistence
* OAuth login
* Role based access

Role:

* admin
* customer

---

## Product System

* Create product
* Update product
* Delete product
* Product detail
* Product image gallery
* Product categories
* Product slug

---

## Shopping Cart

* Add to cart
* Remove from cart
* Quantity management
* Cart summary
* Checkout preparation

---

## Reviews

* Product reviews
* Product rating
* User comments

---

## Category System

* Category management
* Product filtering
* Category slug

---

## Media Upload

* Product image upload
* User profile image upload
* Supabase storage integration

---

## Edge Functions

Menggunakan Supabase Edge Functions dengan runtime Deno.

Digunakan untuk:

* checkout process
* payment integration
* email notification
* webhook handling
* admin automation

---

# Database Schema

## products

| Field       | Type        |
| ----------- | ----------- |
| id          | int8        |
| name        | text        |
| description | text        |
| price       | int4        |
| slug        | text        |
| created_at  | timestamptz |

---

## categories

| Field      | Type        |
| ---------- | ----------- |
| id         | int8        |
| name       | text        |
| slug       | text        |
| created_at | timestamptz |

---

## product_categories

Table relasi many-to-many.

| Field       | Type |
| ----------- | ---- |
| id          | int8 |
| product_id  | int8 |
| category_id | int8 |

---

## product_images

| Field      | Type        |
| ---------- | ----------- |
| id         | uuid        |
| product_id | int8        |
| image_url  | text        |
| is_primary | bool        |
| created_at | timestamptz |

---

## profiles

| Field       | Type        |
| ----------- | ----------- |
| id          | uuid        |
| full_name   | text        |
| role        | user_role   |
| profile_img | text        |
| email       | text        |
| created_at  | timestamptz |

---

## cart

| Field      | Type |
| ---------- | ---- |
| id         | uuid |
| profile_id | uuid |

---

## cart_items

| Field      | Type        |
| ---------- | ----------- |
| id         | int8        |
| cart_id    | uuid        |
| product_id | int8        |
| created_at | timestamptz |

---

## reviews

| Field      | Type        |
| ---------- | ----------- |
| id         | uuid        |
| product_id | int8        |
| profile_id | uuid        |
| rating     | int4        |
| comment    | text        |
| created_at | timestamptz |

---

# Entity Relationship Diagram

```txt
products
 ├── product_images
 ├── reviews
 ├── cart_items
 └── product_categories

categories
 └── product_categories

profiles
 ├── cart
 └── reviews

cart
 └── cart_items
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/mini-ecommerce.git
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

# Environment Variables

Buat file `.env`.

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

# Supabase Setup

## Install SDK

```bash
npm install @supabase/supabase-js
```

---

## Create Supabase Client

```js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)
```

---

# Vue Router Example

```js
const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/product/:slug',
    component: ProductDetail,
  },
  {
    path: '/cart',
    component: CartPage,
  },
  {
    path: '/dashboard',
    component: DashboardPage,
  },
]
```

---

# Pinia Store Example

```js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  })
})
```

---

# Storage Structure

```txt
/products
/profiles
```

---

# Edge Functions

Menggunakan runtime Deno.

Contoh penggunaan:

## Checkout API

```txt
supabase/functions/checkout
```

---

## Send Email

```txt
supabase/functions/send-email
```

---

## Payment Webhook

```txt
supabase/functions/payment-webhook
```

---

# Authorization with RLS

Gunakan Row Level Security untuk keamanan data.

---

## Customer

Hanya bisa:

* melihat produk
* mengelola cart sendiri
* membuat review sendiri

---

## Admin

Bisa:

* CRUD product
* CRUD category
* delete review
* manage user

---

# Recommended Policies

## Product Public Access

```sql
true
```

---

## User Cart Access

```sql
auth.uid() = profile_id
```

---

## Product Review Access

```sql
auth.uid() = profile_id
```

---

# Best Practices

## Gunakan UUID untuk User Data

Lebih aman dan scalable.

---

## Pisahkan Product Images

Jangan simpan banyak image di satu field.

---

## Gunakan Slug untuk SEO

Contoh:

```txt
nike-air-force-1
```

---

## Compress Image sebelum Upload

Mengurangi bandwidth dan storage.

---

## Aktifkan RLS sejak Awal

Supaya data aman sejak development.

---

# Recommended Libraries

## UI

* Tailwind CSS
* Headless UI
* Heroicons

---

## Forms

* Vee Validate
* Zod

---

## State Management

* Pinia

---

## HTTP Client

* Axios

---

# Development Roadmap

## Phase 1

* setup Vue
* setup Tailwind
* setup Supabase
* authentication

---

## Phase 2

* product CRUD
* category system
* product images

---

## Phase 3

* shopping cart
* reviews
* user profile

---

## Phase 4

* checkout
* edge functions
* payment gateway
* optimization

---

# Future Improvements

Fitur yang bisa ditambahkan:

* wishlist
* order history
* payment integration
* coupon system
* invoice PDF
* admin dashboard
* realtime stock
* notification system
* dark mode
* analytics dashboard

---

# Deployment

## Frontend

Deploy menggunakan:

* Vercel
* Netlify

---

## Backend

Menggunakan Supabase Cloud.

---

# Conclusion

Mini E-Commerce ini cocok untuk belajar modern web development karena mencakup banyak konsep penting:

* authentication
* relational database
* shopping cart
* image upload
* role based access
* serverless functions
* state management
* deployment

Dengan Vue + Supabase + Edge Functions, development menjadi lebih cepat tanpa perlu setup backend tradisional.
