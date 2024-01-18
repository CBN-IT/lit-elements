/*
 * @desc: logic for managing resources
 */

import THREE from "./threejs/three"
import seedImg from "./images/seed3.png"
import helvetikerRegular from 	"./fonts/helvetiker_regular.typeface.json"
import helvetikerBold from 	"./fonts/helvetiker_bold.typeface.json"
import silozuri from "./data/silozuri.json"
import siloFrontVert from "./shaders/silo_front_vert.glsl"
import siloTowerFrontFrag from "./shaders/silo_tower_front_frag.glsl"
import siloHouseFrontFrag from  "./shaders/silo_house_front_frag.glsl"
import siloBlackVert from "./shaders/silo_back_vert.glsl"
import siloBlackFrag from  "./shaders/silo_back_frag.glsl"
import seedVert from "./shaders/seed_vert.glsl"
import seedFrag from  "./shaders/seed_frag.glsl"
export const CBN_Resources = (() => {
	let _class = {};


	/* static public */
	_class.MAGIC_NUMBER = 1.1 / 58;
	_class.TEXT_SETTINGS = {
		fontSize: 			0.08,
		height: 			0.05,
		widthOffset:		0.01,
		color: 				0xffffff,
		decimals: 			2
	};
	_class.SENSOR_SETTINGS = {
		maxHeight: 			70,
		defaultColor: 		0xffffff,
		selectColor: 		0xffffff
	};
	_class.CONTROL_SETTINGS = {
		horizontalRotSpeed:	4,
		verticalRotSpeed: 	1,
		upLimit: 			60 * Math.PI / 180,
		downLimit: 			-27 * Math.PI / 180
	};
	_class.materials = {
		siloTowerFront:		null,
		siloHouseFront:		null,
		siloBack: 			null,
		seed: 				null,
		compassNormal:		null,
		compassTrans:		null
	};
	_class.textures = {
		seedColor:			seedImg,
		seedNormal: 		null
	};
	_class.shaders = {
		siloFrontVert:		siloFrontVert,
		siloTowerFrontFrag: siloTowerFrontFrag,
		siloHouseFrontFrag: siloHouseFrontFrag,
		siloBackVert: 		siloBlackVert,
		siloBackFrag: 		siloBlackFrag,
		seedVert: 			seedVert,
		seedFrag: 			seedFrag
	};
	_class.fonts = {
		helvetikerRegular:	helvetikerRegular,
		helvetikerBold: 	helvetikerBold
	};
	_class.models = {
		silo:				null
	};
	_class.jsons = {
		siloData:			silozuri
	};
	_class.textSymbols = {
		// object example
		example: {
			geom: null,
			width: 0
		}
	};


	/* static private */
	_class.TEXTURE_URLS = {
		seedColor: 			"elements/siloz-webgl/images/seed3.png"
	};
	_class.SHADER_URLS = {
		siloFrontVert: 		"elements/siloz-webgl/shaders/silo_front_vert.glsl",
		siloTowerFrontFrag: "elements/siloz-webgl/shaders/silo_tower_front_frag.glsl",
		siloHouseFrontFrag: "elements/siloz-webgl/shaders/silo_house_front_frag.glsl",
		siloBackVert: 		"elements/siloz-webgl/shaders/silo_back_vert.glsl",
		siloBackFrag: 		"elements/siloz-webgl/shaders/silo_back_frag.glsl",
		seedVert: 			"elements/siloz-webgl/shaders/seed_vert.glsl",
		seedFrag: 			"elements/siloz-webgl/shaders/seed_frag.glsl"
	};
	_class.FONT_URLS = {
		helvetikerRegular: 	"elements/siloz-webgl/fonts/helvetiker_regular.typeface.json",
		helvetikerBold: 	"elements/siloz-webgl/fonts/helvetiker_bold.typeface.json"
	};
	_class.JSON_URLS = {
		siloData: 			"elements/siloz-webgl/data/silozuri.json"
	};
	let TEXT_SYMBOLS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'N','a','-'];


	/*
	 * @desc: load all resources
	 * @params:
	 * 		function onDoneFunc
	 */
	 /* static public */
	_class.loadAll = onDoneFunc => {
		let leftToLoad = 0;

		// load shaders
		for ( let key in _class.SHADER_URLS ) {
			// needs closure for key
			(key => {
				leftToLoad++;
				let client = new XMLHttpRequest();
				client.addEventListener("load", data => {
					_class.shaders[key] = data.target.response;
					// callback
					leftToLoad--;
					if ( leftToLoad === 0 ) {
						onDoneFunc();
					}
				});
				client.open( 'GET', _class.SHADER_URLS[key] );
				client.send();
			})( key );
		}

		// load fonts
		for ( let key in _class.FONT_URLS ) {
			// needs closure for key
			(key => {
				leftToLoad++;
				let loader = new THREE.FontLoader();
				loader.load( _class.FONT_URLS[key], font => {
					_class.fonts[key] = font;
					// callback
					leftToLoad--;
					if ( leftToLoad === 0 ) {
						onDoneFunc();
					}
				});
			})( key );
		}

		// load server data
		for ( let key in _class.JSON_URLS ) {
			// needs closure for key
			(key => {
				leftToLoad++;
				let client = new XMLHttpRequest();
				client.addEventListener("load", data => {
					_class.jsons[key] = JSON.parse( data.target.response );
					// callback
					leftToLoad--;
					if ( leftToLoad === 0 ) {
						onDoneFunc();
					}
				});
				client.open( 'GET', _class.JSON_URLS[key] );
				client.send();
			})( key );
		}

		// load wheat texture
		for ( let key in _class.TEXTURE_URLS ) {
			// needs closure for key
			(key => {
				leftToLoad++;
				_class.textures[key] = new THREE.TextureLoader().load( _class.TEXTURE_URLS[key], () => {
					_class.textures[key].wrapS = THREE.RepeatWrapping;
					_class.textures[key].wrapT = THREE.RepeatWrapping;
					// callback
					leftToLoad--;
					if ( leftToLoad === 0 ) {
						onDoneFunc();
					}
				});
			})( key );
		}
	};


	/*
	 * @desc: initialize gl materials
	 */
	 /* static public */
	_class.createMaterials = () => {
		if(_class.materials.siloTowerFront===null){
			_class.materials.siloTowerFront = new THREE.ShaderMaterial({
				uniforms: THREE.UniformsUtils.merge([
					THREE.UniformsLib['common'],
					THREE.UniformsLib['lights'],
					{
						"diffuse": {type: "c", value: new THREE.Color(0xddffff)},
						"emissive": {type: "c", value: new THREE.Color(0x000000)},
						"specular": {type: "c", value: new THREE.Color(0x111111)},
						"shininess": {type: "1f", value: 30},
						"yRotation": {type: "1f", value: 0},
						"angleCutoff": {type: "1f", value: 0.65}
					}
				]),
				vertexShader: 	_class.shaders.siloFrontVert,
				fragmentShader: _class.shaders.siloTowerFrontFrag,
				lights: 		true,
				side: 			THREE.FrontSide
			});
		}


		if(_class.materials.siloHouseFront===null) {
			_class.materials.siloHouseFront = new THREE.ShaderMaterial({
				uniforms: THREE.UniformsUtils.merge([
					THREE.UniformsLib['common'],
					THREE.UniformsLib['lights'],
					{
						"diffuse": {type: "c", value: new THREE.Color(0xddffff)},
						"emissive": {type: "c", value: new THREE.Color(0x000000)},
						"specular": {type: "c", value: new THREE.Color(0x111111)},
						"shininess": {type: "1f", value: 30},
						"yRotation": {type: "1f", value: 0},
						"angleCutoff": {type: "1f", value: 0.65}
					}
				]),
				vertexShader: _class.shaders.siloFrontVert,
				fragmentShader: _class.shaders.siloHouseFrontFrag,
				lights: true,
				side: THREE.FrontSide,
				depthTest: false,
				transparent: true
			});
		}
			if(_class.materials.siloBack===null) {
				_class.materials.siloBack = new THREE.ShaderMaterial({
					uniforms: THREE.UniformsUtils.merge([
						THREE.UniformsLib['common'],
						THREE.UniformsLib['lights'],
						{
							"diffuse": {type: "c", value: new THREE.Color(0xddffff)},
							"emissive": {type: "c", value: new THREE.Color(0x000000)},
							"specular": {type: "c", value: new THREE.Color(0x111111)},
							"shininess": {type: "1f", value: 30},
							"yRotation": {type: "1f", value: 0},
							"seedHeight": {type: "1f", value: 0},
							"offsetRepeat": {type: "v4", value: new THREE.Vector4(0, 0, 0, 0)},
							"angleCutoff": {type: "1f", value: 0.65}
						}
					]),
					vertexShader: _class.shaders.siloBackVert,
					fragmentShader: _class.shaders.siloBackFrag,
					lights: true,
					side: THREE.BackSide
				});
				_class.materials.siloBack.map 						= _class.textures.seedColor;
				_class.materials.siloBack.uniforms.map.value 		= _class.textures.seedColor;
			}


		if(_class.materials.seed===null) {
			_class.materials.seed = new THREE.ShaderMaterial({
				uniforms: THREE.UniformsUtils.merge([
					THREE.UniformsLib['common'],
					THREE.UniformsLib['lights'],
					{
						"diffuse": {type: "c", value: new THREE.Color(0xffffff)},
						"emissive": {type: "c", value: new THREE.Color(0x000000)},
						"specular": {type: "c", value: new THREE.Color(0x111111)},
						"shininess": {type: "1f", value: 30},
						"opacity": {type: "1f", value: 0.8},
						"yRotation": {type: "1f", value: 0},
						"offsetRepeat": {type: "v4", value: new THREE.Vector4(0, 0, 16, 16)},
						"angleCutoff": {type: "1f", value: 0.65}
					}
				]),
				vertexShader: _class.shaders.seedVert,
				fragmentShader: _class.shaders.seedFrag,
				lights: true,
				side: THREE.DoubleSide,
				transparent: true
			});
			_class.materials.seed.map = _class.textures.seedColor;
			_class.materials.seed.uniforms.map.value = _class.textures.seedColor;
		}
		if(_class.materials.compassNormal === null) {
			_class.materials.compassNormal = new THREE.MeshPhongMaterial({
				color: 0x00ff00,
				transparent: true
			});
		}
		if(_class.materials.compassTrans === null) {
			_class.materials.compassTrans = new THREE.MeshPhongMaterial({
				color: 0x00ff00,
				transparent: true,
				opacity: 0.3
			});
		}
	};


	/*
	 * @desc: store text symbol geometry for each letter
	 */
	 /* static public */
	_class.cacheTextSymbols = () => {
		for ( let i = 0; i < TEXT_SYMBOLS.length; ++i )	{
			if(_class.textSymbols[ TEXT_SYMBOLS[i] ]!==undefined){
				continue;
			}
			let geometry = new THREE.TextGeometry( TEXT_SYMBOLS[i],	{
				font: 			_class.fonts.helvetikerBold,
				size: 			_class.TEXT_SETTINGS.fontSize,
				height: 		0,
				curveSegments: 	12,
				weight: 		"bold"
			});
			geometry.computeBoundingBox();

			_class.textSymbols[ TEXT_SYMBOLS[i] ] = {
				geom: geometry,
				width: geometry.boundingBox.max.x - geometry.boundingBox.min.x + _class.TEXT_SETTINGS.widthOffset
			};
		}
	};


	// end of class
	return _class;

})();
