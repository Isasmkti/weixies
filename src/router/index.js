import { createRouter, createWebHistory } from "vue-router";
import { getUser, getUserProfile } from "../services/authService";

import Login from "../views/Login.vue";
import SignUp from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import Welcome from "../views/Welcome.vue";
import Catalog from "../views/Catalog.vue";
import Cart from "../views/Cart.vue";
import AdminDashboard from "../views/admin/AdminDashboard.vue";
import ProductCreate from "../views/admin/ProductCreate.vue";

const routes = [
  { path: "/", component: Welcome },

  { path: "/login", component: Login },
  { path: "/signup", component: SignUp },

  { path: "/products", component: Catalog },
  {
    path: "/products/:slug",
    name: "product-detail",
    component: () => import("../views/ProductDetail.vue"),
    props: true,
  },

  {
    path: "/cart",
    component: Cart,
    meta: { requiresAuth: true },
  },

  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },

  {
    path: "/admin",
    component: AdminDashboard,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/admin/products",
    component: AdminDashboard,
    meta: { requiresAuth: true, role: "admin" },
  },

  {
    path: "/admin/products/create",
    component: ProductCreate,
    meta: { requiresAuth: true, role: "admin" },
  },

  {
    path: "/admin/products/:id/edit",
    component: ProductCreate,
    meta: { requiresAuth: true, role: "admin" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


// 🔥 GLOBAL GUARD
router.beforeEach(async (to, from, next) => {
  const user = await getUser();

  // Kalau butuh login tapi belum login
  if (to.meta.requiresAuth && !user) {
    return next("/login");
  }

  // Kalau butuh role tertentu
  if (to.meta.role) {
    const profile = await getUserProfile();

    if (!profile || profile.role !== to.meta.role) {
      return next("/dashboard");
    }
  }

  next();
});

export default router;
