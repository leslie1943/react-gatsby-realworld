import React from 'react'
import Article from '../templates/article'

const NotFound = (props) => {
  const { location } = props
  const { pathname } = location
  if (pathname.startsWith('/article')) {
    const slug = pathname.substr(9)
    return <Article slug={slug} />
  }

  return <div>Page Not Found!😭</div>
}

export default NotFound
