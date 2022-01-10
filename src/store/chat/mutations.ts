import { MutationTree } from 'vuex'


import { State } from './state'

export type Mutations<S = State> = {
  addMessage(state: S, payload: Message): void
  setUserName(state: S, payload: string): void
}

export const mutations: MutationTree<State> & Mutations = {
  addMessage(state: State, message: Message) {
    state.messages.push(message)
    if (state.messages.length > 10) state.messages.shift()
  },
  setUserName(state: State, userName: string) {
    state.userName = userName
  },
}
