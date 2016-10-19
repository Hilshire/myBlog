import Vue from 'vue';
import VueRouter from 'vue-router'
import Manager from './Manager'

import Blog from './components/manager/Blog'
import BlogEditor from './components/manager/BlogEditor'
import Article from './components/manager/Article.vue'
import ArticleEditor from './components/manager/ArticleEditor.vue'
import Tips from './components/manager/Tips.vue'
import TipsEditor from './components/manager/tipEditor.vue'
import About from './components/manager/About.vue'

import '../node_modules/materialize-css/dist/css/materialize.min.css'
import '../node_modules/materialize-css/dist/js/materialize.js'
import '../node_modules/github-markdown-css/github-markdown.css'
import '../node_modules/highlight.js/styles/default.css'
import '../node_modules/highlight.js/lib/highlight'

Vue.use(VueRouter)

var router = new VueRouter({
  hashbang: false,
  linkActiveClass: 'active',
  history: true,
  saveScrollPosition: true,
  root: '/manager'
});

router.map({
    '/blog': {
        component: Blog
    },
    '/blog/add': {
        component: BlogEditor
    },
    '/blog/update/:id': {
        name: 'updateBlog',
        component: BlogEditor
    },
    '/article': {
        component: Article
    },
    '/article/add': {
        component: ArticleEditor
    },
    '/article/update/:id': {
        name: 'updateArticle',
        component: ArticleEditor
    },
    '/tips': {
        component: Tips
    },
    '/tips/add': {
        component: TipsEditor
    },
    '/tips/update/:id': {
        name: 'updateTip',
        component: TipsEditor
    },
    '/about': {
        component: About
    }
})

router.start(Manager, '#manager')
