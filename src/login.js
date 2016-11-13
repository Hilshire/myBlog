import Vue from 'vue';
import VueRouter from 'vue-router'
import Login from './Login'

import '../node_modules/materialize-css/dist/css/materialize.min.css'
import '../node_modules/materialize-css/dist/js/materialize.min.js'

Vue.use(VueRouter)

var router = new VueRouter({
  hashbang: false,
  history: true,
  saveScrollPosition: true
});

router.start(Login, '#login');
