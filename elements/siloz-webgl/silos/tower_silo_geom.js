/*
 * @desc: geometry for tower silo
 */
export const CBN_TowerSiloGeom = (() => {
	// format
	let _this = {
		radius:	1,
		height: 1,
		roof: {
			vertices: 	[],
			faces: 		[],
			uvs:		[]
		},
		body: {
			vertices: 	[],
			faces: 		[],
			uvs:		[]
		}
	};
	let NUM_EDGES_BODY 	= 36;
	let NUM_EDGES_ROOF 	= 24;


	// create body
	{
		let angle = 2 * Math.PI / NUM_EDGES_BODY;

		// add center
		_this.body.vertices.push( [0, 0, 0] );

		// add edges
		for ( let i = 0; i < NUM_EDGES_BODY; i++ ) {
			// vertices
			let x = _this.radius * Math.cos(angle * i);
			let z = _this.radius * Math.sin(angle * i);
			_this.body.vertices.push( [x, 0, z] );
			// faces
			_this.body.faces.push( [0, 1 + i, 1 + (i + 1) % NUM_EDGES_BODY] );
			// uvs
			_this.body.uvs.push([
				[0.5, 0.5],
				[0.5 + Math.cos(angle * i), 0.5 + Math.sin(angle * i)],
				[0.5 + Math.cos(angle * (i + 1)), 0.5 + Math.sin(angle * (i + 1))]
			]);
		}

		// add walls
		for ( let i = 0; i < NUM_EDGES_BODY; i++ ) {
			let i2 = (i + 1) % NUM_EDGES_BODY;

			// vertices
			let x = _this.radius * Math.cos(angle * i);
			let z = _this.radius * Math.sin(angle * i);
			_this.body.vertices.push( [x, _this.height, z] );

			// faces
			_this.body.faces.push( [(1 + i), (1 + NUM_EDGES_BODY + i), (1 + i2)] );
			_this.body.faces.push( [(1 + i2), (1 + NUM_EDGES_BODY + i), (1 + NUM_EDGES_BODY + i2)] );

			// uvs
			let u1 = i / NUM_EDGES_BODY;
			let u2 = i2 / NUM_EDGES_BODY;
			u2 = (u2 > 0) ? u2 : 1;
			_this.body.uvs.push([
				[u1, 0],
				[u1, 2],
				[u2, 0]
			]);
			_this.body.uvs.push([
				[u2, 0],
				[u1, 2],
				[u2, 2]
			]);
		}
	}

	// create roof
	{
		let angle = 2 * Math.PI / NUM_EDGES_ROOF;

		for ( let i = 0; i < NUM_EDGES_ROOF; i++ ) {
			// vertices
			let x1 = 1.1 * _this.radius * Math.cos(angle * i);
			let z1 = 1.1 * _this.radius * Math.sin(angle * i);
			let x2 = 0.25 * _this.radius * Math.cos(angle * i);
			let z2 = 0.25 * _this.radius * Math.sin(angle * i);
			_this.roof.vertices.push( [x1, _this.height * 0.99, z1] );
			_this.roof.vertices.push( [x2, _this.height * 1.15, z2] );

			// faces
			_this.roof.faces.push( [(2 * i), (2 * i + 1), ((2 * i + 2) % (2 * NUM_EDGES_ROOF))] );
			_this.roof.faces.push( [(2 * i + 1), ((2 * i + 3) % (2 * NUM_EDGES_ROOF)), ((2 * i + 2) % (2 * NUM_EDGES_ROOF))] );

			// uvs
			_this.roof.uvs.push( [[0, 0], [1, 0], [0, 1]] );
			_this.roof.uvs.push( [[1, 0], [1, 1], [0, 1]] );
		}
	}


	// finish
	return _this;
})()
