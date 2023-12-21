import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/pages/Home.vue'
import { RouteNames } from './routes'
import EditPage from "@/components/pages/EditPage.vue";
import EditBookPage from "@/components/pages/EditBookPage.vue";
import SettingsPage from "@/components/pages/SettingsPage.vue";
import AddBookPage from "@/components/pages/AddBookPage.vue";
import AuthorsEditPage from "@/components/pages/author/AuthorsEditPage.vue";
import EditAuthorPage from "@/components/pages/author/EditAuthorPage.vue";
import AddAuthorPage from "@/components/pages/author/AddAuthorPage.vue";
import AuthorsPage from "@/components/pages/author/AuthorsPage.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: RouteNames.HOME,
    component: HomePage
  },
  {
    path: '/add',
    name: RouteNames.BOOK_ADD,
    component: AddBookPage
  },
  {
    path: '/edit',
    name: RouteNames.EDIT,
    component: EditPage
  },
  {
    path: '/edit/:id',
    name: RouteNames.BOOK_EDIT,
    component: EditBookPage
  },
  {
    path: '/authors',
    name: RouteNames.AUTHORS,
    component: AuthorsPage
  },
  {
    path: '/authors/add',
    name: RouteNames.AUTHOR_ADD,
    component: AddAuthorPage
  },
  {
    path: '/authors/edit',
    name: RouteNames.AUTHORS_EDIT,
    component: AuthorsEditPage
  },
  {
    path: '/authors/edit/:id',
    name: RouteNames.AUTHOR_EDIT,
    component: EditAuthorPage
  },
  {
    path: '/settings',
    name: RouteNames.SETTINGS,
    component: SettingsPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
