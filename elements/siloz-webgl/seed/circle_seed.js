/*
 * @desc: generates circle seed mesh
 */
import {CBN_Resources} from "../resources";
import THREE from "../threejs/three"

export const CBN_CircleSeed = (() => {
	let _class = {};


	/* static private */
	let NUM_SEGMENTS = 2;
	let NUM_EDGES = 18;


	/*
	 * @desc: generates circle seed mesh
	 * @params:
	 * 		json 	seedData
	 * 		float	siloRadius
	 */
	/* static public */
	_class.generateMesh = (seedData, siloRadius) => {
		let angle = 2 * Math.PI / NUM_EDGES;
		let segRadius = siloRadius / NUM_SEGMENTS;
		let diff = (seedData.middleHeight - seedData.edgeHeight) * CBN_Resources.MAGIC_NUMBER;

		// create geometry
		let geom = new THREE.Geometry();
		geom.faceVertexUvs[0] = [];

		// add vertex center
		let yMid = seedData.middleHeight * CBN_Resources.MAGIC_NUMBER;
		geom.vertices.push(new THREE.Vector3(0, yMid, 0));

		// create middle faces
		for (let i = 0; i < NUM_EDGES; i++) {
			let i2 = (i + 1) % NUM_EDGES;

			// add vertex
			let x = segRadius * Math.cos(angle * i);
			let z = segRadius * Math.sin(angle * i);
			let y = seedData.edgeHeight * CBN_Resources.MAGIC_NUMBER + diff * (Math.random() / 5 + 0.4);
			geom.vertices.push(new THREE.Vector3(x, y, z));

			// add face
			geom.faces.push(new THREE.Face3(0, 1 + i2, 1 + i));

			// add uv
			let uvRadius = 0.5 / NUM_SEGMENTS;
			let u1 = 0.5 + uvRadius * Math.cos(angle * i);
			let v1 = 0.5 + uvRadius * Math.sin(angle * i);
			let u2 = 0.5 + uvRadius * Math.cos(angle * i2);
			let v2 = 0.5 + uvRadius * Math.sin(angle * i2);
			geom.faceVertexUvs[0].push([
				new THREE.Vector2(0.5, 0.5),
				new THREE.Vector2(u2, v2),
				new THREE.Vector2(u1, v1)
			]);
		}

		// add the remaining faces
		for (let seg = 1; seg < NUM_SEGMENTS; seg++) {
			let start = 1 + seg * NUM_EDGES;

			for (let i = 0; i < NUM_EDGES; i++) {
				let i2 = (i + 1) % NUM_EDGES;

				// add vertex
				let x = segRadius * (seg + 1) * Math.cos(angle * i);
				let z = segRadius * (seg + 1) * Math.sin(angle * i);
				let y = seedData.edgeHeight * CBN_Resources.MAGIC_NUMBER + diff * Math.random() * 0.8;
				if (seg === NUM_SEGMENTS - 1) {
					y = seedData.edgeHeight * CBN_Resources.MAGIC_NUMBER;
				}
				geom.vertices.push(new THREE.Vector3(x, y, z));

				// add face
				geom.faces.push(new THREE.Face3(start + i, start + i - NUM_EDGES, start + i2));
				geom.faces.push(new THREE.Face3(start + i - NUM_EDGES, start + i2 - NUM_EDGES, start + i2));

				// add uv
				let uvRadius = 0.5 * (seg + 1) / NUM_SEGMENTS;
				let u1 = 0.5 + uvRadius * Math.cos(angle * i);
				let v1 = 0.5 + uvRadius * Math.sin(angle * i);
				let u2 = 0.5 + uvRadius * Math.cos(angle * i2);
				let v2 = 0.5 + uvRadius * Math.sin(angle * i2);
				let uvRadius2 = 0.5 * seg / NUM_SEGMENTS;
				let u3 = 0.5 + uvRadius2 * Math.cos(angle * i);
				let v3 = 0.5 + uvRadius2 * Math.sin(angle * i);
				let u4 = 0.5 + uvRadius2 * Math.cos(angle * i2);
				let v4 = 0.5 + uvRadius2 * Math.sin(angle * i2);
				geom.faceVertexUvs[0].push([
					new THREE.Vector2(u1, v1),
					new THREE.Vector2(u3, v3),
					new THREE.Vector2(u2, v2)
				]);
				geom.faceVertexUvs[0].push([
					new THREE.Vector2(u3, v3),
					new THREE.Vector2(u4, v4),
					new THREE.Vector2(u2, v2)
				]);
			}
		}

		geom.uvsNeedUpdate = true;
		geom.computeVertexNormals();
		geom.computeFaceNormals();

		// create mesh
		return new THREE.Mesh(geom, CBN_Resources.materials.seed);
	};


	// end of class
	return _class;

})();
