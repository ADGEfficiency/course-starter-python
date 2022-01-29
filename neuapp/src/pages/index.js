import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { Link } from '../components/link'
import Logo from '../../static/logo-neu.svg'

import classes from '../styles/index.module.sass'
import {
  container,
  heading,
  navLinkItem,
  navLinkText
} from '../styles/layout.module.sass'

import PostLink from "../components/post-link"

export default ({ data }) => {
    const siteMetadata = data.site.siteMetadata

    const edges = data.allMarkdownRemark.edges

    const Posts = edges
      .map(edge => <p><Link to={edge.node.frontmatter.slug}>{edge.node.frontmatter.title}</Link></p>)

    return (
        <Layout isHome>
          <Logo className={classes.logo} aria-label={siteMetadata.title} />
            <section>
                <div className={classes.introduction}>
                <p>
                  Data Science South is a collection of courses and blog posts aimed at data professionals - data analysts, scientists and engineers.
                </p>
                <p>
                  If you want to follow as I create more - <Link>follow on LinkedIn</Link>.
                </p>
                </div>

                <h1 className={classes.subtitle}> Courses </h1>
                <div className={classes.introduction}>
                <p><Link to="/courses/datetimes">Datetimes in Python</Link> - learn how to work with datetimes in Python.</p>
                </div>
            </section>
            <section>
              <h1 className={classes.subtitle}> Blog Posts </h1>
              <div className={classes.introduction}>
                {Posts}
              </div>
            </section>
        </Layout>
    )
}
    // const chapters = data.allMarkdownRemark.edges.map(({ node }) => ({
    //     slug: node.fields.slug,
    //     title: node.frontmatter.title,
    //     description: node.frontmatter.description,
    // }))

            // {chapters.map(({ slug, title, description }) => (
            //     <section key={slug} className={classes.chapter}>
            //         <h2 className={classes.chapterTitle}>
            //             <Link hidden to={slug}>
            //                 {title}
            //             </Link>
            //         </h2>
            //         <p className={classes.chapterDesc}>
            //             <Link hidden to={slug}>
            //                 {description}
            //             </Link>
            //         </p>
            //     </section>
            // ))}

export const pageQuery = graphql`
    {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___title], order: ASC }
            filter: { frontmatter: { type: { eq: "post" } } }
        ) {
            edges {
                node {
                    frontmatter {
                        title
                        description
                        slug
                    }
                }
            }
        }
    }
`
