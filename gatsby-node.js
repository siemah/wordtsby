const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const createWpPosts = new Promise((resolve, reject) => {
  const query = graphql(`
    {
      allWordpressPost {
        edges {
          node {
            id
            slug
            title
          }
        }
      }
    }
  `);

    query.then(result => {
      if(result.errors) {
        console.log(result.errors);
        reject(result.errors)
      }
      const { edges } = result.data.allWordpressPost

      edges.forEach(edge => {
        let { slug, id } = edge.node;
        createPage({
          path: `/article/${slug}`,
          component: path.resolve(`./src/templates/post.js`),
          context: {
            id: id,
          }
        })
      });
      resolve()
    }) // query.then
  }) // createWpPosts

  return Promise.all([createWpPosts])
} // createPages