#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying float height; 



uniform sampler2D uSampler;
uniform sampler2D uSamplerAltimetry;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 colorAltimetry = texture2D(uSamplerAltimetry, vec2(0, 1.0-height));
	
	gl_FragColor = 0.7*color + 0.3*colorAltimetry;
}