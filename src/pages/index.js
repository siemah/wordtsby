import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({data}) => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>{data.allWordpressPost.totalCount} Post available</h1>
      {
        data.allWordpressPost.edges.map(({ node }) => (
          <div key={node.id}>
            <Link to={`/article/${node.slug}`}>
              <img src={node.featured_media.source_url} alt={node.featured_media.alt_text} />
              <h4><span dangerouslySetInnerHTML={{ __html: node.title }} /> - {node.date}</h4>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
        ))
      }
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allWordpressPost(sort: {fields:[date], order: DESC}) {
      totalCount
      edges {
        node {
          id 
          title
          slug
          excerpt
          date(formatString: "Do MMMM")
          featured_media {
            id
            alt_text
            source_url
          }
        }
      }
    }
  }
`

export default IndexPage
