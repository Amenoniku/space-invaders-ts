import { MutationTree } from 'vuex'


import { State, Score } from './state'

export type Mutations<S = State> = {
  addScore(state: S, payload: Score): void
}

export const mutations: MutationTree<State> & Mutations = {
  addScore(state: State, score: Score) {
    state.scores.unshift(score)
    if (state.scores.length > 17) state.scores.pop()
  },
}
