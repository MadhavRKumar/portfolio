import React, { useRef, useEffect} from "react"
import gsap from "gsap"
import { Link } from "gatsby"
import Layout from "../components/layout"

const IndexPage = () => {
  let wholeRef = useRef(null), nameRef = useRef(null), descRef = useRef(null), bottomRef = useRef(null), workRef = useRef(null), artRef = useRef(null), contactRef = useRef(null);
  const tl = gsap.timeline();

  useEffect(() => {
    tl.to(wholeRef, {visibility: "visible"});
    tl.from(nameRef, { duration: 0.5, y:-10, ease: "back.inOut", opacity: 0});
    tl.from(descRef, {duration: 0.25, opacity:0, y: -5, ease: "power2.in" }, "-=0.25");
    tl.from(bottomRef, {duration:0.5, opacity:0, y:200, ease: "power1.in"}, "-=0.5");
    tl.from(artRef, {duration:0.25, opacity:0, y:20, ease:"back.out"}, "-=0.15");
    tl.from(workRef, {duration:0.25, opacity:0, y:30, ease:"back.out"}, "-=0.15");
    tl.from(contactRef, {duration:0.25, opacity:0, y:35, ease:"back.out"}, "-=0.15");
    tl.to(wholeRef, {overflowY: "auto"});
  }, [tl]);


  return (
	<Layout title="Home">
    <div className="flex" ref={element => {wholeRef = element}}> 
		<header>
        <h1 className="name" ref={element => {nameRef = element}}>Madhav Kumar</h1>
        <p className="body" ref={element => {descRef = element}}>
          WEB DEVELOPER AND GENERATIVE ARTIST
        </p>
      </header>
      <div className="bottom-half" ref={element => {bottomRef = element}}>
        <ul className="list">
	  <li className="contact" ref={element => {contactRef = element}}>
	    <Link to="/contact">Contact</Link>
	  </li>
          <li className="work" ref={element => {workRef = element}}>
            <Link to="/work">Work</Link>
          </li>
          <li className="art" ref={element => {artRef = element}}>
            <Link to="/art">Art</Link>
          </li> 
        </ul>
      </div>
    </div>
	</Layout>
  )
}
export default IndexPage
