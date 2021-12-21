import { ActionTree, ActionContext } from 'vuex'

import { RootState } from '../index'

import { State, Score } from './state'
import { Mutations } from './mutations'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  addNewScore(
    { commit }: AugmentedActionContext,
    score: Score,
  ): void
}

export const actions: ActionTree<State, RootState> & Actions = {
  addNewScore({ commit }, score: Score) {
    console.debug('ADD NEW SCORE', score)
    const data = {
      documents: [{}, {}],
    }
    commit('addScore', score)
  },
}
