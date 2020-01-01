import EventService from '@/services/EventService'
import { MutationTree, ActionTree, Module, GetterTree } from 'vuex'

export interface IEventState {
  events: Array<any>
  totalEvent: number
  event: any
  perPage: number
}

export const state: IEventState = {
  events: [] as Array<any>,
  totalEvent: 0,
  event: {},
  perPage: 3
}

// mutations are sync
export const mutations: MutationTree<any> = {
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
export const actions: ActionTree<IEventState, any> = {
  // we can have rootState
  createEvent({ commit, dispatch, rootState }, event) {
    // root : true look for this action at the root of our store
    // dispatch('moduleName/actionTocall', payload, {root:true})
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'sucess',
          message: `your event has been created!`
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: `there was a problem creating event ${error.message}`
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    return EventService.getEvents(perPage, page)
      .then(response => {
        // mutation should be called inside the current module
        commit('SET_TOTAL_EVENT', parseInt(response.headers['x-total-count']))
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
        const notification = {
          type: 'error',
          message: `there was a problem fetching events ${error.message}`
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, dispatch }, id) {
    const event = this.getters['event/getEventById'](id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      return EventService.getEvent(id) // <--- Send the prop id to our EventService
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
          const notification = {
            type: 'error',
            message: `there was a problem fetching event ${error.message}`
          }
          dispatch('notification/add', notification, { root: true })
          throw error
        })
    }
  }
}

export const getters: GetterTree<IEventState, any> = {
  getEventById: state => (id: any) => {
    return state.events.find(event => event.id === id)
  }
}

const namespaced: boolean = true

export const event: Module<IEventState, any> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
