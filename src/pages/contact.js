import React, { useState } from 'react'
import P5Wrapper from 'react-p5-wrapper'
import p5 from 'p5'
import Layout from '../components/layout'
import Form from '../components/form'
import fontPath from '../static/proza-libre-latin-500.woff'

const Contact = () => {
	const [text, setText] = useState("");

	return (
		<Layout title="Contact">
		<div class="horizontal-flex">
		<Form onChange={setText}/>	
		<P5Wrapper sketch={sketch} text={text}/>
		</div>
		</Layout>)
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

	p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
		if (props.text) {
			textString = props.text;
			reset();
			generateText(textString, 100);
		}
	}

	p.setup = function() {

		p.createCanvas(300,300);

		let N = 300;
		for(let i = 0; i < N; i++) {
			let newPoint = makePoint();	
			floatingPoints.push(newPoint);
		}
	}
	
	p.draw = function () {
		p.background(255, 15);
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
					if(distance >= 25) {
						curPoint.pos = curPoint.target;
						curPoint.trail = [];
					}
					curPoint.counter += Math.round(p.random(1,3));
					curPoint.arrived = false;
				}
			}
		}

		for(let point of floatingPoints) {
			p.strokeWeight(point.r);
			p.noFill();
			p.beginShape();
			for(let i = 0; i < point.trail.length; i++) {
				let cur = point.trail[i];
				p.vertex(cur.x, cur.y);
			}	
			p.endShape();
			point.update();
		}

	}
	
	p.keyPressed = function() {
		if (p.keyCode === p.ENTER) {
			reset();
			textString = "ART";
			generateText(textString, 125);
		}
		if (p.keyCode === 32) {
			reset();
			textString = "WORK";
			generateText(textString, 80);
		}
		if (p.key === 'a') {
			reset();
			textString = "?";
			generateText(textString, 300);

		}
		if(p.key === 'r') {
			reset();
			textString = "";
		}
	}

	function generateText(str, size) {
		points = font.textToPoints(str, p.width/2, p.height/2, size, {sampleFactor:0.15});
		bounds = font.textBounds(str, p.width/2, p.height/2, size);
	}
	
	function makePoint() {
		let newPoint = {x:0, y:0, r:0}
		newPoint.pos = p.createVector(p.random(0, p.width), p.random(0, p.height));
		newPoint.r = p.random(0.2, 0.75);
		newPoint.vel = p.createVector(p.random(0, Math.PI*2), p.random(0, Math.PI*2));
		newPoint.acceleration = p.createVector();
		newPoint.maxSpeed = p.random(30, 100);
		newPoint.target = null;
		newPoint.arrived = false;
		newPoint.counter = 1;
		newPoint.trail = [newPoint.pos];
		newPoint.update = () => {
			newPoint.wander();
			newPoint.seek();
			newPoint.pos = p5.Vector.add(newPoint.pos, newPoint.vel);
			newPoint.vel = p5.Vector.add(newPoint.vel, newPoint.acceleration);
			newPoint.vel.limit(2);
			newPoint.acceleration.mult(0);
			if(newPoint.pos.x > p.width || newPoint.pos.x < 0) {
				newPoint.vel.x *=-1;
			}
			if(newPoint.pos.y > p.height || newPoint.pos.y < 0) {
				newPoint.vel.y *=-1;
			}

			if(newPoint.trail.length > 10) {
				newPoint.trail.shift()
			}
			newPoint.trail.push(newPoint.pos.copy());
		}

		newPoint.steerLimit = p.random(0.3, 0.5);

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
				steering.limit(newPoint.steerLimit);
				newPoint.acceleration.add(steering);
			}
		}

		newPoint.wanderAngle = p.random(0, Math.PI*2);

		newPoint.wander = () => {
			if(!newPoint.target) {
			let circleCenter = newPoint.vel.copy();
			circleCenter.normalize();
			circleCenter.mult(5);
			
			let displacement = p5.Vector.fromAngle(newPoint.wanderAngle);
			displacement.mult(1);

			newPoint.wanderAngle += (p.random(-Math.PI/2, Math.PI/2));
			
			circleCenter.add(displacement);
			newPoint.acceleration.add(circleCenter);
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