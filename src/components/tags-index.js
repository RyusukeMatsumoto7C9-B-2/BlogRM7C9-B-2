import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "./layout"
import SEO from "./seo"


const TagsIndex = ({ location, pageContext, data }) => {
    const { tag } = pageContext;
    const { edges, totalCount } = data.allMarkdownRemark;
    const tagHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`;
    const siteTitle = data.site.siteMetadata.title;
  
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title={tagHeader} />
        <h1>{tagHeader}</h1>
        <ul>
          {edges.map(({ node: { fields: { slug }, frontmatter: { title } } }) => (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          ))}
        </ul>
        <p>
          <Link to="/tags">All tags</Link>
        </p>
      </Layout>
    );
  };

  export default TagsIndex;

  
  export const pageQuery = graphql`
  {
    allMarkdownRemark(limit: 2000, sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {tags: {}}}) {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
  }
`


  /*
  export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
    }
  }
  `;

*/