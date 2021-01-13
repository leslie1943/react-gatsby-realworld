import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import axios from 'axios'

const Article = ({ data, slug }) => {
  const [article, setArticle] = useState({})
  useEffect(() => {
    if (data) {
      setArticle(data.articlesList)
      return
    }

    // 加载数据
    const autoLoad = async () => {
      const { data: dataArticle } = await axios.get(`/articles/${slug}`)
      setArticle(dataArticle.article)
    }
    // 调用
    autoLoad()
  })
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <a>
              <img alt="" src={article.author?.image} />
            </a>
            <div className="info">
              <a className="author">{article.author?.username}</a>
              <span className="date">{article.createAt}</span>
            </div>
            <button type="button" className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round" />
              &nbsp; Follow {article.author?.username}
              <span className="counter">({article.author?.following})</span>
            </button>
            &nbsp;&nbsp;
            <button type="button" className="btn btn-sm btn-outline-primary">
              <i className="ion-heart" />
              &nbsp; Favorite Post
              <span className="counter">({article.favoritesCount})</span>
            </button>
          </div>
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <div dangerouslySetInnerHTML={{ __html: article.body }} />
          </div>
        </div>
        <hr />

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            {/* 添加评论 */}
            <form className="card comment-form">
              <div className="card-block">
                <textarea
                  className="form-control"
                  placeholder="Write a comment..."
                  rows={3}
                  defaultValue=""
                />
              </div>
              <div className="card-footer">
                <img
                  alt=""
                  src="http://i.imgur.com/Qr71crq.jpg"
                  className="comment-author-img"
                />
                <button type="button" className="btn btn-sm btn-primary">
                  Post Comment
                </button>
              </div>
            </form>
            {/* 评论 */}
            <div className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div className="card-footer">
                <a className="comment-author">
                  <img
                    alt=""
                    src="http://i.imgur.com/Qr71crq.jpg"
                    className="comment-author-img"
                  />
                </a>
                &nbsp;
                <a className="comment-author">Jacob Schmidt</a>
                <span className="date-posted">Dec 29th</span>
              </div>
            </div>
            {/* 评论 */}
            <div className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div className="card-footer">
                <a className="comment-author">
                  <img
                    alt=""
                    src="http://i.imgur.com/Qr71crq.jpg"
                    className="comment-author-img"
                  />
                </a>
                &nbsp;
                <a className="comment-author">Jacob Schmidt</a>
                <span className="date-posted">Dec 29th</span>
                <span className="mod-options">
                  <i className="ion-edit" />
                  <i className="ion-trash-a" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article

export const query = graphql`
  query($slug: String) {
    articlesList(slug: { eq: $slug }) {
      title
      author {
        bio
        following
        image
        username
      }
      body
      createdAt
      description
      favoritesCount
    }
  }
`
