import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user'
import { event } from '@/store/modules/eventModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'mt26691', name: 'Manh Tung' },
    count: 0,
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  },
  modules: { user, event }
})
