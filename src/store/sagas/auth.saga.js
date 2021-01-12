import axios from 'axios'
import { takeEvery, put } from 'redux-saga/effects'
// takeEvery: 接收 action
// put: 触发 action
// delay: 延时执行

function* handleLogin({ payload }) {
  try {
    // 调用接口
    const { data } = yield axios.post('/users/login', payload)

    // 数据本地化
    localStorage.setItem('token', data.user.token)

    // 触发同步方法, reducer 接受此方法
    yield put({ type: 'loginSuccess', payload: data.user })
  } catch (error) {
    const { errors } = error.response.data
    /**
     * errors: {email or password: ['is invalid']}
     */
    const messages = []

    Object.keys(errors).forEach((key) => {
      messages.push(`${key}${errors[key].join(',')}`)
    })
    yield put({ type: 'loginFailed', payload: messages })
  }
}

export default function* authSaga() {
  //  异步 action 🎃
  yield takeEvery('login', handleLogin)
}
