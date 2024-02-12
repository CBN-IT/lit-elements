/*
 * @desc: logic for silo with cylinder shape
 */
import {CBN_Silo} from "./silo";
import {CBN_Resources} from "../resources";
import {CBN_CircleSeed} from "../seed/circle_seed";
import THREE from "../threejs/three"
import {CBN_TowerSiloGeom} from "./tower_silo_geom";

export const CBN_TowerSilo = (() => {
	let _class = {};


	/*
	 * @desc: constructor
	 * @params:
	 * 		json setupData
	 */
	_class.new = setupData => {
		let _this = CBN_Silo.new( setupData );
		_this.getGLCamera().lookAt( new THREE.Vector3(0, 0.5, 0) );

		/* private */
		let _sensorsAxisY	= [];
		let _siloScaling 	= new THREE.Vector3(
			setupData.silo.radius * 2 * CBN_Resources.MAGIC_NUMBER,
			setupData.silo.height * CBN_Resources.MAGIC_NUMBER,
			setupData.silo.radius * 2 * CBN_Resources.MAGIC_NUMBER
		);


		/*
		 * @desc: called by constructor
		 */
		/* initialize */
		{
			_createSeed();
			_createSilo();
			_createSensors();
			_createExtra();
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
				if ( zoomDelta != null ) {
					let cameraDir = new THREE.Vector3(0, 0, -1);
					cameraDir.applyQuaternion( _this.getGLCamera().quaternion );
					_this.getGLCamera().position.x += cameraDir.x * zoomDelta;
					_this.getGLCamera().position.y += cameraDir.y * zoomDelta;
					_this.getGLCamera().position.z += cameraDir.z * zoomDelta;
				}

				// apply silo rotation
				if ( mouseDelta != null ) {
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
					CBN_Resources.materials.siloTowerFront.uniforms.yRotation.value = _this.getHolderY().rotation.y;
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
				_createSeed();
			}
		};
		_this.recreateSensors= () => {
			if ( _this.enabled ) {
				_this._glSensors=[];
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
				CBN_Resources.materials.siloBack.uniforms.offsetRepeat.value 	= new THREE.Vector4( 0, 0, 4, 4 );
				CBN_Resources.materials.siloTowerFront.uniforms.yRotation.value = _this.getHolderY().rotation.y;
				CBN_Resources.materials.seed.uniforms.yRotation.value 			= _this.getHolderY().rotation.y;

				// remove top when camera is above (2nd child)
				_this.getHolderY().getObjectByName("HideOnTop").visible = ( _this.getHolderX().rotation.x < 0.5 );
				if ( _this.getHolderX().rotation.x < 0.5 ) {
					let arrow = _this.getHolderY().getObjectByName("Compass");
					for ( let i = 0; i < arrow.children.length; ++i ) {
						arrow.children[i].material = CBN_Resources.materials.compassNormal;
					}
				} else {
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
				for ( let i = 0; i < CBN_TowerSiloGeom.body.vertices.length; i++ ) {
					let vertex = CBN_TowerSiloGeom.body.vertices[i];
					geometry.vertices.push( new THREE.Vector3( vertex[0], vertex[1], vertex[2] ) );
				}
				for ( let i = 0; i < CBN_TowerSiloGeom.body.faces.length; i++ ) {
					let face = CBN_TowerSiloGeom.body.faces[i];
					geometry.faces.push( new THREE.Face3( face[0], face[1], face[2] ) );
				}
				for ( let i = 0; i < CBN_TowerSiloGeom.body.uvs.length; i++ ) {
					let uvs = CBN_TowerSiloGeom.body.uvs[i];
					geometry.faceVertexUvs[0].push([
						new THREE.Vector2( uvs[0][0], uvs[0][1] ),
						new THREE.Vector2( uvs[1][0], uvs[1][1] ),
						new THREE.Vector2( uvs[2][0], uvs[2][1] )
					]);
				}
				geometry.computeFaceNormals();
				geometry.computeVertexNormals();
				geometry.uvsNeedUpdate = true;

				// create mesh
				let meshFront = new THREE.Mesh( geometry, CBN_Resources.materials.siloTowerFront );
				meshFront.scale.copy( _siloScaling );
				_this.getHolderY().add( meshFront );
				let meshBack = new THREE.Mesh( geometry, CBN_Resources.materials.siloBack );
				meshBack.scale.copy( _siloScaling );
				_this.getHolderY().add( meshBack );
			}

			// create silo roof
			{
				let geometry = new THREE.Geometry();
				for ( let i = 0; i < CBN_TowerSiloGeom.roof.vertices.length; i++ ) {
					let vertex = CBN_TowerSiloGeom.roof.vertices[i];
					geometry.vertices.push( new THREE.Vector3( vertex[0], vertex[1], vertex[2] ) );
				}
				for ( let i = 0; i < CBN_TowerSiloGeom.roof.faces.length; i++ ) {
					let face = CBN_TowerSiloGeom.roof.faces[i];
					geometry.faces.push( new THREE.Face3( face[0], face[1], face[2] ) );
				}
				for ( let i = 0; i < CBN_TowerSiloGeom.roof.uvs.length; i++ ) {
					let uvs = CBN_TowerSiloGeom.roof.uvs[i];
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
				_this.meshFront = new THREE.Mesh( geometry, CBN_Resources.materials.siloTowerFront );
				_this.meshFront.scale.copy( _siloScaling );
				roofHolder.add( _this.meshFront );
				_this.meshBack = new THREE.Mesh( geometry, CBN_Resources.materials.siloBack );
				_this.meshBack.scale.copy( _siloScaling );
				roofHolder.add( _this.meshBack );
			}
		}


		/*
		 * @desc: create sensor geometry
		 */
		/* private */
		function _createSensors()
		{
			if ( _this.setupData.wires !== undefined ) {
				let radius 		= _this.setupData.silo.radius;
				let wires 		= _this.setupData.wires;
				let geomRadius 	= CBN_TowerSiloGeom.radius * _siloScaling.x;
				let geomHeight 	= CBN_TowerSiloGeom.height * _siloScaling.y;

				while (_this.getHolderY().getObjectByName("wire") !== undefined) {
					_this.getHolderY().remove(_this.getHolderY().getObjectByName("wire"));
				}
				while (_this.getHolderY().getObjectByName("sensor") !== undefined) {
					_this.getHolderY().remove(_this.getHolderY().getObjectByName("sensor"));
				}

				let maxHeight = 0;
				if (_this.setupData.maxSensorHeight > 0) {
					maxHeight = _this.setupData.maxSensorHeight;
					
				} else {
					for (let i = 0; i < wires.length; ++i) {
						let sensors = wires[i].sensors;
						for (let j = 0; j < sensors.length; ++j) {
							if (maxHeight < sensors[j].height) {
								maxHeight = sensors[j].height;
							}
						}
					}
				}
				console.log({maxHeight})
				// create wires
				for (let i = 0; i < wires.length; ++i) {
					// create wire
					let x = geomRadius * wires[i].x / radius;
					let z = geomRadius * wires[i].y / radius;
					_this.createSensorWire( x, z, wires[i].id, geomHeight );
					// create sensors per wire
					let sensors = wires[i].sensors;
					for (let j = 0; j < sensors.length; ++j) {
						let y = geomHeight * sensors[j].height / maxHeight;
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
				let seedMesh = CBN_CircleSeed.generateMesh( _this.setupData.seed, CBN_TowerSiloGeom.radius );
				seedMesh.scale.x = _siloScaling.x;
				seedMesh.scale.z = _siloScaling.z;
				seedMesh.name="wheat";
				_this.getHolderY().add( seedMesh );
				
			}
		}


		/*
		 * @desc: create other geometry
		 */
		/* private */
		function _createExtra()
		{

			let posY = 0;
			if ( _this.setupData.silo !== undefined ) {
				posY = _this.setupData.silo.height * CBN_Resources.MAGIC_NUMBER + 0.5;
			}
			
			// create band
			let bandMaterial = new THREE.MeshPhongMaterial( {color: 0xddffff} );
			let bandLength = 2.5;
			let bandWidth = 0.6;

			let band = new THREE.Object3D();
			band.position.y = posY;
			band.position.x = -1.7;
			_this.getHolderY().getObjectByName("HideOnTop").add( band );

			// add pillars
			{
				let pillars = new THREE.Object3D();
				band.add( pillars );

				let pillarLeft = new THREE.Mesh( new THREE.CylinderGeometry( 0.03, 0.03, 0.5, 8 ), bandMaterial );
				pillarLeft.position.x = bandLength / 2.6 - bandLength / 2;
				pillarLeft.position.y = -0.25;
				pillarLeft.position.z = bandWidth / 2-0.03;
				pillars.add( pillarLeft );

				let pillarRight = new THREE.Mesh( new THREE.CylinderGeometry( 0.03, 0.03, 0.5, 8 ), bandMaterial );
				pillarRight.position.x = bandLength / 2.6 - bandLength / 2;
				pillarRight.position.y = -0.25;
				pillarRight.position.z = - bandWidth / 2+0.03;
				pillars.add( pillarRight );

				let pillarLeft2 = new THREE.Mesh( new THREE.CylinderGeometry( 0.03, 0.026, 0.2, 8 ), bandMaterial );
				pillarLeft2.position.x = 2 * bandLength / 2.6 - bandLength / 2;
				pillarLeft2.position.y = -0.13;
				pillarLeft2.position.z = bandWidth / 2-0.03;
				pillars.add( pillarLeft2 );

				let pillarRight2 = new THREE.Mesh( new THREE.CylinderGeometry( 0.03, 0.026, 0.2, 8 ), bandMaterial );
				pillarRight2.position.x = 2 * bandLength / 2.6 - bandLength / 2;
				pillarRight2.position.y = -0.13;
				pillarRight2.position.z = - bandWidth / 2+0.03;
				pillars.add( pillarRight2 );
			}

			// add support
			{
				let support = new THREE.Mesh( new THREE.BoxGeometry( bandLength, 0.07, bandWidth ), bandMaterial );
				support.scale.y = 0.7;
				band.add( support );

				// add vertical protection bars
				let pillarsPerSide = 5;
				for ( let i = 0; i < pillarsPerSide; i++ ) {
					let pillarLeft = new THREE.Mesh( new THREE.CylinderGeometry( 0.01, 0.01, 0.5, 8 ), bandMaterial );
					pillarLeft.position.x = i * bandLength / (pillarsPerSide - 1) - bandLength / 2;
					pillarLeft.position.y = 0.25;
					pillarLeft.position.z = bandWidth / 2;
					support.add( pillarLeft );

					let pillarRight = new THREE.Mesh( new THREE.CylinderGeometry( 0.01, 0.01, 0.5, 8 ), bandMaterial );
					pillarRight.position.x = i * bandLength / (pillarsPerSide - 1) - bandLength / 2;
					pillarRight.position.y = 0.25;
					pillarRight.position.z = - bandWidth / 2;
					support.add( pillarRight );
				}

				// add horizontal protection bars
				let sideLeft = new THREE.Mesh( new THREE.CylinderGeometry( 0.01, 0.01, bandLength, 8 ), bandMaterial );
				sideLeft.position.y = 0.5;
				sideLeft.position.z = bandWidth / 2;
				sideLeft.rotation.z = 90 * Math.PI / 180;
				support.add( sideLeft );

				let sideLeft2 = new THREE.Mesh( new THREE.CylinderGeometry( 0.01, 0.01, bandLength, 8 ), bandMaterial );
				sideLeft2.position.y = 0.25;
				sideLeft2.position.z = bandWidth / 2;
				sideLeft2.rotation.z = 90 * Math.PI / 180;
				support.add( sideLeft2 );

				let sideRight = new THREE.Mesh( new THREE.CylinderGeometry( 0.01, 0.01, bandLength, 8 ), bandMaterial );
				sideRight.position.y = 0.5;
				sideRight.position.z = - bandWidth / 2;
				sideRight.rotation.z = 90 * Math.PI / 180;
				support.add( sideRight );

				let sideRight2 = new THREE.Mesh( new THREE.CylinderGeometry( 0.01, 0.01, bandLength, 8 ), bandMaterial );
				sideRight2.position.y = 0.25;
				sideRight2.position.z = - bandWidth / 2;
				sideRight2.rotation.z = 90 * Math.PI / 180;
				support.add( sideRight2 );
			}
		}


		// end of constructor
		return _this;
	};

	// end of class
	return _class;

})();
