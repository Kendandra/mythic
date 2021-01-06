import React from "react"
import { graphql, useStaticQuery } from "gatsby"

function Characters() {

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);


  return (
    <div>
      <h1>{data.site.siteMetadata.title}</h1>
      <h2>Characters</h2>
      <div>Let's take a look at a few characters pulled from our custom CMS</div>
    </div>
  )
}


export default Characters;