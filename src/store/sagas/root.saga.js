import { all } from 'redux-saga/effects' // 合并 saga
import counterSaga from './counter.saga' // 引入 counter saga
import authSaga from './auth.saga' // 引入 counter saga

export default function* rootSaga() {
  yield all([counterSaga(), authSaga()])
}
