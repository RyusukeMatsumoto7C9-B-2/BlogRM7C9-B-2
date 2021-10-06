import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const TagIndexTamplate = ({ data, location, pageContext }) => {

  const posts = data.allMarkdownRemark.nodes
  const siteTitle = data.site.siteMetadata.title
  const { totalCount } = data.allMarkdownRemark
  const { tag } = pageContext
  const tagHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      
      <h1>{tagHeader}</h1>

      {posts.map((post) => {
        const title = post.frontmatter.title || post.fields.slug
        return (
          <article
            key={post.fields.slug}
            itemScope
            itemType="http://schema.org/Article"
          >
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link
                  style={{ boxShadow: `none` }}
                  to={post.fields.slug}
                  itemProp="url"
                >
                  <span itemProp="headline">{title}</span>
                </Link>
              </h3>
              <small>{post.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description || post.excerpt,
                }}
                itemProp="description"
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default TagIndexTamplate

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
      ) {
        nodes {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
      }
      totalCount
    }
  }
`
