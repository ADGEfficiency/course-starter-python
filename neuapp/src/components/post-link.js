import React from "react"
import { Link } from "gatsby"

import * as classes from '../styles/index.module.sass'

const PostLink = ({ post }) => (
  <div>
    <Link to={post.frontmatter.slug}>
      {post.frontmatter.title} - {post.frontmatter.description}
    </Link>
  </div>
)

export default PostLink
