import { takeEvery, put, delay } from 'redux-saga/effects'
// takeEvery: 接收 action
// put: 触发 action
// delay: 延时执行

function* increment_async() {
  // 将数据保存到 store, 同步 action 🎃
  yield delay(1000)
  yield put({ type: 'increment' })
}

export default function* counterSaga() {
  //  异步 action 🎃
  yield takeEvery('increment_async', increment_async)
}
