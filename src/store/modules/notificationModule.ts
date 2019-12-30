import EventService from '@/services/EventService'
import { MutationTree, ActionTree, Module, GetterTree } from 'vuex'

export interface INotificationState {
  notifications: Array<any>
}

export const state: INotificationState = {
  notifications: []
}

let nextId = 1
// mutations are sync
export const mutations: MutationTree<any> = {
  PUSH(state, notification) {
    state.notifications.push({ ...notification, id: nextId++ })
  },
  DELETE(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      t => t.id !== notificationToRemove.id
    )
  }
}

// actions are async
// always put mutations within actions
export const actions: ActionTree<INotificationState, any> = {
  add({ commit, dispatch, rootState }, notification) {
    commit('PUSH', notification)
  },
  remove({ commit, dispatch, rootState }, notification) {
    commit('DELETE', notification)
  }
}

export const getters: GetterTree<INotificationState, any> = {
}

const namespaced: boolean = true

export const notification: Module<INotificationState, any> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
