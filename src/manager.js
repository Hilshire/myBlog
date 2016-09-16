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
  hashbang: true,
  linkActiveClass: 'active',
  // history: true,
  saveScrollPosition: true,
  root: '/manager'
});

router.map({
    '/blog': {
        component: Blog
    },
    '/project': {
        component: Project
    },
    '/blog/edit': {
        component: BlogEditor
    },
    '/project/edit': {
        component: ProjectEditor
    }
})

router.start(Manager, '#manager');
