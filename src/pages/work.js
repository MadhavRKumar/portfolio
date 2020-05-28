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
				tech
				url
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
			<h1 className="work-header">Work</h1>
			<div className="flex-wrapper">
				{data.allWorkJson.edges.map(work => { 
					return <Entry node={work.node} key={work.node.title}/>	
				})}
			</div>		
		</Layout>
	)
}

export default Work;


const Entry = ({node:{title, repo, tech, description, image, url}}) => {
	return (
		<div className="work">
			<h2 className="work-title uppercase">{title}</h2>
			<Image fluid={image.childImageSharp.fluid}/>
			<Description tech={tech} description={description} url={url} repo={repo}/>
		</div>
	)
}

const Description = ({tech, description, url, repo}) => {
	const techString = tech.join(', ');
	const website = url ? (<p className="work-link"><a href={url}>Website</a></p>) : null;
	const source = (<p className="work-link"><a href={repo}>Source</a></p>) 
	return (
		<>
		<p className="description">{description} Technology: <strong>{techString}.</strong></p>
		{website}
		{source}
		</>
	);
}
