import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

Vue.use(VueRouter)

var router = new VueRouter({
  hashbang: false,
  history: true,
  saveScrollPosition: true
});

router.start(App, 'body');
