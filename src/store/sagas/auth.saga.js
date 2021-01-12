import axios from 'axios'
import { takeEvery, put } from 'redux-saga/effects'
// takeEvery: 接收 异步action, 执行异步调用
// put: 触发 同步action, 执行 reducer 更新数据

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

function* handleLoadUser({ payload }) {
  // 调用接口
  const { data } = yield axios.get('/user', {
    headers: {
      Authorization: `Token ${payload}`,
    },
  })
  yield put({ type: 'loadUserSuccess', payload: data.user })
}

export default function* authSaga() {
  //  接收 登录 异步 action 🎃
  yield takeEvery('login', handleLogin)
  // 接收 获取信息 异步 action 🎃
  yield takeEvery('loadUser', handleLoadUser)
}
