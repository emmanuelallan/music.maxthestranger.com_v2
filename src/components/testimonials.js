import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const Testimony = () => {
  const data = useStaticQuery(graphql`
    {
      testimony: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/testimony/" } }
      ) {
        edges {
          node {
            frontmatter {
              clientName
              countryFlag {
                childImageSharp {
                  gatsbyImageData(
                    width: 24
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
              description
              location
              title
            }
          }
        }
      }
    }
  `);

  const testimony = data.testimony.edges.filter(({ node }) => node);
  return (
    <section className="testimony">
      <div className="test-wrapper">
        <h2>You&apos;re in good company</h2>
        <p>
          I have worked with lots of artists across the globe on different
          projects.
        </p>
        <div className="card-con">
          {testimony.map(({ node }, index) => {
            const { frontmatter } = node;
            const { clientName, countryFlag, description, location, title } =
              frontmatter;
            const img = getImage(countryFlag);

            return (
              <div key={index} className="test">
                <div className="test-con">
                  <div className="top-sec">
                    <p>{title}</p>
                    <GatsbyImage image={img} alt={location} />
                  </div>
                  <p className="desc">{description}</p>
                  <div className="bottom-sec">
                    <p>@{clientName}</p>
                    <span>
                      {location.split(',')[0]}
                      ,<br />
                      {location.split(',')[1]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimony;
