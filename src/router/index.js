import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import ContractsList from '@/views/ContractsList.vue'
const routes = [
  {
    path: '/contracts',
    name: 'ContractsList',
    component: ContractsList
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
