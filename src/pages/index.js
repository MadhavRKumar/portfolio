import React, { useRef, useEffect} from "react"
import Helmet from "react-helmet"
import gsap from "gsap"
import { Link } from "gatsby"

import SEO from "../components/seo"

const IndexPage = () => {
  let wholeRef = useRef(null), nameRef = useRef(null), descRef = useRef(null), bottomRef = useRef(null), workRef = useRef(null), artRef = useRef(null);
  const tl = gsap.timeline();

  useEffect(() => {
    tl.to(wholeRef, {visibility: "visible"});
    tl.from(nameRef, { duration: 1, x: 1000, ease: "back.inOut", opacity: 0});
    tl.from(descRef, {duration: 0.25, opacity:0, y: -5, ease: "power2.in" });
    tl.from(bottomRef, {duration:0.5, opacity:0, y:200, ease: "power1.in"}, "-=0.5");
    tl.from(artRef, {duration:0.25, opacity:0, y:20, ease:"back.out"});
    tl.from(workRef, {duration:0.25, opacity:0, y:30, ease:"back.out"}, "-=0.125");
    tl.to(wholeRef, {overflow: "auto"});
  }, [tl]);


  return (
    <div className="flex" ref={element => {wholeRef = element}}>
      <SEO title="Home" />
      <Helmet>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond&family=Proza+Libre&display=swap" rel="stylesheet"/>
      </Helmet>
      <header>
        <h1 className="name" ref={element => {nameRef = element}}>Madhav Kumar</h1>
        <p className="body" ref={element => {descRef = element}}>
          I'm a web developer and generative artist.
        </p>
      </header>
      <div className="bottom-half" ref={element => {bottomRef = element}}>
        <ul className="list">
          <li className="work" ref={element => {workRef = element}}>
            <a>Work</a>
          </li>
          <li className="art" ref={element => {artRef = element}}>
            <Link to="/art">Art</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default IndexPage
