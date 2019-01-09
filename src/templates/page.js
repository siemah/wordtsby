import React from 'react'
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default ({data}) => {
  let page = data.wordpressPage;
  return (
    <Layout >
      <SEO title={page.title + ' '} keywords={[...page.title.split(' ').join(), page.title, page.slug]} />
      <h1 dangerouslySetInnerHTML={{__html: page.title}} />
      <div dangerouslySetInnerHTML={{__html: page.content}} className={`post-page post-${page.slug}`} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
    }
  }`