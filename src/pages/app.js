import React from 'react'
import { Router } from '@reach/router'
import CreateArticle from '../components/create'
import Settings from '../components/settings'
import PrivateRoute from '../components/PrivateRoute'

const App = () => (
  <Router>
    {/* /app/ 开头的请求地址都属于客户端路由 要以 app 开头 */}
    <PrivateRoute component={Settings} path="/app/settings" />
    <PrivateRoute component={CreateArticle} path="/app/create" />
  </Router>
)

export default App
