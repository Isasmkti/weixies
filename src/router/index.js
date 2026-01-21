import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import SignUp from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import Welcome from '../views/Welcome.vue';
import { getUser } from '../services/authService';

const routes = [
  { path: '/', component: Welcome },

  { path: '/login', component: Login },
  { path: '/signup', component: SignUp },

  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: async (to, from, next) => {
      const user = await getUser();
      if (!user) {
        next('/login');
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
