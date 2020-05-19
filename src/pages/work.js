import React from 'react' 
import { graphql } from 'gatsby'
import Layout from '../components/layout.js'
import Image from 'gatsby-image'

export const query = graphql`
{
	allWorkJson {
		edges {
			node {
				title
				repo
				description
				image {
					childImageSharp {
						fluid(maxWidth:1000) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
	}
}`	

const Work = ({data}) => {
	return ( 
		<Layout title="Work">
			<h1>Work</h1>
			<div className="flex-wrapper">
				{data.allWorkJson.edges.map(work => { 
					return <Entry node={work.node}/>	
				})}
			</div>		
		</Layout>
	)
}

export default Work;


const Entry = ({node,node:{title, repo, tech, description, image}}) => {
	return (
		<div className="work">
			<h2 className="work-title uppercase"><a href={repo}>{title}</a></h2>
			<Image fluid={image.childImageSharp.fluid}/>
			<p className="description">{description}</p>
		</div>
	)
}
