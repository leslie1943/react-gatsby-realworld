### 创建项目
- `gatsby new xxxx https://github.com/gatsbyjs/gatsby-starter-hello-world`

### 配置 redux + saga
- `npm install redux react-redux redux-saga`
- 详情见 `gatsby-browser.js` 和 `gatsby-ssr.js`

### 编译生产环境
1. `npm run build`
2. `npm run serve`

### 创建页面 方式(1):
- 在`pages`文件下创建不同的`.js`文件

### 创建页面 方式(2): 以编程的方式创建页面
- 基于同一个模板创建多个HTML页面, 有多少数据就创造多少页面
- 比如商品详情页面,有多少商品就生成多少商品详情展示页面

```js
// createPages 方法用于创建页面
// Gatsby 在构建应用时会调用改方法
// 该方法需要在 gatsby-node.js 文件中定义

function createPages({actions}){
  const { createPage } = actions
  // 获取模板的绝对路径
  // 获取组件所需数据
  // 根据模板和数据创建页面
}

// nodejs 运行
module.exports = { createPages }
```

### Gatsby - GraphQL 数据层
- 在`Gatsby`框架中提供了一个统一的存储数据的地方,叫做数据层
- 在应用构建时, `Gatsby`会从外部获取数据并将数据放入数据层, 组件可以直接从数据层查询数据
- 数据层使用 `GraphQL`构建
- 调式工具: `localhost:8000/___graphql`

### Gatsby - GraphQL 页面组件 数据查询
- 在组件文件中导出查询命令, 框架执行查询并将结果传递给组件的`prop`对象, 存储在`prop`对象的`data`属性中
```js
import { graphql } from 'gatsby'
function PageComponent({ data }){
  return <div>
    { data.site.siteMetadata.title}
  </div>
}

export const query = graphql`
  query {
    site {
      siteMetadat {
        title
      }
    }
  }
`
```

### Gatsby - GraphQL 非页面组件 数据查询
- 通过钩子函数`useStaticQuery`进行手动查询
```js
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
const Header = () => {
  // query 后可以不加查询名称
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `)
  const { title, author } = data.site.siteMetadata
  return (
    <div>
      <p>site title: {title}</p>
      <p>site author: {author}</p>
    </div>
  )
}

export default Header

```

### Gatsby 插件
- `Gatsby`框架内置插件系统,插件时为应用添加功能的最好的方式
- `Gatsby` 有三种类型的插件: `数据源插件(source)`, `数据转换插件(transformer)`,`功能插件(plugin)`
1. 数据源插件(source): 负责从应用外部获取数据, 将数据统一放在`Gatsby`的数据层中
2. 数据转换插件(transformer): 负责转换特定类型的数据格式, 比如将`markdown`文件中的内容转换为`对象形式`
3. 功能插件(plugin): 为应用提供功能, 比如通过插件让应用支持 `less` 或者 `TypeScript`
- 插件地址: https://www.gatsbyjs.org/plugins


### static 文件夹
- 是静态资源文件夹, 在浏览中可以直接访问 `http://localhost:8000/images/product-1.jpg`

### 将JSON数据放入数据层
1. 插件-1: `gatsby-source-filesystem`: 将本地文件中的数据添加至数据层
2. 插件-2: `gatsby-transformer-json`: 将原始`JSON`字符串转换为`JavaScript`对象
- 安装 `npm install gatsby-source-filesystem gatsby-transformer-json`
```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      // 将 json 文件夹中的 json 文件添加到数据层中
      options:{
        name: "json",
        path: `${__dirname}/json/`
      }
    },
    // 无需其他配置, 直接写插件名字即可.
    "gatsby-transformer-json"
  ]
}
```
- 配置完插件需要重新启动
- 会生成两类数据 以`all`开头的数据(查询所有数据), 没有`all`的数据(查询单个数据)
- 具体请参照 `src/page/product.js`  效果: `http://localhost:8000/products` 


### 图像优化
- `gatsby-source-filesystem` 用于将本地文件信息添加到数据层
- `gatsby-plugin-sharp` 提供本地图像的处理功能(调整图像尺寸,压缩图像体积等)
- `gatsby-transformer-sharp`: 将`gatsby-plugin-sharp`插件处理后的图像信息添加到数据层
- `gatsby-image`: React组件, 优化图像显示, 基于`gatsby-tranformer-sharp`插件转化后的数据
1. 生成多个具有不同宽度的图像版本, 为图像设置`srcset`和`sizes`属性, 因此无论使用的是什么设备都能加载到合适大小的图片
2. 使用 模糊处理 技术, 其中将一个20px宽的小图像显示为占位符, 直到实际图像下载完成为止
- 命令 `npm install gatsby-plugin-sharp gatsby-transformer-sharp gatsby-image`
- 命令 `cnpm install gatsby-plugin-sharp gatsby-transformer-sharp gatsby-image`
- 为了保证 `gatsby-plugin-sharp`下载成功, 需要安装一个模块`mirror-config-china`

```js
// 'gatsby-plugin-sharp', 还差这个没有下载成功
```

### markdown数据加入数据层
- `gatsby-source-filesystem` 用于将本地文件信息添加到数据层
- `gatsby-transformer-remark` 将数据层原始`markdown`文件转换为对象形式
- `npm install gatsby-transformer-remark`


### 使用编程的方式给 markdown 文件添加 slug
```bash
# 重新构建查询数据, 添加 slug 作为请求标识, slug值作为文件名称
gatsby.md -> /posts/gatsby
react.md -> /posts/react
```
```js
// gatsby-node.js
// 重新构建查询数据, 添加 slug 作为请求标识, slug 值为文件名称
const onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md')
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}
```

``` 
query MyQuery {
  allMarkdownRemark {
    nodes {
      html
      id
      fields { // 添加的属性在这里
        slug
      }
      frontmatter {
        title
      }
    }
  }
}
```


### Graphql 根据条件查询
```js
// 查询语句
query ($slug: String) {
  markdownRemark (fields:{slug:{eq:$slug}}){
    html
    frontmatter {
      date
      title
    }
    id
  }
}
// QUERY VARIABLES 查询参数
{
  "slug": "react"
}

// GET RESULT 查询结果
{
  "data": {
    "markdownRemark": {
      "html": "<p>Hello React, this is a post</p>",
      "frontmatter": {
        "date": "2048-11-12",
        "title": "Hello React"
      },
      "id": "2de9b3e3-e3f3-5d8f-b05b-31e12c898423"
    }
  },
  "extensions": {}
}
```


### 处理markdown文件中的图片
- `gatsby-remark-images`: 处理 `markdown`中的图片, 以便在生产环境使用

```js
// gatsby-config.js
{
  resolve: 'gatsby-transform-remark',
  options: {
    plugins:["gatsby-remark-images"]
  }
}
```

### 从 strapi中获取数据
- 0. 下载插件`gatsby-source-strapi`
- 1.` gatsby-config.js` 中配置 `strapi` 的 服务地址
```js
// 在 gatsby-config.js 中配置 strapi 的 服务地址
{
  "resolve": "gatsby-source-strapi",
  "options":{
    apiURL: 'http://47.114.105.120:1337',
    contentTypes: ['Post'] // 哪张表
  }
}
```
2. 在 `gatsby-node.js` 中创建页面,有多少数据就创建多少页面
```js
async function createPagesPost({ graphql, actions }) {
  const { createPage } = actions
  // 1. 获取模板的文件的绝对路径
  const template = require.resolve('./src/templates/post.js')
  // 2. 获取页面的访问标识, 只查询 id 就可, id 是作为 传递给模板的查询数据
  const { data } = await graphql(`
    query {
      allStrapiPost {
        nodes {
          id
        }
      }
    }
  `)
  // 3. 创建页面
  data.allStrapiPost.nodes.forEach((node) => {
    createPage({
      // 模板的绝对路径
      component: template,
      // 访问地址
      path: `/post/${node.id}`,
      // 传递给模板的查询数据
      context: {
        id: node.id,
      },
    })
  })
}
```
4. 在 `templates` 文件夹下配置 `post`页面的模板, 通过`id`  使用`graphql` 查询  `post`详情
```js
export default function Article({ data }) {
  return (
    <div>
      <p>{data.strapiPost.title}</p>
      <div dangerouslySetInnerHTML={{ __html: data.strapiPost.content }}></div>
    </div>
  )
}

// gatsby 会帮助我们自动执行,会根据 gatsby-node中的
// 的 id 匹配过来
export const query = graphql`
  query($id: String) {
    strapiPost(id: { eq: $id }) {
      is_publish
      content
      id
      title
      strapiId
    }
  }
`
```

### Gatsby Source 插件开发
- 数据源插件负责从`Gatsby`应用外部获取数据, 创建数据查询节点供开发者使用
1. `gatsby-clean` 清除上一次的构建内容
2. 在项目根目录下创建`plugins`文件夹, 在此文件中继续创建具体的插件文件夹, 比如`gatsby-source-mystrapi`文件夹
3. 在插件文件夹中创建`gatsby-node.js`文件
4. 插件实际上就是`npm`包
5. 导出`sourceNodes`方法用于获取外部数据, 创建数据查询节点
6. 在`gatsby-config.js`文件中配置插件, 并传递插件所需要的配置参数
7. `restart application`


### Gatsby Transformer 插件开发
- `transformer` 插件将`source`插件提供的数据转换为新的数据.
1. 在`plugins`文件夹中创建`gatsby-transformer-xml`文件夹
2. 在插件中文件夹中创建`gatsby-node.js`文件
3. 在文件中导出 `onCreateNode`方法用于构建`Gatsby`查询节点
4. 根据节点类型筛选`xml`节点 `node.internal.mediaType -> applicaiton/xml`
5. 通过`loadNodeContent`方法读取节点中的数据
6. 通过`xml2js`将`xml`数据转换为对象
7. 将对象转换为`Gatsby`查询节点

### SEO 优化
- `gatsby-plugin-react-helmet`
- `react-helment`是一个组件, 用于控制页面元素据, 这对 SEO 非常重要
- 此插件将页面元数据添加到`Gatsby`构建的静态HTML页面中
- `npm install gatsby-plugin-react-helmet  react-helmet`
- 参考 `components/SEO.js` 和 `src/pages/index.js` 或者 `src/pages/list.js`下的使用 `SEO`组件的代码.


### Less 支持
- 在`gatsby`应用中使用`less`
- 下载插件 `npm install --save gatsby-plugin-less`
- 配置插件: `plugins:['gatsby-plugin-less']`
- 创建样式: `index.module.less`
- 引入样式: `import styles from './index.module.less'`


<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby's hello-world starter
</h1>

Kick off your project with this hello-world boilerplate. This starter ships with the main Gatsby configuration files you might need to get up and running blazing fast with the blazing fast app generator for React.

_Have another more specific idea? You may want to check out our vibrant collection of [official and community-created starters](https://www.gatsbyjs.com/docs/gatsby-starters/)._

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the hello-world starter.

    ```shell
    # create a new Gatsby site using the hello-world starter
    gatsby new my-hello-world-starter https://github.com/gatsbyjs/gatsby-starter-hello-world
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-hello-world-starter/
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.com/tutorial/part-five/#introducing-graphiql)._

    Open the `my-hello-world-starter` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.com/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.com/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.com/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.com/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: This Gatsby starter is licensed under the 0BSD license. This means that you can see this file as a placeholder and replace it with your own license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.com/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.com/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-hello-world)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/gatsbyjs/gatsby-starter-hello-world)

<!-- AUTO-GENERATED-CONTENT:END -->
