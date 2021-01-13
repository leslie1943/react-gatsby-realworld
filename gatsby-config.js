/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/app/*'] }, // 以 /app/ 开头的请求地址都属于客户端路由
    },
    {
      resolve: 'gatsby-source-list',
      options: {
        apiUrl: 'https://conduit.productionready.io/api',
      },
    },
  ],
}
