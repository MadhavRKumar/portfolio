import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const WaveMaterial = shaderMaterial(
	{
		bgColor: new THREE.Color(),
		waveColor: new THREE.Color(),
		time: 0.0,
		seed: 0.0,
	},
	// vertex shader
	`
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);
		}
	`,
	// frag shader
	`
		varying vec2 vUv;
		uniform vec3 bgColor;
		uniform vec3 waveColor;
		uniform float time;
		uniform float seed;

		float rand (float x) {
			return fract(sin(x * seed*10.)*
				43758.5453123);
		}

		float rand (in vec2 st) {
			return fract(sin(dot(st.xy,
								 vec2(seed*12.18,seed*60.45)))
						 * 43758.5453123);
		}
		

		float noise (float x) {
			float i = floor(x);
			float f = fract(x);
			float y = mix(rand(i), rand(i + 1.0), smoothstep(0.,1.,f));

			return y;
		}

		// 2D Noise based on Morgan McGuire @morgan3d
		// https://www.shadertoy.com/view/4dS3Wd
		float noise (in vec2 st) {
			vec2 i = floor(st);
			vec2 f = fract(st);

			// Four corners in 2D of a tile
			float a = rand(i);
			float b = rand(i + vec2(1.0, 0.0));
			float c = rand(i + vec2(0.0, 1.0));
			float d = rand(i + vec2(1.0, 1.0));

			// Smooth Interpolation

			// Cubic Hermine Curve.  Same as SmoothStep()
			vec2 u = f*f*(3.0-2.0*f);
			// u = smoothstep(0.,1.,f);

			// Mix 4 coorners percentages
			return mix(a, b, u.x) +
					(c - a)* u.y * (1.0 - u.x) +
					(d - b) * u.x * u.y;
		}

		void main() {
			// Properties
			const int octaves = 5;
			float lacunarity = 2.0;
			float gain = 0.3;
			//
			// Initial values
			float amplitude = 0.5;
			float frequency = 2.1;
			float y = -0.1;
			//
			// Loop of octaves
			for (int i = 0; i < octaves; i++) {
				y += amplitude * abs(noise(frequency*vUv.x*2.+1.2*time));
				frequency *= lacunarity;
				amplitude *= gain;
			}

			vec2 pos = vec2(vUv*6.);
			pos.x += (time/2.);
			pos.y -= (time*1.);

			float grain =rand(vUv+time/2.)/40.;

			float n = smoothstep(0.6, 0.75+grain, vUv.y + noise(pos) );
			
			float col = smoothstep(0.35, 0.5+grain, (y + vUv.y) );
	
			gl_FragColor = vec4(mix(waveColor, bgColor, col*n), 1.0);
		}
	`
);

extend({ WaveMaterial });

export default WaveMaterial;
