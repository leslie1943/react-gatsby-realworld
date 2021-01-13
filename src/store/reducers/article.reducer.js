const initialState = {
  articles: [],
}
export default function (state = initialState, action) {
  switch (action.type) {
    case 'loadArticlesSuccess':
      return {
        articles: action.payload,
      }
    default:
      return state
  }
}
