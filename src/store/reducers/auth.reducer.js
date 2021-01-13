const initialState = {}
export default function (state = initialState, action) {
  switch (action.type) {
    case 'loginSuccess':
    case 'loadUserSuccess':
      return {
        success: true,
        user: action.payload,
        errors: null,
        loading: false,
      }
    case 'loginFailed':
      return {
        success: false,
        user: null,
        errors: action.payload,
        loading: false,
      }
    case 'loginDoding': {
      return {
        success: false,
        user: null,
        errors: null,
        loading: true,
      }
    }
    default:
      return state
  }
}
