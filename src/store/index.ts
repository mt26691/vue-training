import Vue from 'vue'
import Vuex from 'vuex'

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
    ],
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false }
    ],
    events: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false }
    ]
  },
  // mutations are sync
  mutations: {
    INCREMENT_COUNT(state, value) {
      state.count += value
    }
  },
  // actions are async
  // always put mutations within actions
  actions: {
    updateCount({ state, commit }, value) {
      // we can call async here
      if (state.user) {
        commit('INCREMENT_COUNT', value)
      }
    }
  },
  modules: {},
  getters: {
    catLength: state => {
      return state.categories.length
    },
    doneTodos: state => {
      return state.todos.filter(t => t.done)
    },
    activteTodoCount: state => {
      return state.todos.filter(t => !t.done).length
    },
    getEventById: state => (id: any) => {
      return state.events.find(event => event.id === id)
    }
  }
})
