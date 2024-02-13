/*
 * @desc: logic for input controll
 */
import {CBN_Context} from "./context";

export const CBN_Controller = (() => {
	let _class = {};


    /* static public */
    _class.isInputDirty    	= true;


	/* static private */
	let _touchZoomDistEnd	= 0;
	let _touchZoomDistStart	= 0;
	let _mousePos 			= {
		x: 0,
		y: 0
	};
	let _lastMousePos 		= {
		x: 0,
		y: 0
	};
	let _isMouseDown		= false;
	let _htmlCanvas 		= null;


	/*
	 * @desc: initialize input
	 * @params:
	 * 		domElement htmlCanvas
	 */
    /* static public */
	_class.initialize = htmlCanvas => {
		// store html element
		_htmlCanvas = htmlCanvas;

		// add events
		htmlCanvas.addEventListener('mousedown', _onMouseDown, false);
		htmlCanvas.addEventListener('mousemove', _onMouseMove, false);
		htmlCanvas.addEventListener('touchstart', _onDocumentTouchStart, false);
		htmlCanvas.addEventListener('touchmove', _onDocumentTouchMove, false);
		htmlCanvas.addEventListener('mousewheel', _onScroll, false);
		window.addEventListener('mouseup', _onMouseUp, false);
		window.addEventListener('touchend', _onDocumentTouchEnd, false);
	};


	/*
	 * @desc: called on mouse button down
	 * @params:
	 * 		object event
	 */
    /* static private */
	function _onMouseDown( event )
	{
		event.preventDefault();
		// mark flag
		_isMouseDown = true;
		// update mouse position
		_lastMousePos.x = _mousePos.x;
		_lastMousePos.y = _mousePos.y;
		_mousePos.x = (event.clientX - _htmlCanvas.offsetLeft) / CBN_Context.width * 2 - 1;
		_mousePos.y = 1 - (event.clientY - _htmlCanvas.offsetTop) / CBN_Context.height * 2;
		// check clicked sensor
		for ( let i = 0; i < CBN_Context.silos.length; i++ ) {
			CBN_Context.silos[i].checkSensorSelect( _mousePos );
		}
		// mark flag
		_class.isInputDirty = true;
	}


	/*
	 * @desc: called on mouse button up
	 * @params:
	 * 		object event
	 */
    /* static private */
	function _onMouseUp( event )
	{
		// mark flag
		_isMouseDown = false;
	}


	/*
	 * @desc: called on mouse move
	 * @params:
	 * 		object event
	 */
    /* static private */
	function _onMouseMove( event )
	{
		event.preventDefault();
		// only if mouse down
		if ( _isMouseDown ) {
			// update mouse position
			_lastMousePos.x = _mousePos.x;
			_lastMousePos.y = _mousePos.y;
			_mousePos.x = (event.clientX - _htmlCanvas.offsetLeft) / CBN_Context.width * 2 - 1;
			_mousePos.y = 1 - (event.clientY - _htmlCanvas.offsetTop) / CBN_Context.height * 2;
			// update scene
			_class._applyRotation();
		}
	}


	/*
	 * @desc: called on touch start detected
	 * @params:
	 * 		object event
	 */
    /* static private */
	function _onDocumentTouchStart( event )
	{
		// if 1 finger, move
		if ( event.touches.length === 1 ) {
			event.preventDefault();
			// mark flag
			_isMouseDown = true;
			// update mouse position
			_lastMousePos.x = _mousePos.x;
			_lastMousePos.y = _mousePos.y;
			_mousePos.x = (event.touches[0].pageX - _htmlCanvas.offsetLeft) / CBN_Context.width * 2 - 1;
			_mousePos.y = 1 - (event.touches[0].pageY - _htmlCanvas.offsetTop) / CBN_Context.height * 2;
		}
		// if 2 fingers, zoom
		else if ( event.touches.length === 2 ) {
			// update zoom start
			let dx = event.touches[0].pageX - event.touches[1].pageX;
			let dy = event.touches[0].pageY - event.touches[1].pageY;
			_touchZoomDistEnd = _touchZoomDistStart = Math.sqrt(dx * dx + dy * dy);
		}
	}


	/*
	 * @desc: called on touch move detected
	 * @params:
	 * 		object event
	 */
    /* static private */
	function _onDocumentTouchMove( event )
	{
		// if 1 finger, move
		if ( event.touches.length === 1 ) {
			event.preventDefault();
			// only if mouse down
			if ( _isMouseDown ) {
				// update mouse position
				_lastMousePos.x = _mousePos.x;
				_lastMousePos.y = _mousePos.y;
				_mousePos.x = (event.touches[0].pageX - _htmlCanvas.offsetLeft) / CBN_Context.width * 2 - 1;
				_mousePos.y = 1 - (event.touches[0].pageY - _htmlCanvas.offsetTop) / CBN_Context.height * 2;
				// update scene
				_class._applyRotation();
			}
		}
		// if 2 fingers, zoom
		else if ( event.touches.length === 2 ) {
			// update position
			let dx = event.touches[0].pageX - event.touches[1].pageX;
			let dy = event.touches[0].pageY - event.touches[1].pageY;
			_touchZoomDistEnd = Math.sqrt(dx * dx + dy * dy);
			// calculate zoom
			let factor = _touchZoomDistEnd - _touchZoomDistStart;
			_touchZoomDistStart = _touchZoomDistEnd;
			// apply zoom
			_applyZoom( factor / 100.0 );
		}
	}


	/*
	 * @desc: called on touch end detected
	 * @params:
	 * 		object event
	 */
    /* static private */
	function _onDocumentTouchEnd( event )
	{
		// mark flag
		_isMouseDown = false;
		// update zoom position
		_touchZoomDistStart = _touchZoomDistEnd = 0;
	}


	/*
	 * @desc: called on mouse scroll
	 * @params:
	 * 		object event
	 */
    /* static private */
	function _onScroll( event )
	{
		event.preventDefault();
		// apply zoom
		let delta = (event.wheelDelta / 120) / 5.0;
		_applyZoom( delta );
	}


	/*
	 * @desc: zoom camera by given amount
	 * @params:
	 * 		float delta
	 */
    /* static private */
	function _applyZoom( delta )
	{
		// update silos
		for ( let i = 0; i < CBN_Context.silos.length; i++ ) {
			CBN_Context.silos[i].onInputUpdate( delta, null );
		}
		// mark flag
		_class.isInputDirty = true;
	}


	/*
	 * @desc: rotate silos based on input
	 */
    /* static private */
	_class._applyRotation= delta => {
		// calculate delta
		if(!delta){
			delta = { x: 0, y: 0 };
			delta.x = _mousePos.x - _lastMousePos.x;
			delta.y = _mousePos.y - _lastMousePos.y;
		}
		// update silos
		for ( let i = 0; i < CBN_Context.silos.length; i++ ) {
			CBN_Context.silos[i].onInputUpdate( null, delta );
		}
		// mark flag
		_class.isInputDirty = true;
	};


	// end of class
	return _class;

})();
