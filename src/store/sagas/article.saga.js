import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios'
// takeEvery: 接收 action
// put: 触发 action
// delay: 延时执行

function* loadArticles({ limit, offset }) {
  try {
    const { data } = yield axios.get('/articles', {
      params: {
        limit,
        offset,
      },
    })
    yield put({ type: 'loadArticlesSuccess', payload: data.articles })
  } catch (e) {
    console.info(e)
  }
  // 将数据保存到 store, 同步 action 👣
  yield put({ type: 'increment' })
}

export default function* articleSaga() {
  //  异步 action 🎃
  yield takeEvery('loadArticles', loadArticles)
}
