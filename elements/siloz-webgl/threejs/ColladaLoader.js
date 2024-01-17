/**
 * @author Tim Knip / http://www.floorplanner.com/ / tim at floorplanner.com
 * @author Tony Parisi / http://www.tonyparisi.com/
 */

THREE.ColladaLoader = () => {

	let COLLADA = null;
	let scene = null;
	let visualScene;
	let kinematicsModel;

	let readyCallbackFunc = null;

	let sources = {};
	let images = {};
	let animations = {};
	let controllers = {};
	let geometries = {};
	let materials = {};
	let effects = {};
	let cameras = {};
	let lights = {};

	let animData;
	let kinematics;
	let visualScenes;
	let baseUrl;
	let morphs;
	let skins;

	let flip_uv = true;
	let preferredShading = THREE.SmoothShading;

	let options = {
		// Force Geometry to always be centered at the local origin of the
		// containing Mesh.
		centerGeometry: false,

		// Axis conversion is done for geometries, animations, and controllers.
		// If we ever pull cameras or lights out of the COLLADA file, they'll
		// need extra work.
		convertUpAxis: false,

		subdivideFaces: true,

		upAxis: 'Y',

		// For reflective or refractive materials we'll use this cubemap
		defaultEnvMap: null

	};

	let colladaUnit = 1.0;
	let colladaUp = 'Y';
	let upConversion = null;

	function load(url, readyCallback, progressCallback) {

		let length = 0;

		if (document.implementation && document.implementation.createDocument) {

			let request = new XMLHttpRequest();

			request.onreadystatechange = function () {

				if (request.readyState === 4) {

					if (request.status === 0 || request.status === 200) {


						if (request.responseXML) {

							readyCallbackFunc = readyCallback;
							parse(request.responseXML, undefined, url);

						} else if (request.responseText) {

							readyCallbackFunc = readyCallback;
							let xmlParser = new DOMParser();
							let responseXML = xmlParser.parseFromString(request.responseText, "application/xml");
							parse(responseXML, undefined, url);

						} else {

							console.error("ColladaLoader: Empty or non-existing file (" + url + ")");

						}

					}

				} else if (request.readyState === 3) {

					if (progressCallback) {

						if (length === 0) {

							length = request.getResponseHeader("Content-Length");

						}

						progressCallback({total: length, loaded: request.responseText.length});

					}

				}

			}

			request.open("GET", url, true);
			request.send(null);

		} else {

			alert("Don't know how to parse XML!");

		}

	}

	function parse(doc, callBack, url) {

		COLLADA = doc;
		callBack = callBack || readyCallbackFunc;

		if (url !== undefined) {

			let parts = url.split('/');
			parts.pop();
			baseUrl = ( parts.length < 1 ? '.' : parts.join('/') ) + '/';

		}

		parseAsset();
		setUpConversion();
		images = parseLib("library_images image", _Image, "image");
		materials = parseLib("library_materials material", Material, "material");
		effects = parseLib("library_effects effect", Effect, "effect");
		geometries = parseLib("library_geometries geometry", Geometry, "geometry");
		cameras = parseLib("library_cameras camera", Camera, "camera");
		lights = parseLib("library_lights light", Light, "light");
		controllers = parseLib("library_controllers controller", Controller, "controller");
		animations = parseLib("library_animations animation", Animation, "animation");
		visualScenes = parseLib("library_visual_scenes visual_scene", VisualScene, "visual_scene");
		kinematicsModels = parseLib("library_kinematics_models kinematics_model", KinematicsModel, "kinematics_model");

		morphs = [];
		skins = [];

		visualScene = parseScene();
		scene = new THREE.Scene();

		for (let i = 0; i < visualScene.nodes.length; i++) {

			scene.add(createSceneGraph(visualScene.nodes[i]));

		}

		// unit conversion
		scene.scale.multiplyScalar(colladaUnit);

		createAnimations();

		kinematicsModel = parseKinematicsModel();
		createKinematics();

		let result = {

			scene: scene,
			morphs: morphs,
			skins: skins,
			animations: animData,
			kinematics: kinematics,
			dae: {
				images: images,
				materials: materials,
				cameras: cameras,
				lights: lights,
				effects: effects,
				geometries: geometries,
				controllers: controllers,
				animations: animations,
				visualScenes: visualScenes,
				visualScene: visualScene,
				scene: visualScene,
				kinematicsModels: kinematicsModels,
				kinematicsModel: kinematicsModel
			}

		};

		if (callBack) {

			callBack(result);

		}

		return result;

	}

	function setPreferredShading(shading) {

		preferredShading = shading;

	}

	function parseAsset() {

		let elements = COLLADA.querySelectorAll('asset');

		let element = elements[0];

		if (element && element.childNodes) {

			for (let i = 0; i < element.childNodes.length; i++) {

				let child = element.childNodes[i];

				switch (child.nodeName) {

					case 'unit':

						let meter = child.getAttribute('meter');

						if (meter) {

							colladaUnit = parseFloat(meter);

						}

						break;

					case 'up_axis':

						colladaUp = child.textContent.charAt(0);
						break;

				}

			}

		}

	}

	function parseLib(q, classSpec, prefix) {

		let elements = COLLADA.querySelectorAll(q);

		let lib = {};

		let i = 0;

		let elementsLength = elements.length;

		for (let j = 0; j < elementsLength; j++) {

			let element = elements[j];
			let daeElement = ( new classSpec() ).parse(element);

			if (!daeElement.id || daeElement.id.length === 0) daeElement.id = prefix + ( i++ );
			lib[daeElement.id] = daeElement;

		}

		return lib;

	}

	function parseScene() {

		let sceneElement = COLLADA.querySelectorAll('scene instance_visual_scene')[0];

		if (sceneElement) {

			let url = sceneElement.getAttribute('url').replace(/^#/, '');
			return visualScenes[url.length > 0 ? url : 'visual_scene0'];

		} else {

			return null;

		}

	}

	function parseKinematicsModel() {

		let kinematicsModelElement = COLLADA.querySelectorAll('instance_kinematics_model')[0];

		if (kinematicsModelElement) {

			let url = kinematicsModelElement.getAttribute('url').replace(/^#/, '');
			return kinematicsModels[url.length > 0 ? url : 'kinematics_model0'];

		} else {

			return null;

		}

	}

	function createAnimations() {

		animData = [];

		// fill in the keys
		recurseHierarchy(scene);

	}

	function recurseHierarchy(node) {

		let n = visualScene.getChildById(node.colladaId, true),
			newData = null;

		if (n && n.keys) {

			newData = {
				fps: 60,
				hierarchy: [{
					node: n,
					keys: n.keys,
					sids: n.sids
				}],
				node: node,
				name: 'animation_' + node.name,
				length: 0
			};

			animData.push(newData);

			for (let i = 0, il = n.keys.length; i < il; i++) {

				newData.length = Math.max(newData.length, n.keys[i].time);

			}

		} else {

			newData = {
				hierarchy: [{
					keys: [],
					sids: []
				}]
			}

		}

		for (let i = 0, il = node.children.length; i < il; i++) {

			let d = recurseHierarchy(node.children[i]);

			for (let j = 0, jl = d.hierarchy.length; j < jl; j++) {

				newData.hierarchy.push({
					keys: [],
					sids: []
				});

			}

		}

		return newData;

	}

	function calcAnimationBounds() {

		let start = 1000000;
		let end = -start;
		let frames = 0;
		let ID;
		for (let id in animations) {

			let animation = animations[id];
			ID = ID || animation.id;
			for (let i = 0; i < animation.sampler.length; i++) {

				let sampler = animation.sampler[i];

				sampler.create();

				start = Math.min(start, sampler.startTime);
				end = Math.max(end, sampler.endTime);
				frames = Math.max(frames, sampler.input.length);

			}

		}

		return {start: start, end: end, frames: frames, ID: ID};

	}

	function createMorph(geometry, ctrl) {

		let morphCtrl = ctrl instanceof InstanceController ? controllers[ctrl.url] : ctrl;

		if (!morphCtrl || !morphCtrl.morph) {

			console.log("could not find morph controller!");
			return;

		}

		let morph = morphCtrl.morph;

		for (let i = 0; i < morph.targets.length; i++) {

			let target_id = morph.targets[i];
			let daeGeometry = geometries[target_id];

			if (!daeGeometry.mesh || !daeGeometry.mesh.primitives || !daeGeometry.mesh.primitives.length) {
				continue;
			}

			let target = daeGeometry.mesh.primitives[0].geometry;

			if (target.vertices.length === geometry.vertices.length) {

				geometry.morphTargets.push({name: "target_1", vertices: target.vertices});

			}

		}

		geometry.morphTargets.push({name: "target_Z", vertices: geometry.vertices});

	};

	function createSkin(geometry, ctrl, applyBindShape) {

		let skinCtrl = controllers[ctrl.url];

		if (!skinCtrl || !skinCtrl.skin) {

			console.log("could not find skin controller!");
			return;

		}

		if (!ctrl.skeleton || !ctrl.skeleton.length) {

			console.log("could not find the skeleton for the skin!");
			return;

		}

		let skin = skinCtrl.skin;
		let skeleton = visualScene.getChildById(ctrl.skeleton[0]);
		let hierarchy = [];

		applyBindShape = applyBindShape !== undefined ? applyBindShape : true;

		let bones = [];
		geometry.skinWeights = [];
		geometry.skinIndices = [];

		//createBones( geometry.bones, skin, hierarchy, skeleton, null, -1 );
		//createWeights( skin, geometry.bones, geometry.skinIndices, geometry.skinWeights );

		/*
		 geometry.animation = {
		 name: 'take_001',
		 fps: 30,
		 length: 2,
		 JIT: true,
		 hierarchy: hierarchy
		 };
		 */

		if (applyBindShape) {

			for (let i = 0; i < geometry.vertices.length; i++) {

				geometry.vertices[i].applyMatrix4(skin.bindShapeMatrix);

			}

		}

	}

	function setupSkeleton(node, bones, frame, parent) {

		node.world = node.world || new THREE.Matrix4();
		node.localworld = node.localworld || new THREE.Matrix4();
		node.world.copy(node.matrix);
		node.localworld.copy(node.matrix);

		if (node.channels && node.channels.length) {

			let channel = node.channels[0];
			let m = channel.sampler.output[frame];

			if (m instanceof THREE.Matrix4) {

				node.world.copy(m);
				node.localworld.copy(m);
				if (frame === 0)
					node.matrix.copy(m);
			}

		}

		if (parent) {

			node.world.multiplyMatrices(parent, node.world);

		}

		bones.push(node);

		for (let i = 0; i < node.nodes.length; i++) {

			setupSkeleton(node.nodes[i], bones, frame, node.world);

		}

	}

	function setupSkinningMatrices(bones, skin) {

		// FIXME: this is dumb...

		for (let i = 0; i < bones.length; i++) {

			let bone = bones[i];
			let found = -1;

			if (bone.type !== 'JOINT') continue;

			for (let j = 0; j < skin.joints.length; j++) {

				if (bone.sid === skin.joints[j]) {

					found = j;
					break;

				}

			}

			if (found >= 0) {

				let inv = skin.invBindMatrices[found];

				bone.invBindMatrix = inv;
				bone.skinningMatrix = new THREE.Matrix4();
				bone.skinningMatrix.multiplyMatrices(bone.world, inv); // (IBMi * JMi)
				bone.animatrix = new THREE.Matrix4();

				bone.animatrix.copy(bone.localworld);
				bone.weights = [];

				for (let j = 0; j < skin.weights.length; j++) {

					for (let k = 0; k < skin.weights[j].length; k++) {

						let w = skin.weights[j][k];

						if (w.joint === found) {

							bone.weights.push(w);

						}

					}

				}

			} else {

				console.warn("ColladaLoader: Could not find joint '" + bone.sid + "'.");

				bone.skinningMatrix = new THREE.Matrix4();
				bone.weights = [];

			}
		}

	}

	//Walk the Collada tree and flatten the bones into a list, extract the position, quat and scale from the matrix
	function flattenSkeleton(skeleton) {

		let list = [];
		let walk = function (parentid, node, list) {

			let bone = {};
			bone.name = node.sid;
			bone.parent = parentid;
			bone.matrix = node.matrix;
			let data = [new THREE.Vector3(), new THREE.Quaternion(), new THREE.Vector3()];
			bone.matrix.decompose(data[0], data[1], data[2]);

			bone.pos = [data[0].x, data[0].y, data[0].z];

			bone.scl = [data[2].x, data[2].y, data[2].z];
			bone.rotq = [data[1].x, data[1].y, data[1].z, data[1].w];
			list.push(bone);

			for (let i in node.nodes) {

				walk(node.sid, node.nodes[i], list);

			}

		};

		walk(-1, skeleton, list);
		return list;

	}

	//Move the vertices into the pose that is proper for the start of the animation
	function skinToBindPose(geometry, skeleton, skinController) {

		let bones = [];
		setupSkeleton(skeleton, bones, -1);
		setupSkinningMatrices(bones, skinController.skin);
		v = new THREE.Vector3();
		let skinned = [];

		for (let i = 0; i < geometry.vertices.length; i++) {

			skinned.push(new THREE.Vector3());

		}

		for (i = 0; i < bones.length; i++) {

			if (bones[i].type !== 'JOINT') continue;

			for (j = 0; j < bones[i].weights.length; j++) {

				w = bones[i].weights[j];
				vidx = w.index;
				weight = w.weight;

				o = geometry.vertices[vidx];
				s = skinned[vidx];

				v.x = o.x;
				v.y = o.y;
				v.z = o.z;

				v.applyMatrix4(bones[i].skinningMatrix);

				s.x += (v.x * weight);
				s.y += (v.y * weight);
				s.z += (v.z * weight);
			}

		}

		for (let i = 0; i < geometry.vertices.length; i++) {

			geometry.vertices[i] = skinned[i];

		}

	}

	function applySkin(geometry, instanceCtrl, frame) {

		let skinController = controllers[instanceCtrl.url];

		frame = frame !== undefined ? frame : 40;

		if (!skinController || !skinController.skin) {

			console.log('ColladaLoader: Could not find skin controller.');
			return;

		}

		if (!instanceCtrl.skeleton || !instanceCtrl.skeleton.length) {

			console.log('ColladaLoader: Could not find the skeleton for the skin. ');
			return;

		}

		let animationBounds = calcAnimationBounds();
		let skeleton = visualScene.getChildById(instanceCtrl.skeleton[0], true) ||
			visualScene.getChildBySid(instanceCtrl.skeleton[0], true);

		//flatten the skeleton into a list of bones
		let bonelist = flattenSkeleton(skeleton);
		let joints = skinController.skin.joints;

		//sort that list so that the order reflects the order in the joint list
		let sortedbones = [];
		for (let i = 0; i < joints.length; i++) {

			for (let j = 0; j < bonelist.length; j++) {

				if (bonelist[j].name === joints[i]) {

					sortedbones[i] = bonelist[j];

				}

			}

		}

		//hook up the parents by index instead of name
		for (let i = 0; i < sortedbones.length; i++) {

			for (let j = 0; j < sortedbones.length; j++) {

				if (sortedbones[i].parent === sortedbones[j].name) {

					sortedbones[i].parent = j;

				}

			}

		}


		let i, j, w, vidx, weight;
		let v = new THREE.Vector3(), o, s;

		// move vertices to bind shape
		for (i = 0; i < geometry.vertices.length; i++) {
			geometry.vertices[i].applyMatrix4(skinController.skin.bindShapeMatrix);
		}

		let skinIndices = [];
		let skinWeights = [];
		let weights = skinController.skin.weights;

		//hook up the skin weights
		// TODO -  this might be a good place to choose greatest 4 weights
		for (let i = 0; i < weights.length; i++) {

			let indicies = new THREE.Vector4(weights[i][0] ? weights[i][0].joint : 0, weights[i][1] ? weights[i][1].joint : 0, weights[i][2] ? weights[i][2].joint : 0, weights[i][3] ? weights[i][3].joint : 0);
			let weight = new THREE.Vector4(weights[i][0] ? weights[i][0].weight : 0, weights[i][1] ? weights[i][1].weight : 0, weights[i][2] ? weights[i][2].weight : 0, weights[i][3] ? weights[i][3].weight : 0);

			skinIndices.push(indicies);
			skinWeights.push(weight);

		}

		geometry.skinIndices = skinIndices;
		geometry.skinWeights = skinWeights;
		geometry.bones = sortedbones;
		// process animation, or simply pose the rig if no animation

		//create an animation for the animated bones
		//NOTE: this has no effect when using morphtargets
		let animationdata = {
			"name": animationBounds.ID,
			"fps": 30,
			"length": animationBounds.frames / 30,
			"hierarchy": []
		};

		for (let j = 0; j < sortedbones.length; j++) {

			animationdata.hierarchy.push({parent: sortedbones[j].parent, name: sortedbones[j].name, keys: []});

		}

		console.log('ColladaLoader:', animationBounds.ID + ' has ' + sortedbones.length + ' bones.');


		skinToBindPose(geometry, skeleton, skinController);


		for (frame = 0; frame < animationBounds.frames; frame++) {

			let bones = [];
			let skinned = [];
			// process the frame and setup the rig with a fresh
			// transform, possibly from the bone's animation channel(s)

			setupSkeleton(skeleton, bones, frame);
			setupSkinningMatrices(bones, skinController.skin);

			for (let i = 0; i < bones.length; i++) {

				for (let j = 0; j < animationdata.hierarchy.length; j++) {

					if (animationdata.hierarchy[j].name === bones[i].sid) {

						let key = {};
						key.time = (frame / 30);
						key.matrix = bones[i].animatrix;

						if (frame === 0)
							bones[i].matrix = key.matrix;

						let data = [new THREE.Vector3(), new THREE.Quaternion(), new THREE.Vector3()];
						key.matrix.decompose(data[0], data[1], data[2]);

						key.pos = [data[0].x, data[0].y, data[0].z];

						key.scl = [data[2].x, data[2].y, data[2].z];
						key.rot = data[1];

						animationdata.hierarchy[j].keys.push(key);

					}

				}

			}

			geometry.animation = animationdata;

		}

	};

	function createKinematics() {

		if (kinematicsModel && kinematicsModel.joints.length === 0) {
			kinematics = undefined;
			return;
		}

		let jointMap = {};

		let _addToMap = function (jointIndex, parentVisualElement) {

			let parentVisualElementId = parentVisualElement.getAttribute('id');
			let colladaNode = visualScene.getChildById(parentVisualElementId, true);
			let joint = kinematicsModel.joints[jointIndex];

			scene.traverse(function (node) {

				if (node.colladaId == parentVisualElementId) {

					jointMap[jointIndex] = {
						node: node,
						transforms: colladaNode.transforms,
						joint: joint,
						position: joint.zeroPosition
					};

				}

			});

		};

		kinematics = {

			joints: kinematicsModel && kinematicsModel.joints,

			getJointValue: function (jointIndex) {

				let jointData = jointMap[jointIndex];

				if (jointData) {

					return jointData.position;

				} else {

					console.log('getJointValue: joint ' + jointIndex + ' doesn\'t exist');

				}

			},

			setJointValue: function (jointIndex, value) {

				let jointData = jointMap[jointIndex];

				if (jointData) {

					let joint = jointData.joint;

					if (value > joint.limits.max || value < joint.limits.min) {

						console.log('setJointValue: joint ' + jointIndex + ' value ' + value + ' outside of limits (min: ' + joint.limits.min + ', max: ' + joint.limits.max + ')');

					} else if (joint.static) {

						console.log('setJointValue: joint ' + jointIndex + ' is static');

					} else {

						let threejsNode = jointData.node;
						let axis = joint.axis;
						let transforms = jointData.transforms;

						let matrix = new THREE.Matrix4();

						for (i = 0; i < transforms.length; i++) {

							let transform = transforms[i];

							// kinda ghetto joint detection
							if (transform.sid && transform.sid.indexOf('joint' + jointIndex) !== -1) {

								// apply actual joint value here
								switch (joint.type) {

									case 'revolute':

										matrix.multiply(m1.makeRotationAxis(axis, THREE.Math.degToRad(value)));
										break;

									case 'prismatic':

										matrix.multiply(m1.makeTranslation(axis.x * value, axis.y * value, axis.z * value));
										break;

									default:

										console.warn('setJointValue: unknown joint type: ' + joint.type);
										break;

								}

							} else {

								let m1 = new THREE.Matrix4();

								switch (transform.type) {

									case 'matrix':

										matrix.multiply(transform.obj);

										break;

									case 'translate':

										matrix.multiply(m1.makeTranslation(transform.obj.x, transform.obj.y, transform.obj.z));

										break;

									case 'rotate':

										matrix.multiply(m1.makeRotationAxis(transform.obj, transform.angle));

										break;

								}
							}
						}

						// apply the matrix to the threejs node
						let elementsFloat32Arr = matrix.elements;
						let elements = Array.prototype.slice.call(elementsFloat32Arr);

						let elementsRowMajor = [
							elements[0],
							elements[4],
							elements[8],
							elements[12],
							elements[1],
							elements[5],
							elements[9],
							elements[13],
							elements[2],
							elements[6],
							elements[10],
							elements[14],
							elements[3],
							elements[7],
							elements[11],
							elements[15]
						];

						threejsNode.matrix.set.apply(threejsNode.matrix, elementsRowMajor);
						threejsNode.matrix.decompose(threejsNode.position, threejsNode.quaternion, threejsNode.scale);
					}

				} else {

					console.log('setJointValue: joint ' + jointIndex + ' doesn\'t exist');

				}

			}

		};

		let element = COLLADA.querySelector('scene instance_kinematics_scene');

		if (element) {

			for (let i = 0; i < element.childNodes.length; i++) {

				let child = element.childNodes[i];

				if (child.nodeType !== 1) continue;

				switch (child.nodeName) {

					case 'bind_joint_axis':

						let visualTarget = child.getAttribute('target').split('/').pop();
						let axis = child.querySelector('axis param').textContent;
						let jointIndex = parseInt(axis.split('joint').pop().split('.')[0]);
						let visualTargetElement = COLLADA.querySelector('[sid="' + visualTarget + '"]');

						if (visualTargetElement) {
							let parentVisualElement = visualTargetElement.parentElement;
							_addToMap(jointIndex, parentVisualElement);
						}

						break;

					default:

						break;

				}

			}
		}

	};

	function createSceneGraph(node, parent) {

		let obj = new THREE.Object3D();
		let skinned = false;
		let skinController;
		let morphController;
		let i, j;

		// FIXME: controllers

		for (i = 0; i < node.controllers.length; i++) {

			let controller = controllers[node.controllers[i].url];

			switch (controller.type) {

				case 'skin':

					if (geometries[controller.skin.source]) {

						let inst_geom = new InstanceGeometry();

						inst_geom.url = controller.skin.source;
						inst_geom.instance_material = node.controllers[i].instance_material;

						node.geometries.push(inst_geom);
						skinned = true;
						skinController = node.controllers[i];

					} else if (controllers[controller.skin.source]) {

						// urgh: controller can be chained
						// handle the most basic case...

						let second = controllers[controller.skin.source];
						morphController = second;
						//	skinController = node.controllers[i];

						if (second.morph && geometries[second.morph.source]) {

							let inst_geom = new InstanceGeometry();

							inst_geom.url = second.morph.source;
							inst_geom.instance_material = node.controllers[i].instance_material;

							node.geometries.push(inst_geom);

						}

					}

					break;

				case 'morph':

					if (geometries[controller.morph.source]) {

						let inst_geom = new InstanceGeometry();

						inst_geom.url = controller.morph.source;
						inst_geom.instance_material = node.controllers[i].instance_material;

						node.geometries.push(inst_geom);
						morphController = node.controllers[i];

					}

					console.log('ColladaLoader: Morph-controller partially supported.');

				default:
					break;

			}

		}

		// geometries

		let double_sided_materials = {};

		for (i = 0; i < node.geometries.length; i++) {

			let instance_geometry = node.geometries[i];
			let instance_materials = instance_geometry.instance_material;
			let geometry = geometries[instance_geometry.url];
			let used_materials = {};
			let used_materials_array = [];
			let num_materials = 0;
			let first_material;

			if (geometry) {

				if (!geometry.mesh || !geometry.mesh.primitives)
					continue;

				if (obj.name.length === 0) {

					obj.name = geometry.id;

				}

				// collect used fx for this geometry-instance

				if (instance_materials) {

					for (j = 0; j < instance_materials.length; j++) {

						let instance_material = instance_materials[j];
						let mat = materials[instance_material.target];
						let effect_id = mat.instance_effect.url;
						let shader = effects[effect_id].shader;
						let material3js = shader.material;

						if (geometry.doubleSided) {

							if (!( instance_material.symbol in double_sided_materials )) {

								let _copied_material = material3js.clone();
								_copied_material.side = THREE.DoubleSide;
								double_sided_materials[instance_material.symbol] = _copied_material;

							}

							material3js = double_sided_materials[instance_material.symbol];

						}

						material3js.opacity = !material3js.opacity ? 1 : material3js.opacity;
						used_materials[instance_material.symbol] = num_materials;
						used_materials_array.push(material3js);
						first_material = material3js;
						first_material.name = mat.name === null || mat.name === '' ? mat.id : mat.name;
						num_materials++;

					}

				}

				let mesh;
				let material = first_material || new THREE.MeshLambertMaterial({
						color: 0xdddddd,
						side: geometry.doubleSided ? THREE.DoubleSide : THREE.FrontSide
					});
				let geom = geometry.mesh.geometry3js;

				if (num_materials > 1) {

					material = new THREE.MeshFaceMaterial(used_materials_array);

					for (j = 0; j < geom.faces.length; j++) {

						let face = geom.faces[j];
						face.materialIndex = used_materials[face.daeMaterial]

					}

				}

				if (skinController !== undefined) {


					applySkin(geom, skinController);

					if (geom.morphTargets.length > 0) {

						material.morphTargets = true;
						material.skinning = false;

					} else {

						material.morphTargets = false;
						material.skinning = true;

					}


					mesh = new THREE.SkinnedMesh(geom, material, false);


					//mesh.skeleton = skinController.skeleton;
					//mesh.skinController = controllers[ skinController.url ];
					//mesh.skinInstanceController = skinController;
					mesh.name = 'skin_' + skins.length;


					//mesh.animationHandle.setKey(0);
					skins.push(mesh);

				} else if (morphController !== undefined) {

					createMorph(geom, morphController);

					material.morphTargets = true;

					mesh = new THREE.Mesh(geom, material);
					mesh.name = 'morph_' + morphs.length;

					morphs.push(mesh);

				} else {

					if (geom.isLineStrip === true) {

						mesh = new THREE.Line(geom);

					} else {

						mesh = new THREE.Mesh(geom, material);

					}

				}

				obj.add(mesh);

			}

		}

		for (i = 0; i < node.cameras.length; i++) {

			let instance_camera = node.cameras[i];
			let cparams = cameras[instance_camera.url];

			let cam = new THREE.PerspectiveCamera(cparams.yfov, parseFloat(cparams.aspect_ratio),
				parseFloat(cparams.znear), parseFloat(cparams.zfar));

			obj.add(cam);
		}

		for (i = 0; i < node.lights.length; i++) {

			let light = null;
			let instance_light = node.lights[i];
			let lparams = lights[instance_light.url];

			if (lparams && lparams.technique) {

				let color = lparams.color.getHex();
				let intensity = lparams.intensity;
				let distance = lparams.distance;
				let angle = lparams.falloff_angle;
				let exponent; // Intentionally undefined, don't know what this is yet

				switch (lparams.technique) {

					case 'directional':

						light = new THREE.DirectionalLight(color, intensity, distance);
						light.position.set(0, 0, 1);
						break;

					case 'point':

						light = new THREE.PointLight(color, intensity, distance);
						break;

					case 'spot':

						light = new THREE.SpotLight(color, intensity, distance, angle, exponent);
						light.position.set(0, 0, 1);
						break;

					case 'ambient':

						light = new THREE.AmbientLight(color);
						break;

				}

			}

			if (light) {
				obj.add(light);
			}
		}

		obj.name = node.name || node.id || "";
		obj.colladaId = node.id || "";
		obj.layer = node.layer || "";
		obj.matrix = node.matrix;
		obj.matrix.decompose(obj.position, obj.quaternion, obj.scale);

		if (options.centerGeometry && obj.geometry) {

			let delta = obj.geometry.center();
			delta.multiply(obj.scale);
			delta.applyQuaternion(obj.quaternion);

			obj.position.sub(delta);

		}

		for (i = 0; i < node.nodes.length; i++) {

			obj.add(createSceneGraph(node.nodes[i], node));

		}

		return obj;

	};

	function getJointId(skin, id) {

		for (let i = 0; i < skin.joints.length; i++) {

			if (skin.joints[i] === id) {

				return i;

			}

		}

	};

	function getLibraryNode(id) {

		let nodes = COLLADA.querySelectorAll('library_nodes node');

		for (let i = 0; i < nodes.length; i++) {

			let attObj = nodes[i].attributes.getNamedItem('id');
			if (attObj && attObj.value === id) {
				return nodes[i];
			}
		}

		return undefined;

	};

	function getChannelsForNode(node) {

		let channels = [];
		let startTime = 1000000;
		let endTime = -1000000;

		for (let id in animations) {

			let animation = animations[id];

			for (let i = 0; i < animation.channel.length; i++) {

				let channel = animation.channel[i];
				let sampler = animation.sampler[i];
				let id = channel.target.split('/')[0];

				if (id == node.id) {

					sampler.create();
					channel.sampler = sampler;
					startTime = Math.min(startTime, sampler.startTime);
					endTime = Math.max(endTime, sampler.endTime);
					channels.push(channel);

				}

			}

		}

		if (channels.length) {

			node.startTime = startTime;
			node.endTime = endTime;

		}

		return channels;

	};

	function calcFrameDuration(node) {

		let minT = 10000000;

		for (let i = 0; i < node.channels.length; i++) {

			let sampler = node.channels[i].sampler;

			for (let j = 0; j < sampler.input.length - 1; j++) {

				let t0 = sampler.input[j];
				let t1 = sampler.input[j + 1];
				minT = Math.min(minT, t1 - t0);

			}
		}

		return minT;

	};

	function calcMatrixAt(node, t) {

		let animated = {};

		let i, j;

		for (i = 0; i < node.channels.length; i++) {

			let channel = node.channels[i];
			animated[channel.sid] = channel;

		}

		let matrix = new THREE.Matrix4();

		for (i = 0; i < node.transforms.length; i++) {

			let transform = node.transforms[i];
			let channel = animated[transform.sid];

			if (channel !== undefined) {

				let sampler = channel.sampler;
				let value;

				for (j = 0; j < sampler.input.length - 1; j++) {

					if (sampler.input[j + 1] > t) {

						value = sampler.output[j];
						//console.log(value.flatten)
						break;

					}

				}

				if (value !== undefined) {

					if (value instanceof THREE.Matrix4) {

						matrix.multiplyMatrices(matrix, value);

					} else {

						// FIXME: handle other types

						matrix.multiplyMatrices(matrix, transform.matrix);

					}

				} else {

					matrix.multiplyMatrices(matrix, transform.matrix);

				}

			} else {

				matrix.multiplyMatrices(matrix, transform.matrix);

			}

		}

		return matrix;

	};

	function bakeAnimations(node) {

		if (node.channels && node.channels.length) {

			let keys = [],
				sids = [];

			for (let i = 0, il = node.channels.length; i < il; i++) {

				let channel = node.channels[i],
					fullSid = channel.fullSid,
					sampler = channel.sampler,
					input = sampler.input,
					transform = node.getTransformBySid(channel.sid),
					member;

				if (channel.arrIndices) {

					member = [];

					for (let j = 0, jl = channel.arrIndices.length; j < jl; j++) {

						member[j] = getConvertedIndex(channel.arrIndices[j]);

					}

				} else {

					member = getConvertedMember(channel.member);

				}

				if (transform) {

					if (sids.indexOf(fullSid) === -1) {

						sids.push(fullSid);

					}

					for (let j = 0, jl = input.length; j < jl; j++) {

						let time = input[j],
							data = sampler.getData(transform.type, j, member),
							key = findKey(keys, time);

						if (!key) {

							key = new Key(time);
							let timeNdx = findTimeNdx(keys, time);
							keys.splice(timeNdx === -1 ? keys.length : timeNdx, 0, key);

						}

						key.addTarget(fullSid, transform, member, data);

					}

				} else {

					console.log('Could not find transform "' + channel.sid + '" in node ' + node.id);

				}

			}

			// post process
			for (let i = 0; i < sids.length; i++) {

				let sid = sids[i];

				for (let j = 0; j < keys.length; j++) {

					let key = keys[j];

					if (!key.hasTarget(sid)) {

						interpolateKeys(keys, key, j, sid);

					}

				}

			}

			node.keys = keys;
			node.sids = sids;

		}

	};

	function findKey(keys, time) {

		let retVal = null;

		for (let i = 0, il = keys.length; i < il && retVal === null; i++) {

			let key = keys[i];

			if (key.time === time) {

				retVal = key;

			} else if (key.time > time) {

				break;

			}

		}

		return retVal;

	};

	function findTimeNdx(keys, time) {

		let ndx = -1;

		for (let i = 0, il = keys.length; i < il && ndx === -1; i++) {

			let key = keys[i];

			if (key.time >= time) {

				ndx = i;

			}

		}

		return ndx;

	};

	function interpolateKeys(keys, key, ndx, fullSid) {

		let prevKey = getPrevKeyWith(keys, fullSid, ndx ? ndx - 1 : 0),
			nextKey = getNextKeyWith(keys, fullSid, ndx + 1);

		if (prevKey && nextKey) {

			let scale = (key.time - prevKey.time) / (nextKey.time - prevKey.time),
				prevTarget = prevKey.getTarget(fullSid),
				nextData = nextKey.getTarget(fullSid).data,
				prevData = prevTarget.data,
				data;

			if (prevTarget.type === 'matrix') {

				data = prevData;

			} else if (prevData.length) {

				data = [];

				for (let i = 0; i < prevData.length; ++i) {

					data[i] = prevData[i] + ( nextData[i] - prevData[i] ) * scale;

				}

			} else {

				data = prevData + ( nextData - prevData ) * scale;

			}

			key.addTarget(fullSid, prevTarget.transform, prevTarget.member, data);

		}

	};

	// Get next key with given sid

	function getNextKeyWith(keys, fullSid, ndx) {

		for (; ndx < keys.length; ndx++) {

			let key = keys[ndx];

			if (key.hasTarget(fullSid)) {

				return key;

			}

		}

		return null;

	};

	// Get previous key with given sid

	function getPrevKeyWith(keys, fullSid, ndx) {

		ndx = ndx >= 0 ? ndx : ndx + keys.length;

		for (; ndx >= 0; ndx--) {

			let key = keys[ndx];

			if (key.hasTarget(fullSid)) {

				return key;

			}

		}

		return null;

	};

	function _Image() {

		this.id = "";
		this.init_from = "";

	};

	_Image.prototype.parse = function (element) {

		this.id = element.getAttribute('id');

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];

			if (child.nodeName === 'init_from') {

				this.init_from = child.textContent;

			}

		}

		return this;

	};

	function Controller() {

		this.id = "";
		this.name = "";
		this.type = "";
		this.skin = null;
		this.morph = null;

	};

	Controller.prototype.parse = function (element) {

		this.id = element.getAttribute('id');
		this.name = element.getAttribute('name');
		this.type = "none";

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];

			switch (child.nodeName) {

				case 'skin':

					this.skin = (new Skin()).parse(child);
					this.type = child.nodeName;
					break;

				case 'morph':

					this.morph = (new Morph()).parse(child);
					this.type = child.nodeName;
					break;

				default:
					break;

			}
		}

		return this;

	};

	function Morph() {

		this.method = null;
		this.source = null;
		this.targets = null;
		this.weights = null;

	};

	Morph.prototype.parse = function (element) {

		let sources = {};
		let inputs = [];
		let i;

		this.method = element.getAttribute('method');
		this.source = element.getAttribute('source').replace(/^#/, '');

		for (i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'source':

					let source = ( new Source() ).parse(child);
					sources[source.id] = source;
					break;

				case 'targets':

					inputs = this.parseInputs(child);
					break;

				default:

					console.log(child.nodeName);
					break;

			}

		}

		for (i = 0; i < inputs.length; i++) {

			let input = inputs[i];
			let source = sources[input.source];

			switch (input.semantic) {

				case 'MORPH_TARGET':

					this.targets = source.read();
					break;

				case 'MORPH_WEIGHT':

					this.weights = source.read();
					break;

				default:
					break;

			}
		}

		return this;

	};

	Morph.prototype.parseInputs = function (element) {

		let inputs = [];

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'input':

					inputs.push((new Input()).parse(child));
					break;

				default:
					break;
			}
		}

		return inputs;

	};

	function Skin() {

		this.source = "";
		this.bindShapeMatrix = null;
		this.invBindMatrices = [];
		this.joints = [];
		this.weights = [];

	};

	Skin.prototype.parse = function (element) {

		let sources = {};
		let joints, weights;

		this.source = element.getAttribute('source').replace(/^#/, '');
		this.invBindMatrices = [];
		this.joints = [];
		this.weights = [];

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'bind_shape_matrix':

					let f = _floats(child.textContent);
					this.bindShapeMatrix = getConvertedMat4(f);
					break;

				case 'source':

					let src = new Source().parse(child);
					sources[src.id] = src;
					break;

				case 'joints':

					joints = child;
					break;

				case 'vertex_weights':

					weights = child;
					break;

				default:

					console.log(child.nodeName);
					break;

			}
		}

		this.parseJoints(joints, sources);
		this.parseWeights(weights, sources);

		return this;

	};

	Skin.prototype.parseJoints = function (element, sources) {

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'input':

					let input = ( new Input() ).parse(child);
					let source = sources[input.source];

					if (input.semantic === 'JOINT') {

						this.joints = source.read();

					} else if (input.semantic === 'INV_BIND_MATRIX') {

						this.invBindMatrices = source.read();

					}

					break;

				default:
					break;
			}

		}

	};

	Skin.prototype.parseWeights = function (element, sources) {

		let v, vcount, inputs = [];

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'input':

					inputs.push(( new Input() ).parse(child));
					break;

				case 'v':

					v = _ints(child.textContent);
					break;

				case 'vcount':

					vcount = _ints(child.textContent);
					break;

				default:
					break;

			}

		}

		let index = 0;

		for (let i = 0; i < vcount.length; i++) {

			let numBones = vcount[i];
			let vertex_weights = [];

			for (let j = 0; j < numBones; j++) {

				let influence = {};

				for (let k = 0; k < inputs.length; k++) {

					let input = inputs[k];
					let value = v[index + input.offset];

					switch (input.semantic) {

						case 'JOINT':

							influence.joint = value;//this.joints[value];
							break;

						case 'WEIGHT':

							influence.weight = sources[input.source].data[value];
							break;

						default:
							break;

					}

				}

				vertex_weights.push(influence);
				index += inputs.length;
			}

			for (let j = 0; j < vertex_weights.length; j++) {

				vertex_weights[j].index = i;

			}

			this.weights.push(vertex_weights);

		}

	};

	function VisualScene() {

		this.id = "";
		this.name = "";
		this.nodes = [];
		this.scene = new THREE.Scene();

	};

	VisualScene.prototype.getChildById = function (id, recursive) {

		for (let i = 0; i < this.nodes.length; i++) {

			let node = this.nodes[i].getChildById(id, recursive);

			if (node) {

				return node;

			}

		}

		return null;

	};

	VisualScene.prototype.getChildBySid = function (sid, recursive) {

		for (let i = 0; i < this.nodes.length; i++) {

			let node = this.nodes[i].getChildBySid(sid, recursive);

			if (node) {

				return node;

			}

		}

		return null;

	};

	VisualScene.prototype.parse = function (element) {

		this.id = element.getAttribute('id');
		this.name = element.getAttribute('name');
		this.nodes = [];

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'node':

					this.nodes.push(( new Node() ).parse(child));
					break;

				default:
					break;

			}

		}

		return this;

	};

	function Node() {

		this.id = "";
		this.name = "";
		this.sid = "";
		this.nodes = [];
		this.controllers = [];
		this.transforms = [];
		this.geometries = [];
		this.channels = [];
		this.matrix = new THREE.Matrix4();

	};

	Node.prototype.getChannelForTransform = function (transformSid) {

		for (let i = 0; i < this.channels.length; i++) {

			let channel = this.channels[i];
			let parts = channel.target.split('/');
			let id = parts.shift();
			let sid = parts.shift();
			let dotSyntax = (sid.indexOf(".") >= 0);
			let arrSyntax = (sid.indexOf("(") >= 0);
			let arrIndices;
			let member;

			if (dotSyntax) {

				parts = sid.split(".");
				sid = parts.shift();
				member = parts.shift();

			} else if (arrSyntax) {

				arrIndices = sid.split("(");
				sid = arrIndices.shift();

				for (let j = 0; j < arrIndices.length; j++) {

					arrIndices[j] = parseInt(arrIndices[j].replace(/\)/, ''));

				}

			}

			if (sid === transformSid) {

				channel.info = {sid: sid, dotSyntax: dotSyntax, arrSyntax: arrSyntax, arrIndices: arrIndices};
				return channel;

			}

		}

		return null;

	};

	Node.prototype.getChildById = function (id, recursive) {

		if (this.id === id) {

			return this;

		}

		if (recursive) {

			for (let i = 0; i < this.nodes.length; i++) {

				let n = this.nodes[i].getChildById(id, recursive);

				if (n) {

					return n;

				}

			}

		}

		return null;

	};

	Node.prototype.getChildBySid = function (sid, recursive) {

		if (this.sid === sid) {

			return this;

		}

		if (recursive) {

			for (let i = 0; i < this.nodes.length; i++) {

				let n = this.nodes[i].getChildBySid(sid, recursive);

				if (n) {

					return n;

				}

			}
		}

		return null;

	};

	Node.prototype.getTransformBySid = function (sid) {

		for (let i = 0; i < this.transforms.length; i++) {

			if (this.transforms[i].sid === sid) return this.transforms[i];

		}

		return null;

	};

	Node.prototype.parse = function (element) {

		let url;

		this.id = element.getAttribute('id');
		this.sid = element.getAttribute('sid');
		this.name = element.getAttribute('name');
		this.type = element.getAttribute('type');
		this.layer = element.getAttribute('layer');

		this.type = this.type === 'JOINT' ? this.type : 'NODE';

		this.nodes = [];
		this.transforms = [];
		this.geometries = [];
		this.cameras = [];
		this.lights = [];
		this.controllers = [];
		this.matrix = new THREE.Matrix4();

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'node':

					this.nodes.push(( new Node() ).parse(child));
					break;

				case 'instance_camera':

					this.cameras.push(( new InstanceCamera() ).parse(child));
					break;

				case 'instance_controller':

					this.controllers.push(( new InstanceController() ).parse(child));
					break;

				case 'instance_geometry':

					this.geometries.push(( new InstanceGeometry() ).parse(child));
					break;

				case 'instance_light':

					this.lights.push(( new InstanceLight() ).parse(child));
					break;

				case 'instance_node':

					url = child.getAttribute('url').replace(/^#/, '');
					let iNode = getLibraryNode(url);

					if (iNode) {

						this.nodes.push(( new Node() ).parse(iNode));

					}

					break;

				case 'rotate':
				case 'translate':
				case 'scale':
				case 'matrix':
				case 'lookat':
				case 'skew':

					this.transforms.push(( new Transform() ).parse(child));
					break;

				case 'extra':
					break;

				default:

					console.log(child.nodeName);
					break;

			}

		}

		this.channels = getChannelsForNode(this);
		bakeAnimations(this);

		this.updateMatrix();

		return this;

	};

	Node.prototype.updateMatrix = function () {

		this.matrix.identity();

		for (let i = 0; i < this.transforms.length; i++) {

			this.transforms[i].apply(this.matrix);

		}

	};

	function Transform() {

		this.sid = "";
		this.type = "";
		this.data = [];
		this.obj = null;

	};

	Transform.prototype.parse = function (element) {

		this.sid = element.getAttribute('sid');
		this.type = element.nodeName;
		this.data = _floats(element.textContent);
		this.convert();

		return this;

	};

	Transform.prototype.convert = function () {

		switch (this.type) {

			case 'matrix':

				this.obj = getConvertedMat4(this.data);
				break;

			case 'rotate':

				this.angle = THREE.Math.degToRad(this.data[3]);

			case 'translate':

				fixCoords(this.data, -1);
				this.obj = new THREE.Vector3(this.data[0], this.data[1], this.data[2]);
				break;

			case 'scale':

				fixCoords(this.data, 1);
				this.obj = new THREE.Vector3(this.data[0], this.data[1], this.data[2]);
				break;

			default:
				console.log('Can not convert Transform of type ' + this.type);
				break;

		}

	};

	Transform.prototype.apply = function () {

		let m1 = new THREE.Matrix4();

		return function (matrix) {

			switch (this.type) {

				case 'matrix':

					matrix.multiply(this.obj);

					break;

				case 'translate':

					matrix.multiply(m1.makeTranslation(this.obj.x, this.obj.y, this.obj.z));

					break;

				case 'rotate':

					matrix.multiply(m1.makeRotationAxis(this.obj, this.angle));

					break;

				case 'scale':

					matrix.scale(this.obj);

					break;

			}

		};

	}();

	Transform.prototype.update = function (data, member) {

		let members = ['X', 'Y', 'Z', 'ANGLE'];

		switch (this.type) {

			case 'matrix':

				if (!member) {

					this.obj.copy(data);

				} else if (member.length === 1) {

					switch (member[0]) {

						case 0:

							this.obj.n11 = data[0];
							this.obj.n21 = data[1];
							this.obj.n31 = data[2];
							this.obj.n41 = data[3];

							break;

						case 1:

							this.obj.n12 = data[0];
							this.obj.n22 = data[1];
							this.obj.n32 = data[2];
							this.obj.n42 = data[3];

							break;

						case 2:

							this.obj.n13 = data[0];
							this.obj.n23 = data[1];
							this.obj.n33 = data[2];
							this.obj.n43 = data[3];

							break;

						case 3:

							this.obj.n14 = data[0];
							this.obj.n24 = data[1];
							this.obj.n34 = data[2];
							this.obj.n44 = data[3];

							break;

					}

				} else if (member.length === 2) {

					let propName = 'n' + ( member[0] + 1 ) + ( member[1] + 1 );
					this.obj[propName] = data;

				} else {

					console.log('Incorrect addressing of matrix in transform.');

				}

				break;

			case 'translate':
			case 'scale':

				if (Object.prototype.toString.call(member) === '[object Array]') {

					member = members[member[0]];

				}

				switch (member) {

					case 'X':

						this.obj.x = data;
						break;

					case 'Y':

						this.obj.y = data;
						break;

					case 'Z':

						this.obj.z = data;
						break;

					default:

						this.obj.x = data[0];
						this.obj.y = data[1];
						this.obj.z = data[2];
						break;

				}

				break;

			case 'rotate':

				if (Object.prototype.toString.call(member) === '[object Array]') {

					member = members[member[0]];

				}

				switch (member) {

					case 'X':

						this.obj.x = data;
						break;

					case 'Y':

						this.obj.y = data;
						break;

					case 'Z':

						this.obj.z = data;
						break;

					case 'ANGLE':

						this.angle = THREE.Math.degToRad(data);
						break;

					default:

						this.obj.x = data[0];
						this.obj.y = data[1];
						this.obj.z = data[2];
						this.angle = THREE.Math.degToRad(data[3]);
						break;

				}
				break;

		}

	};

	function InstanceController() {

		this.url = "";
		this.skeleton = [];
		this.instance_material = [];

	};

	InstanceController.prototype.parse = function (element) {

		this.url = element.getAttribute('url').replace(/^#/, '');
		this.skeleton = [];
		this.instance_material = [];

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'skeleton':

					this.skeleton.push(child.textContent.replace(/^#/, ''));
					break;

				case 'bind_material':

					let instances = child.querySelectorAll('instance_material');

					for (let j = 0; j < instances.length; j++) {

						let instance = instances[j];
						this.instance_material.push((new InstanceMaterial()).parse(instance));

					}


					break;

				case 'extra':
					break;

				default:
					break;

			}
		}

		return this;

	};

	function InstanceMaterial() {

		this.symbol = "";
		this.target = "";

	};

	InstanceMaterial.prototype.parse = function (element) {

		this.symbol = element.getAttribute('symbol');
		this.target = element.getAttribute('target').replace(/^#/, '');
		return this;

	};

	function InstanceGeometry() {

		this.url = "";
		this.instance_material = [];

	};

	InstanceGeometry.prototype.parse = function (element) {

		this.url = element.getAttribute('url').replace(/^#/, '');
		this.instance_material = [];

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			if (child.nodeName === 'bind_material') {

				let instances = child.querySelectorAll('instance_material');

				for (let j = 0; j < instances.length; j++) {

					let instance = instances[j];
					this.instance_material.push((new InstanceMaterial()).parse(instance));

				}

				break;

			}

		}

		return this;

	};

	function Geometry() {

		this.id = "";
		this.mesh = null;

	};

	Geometry.prototype.parse = function (element) {

		this.id = element.getAttribute('id');

		extractDoubleSided(this, element);

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];

			switch (child.nodeName) {

				case 'mesh':

					this.mesh = (new Mesh(this)).parse(child);
					break;

				case 'extra':

					// console.log( child );
					break;

				default:
					break;
			}
		}

		return this;

	};

	function Mesh(geometry) {

		this.geometry = geometry.id;
		this.primitives = [];
		this.vertices = null;
		this.geometry3js = null;

	};

	Mesh.prototype.parse = function (element) {

		this.primitives = [];

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];

			switch (child.nodeName) {

				case 'source':

					_source(child);
					break;

				case 'vertices':

					this.vertices = ( new Vertices() ).parse(child);
					break;

				case 'linestrips':

					this.primitives.push(( new LineStrips().parse(child) ));
					break;

				case 'triangles':

					this.primitives.push(( new Triangles().parse(child) ));
					break;

				case 'polygons':

					this.primitives.push(( new Polygons().parse(child) ));
					break;

				case 'polylist':

					this.primitives.push(( new Polylist().parse(child) ));
					break;

				default:
					break;

			}

		}

		this.geometry3js = new THREE.Geometry();

		let vertexData = sources[this.vertices.input['POSITION'].source].data;

		for (let i = 0; i < vertexData.length; i += 3) {

			this.geometry3js.vertices.push(getConvertedVec3(vertexData, i).clone());

		}

		for (let i = 0; i < this.primitives.length; i++) {

			let primitive = this.primitives[i];
			primitive.setVertices(this.vertices);
			this.handlePrimitive(primitive, this.geometry3js);

		}

		if (this.geometry3js.calcNormals) {

			this.geometry3js.computeVertexNormals();
			delete this.geometry3js.calcNormals;

		}

		return this;

	};

	Mesh.prototype.handlePrimitive = function (primitive, geom) {

		if (primitive instanceof LineStrips) {

			// TODO: Handle indices. Maybe easier with BufferGeometry?

			geom.isLineStrip = true;
			return;

		}

		let j, k, pList = primitive.p, inputs = primitive.inputs;
		let input, index, idx32;
		let source, numParams;
		let vcIndex = 0, vcount = 3, maxOffset = 0;
		let texture_sets = [];

		for (j = 0; j < inputs.length; j++) {

			input = inputs[j];

			let offset = input.offset + 1;
			maxOffset = (maxOffset < offset) ? offset : maxOffset;

			switch (input.semantic) {

				case 'TEXCOORD':
					texture_sets.push(input.set);
					break;

			}

		}

		for (let pCount = 0; pCount < pList.length; ++pCount) {

			let p = pList[pCount], i = 0;

			while (i < p.length) {

				let vs = [];
				let ns = [];
				let ts = null;
				let cs = [];

				if (primitive.vcount) {

					vcount = primitive.vcount.length ? primitive.vcount[vcIndex++] : primitive.vcount;

				} else {

					vcount = p.length / maxOffset;

				}


				for (j = 0; j < vcount; j++) {

					for (k = 0; k < inputs.length; k++) {

						input = inputs[k];
						source = sources[input.source];

						index = p[i + ( j * maxOffset ) + input.offset];
						numParams = source.accessor.params.length;
						idx32 = index * numParams;

						switch (input.semantic) {

							case 'VERTEX':

								vs.push(index);

								break;

							case 'NORMAL':

								ns.push(getConvertedVec3(source.data, idx32));

								break;

							case 'TEXCOORD':

								ts = ts || {};
								if (ts[input.set] === undefined) ts[input.set] = [];
								// invert the V
								ts[input.set].push(new THREE.Vector2(source.data[idx32], source.data[idx32 + 1]));

								break;

							case 'COLOR':

								cs.push(new THREE.Color().setRGB(source.data[idx32], source.data[idx32 + 1], source.data[idx32 + 2]));

								break;

							default:

								break;

						}

					}

				}

				if (ns.length === 0) {

					// check the vertices inputs
					input = this.vertices.input.NORMAL;

					if (input) {

						source = sources[input.source];
						numParams = source.accessor.params.length;

						for (let ndx = 0, len = vs.length; ndx < len; ndx++) {

							ns.push(getConvertedVec3(source.data, vs[ndx] * numParams));

						}

					} else {

						geom.calcNormals = true;

					}

				}

				if (!ts) {

					ts = {};
					// check the vertices inputs
					input = this.vertices.input.TEXCOORD;

					if (input) {

						texture_sets.push(input.set);
						source = sources[input.source];
						numParams = source.accessor.params.length;

						for (let ndx = 0, len = vs.length; ndx < len; ndx++) {

							idx32 = vs[ndx] * numParams;
							if (ts[input.set] === undefined) ts[input.set] = [];
							// invert the V
							ts[input.set].push(new THREE.Vector2(source.data[idx32], 1.0 - source.data[idx32 + 1]));

						}

					}

				}

				if (cs.length === 0) {

					// check the vertices inputs
					input = this.vertices.input.COLOR;

					if (input) {

						source = sources[input.source];
						numParams = source.accessor.params.length;

						for (let ndx = 0, len = vs.length; ndx < len; ndx++) {

							idx32 = vs[ndx] * numParams;
							cs.push(new THREE.Color().setRGB(source.data[idx32], source.data[idx32 + 1], source.data[idx32 + 2]));

						}

					}

				}

				let face = null, faces = [], uv, uvArr;

				if (vcount === 3) {

					faces.push(new THREE.Face3(vs[0], vs[1], vs[2], ns, cs.length ? cs : new THREE.Color()));

				} else if (vcount === 4) {

					faces.push(new THREE.Face3(vs[0], vs[1], vs[3], [ns[0], ns[1], ns[3]], cs.length ? [cs[0], cs[1], cs[3]] : new THREE.Color()));

					faces.push(new THREE.Face3(vs[1], vs[2], vs[3], [ns[1], ns[2], ns[3]], cs.length ? [cs[1], cs[2], cs[3]] : new THREE.Color()));

				} else if (vcount > 4 && options.subdivideFaces) {

					let clr = cs.length ? cs : new THREE.Color(),
						vec1, vec2, vec3, v1, v2, norm;

					// subdivide into multiple Face3s

					for (k = 1; k < vcount - 1;) {

						// FIXME: normals don't seem to be quite right

						faces.push(new THREE.Face3(vs[0], vs[k], vs[k + 1], [ns[0], ns[k++], ns[k]], clr));

					}

				}

				if (faces.length) {

					for (let ndx = 0, len = faces.length; ndx < len; ndx++) {

						face = faces[ndx];
						face.daeMaterial = primitive.material;
						geom.faces.push(face);

						for (k = 0; k < texture_sets.length; k++) {

							uv = ts[texture_sets[k]];

							if (vcount > 4) {

								// Grab the right UVs for the vertices in this face
								uvArr = [uv[0], uv[ndx + 1], uv[ndx + 2]];

							} else if (vcount === 4) {

								if (ndx === 0) {

									uvArr = [uv[0], uv[1], uv[3]];

								} else {

									uvArr = [uv[1].clone(), uv[2], uv[3].clone()];

								}

							} else {

								uvArr = [uv[0], uv[1], uv[2]];

							}

							if (geom.faceVertexUvs[k] === undefined) {

								geom.faceVertexUvs[k] = [];

							}

							geom.faceVertexUvs[k].push(uvArr);

						}

					}

				} else {

					console.log('dropped face with vcount ' + vcount + ' for geometry with id: ' + geom.id);

				}

				i += maxOffset * vcount;

			}

		}

	};

	function Polygons() {

		this.material = "";
		this.count = 0;
		this.inputs = [];
		this.vcount = null;
		this.p = [];
		this.geometry = new THREE.Geometry();

	};

	Polygons.prototype.setVertices = function (vertices) {

		for (let i = 0; i < this.inputs.length; i++) {

			if (this.inputs[i].source === vertices.id) {

				this.inputs[i].source = vertices.input['POSITION'].source;

			}

		}

	};

	Polygons.prototype.parse = function (element) {

		this.material = element.getAttribute('material');
		this.count = _attr_as_int(element, 'count', 0);

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];

			switch (child.nodeName) {

				case 'input':

					this.inputs.push(( new Input() ).parse(element.childNodes[i]));
					break;

				case 'vcount':

					this.vcount = _ints(child.textContent);
					break;

				case 'p':

					this.p.push(_ints(child.textContent));
					break;

				case 'ph':

					console.warn('polygon holes not yet supported!');
					break;

				default:
					break;

			}

		}

		return this;

	};

	function Polylist() {

		Polygons.call(this);

		this.vcount = [];

	};

	Polylist.prototype = Object.create(Polygons.prototype);

	function LineStrips() {

		Polygons.call(this);

		this.vcount = 1;

	};

	LineStrips.prototype = Object.create(Polygons.prototype);

	function Triangles() {

		Polygons.call(this);

		this.vcount = 3;

	};

	Triangles.prototype = Object.create(Polygons.prototype);

	function Accessor() {

		this.source = "";
		this.count = 0;
		this.stride = 0;
		this.params = [];

	};

	Accessor.prototype.parse = function (element) {

		this.params = [];
		this.source = element.getAttribute('source');
		this.count = _attr_as_int(element, 'count', 0);
		this.stride = _attr_as_int(element, 'stride', 0);

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];

			if (child.nodeName === 'param') {

				let param = {};
				param['name'] = child.getAttribute('name');
				param['type'] = child.getAttribute('type');
				this.params.push(param);

			}

		}

		return this;

	};

	function Vertices() {

		this.input = {};

	};

	Vertices.prototype.parse = function (element) {

		this.id = element.getAttribute('id');

		for (let i = 0; i < element.childNodes.length; i++) {

			if (element.childNodes[i].nodeName === 'input') {

				let input = ( new Input() ).parse(element.childNodes[i]);
				this.input[input.semantic] = input;

			}

		}

		return this;

	};

	function Input() {

		this.semantic = "";
		this.offset = 0;
		this.source = "";
		this.set = 0;

	};

	Input.prototype.parse = function (element) {

		this.semantic = element.getAttribute('semantic');
		this.source = element.getAttribute('source').replace(/^#/, '');
		this.set = _attr_as_int(element, 'set', -1);
		this.offset = _attr_as_int(element, 'offset', 0);

		if (this.semantic === 'TEXCOORD' && this.set < 0) {

			this.set = 0;

		}

		return this;

	};

	function Source(id) {

		this.id = id;
		this.type = null;

	};

	Source.prototype.parse = function (element) {

		this.id = element.getAttribute('id');

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];

			switch (child.nodeName) {

				case 'bool_array':

					this.data = _bools(child.textContent);
					this.type = child.nodeName;
					break;

				case 'float_array':

					this.data = _floats(child.textContent);
					this.type = child.nodeName;
					break;

				case 'int_array':

					this.data = _ints(child.textContent);
					this.type = child.nodeName;
					break;

				case 'IDREF_array':
				case 'Name_array':

					this.data = _strings(child.textContent);
					this.type = child.nodeName;
					break;

				case 'technique_common':

					for (let j = 0; j < child.childNodes.length; j++) {

						if (child.childNodes[j].nodeName === 'accessor') {

							this.accessor = ( new Accessor() ).parse(child.childNodes[j]);
							break;

						}
					}
					break;

				default:
					// console.log(child.nodeName);
					break;

			}

		}

		return this;

	};

	Source.prototype.read = function () {

		let result = [];

		//for (let i = 0; i < this.accessor.params.length; i++) {

		let param = this.accessor.params[0];

		//console.log(param.name + " " + param.type);

		switch (param.type) {

			case 'IDREF':
			case 'Name':
			case 'name':
			case 'float':

				return this.data;

			case 'float4x4':

				for (let j = 0; j < this.data.length; j += 16) {

					let s = this.data.slice(j, j + 16);
					let m = getConvertedMat4(s);
					result.push(m);
				}

				break;

			default:

				console.log('ColladaLoader: Source: Read dont know how to read ' + param.type + '.');
				break;

		}

		//}

		return result;

	};

	function Material() {

		this.id = "";
		this.name = "";
		this.instance_effect = null;

	};

	Material.prototype.parse = function (element) {

		this.id = element.getAttribute('id');
		this.name = element.getAttribute('name');

		for (let i = 0; i < element.childNodes.length; i++) {

			if (element.childNodes[i].nodeName === 'instance_effect') {

				this.instance_effect = ( new InstanceEffect() ).parse(element.childNodes[i]);
				break;

			}

		}

		return this;

	};

	function ColorOrTexture() {

		this.color = new THREE.Color();
		this.color.setRGB(Math.random(), Math.random(), Math.random());
		this.color.a = 1.0;

		this.texture = null;
		this.texcoord = null;
		this.texOpts = null;

	};

	ColorOrTexture.prototype.isColor = function () {

		return ( this.texture === null );

	};

	ColorOrTexture.prototype.isTexture = function () {

		return ( this.texture !== null );

	};

	ColorOrTexture.prototype.parse = function (element) {

		if (element.nodeName === 'transparent') {

			this.opaque = element.getAttribute('opaque');

		}

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'color':

					let rgba = _floats(child.textContent);
					this.color = new THREE.Color();
					this.color.setRGB(rgba[0], rgba[1], rgba[2]);
					this.color.a = rgba[3];
					break;

				case 'texture':

					this.texture = child.getAttribute('texture');
					this.texcoord = child.getAttribute('texcoord');
					// Defaults from:
					// https://collada.org/mediawiki/index.php/Maya_texture_placement_MAYA_extension
					this.texOpts = {
						offsetU: 0,
						offsetV: 0,
						repeatU: 1,
						repeatV: 1,
						wrapU: 1,
						wrapV: 1
					};
					this.parseTexture(child);
					break;

				default:
					break;

			}

		}

		return this;

	};

	ColorOrTexture.prototype.parseTexture = function (element) {

		if (!element.childNodes) return this;

		// This should be supported by Maya, 3dsMax, and MotionBuilder

		if (element.childNodes[1] && element.childNodes[1].nodeName === 'extra') {

			element = element.childNodes[1];

			if (element.childNodes[1] && element.childNodes[1].nodeName === 'technique') {

				element = element.childNodes[1];

			}

		}

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];

			switch (child.nodeName) {

				case 'offsetU':
				case 'offsetV':
				case 'repeatU':
				case 'repeatV':

					this.texOpts[child.nodeName] = parseFloat(child.textContent);

					break;

				case 'wrapU':
				case 'wrapV':

					// some dae have a value of true which becomes NaN via parseInt

					if (child.textContent.toUpperCase() === 'TRUE') {

						this.texOpts[child.nodeName] = 1;

					} else {

						this.texOpts[child.nodeName] = parseInt(child.textContent);

					}
					break;

				default:

					this.texOpts[child.nodeName] = child.textContent;

					break;

			}

		}

		return this;

	};

	function Shader(type, effect) {

		this.type = type;
		this.effect = effect;
		this.material = null;

	};

	Shader.prototype.parse = function (element) {

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'ambient':
				case 'emission':
				case 'diffuse':
				case 'specular':
				case 'transparent':

					this[child.nodeName] = ( new ColorOrTexture() ).parse(child);
					break;

				case 'bump':

					// If 'bumptype' is 'heightfield', create a 'bump' property
					// Else if 'bumptype' is 'normalmap', create a 'normal' property
					// (Default to 'bump')
					let bumpType = child.getAttribute('bumptype');
					if (bumpType) {
						if (bumpType.toLowerCase() === "heightfield") {
							this['bump'] = ( new ColorOrTexture() ).parse(child);
						} else if (bumpType.toLowerCase() === "normalmap") {
							this['normal'] = ( new ColorOrTexture() ).parse(child);
						} else {
							console.error("Shader.prototype.parse: Invalid value for attribute 'bumptype' (" + bumpType +
								") - valid bumptypes are 'HEIGHTFIELD' and 'NORMALMAP' - defaulting to 'HEIGHTFIELD'");
							this['bump'] = ( new ColorOrTexture() ).parse(child);
						}
					} else {
						console.warn("Shader.prototype.parse: Attribute 'bumptype' missing from bump node - defaulting to 'HEIGHTFIELD'");
						this['bump'] = ( new ColorOrTexture() ).parse(child);
					}

					break;

				case 'shininess':
				case 'reflectivity':
				case 'index_of_refraction':
				case 'transparency':

					let f = child.querySelectorAll('float');

					if (f.length > 0)
						this[child.nodeName] = parseFloat(f[0].textContent);

					break;

				default:
					break;

			}

		}

		this.create();
		return this;

	};

	Shader.prototype.create = function () {

		let props = {};

		let transparent = false;

		if (this['transparency'] !== undefined && this['transparent'] !== undefined) {
			// convert transparent color RBG to average value
			let transparentColor = this['transparent'];
			let transparencyLevel = (this.transparent.color.r + this.transparent.color.g + this.transparent.color.b) / 3 * this.transparency;

			if (transparencyLevel > 0) {
				transparent = true;
				props['transparent'] = true;
				props['opacity'] = 1 - transparencyLevel;

			}

		}

		let keys = {
			'diffuse': 'map',
			'ambient': 'lightMap',
			'specular': 'specularMap',
			'emission': 'emissionMap',
			'bump': 'bumpMap',
			'normal': 'normalMap'
		};

		for (let prop in this) {

			switch (prop) {

				case 'ambient':
				case 'emission':
				case 'diffuse':
				case 'specular':
				case 'bump':
				case 'normal':

					let cot = this[prop];

					if (cot instanceof ColorOrTexture) {

						if (cot.isTexture()) {

							let samplerId = cot.texture;
							let surfaceId = this.effect.sampler[samplerId];

							if (surfaceId !== undefined && surfaceId.source !== undefined) {

								let surface = this.effect.surface[surfaceId.source];

								if (surface !== undefined) {

									let image = images[surface.init_from];

									if (image) {

										let url = baseUrl + image.init_from;

										let texture;
										let loader = THREE.Loader.Handlers.get(url);

										if (loader !== null) {

											texture = loader.load(url);

										} else {

											texture = new THREE.Texture();

											loadTextureImage(texture, url);

										}

										texture.wrapS = cot.texOpts.wrapU ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
										texture.wrapT = cot.texOpts.wrapV ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
										texture.offset.x = cot.texOpts.offsetU;
										texture.offset.y = cot.texOpts.offsetV;
										texture.repeat.x = cot.texOpts.repeatU;
										texture.repeat.y = cot.texOpts.repeatV;
										props[keys[prop]] = texture;

										// Texture with baked lighting?
										if (prop === 'emission') props['emissive'] = 0xffffff;

									}

								}

							}

						} else if (prop === 'diffuse' || !transparent) {

							if (prop === 'emission') {

								props['emissive'] = cot.color.getHex();

							} else {

								props[prop] = cot.color.getHex();

							}

						}

					}

					break;

				case 'shininess':

					props[prop] = this[prop];
					break;

				case 'reflectivity':

					props[prop] = this[prop];
					if (props[prop] > 0.0) props['envMap'] = options.defaultEnvMap;
					props['combine'] = THREE.MixOperation;	//mix regular shading with reflective component
					break;

				case 'index_of_refraction':

					props['refractionRatio'] = this[prop]; //TODO: "index_of_refraction" becomes "refractionRatio" in shader, but I'm not sure if the two are actually comparable
					if (this[prop] !== 1.0) props['envMap'] = options.defaultEnvMap;
					break;

				case 'transparency':
					// gets figured out up top
					break;

				default:
					break;

			}

		}

		props['shading'] = preferredShading;
		props['side'] = this.effect.doubleSided ? THREE.DoubleSide : THREE.FrontSide;

		switch (this.type) {

			case 'constant':

				if (props.emissive !== undefined) props.color = props.emissive;
				this.material = new THREE.MeshBasicMaterial(props);
				break;

			case 'phong':
			case 'blinn':

				if (props.diffuse !== undefined) props.color = props.diffuse;
				this.material = new THREE.MeshPhongMaterial(props);
				break;

			case 'lambert':
			default:

				if (props.diffuse !== undefined) props.color = props.diffuse;
				this.material = new THREE.MeshLambertMaterial(props);
				break;

		}

		return this.material;

	};

	function Surface(effect) {

		this.effect = effect;
		this.init_from = null;
		this.format = null;

	};

	Surface.prototype.parse = function (element) {

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'init_from':

					this.init_from = child.textContent;
					break;

				case 'format':

					this.format = child.textContent;
					break;

				default:

					console.log("unhandled Surface prop: " + child.nodeName);
					break;

			}

		}

		return this;

	};

	function Sampler2D(effect) {

		this.effect = effect;
		this.source = null;
		this.wrap_s = null;
		this.wrap_t = null;
		this.minfilter = null;
		this.magfilter = null;
		this.mipfilter = null;

	};

	Sampler2D.prototype.parse = function (element) {

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'source':

					this.source = child.textContent;
					break;

				case 'minfilter':

					this.minfilter = child.textContent;
					break;

				case 'magfilter':

					this.magfilter = child.textContent;
					break;

				case 'mipfilter':

					this.mipfilter = child.textContent;
					break;

				case 'wrap_s':

					this.wrap_s = child.textContent;
					break;

				case 'wrap_t':

					this.wrap_t = child.textContent;
					break;

				default:

					console.log("unhandled Sampler2D prop: " + child.nodeName);
					break;

			}

		}

		return this;

	};

	function Effect() {

		this.id = "";
		this.name = "";
		this.shader = null;
		this.surface = {};
		this.sampler = {};

	};

	Effect.prototype.create = function () {

		if (this.shader === null) {

			return null;

		}

	};

	Effect.prototype.parse = function (element) {

		this.id = element.getAttribute('id');
		this.name = element.getAttribute('name');

		extractDoubleSided(this, element);

		this.shader = null;

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'profile_COMMON':

					this.parseTechnique(this.parseProfileCOMMON(child));
					break;

				default:
					break;

			}

		}

		return this;

	};

	Effect.prototype.parseNewparam = function (element) {

		let sid = element.getAttribute('sid');

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'surface':

					this.surface[sid] = ( new Surface(this) ).parse(child);
					break;

				case 'sampler2D':

					this.sampler[sid] = ( new Sampler2D(this) ).parse(child);
					break;

				case 'extra':

					break;

				default:

					console.log(child.nodeName);
					break;

			}

		}

	};

	Effect.prototype.parseProfileCOMMON = function (element) {

		let technique;

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];

			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'profile_COMMON':

					this.parseProfileCOMMON(child);
					break;

				case 'technique':

					technique = child;
					break;

				case 'newparam':

					this.parseNewparam(child);
					break;

				case 'image':

					let _image = ( new _Image() ).parse(child);
					images[_image.id] = _image;
					break;

				case 'extra':
					break;

				default:

					console.log(child.nodeName);
					break;

			}

		}

		return technique;

	};

	Effect.prototype.parseTechnique = function (element) {

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'constant':
				case 'lambert':
				case 'blinn':
				case 'phong':

					this.shader = ( new Shader(child.nodeName, this) ).parse(child);
					break;
				case 'extra':
					this.parseExtra(child);
					break;
				default:
					break;

			}

		}

	};

	Effect.prototype.parseExtra = function (element) {

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'technique':
					this.parseExtraTechnique(child);
					break;
				default:
					break;

			}

		}

	};

	Effect.prototype.parseExtraTechnique = function (element) {

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'bump':
					this.shader.parse(element);
					break;
				default:
					break;

			}

		}

	};

	function InstanceEffect() {

		this.url = "";

	};

	InstanceEffect.prototype.parse = function (element) {

		this.url = element.getAttribute('url').replace(/^#/, '');
		return this;

	};

	function Animation() {

		this.id = "";
		this.name = "";
		this.source = {};
		this.sampler = [];
		this.channel = [];

	};

	Animation.prototype.parse = function (element) {

		this.id = element.getAttribute('id');
		this.name = element.getAttribute('name');
		this.source = {};

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];

			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'animation':

					let anim = ( new Animation() ).parse(child);

					for (let src in anim.source) {

						this.source[src] = anim.source[src];

					}

					for (let j = 0; j < anim.channel.length; j++) {

						this.channel.push(anim.channel[j]);
						this.sampler.push(anim.sampler[j]);

					}

					break;

				case 'source':

					let src = ( new Source() ).parse(child);
					this.source[src.id] = src;
					break;

				case 'sampler':

					this.sampler.push(( new Sampler(this) ).parse(child));
					break;

				case 'channel':

					this.channel.push(( new Channel(this) ).parse(child));
					break;

				default:
					break;

			}

		}

		return this;

	};

	function Channel(animation) {

		this.animation = animation;
		this.source = "";
		this.target = "";
		this.fullSid = null;
		this.sid = null;
		this.dotSyntax = null;
		this.arrSyntax = null;
		this.arrIndices = null;
		this.member = null;

	};

	Channel.prototype.parse = function (element) {

		this.source = element.getAttribute('source').replace(/^#/, '');
		this.target = element.getAttribute('target');

		let parts = this.target.split('/');

		let id = parts.shift();
		let sid = parts.shift();

		let dotSyntax = ( sid.indexOf(".") >= 0 );
		let arrSyntax = ( sid.indexOf("(") >= 0 );

		if (dotSyntax) {

			parts = sid.split(".");
			this.sid = parts.shift();
			this.member = parts.shift();

		} else if (arrSyntax) {

			let arrIndices = sid.split("(");
			this.sid = arrIndices.shift();

			for (let j = 0; j < arrIndices.length; j++) {

				arrIndices[j] = parseInt(arrIndices[j].replace(/\)/, ''));

			}

			this.arrIndices = arrIndices;

		} else {

			this.sid = sid;

		}

		this.fullSid = sid;
		this.dotSyntax = dotSyntax;
		this.arrSyntax = arrSyntax;

		return this;

	};

	function Sampler(animation) {

		this.id = "";
		this.animation = animation;
		this.inputs = [];
		this.input = null;
		this.output = null;
		this.strideOut = null;
		this.interpolation = null;
		this.startTime = null;
		this.endTime = null;
		this.duration = 0;

	};

	Sampler.prototype.parse = function (element) {

		this.id = element.getAttribute('id');
		this.inputs = [];

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'input':

					this.inputs.push((new Input()).parse(child));
					break;

				default:
					break;

			}

		}

		return this;

	};

	Sampler.prototype.create = function () {

		for (let i = 0; i < this.inputs.length; i++) {

			let input = this.inputs[i];
			let source = this.animation.source[input.source];

			switch (input.semantic) {

				case 'INPUT':

					this.input = source.read();
					break;

				case 'OUTPUT':

					this.output = source.read();
					this.strideOut = source.accessor.stride;
					break;

				case 'INTERPOLATION':

					this.interpolation = source.read();
					break;

				case 'IN_TANGENT':

					break;

				case 'OUT_TANGENT':

					break;

				default:

					console.log(input.semantic);
					break;

			}

		}

		this.startTime = 0;
		this.endTime = 0;
		this.duration = 0;

		if (this.input.length) {

			this.startTime = 100000000;
			this.endTime = -100000000;

			for (let i = 0; i < this.input.length; i++) {

				this.startTime = Math.min(this.startTime, this.input[i]);
				this.endTime = Math.max(this.endTime, this.input[i]);

			}

			this.duration = this.endTime - this.startTime;

		}

	};

	Sampler.prototype.getData = function (type, ndx, member) {

		let data;

		if (type === 'matrix' && this.strideOut === 16) {

			data = this.output[ndx];

		} else if (this.strideOut > 1) {

			data = [];
			ndx *= this.strideOut;

			for (let i = 0; i < this.strideOut; ++i) {

				data[i] = this.output[ndx + i];

			}

			if (this.strideOut === 3) {

				switch (type) {

					case 'rotate':
					case 'translate':

						fixCoords(data, -1);
						break;

					case 'scale':

						fixCoords(data, 1);
						break;

				}

			} else if (this.strideOut === 4 && type === 'matrix') {

				fixCoords(data, -1);

			}

		} else {

			data = this.output[ndx];

			if (member && type === 'translate') {
				data = getConvertedTranslation(member, data);
			}

		}

		return data;

	};

	function Key(time) {

		this.targets = [];
		this.time = time;

	};

	Key.prototype.addTarget = function (fullSid, transform, member, data) {

		this.targets.push({
			sid: fullSid,
			member: member,
			transform: transform,
			data: data
		});

	};

	Key.prototype.apply = function (opt_sid) {

		for (let i = 0; i < this.targets.length; ++i) {

			let target = this.targets[i];

			if (!opt_sid || target.sid === opt_sid) {

				target.transform.update(target.data, target.member);

			}

		}

	};

	Key.prototype.getTarget = function (fullSid) {

		for (let i = 0; i < this.targets.length; ++i) {

			if (this.targets[i].sid === fullSid) {

				return this.targets[i];

			}

		}

		return null;

	};

	Key.prototype.hasTarget = function (fullSid) {

		for (let i = 0; i < this.targets.length; ++i) {

			if (this.targets[i].sid === fullSid) {

				return true;

			}

		}

		return false;

	};

	// TODO: Currently only doing linear interpolation. Should support full COLLADA spec.
	Key.prototype.interpolate = function (nextKey, time) {

		for (let i = 0, l = this.targets.length; i < l; i++) {

			let target = this.targets[i],
				nextTarget = nextKey.getTarget(target.sid),
				data;

			if (target.transform.type !== 'matrix' && nextTarget) {

				let scale = ( time - this.time ) / ( nextKey.time - this.time ),
					nextData = nextTarget.data,
					prevData = target.data;

				if (scale < 0) scale = 0;
				if (scale > 1) scale = 1;

				if (prevData.length) {

					data = [];

					for (let j = 0; j < prevData.length; ++j) {

						data[j] = prevData[j] + ( nextData[j] - prevData[j] ) * scale;

					}

				} else {

					data = prevData + ( nextData - prevData ) * scale;

				}

			} else {

				data = target.data;

			}

			target.transform.update(data, target.member);

		}

	};

	// Camera
	function Camera() {

		this.id = "";
		this.name = "";
		this.technique = "";

	};

	Camera.prototype.parse = function (element) {

		this.id = element.getAttribute('id');
		this.name = element.getAttribute('name');

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'optics':

					this.parseOptics(child);
					break;

				default:
					break;

			}

		}

		return this;

	};

	Camera.prototype.parseOptics = function (element) {

		for (let i = 0; i < element.childNodes.length; i++) {

			if (element.childNodes[i].nodeName === 'technique_common') {

				let technique = element.childNodes[i];

				for (let j = 0; j < technique.childNodes.length; j++) {

					this.technique = technique.childNodes[j].nodeName;

					if (this.technique === 'perspective') {

						let perspective = technique.childNodes[j];

						for (let k = 0; k < perspective.childNodes.length; k++) {

							let param = perspective.childNodes[k];

							switch (param.nodeName) {

								case 'yfov':
									this.yfov = param.textContent;
									break;
								case 'xfov':
									this.xfov = param.textContent;
									break;
								case 'znear':
									this.znear = param.textContent;
									break;
								case 'zfar':
									this.zfar = param.textContent;
									break;
								case 'aspect_ratio':
									this.aspect_ratio = param.textContent;
									break;

							}

						}

					} else if (this.technique === 'orthographic') {

						let orthographic = technique.childNodes[j];

						for (let k = 0; k < orthographic.childNodes.length; k++) {

							let param = orthographic.childNodes[k];

							switch (param.nodeName) {

								case 'xmag':
									this.xmag = param.textContent;
									break;
								case 'ymag':
									this.ymag = param.textContent;
									break;
								case 'znear':
									this.znear = param.textContent;
									break;
								case 'zfar':
									this.zfar = param.textContent;
									break;
								case 'aspect_ratio':
									this.aspect_ratio = param.textContent;
									break;

							}

						}

					}

				}

			}

		}

		return this;

	};

	function InstanceCamera() {

		this.url = "";

	};

	InstanceCamera.prototype.parse = function (element) {

		this.url = element.getAttribute('url').replace(/^#/, '');

		return this;

	};

	// Light

	function Light() {

		this.id = "";
		this.name = "";
		this.technique = "";

	};

	Light.prototype.parse = function (element) {

		this.id = element.getAttribute('id');
		this.name = element.getAttribute('name');

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'technique_common':

					this.parseCommon(child);
					break;

				case 'technique':

					this.parseTechnique(child);
					break;

				default:
					break;

			}

		}

		return this;

	};

	Light.prototype.parseCommon = function (element) {

		for (let i = 0; i < element.childNodes.length; i++) {

			switch (element.childNodes[i].nodeName) {

				case 'directional':
				case 'point':
				case 'spot':
				case 'ambient':

					this.technique = element.childNodes[i].nodeName;

					let light = element.childNodes[i];

					for (let j = 0; j < light.childNodes.length; j++) {

						let child = light.childNodes[j];

						switch (child.nodeName) {

							case 'color':

								let rgba = _floats(child.textContent);
								this.color = new THREE.Color(0);
								this.color.setRGB(rgba[0], rgba[1], rgba[2]);
								this.color.a = rgba[3];
								break;

							case 'falloff_angle':

								this.falloff_angle = parseFloat(child.textContent);
								break;

							case 'quadratic_attenuation':
								let f = parseFloat(child.textContent);
								this.distance = f ? Math.sqrt(1 / f) : 0;
						}

					}

			}

		}

		return this;

	};

	Light.prototype.parseTechnique = function (element) {

		this.profile = element.getAttribute('profile');

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];

			switch (child.nodeName) {

				case 'intensity':

					this.intensity = parseFloat(child.textContent);
					break;

			}

		}

		return this;

	};

	function InstanceLight() {

		this.url = "";

	};

	InstanceLight.prototype.parse = function (element) {

		this.url = element.getAttribute('url').replace(/^#/, '');

		return this;

	};

	function KinematicsModel() {

		this.id = '';
		this.name = '';
		this.joints = [];
		this.links = [];

	}

	KinematicsModel.prototype.parse = function (element) {

		this.id = element.getAttribute('id');
		this.name = element.getAttribute('name');
		this.joints = [];
		this.links = [];

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'technique_common':

					this.parseCommon(child);
					break;

				default:
					break;

			}

		}

		return this;

	};

	KinematicsModel.prototype.parseCommon = function (element) {

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (element.childNodes[i].nodeName) {

				case 'joint':
					this.joints.push((new Joint()).parse(child));
					break;

				case 'link':
					this.links.push((new Link()).parse(child));
					break;

				default:
					break;

			}

		}

		return this;

	};

	function Joint() {

		this.sid = '';
		this.name = '';
		this.axis = new THREE.Vector3();
		this.limits = {
			min: 0,
			max: 0
		};
		this.type = '';
		this.static = false;
		this.zeroPosition = 0.0;
		this.middlePosition = 0.0;

	}

	Joint.prototype.parse = function (element) {

		this.sid = element.getAttribute('sid');
		this.name = element.getAttribute('name');
		this.axis = new THREE.Vector3();
		this.limits = {
			min: 0,
			max: 0
		};
		this.type = '';
		this.static = false;
		this.zeroPosition = 0.0;
		this.middlePosition = 0.0;

		let axisElement = element.querySelector('axis');
		let _axis = _floats(axisElement.textContent);
		this.axis = getConvertedVec3(_axis, 0);

		let min = element.querySelector('limits min') ? parseFloat(element.querySelector('limits min').textContent) : -360;
		let max = element.querySelector('limits max') ? parseFloat(element.querySelector('limits max').textContent) : 360;

		this.limits = {
			min: min,
			max: max
		};

		let jointTypes = ['prismatic', 'revolute'];
		for (let i = 0; i < jointTypes.length; i++) {

			let type = jointTypes[i];

			let jointElement = element.querySelector(type);

			if (jointElement) {

				this.type = type;

			}

		}

		// if the min is equal to or somehow greater than the max, consider the joint static
		if (this.limits.min >= this.limits.max) {

			this.static = true;

		}

		this.middlePosition = (this.limits.min + this.limits.max) / 2.0;
		return this;

	};

	function Link() {

		this.sid = '';
		this.name = '';
		this.transforms = [];
		this.attachments = [];

	}

	Link.prototype.parse = function (element) {

		this.sid = element.getAttribute('sid');
		this.name = element.getAttribute('name');
		this.transforms = [];
		this.attachments = [];

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'attachment_full':
					this.attachments.push((new Attachment()).parse(child));
					break;

				case 'rotate':
				case 'translate':
				case 'matrix':

					this.transforms.push((new Transform()).parse(child));
					break;

				default:

					break;

			}

		}

		return this;

	};

	function Attachment() {

		this.joint = '';
		this.transforms = [];
		this.links = [];

	}

	Attachment.prototype.parse = function (element) {

		this.joint = element.getAttribute('joint').split('/').pop();
		this.links = [];

		for (let i = 0; i < element.childNodes.length; i++) {

			let child = element.childNodes[i];
			if (child.nodeType !== 1) continue;

			switch (child.nodeName) {

				case 'link':
					this.links.push((new Link()).parse(child));
					break;

				case 'rotate':
				case 'translate':
				case 'matrix':

					this.transforms.push((new Transform()).parse(child));
					break;

				default:

					break;

			}

		}

		return this;

	};

	function _source(element) {

		let id = element.getAttribute('id');

		if (sources[id] !== undefined) {

			return sources[id];

		}

		sources[id] = ( new Source(id)).parse(element);
		return sources[id];

	};

	function _nsResolver(nsPrefix) {

		if (nsPrefix === "dae") {

			return "http://www.collada.org/2005/11/COLLADASchema";

		}

		return null;

	};

	function _bools(str) {

		let raw = _strings(str);
		let data = [];

		for (let i = 0, l = raw.length; i < l; i++) {

			data.push((raw[i] === 'true' || raw[i] === '1') ? true : false);

		}

		return data;

	};

	function _floats(str) {

		let raw = _strings(str);
		let data = [];

		for (let i = 0, l = raw.length; i < l; i++) {

			data.push(parseFloat(raw[i]));

		}

		return data;

	};

	function _ints(str) {

		let raw = _strings(str);
		let data = [];

		for (let i = 0, l = raw.length; i < l; i++) {

			data.push(parseInt(raw[i], 10));

		}

		return data;

	};

	function _strings(str) {

		return ( str.length > 0 ) ? _trimString(str).split(/\s+/) : [];

	};

	function _trimString(str) {

		return str.replace(/^\s+/, "").replace(/\s+$/, "");

	};

	function _attr_as_float(element, name, defaultValue) {

		if (element.hasAttribute(name)) {

			return parseFloat(element.getAttribute(name));

		} else {

			return defaultValue;

		}

	};

	function _attr_as_int(element, name, defaultValue) {

		if (element.hasAttribute(name)) {

			return parseInt(element.getAttribute(name), 10);

		} else {

			return defaultValue;

		}

	};

	function _attr_as_string(element, name, defaultValue) {

		if (element.hasAttribute(name)) {

			return element.getAttribute(name);

		} else {

			return defaultValue;

		}

	};

	function _format_float(f, num) {

		if (f === undefined) {

			let s = '0.';

			while (s.length < num + 2) {

				s += '0';

			}

			return s;

		}

		num = num || 2;

		let parts = f.toString().split('.');
		parts[1] = parts.length > 1 ? parts[1].substr(0, num) : "0";

		while (parts[1].length < num) {

			parts[1] += '0';

		}

		return parts.join('.');

	};

	function loadTextureImage(texture, url) {

		loader = new THREE.ImageLoader();

		loader.load(url, function (image) {

			texture.image = image;
			texture.needsUpdate = true;

		});

	};

	function extractDoubleSided(obj, element) {

		obj.doubleSided = false;

		let node = element.querySelectorAll('extra double_sided')[0];

		if (node) {

			if (node && parseInt(node.textContent, 10) === 1) {

				obj.doubleSided = true;

			}

		}

	};

	// Up axis conversion

	function setUpConversion() {

		if (options.convertUpAxis !== true || colladaUp === options.upAxis) {

			upConversion = null;

		} else {

			switch (colladaUp) {

				case 'X':

					upConversion = options.upAxis === 'Y' ? 'XtoY' : 'XtoZ';
					break;

				case 'Y':

					upConversion = options.upAxis === 'X' ? 'YtoX' : 'YtoZ';
					break;

				case 'Z':

					upConversion = options.upAxis === 'X' ? 'ZtoX' : 'ZtoY';
					break;

			}

		}

	};

	function fixCoords(data, sign) {

		if (options.convertUpAxis !== true || colladaUp === options.upAxis) {

			return;

		}

		switch (upConversion) {

			case 'XtoY':

				var tmp = data[0];
				data[0] = sign * data[1];
				data[1] = tmp;
				break;

			case 'XtoZ':

				var tmp = data[2];
				data[2] = data[1];
				data[1] = data[0];
				data[0] = tmp;
				break;

			case 'YtoX':

				var tmp = data[0];
				data[0] = data[1];
				data[1] = sign * tmp;
				break;

			case 'YtoZ':

				var tmp = data[1];
				data[1] = sign * data[2];
				data[2] = tmp;
				break;

			case 'ZtoX':

				var tmp = data[0];
				data[0] = data[1];
				data[1] = data[2];
				data[2] = tmp;
				break;

			case 'ZtoY':

				var tmp = data[1];
				data[1] = data[2];
				data[2] = sign * tmp;
				break;

		}

	};

	function getConvertedTranslation(axis, data) {

		if (options.convertUpAxis !== true || colladaUp === options.upAxis) {

			return data;

		}

		switch (axis) {
			case 'X':
				data = upConversion === 'XtoY' ? data * -1 : data;
				break;
			case 'Y':
				data = upConversion === 'YtoZ' || upConversion === 'YtoX' ? data * -1 : data;
				break;
			case 'Z':
				data = upConversion === 'ZtoY' ? data * -1 : data;
				break;
			default:
				break;
		}

		return data;
	};

	function getConvertedVec3(data, offset) {

		let arr = [data[offset], data[offset + 1], data[offset + 2]];
		fixCoords(arr, -1);
		return new THREE.Vector3(arr[0], arr[1], arr[2]);

	};

	function getConvertedMat4(data) {

		if (options.convertUpAxis) {

			// First fix rotation and scale

			// Columns first
			let arr = [data[0], data[4], data[8]];
			fixCoords(arr, -1);
			data[0] = arr[0];
			data[4] = arr[1];
			data[8] = arr[2];
			arr = [data[1], data[5], data[9]];
			fixCoords(arr, -1);
			data[1] = arr[0];
			data[5] = arr[1];
			data[9] = arr[2];
			arr = [data[2], data[6], data[10]];
			fixCoords(arr, -1);
			data[2] = arr[0];
			data[6] = arr[1];
			data[10] = arr[2];
			// Rows second
			arr = [data[0], data[1], data[2]];
			fixCoords(arr, -1);
			data[0] = arr[0];
			data[1] = arr[1];
			data[2] = arr[2];
			arr = [data[4], data[5], data[6]];
			fixCoords(arr, -1);
			data[4] = arr[0];
			data[5] = arr[1];
			data[6] = arr[2];
			arr = [data[8], data[9], data[10]];
			fixCoords(arr, -1);
			data[8] = arr[0];
			data[9] = arr[1];
			data[10] = arr[2];

			// Now fix translation
			arr = [data[3], data[7], data[11]];
			fixCoords(arr, -1);
			data[3] = arr[0];
			data[7] = arr[1];
			data[11] = arr[2];

		}

		return new THREE.Matrix4().set(
			data[0], data[1], data[2], data[3],
			data[4], data[5], data[6], data[7],
			data[8], data[9], data[10], data[11],
			data[12], data[13], data[14], data[15]
		);

	};

	function getConvertedIndex(index) {

		if (index > -1 && index < 3) {

			let members = ['X', 'Y', 'Z'],
				indices = {X: 0, Y: 1, Z: 2};

			index = getConvertedMember(members[index]);
			index = indices[index];

		}

		return index;

	};

	function getConvertedMember(member) {

		if (options.convertUpAxis) {

			switch (member) {

				case 'X':

					switch (upConversion) {

						case 'XtoY':
						case 'XtoZ':
						case 'YtoX':

							member = 'Y';
							break;

						case 'ZtoX':

							member = 'Z';
							break;

					}

					break;

				case 'Y':

					switch (upConversion) {

						case 'XtoY':
						case 'YtoX':
						case 'ZtoX':

							member = 'X';
							break;

						case 'XtoZ':
						case 'YtoZ':
						case 'ZtoY':

							member = 'Z';
							break;

					}

					break;

				case 'Z':

					switch (upConversion) {

						case 'XtoZ':

							member = 'X';
							break;

						case 'YtoZ':
						case 'ZtoX':
						case 'ZtoY':

							member = 'Y';
							break;

					}

					break;

			}

		}

		return member;

	};

	return {

		load: load,
		parse: parse,
		setPreferredShading: setPreferredShading,
		applySkin: applySkin,
		geometries: geometries,
		options: options

	};

};
