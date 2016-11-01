import Vue from 'vue'
import VueRouter from 'vue-router'
import Markdown from '../node_modules/pagedown/Markdown.Converter.js'
import hljs from '../node_modules/highlight.js/lib/index'
import '../node_modules/highlight.js/styles/default.css'

import App from './App'
import Blog from './components/app/Blog'
import ContentList from './components/app/ContentList'
import BlogList from './components/app/BlogList'
import Article from './components/app/Article'
import ArticleList from './components/app/ArticleList'
import TipList from './components/app/TipList.vue'
import About from './components/app/About'
import TagContent from './components/app/TagContent'

let converter = new Markdown.Converter()
window.hljs = hljs

Vue.filter('mdToHtml', (mdstr) => {
    if(!mdstr) return mdstr
        else return converter.makeHtml(mdstr)
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
        component: ContentList,
        subRoutes: {
            '/': {
                component: BlogList
            },
            '/blog': {
                component: BlogList
            },
            '/article': {
                component: ArticleList
            },
            '/tips': {
                component: TipList
            }
        }
    },
    '/blog/:id': {
        name: 'blog',
        component: Blog
    },
    '/article/:id': {
        name: 'article',
        component: Article
    },
    '/about': {
        component: About
    },
    '/tag/:id': {
        name: 'tag',
        component: TagContent
    }
})

router.start(App, '#app')
