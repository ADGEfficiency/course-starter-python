import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../../components/layout'
import { Link } from '../../components/link'
import Logo from '../../../static/logo-neu.svg'

import * as classes from '../../styles/index.module.sass'

export default ({ data }) => {
    const siteMetadata = data.site.siteMetadata
    const courseMetadata = data.courseData.edges.map(({ node }) => ({
        title: node.frontmatter.title,
        description: node.frontmatter.description,
        body: node.html
    }))[0]

    const chapters = data.chapters.edges.map(({ node }) => ({
        slug: node.fields.slug,
        title: node.frontmatter.title,
        description: node.frontmatter.description,
    }))
    return (
        <Layout isHome>
          <Logo className={classes.logo} aria-label={siteMetadata.title} />

            <section>
                <div className={classes.introduction}>
                <p>{courseMetadata.description}</p>
                <div
                  className="blog-post-content"
                  dangerouslySetInnerHTML={{ __html: courseMetadata.body }}
                />
              </div>
              </section>

            {chapters.map(({ slug, title, description }) => (
                <section key={slug} className={classes.chapter}>
                    <h2 className={classes.chapterTitle}>
                        <Link hidden to={slug}>
                            {title}
                        </Link>
                    </h2>
                    <p className={classes.chapterDesc}>
                        <Link hidden to={slug}>
                            {description}
                        </Link>
                    </p>
                </section>
            ))}
        </Layout>
    )
}

export const pageQuery = graphql`
    {
        site {
          siteMetadata {
            title
          }
        }
        chapters: allMarkdownRemark(
            sort: { fields: [frontmatter___title], order: ASC }
            filter: { frontmatter: { type: { eq: "chapter" }, courseId: {eq: "sql" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        description
                        courseId
                    }
                }
            }
        }
      courseData: allMarkdownRemark(filter: {frontmatter: {courseId: {eq: "sql"}, type: {eq: "course"}}}) {
        edges {
          node {
            id
            frontmatter {
              description
              title
              type
            }
            html
          }
        }
      }
    }
`
