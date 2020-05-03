import React from "react"
import Img from "gatsby-image"
import Layout from "../components/layout"

const Art = ({data}) => ( 
	<Layout title="Art">
	<h1>Generative Art</h1>
	<p className="body">Made using <a className="link" href="https://github.com/mattdesl/canvas-sketch">canvas-sketch</a></p>
	<div className="flex-wrapper">
	{data.allFile.edges.map(img => {
		return <LabeledImage image={img} />})}
	</div>
	</Layout>
)

export default Art

const LabeledImage = ({image}) => ( 
	<div className="art-image"> 
	<p className="art-label">{capitalizeFirst(image.node.name)}</p>
	<Img fluid={image.node.childImageSharp.fluid} />
	</div>
) 

function capitalizeFirst(str) {
	return str.charAt(0).toUpperCase() + str.substring(1);
}

export const query = graphql`
	query ImagesQuery {
		allFile(filter: {sourceInstanceName: {eq: "art"}}) {
			edges {
				node {
					name
					childImageSharp{
						fluid(maxWidth: 375) {
						...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
	}`
