import EventService from '@/services/EventService'
import { MutationTree, ActionTree, Module, GetterTree } from 'vuex'

export interface IEventState {
  events: Array<any>
  totalEvent: number
  event: any
}

export const state: IEventState = {
  events: [] as Array<any>,
  totalEvent: 0,
  event: {}
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
    console.log(this.getters)
    const event = this.getters['event/getEventById'](id)
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
