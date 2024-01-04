import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/Index.vue'),
    },
    {
      path: '/index/:cid',
      name: 'index_cate',
      component: () => import('../views/Index.vue')
    },
    {
      path: '/category/:cid',
      name: 'category',
      component: () => import('../views/Category.vue')
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('../views/Article.vue')
    },

    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    }
  ]
})


export default router
