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
            <Link to="/list" className="nav-link active">
              Article list
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/counter" className="nav-link">
              Redux counter
            </Link>
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
        <Link to="/app/create" className="nav-link">
          <i className="ion-compose" />
          &nbsp;New Post
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/app/settings" className="nav-link">
          <i className="ion-gear-a" />
          &nbsp;Settings
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/app/settings" className="nav-link">
          {username}
        </Link>
      </li>
    </>
  )
}

function Logout() {
  return (
    <>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Sign in
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Sign up
        </Link>
      </li>
    </>
  )
}

export default Header
