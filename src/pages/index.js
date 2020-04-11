import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"

const IndexPage = () => (
  <div className="flex">    
    <SEO title="Home" />
    <header>
      <h1 id="name">Madhav Kumar</h1>
      <p id="description" className="body">
        I'm a web developer and generative artist.
    </p>
    </header>
    <div className="bottom-half">
      <ul id="list">
        <li id="work">
          <a>Work</a>
        </li>
        <li id="art">
          <a>Art</a>
        </li>
      </ul>
    </div>
  </div>
)

export default IndexPage
