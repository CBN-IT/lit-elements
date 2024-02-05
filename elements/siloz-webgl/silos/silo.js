/*
 * @desc: base class for silo
 */
import {CBN_Resources} from "../resources";
import THREE from "../threejs/three"
import {CBN_ArrowGeom} from "./arrow_geom";
export const CBN_Silo = (() => {
	let _class = {};


	/*
	 * @desc: constructor
	 * @params:
	 * 		json setupData
	 */
	_class.new = setupData => {
		let _this = {};


		/* public */
		_this.enabled 		= true;
		_this.setupData 	= setupData;


		/* private */
		let _glScene 		= new THREE.Scene();
		let _glCamera		= null;
		_this._glSensors		= [];
		//let _glRaycaster 	= new THREE.Raycaster();
		let _holderAxisY	= new THREE.Object3D();
		let _holderAxisX	= new THREE.Object3D();


		/*
		 * @desc: called by constructor
		 */
		/* initialize */
		{
			// create camera
			_glCamera = new THREE.PerspectiveCamera( 50, 1, 0.1, 1000 );
			_glCamera.position.z = 7.5;/*how far*/
			_glCamera.position.x = 0;
			_glCamera.position.y = 3.5;/*how rotate*/
			_glCamera.lookAt( new THREE.Vector3(0, 1, 0) );
			// add camera into scene
			_glScene.add( _glCamera );

			// add axis to scene
			_holderAxisY.position.y = -2;
			_holderAxisX.add( _holderAxisY );
			_glScene.add( _holderAxisX );

			// create lights
			{
				let mainSun = new THREE.DirectionalLight( 0xffffff, 1 );
				mainSun.position.set(2, 3, 1);
				_glScene.add( mainSun );

				let dimSun = new THREE.DirectionalLight( 0xffffff, 0.4 );
				dimSun.position.set(-3, -1, 0);
				_glScene.add( dimSun );
			}

			// create compass
			_createCompass();
		}
		_this.refreshCompas= () => {
			let posY = 0;
			let rotY = 0;
			if ( _this.setupData.silo !== undefined ) {
				posY = _this.setupData.silo.height * CBN_Resources.MAGIC_NUMBER + 1.2;
				if ( _this.setupData.silo.angleNorth !== undefined ) {
					rotY = (_this.setupData.silo.angleNorth) * Math.PI / 180;
				}
			}
			let compass=_this.getHolderY().getObjectByName("Compass");
			//compass.position.y = posY;
			compass.rotation.y = rotY;
		};

		/*
		 * @desc: create compass geometry
		 */
		/* private */
		function _createCompass()
		{
			let posY = 0;
			let rotY = 0;
			if ( _this.setupData.silo !== undefined ) {
				posY = _this.setupData.silo.height * CBN_Resources.MAGIC_NUMBER + 1.2;
				if ( _this.setupData.silo.angleNorth !== undefined ) {
					rotY = (_this.setupData.silo.angleNorth) * Math.PI / 180;
				}
			}

			// create compass
			let compass = new THREE.Object3D();
			compass.name = "Compass";
			compass.position.y = posY;
			compass.rotation.y = rotY;
			// add to scene
			_holderAxisY.add( compass );


			// create arrow
			let geometry = new THREE.Geometry();
			for ( let i = 0; i < CBN_ArrowGeom.vertices.length; i++ ) {
				let vertex = CBN_ArrowGeom.vertices[i];
				geometry.vertices.push( new THREE.Vector3( vertex[0], vertex[1], vertex[2] ) );
			}
			for ( let i = 0; i < CBN_ArrowGeom.faces.length; i++ ) {
				let face = CBN_ArrowGeom.faces[i];
				geometry.faces.push( new THREE.Face3( face[0], face[1], face[2] ) );
			}
			geometry.computeFaceNormals();

			let arrow = new THREE.Mesh( geometry, CBN_Resources.materials.compassNormal );
			arrow.scale.x = 0.8;
			arrow.scale.y = 0.8;
			arrow.scale.z = 0.8;
			compass.add( arrow );


			// create letter N
			let leftLine = new THREE.Mesh( new THREE.BoxGeometry( 0.1, 0.5, 0.1 ), CBN_Resources.materials.compassNormal );
			leftLine.position.x = -0.15;
			leftLine.position.z = -1;
			compass.add( leftLine );

			let rightLine = new THREE.Mesh( new THREE.BoxGeometry( 0.1, 0.5, 0.1 ), CBN_Resources.materials.compassNormal );
			rightLine.position.x = 0.15;
			rightLine.position.z = -1;
			compass.add( rightLine );

			let middleLine = new THREE.Mesh( new THREE.BoxGeometry( 0.08, 0.5, 0.1 ), CBN_Resources.materials.compassNormal );
			middleLine.rotation.z = 40 * Math.PI / 180;
			middleLine.position.z = -1;
			compass.add( middleLine );
		}


		/*
		 * @desc: update silo based on input
		 * @params:
		 * 		float 	zoomDelta
		 * 		object 	mouseDelta
		 */
		/* public override */
		_this.onInputUpdate = (zoomDelta, mouseDelta) => {
		};


		/*
		 * @desc: refresh drawing for this silo
		 */
		/* public override */
		_this.refresh = () => {
		};


		/*
		 * @desc: draw the silo
		 * @params:
		 * 		object glRenderer
		 */
		/* public override */
		_this.render = glRenderer => {
			if ( _this.enabled ) {
				// render
				glRenderer.render( _glScene, _glCamera );
			}
		};


		/*
		 * @desc: update camera size and aspect
		 * @params:
		 * 		float width
		 * 		float height
		 */
		/* public */
		_this.onContextResize = (width, height) => {
			_glCamera.aspect = width / height;
			_glCamera.updateProjectionMatrix();
		};


		/*
		 * @desc: check if any sensor was clicked
		 * @params:
		 * 		object mousePos
		 */
		/* public */
		_this.checkSensorSelect = mousePos => {
			/*if ( _this.enabled ) {
				// do raycasting
				_glRaycaster.setFromCamera( mousePos, _this.getGLCamera() );
				let intersects = _glRaycaster.intersectObjects( _this._glSensors );
				// pick selected
				if ( intersects.length > 0 ) {
					// reset all
					for ( let i = 0; i < _this._glSensors.length; i++ ) {
						_this._glSensors[i].material.color.set( CBN_Resources.SENSOR_SETTINGS.defaultColor );
					}
					// select given sensor
					intersects[0].object.material.color.set( CBN_Resources.SENSOR_SETTINGS.selectColor );
					// apply selection
					//global_onSelectSensor( intersects[0].object.sensorID, intersects[0].object.wireID );
				}
			}*/
		};


		/*
		 * @desc: create single sensor wire geometry
		 * @params:
		 * 		float	x
		 * 		float	y
		 * 		string	wireID
		 * 		float	height
		 */
		/* public */
		_this.createSensorWire = (x, z, wireID, height) => {
			let geometry = new THREE.CylinderGeometry( 0.005, 0.005, height, 3 );
			let cylinder = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({ color: 0x999999 }) );
			cylinder.position.x = x;
			cylinder.position.z = z;
			cylinder.position.y = height / 2;
			cylinder.wireID 	= wireID;
			cylinder.name = "wire";
			_holderAxisY.add( cylinder );
		}


		/*
		 * @desc: create single sensor geometry
		 * @params:
		 * 		float	x
		 * 		float	y
		 * 		float	z
		 * 		string	sensorID
		 * 		string	wireID
		 * 		float	height
		 * @return: object
		 */
		/* public */
		_this.createSensor = (x, y, z, sensorID, wireID) => {
			// create sensor
			let geometry = new THREE.CircleGeometry( 0.09, 20 );
			geometry.scale(1.9, 1, 1);
			let material = new THREE.MeshBasicMaterial({ color: CBN_Resources.SENSOR_SETTINGS.defaultColor });
			let sensor = new THREE.Mesh( geometry, material );
			sensor.lookAt( _glCamera.position );
			
			// add sensor to scene
			let sensorAxisY = new THREE.Object3D();
			sensorAxisY.add( sensor );
			_holderAxisY.add( sensorAxisY );

			_this._glSensors.push( sensor );
			
			// set position
			sensorAxisY.position.x = x;
			sensorAxisY.position.y = y;
			sensorAxisY.position.z = z;
			// set data
			sensor.sensorID 	= sensorID;
			sensor.wireID 		= wireID;
			sensor.tempValue 	= 0.0;
			sensorAxisY.name = "sensor";
			// return axis
			return sensorAxisY;
			
		};

		_this.updateSensors = () => {
			let nr=0;
			let wires = _this.setupData.wires;
			for (let i = 0; i < wires.length; ++i) {
				let sensors = wires[i].sensors;
				for (let j = 0; j < sensors.length; ++j) {
					_this.updateSensor( nr++, nr, 0xffffff); // TODO: replace height with temp
				}
			}
		};

		_this.updateSensor = (sensorIndex, tempValue, color) => {
			let EPS_TEMP = 0.1;
			if (isNaN(tempValue) ||
				tempValue === undefined ||
				tempValue === null ||
				tempValue === "") {
				tempValue = "";
			}


			if ((tempValue === "" && _this._glSensors[sensorIndex].tempValue !== "") ||
				(tempValue !== "" && _this._glSensors[sensorIndex].tempValue === "") ||
				Math.abs(_this._glSensors[sensorIndex].tempValue - tempValue) > EPS_TEMP) {
				
				_this._glSensors[sensorIndex].material = new THREE.MeshBasicMaterial({color: color});
				_this._glSensors[sensorIndex].remove( _this._glSensors[sensorIndex].children[0] );


				// create text
				let textGroup = new THREE.Group();
				let text
				if (tempValue === "") {
					text = "";
				} else {
					text = tempValue.toFixed(CBN_Resources.TEXT_SETTINGS.decimals);
				}
				let textWidth = 0;

				for ( let i = 0; i < text.length; ++i )
				{
					textWidth += CBN_Resources.textSymbols[text[i]].width;
				}

				textGroup.position.x = - textWidth / 2;

				let widthSoFar = 0;

				for ( let i = 0; i < text.length; ++i )
				{
					let textMesh = new THREE.Mesh( CBN_Resources.textSymbols[text[i]].geom, new THREE.MeshBasicMaterial({color: CBN_Resources.TEXT_SETTINGS.color}));
					textMesh.position.z = 0.01;
					textMesh.position.x = widthSoFar;
					textMesh.position.y = - CBN_Resources.TEXT_SETTINGS.height;

					textGroup.add( textMesh );

					widthSoFar += CBN_Resources.textSymbols[text[i]].width;
				}

				_this._glSensors[sensorIndex].add( textGroup );


				// update temp
				_this._glSensors[sensorIndex].tempValue = tempValue;
				_this._glSensors[sensorIndex].color = color;
			}
		};


		/*
		 * @desc: access gl scene
		 * @return: object
		 */
		/* public */
		_this.getGLScene = () => _glScene;


		/*
		 * @desc: access gl camera
		 * @return: object
		 */
		/* public */
		_this.getGLCamera = () => _glCamera;


		/*
		 * @desc: access gl holder for x axis
		 * @return: object
		 */
		/* public */
		_this.getHolderX = () => _holderAxisX;


		/*
		 * @desc: access gl holder for y axis
		 * @return: object
		 */
		/* public */
		_this.getHolderY = () => _holderAxisY;


		// end of constructor
		return _this;
	};

	// end of class
	return _class;

})();
