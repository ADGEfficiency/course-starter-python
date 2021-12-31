import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { Link } from '../components/link'
import Logo from '../../static/logo.svg'

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
      .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

    return (
        <Layout isHome>
          <h1 className={classes.subtitle}><Link to="/">Data Science South</Link></h1>
            <section>

                <div className={classes.introduction}>
                <p>
      I'm passionate about data science education, supporting daha science education, Passion project - dream / goal, Looking for partner, Think of it as an outlet  for my passion for teachingf & learning, that may be a bigger thing one ady
                </p>
                </div>

                <h1 className={classes.subtitle}> Courses </h1>
                <div className={classes.introduction}>
                <p>
                  Short, practical data science courses.
                </p>
                <p><Link to="/courses/data-analysis">Data Analysis Course</Link></p>
                <p><Link to="/courses/datetimes">Datetimes Course</Link></p>
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
