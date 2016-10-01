import Vue from 'vue';
import VueRouter from 'vue-router'
import Manager from './Manager'

import Blog from './components/manager/Blog'
import BlogEditor from './components/manager/BlogEditor'
import Project from './components/manager/Project'
import ProjectEditor from './components/manager/ProjectEditor'

import '../node_modules/materialize-css/dist/css/materialize.min.css'
import '../node_modules/materialize-css/dist/js/materialize.js'

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
    '/project': {
        component: Project
    },
    '/project/add': {
        component: ProjectEditor
    },
    '/project/update/:id': {
        name: 'updateProject',
        component: ProjectEditor
    }
})

router.start(Manager, '#manager')
