import React from 'react'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <p>Popular Tags</p>
      <div className="tag-list">
        <a className="tag-pill tag-default">programming</a>
        <a className="tag-pill tag-default">javascript</a>
        <a className="tag-pill tag-default">emberjs</a>
        <a className="tag-pill tag-default">angularjs</a>
        <a className="tag-pill tag-default">react</a>
        <a className="tag-pill tag-default">mean</a>
        <a className="tag-pill tag-default">node</a>
        <a className="tag-pill tag-default">rails</a>
      </div>
    </div>
  )
}

export default Sidebar
