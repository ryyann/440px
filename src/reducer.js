export const initialState = {
  greeting: 'hello world',
};

export default function reducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return Object.assign({}, state, {
        greeting: 'helloWorld!!',
        image: action.payload,
      });
    default:
      return state;
  }
}
