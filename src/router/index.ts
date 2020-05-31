import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'layout',
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
        name: 'interface',
        component: () => (
          import(/* webpackChunkName: "interface" */ '@p/interface/index.vue')
        )
      },
      {
        path: '/interface/create',
        name: 'create',
        component: () => (
          import(/* webpackChunkName: "interface-create" */ '@p/home/index')
        )
      },
      {
        path: '/suite',
        name: 'suite',
        component: () => import(/* webpackChunkName: "suite" */ '@p/home/index')
      },
      {
        path: '/config/project',
        name: 'project',
        component: () =>
          import(/* webpackChunkName: "project" */ '@p/home/index')
      },
      {
        path: '/config/variable',
        name: 'variable',
        component: () => (
          import(/* webpackChunkName: "variable" */ '@p/home/index')
        )
      },
      {
        path: '/config/keyword',
        name: 'keyword',
        component: () => (
          import(/* webpackChunkName: "keyword" */ '@p/home/index')
        )
      },
      {
        path: '/config/plugin',
        name: 'plugin',
        component: () => (
          import(/* webpackChunkName: "plugin" */ '@p/home/index')
        )
      },
      {
        path: '/config/task',
        name: 'task',
        component: () => import(/* webpackChunkName: "task" */ '@p/home/index')
      },
      {
        path: '/report',
        name: 'report',
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
