import Vue from 'vue'
import VueRouter from 'vue-router'
import Markdown from '../node_modules/pagedown/Markdown.Converter.js'
import hljs from '../node_modules/highlight.js/lib/index'
import '../node_modules/highlight.js/styles/default.css'

import App from './App'
import Blog from './components/app/Blog'
import BlogIndex from './components/app/BlogIndex'

let converter = new Markdown.Converter()
window.hljs = hljs

Vue.filter('mdToHtml', (mdstr) => {
   return converter.makeHtml(mdstr)
})
Vue.filter('highLight', (code) => {
    return hljs.highlightAuto(code).value
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
