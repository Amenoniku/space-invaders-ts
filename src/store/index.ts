import { createStore, createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { store as scores, ScoresStore, State as ScoresState } from './scores';

export type RootState = {
  scores: ScoresState;
};

export type Store = ScoresStore<Pick<RootState, 'scores'>>

// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

// Plug in session storage based persistence
plugins.push(createPersistedState({ storage: window.localStorage }));

export const store = createStore({
  plugins,
  modules: {
    scores,
  },
});

export function useStore(): Store {
  return store as Store;
}
