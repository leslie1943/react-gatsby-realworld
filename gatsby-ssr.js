const React = require('react')
const { Provider } = require('react-redux')
const createStore = require('./src/store/createStore').default

// 配置服务端的 store
exports.wrapRootElement = ({ element }) => {
  return <Provider store={createStore()}>{element}</Provider>
}
