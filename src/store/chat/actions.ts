import { ActionTree, ActionContext } from 'vuex'
import moment from 'moment'

import { RootState } from '../index'

import { State } from './state'
import { Mutations } from './mutations'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  addNewMessage(
    { commit }: AugmentedActionContext,
    { message, author }: { message: string, author?: string },
  ): void
  addUserName(
    { commit }: AugmentedActionContext,
    userName: string,
  ): void
}

export const actions: ActionTree<State, RootState> & Actions = {
  addNewMessage({ commit }, { message, author = 'you' }) {
    console.debug('ADD NEW Message', message)
    commit('addMessage', {
      author,
      data: moment().format('MMMM Do YYYY, h:mm:ss'),
      text: message
    })
  },
  addUserName({ commit }, userName: string) {
    console.debug('ADD NEW UserName', userName)
    commit('setUserName', userName)
  },
}
