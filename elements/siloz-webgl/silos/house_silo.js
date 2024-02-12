/*
 * @desc: logic for silo with house shape
 */
import {CBN_Silo} from "./silo";
import {CBN_Resources} from "../resources";
import {CBN_RectSeed} from "../seed/rect_seed";
import THREE from "../threejs/three"
import {CBN_HouseSiloGeom} from "./house_silo_geom";
import {CBN_TowerSiloGeom} from "./tower_silo_geom";

export const CBN_HouseSilo = (() => {
	let _class = {};


	/*
	 * @desc: constructor
	 * @params:
	 * 		json setupData
	 */
	_class.new = setupData => {
		let _this = CBN_Silo.new( setupData );
		_this.getGLCamera().lookAt( new THREE.Vector3(0, -1, 0) );

		/* private */
		let _sensorsAxisY	= [];
		let _siloScaling 	= new THREE.Vector3(
			setupData.silo.length * CBN_Resources.MAGIC_NUMBER,
			setupData.silo.height * CBN_Resources.MAGIC_NUMBER,
			setupData.silo.width * CBN_Resources.MAGIC_NUMBER
		);


		/*
		 * @desc: called by constructor
		 */
		/* initialize */
		{
			_createSeed();
			_createSilo();
			_createSensors();
		}


		/*
		 * @desc: update silo based on input
		 * @params:
		 * 		float 	zoomDelta
		 * 		object 	mouseDelta
		 */
		/* public override */
		_this.onInputUpdate = (zoomDelta, mouseDelta) => {
			if ( _this.enabled ) {
				// apply zoom on camera
				if ( zoomDelta !== null ) {
					let cameraDir = new THREE.Vector3(0, 0, -1);
					cameraDir.applyQuaternion( _this.getGLCamera().quaternion );
					_this.getGLCamera().position.x += cameraDir.x * zoomDelta;
					_this.getGLCamera().position.y += cameraDir.y * zoomDelta;
					_this.getGLCamera().position.z += cameraDir.z * zoomDelta;
				}

				// apply silo rotation
				if ( mouseDelta !== null ) {
					// rotate left-right
					_this.getHolderY().rotation.y += (mouseDelta.x * CBN_Resources.CONTROL_SETTINGS.horizontalRotSpeed);

					// rotate up-down
					_this.getHolderX().rotation.x += (-mouseDelta.y * CBN_Resources.CONTROL_SETTINGS.verticalRotSpeed);
					if (_this.getHolderX().rotation.x > CBN_Resources.CONTROL_SETTINGS.upLimit) {
						_this.getHolderX().rotation.x = CBN_Resources.CONTROL_SETTINGS.upLimit;
					}
					if (_this.getHolderX().rotation.x < CBN_Resources.CONTROL_SETTINGS.downLimit) {
						_this.getHolderX().rotation.x = CBN_Resources.CONTROL_SETTINGS.downLimit;
					}

					// update shaders to cut front side
					CBN_Resources.materials.siloBack.uniforms.yRotation.value 		= _this.getHolderY().rotation.y;
					CBN_Resources.materials.siloHouseFront.uniforms.yRotation.value = _this.getHolderY().rotation.y;
					CBN_Resources.materials.seed.uniforms.yRotation.value 			= _this.getHolderY().rotation.y;

					// remove top when camera is above (2nd child)
					_this.getHolderY().getObjectByName("HideOnTop").visible = ( _this.getHolderX().rotation.x < 0.5 );
					// make arrow transparent
					if ( _this.getHolderX().rotation.x < 0.5 ) {
						let arrow = _this.getHolderY().getObjectByName("Compass");
						for ( let i = 0; i < arrow.children.length; ++i ) {
							arrow.children[i].material = CBN_Resources.materials.compassNormal;
						}
					}
					else {
						let arrow = _this.getHolderY().getObjectByName("Compass");
						for ( let i = 0; i < arrow.children.length; ++i ) {
							arrow.children[i].material = CBN_Resources.materials.compassTrans;
						}
					}

					// keep bilboard
					for (let i = 0; i < _sensorsAxisY.length; ++i) {
						_sensorsAxisY[i].children[0].rotation.x = -_this.getHolderX().rotation.x;
						_sensorsAxisY[i].rotation.y = -_this.getHolderY().rotation.y;
					}
				}
			}
		};
		
		_this.refreshSeed= () => {
			if ( _this.enabled ) {
				_createSeed()
			}
		};
		_this.recreateSensors= () => {
			if ( _this.enabled ) {
				_createSensors();
			}
		};

		/*
		 * @desc: refresh drawing for this silo
		 */
		/* public override */
		_this.refresh = () => {
			if ( _this.enabled ) {
				// update shaders to cut front side
				CBN_Resources.materials.siloBack.uniforms.yRotation.value 		= _this.getHolderY().rotation.y;
				CBN_Resources.materials.siloBack.uniforms.offsetRepeat.value 	= new THREE.Vector4( 0, 0, 8, 6 );
				CBN_Resources.materials.siloHouseFront.uniforms.yRotation.value = _this.getHolderY().rotation.y;
				CBN_Resources.materials.seed.uniforms.yRotation.value 			= _this.getHolderY().rotation.y;

				// remove top when camera is above (2nd child)
				_this.getHolderY().getObjectByName("HideOnTop").visible = ( _this.getHolderX().rotation.x < 0.5 );
				// make arrow transparent
				if ( _this.getHolderX().rotation.x < 0.5 ) {
					let arrow = _this.getHolderY().getObjectByName("Compass");
					for ( let i = 0; i < arrow.children.length; ++i ) {
						arrow.children[i].material = CBN_Resources.materials.compassNormal;
					}
				}
				else {
					let arrow = _this.getHolderY().getObjectByName("Compass");
					for ( let i = 0; i < arrow.children.length; ++i ) {
						arrow.children[i].material = CBN_Resources.materials.compassTrans;
					}
				}

				// update silo material
				CBN_Resources.materials.siloBack.uniforms.seedHeight.value = _this.setupData.seed.edgeHeight * CBN_Resources.MAGIC_NUMBER / _siloScaling.y;
			}
		};


		/*
		 * @desc: create silo geometry
		 */
		/* private */
		function _createSilo()
		{
			// create silo body
			{
				let geometry = new THREE.Geometry();
				for ( let i = 0; i < CBN_HouseSiloGeom.body.vertices.length; i++ ) {
					let vertex = CBN_HouseSiloGeom.body.vertices[i];
					geometry.vertices.push( new THREE.Vector3( vertex[0], vertex[1], vertex[2] ) );
				}
				for ( let i = 0; i < CBN_HouseSiloGeom.body.faces.length; i++ ) {
					let face = CBN_HouseSiloGeom.body.faces[i];
					geometry.faces.push( new THREE.Face3( face[0], face[1], face[2] ) );
				}
				for ( let i = 0; i < CBN_HouseSiloGeom.body.uvs.length; i++ ) {
					let uvs = CBN_HouseSiloGeom.body.uvs[i];
					geometry.faceVertexUvs[0].push([
						new THREE.Vector2( uvs[0][0], uvs[0][1] ),
						new THREE.Vector2( uvs[1][0], uvs[1][1] ),
						new THREE.Vector2( uvs[2][0], uvs[2][1] )
					]);
				}
				geometry.computeFaceNormals();
				geometry.uvsNeedUpdate = true;

				// create mesh
				let meshFront = new THREE.Mesh( geometry, CBN_Resources.materials.siloHouseFront );
				meshFront.scale.copy( _siloScaling );
				_this.getHolderY().add( meshFront );
				let meshBack = new THREE.Mesh( geometry, CBN_Resources.materials.siloBack );
				meshBack.scale.copy( _siloScaling );
				_this.getHolderY().add( meshBack );
			}

			// create silo roof
			{
				let geometry = new THREE.Geometry();
				for ( let i = 0; i < CBN_HouseSiloGeom.roof.vertices.length; i++ ) {
					let vertex = CBN_HouseSiloGeom.roof.vertices[i];
					geometry.vertices.push( new THREE.Vector3( vertex[0], vertex[1], vertex[2] ) );
				}
				for ( let i = 0; i < CBN_HouseSiloGeom.roof.faces.length; i++ ) {
					let face = CBN_HouseSiloGeom.roof.faces[i];
					geometry.faces.push( new THREE.Face3( face[0], face[1], face[2] ) );
				}
				for ( let i = 0; i < CBN_HouseSiloGeom.roof.uvs.length; i++ ) {
					let uvs = CBN_HouseSiloGeom.roof.uvs[i];
					geometry.faceVertexUvs[0].push([
						new THREE.Vector2( uvs[0][0], uvs[0][1] ),
						new THREE.Vector2( uvs[1][0], uvs[1][1] ),
						new THREE.Vector2( uvs[2][0], uvs[2][1] )
					]);
				}
				geometry.computeFaceNormals();
				geometry.uvsNeedUpdate = true;

				// prepare roof holder
				let roofHolder = new THREE.Object3D();
				roofHolder.name = "HideOnTop";
				_this.getHolderY().add( roofHolder );

				// create mesh
				let meshFront = new THREE.Mesh( geometry, CBN_Resources.materials.siloHouseFront );
				meshFront.scale.copy( _siloScaling );
				roofHolder.add( meshFront );
				let meshBack = new THREE.Mesh( geometry, CBN_Resources.materials.siloBack );
				meshBack.scale.copy( _siloScaling );
				roofHolder.add( meshBack );
			}
		}


		/*
		 * @desc: create sensor geometry
		 */
		/* private */
		function _createSensors()
		{
			if ( _this.setupData.wires !== undefined ) {
				let wires 		= _this.setupData.wires;
				let geomHeight 	= CBN_TowerSiloGeom.height * _siloScaling.y;
				while (_this.getHolderY().getObjectByName("wire") !== undefined) {
					_this.getHolderY().remove(_this.getHolderY().getObjectByName("wire"));
				}
				while (_this.getHolderY().getObjectByName("sensor") !== undefined) {
					_this.getHolderY().remove(_this.getHolderY().getObjectByName("sensor"));
				}
				// create wires
				for (let i = 0; i < wires.length; ++i) {
					// create wire
					let x = wires[i].x * CBN_Resources.MAGIC_NUMBER;
					let z = wires[i].y * CBN_Resources.MAGIC_NUMBER;
					_this.createSensorWire( x, z, wires[i].id, geomHeight );
					// create sensors per wire
					let sensors = wires[i].sensors;
					for (let j = 0; j < sensors.length; ++j) {
						let y = geomHeight * sensors[j].height / _this.setupData.maxSensorHeight;
						_sensorsAxisY.push( _this.createSensor( x, y, z, sensors[j].id, wires[i].id ) );
					}
				}
			}
		}


		/*
		 * @desc: create seed geometry
		 */
		/* private */
		function _createSeed()
		{
			if ( _this.setupData.seed !== undefined ) {
				// create mesh
				if (_this.getHolderY().getObjectByName("wheat") !== undefined) {
					_this.getHolderY().remove(_this.getHolderY().getObjectByName("wheat"));
				}
				let seedMesh = CBN_RectSeed.generateMesh( _this.setupData.seed,	CBN_HouseSiloGeom.length, CBN_HouseSiloGeom.width );
				seedMesh.scale.x = _siloScaling.x;
				seedMesh.scale.z = _siloScaling.z;
				seedMesh.name="wheat";
				_this.getHolderY().add( seedMesh );
			}
		}


		// end of constructor
		return _this;
	};

	// end of class
	return _class;

})();
