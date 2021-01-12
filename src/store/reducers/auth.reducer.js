const initialState = {}
export default function (state = initialState, action) {
  switch (action.type) {
    case 'loginSuccess':
    case 'loadUserSuccess':
      return {
        success: true,
        user: action.payload,
        errors: null,
      }
    case 'loginFailed':
      return {
        success: false,
        user: null,
        errors: action.payload,
      }
    default:
      return state
  }
}
