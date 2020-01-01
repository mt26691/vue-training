import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventCreate from '../views/EventCreate.vue'
import EventShow from '../views/EventShow.vue'
import User from '../views/User.vue'
import nProgress from 'nprogress'
import store from '@/store/index'
import NotFound from '../views/NotFound.vue'
import NetworkIssue from '../views/NetworkIssue.vue'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'event-list',
    component: EventList
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter(to, from, next) {
      store
        .dispatch('event/fetchEvent', to.params.id)
        .then(() => {
          next()
        })
        .catch(err => {
          console.log(err)
          if (err.response && err.response.status === 404) {
            next({ name: '404', params: { resource: 'event' } })
          } else {
            next({ name: 'network-issue', params: { resource: 'event' } })
          }
        })
    }
  },
  {
    path: '/user/:username',
    name: 'user',
    component: User,
    props: true
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  {
    path: '*',
    redirect: { name: '404' }
  }
  // {
  //   path: '/about-us',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue'),
  //   alias: '/about'
  // }
]

const router = new VueRouter({
  // support from IE 10 only
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  nProgress.start()
  next()
})

router.afterEach(() => {
  nProgress.done()
})
export default router
