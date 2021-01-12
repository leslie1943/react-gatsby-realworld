import React from 'react'
// useDispatch: 获取 dispatch 方法
// useSelector: 从 store 获取数据
import { useDispatch, useSelector } from 'react-redux'

const counter = () => {
  const dispatch = useDispatch()
  const counterReducer = useSelector((state) => state.counterReducer)
  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">counter {counterReducer.count}</h1>
        <p>A place to share your knowledge.</p>
        <button
          style={{ color: '#409FEE' }}
          type="button"
          onClick={() => dispatch({ type: 'increment' })}
        >
          +1
        </button>
        <button
          type="button"
          style={{ color: '#409FEE' }}
          onClick={() => dispatch({ type: 'increment_async' })}
        >
          +1
        </button>
      </div>
    </div>
  )
}

export default counter
