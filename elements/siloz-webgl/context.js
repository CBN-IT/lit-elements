/*
 * @desc: logic for WebGL drawing area
 */
import {CBN_Controller} from "./controller";
import THREE from "./threejs/three"
import Stats from "./threejs/stats.min";

export const CBN_Context = (() => {
	let _class = {};


    /* static public */
    _class.width    = 1;
    _class.height   = 1;
	_class.silos	= [];


	/* static private */
	let _glRenderer = null;
	let _glStats 	= null;
	let _htmlCanvas = null;


	/*
	 * @desc: initialize renderer
	 * @params:
	 * 		domElement htmlCanvas
	 */
    /* static public */
	_class.initialize = htmlCanvas => {
		// store html element
		_htmlCanvas = htmlCanvas;

		// create renderer
		_glRenderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
		_glRenderer.setClearColor(0xffffff, 0);
		_htmlCanvas.appendChild( _glRenderer.domElement );

		// create stats
		_glStats = new Stats();
		// _htmlCanvas.appendChild( _glStats.dom );

		// start render loop
		_class.renderLoop();

		// add resize event
		window.addEventListener('resize', _class.resize, false);
	};


	/*
	 * @desc: called each frame to draw
	 */
    /* static public */
	_class.renderLoop = () => {
		// ask new frame
		requestAnimationFrame( _class.renderLoop );

		// draw only input changed
		if ( CBN_Controller.isInputDirty ) {
			// mark flag
			CBN_Controller.isInputDirty = false;
			// draw frame
			_class.renderFrame();
		}
		// update stats
		_glStats.update();
	};


	/*
	 * @desc: render the scene for this frame
	 */
    /* static public */
	_class.renderFrame = () => {
		// render each silo
		for (  let i = 0; i < _class.silos.length; i++ ) {
			_class.silos[i].render( _glRenderer );
		}
	};


	/*
	 * @desc: render the scene for this frame
	 */
    /* static public */
	_class.resize = () => {
		if(_htmlCanvas.clientWidth===0 || _htmlCanvas.clientHeight===0){
			return;
		}
		// update sizes
		_class.width = _htmlCanvas.clientWidth;
		_class.height = _htmlCanvas.clientHeight;
		_glRenderer.setSize( _class.width, _class.height );

		// update silos
		for ( let i = 0; i < _class.silos.length; i++ ) {
			_class.silos[i].onContextResize( _class.width, _class.height );
		}

		// mark flag
		CBN_Controller.isInputDirty = true;
	};


	// end of class
	return _class;

})();
