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
export default ({ data }) => {
    const siteMetadata = data.site.siteMetadata
    const chapters = data.allMarkdownRemark.edges.map(({ node }) => ({
        slug: node.fields.slug,
        title: node.frontmatter.title,
        description: node.frontmatter.description,
    }))
    return (
        <Layout isHome>
          <h1 className={classes.subtitle}>Data Science South</h1>
            <section>
              <nav>
                <ul className={classes.navLinks}>
                  <li className={classes.navLinkItem}>
                    <Link to="/">
                      Home
                    </Link>
                  </li>
                  <li className={classes.navLinkItem}>
                    <Link to="/courses">
                      Courses
                    </Link>
                  </li>
                </ul>
              </nav>
            </section>
            <section>
                <h1 className={classes.subtitle}> Courses </h1>
                <div className={classes.introduction}>
                <p>
                  Our first offering - practical data science courses.
                </p>
                <p><Link to="/courses/data-analysis">Data Analysis Course</Link></p>
                <p><Link to="/courses/datetimes">Datetimes Course</Link></p>
                </div>
            </section>
        </Layout>
    )
}

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
            filter: { frontmatter: { type: { eq: "chapter" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        description
                    }
                }
            }
        }
    }
`
