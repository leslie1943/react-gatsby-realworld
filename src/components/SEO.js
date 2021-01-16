import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'

const SEO = ({ title, description, meta, lang }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)
  // 如果 调用组件或者没有给属性设置默认值, 使用 gatsby-config中的 全局 description
  const metaDescription = description || site.siteMetadata.description
  // titleTemplate={`%s | ${site.siteMetadata.title}`}
  // 前面的是调用组件时的传参, 后面的是 Gatsby-config 中的配置
  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[{ name: 'description', content: metaDescription }].concat(meta)}
    />
  )
}

export default SEO

SEO.defaultProps = {
  description: 'SEO component default props for description',
  meta: [],
  lang: 'en',
}
