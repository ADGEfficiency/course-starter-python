import React from "react"
import { graphql } from "gatsby"
import { Link } from '../components/link'
import Layout from '../components/layout'
import classes from '../styles/index.module.sass'

const BlogPost = ({ data }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout isHome >
      <h1 className={classes.subtitle}><Link to="/">Data Science South</Link></h1>
      <section>
        <div className={classes.introduction}>
        <h1>{frontmatter.title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        </div>
      </section>
    </Layout>
  )
}
export default BlogPost

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`
