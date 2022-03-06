import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../../components/layout'
import * as classes from '../../styles/index.module.sass'
import Logo from '../../../static/logo-neu.svg'

const BlogPost = ({ data }) => {
  return (
    <Layout isHome >
      <Logo className={classes.logo} />
      <section>
        <div className={classes.introduction}>
        <h1 className={classes.subtitle}>{data.mdx.frontmatter.title}</h1>
          <MDXRenderer>
            {data.mdx.body}
          </MDXRenderer>
        </div>
      </section>
    </Layout>

  )
}
export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
      body
    }
  }
`
export default BlogPost
