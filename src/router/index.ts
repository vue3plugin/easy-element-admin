import { createWebHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from "vue-router"
/* Layout */
import { basicRoutes } from './routes';


const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
});

export default router;

