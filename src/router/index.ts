import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@c/layout'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '@p/home')
      },
      {
        path: '/interface',
        name: 'home',
        component: () => (
          import(/* webpackChunkName: "interface" */ '@p/home/index')
        )
      },
      {
        path: '/interface/create',
        name: 'home',
        component: () => (
          import(/* webpackChunkName: "interface-create" */ '@p/home/index')
        )
      },
      {
        path: '/suite',
        name: 'home',
        component: () => import(/* webpackChunkName: "suite" */ '@p/home/index')
      },
      {
        path: '/config/project',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: "project" */ '@p/home/index')
      },
      {
        path: '/config/variable',
        name: 'home',
        component: () => (
          import(/* webpackChunkName: "variable" */ '@p/home/index')
        )
      },
      {
        path: '/config/keyword',
        name: 'home',
        component: () => (
          import(/* webpackChunkName: "keyword" */ '@p/home/index')
        )
      },
      {
        path: '/config/plugin',
        name: 'home',
        component: () => (
          import(/* webpackChunkName: "plugin" */ '@p/home/index')
        )
      },
      {
        path: '/config/task',
        name: 'home',
        component: () => import(/* webpackChunkName: "task" */ '@p/home/index')
      },
      {
        path: '/report',
        name: 'home',
        component: () => (
          import(/* webpackChunkName: "report" */ '@p/home/index')
        )
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () =>
  // import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
