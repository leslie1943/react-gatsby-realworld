import { navigate } from 'gatsby'
import React from 'react'
import useLogin from '../hooks/useLogin'

const PrivateRoute = ({ component: Component, ...rest }) => {
  // 需要调用钩子函数才能获取值
  const [isLogin, loading] = useLogin()
  // 登录中
  if (loading) return null
  // 登录成功,显示组件
  if (isLogin) return <Component {...rest} />
  console.info('未登录,前往登录页面')
  navigate('/login')
  return null
}

export default PrivateRoute
