import React from 'react'
import P5Wrapper from 'react-p5-wrapper'
import p5 from 'p5'
import Layout from '../components/layout'
import fontPath from "../static/proza-libre-latin-500.woff"
const Contact = () => {
	let text = "ART";
	return (<Layout title="Contact"><P5Wrapper sketch={sketch} text={text}/></Layout>)
}

function sketch (p) {
    let font;
	let textString;
	let textSize = 175;
	let floatingPoints = [];
	let points, bounds;

	p.preload = function() {
		font = p.loadFont(fontPath);
	}

	p.myCustomRedrwaAccordingToNewPropsHandler = function (props) {
		if (props.text) {
			textString = props.text;
		}
	}

	p.setup = function() {

		p.createCanvas(600,400);

		let N = 500;
		for(let i = 0; i < N; i++) {
			let newPoint = makePoint();	
			floatingPoints.push(newPoint);
		}
	}
	
	p.draw = function () {
		p.background(255);
		p.textSize(textSize);
		p.textAlign(p.CENTER);
		if(textString) {
		
			for(let i = 0; i < floatingPoints.length; i++) {
				let pointsLen = points.length;
				let curTarget = points[i%pointsLen];
				let curPoint = floatingPoints[i];
				if(!curPoint.target) {
					curPoint.target = p.createVector(curTarget.x-bounds.w/2, curTarget.y+bounds.h/2);
				}
				else if(curPoint.arrived) {
					curTarget = points[(i+curPoint.counter)%pointsLen];
					curPoint.target = p.createVector(curTarget.x-bounds.w/2, curTarget.y+bounds.h/2);
					let distance = p5.Vector.sub(curPoint.pos, curPoint.target).mag();
					if(distance >= 50) {
						curPoint.pos = curPoint.target;
						curPoint.trail = [];
					}
					curPoint.counter += Math.round(p.random(2,6));
					curPoint.arrived = false;
				}
			}
		}

		for(let point of floatingPoints) {
			p.noFill();
			p.beginShape();
			for(let v of point.trail) {
				p.vertex(v.x, v.y);
			}
			p.endShape();
			point.update();
		}

	}
	
	p.keyPressed = function() {
		if (p.keyCode === p.ENTER) {
			reset();
			textString = "ART";
			points = font.textToPoints(textString, 300, 200, textSize, {sampleFactor:0.15});
			bounds = font.textBounds(textString, 300, 200, textSize);
		}
		if (p.keyCode === 32) {
			reset();
			textString = "WORK";
			points = font.textToPoints(textString, 300, 200, textSize, {sampleFactor:0.15});
			bounds = font.textBounds(textString, 300, 200, textSize);
		}
		if(p.key === 'r') {
			reset();
			textString = "";
		}
	}
	
	function makePoint() {
		let newPoint = {x:0, y:0, r:0}
		newPoint.pos = p.createVector(p.random(0, p.width), p.random(0, p.height));
		newPoint.r = p.random(4, 6);
		newPoint.vel = p.createVector(p.random(-1, 1), p.random(-1, 1));
		newPoint.acceleration = p.createVector();
		newPoint.maxSpeed = p.random(15, 30);
		newPoint.target = null;
		newPoint.arrived = false;
		newPoint.counter = 1;
		newPoint.trail = [newPoint.pos];
		newPoint.update = () => {
			newPoint.seek();
			newPoint.pos = p5.Vector.add(newPoint.pos, newPoint.vel);
			newPoint.vel = p5.Vector.add(newPoint.vel, newPoint.acceleration);
			newPoint.acceleration.mult(0);
			if(newPoint.pos.x > p.width || newPoint.pos.x < 0) {
				newPoint.vel.x *=-1;
			}
			if(newPoint.pos.y > p.height || newPoint.pos.y < 0) {
				newPoint.vel.y *=-1;
			}

			if(newPoint.trail.length > 20) {
				newPoint.trail.shift()
			}
			newPoint.trail.push(newPoint.pos.copy());
		}

		newPoint.seek = () => {
			if(newPoint.target) {
				let desiredVel = p5.Vector.sub(newPoint.target, newPoint.pos);
				let d = desiredVel.mag();
				let speed = newPoint.maxSpeed;
				if( d < 250 ) {
					speed = p.map(d, 0, 250, 0, newPoint.maxSpeed);
				}
				if(d <= 0.1) {
					newPoint.arrived = true;
				}

				desiredVel.setMag(speed);
				let steering = p5.Vector.sub(desiredVel, newPoint.vel);
				steering.limit(0.5);
				newPoint.acceleration.add(steering);
			}
		}

		return newPoint;
	}

	function reset() {
		for(let point of floatingPoints) {
				point.target = null;
			}
	}

	function drawArrow(base, vec, color) {
		p.push();
		p.stroke(color);
		p.fill(color);
		p.translate(base.x, base.y);
		p.line(0,0, vec.x*20, vec.y*20);
		p.rotate(vec.heading());
		p.pop();
	}
}

export default Contact;
