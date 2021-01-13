import { Link } from 'gatsby'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
  // 获取 dispatch
  const dispatch = useDispatch()
  // 获取 authReducer
  const authReducer = useSelector((state) => state.authReducer)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch({
        type: 'loadUser',
        payload: token,
      })
    }
  }, [])
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {/* Add "active" class when you're on that page" */}
            <a className="nav-link active">Home {authReducer.success}</a>
          </li>
          {authReducer.success ? (
            <Login username={authReducer.user.username} />
          ) : (
            <Logout />
          )}
        </ul>
      </div>
    </nav>
  )
}

function Login({ username }) {
  return (
    <>
      <li className="nav-item">
        <a className="nav-link">
          <i className="ion-compose" />
          &nbsp;New Post
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link">
          <i className="ion-gear-a" />
          &nbsp;Settings
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link">{username}</a>
      </li>
    </>
  )
}

function Logout() {
  return (
    <>
      <li className="nav-item">
        <a className="nav-link">Sign in</a>
      </li>
      <li className="nav-item">
        <a className="nav-link">Sign up</a>
      </li>
    </>
  )
}

export default Header
