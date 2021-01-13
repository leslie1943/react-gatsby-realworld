const axios = require('axios').default
const createNodeHelpers = require('gatsby-node-helpers').default
const { paginate } = require('gatsby-awesome-pagination')

// 循环加载所有数据
async function loadArticles(apiUrl) {
  const limit = 100
  let offset = 0
  const result = []
  async function load() {
    const { data } = await axios.get(`${apiUrl}/articles`, {
      params: { limit, offset },
    })
    result.push(...data.articles)

    if (result.length < data.articlesCount) {
      offset += limit
      await load()
    }
  }
  // 初始调用
  await load()

  return result
}

exports.sourceNodes = async ({ actions }, { apiUrl }) => {
  const { createNode } = actions
  const articles = await loadArticles(apiUrl)
  // 创建节点
  const { createNodeFactory, generateNodeId } = createNodeHelpers({
    typePrefix: 'articles',
  })
  // createNodeFactory 第二个参数回调函数, 手动指定节点的id是什么
  const createNodeObject = createNodeFactory('list', (node) => {
    // generateNodeId 方法第一个参数 随意字符串, 第二个参数是唯一值
    node.id = generateNodeId('leslie', node.slug)
    // id的格式: articles_leslie_[xxxxx]
    return node
  })
  // 构建数据节点
  articles.forEach((article) => {
    // createNodeObject 创建数据节点
    // createNode 将数据节点插入到数据层中(graphql中可以查询到)
    createNode(createNodeObject(article))
  })
}

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

  // Create your paginated pages
  paginate({
    createPage, // The Gatsby `createPage` function
    items: data.allArticlesList.nodes, // An array of objects
    itemsPerPage: 10, // How many items you want per page
    pathPrefix: '/list', // Creates pages like `/list`, `/list/2`, etc
    component: require.resolve('../../src/templates/list.js'), // Just like `createPage()`
  })
}
