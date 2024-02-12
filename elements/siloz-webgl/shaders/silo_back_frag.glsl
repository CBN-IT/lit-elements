uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;

#include <common>
#include <packing>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

uniform float yRotation;
uniform float seedHeight;
uniform float angleCutoff;

varying vec3 v_posLocal;


void main()
{
	#include <clipping_planes_fragment>

	vec3 posLocal = normalize( vec3(v_posLocal.x, 0, v_posLocal.z) );
	vec3 posWorld = vec3(0, 0, 0);
	float cosRot = cos(- yRotation);
	float sinRot = sin(- yRotation);
	posWorld.x = posLocal.x * cosRot - posLocal.z * sinRot;
	posWorld.z = posLocal.x * sinRot + posLocal.z * cosRot;
	posWorld = normalize( posWorld );
	float angle = dot( posWorld, vec3(0, 0, 1) );

	if ( angle > angleCutoff && v_posLocal.y > 0.01 ) {
		discard;
	}
	else {
		vec4 diffuseColor = vec4( diffuse, 1.0 );
		ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
		vec3 totalEmissiveRadiance = emissive;

		vec3 normal = normalize( vNormal );

		if ( v_posLocal.y <= seedHeight ) {
			#include <map_fragment>
			#include <normal_fragment>
		}

		#include <color_fragment>
		#include <specularmap_fragment>
		// accumulation
		#include <lights_phong_fragment>
		#include <lights_template>

		vec3 outgoingLight = reflectedLight.directDiffuse
							+ reflectedLight.indirectDiffuse
							+ reflectedLight.directSpecular
							+ reflectedLight.indirectSpecular
							+ totalEmissiveRadiance;

		if ( v_posLocal.y <= seedHeight ) {
			gl_FragColor = vec4( outgoingLight * 0.5, 1.0 );
		}
		else {
			gl_FragColor = vec4( outgoingLight, 1.0 );
		}
	}

	#include <encodings_fragment>
}
