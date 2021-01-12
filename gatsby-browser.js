// 客户端运行的时候被调用
const React = require('react')
const axios = require('axios')
const { Provider } = require('react-redux')
const Layout = require('./src/components/Layout').default
const LayoutLogin = require('./src/components/LayoutLogin').default
const createStore = require('./src/store/createStore').default

axios.defaults.baseURL = 'https://conduit.productionready.io/api'

// 方法名称: wrapPageElement
// element: 每个页面的页面元素
// 作用: 使每个页面被 Layout 包裹
exports.wrapPageElement = ({ element }) => (
  // 可以通过 element 对象中的 props 的 path 或者其他属性来决定使用哪一个布局组件
  <>
    <FinalLayout element={element} />
  </>
)

function FinalLayout({ element }) {
  return element.props.uri === '/login' ? (
    <LayoutLogin>{element}</LayoutLogin>
  ) : (
    <Layout>{element}</Layout>
  )
}

// element: 最外层组件
// 配置客户端的 store
exports.wrapRootElement = ({ element }) => (
  <Provider store={createStore()}>{element}</Provider>
)
