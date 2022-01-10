export type State = {
  messages: Message[];
  userName: string
}

export const state: State = {
  messages: [
    {
      author: 'you',
      data: 'string',
      text: 'string'
    },
    {
      author: 'string',
      data: 'string',
      text: 'string'
    }
  ],
  userName: ''
};
