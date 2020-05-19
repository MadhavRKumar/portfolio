import React from "react"
import SEO from "../components/seo"
import "@openfonts/cormorant-garamond_latin"
import "@openfonts/work-sans_latin"
import "../components/layout.css"

const Layout = ({title, children}) => (
		<>
		<SEO title={title} />
		<main>{children}</main>	
		</>
) 

export default Layout;
