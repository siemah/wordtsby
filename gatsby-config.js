require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin above enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
    /**
     * this is a custom plugin installed by @author siemah
     */
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // The base url to your WP site.
        baseUrl: process.env.WORDPRESS_BASE_URL,
        // WP.com sites set to true, WP.org set to false
        hostingWPCOM: false,
        // The protocol. This can be http or https.
        protocol: process.env.WORDPRESS_PROTOCOL,
        // Use 'Advanced Custom Fields' Wordpress plugin
        useACF: process.env.WORDPRESS_USE_ACF,
        // Set to true to debug endpoints on 'gatsby build'
        verboseOutput: process.env.WORDPRESS_VERBOSE_OUTPUT,
        perPage: 10,
        concurrentRequests: 10,
        includedRoutes: [
          "**/posts",
          "**/pages",
          "**/tags",
          "**/media",
        ],
      }
    },
  ],
}
