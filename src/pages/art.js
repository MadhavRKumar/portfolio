import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"

const Art = ({data}) => (
  <>
    <SEO title="Art" />
	{data.allFile.edges.map(img => {
		return <Img resolutions={img.node.childImageSharp.resolutions} />})}
  </>
)

export default Art

export const query = graphql`
	query ImagesQuery {
		allFile(filter: {sourceInstanceName: {eq: "art"}}) {
			edges {
				node {
					childImageSharp{
						resolutions(width:125, height:125) {
						...GatsbyImageSharpResolutions
						}
					}
				}
			}
		}
	}`
