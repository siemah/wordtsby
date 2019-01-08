import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'


export default ({ data }) => {
  const post = data.wordpressPost
  let {title, slug} = post
  return (
    <Layout>
      <SEO title={title + ' 444'} keywords={[...title.split(' ').join(), title, slug]} />
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
        <h3>
          date: {post.date} 
        </h3>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </Layout>
  )
}
export const pageQuery = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      date(formatString: "Do MMMM YYYY")
      content
    }
  }
`
