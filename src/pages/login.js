import React from 'react'
import { navigate } from 'gatsby'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'

const Login = () => {
  // 使用自定义钩子声明变量
  const email = useInput('')
  const password = useInput('')

  const dispatch = useDispatch()

  const authReducer = useSelector((state) => state.authReducer)
  if (authReducer.success) {
    navigate('/')
    return null
  }

  function displayErrors() {
    if (authReducer.errors) {
      return authReducer.errors.map((error) => <li key={error}>{error}</li>)
    }
    return null
  }

  function handleSubmit(e) {
    // 阻止默认form提交
    e.preventDefault()
    // 获取表单values
    const passwordValue = password.input.value
    const emailValue = email.input.value

    dispatch(
      // 异步执行, 所以这个 action 会被 saga 接受
      {
        type: 'login',
        payload: { user: { email: emailValue, password: passwordValue } },
      }
    )
  }
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            {/* <p className="text-xs-center">
              <a href>Have an account?</a>
            </p> */}
            <ul className="error-messages">{displayErrors()}</ul>
            <form onSubmit={handleSubmit}>
              {/* <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset> */}
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  value={email.input.value}
                  onChange={email.input.onChange}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  value={password.input.value}
                  onChange={password.input.onChange}
                />
              </fieldset>
              <button
                type="submit"
                className="btn btn-lg btn-primary pull-xs-right"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
