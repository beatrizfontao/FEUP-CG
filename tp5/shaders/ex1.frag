#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec4 normal;

void main() {
	if (coords.y > 0.5)
		gl_FragColor =  vec4(0.898,0.898,0,1.0); //yellow
	else
	{
		gl_FragColor = vec4(0.541,0.541,0.898,1.0); //blue
	}
}