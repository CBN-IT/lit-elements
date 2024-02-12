/*
 * @desc: geometry for compass arrow
 */
export const CBN_ArrowGeom = (() => {
	// format
	return {
		length: 1.5,
		height: 0.5,
		vertices: [
			[0, 0, -0.75]		// 0
			, [0, 0.25, 0.25]	// 1
			, [0, -0.25, 0.25]	// 2
			, [0.5, 0, 0.75]	// 3
			, [-0.5, 0, 0.75]	// 4
		],
		faces: [
			[0, 1, 3]
			, [0, 3, 2]
			, [0, 4, 1]
			, [0, 2, 4]
			, [2, 1, 4]
			, [1, 2, 3]
		]
	};
})()
