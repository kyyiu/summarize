import Vue from "vue";
import VueRouter from "vue-router";
import Home from '@/views/home/Home.vue'
import A from './a'
import B from './b'
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      A,
      B
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router