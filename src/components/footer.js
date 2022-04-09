import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const Footer = () => {
  const data = useStaticQuery(graphql`
    {
      socials: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/socials/" } }
      ) {
        edges {
          node {
            frontmatter {
              altText
              imgUrl {
                childImageSharp {
                  gatsbyImageData(
                    width: 40
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
              url
            }
          }
        }
      }
    }
  `);

  const socials = data.socials.edges.filter(({ node }) => node);
  const [mail, setMail] = useState('');
  const [disabled, setDisabled] = useState(true);

  function handleChange(e) {
    setMail(e.target.value);

    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(e.target.value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }
  return (
    <footer className="footer">
      <div className="mail-list">
        <h3>Yes! Send me some FREE!! 🔥🔥🔥 beats and tips 💯</h3>
        <form className="form">
          <div className="form-group">
            <i className="ri-mail-send-line"></i>
            <input
              type="email"
              placeholder="Enter your email"
              value={mail}
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={disabled}>
            Subscribe
          </button>
        </form>
      </div>
      <div className="socials">
        {socials.map(({ node }, index) => {
          const { frontmatter } = node;
          const { altText, imgUrl, url } = frontmatter;
          const img = getImage(imgUrl);
          return (
            <a key={index} href={url} target="_blank" rel="noreferrer">
              <GatsbyImage image={img} alt={altText} />
            </a>
          );
        })}
      </div>
      <div className="copyright">
        <div>
          © {new Date().getFullYear()} Max The Stranger Beatz, Inc. • Version:
          2.0.0
        </div>
      </div>
    </footer>
  );
};

export default Footer;
