import EventService from '@/services/EventService'

export const state = {
  events: [] as Array<any>,
  totalEvent: 0,
  event: {}
}

// mutations are sync
export const mutations = {
  INCREMENT_COUNT(state, value) {
    state.count += value
  },
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_TOTAL_EVENT(state, total) {
    state.totalEvent = total
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}
// actions are async
// always put mutations within actions
export const actions = {
  updateCount({ state, commit }, value) {
    // we can call async here
    if (state.user) {
      commit('INCREMENT_COUNT', value)
    }
  },
  // we can have rootState
  createEvent({ commit, dispatch, rootState }, event) {
    return EventService.postEvent(event).then(() => {
      commit('ADD_EVENT', event)
    })
  },
  fetchEvents({ commit }, { perPage, page }) {
    return EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_TOTAL_EVENT', parseInt(response.headers['x-total-count']))
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  fetchEvent({ commit }, id) {
    const event = this.getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id) // <--- Send the prop id to our EventService
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    }
  }
}
export const getters = {
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
