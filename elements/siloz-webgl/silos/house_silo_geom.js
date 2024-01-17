/*
 * @desc: geometry for house silo
 */
export const CBN_HouseSiloGeom = {
	length: 2,
	height: 1,
	width: 2,
	body: {
		vertices: [
			[-1, 0, 1]		// 0
			, [1, 0, 1]		// 1
			, [1, 1, 1]		// 2
			, [-1, 1, 1]	// 3
			, [-1, 0, -1]	// 4
			, [1, 0, -1]	// 5
			, [1, 1, -1]	// 6
			, [-1, 1, -1]	// 7
		],
		faces: [
			// front
			[0, 1, 2]
			, [0, 2, 3]
			// back
			, [5, 4, 7]
			, [5, 7, 6]
			// left
			, [4, 0, 3]
			, [4, 3, 7]
			// right
			, [1, 5, 6]
			, [1, 6, 2]
			// floor
			, [4, 5, 1]
			, [4, 1, 0]
		],
		uvs: [
			// front
			[[0, 0], [1, 0], [1, 1]]
			, [[0, 0], [1, 1], [0, 1]]
			// back
			, [[0, 0], [1, 0], [1, 1]]
			, [[0, 0], [1, 1], [0, 1]]
			// left
			, [[0, 0], [1, 0], [1, 1]]
			, [[0, 0], [1, 1], [0, 1]]
			// right
			, [[0, 0], [1, 0], [1, 1]]
			, [[0, 0], [1, 1], [0, 1]]
			// floor
			, [[0, 0], [1, 0], [1, 1]]
			, [[0, 0], [1, 1], [0, 1]]
		]
	},
	roof: {
		vertices: [
			[-1.05, 1, 1.05]		// 0
			, [1.05, 1, 1.05]		// 1
			, [1.05, 1.5, 0]		// 2
			, [-1.05, 1.5, 0]		// 3
			, [-1.05, 1, -1.05]		// 4
			, [1.05, 1, -1.05]		// 5
		],
		faces: [
			// top
			[0, 1, 2]
			, [0, 2, 3]
			, [3, 2, 5]
			, [3, 5, 4]
			// sides
			, [1, 5, 2]
			, [4, 0, 3]
		],
		uvs: [
			// top
			[[0, 0], [1, 0], [1, 1]]
			, [[0, 0], [1, 1], [0, 1]]
			, [[0, 0], [1, 1], [0, 1]]
			, [[0, 0], [1, 1], [0, 1]]
			// sides
			, [[0, 0], [1, 0], [0.5, 0.5]]
			, [[0, 0], [1, 0], [0.5, 0.5]]
		]
	}
};

