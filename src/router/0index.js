import { createRouter, createWebHashHistory } from 'vue-router'

const _a55bc1f2 = () =>
  import(
    '@p/interface/index.vue' /* webpackChunkName: "pages/interface/index" */
  )
const _4dbbeb88 = () =>
  import('@p/report/index.vue' /* webpackChunkName: "pages/report/index" */)
const _a855d0f4 = () =>
  import('@p/suite/index.vue' /* webpackChunkName: "pages/suite/index" */)
const _630b7861 = () =>
  import('@p/config/keyword.vue' /* webpackChunkName: "pages/config/keyword" */)
const _967f002a = () =>
  import('@p/config/plugin.vue' /* webpackChunkName: "pages/config/plugin" */)
const _786c8d91 = () =>
  import('@p/config/project.vue' /* webpackChunkName: "pages/config/project" */)
const _13a7353d = () =>
  import('@p/config/task.vue' /* webpackChunkName: "pages/config/task" */)
const _498baeb4 = () =>
  import(
    '@p/config/variable.vue' /* webpackChunkName: "pages/config/variable" */
  )
const _24a60c97 = () =>
  import(
    '@p/interface/create.vue' /* webpackChunkName: "pages/interface/create" */
  )
const _0992f136 = () =>
  import('@p/interface/edit.vue' /* webpackChunkName: "pages/interface/edit" */)
const _391b6652 = () =>
  import('@p/report/detail.vue' /* webpackChunkName: "pages/report/detail" */)
const _06fdc82e = () =>
  import('@p/report/log.vue' /* webpackChunkName: "pages/report/log" */)
const _12fbb810 = () =>
  import('@p/suite/create.vue' /* webpackChunkName: "pages/suite/create" */)
const Home = () => import('@p/index.vue' /* webpackChunkName: "pages/index" */)

const routes = [
  {
    path: '/',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
