import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../components/Banner'
import Toggle from '../components/Toggle'
import Sidebar from '../components/Sidebar'

export default function List({ data, pageContext }) {
  const { skip, limit } = pageContext
  const dispatch = useDispatch()
  const articleReducer = useSelector((state) => state.articleReducer)

  // 动态加载文章列表
  useEffect(() => {
    dispatch({
      type: 'loadArticles',
      limit,
      offset: skip,
    })
  }, [])

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <Toggle />
            <Lists
              articles={articleReducer.articles || data.allArticlesList.nodes}
            />
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

function Lists({ articles }) {
  return articles.map((article) => (
    <div key={article.slug} className="article-preview">
      <div className="article-meta">
        <a>
          <img alt="" src={article.author.image} />
        </a>
        <div className="info">
          <a className="author">{article.author.username}</a>
          <span className="date">{article.createdAt}</span>
        </div>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm pull-xs-right"
        >
          <i className="ion-heart" /> {article.favoritesCount}
        </button>
      </div>
      <a className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </a>
    </div>
  ))
}

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allArticlesList(skip: $skip, limit: $limit) {
      nodes {
        slug
        favoritesCount
        author {
          image
          username
        }
        createdAt
        description
        title
      }
    }
  }
`
