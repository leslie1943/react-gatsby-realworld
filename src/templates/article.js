import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { graphql } from 'gatsby'
import axios from 'axios'
import useInput from '../hooks/useInput'

const Article = ({ data, slug }) => {
  // 使用钩子函数设置输入框的值
  const comment = useInput('')
  // 获取 authReducer
  const authReducer = useSelector((state) => state.authReducer)

  // 组件状态数据
  const [article, setArticle] = useState({})
  const [comments, setComments] = useState([])

  // 加载组件静态部分的数据: 文章详情
  useEffect(() => {
    if (data) {
      setArticle(data.articlesList)
    }
    // 加载动态数据数据
    const autoLoad = async () => {
      const { data: dataArticle } = await axios.get(`/articles/${slug}`)
      setArticle(dataArticle.article)
      const { data: dataComments } = await axios.get(
        `/articles/${slug}/comments`
      )
      setComments(dataComments.comments)
    }
    // 调用
    autoLoad()
  }, [])

  const addComment = async () => {
    const commentValue = comment.input.value
    const params = { comment: { body: commentValue } }
    const headers = {
      headers: { Authorization: `Token ${authReducer.user.token}` },
    }

    const response = await axios.post(
      `/articles/${slug}/comments`,
      params,
      headers
    )
    if (response.status === 200) {
      setComments([response.data.comment, ...comments])
      comment.input.setValue('')
    }
  }

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
                  value={comment.input.value}
                  onChange={comment.input.onChange}
                />
              </div>
              <div className="card-footer">
                <img
                  alt=""
                  src="http://i.imgur.com/Qr71crq.jpg"
                  className="comment-author-img"
                />
                <button
                  onClick={addComment}
                  type="button"
                  className="btn btn-sm btn-primary"
                >
                  Post Comment
                </button>
              </div>
            </form>
            {/* 评论 */}
            {comments.map((item) => (
              <div key={item.id} className="card">
                <div className="card-block">
                  <p className="card-text">{item.body}</p>
                </div>
                <div className="card-footer">
                  <a className="comment-author">
                    <img
                      alt=""
                      src={item.author?.image}
                      className="comment-author-img"
                    />
                  </a>
                  &nbsp;
                  <a className="comment-author">{item.author?.username}</a>
                  <span className="date-posted">{item.createdAt}</span>
                </div>
              </div>
            ))}
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
