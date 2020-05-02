import React from "react"
import SEO from "../components/seo"
import Helmet from "react-helmet"

const Meta = ({title}) => (
		<>
		<SEO title={title} />
		<Helmet>
		<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond&family=Proza+Libre&display=swap" rel="stylesheet"/>
		</Helmet>
		</>
) 

export default Meta;
