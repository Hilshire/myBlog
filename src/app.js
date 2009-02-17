import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Blog from './components/app/Blog'
import BlogIndex from './components/app/BlogIndex'

Vue.use(VueRouter)

var router = new VueRouter({
  hashbang: false,
  history: true,
  saveScrollPosition: true
})

router.map({
    "/": {
        component: BlogIndex
    },
    '/blog/:id': {
        name: 'blog',
        component: Blog
    }
})

router.start(App, '#app')
