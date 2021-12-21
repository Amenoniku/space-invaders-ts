export type Score = {
  data: String,
  score: number
}

export type State = {
  scores: Score[];
}

export const state: State = {
  scores: [],
};
