exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    query {
      allArticlesList {
        nodes {
          slug
        }
      }
    }
  `)
  data.allArticlesList.nodes.forEach((article) => {
    createPage({
      // 模板的绝对路径
      component: require.resolve('../../src/templates/article.js'),
      // 访问地址
      path: `/article/${article.slug}`,
      // 传递给模板的查询数据
      context: {
        slug: article.slug,
      },
    })
  })
}
