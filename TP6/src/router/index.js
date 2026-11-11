import { createRouter, createWebHistory } from 'vue-router'
import StudentListView from '../components/StudentListView.vue'
import StudentDetailView from '../components/StudentDetailView.vue'
import NotFoundView from '../components/NotFoundView.vue'

const routes = [
  { path: '/', name: 'list', component: StudentListView },
  { path: '/etudiant/:id', name: 'detail', component: StudentDetailView },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router