import React from "react";

import Bio from "../components/bio";
import Layout from "../components/seo";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";

// Components.
import { Link, graphql } from "gatsby";


const TagPageIndex = ({pageContext, data, location}) =>{
  const {tag} = pageContext;
  const {edges, totalCount} = data.allMarkdownRemark;

  const tagHeader = `[${tag}]タグの記事一覧（全${totalCount}件）`;

  return (
    <Layout location={location}>
      <SEO title={`Tag: ${tag}`} description={`${tag}タグを含む記事の一覧ページです`} />
      <Bio />
      <h2>{tagHeader}</h2>
      {edges.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.frontmatter.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        );
      })}
    </Layout>
  );
};

export default TagPageIndex;

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
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            description
          }
        }
      }
    }
  }
`;
