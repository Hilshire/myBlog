import Vue from 'vue'
import VueRouter from 'vue-router'
import Markdown from '../node_modules/pagedown/Markdown.Converter.js'

import App from './App'
import Blog from './components/app/Blog'
import BlogIndex from './components/app/BlogIndex'

let converter = new Markdown.Converter()

Vue.filter('mdToHtml', (mdstr) => {
   return converter.makeHtml(mdstr)
})
Vue.use(VueRouter)

let router = new VueRouter({
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
