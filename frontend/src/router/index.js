import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import DetailContentView from '../views/DetailContentView.vue'
import LibraryView from '../views/LibraryView'
import AddNewContentView from '../views/AddNewContentView'
import EditContentView from '../views/EditContentView'
import AddNewTopicView from '../views/AddNewTopicView'



const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/sign-up', component: SignUpView },
  { path: '/library', component: LibraryView },
  { path: '/add', component: AddNewContentView },
  { path: '/edit/:id', component: EditContentView },
  { path: '/add-topic', component: AddNewTopicView },
  { path: '/detail/:id', component: DetailContentView },

]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;