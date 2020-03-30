/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Profile from '@/components/Profile'
import Collection from'@/components/Collection'
import CreateCollection from '@/components/CreateCollection'
import Categorie from '@/components/Categorie'
import CreateCat from '@/components/CreateCat'
import Ouvrage from '@/components/Ouvrage'
import CreateOuvrage from '@/components/CreateOuvrage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/createCat',
      name: 'CreateCat',
      component: CreateCat,
      props: true
    },
    {
      path: '/ouvrage',
      name: 'Ouvrage',
      component: Ouvrage,
      props: true
    },
    {
      path: '/createOuvrage',
      name: 'CreateOuvrage',
      component: CreateOuvrage,
      props: true
    },
    {
      path: '/categorie',
      name: 'Categorie',
      component: Categorie,
      props: true
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/Collection',
      name: 'Collection',
      component: Collection
    },
    {
      path: '/Createcollection',
      name: 'CreateCollection',
      component: CreateCollection,
      props: true
    },
  ]
})
/* eslint-disable */
