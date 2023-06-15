attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float timeFactor;

void main() {
	
	float s = aTextureCoord.s + timeFactor/100.0;
	float t = aTextureCoord.t + timeFactor/100.0;
	
	vTextureCoord = vec2(s,t);

    vec3 offset;
	offset = aVertexNormal* texture2D(uSampler2, vTextureCoord).b * 0.05;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}
