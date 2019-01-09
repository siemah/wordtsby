const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage, } = actions;
  // create a post pages
  const createWpPosts = new Promise((resolve, reject) => {
    graphql(`
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
    `).then(result => {
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

  // create pages page
  const createWpPages = new Promise((resolve, reject) => {
    graphql(`
      {
        allWordpressPage {
          edges {
            node {
              id 
              slug
              title
            }
          }
        }
      }
    `).then(result => {
      if(result.errors) {
        console.log(result.errors);
        reject(result.errors);
      }
      let { edges } = result.data.allWordpressPage;
      edges.forEach(({ node }) => {
        createPage({
          path: `/${node.slug}`,
          component: path.resolve(`./src/templates/page.js`),
          context: {
            id: node.id,
          }
        });
      });
      resolve();
    })
  });// createWpPages

  return Promise.all([createWpPosts, createWpPages])
} // createPages