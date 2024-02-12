/*
 * @desc: generates rectangle seed mesh
 */
import {CBN_Resources} from "../resources";
import THREE from "../threejs/three"

export const CBN_RectSeed = (() => {
	let _class = {};


	/* static private */
	let NUM_SEGMENTS_X = 20;
	let NUM_SEGMENTS_Z = 10;


	/*
	 * @desc: generates rectangle seed mesh
	 * @params:
	 * 		json 	seedData
	 * 		float	sizeX
	 * 		float	sizeZ
	 */
	/* static public */
	_class.generateMesh = (seedData, sizeX, sizeZ) => {
		let diff = (seedData.middleHeight - seedData.edgeHeight) * CBN_Resources.MAGIC_NUMBER;

		// create geometry
		let geom = new THREE.Geometry();
		geom.faceVertexUvs[0] = [];

		// add vertices
		for (let ix = 0; ix <= NUM_SEGMENTS_X; ix++) {
			for (let iz = 0; iz <= NUM_SEGMENTS_Z; iz++) {
				let x = sizeX * ix / NUM_SEGMENTS_X - sizeX / 2;
				let z = sizeZ * iz / NUM_SEGMENTS_Z - sizeZ / 2;
				let y = seedData.edgeHeight * CBN_Resources.MAGIC_NUMBER + diff * (Math.random() / 2 + 0.5);
				if (ix === 0 || ix === NUM_SEGMENTS_X || iz === 0 || iz === NUM_SEGMENTS_Z) {
					y = seedData.edgeHeight * CBN_Resources.MAGIC_NUMBER;
				}
				geom.vertices.push(new THREE.Vector3(x, y, z));
			}
		}

		// add faces and uvs
		for (let ix = 0; ix < NUM_SEGMENTS_X; ix++) {
			for (let iz = 0; iz < NUM_SEGMENTS_Z; iz++) {
				let i1 = ix * (NUM_SEGMENTS_Z + 1) + iz;
				let i2 = i1 + 1;
				let i3 = i1 + (NUM_SEGMENTS_Z + 1);
				let i4 = i3 + 1;
				geom.faces.push(new THREE.Face3(i1, i4, i3));
				geom.faces.push(new THREE.Face3(i1, i2, i4));

				let u1 = ix / NUM_SEGMENTS_X;
				let u2 = (ix + 1) / NUM_SEGMENTS_X;
				let v1 = iz / NUM_SEGMENTS_Z;
				let v2 = (iz + 1) / NUM_SEGMENTS_Z
				geom.faceVertexUvs[0].push([
					new THREE.Vector2(u1, v1),
					new THREE.Vector2(u2, v2),
					new THREE.Vector2(u2, v1)
				]);
				geom.faceVertexUvs[0].push([
					new THREE.Vector2(u1, v1),
					new THREE.Vector2(u1, v2),
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
