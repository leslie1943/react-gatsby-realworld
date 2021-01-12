import React from 'react'
// useDispatch: 获取 dispatch 方法
// useSelector: 从 store 获取数据
import { useDispatch, useSelector } from 'react-redux'

const Banner = () => {
  const dispatch = useDispatch()
  const counterReducer = useSelector((state) => state.counterReducer)
  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">conduit</h1>
        <h1 className="logo-font">counter {counterReducer.count}</h1>
        <p>A place to share your knowledge.</p>
        <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
        <button onClick={() => dispatch({ type: 'increment_async' })}>
          +1
        </button>
      </div>
    </div>
  )
}

export default Banner
