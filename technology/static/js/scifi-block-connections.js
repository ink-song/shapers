var material;

var Instances = {
	'01': {
		instancesNum: 200,
		blockScale: 1
	},
	'02': {
		instancesNum: 60,
		blockScale: 3
	},
	'03': {
		instancesNum: 400,
		blockScale: 0.3
	}
};

var PaintData = { 
	// Camera
	cameraSetting: {
		type: 'perspective',
		x: 0,
		y: 0,
		z: 100
	},
	// Colors
	paletteShuffle: true,
	palette: {
		'color-0': '#00050A',
		'color-1': '#ffffff',
		'color-2': '#ffffff',
		'color-3': '#ff0000',
	},

	// Scene Override
	sceneSetting: {
		type: USE_FIXED,
		background: 0x000020,
		// fog: new THREE.Fog( 0x000020, 400, 600 )
	},

	controls: {
		enabled: true
	},

	// Pattern
	pattern: {
	},

	rtt: {
		renderToTexture: true,
		rtt_size_w: 400,
		rtt_size_h: 400,
		rtt_source: USE_SHADER_FILE,
		rtt_source_file: 'shaping_01.glsl'
	},

	// PostEFX
	postEFX: {
		useEffects: true,
		effects: [
			{
				name: 'tiltShiftPass',
				params: {
					tiltFocus: 0.5,
					tiltAmount: 0.006,
					tiltBrightness: 0.65,
				}
			}
		]
	},

	// Controls
	options: {
		canColorShuffle: true,
	}
}


function buildResources() {
	// material
	material = new THREE.RawShaderMaterial( {
		uniforms: {
			time: { value: 0.0 },
			map: { value: rtTexture.texture },
			eye: { value: new THREE.Vector4(0, 0, -200, 1.0) },
			fogDist: { value: new THREE.Vector2(40, 160) },
			fogColor: { value: new THREE.Color(0x000020)}
		},
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		side: THREE.DoubleSide,
		// blending: THREE.AdditiveBlending
	} );

	// connection lines --------------- --------------- ---------------
	line_mat = new THREE.LineDashedMaterial( { 
		color : new THREE.Color( '#04235E' ),
		opacity: 1,
		transparent: true,
		blending: THREE['AdditiveBlending']
	} );
}

function buildObjects() {
	var instancesNum = Instances[instance].instancesNum;

	var geometry = new THREE.InstancedBufferGeometry();

	var scale = Instances[instance].blockScale;

	var vertexBuffer = new THREE.InterleavedBuffer( new Float32Array( [
		// Front
		- 1*scale, 1*scale, 1*scale, 0, 0, 0, 0, 0,
		1*scale, 1*scale, 1*scale, 0, 1, 0, 0, 0,
		- 1*scale, - 1*scale, 1*scale, 0, 0, 1, 0, 0,
		1*scale, - 1*scale, 1*scale, 0, 1, 1, 0, 0,
		// Back
		1*scale, 1*scale, - 1*scale, 0, 1, 0, 0, 0,
		- 1*scale, 1*scale, - 1*scale, 0, 0, 0, 0, 0,
		1*scale, - 1*scale, - 1*scale, 0, 1, 1, 0, 0,
		- 1*scale, - 1*scale, - 1*scale, 0, 0, 1, 0, 0,
		// Left
		- 1*scale, 1*scale, - 1*scale, 0, 1, 1, 0, 0,
		- 1*scale, 1*scale, 1*scale, 0, 1, 0, 0, 0,
		- 1*scale, - 1*scale, - 1*scale, 0, 0, 1, 0, 0,
		- 1*scale, - 1*scale, 1*scale, 0, 0, 0, 0, 0,
		// Right
		1*scale, 1*scale, 1*scale, 0, 1, 0, 0, 0,
		1*scale, 1*scale, - 1*scale, 0, 1, 1, 0, 0,
		1*scale, - 1*scale, 1*scale, 0, 0, 0, 0, 0,
		1*scale, - 1*scale, - 1*scale, 0, 0, 1, 0, 0,
		// Top
		- 1*scale, 1*scale, 1*scale, 0, 0, 0, 0, 0,
		1*scale, 1*scale, 1*scale, 0, 1, 0, 0, 0,
		- 1*scale, 1*scale, - 1*scale, 0, 0, 1, 0, 0,
		1*scale, 1*scale, - 1*scale, 0, 1, 1, 0, 0,
		// Bottom
		1*scale, - 1*scale, 1*scale, 0, 1, 0, 0, 0,
		- 1*scale, - 1*scale, 1*scale, 0, 0, 0, 0, 0,
		1*scale, - 1*scale, - 1*scale, 0, 1, 1, 0, 0,
		- 1*scale, - 1*scale, - 1*scale, 0, 0, 1, 0, 0
	] ), 8 );

	var positions = new THREE.InterleavedBufferAttribute( vertexBuffer, 3, 0 );
	geometry.addAttribute( 'position', positions );

	var uvs = new THREE.InterleavedBufferAttribute( vertexBuffer, 2, 4 );
	geometry.addAttribute( 'uv', uvs );

	var indices = new Uint16Array( [
		0, 1, 2,
		2, 1, 3,
		4, 5, 6,
		6, 5, 7,
		8, 9, 10,
		10, 9, 11,
		12, 13, 14,
		14, 13, 15,
		16, 17, 18,
		18, 17, 19,
		20, 21, 22,
		22, 21, 23
	] );

	geometry.setIndex( new THREE.BufferAttribute( indices, 1 ) );

	// per instance data
	instanceBuffer = new THREE.InstancedInterleavedBuffer( new Float32Array( instancesNum * 8 ), 8, 1 ).setDynamic( true );
	var offsets = new THREE.InterleavedBufferAttribute( instanceBuffer, 3, 0 );

	var points = [];

	var vector = new THREE.Vector4();
	for ( var i = 0, ul = offsets.count; i < ul; i ++ ) {

		var x = Math.random() * 200 - 100;
		var y = Math.random() * 100 - 50;
		var z = Math.random() * 100 - 50;
		vector.set( x, y, z, 0 ).normalize();
		// move out at least 5 units from center in current direction
		// offsets.setXYZ( i, x + vector.x * 5, y + vector.y * 5, z + vector.z * 5 );
		offsets.setXYZ( i, x , y , z  );

		points.push( new THREE.Vector3( x, y, z) );
	}

	geometry.addAttribute( 'offset', offsets ); // per mesh translation



	var mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );



	// connection lines
	for( var i=0; i<60; ++i ) {
		var source = points[i];

		for( var j=0; j<60; ++j ) {
			var dest = points[j];

			if( source.distanceTo(dest)<40 && i!=j ) {
				var line_geo = new THREE.BufferGeometry().setFromPoints([ source, dest ]);
				var line = new THREE.Line( line_geo, line_mat );
				scene.add( line );
			}
		}
	}



	// 
	var spriteMaterial = new THREE.SpriteMaterial( { map: rtTexture.texture } );
	shader_sprite = new THREE.Sprite( spriteMaterial );
	shader_sprite.scale.set( 20, 20, 1 );
	shader_sprite.position.set( 0, 0, 0 );
	// scene.add( shader_sprite );

}

function reset() {
 	deleteObjects();
 	buildObjects();
}

function updateColors () {
	matRTT.uniforms.u_color_0.value.set( PaintData.palette['color-0'] );
	matRTT.uniforms.u_color_1.value.set( PaintData.palette['color-1'] );
	matRTT.uniforms.u_color_2.value.set( PaintData.palette['color-2'] );
	matRTT.uniforms.u_color_3.value.set( PaintData.palette['color-3'] );
	matRTT.needsUpdate = true;
}

function deleteObjects() {
	for( var i = scene.children.length - 1; i >= 0; i--) { 
		scene.remove( scene.children[i] );
	}
}

function animateObjects() {
	material.uniforms.time.value = frame;
}

var vertexShader = `
	precision highp float;

	uniform mat4 modelViewMatrix;
	uniform mat4 projectionMatrix;
	uniform vec4 eye;
	uniform float time;

	attribute vec3 position;
	attribute vec3 offset;
	attribute vec2 uv;
	attribute vec4 orientation;

	varying vec2 vUv;
	varying float vDist;
	varying float vSerial;

	// http://www.geeks3d.com/20141201/how-to-rotate-a-vertex-by-a-quaternion-in-glsl/

	vec3 applyQuaternionToVector( vec4 q, vec3 v ){

		return v + 2.0 * cross( q.xyz, cross( q.xyz, v ) + q.w * v );

	}

	void main() {

		vec3 vPosition = applyQuaternionToVector( orientation, position );

		vUv = uv;

		// vSerial = abs( atan(offset.y, offset.x) + sin(time*3.)  ) ;
		// vDist = distance( modelViewMatrix * vec4( position, 1.0 ), eye );

		gl_Position = projectionMatrix * modelViewMatrix * vec4( offset + position, 1.0 );
		vDist = gl_Position.w; 
		vSerial = ( clamp( 1000. * sin( time/50. + gl_Position.x/200. ), 300.0, 1000.0) - 300.0 ) / 700.;
	}
`;

var fragmentShader = `
	precision highp float;

	uniform sampler2D map;
	uniform vec2 fogDist;
	uniform vec3 fogColor;

	varying vec2 vUv;
	varying float vDist;
	varying float vSerial;

	void main() {
		vec4 textureColor = texture2D(map, vUv);
		vec4 offsetColor = vec4( textureColor.r, textureColor.g + vSerial/2., textureColor.b + vSerial, textureColor.a);

		float fogFactor = clamp( (fogDist.y - vDist)/(fogDist.y - fogDist.x) , 0.0, 1.0);

		vec3 finalColor = mix(fogColor, offsetColor.rgb, fogFactor);

		gl_FragColor = vec4( finalColor.rgb, 1.0 );
	}
`;