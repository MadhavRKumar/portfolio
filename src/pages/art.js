import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Meta from "../components/meta"

const Art = ({data}) => (
	<> 
	<Meta title="Art" />
	<div className="flex-wrapper">
	{data.allFile.edges.map(img => {
		return <LabeledImage image={img} />})}
	</div>
	</>
)

export default Art

const LabeledImage = ({image}) => ( 
	<div className="art-image"> 
	<p className="art-label">{image.node.name}</p>
	<Img resolutions={image.node.childImageSharp.resolutions} />
	</div>
) 


export const query = graphql`
	query ImagesQuery {
		allFile(filter: {sourceInstanceName: {eq: "art"}}) {
			edges {
				node {
					name
					childImageSharp{
						resolutions(width:375, height:375) {
						...GatsbyImageSharpResolutions
						}
					}
				}
			}
		}
	}`
