/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal.js";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const shared = $root.shared = (() => {

	/**
	 * Namespace shared.
	 * @exports shared
	 * @namespace
	 */
	const shared = {};

	shared.Ball = (function() {

		/**
		 * Properties of a Ball.
		 * @memberof shared
		 * @interface IBall
		 * @property {number|null} [id] Ball id
		 * @property {number|null} [x] Ball x
		 * @property {number|null} [y] Ball y
		 * @property {number|null} [vx] Ball vx
		 * @property {number|null} [vy] Ball vy
		 */

		/**
		 * Constructs a new Ball.
		 * @memberof shared
		 * @classdesc Represents a Ball.
		 * @implements IBall
		 * @constructor
		 * @param {shared.IBall=} [properties] Properties to set
		 */
		function Ball(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * Ball id.
		 * @member {number} id
		 * @memberof shared.Ball
		 * @instance
		 */
		Ball.prototype.id = 0;

		/**
		 * Ball x.
		 * @member {number} x
		 * @memberof shared.Ball
		 * @instance
		 */
		Ball.prototype.x = 0;

		/**
		 * Ball y.
		 * @member {number} y
		 * @memberof shared.Ball
		 * @instance
		 */
		Ball.prototype.y = 0;

		/**
		 * Ball vx.
		 * @member {number} vx
		 * @memberof shared.Ball
		 * @instance
		 */
		Ball.prototype.vx = 0;

		/**
		 * Ball vy.
		 * @member {number} vy
		 * @memberof shared.Ball
		 * @instance
		 */
		Ball.prototype.vy = 0;

		/**
		 * Creates a new Ball instance using the specified properties.
		 * @function create
		 * @memberof shared.Ball
		 * @static
		 * @param {shared.IBall=} [properties] Properties to set
		 * @returns {shared.Ball} Ball instance
		 */
		Ball.create = function create(properties) {
			return new Ball(properties);
		};

		/**
		 * Encodes the specified Ball message. Does not implicitly {@link shared.Ball.verify|verify} messages.
		 * @function encode
		 * @memberof shared.Ball
		 * @static
		 * @param {shared.IBall} message Ball message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Ball.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.id != null && Object.hasOwnProperty.call(message, "id"))
				writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
			if (message.x != null && Object.hasOwnProperty.call(message, "x"))
				writer.uint32(/* id 2, wireType 0 =*/16).int32(message.x);
			if (message.y != null && Object.hasOwnProperty.call(message, "y"))
				writer.uint32(/* id 3, wireType 0 =*/24).int32(message.y);
			if (message.vx != null && Object.hasOwnProperty.call(message, "vx"))
				writer.uint32(/* id 4, wireType 0 =*/32).int32(message.vx);
			if (message.vy != null && Object.hasOwnProperty.call(message, "vy"))
				writer.uint32(/* id 5, wireType 0 =*/40).int32(message.vy);
			return writer;
		};

		/**
		 * Encodes the specified Ball message, length delimited. Does not implicitly {@link shared.Ball.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.Ball
		 * @static
		 * @param {shared.IBall} message Ball message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Ball.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a Ball message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.Ball
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.Ball} Ball
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Ball.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.Ball();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.id = reader.int32();
						break;
					}
					case 2: {
						message.x = reader.int32();
						break;
					}
					case 3: {
						message.y = reader.int32();
						break;
					}
					case 4: {
						message.vx = reader.int32();
						break;
					}
					case 5: {
						message.vy = reader.int32();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a Ball message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.Ball
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.Ball} Ball
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Ball.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a Ball message.
		 * @function verify
		 * @memberof shared.Ball
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		Ball.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.id != null && message.hasOwnProperty("id"))
				if (!$util.isInteger(message.id))
					return "id: integer expected";
			if (message.x != null && message.hasOwnProperty("x"))
				if (!$util.isInteger(message.x))
					return "x: integer expected";
			if (message.y != null && message.hasOwnProperty("y"))
				if (!$util.isInteger(message.y))
					return "y: integer expected";
			if (message.vx != null && message.hasOwnProperty("vx"))
				if (!$util.isInteger(message.vx))
					return "vx: integer expected";
			if (message.vy != null && message.hasOwnProperty("vy"))
				if (!$util.isInteger(message.vy))
					return "vy: integer expected";
			return null;
		};

		/**
		 * Creates a Ball message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.Ball
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.Ball} Ball
		 */
		Ball.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.Ball)
				return object;
			let message = new $root.shared.Ball();
			if (object.id != null)
				message.id = object.id | 0;
			if (object.x != null)
				message.x = object.x | 0;
			if (object.y != null)
				message.y = object.y | 0;
			if (object.vx != null)
				message.vx = object.vx | 0;
			if (object.vy != null)
				message.vy = object.vy | 0;
			return message;
		};

		/**
		 * Creates a plain object from a Ball message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.Ball
		 * @static
		 * @param {shared.Ball} message Ball
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		Ball.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.defaults) {
				object.id = 0;
				object.x = 0;
				object.y = 0;
				object.vx = 0;
				object.vy = 0;
			}
			if (message.id != null && message.hasOwnProperty("id"))
				object.id = message.id;
			if (message.x != null && message.hasOwnProperty("x"))
				object.x = message.x;
			if (message.y != null && message.hasOwnProperty("y"))
				object.y = message.y;
			if (message.vx != null && message.hasOwnProperty("vx"))
				object.vx = message.vx;
			if (message.vy != null && message.hasOwnProperty("vy"))
				object.vy = message.vy;
			return object;
		};

		/**
		 * Converts this Ball to JSON.
		 * @function toJSON
		 * @memberof shared.Ball
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		Ball.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for Ball
		 * @function getTypeUrl
		 * @memberof shared.Ball
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		Ball.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.Ball";
		};

		return Ball;
	})();

	shared.Paddle = (function() {

		/**
		 * Properties of a Paddle.
		 * @memberof shared
		 * @interface IPaddle
		 * @property {number|null} [id] Paddle id
		 * @property {number|null} [move] Paddle move
		 * @property {boolean|null} [dead] Paddle dead
		 */

		/**
		 * Constructs a new Paddle.
		 * @memberof shared
		 * @classdesc Represents a Paddle.
		 * @implements IPaddle
		 * @constructor
		 * @param {shared.IPaddle=} [properties] Properties to set
		 */
		function Paddle(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * Paddle id.
		 * @member {number} id
		 * @memberof shared.Paddle
		 * @instance
		 */
		Paddle.prototype.id = 0;

		/**
		 * Paddle move.
		 * @member {number} move
		 * @memberof shared.Paddle
		 * @instance
		 */
		Paddle.prototype.move = 0;

		/**
		 * Paddle dead.
		 * @member {boolean} dead
		 * @memberof shared.Paddle
		 * @instance
		 */
		Paddle.prototype.dead = false;

		/**
		 * Creates a new Paddle instance using the specified properties.
		 * @function create
		 * @memberof shared.Paddle
		 * @static
		 * @param {shared.IPaddle=} [properties] Properties to set
		 * @returns {shared.Paddle} Paddle instance
		 */
		Paddle.create = function create(properties) {
			return new Paddle(properties);
		};

		/**
		 * Encodes the specified Paddle message. Does not implicitly {@link shared.Paddle.verify|verify} messages.
		 * @function encode
		 * @memberof shared.Paddle
		 * @static
		 * @param {shared.IPaddle} message Paddle message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Paddle.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.id != null && Object.hasOwnProperty.call(message, "id"))
				writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
			if (message.move != null && Object.hasOwnProperty.call(message, "move"))
				writer.uint32(/* id 2, wireType 0 =*/16).int32(message.move);
			if (message.dead != null && Object.hasOwnProperty.call(message, "dead"))
				writer.uint32(/* id 3, wireType 0 =*/24).bool(message.dead);
			return writer;
		};

		/**
		 * Encodes the specified Paddle message, length delimited. Does not implicitly {@link shared.Paddle.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.Paddle
		 * @static
		 * @param {shared.IPaddle} message Paddle message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Paddle.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a Paddle message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.Paddle
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.Paddle} Paddle
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Paddle.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.Paddle();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.id = reader.int32();
						break;
					}
					case 2: {
						message.move = reader.int32();
						break;
					}
					case 3: {
						message.dead = reader.bool();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a Paddle message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.Paddle
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.Paddle} Paddle
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Paddle.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a Paddle message.
		 * @function verify
		 * @memberof shared.Paddle
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		Paddle.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.id != null && message.hasOwnProperty("id"))
				if (!$util.isInteger(message.id))
					return "id: integer expected";
			if (message.move != null && message.hasOwnProperty("move"))
				if (!$util.isInteger(message.move))
					return "move: integer expected";
			if (message.dead != null && message.hasOwnProperty("dead"))
				if (typeof message.dead !== "boolean")
					return "dead: boolean expected";
			return null;
		};

		/**
		 * Creates a Paddle message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.Paddle
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.Paddle} Paddle
		 */
		Paddle.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.Paddle)
				return object;
			let message = new $root.shared.Paddle();
			if (object.id != null)
				message.id = object.id | 0;
			if (object.move != null)
				message.move = object.move | 0;
			if (object.dead != null)
				message.dead = Boolean(object.dead);
			return message;
		};

		/**
		 * Creates a plain object from a Paddle message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.Paddle
		 * @static
		 * @param {shared.Paddle} message Paddle
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		Paddle.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.defaults) {
				object.id = 0;
				object.move = 0;
				object.dead = false;
			}
			if (message.id != null && message.hasOwnProperty("id"))
				object.id = message.id;
			if (message.move != null && message.hasOwnProperty("move"))
				object.move = message.move;
			if (message.dead != null && message.hasOwnProperty("dead"))
				object.dead = message.dead;
			return object;
		};

		/**
		 * Converts this Paddle to JSON.
		 * @function toJSON
		 * @memberof shared.Paddle
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		Paddle.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for Paddle
		 * @function getTypeUrl
		 * @memberof shared.Paddle
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		Paddle.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.Paddle";
		};

		return Paddle;
	})();

	shared.PaddleInput = (function() {

		/**
		 * Properties of a PaddleInput.
		 * @memberof shared
		 * @interface IPaddleInput
		 * @property {number|null} [id] PaddleInput id
		 * @property {number|null} [move] PaddleInput move
		 */

		/**
		 * Constructs a new PaddleInput.
		 * @memberof shared
		 * @classdesc Represents a PaddleInput.
		 * @implements IPaddleInput
		 * @constructor
		 * @param {shared.IPaddleInput=} [properties] Properties to set
		 */
		function PaddleInput(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * PaddleInput id.
		 * @member {number} id
		 * @memberof shared.PaddleInput
		 * @instance
		 */
		PaddleInput.prototype.id = 0;

		/**
		 * PaddleInput move.
		 * @member {number} move
		 * @memberof shared.PaddleInput
		 * @instance
		 */
		PaddleInput.prototype.move = 0;

		/**
		 * Creates a new PaddleInput instance using the specified properties.
		 * @function create
		 * @memberof shared.PaddleInput
		 * @static
		 * @param {shared.IPaddleInput=} [properties] Properties to set
		 * @returns {shared.PaddleInput} PaddleInput instance
		 */
		PaddleInput.create = function create(properties) {
			return new PaddleInput(properties);
		};

		/**
		 * Encodes the specified PaddleInput message. Does not implicitly {@link shared.PaddleInput.verify|verify} messages.
		 * @function encode
		 * @memberof shared.PaddleInput
		 * @static
		 * @param {shared.IPaddleInput} message PaddleInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PaddleInput.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.id != null && Object.hasOwnProperty.call(message, "id"))
				writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
			if (message.move != null && Object.hasOwnProperty.call(message, "move"))
				writer.uint32(/* id 2, wireType 0 =*/16).int32(message.move);
			return writer;
		};

		/**
		 * Encodes the specified PaddleInput message, length delimited. Does not implicitly {@link shared.PaddleInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.PaddleInput
		 * @static
		 * @param {shared.IPaddleInput} message PaddleInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PaddleInput.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a PaddleInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.PaddleInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.PaddleInput} PaddleInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PaddleInput.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.PaddleInput();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.id = reader.int32();
						break;
					}
					case 2: {
						message.move = reader.int32();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a PaddleInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.PaddleInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.PaddleInput} PaddleInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PaddleInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a PaddleInput message.
		 * @function verify
		 * @memberof shared.PaddleInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		PaddleInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.id != null && message.hasOwnProperty("id"))
				if (!$util.isInteger(message.id))
					return "id: integer expected";
			if (message.move != null && message.hasOwnProperty("move"))
				if (!$util.isInteger(message.move))
					return "move: integer expected";
			return null;
		};

		/**
		 * Creates a PaddleInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.PaddleInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.PaddleInput} PaddleInput
		 */
		PaddleInput.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.PaddleInput)
				return object;
			let message = new $root.shared.PaddleInput();
			if (object.id != null)
				message.id = object.id | 0;
			if (object.move != null)
				message.move = object.move | 0;
			return message;
		};

		/**
		 * Creates a plain object from a PaddleInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.PaddleInput
		 * @static
		 * @param {shared.PaddleInput} message PaddleInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		PaddleInput.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.defaults) {
				object.id = 0;
				object.move = 0;
			}
			if (message.id != null && message.hasOwnProperty("id"))
				object.id = message.id;
			if (message.move != null && message.hasOwnProperty("move"))
				object.move = message.move;
			return object;
		};

		/**
		 * Converts this PaddleInput to JSON.
		 * @function toJSON
		 * @memberof shared.PaddleInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		PaddleInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for PaddleInput
		 * @function getTypeUrl
		 * @memberof shared.PaddleInput
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		PaddleInput.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.PaddleInput";
		};

		return PaddleInput;
	})();

	shared.Goal = (function() {

		/**
		 * Properties of a Goal.
		 * @memberof shared
		 * @interface IGoal
		 * @property {number|null} [scorerId] Goal scorerId
		 */

		/**
		 * Constructs a new Goal.
		 * @memberof shared
		 * @classdesc Represents a Goal.
		 * @implements IGoal
		 * @constructor
		 * @param {shared.IGoal=} [properties] Properties to set
		 */
		function Goal(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * Goal scorerId.
		 * @member {number} scorerId
		 * @memberof shared.Goal
		 * @instance
		 */
		Goal.prototype.scorerId = 0;

		/**
		 * Creates a new Goal instance using the specified properties.
		 * @function create
		 * @memberof shared.Goal
		 * @static
		 * @param {shared.IGoal=} [properties] Properties to set
		 * @returns {shared.Goal} Goal instance
		 */
		Goal.create = function create(properties) {
			return new Goal(properties);
		};

		/**
		 * Encodes the specified Goal message. Does not implicitly {@link shared.Goal.verify|verify} messages.
		 * @function encode
		 * @memberof shared.Goal
		 * @static
		 * @param {shared.IGoal} message Goal message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Goal.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.scorerId != null && Object.hasOwnProperty.call(message, "scorerId"))
				writer.uint32(/* id 1, wireType 0 =*/8).int32(message.scorerId);
			return writer;
		};

		/**
		 * Encodes the specified Goal message, length delimited. Does not implicitly {@link shared.Goal.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.Goal
		 * @static
		 * @param {shared.IGoal} message Goal message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Goal.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a Goal message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.Goal
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.Goal} Goal
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Goal.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.Goal();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.scorerId = reader.int32();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a Goal message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.Goal
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.Goal} Goal
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Goal.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a Goal message.
		 * @function verify
		 * @memberof shared.Goal
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		Goal.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.scorerId != null && message.hasOwnProperty("scorerId"))
				if (!$util.isInteger(message.scorerId))
					return "scorerId: integer expected";
			return null;
		};

		/**
		 * Creates a Goal message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.Goal
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.Goal} Goal
		 */
		Goal.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.Goal)
				return object;
			let message = new $root.shared.Goal();
			if (object.scorerId != null)
				message.scorerId = object.scorerId | 0;
			return message;
		};

		/**
		 * Creates a plain object from a Goal message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.Goal
		 * @static
		 * @param {shared.Goal} message Goal
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		Goal.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.defaults)
				object.scorerId = 0;
			if (message.scorerId != null && message.hasOwnProperty("scorerId"))
				object.scorerId = message.scorerId;
			return object;
		};

		/**
		 * Converts this Goal to JSON.
		 * @function toJSON
		 * @memberof shared.Goal
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		Goal.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for Goal
		 * @function getTypeUrl
		 * @memberof shared.Goal
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		Goal.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.Goal";
		};

		return Goal;
	})();

	shared.MatchState = (function() {

		/**
		 * Properties of a MatchState.
		 * @memberof shared
		 * @interface IMatchState
		 * @property {string|null} [gameId] MatchState gameId
		 * @property {number|Long|null} [tick] MatchState tick
		 * @property {Array.<shared.IBall>|null} [balls] MatchState balls
		 * @property {Array.<shared.IPaddle>|null} [paddles] MatchState paddles
		 * @property {Array.<number>|null} [score] MatchState score
		 * @property {Array.<number>|null} [ranks] MatchState ranks
		 * @property {number|null} [stage] MatchState stage
		 */

		/**
		 * Constructs a new MatchState.
		 * @memberof shared
		 * @classdesc Represents a MatchState.
		 * @implements IMatchState
		 * @constructor
		 * @param {shared.IMatchState=} [properties] Properties to set
		 */
		function MatchState(properties) {
			this.balls = [];
			this.paddles = [];
			this.score = [];
			this.ranks = [];
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * MatchState gameId.
		 * @member {string} gameId
		 * @memberof shared.MatchState
		 * @instance
		 */
		MatchState.prototype.gameId = "";

		/**
		 * MatchState tick.
		 * @member {number|Long} tick
		 * @memberof shared.MatchState
		 * @instance
		 */
		MatchState.prototype.tick = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

		/**
		 * MatchState balls.
		 * @member {Array.<shared.IBall>} balls
		 * @memberof shared.MatchState
		 * @instance
		 */
		MatchState.prototype.balls = $util.emptyArray;

		/**
		 * MatchState paddles.
		 * @member {Array.<shared.IPaddle>} paddles
		 * @memberof shared.MatchState
		 * @instance
		 */
		MatchState.prototype.paddles = $util.emptyArray;

		/**
		 * MatchState score.
		 * @member {Array.<number>} score
		 * @memberof shared.MatchState
		 * @instance
		 */
		MatchState.prototype.score = $util.emptyArray;

		/**
		 * MatchState ranks.
		 * @member {Array.<number>} ranks
		 * @memberof shared.MatchState
		 * @instance
		 */
		MatchState.prototype.ranks = $util.emptyArray;

		/**
		 * MatchState stage.
		 * @member {number} stage
		 * @memberof shared.MatchState
		 * @instance
		 */
		MatchState.prototype.stage = 0;

		/**
		 * Creates a new MatchState instance using the specified properties.
		 * @function create
		 * @memberof shared.MatchState
		 * @static
		 * @param {shared.IMatchState=} [properties] Properties to set
		 * @returns {shared.MatchState} MatchState instance
		 */
		MatchState.create = function create(properties) {
			return new MatchState(properties);
		};

		/**
		 * Encodes the specified MatchState message. Does not implicitly {@link shared.MatchState.verify|verify} messages.
		 * @function encode
		 * @memberof shared.MatchState
		 * @static
		 * @param {shared.IMatchState} message MatchState message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MatchState.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
				writer.uint32(/* id 1, wireType 2 =*/10).string(message.gameId);
			if (message.tick != null && Object.hasOwnProperty.call(message, "tick"))
				writer.uint32(/* id 2, wireType 0 =*/16).int64(message.tick);
			if (message.balls != null && message.balls.length)
				for (let i = 0; i < message.balls.length; ++i)
					$root.shared.Ball.encode(message.balls[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
			if (message.paddles != null && message.paddles.length)
				for (let i = 0; i < message.paddles.length; ++i)
					$root.shared.Paddle.encode(message.paddles[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
			if (message.score != null && message.score.length) {
				writer.uint32(/* id 5, wireType 2 =*/42).fork();
				for (let i = 0; i < message.score.length; ++i)
					writer.int32(message.score[i]);
				writer.ldelim();
			}
			if (message.ranks != null && message.ranks.length) {
				writer.uint32(/* id 6, wireType 2 =*/50).fork();
				for (let i = 0; i < message.ranks.length; ++i)
					writer.int32(message.ranks[i]);
				writer.ldelim();
			}
			if (message.stage != null && Object.hasOwnProperty.call(message, "stage"))
				writer.uint32(/* id 7, wireType 0 =*/56).int32(message.stage);
			return writer;
		};

		/**
		 * Encodes the specified MatchState message, length delimited. Does not implicitly {@link shared.MatchState.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.MatchState
		 * @static
		 * @param {shared.IMatchState} message MatchState message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MatchState.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a MatchState message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.MatchState
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.MatchState} MatchState
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MatchState.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.MatchState();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.gameId = reader.string();
						break;
					}
					case 2: {
						message.tick = reader.int64();
						break;
					}
					case 3: {
						if (!(message.balls && message.balls.length))
							message.balls = [];
						message.balls.push($root.shared.Ball.decode(reader, reader.uint32()));
						break;
					}
					case 4: {
						if (!(message.paddles && message.paddles.length))
							message.paddles = [];
						message.paddles.push($root.shared.Paddle.decode(reader, reader.uint32()));
						break;
					}
					case 5: {
						if (!(message.score && message.score.length))
							message.score = [];
						if ((tag & 7) === 2) {
							let end2 = reader.uint32() + reader.pos;
							while (reader.pos < end2)
								message.score.push(reader.int32());
						} else
							message.score.push(reader.int32());
						break;
					}
					case 6: {
						if (!(message.ranks && message.ranks.length))
							message.ranks = [];
						if ((tag & 7) === 2) {
							let end2 = reader.uint32() + reader.pos;
							while (reader.pos < end2)
								message.ranks.push(reader.int32());
						} else
							message.ranks.push(reader.int32());
						break;
					}
					case 7: {
						message.stage = reader.int32();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a MatchState message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.MatchState
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.MatchState} MatchState
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MatchState.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a MatchState message.
		 * @function verify
		 * @memberof shared.MatchState
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		MatchState.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.gameId != null && message.hasOwnProperty("gameId"))
				if (!$util.isString(message.gameId))
					return "gameId: string expected";
			if (message.tick != null && message.hasOwnProperty("tick"))
				if (!$util.isInteger(message.tick) && !(message.tick && $util.isInteger(message.tick.low) && $util.isInteger(message.tick.high)))
					return "tick: integer|Long expected";
			if (message.balls != null && message.hasOwnProperty("balls")) {
				if (!Array.isArray(message.balls))
					return "balls: array expected";
				for (let i = 0; i < message.balls.length; ++i) {
					let error = $root.shared.Ball.verify(message.balls[i]);
					if (error)
						return "balls." + error;
				}
			}
			if (message.paddles != null && message.hasOwnProperty("paddles")) {
				if (!Array.isArray(message.paddles))
					return "paddles: array expected";
				for (let i = 0; i < message.paddles.length; ++i) {
					let error = $root.shared.Paddle.verify(message.paddles[i]);
					if (error)
						return "paddles." + error;
				}
			}
			if (message.score != null && message.hasOwnProperty("score")) {
				if (!Array.isArray(message.score))
					return "score: array expected";
				for (let i = 0; i < message.score.length; ++i)
					if (!$util.isInteger(message.score[i]))
						return "score: integer[] expected";
			}
			if (message.ranks != null && message.hasOwnProperty("ranks")) {
				if (!Array.isArray(message.ranks))
					return "ranks: array expected";
				for (let i = 0; i < message.ranks.length; ++i)
					if (!$util.isInteger(message.ranks[i]))
						return "ranks: integer[] expected";
			}
			if (message.stage != null && message.hasOwnProperty("stage"))
				if (!$util.isInteger(message.stage))
					return "stage: integer expected";
			return null;
		};

		/**
		 * Creates a MatchState message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.MatchState
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.MatchState} MatchState
		 */
		MatchState.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.MatchState)
				return object;
			let message = new $root.shared.MatchState();
			if (object.gameId != null)
				message.gameId = String(object.gameId);
			if (object.tick != null)
				if ($util.Long)
					(message.tick = $util.Long.fromValue(object.tick)).unsigned = false;
				else if (typeof object.tick === "string")
					message.tick = parseInt(object.tick, 10);
				else if (typeof object.tick === "number")
					message.tick = object.tick;
				else if (typeof object.tick === "object")
					message.tick = new $util.LongBits(object.tick.low >>> 0, object.tick.high >>> 0).toNumber();
			if (object.balls) {
				if (!Array.isArray(object.balls))
					throw TypeError(".shared.MatchState.balls: array expected");
				message.balls = [];
				for (let i = 0; i < object.balls.length; ++i) {
					if (typeof object.balls[i] !== "object")
						throw TypeError(".shared.MatchState.balls: object expected");
					message.balls[i] = $root.shared.Ball.fromObject(object.balls[i]);
				}
			}
			if (object.paddles) {
				if (!Array.isArray(object.paddles))
					throw TypeError(".shared.MatchState.paddles: array expected");
				message.paddles = [];
				for (let i = 0; i < object.paddles.length; ++i) {
					if (typeof object.paddles[i] !== "object")
						throw TypeError(".shared.MatchState.paddles: object expected");
					message.paddles[i] = $root.shared.Paddle.fromObject(object.paddles[i]);
				}
			}
			if (object.score) {
				if (!Array.isArray(object.score))
					throw TypeError(".shared.MatchState.score: array expected");
				message.score = [];
				for (let i = 0; i < object.score.length; ++i)
					message.score[i] = object.score[i] | 0;
			}
			if (object.ranks) {
				if (!Array.isArray(object.ranks))
					throw TypeError(".shared.MatchState.ranks: array expected");
				message.ranks = [];
				for (let i = 0; i < object.ranks.length; ++i)
					message.ranks[i] = object.ranks[i] | 0;
			}
			if (object.stage != null)
				message.stage = object.stage | 0;
			return message;
		};

		/**
		 * Creates a plain object from a MatchState message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.MatchState
		 * @static
		 * @param {shared.MatchState} message MatchState
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		MatchState.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.arrays || options.defaults) {
				object.balls = [];
				object.paddles = [];
				object.score = [];
				object.ranks = [];
			}
			if (options.defaults) {
				object.gameId = "";
				if ($util.Long) {
					let long = new $util.Long(0, 0, false);
					object.tick = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
				} else
					object.tick = options.longs === String ? "0" : 0;
				object.stage = 0;
			}
			if (message.gameId != null && message.hasOwnProperty("gameId"))
				object.gameId = message.gameId;
			if (message.tick != null && message.hasOwnProperty("tick"))
				if (typeof message.tick === "number")
					object.tick = options.longs === String ? String(message.tick) : message.tick;
				else
					object.tick = options.longs === String ? $util.Long.prototype.toString.call(message.tick) : options.longs === Number ? new $util.LongBits(message.tick.low >>> 0, message.tick.high >>> 0).toNumber() : message.tick;
			if (message.balls && message.balls.length) {
				object.balls = [];
				for (let j = 0; j < message.balls.length; ++j)
					object.balls[j] = $root.shared.Ball.toObject(message.balls[j], options);
			}
			if (message.paddles && message.paddles.length) {
				object.paddles = [];
				for (let j = 0; j < message.paddles.length; ++j)
					object.paddles[j] = $root.shared.Paddle.toObject(message.paddles[j], options);
			}
			if (message.score && message.score.length) {
				object.score = [];
				for (let j = 0; j < message.score.length; ++j)
					object.score[j] = message.score[j];
			}
			if (message.ranks && message.ranks.length) {
				object.ranks = [];
				for (let j = 0; j < message.ranks.length; ++j)
					object.ranks[j] = message.ranks[j];
			}
			if (message.stage != null && message.hasOwnProperty("stage"))
				object.stage = message.stage;
			return object;
		};

		/**
		 * Converts this MatchState to JSON.
		 * @function toJSON
		 * @memberof shared.MatchState
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		MatchState.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for MatchState
		 * @function getTypeUrl
		 * @memberof shared.MatchState
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		MatchState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.MatchState";
		};

		return MatchState;
	})();

	shared.MatchCreateRequest = (function() {

		/**
		 * Properties of a MatchCreateRequest.
		 * @memberof shared
		 * @interface IMatchCreateRequest
		 * @property {Array.<string>|null} [players] MatchCreateRequest players
		 */

		/**
		 * Constructs a new MatchCreateRequest.
		 * @memberof shared
		 * @classdesc Represents a MatchCreateRequest.
		 * @implements IMatchCreateRequest
		 * @constructor
		 * @param {shared.IMatchCreateRequest=} [properties] Properties to set
		 */
		function MatchCreateRequest(properties) {
			this.players = [];
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * MatchCreateRequest players.
		 * @member {Array.<string>} players
		 * @memberof shared.MatchCreateRequest
		 * @instance
		 */
		MatchCreateRequest.prototype.players = $util.emptyArray;

		/**
		 * Creates a new MatchCreateRequest instance using the specified properties.
		 * @function create
		 * @memberof shared.MatchCreateRequest
		 * @static
		 * @param {shared.IMatchCreateRequest=} [properties] Properties to set
		 * @returns {shared.MatchCreateRequest} MatchCreateRequest instance
		 */
		MatchCreateRequest.create = function create(properties) {
			return new MatchCreateRequest(properties);
		};

		/**
		 * Encodes the specified MatchCreateRequest message. Does not implicitly {@link shared.MatchCreateRequest.verify|verify} messages.
		 * @function encode
		 * @memberof shared.MatchCreateRequest
		 * @static
		 * @param {shared.IMatchCreateRequest} message MatchCreateRequest message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MatchCreateRequest.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.players != null && message.players.length)
				for (let i = 0; i < message.players.length; ++i)
					writer.uint32(/* id 1, wireType 2 =*/10).string(message.players[i]);
			return writer;
		};

		/**
		 * Encodes the specified MatchCreateRequest message, length delimited. Does not implicitly {@link shared.MatchCreateRequest.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.MatchCreateRequest
		 * @static
		 * @param {shared.IMatchCreateRequest} message MatchCreateRequest message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MatchCreateRequest.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a MatchCreateRequest message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.MatchCreateRequest
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.MatchCreateRequest} MatchCreateRequest
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MatchCreateRequest.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.MatchCreateRequest();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						if (!(message.players && message.players.length))
							message.players = [];
						message.players.push(reader.string());
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a MatchCreateRequest message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.MatchCreateRequest
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.MatchCreateRequest} MatchCreateRequest
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MatchCreateRequest.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a MatchCreateRequest message.
		 * @function verify
		 * @memberof shared.MatchCreateRequest
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		MatchCreateRequest.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.players != null && message.hasOwnProperty("players")) {
				if (!Array.isArray(message.players))
					return "players: array expected";
				for (let i = 0; i < message.players.length; ++i)
					if (!$util.isString(message.players[i]))
						return "players: string[] expected";
			}
			return null;
		};

		/**
		 * Creates a MatchCreateRequest message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.MatchCreateRequest
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.MatchCreateRequest} MatchCreateRequest
		 */
		MatchCreateRequest.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.MatchCreateRequest)
				return object;
			let message = new $root.shared.MatchCreateRequest();
			if (object.players) {
				if (!Array.isArray(object.players))
					throw TypeError(".shared.MatchCreateRequest.players: array expected");
				message.players = [];
				for (let i = 0; i < object.players.length; ++i)
					message.players[i] = String(object.players[i]);
			}
			return message;
		};

		/**
		 * Creates a plain object from a MatchCreateRequest message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.MatchCreateRequest
		 * @static
		 * @param {shared.MatchCreateRequest} message MatchCreateRequest
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		MatchCreateRequest.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.arrays || options.defaults)
				object.players = [];
			if (message.players && message.players.length) {
				object.players = [];
				for (let j = 0; j < message.players.length; ++j)
					object.players[j] = message.players[j];
			}
			return object;
		};

		/**
		 * Converts this MatchCreateRequest to JSON.
		 * @function toJSON
		 * @memberof shared.MatchCreateRequest
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		MatchCreateRequest.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for MatchCreateRequest
		 * @function getTypeUrl
		 * @memberof shared.MatchCreateRequest
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		MatchCreateRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.MatchCreateRequest";
		};

		return MatchCreateRequest;
	})();

	shared.MatchCreateResponse = (function() {

		/**
		 * Properties of a MatchCreateResponse.
		 * @memberof shared
		 * @interface IMatchCreateResponse
		 * @property {string|null} [gameId] MatchCreateResponse gameId
		 */

		/**
		 * Constructs a new MatchCreateResponse.
		 * @memberof shared
		 * @classdesc Represents a MatchCreateResponse.
		 * @implements IMatchCreateResponse
		 * @constructor
		 * @param {shared.IMatchCreateResponse=} [properties] Properties to set
		 */
		function MatchCreateResponse(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * MatchCreateResponse gameId.
		 * @member {string} gameId
		 * @memberof shared.MatchCreateResponse
		 * @instance
		 */
		MatchCreateResponse.prototype.gameId = "";

		/**
		 * Creates a new MatchCreateResponse instance using the specified properties.
		 * @function create
		 * @memberof shared.MatchCreateResponse
		 * @static
		 * @param {shared.IMatchCreateResponse=} [properties] Properties to set
		 * @returns {shared.MatchCreateResponse} MatchCreateResponse instance
		 */
		MatchCreateResponse.create = function create(properties) {
			return new MatchCreateResponse(properties);
		};

		/**
		 * Encodes the specified MatchCreateResponse message. Does not implicitly {@link shared.MatchCreateResponse.verify|verify} messages.
		 * @function encode
		 * @memberof shared.MatchCreateResponse
		 * @static
		 * @param {shared.IMatchCreateResponse} message MatchCreateResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MatchCreateResponse.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
				writer.uint32(/* id 1, wireType 2 =*/10).string(message.gameId);
			return writer;
		};

		/**
		 * Encodes the specified MatchCreateResponse message, length delimited. Does not implicitly {@link shared.MatchCreateResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.MatchCreateResponse
		 * @static
		 * @param {shared.IMatchCreateResponse} message MatchCreateResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MatchCreateResponse.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a MatchCreateResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.MatchCreateResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.MatchCreateResponse} MatchCreateResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MatchCreateResponse.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.MatchCreateResponse();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.gameId = reader.string();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a MatchCreateResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.MatchCreateResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.MatchCreateResponse} MatchCreateResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MatchCreateResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a MatchCreateResponse message.
		 * @function verify
		 * @memberof shared.MatchCreateResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		MatchCreateResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.gameId != null && message.hasOwnProperty("gameId"))
				if (!$util.isString(message.gameId))
					return "gameId: string expected";
			return null;
		};

		/**
		 * Creates a MatchCreateResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.MatchCreateResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.MatchCreateResponse} MatchCreateResponse
		 */
		MatchCreateResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.MatchCreateResponse)
				return object;
			let message = new $root.shared.MatchCreateResponse();
			if (object.gameId != null)
				message.gameId = String(object.gameId);
			return message;
		};

		/**
		 * Creates a plain object from a MatchCreateResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.MatchCreateResponse
		 * @static
		 * @param {shared.MatchCreateResponse} message MatchCreateResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		MatchCreateResponse.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.defaults)
				object.gameId = "";
			if (message.gameId != null && message.hasOwnProperty("gameId"))
				object.gameId = message.gameId;
			return object;
		};

		/**
		 * Converts this MatchCreateResponse to JSON.
		 * @function toJSON
		 * @memberof shared.MatchCreateResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		MatchCreateResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for MatchCreateResponse
		 * @function getTypeUrl
		 * @memberof shared.MatchCreateResponse
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		MatchCreateResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.MatchCreateResponse";
		};

		return MatchCreateResponse;
	})();

	shared.MatchSetup = (function() {

		/**
		 * Properties of a MatchSetup.
		 * @memberof shared
		 * @interface IMatchSetup
		 * @property {Array.<string>|null} [players] MatchSetup players
		 */

		/**
		 * Constructs a new MatchSetup.
		 * @memberof shared
		 * @classdesc Represents a MatchSetup.
		 * @implements IMatchSetup
		 * @constructor
		 * @param {shared.IMatchSetup=} [properties] Properties to set
		 */
		function MatchSetup(properties) {
			this.players = [];
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * MatchSetup players.
		 * @member {Array.<string>} players
		 * @memberof shared.MatchSetup
		 * @instance
		 */
		MatchSetup.prototype.players = $util.emptyArray;

		/**
		 * Creates a new MatchSetup instance using the specified properties.
		 * @function create
		 * @memberof shared.MatchSetup
		 * @static
		 * @param {shared.IMatchSetup=} [properties] Properties to set
		 * @returns {shared.MatchSetup} MatchSetup instance
		 */
		MatchSetup.create = function create(properties) {
			return new MatchSetup(properties);
		};

		/**
		 * Encodes the specified MatchSetup message. Does not implicitly {@link shared.MatchSetup.verify|verify} messages.
		 * @function encode
		 * @memberof shared.MatchSetup
		 * @static
		 * @param {shared.IMatchSetup} message MatchSetup message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MatchSetup.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.players != null && message.players.length)
				for (let i = 0; i < message.players.length; ++i)
					writer.uint32(/* id 1, wireType 2 =*/10).string(message.players[i]);
			return writer;
		};

		/**
		 * Encodes the specified MatchSetup message, length delimited. Does not implicitly {@link shared.MatchSetup.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.MatchSetup
		 * @static
		 * @param {shared.IMatchSetup} message MatchSetup message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MatchSetup.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a MatchSetup message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.MatchSetup
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.MatchSetup} MatchSetup
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MatchSetup.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.MatchSetup();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						if (!(message.players && message.players.length))
							message.players = [];
						message.players.push(reader.string());
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a MatchSetup message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.MatchSetup
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.MatchSetup} MatchSetup
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MatchSetup.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a MatchSetup message.
		 * @function verify
		 * @memberof shared.MatchSetup
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		MatchSetup.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.players != null && message.hasOwnProperty("players")) {
				if (!Array.isArray(message.players))
					return "players: array expected";
				for (let i = 0; i < message.players.length; ++i)
					if (!$util.isString(message.players[i]))
						return "players: string[] expected";
			}
			return null;
		};

		/**
		 * Creates a MatchSetup message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.MatchSetup
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.MatchSetup} MatchSetup
		 */
		MatchSetup.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.MatchSetup)
				return object;
			let message = new $root.shared.MatchSetup();
			if (object.players) {
				if (!Array.isArray(object.players))
					throw TypeError(".shared.MatchSetup.players: array expected");
				message.players = [];
				for (let i = 0; i < object.players.length; ++i)
					message.players[i] = String(object.players[i]);
			}
			return message;
		};

		/**
		 * Creates a plain object from a MatchSetup message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.MatchSetup
		 * @static
		 * @param {shared.MatchSetup} message MatchSetup
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		MatchSetup.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.arrays || options.defaults)
				object.players = [];
			if (message.players && message.players.length) {
				object.players = [];
				for (let j = 0; j < message.players.length; ++j)
					object.players[j] = message.players[j];
			}
			return object;
		};

		/**
		 * Converts this MatchSetup to JSON.
		 * @function toJSON
		 * @memberof shared.MatchSetup
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		MatchSetup.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for MatchSetup
		 * @function getTypeUrl
		 * @memberof shared.MatchSetup
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		MatchSetup.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.MatchSetup";
		};

		return MatchSetup;
	})();

	shared.MatchInput = (function() {

		/**
		 * Properties of a MatchInput.
		 * @memberof shared
		 * @interface IMatchInput
		 * @property {number|null} [paddleId] MatchInput paddleId
		 * @property {number|null} [move] MatchInput move
		 */

		/**
		 * Constructs a new MatchInput.
		 * @memberof shared
		 * @classdesc Represents a MatchInput.
		 * @implements IMatchInput
		 * @constructor
		 * @param {shared.IMatchInput=} [properties] Properties to set
		 */
		function MatchInput(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * MatchInput paddleId.
		 * @member {number} paddleId
		 * @memberof shared.MatchInput
		 * @instance
		 */
		MatchInput.prototype.paddleId = 0;

		/**
		 * MatchInput move.
		 * @member {number} move
		 * @memberof shared.MatchInput
		 * @instance
		 */
		MatchInput.prototype.move = 0;

		/**
		 * Creates a new MatchInput instance using the specified properties.
		 * @function create
		 * @memberof shared.MatchInput
		 * @static
		 * @param {shared.IMatchInput=} [properties] Properties to set
		 * @returns {shared.MatchInput} MatchInput instance
		 */
		MatchInput.create = function create(properties) {
			return new MatchInput(properties);
		};

		/**
		 * Encodes the specified MatchInput message. Does not implicitly {@link shared.MatchInput.verify|verify} messages.
		 * @function encode
		 * @memberof shared.MatchInput
		 * @static
		 * @param {shared.IMatchInput} message MatchInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MatchInput.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.paddleId != null && Object.hasOwnProperty.call(message, "paddleId"))
				writer.uint32(/* id 1, wireType 0 =*/8).int32(message.paddleId);
			if (message.move != null && Object.hasOwnProperty.call(message, "move"))
				writer.uint32(/* id 2, wireType 0 =*/16).int32(message.move);
			return writer;
		};

		/**
		 * Encodes the specified MatchInput message, length delimited. Does not implicitly {@link shared.MatchInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.MatchInput
		 * @static
		 * @param {shared.IMatchInput} message MatchInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MatchInput.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a MatchInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.MatchInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.MatchInput} MatchInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MatchInput.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.MatchInput();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.paddleId = reader.int32();
						break;
					}
					case 2: {
						message.move = reader.int32();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a MatchInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.MatchInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.MatchInput} MatchInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MatchInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a MatchInput message.
		 * @function verify
		 * @memberof shared.MatchInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		MatchInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.paddleId != null && message.hasOwnProperty("paddleId"))
				if (!$util.isInteger(message.paddleId))
					return "paddleId: integer expected";
			if (message.move != null && message.hasOwnProperty("move"))
				if (!$util.isInteger(message.move))
					return "move: integer expected";
			return null;
		};

		/**
		 * Creates a MatchInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.MatchInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.MatchInput} MatchInput
		 */
		MatchInput.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.MatchInput)
				return object;
			let message = new $root.shared.MatchInput();
			if (object.paddleId != null)
				message.paddleId = object.paddleId | 0;
			if (object.move != null)
				message.move = object.move | 0;
			return message;
		};

		/**
		 * Creates a plain object from a MatchInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.MatchInput
		 * @static
		 * @param {shared.MatchInput} message MatchInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		MatchInput.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.defaults) {
				object.paddleId = 0;
				object.move = 0;
			}
			if (message.paddleId != null && message.hasOwnProperty("paddleId"))
				object.paddleId = message.paddleId;
			if (message.move != null && message.hasOwnProperty("move"))
				object.move = message.move;
			return object;
		};

		/**
		 * Converts this MatchInput to JSON.
		 * @function toJSON
		 * @memberof shared.MatchInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		MatchInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for MatchInput
		 * @function getTypeUrl
		 * @memberof shared.MatchInput
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		MatchInput.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.MatchInput";
		};

		return MatchInput;
	})();

	shared.MatchQuit = (function() {

		/**
		 * Properties of a MatchQuit.
		 * @memberof shared
		 * @interface IMatchQuit
		 * @property {string|null} [uuid] MatchQuit uuid
		 */

		/**
		 * Constructs a new MatchQuit.
		 * @memberof shared
		 * @classdesc Represents a MatchQuit.
		 * @implements IMatchQuit
		 * @constructor
		 * @param {shared.IMatchQuit=} [properties] Properties to set
		 */
		function MatchQuit(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * MatchQuit uuid.
		 * @member {string} uuid
		 * @memberof shared.MatchQuit
		 * @instance
		 */
		MatchQuit.prototype.uuid = "";

		/**
		 * Creates a new MatchQuit instance using the specified properties.
		 * @function create
		 * @memberof shared.MatchQuit
		 * @static
		 * @param {shared.IMatchQuit=} [properties] Properties to set
		 * @returns {shared.MatchQuit} MatchQuit instance
		 */
		MatchQuit.create = function create(properties) {
			return new MatchQuit(properties);
		};

		/**
		 * Encodes the specified MatchQuit message. Does not implicitly {@link shared.MatchQuit.verify|verify} messages.
		 * @function encode
		 * @memberof shared.MatchQuit
		 * @static
		 * @param {shared.IMatchQuit} message MatchQuit message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MatchQuit.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
				writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
			return writer;
		};

		/**
		 * Encodes the specified MatchQuit message, length delimited. Does not implicitly {@link shared.MatchQuit.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.MatchQuit
		 * @static
		 * @param {shared.IMatchQuit} message MatchQuit message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MatchQuit.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a MatchQuit message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.MatchQuit
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.MatchQuit} MatchQuit
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MatchQuit.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.MatchQuit();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.uuid = reader.string();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a MatchQuit message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.MatchQuit
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.MatchQuit} MatchQuit
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MatchQuit.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a MatchQuit message.
		 * @function verify
		 * @memberof shared.MatchQuit
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		MatchQuit.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.uuid != null && message.hasOwnProperty("uuid"))
				if (!$util.isString(message.uuid))
					return "uuid: string expected";
			return null;
		};

		/**
		 * Creates a MatchQuit message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.MatchQuit
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.MatchQuit} MatchQuit
		 */
		MatchQuit.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.MatchQuit)
				return object;
			let message = new $root.shared.MatchQuit();
			if (object.uuid != null)
				message.uuid = String(object.uuid);
			return message;
		};

		/**
		 * Creates a plain object from a MatchQuit message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.MatchQuit
		 * @static
		 * @param {shared.MatchQuit} message MatchQuit
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		MatchQuit.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.defaults)
				object.uuid = "";
			if (message.uuid != null && message.hasOwnProperty("uuid"))
				object.uuid = message.uuid;
			return object;
		};

		/**
		 * Converts this MatchQuit to JSON.
		 * @function toJSON
		 * @memberof shared.MatchQuit
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		MatchQuit.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for MatchQuit
		 * @function getTypeUrl
		 * @memberof shared.MatchQuit
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		MatchQuit.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.MatchQuit";
		};

		return MatchQuit;
	})();

	shared.MatchStart = (function() {

		/**
		 * Properties of a MatchStart.
		 * @memberof shared
		 * @interface IMatchStart
		 */

		/**
		 * Constructs a new MatchStart.
		 * @memberof shared
		 * @classdesc Represents a MatchStart.
		 * @implements IMatchStart
		 * @constructor
		 * @param {shared.IMatchStart=} [properties] Properties to set
		 */
		function MatchStart(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * Creates a new MatchStart instance using the specified properties.
		 * @function create
		 * @memberof shared.MatchStart
		 * @static
		 * @param {shared.IMatchStart=} [properties] Properties to set
		 * @returns {shared.MatchStart} MatchStart instance
		 */
		MatchStart.create = function create(properties) {
			return new MatchStart(properties);
		};

		/**
		 * Encodes the specified MatchStart message. Does not implicitly {@link shared.MatchStart.verify|verify} messages.
		 * @function encode
		 * @memberof shared.MatchStart
		 * @static
		 * @param {shared.IMatchStart} message MatchStart message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MatchStart.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			return writer;
		};

		/**
		 * Encodes the specified MatchStart message, length delimited. Does not implicitly {@link shared.MatchStart.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.MatchStart
		 * @static
		 * @param {shared.IMatchStart} message MatchStart message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MatchStart.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a MatchStart message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.MatchStart
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.MatchStart} MatchStart
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MatchStart.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.MatchStart();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a MatchStart message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.MatchStart
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.MatchStart} MatchStart
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MatchStart.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a MatchStart message.
		 * @function verify
		 * @memberof shared.MatchStart
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		MatchStart.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			return null;
		};

		/**
		 * Creates a MatchStart message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.MatchStart
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.MatchStart} MatchStart
		 */
		MatchStart.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.MatchStart)
				return object;
			return new $root.shared.MatchStart();
		};

		/**
		 * Creates a plain object from a MatchStart message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.MatchStart
		 * @static
		 * @param {shared.MatchStart} message MatchStart
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		MatchStart.toObject = function toObject() {
			return {};
		};

		/**
		 * Converts this MatchStart to JSON.
		 * @function toJSON
		 * @memberof shared.MatchStart
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		MatchStart.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for MatchStart
		 * @function getTypeUrl
		 * @memberof shared.MatchStart
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		MatchStart.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.MatchStart";
		};

		return MatchStart;
	})();

	shared.MatchEnd = (function() {

		/**
		 * Properties of a MatchEnd.
		 * @memberof shared
		 * @interface IMatchEnd
		 * @property {number|null} [winner] MatchEnd winner
		 */

		/**
		 * Constructs a new MatchEnd.
		 * @memberof shared
		 * @classdesc Represents a MatchEnd.
		 * @implements IMatchEnd
		 * @constructor
		 * @param {shared.IMatchEnd=} [properties] Properties to set
		 */
		function MatchEnd(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * MatchEnd winner.
		 * @member {number} winner
		 * @memberof shared.MatchEnd
		 * @instance
		 */
		MatchEnd.prototype.winner = 0;

		/**
		 * Creates a new MatchEnd instance using the specified properties.
		 * @function create
		 * @memberof shared.MatchEnd
		 * @static
		 * @param {shared.IMatchEnd=} [properties] Properties to set
		 * @returns {shared.MatchEnd} MatchEnd instance
		 */
		MatchEnd.create = function create(properties) {
			return new MatchEnd(properties);
		};

		/**
		 * Encodes the specified MatchEnd message. Does not implicitly {@link shared.MatchEnd.verify|verify} messages.
		 * @function encode
		 * @memberof shared.MatchEnd
		 * @static
		 * @param {shared.IMatchEnd} message MatchEnd message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MatchEnd.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.winner != null && Object.hasOwnProperty.call(message, "winner"))
				writer.uint32(/* id 1, wireType 0 =*/8).int32(message.winner);
			return writer;
		};

		/**
		 * Encodes the specified MatchEnd message, length delimited. Does not implicitly {@link shared.MatchEnd.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.MatchEnd
		 * @static
		 * @param {shared.IMatchEnd} message MatchEnd message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MatchEnd.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a MatchEnd message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.MatchEnd
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.MatchEnd} MatchEnd
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MatchEnd.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.MatchEnd();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.winner = reader.int32();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a MatchEnd message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.MatchEnd
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.MatchEnd} MatchEnd
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MatchEnd.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a MatchEnd message.
		 * @function verify
		 * @memberof shared.MatchEnd
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		MatchEnd.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.winner != null && message.hasOwnProperty("winner"))
				if (!$util.isInteger(message.winner))
					return "winner: integer expected";
			return null;
		};

		/**
		 * Creates a MatchEnd message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.MatchEnd
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.MatchEnd} MatchEnd
		 */
		MatchEnd.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.MatchEnd)
				return object;
			let message = new $root.shared.MatchEnd();
			if (object.winner != null)
				message.winner = object.winner | 0;
			return message;
		};

		/**
		 * Creates a plain object from a MatchEnd message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.MatchEnd
		 * @static
		 * @param {shared.MatchEnd} message MatchEnd
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		MatchEnd.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.defaults)
				object.winner = 0;
			if (message.winner != null && message.hasOwnProperty("winner"))
				object.winner = message.winner;
			return object;
		};

		/**
		 * Converts this MatchEnd to JSON.
		 * @function toJSON
		 * @memberof shared.MatchEnd
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		MatchEnd.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for MatchEnd
		 * @function getTypeUrl
		 * @memberof shared.MatchEnd
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		MatchEnd.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.MatchEnd";
		};

		return MatchEnd;
	})();

	shared.UserStatus = (function() {

		/**
		 * Properties of a UserStatus.
		 * @memberof shared
		 * @interface IUserStatus
		 * @property {string|null} [uuid] UserStatus uuid
		 * @property {string|null} [lobbyId] UserStatus lobbyId
		 * @property {string|null} [status] UserStatus status
		 */

		/**
		 * Constructs a new UserStatus.
		 * @memberof shared
		 * @classdesc Represents a UserStatus.
		 * @implements IUserStatus
		 * @constructor
		 * @param {shared.IUserStatus=} [properties] Properties to set
		 */
		function UserStatus(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * UserStatus uuid.
		 * @member {string} uuid
		 * @memberof shared.UserStatus
		 * @instance
		 */
		UserStatus.prototype.uuid = "";

		/**
		 * UserStatus lobbyId.
		 * @member {string} lobbyId
		 * @memberof shared.UserStatus
		 * @instance
		 */
		UserStatus.prototype.lobbyId = "";

		/**
		 * UserStatus status.
		 * @member {string} status
		 * @memberof shared.UserStatus
		 * @instance
		 */
		UserStatus.prototype.status = "";

		/**
		 * Creates a new UserStatus instance using the specified properties.
		 * @function create
		 * @memberof shared.UserStatus
		 * @static
		 * @param {shared.IUserStatus=} [properties] Properties to set
		 * @returns {shared.UserStatus} UserStatus instance
		 */
		UserStatus.create = function create(properties) {
			return new UserStatus(properties);
		};

		/**
		 * Encodes the specified UserStatus message. Does not implicitly {@link shared.UserStatus.verify|verify} messages.
		 * @function encode
		 * @memberof shared.UserStatus
		 * @static
		 * @param {shared.IUserStatus} message UserStatus message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UserStatus.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
				writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
			if (message.lobbyId != null && Object.hasOwnProperty.call(message, "lobbyId"))
				writer.uint32(/* id 2, wireType 2 =*/18).string(message.lobbyId);
			if (message.status != null && Object.hasOwnProperty.call(message, "status"))
				writer.uint32(/* id 3, wireType 2 =*/26).string(message.status);
			return writer;
		};

		/**
		 * Encodes the specified UserStatus message, length delimited. Does not implicitly {@link shared.UserStatus.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.UserStatus
		 * @static
		 * @param {shared.IUserStatus} message UserStatus message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UserStatus.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a UserStatus message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.UserStatus
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.UserStatus} UserStatus
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UserStatus.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.UserStatus();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.uuid = reader.string();
						break;
					}
					case 2: {
						message.lobbyId = reader.string();
						break;
					}
					case 3: {
						message.status = reader.string();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a UserStatus message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.UserStatus
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.UserStatus} UserStatus
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UserStatus.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a UserStatus message.
		 * @function verify
		 * @memberof shared.UserStatus
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		UserStatus.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.uuid != null && message.hasOwnProperty("uuid"))
				if (!$util.isString(message.uuid))
					return "uuid: string expected";
			if (message.lobbyId != null && message.hasOwnProperty("lobbyId"))
				if (!$util.isString(message.lobbyId))
					return "lobbyId: string expected";
			if (message.status != null && message.hasOwnProperty("status"))
				if (!$util.isString(message.status))
					return "status: string expected";
			return null;
		};

		/**
		 * Creates a UserStatus message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.UserStatus
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.UserStatus} UserStatus
		 */
		UserStatus.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.UserStatus)
				return object;
			let message = new $root.shared.UserStatus();
			if (object.uuid != null)
				message.uuid = String(object.uuid);
			if (object.lobbyId != null)
				message.lobbyId = String(object.lobbyId);
			if (object.status != null)
				message.status = String(object.status);
			return message;
		};

		/**
		 * Creates a plain object from a UserStatus message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.UserStatus
		 * @static
		 * @param {shared.UserStatus} message UserStatus
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		UserStatus.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.defaults) {
				object.uuid = "";
				object.lobbyId = "";
				object.status = "";
			}
			if (message.uuid != null && message.hasOwnProperty("uuid"))
				object.uuid = message.uuid;
			if (message.lobbyId != null && message.hasOwnProperty("lobbyId"))
				object.lobbyId = message.lobbyId;
			if (message.status != null && message.hasOwnProperty("status"))
				object.status = message.status;
			return object;
		};

		/**
		 * Converts this UserStatus to JSON.
		 * @function toJSON
		 * @memberof shared.UserStatus
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		UserStatus.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for UserStatus
		 * @function getTypeUrl
		 * @memberof shared.UserStatus
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		UserStatus.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.UserStatus";
		};

		return UserStatus;
	})();

	shared.QuitMessage = (function() {

		/**
		 * Properties of a QuitMessage.
		 * @memberof shared
		 * @interface IQuitMessage
		 * @property {string|null} [uuid] QuitMessage uuid
		 * @property {string|null} [lobbyId] QuitMessage lobbyId
		 */

		/**
		 * Constructs a new QuitMessage.
		 * @memberof shared
		 * @classdesc Represents a QuitMessage.
		 * @implements IQuitMessage
		 * @constructor
		 * @param {shared.IQuitMessage=} [properties] Properties to set
		 */
		function QuitMessage(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * QuitMessage uuid.
		 * @member {string} uuid
		 * @memberof shared.QuitMessage
		 * @instance
		 */
		QuitMessage.prototype.uuid = "";

		/**
		 * QuitMessage lobbyId.
		 * @member {string} lobbyId
		 * @memberof shared.QuitMessage
		 * @instance
		 */
		QuitMessage.prototype.lobbyId = "";

		/**
		 * Creates a new QuitMessage instance using the specified properties.
		 * @function create
		 * @memberof shared.QuitMessage
		 * @static
		 * @param {shared.IQuitMessage=} [properties] Properties to set
		 * @returns {shared.QuitMessage} QuitMessage instance
		 */
		QuitMessage.create = function create(properties) {
			return new QuitMessage(properties);
		};

		/**
		 * Encodes the specified QuitMessage message. Does not implicitly {@link shared.QuitMessage.verify|verify} messages.
		 * @function encode
		 * @memberof shared.QuitMessage
		 * @static
		 * @param {shared.IQuitMessage} message QuitMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		QuitMessage.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
				writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
			if (message.lobbyId != null && Object.hasOwnProperty.call(message, "lobbyId"))
				writer.uint32(/* id 2, wireType 2 =*/18).string(message.lobbyId);
			return writer;
		};

		/**
		 * Encodes the specified QuitMessage message, length delimited. Does not implicitly {@link shared.QuitMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.QuitMessage
		 * @static
		 * @param {shared.IQuitMessage} message QuitMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		QuitMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a QuitMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.QuitMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.QuitMessage} QuitMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		QuitMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.QuitMessage();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.uuid = reader.string();
						break;
					}
					case 2: {
						message.lobbyId = reader.string();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a QuitMessage message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.QuitMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.QuitMessage} QuitMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		QuitMessage.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a QuitMessage message.
		 * @function verify
		 * @memberof shared.QuitMessage
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		QuitMessage.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.uuid != null && message.hasOwnProperty("uuid"))
				if (!$util.isString(message.uuid))
					return "uuid: string expected";
			if (message.lobbyId != null && message.hasOwnProperty("lobbyId"))
				if (!$util.isString(message.lobbyId))
					return "lobbyId: string expected";
			return null;
		};

		/**
		 * Creates a QuitMessage message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.QuitMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.QuitMessage} QuitMessage
		 */
		QuitMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.QuitMessage)
				return object;
			let message = new $root.shared.QuitMessage();
			if (object.uuid != null)
				message.uuid = String(object.uuid);
			if (object.lobbyId != null)
				message.lobbyId = String(object.lobbyId);
			return message;
		};

		/**
		 * Creates a plain object from a QuitMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.QuitMessage
		 * @static
		 * @param {shared.QuitMessage} message QuitMessage
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		QuitMessage.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.defaults) {
				object.uuid = "";
				object.lobbyId = "";
			}
			if (message.uuid != null && message.hasOwnProperty("uuid"))
				object.uuid = message.uuid;
			if (message.lobbyId != null && message.hasOwnProperty("lobbyId"))
				object.lobbyId = message.lobbyId;
			return object;
		};

		/**
		 * Converts this QuitMessage to JSON.
		 * @function toJSON
		 * @memberof shared.QuitMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		QuitMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for QuitMessage
		 * @function getTypeUrl
		 * @memberof shared.QuitMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		QuitMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.QuitMessage";
		};

		return QuitMessage;
	})();

	shared.ReadyMessage = (function() {

		/**
		 * Properties of a ReadyMessage.
		 * @memberof shared
		 * @interface IReadyMessage
		 * @property {string|null} [lobbyId] ReadyMessage lobbyId
		 */

		/**
		 * Constructs a new ReadyMessage.
		 * @memberof shared
		 * @classdesc Represents a ReadyMessage.
		 * @implements IReadyMessage
		 * @constructor
		 * @param {shared.IReadyMessage=} [properties] Properties to set
		 */
		function ReadyMessage(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ReadyMessage lobbyId.
		 * @member {string} lobbyId
		 * @memberof shared.ReadyMessage
		 * @instance
		 */
		ReadyMessage.prototype.lobbyId = "";

		/**
		 * Creates a new ReadyMessage instance using the specified properties.
		 * @function create
		 * @memberof shared.ReadyMessage
		 * @static
		 * @param {shared.IReadyMessage=} [properties] Properties to set
		 * @returns {shared.ReadyMessage} ReadyMessage instance
		 */
		ReadyMessage.create = function create(properties) {
			return new ReadyMessage(properties);
		};

		/**
		 * Encodes the specified ReadyMessage message. Does not implicitly {@link shared.ReadyMessage.verify|verify} messages.
		 * @function encode
		 * @memberof shared.ReadyMessage
		 * @static
		 * @param {shared.IReadyMessage} message ReadyMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ReadyMessage.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.lobbyId != null && Object.hasOwnProperty.call(message, "lobbyId"))
				writer.uint32(/* id 1, wireType 2 =*/10).string(message.lobbyId);
			return writer;
		};

		/**
		 * Encodes the specified ReadyMessage message, length delimited. Does not implicitly {@link shared.ReadyMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.ReadyMessage
		 * @static
		 * @param {shared.IReadyMessage} message ReadyMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ReadyMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ReadyMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.ReadyMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.ReadyMessage} ReadyMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ReadyMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.ReadyMessage();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.lobbyId = reader.string();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a ReadyMessage message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.ReadyMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.ReadyMessage} ReadyMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ReadyMessage.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a ReadyMessage message.
		 * @function verify
		 * @memberof shared.ReadyMessage
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		ReadyMessage.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.lobbyId != null && message.hasOwnProperty("lobbyId"))
				if (!$util.isString(message.lobbyId))
					return "lobbyId: string expected";
			return null;
		};

		/**
		 * Creates a ReadyMessage message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.ReadyMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.ReadyMessage} ReadyMessage
		 */
		ReadyMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.ReadyMessage)
				return object;
			let message = new $root.shared.ReadyMessage();
			if (object.lobbyId != null)
				message.lobbyId = String(object.lobbyId);
			return message;
		};

		/**
		 * Creates a plain object from a ReadyMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.ReadyMessage
		 * @static
		 * @param {shared.ReadyMessage} message ReadyMessage
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ReadyMessage.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.defaults)
				object.lobbyId = "";
			if (message.lobbyId != null && message.hasOwnProperty("lobbyId"))
				object.lobbyId = message.lobbyId;
			return object;
		};

		/**
		 * Converts this ReadyMessage to JSON.
		 * @function toJSON
		 * @memberof shared.ReadyMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ReadyMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for ReadyMessage
		 * @function getTypeUrl
		 * @memberof shared.ReadyMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		ReadyMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.ReadyMessage";
		};

		return ReadyMessage;
	})();

	shared.ErrorMessage = (function() {

		/**
		 * Properties of an ErrorMessage.
		 * @memberof shared
		 * @interface IErrorMessage
		 * @property {string|null} [message] ErrorMessage message
		 */

		/**
		 * Constructs a new ErrorMessage.
		 * @memberof shared
		 * @classdesc Represents an ErrorMessage.
		 * @implements IErrorMessage
		 * @constructor
		 * @param {shared.IErrorMessage=} [properties] Properties to set
		 */
		function ErrorMessage(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ErrorMessage message.
		 * @member {string} message
		 * @memberof shared.ErrorMessage
		 * @instance
		 */
		ErrorMessage.prototype.message = "";

		/**
		 * Creates a new ErrorMessage instance using the specified properties.
		 * @function create
		 * @memberof shared.ErrorMessage
		 * @static
		 * @param {shared.IErrorMessage=} [properties] Properties to set
		 * @returns {shared.ErrorMessage} ErrorMessage instance
		 */
		ErrorMessage.create = function create(properties) {
			return new ErrorMessage(properties);
		};

		/**
		 * Encodes the specified ErrorMessage message. Does not implicitly {@link shared.ErrorMessage.verify|verify} messages.
		 * @function encode
		 * @memberof shared.ErrorMessage
		 * @static
		 * @param {shared.IErrorMessage} message ErrorMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ErrorMessage.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.message != null && Object.hasOwnProperty.call(message, "message"))
				writer.uint32(/* id 1, wireType 2 =*/10).string(message.message);
			return writer;
		};

		/**
		 * Encodes the specified ErrorMessage message, length delimited. Does not implicitly {@link shared.ErrorMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.ErrorMessage
		 * @static
		 * @param {shared.IErrorMessage} message ErrorMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ErrorMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an ErrorMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.ErrorMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.ErrorMessage} ErrorMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ErrorMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.ErrorMessage();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.message = reader.string();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes an ErrorMessage message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.ErrorMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.ErrorMessage} ErrorMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ErrorMessage.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an ErrorMessage message.
		 * @function verify
		 * @memberof shared.ErrorMessage
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		ErrorMessage.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.message != null && message.hasOwnProperty("message"))
				if (!$util.isString(message.message))
					return "message: string expected";
			return null;
		};

		/**
		 * Creates an ErrorMessage message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.ErrorMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.ErrorMessage} ErrorMessage
		 */
		ErrorMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.ErrorMessage)
				return object;
			let message = new $root.shared.ErrorMessage();
			if (object.message != null)
				message.message = String(object.message);
			return message;
		};

		/**
		 * Creates a plain object from an ErrorMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.ErrorMessage
		 * @static
		 * @param {shared.ErrorMessage} message ErrorMessage
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ErrorMessage.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.defaults)
				object.message = "";
			if (message.message != null && message.hasOwnProperty("message"))
				object.message = message.message;
			return object;
		};

		/**
		 * Converts this ErrorMessage to JSON.
		 * @function toJSON
		 * @memberof shared.ErrorMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ErrorMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for ErrorMessage
		 * @function getTypeUrl
		 * @memberof shared.ErrorMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		ErrorMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.ErrorMessage";
		};

		return ErrorMessage;
	})();

	shared.StartMessage = (function() {

		/**
		 * Properties of a StartMessage.
		 * @memberof shared
		 * @interface IStartMessage
		 * @property {string|null} [lobbyId] StartMessage lobbyId
		 * @property {string|null} [gameId] StartMessage gameId
		 * @property {string|null} [map] StartMessage map
		 */

		/**
		 * Constructs a new StartMessage.
		 * @memberof shared
		 * @classdesc Represents a StartMessage.
		 * @implements IStartMessage
		 * @constructor
		 * @param {shared.IStartMessage=} [properties] Properties to set
		 */
		function StartMessage(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * StartMessage lobbyId.
		 * @member {string} lobbyId
		 * @memberof shared.StartMessage
		 * @instance
		 */
		StartMessage.prototype.lobbyId = "";

		/**
		 * StartMessage gameId.
		 * @member {string} gameId
		 * @memberof shared.StartMessage
		 * @instance
		 */
		StartMessage.prototype.gameId = "";

		/**
		 * StartMessage map.
		 * @member {string} map
		 * @memberof shared.StartMessage
		 * @instance
		 */
		StartMessage.prototype.map = "";

		/**
		 * Creates a new StartMessage instance using the specified properties.
		 * @function create
		 * @memberof shared.StartMessage
		 * @static
		 * @param {shared.IStartMessage=} [properties] Properties to set
		 * @returns {shared.StartMessage} StartMessage instance
		 */
		StartMessage.create = function create(properties) {
			return new StartMessage(properties);
		};

		/**
		 * Encodes the specified StartMessage message. Does not implicitly {@link shared.StartMessage.verify|verify} messages.
		 * @function encode
		 * @memberof shared.StartMessage
		 * @static
		 * @param {shared.IStartMessage} message StartMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		StartMessage.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.lobbyId != null && Object.hasOwnProperty.call(message, "lobbyId"))
				writer.uint32(/* id 1, wireType 2 =*/10).string(message.lobbyId);
			if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
				writer.uint32(/* id 2, wireType 2 =*/18).string(message.gameId);
			if (message.map != null && Object.hasOwnProperty.call(message, "map"))
				writer.uint32(/* id 3, wireType 2 =*/26).string(message.map);
			return writer;
		};

		/**
		 * Encodes the specified StartMessage message, length delimited. Does not implicitly {@link shared.StartMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.StartMessage
		 * @static
		 * @param {shared.IStartMessage} message StartMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		StartMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a StartMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.StartMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.StartMessage} StartMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		StartMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.StartMessage();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.lobbyId = reader.string();
						break;
					}
					case 2: {
						message.gameId = reader.string();
						break;
					}
					case 3: {
						message.map = reader.string();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a StartMessage message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.StartMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.StartMessage} StartMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		StartMessage.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a StartMessage message.
		 * @function verify
		 * @memberof shared.StartMessage
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		StartMessage.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.lobbyId != null && message.hasOwnProperty("lobbyId"))
				if (!$util.isString(message.lobbyId))
					return "lobbyId: string expected";
			if (message.gameId != null && message.hasOwnProperty("gameId"))
				if (!$util.isString(message.gameId))
					return "gameId: string expected";
			if (message.map != null && message.hasOwnProperty("map"))
				if (!$util.isString(message.map))
					return "map: string expected";
			return null;
		};

		/**
		 * Creates a StartMessage message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.StartMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.StartMessage} StartMessage
		 */
		StartMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.StartMessage)
				return object;
			let message = new $root.shared.StartMessage();
			if (object.lobbyId != null)
				message.lobbyId = String(object.lobbyId);
			if (object.gameId != null)
				message.gameId = String(object.gameId);
			if (object.map != null)
				message.map = String(object.map);
			return message;
		};

		/**
		 * Creates a plain object from a StartMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.StartMessage
		 * @static
		 * @param {shared.StartMessage} message StartMessage
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		StartMessage.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.defaults) {
				object.lobbyId = "";
				object.gameId = "";
				object.map = "";
			}
			if (message.lobbyId != null && message.hasOwnProperty("lobbyId"))
				object.lobbyId = message.lobbyId;
			if (message.gameId != null && message.hasOwnProperty("gameId"))
				object.gameId = message.gameId;
			if (message.map != null && message.hasOwnProperty("map"))
				object.map = message.map;
			return object;
		};

		/**
		 * Converts this StartMessage to JSON.
		 * @function toJSON
		 * @memberof shared.StartMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		StartMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for StartMessage
		 * @function getTypeUrl
		 * @memberof shared.StartMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		StartMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.StartMessage";
		};

		return StartMessage;
	})();

	shared.Player = (function() {

		/**
		 * Properties of a Player.
		 * @memberof shared
		 * @interface IPlayer
		 * @property {string|null} [uuid] Player uuid
		 * @property {boolean|null} [ready] Player ready
		 */

		/**
		 * Constructs a new Player.
		 * @memberof shared
		 * @classdesc Represents a Player.
		 * @implements IPlayer
		 * @constructor
		 * @param {shared.IPlayer=} [properties] Properties to set
		 */
		function Player(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * Player uuid.
		 * @member {string} uuid
		 * @memberof shared.Player
		 * @instance
		 */
		Player.prototype.uuid = "";

		/**
		 * Player ready.
		 * @member {boolean} ready
		 * @memberof shared.Player
		 * @instance
		 */
		Player.prototype.ready = false;

		/**
		 * Creates a new Player instance using the specified properties.
		 * @function create
		 * @memberof shared.Player
		 * @static
		 * @param {shared.IPlayer=} [properties] Properties to set
		 * @returns {shared.Player} Player instance
		 */
		Player.create = function create(properties) {
			return new Player(properties);
		};

		/**
		 * Encodes the specified Player message. Does not implicitly {@link shared.Player.verify|verify} messages.
		 * @function encode
		 * @memberof shared.Player
		 * @static
		 * @param {shared.IPlayer} message Player message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Player.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
				writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
			if (message.ready != null && Object.hasOwnProperty.call(message, "ready"))
				writer.uint32(/* id 2, wireType 0 =*/16).bool(message.ready);
			return writer;
		};

		/**
		 * Encodes the specified Player message, length delimited. Does not implicitly {@link shared.Player.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.Player
		 * @static
		 * @param {shared.IPlayer} message Player message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Player.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a Player message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.Player
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.Player} Player
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Player.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.Player();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.uuid = reader.string();
						break;
					}
					case 2: {
						message.ready = reader.bool();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a Player message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.Player
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.Player} Player
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Player.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a Player message.
		 * @function verify
		 * @memberof shared.Player
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		Player.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.uuid != null && message.hasOwnProperty("uuid"))
				if (!$util.isString(message.uuid))
					return "uuid: string expected";
			if (message.ready != null && message.hasOwnProperty("ready"))
				if (typeof message.ready !== "boolean")
					return "ready: boolean expected";
			return null;
		};

		/**
		 * Creates a Player message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.Player
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.Player} Player
		 */
		Player.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.Player)
				return object;
			let message = new $root.shared.Player();
			if (object.uuid != null)
				message.uuid = String(object.uuid);
			if (object.ready != null)
				message.ready = Boolean(object.ready);
			return message;
		};

		/**
		 * Creates a plain object from a Player message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.Player
		 * @static
		 * @param {shared.Player} message Player
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		Player.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.defaults) {
				object.uuid = "";
				object.ready = false;
			}
			if (message.uuid != null && message.hasOwnProperty("uuid"))
				object.uuid = message.uuid;
			if (message.ready != null && message.hasOwnProperty("ready"))
				object.ready = message.ready;
			return object;
		};

		/**
		 * Converts this Player to JSON.
		 * @function toJSON
		 * @memberof shared.Player
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		Player.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for Player
		 * @function getTypeUrl
		 * @memberof shared.Player
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		Player.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.Player";
		};

		return Player;
	})();

	shared.UpdateMessage = (function() {

		/**
		 * Properties of an UpdateMessage.
		 * @memberof shared
		 * @interface IUpdateMessage
		 * @property {string|null} [lobbyId] UpdateMessage lobbyId
		 * @property {Array.<shared.IPlayer>|null} [players] UpdateMessage players
		 * @property {string|null} [status] UpdateMessage status
		 * @property {string|null} [mode] UpdateMessage mode
		 */

		/**
		 * Constructs a new UpdateMessage.
		 * @memberof shared
		 * @classdesc Represents an UpdateMessage.
		 * @implements IUpdateMessage
		 * @constructor
		 * @param {shared.IUpdateMessage=} [properties] Properties to set
		 */
		function UpdateMessage(properties) {
			this.players = [];
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * UpdateMessage lobbyId.
		 * @member {string} lobbyId
		 * @memberof shared.UpdateMessage
		 * @instance
		 */
		UpdateMessage.prototype.lobbyId = "";

		/**
		 * UpdateMessage players.
		 * @member {Array.<shared.IPlayer>} players
		 * @memberof shared.UpdateMessage
		 * @instance
		 */
		UpdateMessage.prototype.players = $util.emptyArray;

		/**
		 * UpdateMessage status.
		 * @member {string} status
		 * @memberof shared.UpdateMessage
		 * @instance
		 */
		UpdateMessage.prototype.status = "";

		/**
		 * UpdateMessage mode.
		 * @member {string} mode
		 * @memberof shared.UpdateMessage
		 * @instance
		 */
		UpdateMessage.prototype.mode = "";

		/**
		 * Creates a new UpdateMessage instance using the specified properties.
		 * @function create
		 * @memberof shared.UpdateMessage
		 * @static
		 * @param {shared.IUpdateMessage=} [properties] Properties to set
		 * @returns {shared.UpdateMessage} UpdateMessage instance
		 */
		UpdateMessage.create = function create(properties) {
			return new UpdateMessage(properties);
		};

		/**
		 * Encodes the specified UpdateMessage message. Does not implicitly {@link shared.UpdateMessage.verify|verify} messages.
		 * @function encode
		 * @memberof shared.UpdateMessage
		 * @static
		 * @param {shared.IUpdateMessage} message UpdateMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UpdateMessage.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.lobbyId != null && Object.hasOwnProperty.call(message, "lobbyId"))
				writer.uint32(/* id 1, wireType 2 =*/10).string(message.lobbyId);
			if (message.players != null && message.players.length)
				for (let i = 0; i < message.players.length; ++i)
					$root.shared.Player.encode(message.players[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
			if (message.status != null && Object.hasOwnProperty.call(message, "status"))
				writer.uint32(/* id 3, wireType 2 =*/26).string(message.status);
			if (message.mode != null && Object.hasOwnProperty.call(message, "mode"))
				writer.uint32(/* id 4, wireType 2 =*/34).string(message.mode);
			return writer;
		};

		/**
		 * Encodes the specified UpdateMessage message, length delimited. Does not implicitly {@link shared.UpdateMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.UpdateMessage
		 * @static
		 * @param {shared.IUpdateMessage} message UpdateMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UpdateMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an UpdateMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.UpdateMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.UpdateMessage} UpdateMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UpdateMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.UpdateMessage();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.lobbyId = reader.string();
						break;
					}
					case 2: {
						if (!(message.players && message.players.length))
							message.players = [];
						message.players.push($root.shared.Player.decode(reader, reader.uint32()));
						break;
					}
					case 3: {
						message.status = reader.string();
						break;
					}
					case 4: {
						message.mode = reader.string();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes an UpdateMessage message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.UpdateMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.UpdateMessage} UpdateMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UpdateMessage.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an UpdateMessage message.
		 * @function verify
		 * @memberof shared.UpdateMessage
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		UpdateMessage.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.lobbyId != null && message.hasOwnProperty("lobbyId"))
				if (!$util.isString(message.lobbyId))
					return "lobbyId: string expected";
			if (message.players != null && message.hasOwnProperty("players")) {
				if (!Array.isArray(message.players))
					return "players: array expected";
				for (let i = 0; i < message.players.length; ++i) {
					let error = $root.shared.Player.verify(message.players[i]);
					if (error)
						return "players." + error;
				}
			}
			if (message.status != null && message.hasOwnProperty("status"))
				if (!$util.isString(message.status))
					return "status: string expected";
			if (message.mode != null && message.hasOwnProperty("mode"))
				if (!$util.isString(message.mode))
					return "mode: string expected";
			return null;
		};

		/**
		 * Creates an UpdateMessage message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.UpdateMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.UpdateMessage} UpdateMessage
		 */
		UpdateMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.UpdateMessage)
				return object;
			let message = new $root.shared.UpdateMessage();
			if (object.lobbyId != null)
				message.lobbyId = String(object.lobbyId);
			if (object.players) {
				if (!Array.isArray(object.players))
					throw TypeError(".shared.UpdateMessage.players: array expected");
				message.players = [];
				for (let i = 0; i < object.players.length; ++i) {
					if (typeof object.players[i] !== "object")
						throw TypeError(".shared.UpdateMessage.players: object expected");
					message.players[i] = $root.shared.Player.fromObject(object.players[i]);
				}
			}
			if (object.status != null)
				message.status = String(object.status);
			if (object.mode != null)
				message.mode = String(object.mode);
			return message;
		};

		/**
		 * Creates a plain object from an UpdateMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.UpdateMessage
		 * @static
		 * @param {shared.UpdateMessage} message UpdateMessage
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		UpdateMessage.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.arrays || options.defaults)
				object.players = [];
			if (options.defaults) {
				object.lobbyId = "";
				object.status = "";
				object.mode = "";
			}
			if (message.lobbyId != null && message.hasOwnProperty("lobbyId"))
				object.lobbyId = message.lobbyId;
			if (message.players && message.players.length) {
				object.players = [];
				for (let j = 0; j < message.players.length; ++j)
					object.players[j] = $root.shared.Player.toObject(message.players[j], options);
			}
			if (message.status != null && message.hasOwnProperty("status"))
				object.status = message.status;
			if (message.mode != null && message.hasOwnProperty("mode"))
				object.mode = message.mode;
			return object;
		};

		/**
		 * Converts this UpdateMessage to JSON.
		 * @function toJSON
		 * @memberof shared.UpdateMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		UpdateMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for UpdateMessage
		 * @function getTypeUrl
		 * @memberof shared.UpdateMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		UpdateMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.UpdateMessage";
		};

		return UpdateMessage;
	})();

	shared.PaddleUpdate = (function() {

		/**
		 * Properties of a PaddleUpdate.
		 * @memberof shared
		 * @interface IPaddleUpdate
		 * @property {number|null} [paddleId] PaddleUpdate paddleId
		 * @property {number|null} [move] PaddleUpdate move
		 */

		/**
		 * Constructs a new PaddleUpdate.
		 * @memberof shared
		 * @classdesc Represents a PaddleUpdate.
		 * @implements IPaddleUpdate
		 * @constructor
		 * @param {shared.IPaddleUpdate=} [properties] Properties to set
		 */
		function PaddleUpdate(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * PaddleUpdate paddleId.
		 * @member {number} paddleId
		 * @memberof shared.PaddleUpdate
		 * @instance
		 */
		PaddleUpdate.prototype.paddleId = 0;

		/**
		 * PaddleUpdate move.
		 * @member {number} move
		 * @memberof shared.PaddleUpdate
		 * @instance
		 */
		PaddleUpdate.prototype.move = 0;

		/**
		 * Creates a new PaddleUpdate instance using the specified properties.
		 * @function create
		 * @memberof shared.PaddleUpdate
		 * @static
		 * @param {shared.IPaddleUpdate=} [properties] Properties to set
		 * @returns {shared.PaddleUpdate} PaddleUpdate instance
		 */
		PaddleUpdate.create = function create(properties) {
			return new PaddleUpdate(properties);
		};

		/**
		 * Encodes the specified PaddleUpdate message. Does not implicitly {@link shared.PaddleUpdate.verify|verify} messages.
		 * @function encode
		 * @memberof shared.PaddleUpdate
		 * @static
		 * @param {shared.IPaddleUpdate} message PaddleUpdate message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PaddleUpdate.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.paddleId != null && Object.hasOwnProperty.call(message, "paddleId"))
				writer.uint32(/* id 1, wireType 0 =*/8).int32(message.paddleId);
			if (message.move != null && Object.hasOwnProperty.call(message, "move"))
				writer.uint32(/* id 2, wireType 0 =*/16).int32(message.move);
			return writer;
		};

		/**
		 * Encodes the specified PaddleUpdate message, length delimited. Does not implicitly {@link shared.PaddleUpdate.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.PaddleUpdate
		 * @static
		 * @param {shared.IPaddleUpdate} message PaddleUpdate message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PaddleUpdate.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a PaddleUpdate message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.PaddleUpdate
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.PaddleUpdate} PaddleUpdate
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PaddleUpdate.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.PaddleUpdate();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.paddleId = reader.int32();
						break;
					}
					case 2: {
						message.move = reader.int32();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a PaddleUpdate message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.PaddleUpdate
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.PaddleUpdate} PaddleUpdate
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PaddleUpdate.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a PaddleUpdate message.
		 * @function verify
		 * @memberof shared.PaddleUpdate
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		PaddleUpdate.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.paddleId != null && message.hasOwnProperty("paddleId"))
				if (!$util.isInteger(message.paddleId))
					return "paddleId: integer expected";
			if (message.move != null && message.hasOwnProperty("move"))
				if (!$util.isInteger(message.move))
					return "move: integer expected";
			return null;
		};

		/**
		 * Creates a PaddleUpdate message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.PaddleUpdate
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.PaddleUpdate} PaddleUpdate
		 */
		PaddleUpdate.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.PaddleUpdate)
				return object;
			let message = new $root.shared.PaddleUpdate();
			if (object.paddleId != null)
				message.paddleId = object.paddleId | 0;
			if (object.move != null)
				message.move = object.move | 0;
			return message;
		};

		/**
		 * Creates a plain object from a PaddleUpdate message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.PaddleUpdate
		 * @static
		 * @param {shared.PaddleUpdate} message PaddleUpdate
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		PaddleUpdate.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.defaults) {
				object.paddleId = 0;
				object.move = 0;
			}
			if (message.paddleId != null && message.hasOwnProperty("paddleId"))
				object.paddleId = message.paddleId;
			if (message.move != null && message.hasOwnProperty("move"))
				object.move = message.move;
			return object;
		};

		/**
		 * Converts this PaddleUpdate to JSON.
		 * @function toJSON
		 * @memberof shared.PaddleUpdate
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		PaddleUpdate.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for PaddleUpdate
		 * @function getTypeUrl
		 * @memberof shared.PaddleUpdate
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		PaddleUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.PaddleUpdate";
		};

		return PaddleUpdate;
	})();

	shared.WelcomeMessage = (function() {

		/**
		 * Properties of a WelcomeMessage.
		 * @memberof shared
		 * @interface IWelcomeMessage
		 * @property {number|null} [paddleId] WelcomeMessage paddleId
		 */

		/**
		 * Constructs a new WelcomeMessage.
		 * @memberof shared
		 * @classdesc Represents a WelcomeMessage.
		 * @implements IWelcomeMessage
		 * @constructor
		 * @param {shared.IWelcomeMessage=} [properties] Properties to set
		 */
		function WelcomeMessage(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * WelcomeMessage paddleId.
		 * @member {number} paddleId
		 * @memberof shared.WelcomeMessage
		 * @instance
		 */
		WelcomeMessage.prototype.paddleId = 0;

		/**
		 * Creates a new WelcomeMessage instance using the specified properties.
		 * @function create
		 * @memberof shared.WelcomeMessage
		 * @static
		 * @param {shared.IWelcomeMessage=} [properties] Properties to set
		 * @returns {shared.WelcomeMessage} WelcomeMessage instance
		 */
		WelcomeMessage.create = function create(properties) {
			return new WelcomeMessage(properties);
		};

		/**
		 * Encodes the specified WelcomeMessage message. Does not implicitly {@link shared.WelcomeMessage.verify|verify} messages.
		 * @function encode
		 * @memberof shared.WelcomeMessage
		 * @static
		 * @param {shared.IWelcomeMessage} message WelcomeMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		WelcomeMessage.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.paddleId != null && Object.hasOwnProperty.call(message, "paddleId"))
				writer.uint32(/* id 1, wireType 0 =*/8).int32(message.paddleId);
			return writer;
		};

		/**
		 * Encodes the specified WelcomeMessage message, length delimited. Does not implicitly {@link shared.WelcomeMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.WelcomeMessage
		 * @static
		 * @param {shared.IWelcomeMessage} message WelcomeMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		WelcomeMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a WelcomeMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.WelcomeMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.WelcomeMessage} WelcomeMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		WelcomeMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.WelcomeMessage();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.paddleId = reader.int32();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a WelcomeMessage message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.WelcomeMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.WelcomeMessage} WelcomeMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		WelcomeMessage.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a WelcomeMessage message.
		 * @function verify
		 * @memberof shared.WelcomeMessage
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		WelcomeMessage.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.paddleId != null && message.hasOwnProperty("paddleId"))
				if (!$util.isInteger(message.paddleId))
					return "paddleId: integer expected";
			return null;
		};

		/**
		 * Creates a WelcomeMessage message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.WelcomeMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.WelcomeMessage} WelcomeMessage
		 */
		WelcomeMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.WelcomeMessage)
				return object;
			let message = new $root.shared.WelcomeMessage();
			if (object.paddleId != null)
				message.paddleId = object.paddleId | 0;
			return message;
		};

		/**
		 * Creates a plain object from a WelcomeMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.WelcomeMessage
		 * @static
		 * @param {shared.WelcomeMessage} message WelcomeMessage
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		WelcomeMessage.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.defaults)
				object.paddleId = 0;
			if (message.paddleId != null && message.hasOwnProperty("paddleId"))
				object.paddleId = message.paddleId;
			return object;
		};

		/**
		 * Converts this WelcomeMessage to JSON.
		 * @function toJSON
		 * @memberof shared.WelcomeMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		WelcomeMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for WelcomeMessage
		 * @function getTypeUrl
		 * @memberof shared.WelcomeMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		WelcomeMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.WelcomeMessage";
		};

		return WelcomeMessage;
	})();

	shared.GameStartMessage = (function() {

		/**
		 * Properties of a GameStartMessage.
		 * @memberof shared
		 * @interface IGameStartMessage
		 */

		/**
		 * Constructs a new GameStartMessage.
		 * @memberof shared
		 * @classdesc Represents a GameStartMessage.
		 * @implements IGameStartMessage
		 * @constructor
		 * @param {shared.IGameStartMessage=} [properties] Properties to set
		 */
		function GameStartMessage(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * Creates a new GameStartMessage instance using the specified properties.
		 * @function create
		 * @memberof shared.GameStartMessage
		 * @static
		 * @param {shared.IGameStartMessage=} [properties] Properties to set
		 * @returns {shared.GameStartMessage} GameStartMessage instance
		 */
		GameStartMessage.create = function create(properties) {
			return new GameStartMessage(properties);
		};

		/**
		 * Encodes the specified GameStartMessage message. Does not implicitly {@link shared.GameStartMessage.verify|verify} messages.
		 * @function encode
		 * @memberof shared.GameStartMessage
		 * @static
		 * @param {shared.IGameStartMessage} message GameStartMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GameStartMessage.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			return writer;
		};

		/**
		 * Encodes the specified GameStartMessage message, length delimited. Does not implicitly {@link shared.GameStartMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.GameStartMessage
		 * @static
		 * @param {shared.IGameStartMessage} message GameStartMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GameStartMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a GameStartMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.GameStartMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.GameStartMessage} GameStartMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GameStartMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.GameStartMessage();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a GameStartMessage message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.GameStartMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.GameStartMessage} GameStartMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GameStartMessage.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a GameStartMessage message.
		 * @function verify
		 * @memberof shared.GameStartMessage
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		GameStartMessage.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			return null;
		};

		/**
		 * Creates a GameStartMessage message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.GameStartMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.GameStartMessage} GameStartMessage
		 */
		GameStartMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.GameStartMessage)
				return object;
			return new $root.shared.GameStartMessage();
		};

		/**
		 * Creates a plain object from a GameStartMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.GameStartMessage
		 * @static
		 * @param {shared.GameStartMessage} message GameStartMessage
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		GameStartMessage.toObject = function toObject() {
			return {};
		};

		/**
		 * Converts this GameStartMessage to JSON.
		 * @function toJSON
		 * @memberof shared.GameStartMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		GameStartMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for GameStartMessage
		 * @function getTypeUrl
		 * @memberof shared.GameStartMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		GameStartMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.GameStartMessage";
		};

		return GameStartMessage;
	})();

	shared.GameEndMessage = (function() {

		/**
		 * Properties of a GameEndMessage.
		 * @memberof shared
		 * @interface IGameEndMessage
		 * @property {Array.<number>|null} [score] GameEndMessage score
		 */

		/**
		 * Constructs a new GameEndMessage.
		 * @memberof shared
		 * @classdesc Represents a GameEndMessage.
		 * @implements IGameEndMessage
		 * @constructor
		 * @param {shared.IGameEndMessage=} [properties] Properties to set
		 */
		function GameEndMessage(properties) {
			this.score = [];
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * GameEndMessage score.
		 * @member {Array.<number>} score
		 * @memberof shared.GameEndMessage
		 * @instance
		 */
		GameEndMessage.prototype.score = $util.emptyArray;

		/**
		 * Creates a new GameEndMessage instance using the specified properties.
		 * @function create
		 * @memberof shared.GameEndMessage
		 * @static
		 * @param {shared.IGameEndMessage=} [properties] Properties to set
		 * @returns {shared.GameEndMessage} GameEndMessage instance
		 */
		GameEndMessage.create = function create(properties) {
			return new GameEndMessage(properties);
		};

		/**
		 * Encodes the specified GameEndMessage message. Does not implicitly {@link shared.GameEndMessage.verify|verify} messages.
		 * @function encode
		 * @memberof shared.GameEndMessage
		 * @static
		 * @param {shared.IGameEndMessage} message GameEndMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GameEndMessage.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.score != null && message.score.length) {
				writer.uint32(/* id 1, wireType 2 =*/10).fork();
				for (let i = 0; i < message.score.length; ++i)
					writer.int32(message.score[i]);
				writer.ldelim();
			}
			return writer;
		};

		/**
		 * Encodes the specified GameEndMessage message, length delimited. Does not implicitly {@link shared.GameEndMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.GameEndMessage
		 * @static
		 * @param {shared.IGameEndMessage} message GameEndMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GameEndMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a GameEndMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.GameEndMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.GameEndMessage} GameEndMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GameEndMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.GameEndMessage();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						if (!(message.score && message.score.length))
							message.score = [];
						if ((tag & 7) === 2) {
							let end2 = reader.uint32() + reader.pos;
							while (reader.pos < end2)
								message.score.push(reader.int32());
						} else
							message.score.push(reader.int32());
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a GameEndMessage message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.GameEndMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.GameEndMessage} GameEndMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GameEndMessage.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a GameEndMessage message.
		 * @function verify
		 * @memberof shared.GameEndMessage
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		GameEndMessage.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.score != null && message.hasOwnProperty("score")) {
				if (!Array.isArray(message.score))
					return "score: array expected";
				for (let i = 0; i < message.score.length; ++i)
					if (!$util.isInteger(message.score[i]))
						return "score: integer[] expected";
			}
			return null;
		};

		/**
		 * Creates a GameEndMessage message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.GameEndMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.GameEndMessage} GameEndMessage
		 */
		GameEndMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.GameEndMessage)
				return object;
			let message = new $root.shared.GameEndMessage();
			if (object.score) {
				if (!Array.isArray(object.score))
					throw TypeError(".shared.GameEndMessage.score: array expected");
				message.score = [];
				for (let i = 0; i < object.score.length; ++i)
					message.score[i] = object.score[i] | 0;
			}
			return message;
		};

		/**
		 * Creates a plain object from a GameEndMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.GameEndMessage
		 * @static
		 * @param {shared.GameEndMessage} message GameEndMessage
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		GameEndMessage.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.arrays || options.defaults)
				object.score = [];
			if (message.score && message.score.length) {
				object.score = [];
				for (let j = 0; j < message.score.length; ++j)
					object.score[j] = message.score[j];
			}
			return object;
		};

		/**
		 * Converts this GameEndMessage to JSON.
		 * @function toJSON
		 * @memberof shared.GameEndMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		GameEndMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for GameEndMessage
		 * @function getTypeUrl
		 * @memberof shared.GameEndMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		GameEndMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.GameEndMessage";
		};

		return GameEndMessage;
	})();

	shared.StateMessage = (function() {

		/**
		 * Properties of a StateMessage.
		 * @memberof shared
		 * @interface IStateMessage
		 * @property {shared.IMatchState|null} [state] StateMessage state
		 */

		/**
		 * Constructs a new StateMessage.
		 * @memberof shared
		 * @classdesc Represents a StateMessage.
		 * @implements IStateMessage
		 * @constructor
		 * @param {shared.IStateMessage=} [properties] Properties to set
		 */
		function StateMessage(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * StateMessage state.
		 * @member {shared.IMatchState|null|undefined} state
		 * @memberof shared.StateMessage
		 * @instance
		 */
		StateMessage.prototype.state = null;

		/**
		 * Creates a new StateMessage instance using the specified properties.
		 * @function create
		 * @memberof shared.StateMessage
		 * @static
		 * @param {shared.IStateMessage=} [properties] Properties to set
		 * @returns {shared.StateMessage} StateMessage instance
		 */
		StateMessage.create = function create(properties) {
			return new StateMessage(properties);
		};

		/**
		 * Encodes the specified StateMessage message. Does not implicitly {@link shared.StateMessage.verify|verify} messages.
		 * @function encode
		 * @memberof shared.StateMessage
		 * @static
		 * @param {shared.IStateMessage} message StateMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		StateMessage.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.state != null && Object.hasOwnProperty.call(message, "state"))
				$root.shared.MatchState.encode(message.state, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified StateMessage message, length delimited. Does not implicitly {@link shared.StateMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.StateMessage
		 * @static
		 * @param {shared.IStateMessage} message StateMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		StateMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a StateMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.StateMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.StateMessage} StateMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		StateMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.StateMessage();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.state = $root.shared.MatchState.decode(reader, reader.uint32());
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a StateMessage message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.StateMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.StateMessage} StateMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		StateMessage.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a StateMessage message.
		 * @function verify
		 * @memberof shared.StateMessage
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		StateMessage.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.state != null && message.hasOwnProperty("state")) {
				let error = $root.shared.MatchState.verify(message.state);
				if (error)
					return "state." + error;
			}
			return null;
		};

		/**
		 * Creates a StateMessage message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.StateMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.StateMessage} StateMessage
		 */
		StateMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.StateMessage)
				return object;
			let message = new $root.shared.StateMessage();
			if (object.state != null) {
				if (typeof object.state !== "object")
					throw TypeError(".shared.StateMessage.state: object expected");
				message.state = $root.shared.MatchState.fromObject(object.state);
			}
			return message;
		};

		/**
		 * Creates a plain object from a StateMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.StateMessage
		 * @static
		 * @param {shared.StateMessage} message StateMessage
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		StateMessage.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.defaults)
				object.state = null;
			if (message.state != null && message.hasOwnProperty("state"))
				object.state = $root.shared.MatchState.toObject(message.state, options);
			return object;
		};

		/**
		 * Converts this StateMessage to JSON.
		 * @function toJSON
		 * @memberof shared.StateMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		StateMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for StateMessage
		 * @function getTypeUrl
		 * @memberof shared.StateMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		StateMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.StateMessage";
		};

		return StateMessage;
	})();

	shared.ClientMessage = (function() {

		/**
		 * Properties of a ClientMessage.
		 * @memberof shared
		 * @interface IClientMessage
		 * @property {shared.IPaddleUpdate|null} [paddleUpdate] ClientMessage paddleUpdate
		 * @property {shared.IQuitMessage|null} [quit] ClientMessage quit
		 * @property {shared.IReadyMessage|null} [ready] ClientMessage ready
		 * @property {shared.IMatchQuit|null} [spectate] ClientMessage spectate
		 */

		/**
		 * Constructs a new ClientMessage.
		 * @memberof shared
		 * @classdesc Represents a ClientMessage.
		 * @implements IClientMessage
		 * @constructor
		 * @param {shared.IClientMessage=} [properties] Properties to set
		 */
		function ClientMessage(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ClientMessage paddleUpdate.
		 * @member {shared.IPaddleUpdate|null|undefined} paddleUpdate
		 * @memberof shared.ClientMessage
		 * @instance
		 */
		ClientMessage.prototype.paddleUpdate = null;

		/**
		 * ClientMessage quit.
		 * @member {shared.IQuitMessage|null|undefined} quit
		 * @memberof shared.ClientMessage
		 * @instance
		 */
		ClientMessage.prototype.quit = null;

		/**
		 * ClientMessage ready.
		 * @member {shared.IReadyMessage|null|undefined} ready
		 * @memberof shared.ClientMessage
		 * @instance
		 */
		ClientMessage.prototype.ready = null;

		/**
		 * ClientMessage spectate.
		 * @member {shared.IMatchQuit|null|undefined} spectate
		 * @memberof shared.ClientMessage
		 * @instance
		 */
		ClientMessage.prototype.spectate = null;

		// OneOf field names bound to virtual getters and setters
		let $oneOfFields;

		/**
		 * ClientMessage payload.
		 * @member {"paddleUpdate"|"quit"|"ready"|"spectate"|undefined} payload
		 * @memberof shared.ClientMessage
		 * @instance
		 */
		Object.defineProperty(ClientMessage.prototype, "payload", {
			get: $util.oneOfGetter($oneOfFields = ["paddleUpdate", "quit", "ready", "spectate"]),
			set: $util.oneOfSetter($oneOfFields)
		});

		/**
		 * Creates a new ClientMessage instance using the specified properties.
		 * @function create
		 * @memberof shared.ClientMessage
		 * @static
		 * @param {shared.IClientMessage=} [properties] Properties to set
		 * @returns {shared.ClientMessage} ClientMessage instance
		 */
		ClientMessage.create = function create(properties) {
			return new ClientMessage(properties);
		};

		/**
		 * Encodes the specified ClientMessage message. Does not implicitly {@link shared.ClientMessage.verify|verify} messages.
		 * @function encode
		 * @memberof shared.ClientMessage
		 * @static
		 * @param {shared.IClientMessage} message ClientMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ClientMessage.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.paddleUpdate != null && Object.hasOwnProperty.call(message, "paddleUpdate"))
				$root.shared.PaddleUpdate.encode(message.paddleUpdate, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
			if (message.quit != null && Object.hasOwnProperty.call(message, "quit"))
				$root.shared.QuitMessage.encode(message.quit, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
			if (message.ready != null && Object.hasOwnProperty.call(message, "ready"))
				$root.shared.ReadyMessage.encode(message.ready, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
			if (message.spectate != null && Object.hasOwnProperty.call(message, "spectate"))
				$root.shared.MatchQuit.encode(message.spectate, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified ClientMessage message, length delimited. Does not implicitly {@link shared.ClientMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.ClientMessage
		 * @static
		 * @param {shared.IClientMessage} message ClientMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ClientMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ClientMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.ClientMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.ClientMessage} ClientMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ClientMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.ClientMessage();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.paddleUpdate = $root.shared.PaddleUpdate.decode(reader, reader.uint32());
						break;
					}
					case 2: {
						message.quit = $root.shared.QuitMessage.decode(reader, reader.uint32());
						break;
					}
					case 3: {
						message.ready = $root.shared.ReadyMessage.decode(reader, reader.uint32());
						break;
					}
					case 4: {
						message.spectate = $root.shared.MatchQuit.decode(reader, reader.uint32());
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a ClientMessage message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.ClientMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.ClientMessage} ClientMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ClientMessage.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a ClientMessage message.
		 * @function verify
		 * @memberof shared.ClientMessage
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		ClientMessage.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			let properties = {};
			if (message.paddleUpdate != null && message.hasOwnProperty("paddleUpdate")) {
				properties.payload = 1;
				{
					let error = $root.shared.PaddleUpdate.verify(message.paddleUpdate);
					if (error)
						return "paddleUpdate." + error;
				}
			}
			if (message.quit != null && message.hasOwnProperty("quit")) {
				if (properties.payload === 1)
					return "payload: multiple values";
				properties.payload = 1;
				{
					let error = $root.shared.QuitMessage.verify(message.quit);
					if (error)
						return "quit." + error;
				}
			}
			if (message.ready != null && message.hasOwnProperty("ready")) {
				if (properties.payload === 1)
					return "payload: multiple values";
				properties.payload = 1;
				{
					let error = $root.shared.ReadyMessage.verify(message.ready);
					if (error)
						return "ready." + error;
				}
			}
			if (message.spectate != null && message.hasOwnProperty("spectate")) {
				if (properties.payload === 1)
					return "payload: multiple values";
				properties.payload = 1;
				{
					let error = $root.shared.MatchQuit.verify(message.spectate);
					if (error)
						return "spectate." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a ClientMessage message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.ClientMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.ClientMessage} ClientMessage
		 */
		ClientMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.ClientMessage)
				return object;
			let message = new $root.shared.ClientMessage();
			if (object.paddleUpdate != null) {
				if (typeof object.paddleUpdate !== "object")
					throw TypeError(".shared.ClientMessage.paddleUpdate: object expected");
				message.paddleUpdate = $root.shared.PaddleUpdate.fromObject(object.paddleUpdate);
			}
			if (object.quit != null) {
				if (typeof object.quit !== "object")
					throw TypeError(".shared.ClientMessage.quit: object expected");
				message.quit = $root.shared.QuitMessage.fromObject(object.quit);
			}
			if (object.ready != null) {
				if (typeof object.ready !== "object")
					throw TypeError(".shared.ClientMessage.ready: object expected");
				message.ready = $root.shared.ReadyMessage.fromObject(object.ready);
			}
			if (object.spectate != null) {
				if (typeof object.spectate !== "object")
					throw TypeError(".shared.ClientMessage.spectate: object expected");
				message.spectate = $root.shared.MatchQuit.fromObject(object.spectate);
			}
			return message;
		};

		/**
		 * Creates a plain object from a ClientMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.ClientMessage
		 * @static
		 * @param {shared.ClientMessage} message ClientMessage
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ClientMessage.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (message.paddleUpdate != null && message.hasOwnProperty("paddleUpdate")) {
				object.paddleUpdate = $root.shared.PaddleUpdate.toObject(message.paddleUpdate, options);
				if (options.oneofs)
					object.payload = "paddleUpdate";
			}
			if (message.quit != null && message.hasOwnProperty("quit")) {
				object.quit = $root.shared.QuitMessage.toObject(message.quit, options);
				if (options.oneofs)
					object.payload = "quit";
			}
			if (message.ready != null && message.hasOwnProperty("ready")) {
				object.ready = $root.shared.ReadyMessage.toObject(message.ready, options);
				if (options.oneofs)
					object.payload = "ready";
			}
			if (message.spectate != null && message.hasOwnProperty("spectate")) {
				object.spectate = $root.shared.MatchQuit.toObject(message.spectate, options);
				if (options.oneofs)
					object.payload = "spectate";
			}
			return object;
		};

		/**
		 * Converts this ClientMessage to JSON.
		 * @function toJSON
		 * @memberof shared.ClientMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ClientMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for ClientMessage
		 * @function getTypeUrl
		 * @memberof shared.ClientMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		ClientMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.ClientMessage";
		};

		return ClientMessage;
	})();

	shared.ServerMessage = (function() {

		/**
		 * Properties of a ServerMessage.
		 * @memberof shared
		 * @interface IServerMessage
		 * @property {shared.IErrorMessage|null} [error] ServerMessage error
		 * @property {shared.IWelcomeMessage|null} [welcome] ServerMessage welcome
		 * @property {shared.IGameStartMessage|null} [start] ServerMessage start
		 * @property {shared.IStateMessage|null} [state] ServerMessage state
		 * @property {shared.IGameEndMessage|null} [end] ServerMessage end
		 */

		/**
		 * Constructs a new ServerMessage.
		 * @memberof shared
		 * @classdesc Represents a ServerMessage.
		 * @implements IServerMessage
		 * @constructor
		 * @param {shared.IServerMessage=} [properties] Properties to set
		 */
		function ServerMessage(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ServerMessage error.
		 * @member {shared.IErrorMessage|null|undefined} error
		 * @memberof shared.ServerMessage
		 * @instance
		 */
		ServerMessage.prototype.error = null;

		/**
		 * ServerMessage welcome.
		 * @member {shared.IWelcomeMessage|null|undefined} welcome
		 * @memberof shared.ServerMessage
		 * @instance
		 */
		ServerMessage.prototype.welcome = null;

		/**
		 * ServerMessage start.
		 * @member {shared.IGameStartMessage|null|undefined} start
		 * @memberof shared.ServerMessage
		 * @instance
		 */
		ServerMessage.prototype.start = null;

		/**
		 * ServerMessage state.
		 * @member {shared.IStateMessage|null|undefined} state
		 * @memberof shared.ServerMessage
		 * @instance
		 */
		ServerMessage.prototype.state = null;

		/**
		 * ServerMessage end.
		 * @member {shared.IGameEndMessage|null|undefined} end
		 * @memberof shared.ServerMessage
		 * @instance
		 */
		ServerMessage.prototype.end = null;

		// OneOf field names bound to virtual getters and setters
		let $oneOfFields;

		/**
		 * ServerMessage payload.
		 * @member {"error"|"welcome"|"start"|"state"|"end"|undefined} payload
		 * @memberof shared.ServerMessage
		 * @instance
		 */
		Object.defineProperty(ServerMessage.prototype, "payload", {
			get: $util.oneOfGetter($oneOfFields = ["error", "welcome", "start", "state", "end"]),
			set: $util.oneOfSetter($oneOfFields)
		});

		/**
		 * Creates a new ServerMessage instance using the specified properties.
		 * @function create
		 * @memberof shared.ServerMessage
		 * @static
		 * @param {shared.IServerMessage=} [properties] Properties to set
		 * @returns {shared.ServerMessage} ServerMessage instance
		 */
		ServerMessage.create = function create(properties) {
			return new ServerMessage(properties);
		};

		/**
		 * Encodes the specified ServerMessage message. Does not implicitly {@link shared.ServerMessage.verify|verify} messages.
		 * @function encode
		 * @memberof shared.ServerMessage
		 * @static
		 * @param {shared.IServerMessage} message ServerMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ServerMessage.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.error != null && Object.hasOwnProperty.call(message, "error"))
				$root.shared.ErrorMessage.encode(message.error, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
			if (message.welcome != null && Object.hasOwnProperty.call(message, "welcome"))
				$root.shared.WelcomeMessage.encode(message.welcome, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
			if (message.start != null && Object.hasOwnProperty.call(message, "start"))
				$root.shared.GameStartMessage.encode(message.start, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
			if (message.state != null && Object.hasOwnProperty.call(message, "state"))
				$root.shared.StateMessage.encode(message.state, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
			if (message.end != null && Object.hasOwnProperty.call(message, "end"))
				$root.shared.GameEndMessage.encode(message.end, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified ServerMessage message, length delimited. Does not implicitly {@link shared.ServerMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.ServerMessage
		 * @static
		 * @param {shared.IServerMessage} message ServerMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ServerMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ServerMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.ServerMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.ServerMessage} ServerMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ServerMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.ServerMessage();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.error = $root.shared.ErrorMessage.decode(reader, reader.uint32());
						break;
					}
					case 2: {
						message.welcome = $root.shared.WelcomeMessage.decode(reader, reader.uint32());
						break;
					}
					case 3: {
						message.start = $root.shared.GameStartMessage.decode(reader, reader.uint32());
						break;
					}
					case 4: {
						message.state = $root.shared.StateMessage.decode(reader, reader.uint32());
						break;
					}
					case 5: {
						message.end = $root.shared.GameEndMessage.decode(reader, reader.uint32());
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a ServerMessage message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.ServerMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.ServerMessage} ServerMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ServerMessage.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a ServerMessage message.
		 * @function verify
		 * @memberof shared.ServerMessage
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		ServerMessage.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			let properties = {};
			if (message.error != null && message.hasOwnProperty("error")) {
				properties.payload = 1;
				{
					let error = $root.shared.ErrorMessage.verify(message.error);
					if (error)
						return "error." + error;
				}
			}
			if (message.welcome != null && message.hasOwnProperty("welcome")) {
				if (properties.payload === 1)
					return "payload: multiple values";
				properties.payload = 1;
				{
					let error = $root.shared.WelcomeMessage.verify(message.welcome);
					if (error)
						return "welcome." + error;
				}
			}
			if (message.start != null && message.hasOwnProperty("start")) {
				if (properties.payload === 1)
					return "payload: multiple values";
				properties.payload = 1;
				{
					let error = $root.shared.GameStartMessage.verify(message.start);
					if (error)
						return "start." + error;
				}
			}
			if (message.state != null && message.hasOwnProperty("state")) {
				if (properties.payload === 1)
					return "payload: multiple values";
				properties.payload = 1;
				{
					let error = $root.shared.StateMessage.verify(message.state);
					if (error)
						return "state." + error;
				}
			}
			if (message.end != null && message.hasOwnProperty("end")) {
				if (properties.payload === 1)
					return "payload: multiple values";
				properties.payload = 1;
				{
					let error = $root.shared.GameEndMessage.verify(message.end);
					if (error)
						return "end." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a ServerMessage message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.ServerMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.ServerMessage} ServerMessage
		 */
		ServerMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.ServerMessage)
				return object;
			let message = new $root.shared.ServerMessage();
			if (object.error != null) {
				if (typeof object.error !== "object")
					throw TypeError(".shared.ServerMessage.error: object expected");
				message.error = $root.shared.ErrorMessage.fromObject(object.error);
			}
			if (object.welcome != null) {
				if (typeof object.welcome !== "object")
					throw TypeError(".shared.ServerMessage.welcome: object expected");
				message.welcome = $root.shared.WelcomeMessage.fromObject(object.welcome);
			}
			if (object.start != null) {
				if (typeof object.start !== "object")
					throw TypeError(".shared.ServerMessage.start: object expected");
				message.start = $root.shared.GameStartMessage.fromObject(object.start);
			}
			if (object.state != null) {
				if (typeof object.state !== "object")
					throw TypeError(".shared.ServerMessage.state: object expected");
				message.state = $root.shared.StateMessage.fromObject(object.state);
			}
			if (object.end != null) {
				if (typeof object.end !== "object")
					throw TypeError(".shared.ServerMessage.end: object expected");
				message.end = $root.shared.GameEndMessage.fromObject(object.end);
			}
			return message;
		};

		/**
		 * Creates a plain object from a ServerMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.ServerMessage
		 * @static
		 * @param {shared.ServerMessage} message ServerMessage
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ServerMessage.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (message.error != null && message.hasOwnProperty("error")) {
				object.error = $root.shared.ErrorMessage.toObject(message.error, options);
				if (options.oneofs)
					object.payload = "error";
			}
			if (message.welcome != null && message.hasOwnProperty("welcome")) {
				object.welcome = $root.shared.WelcomeMessage.toObject(message.welcome, options);
				if (options.oneofs)
					object.payload = "welcome";
			}
			if (message.start != null && message.hasOwnProperty("start")) {
				object.start = $root.shared.GameStartMessage.toObject(message.start, options);
				if (options.oneofs)
					object.payload = "start";
			}
			if (message.state != null && message.hasOwnProperty("state")) {
				object.state = $root.shared.StateMessage.toObject(message.state, options);
				if (options.oneofs)
					object.payload = "state";
			}
			if (message.end != null && message.hasOwnProperty("end")) {
				object.end = $root.shared.GameEndMessage.toObject(message.end, options);
				if (options.oneofs)
					object.payload = "end";
			}
			return object;
		};

		/**
		 * Converts this ServerMessage to JSON.
		 * @function toJSON
		 * @memberof shared.ServerMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ServerMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for ServerMessage
		 * @function getTypeUrl
		 * @memberof shared.ServerMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		ServerMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.ServerMessage";
		};

		return ServerMessage;
	})();

	shared.PhysicsRequest = (function() {

		/**
		 * Properties of a PhysicsRequest.
		 * @memberof shared
		 * @interface IPhysicsRequest
		 * @property {string|null} [gameId] PhysicsRequest gameId
		 * @property {number|Long|null} [tick] PhysicsRequest tick
		 * @property {Array.<shared.IPaddleInput>|null} [input] PhysicsRequest input
		 * @property {number|null} [stage] PhysicsRequest stage
		 */

		/**
		 * Constructs a new PhysicsRequest.
		 * @memberof shared
		 * @classdesc Represents a PhysicsRequest.
		 * @implements IPhysicsRequest
		 * @constructor
		 * @param {shared.IPhysicsRequest=} [properties] Properties to set
		 */
		function PhysicsRequest(properties) {
			this.input = [];
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * PhysicsRequest gameId.
		 * @member {string} gameId
		 * @memberof shared.PhysicsRequest
		 * @instance
		 */
		PhysicsRequest.prototype.gameId = "";

		/**
		 * PhysicsRequest tick.
		 * @member {number|Long} tick
		 * @memberof shared.PhysicsRequest
		 * @instance
		 */
		PhysicsRequest.prototype.tick = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

		/**
		 * PhysicsRequest input.
		 * @member {Array.<shared.IPaddleInput>} input
		 * @memberof shared.PhysicsRequest
		 * @instance
		 */
		PhysicsRequest.prototype.input = $util.emptyArray;

		/**
		 * PhysicsRequest stage.
		 * @member {number} stage
		 * @memberof shared.PhysicsRequest
		 * @instance
		 */
		PhysicsRequest.prototype.stage = 0;

		/**
		 * Creates a new PhysicsRequest instance using the specified properties.
		 * @function create
		 * @memberof shared.PhysicsRequest
		 * @static
		 * @param {shared.IPhysicsRequest=} [properties] Properties to set
		 * @returns {shared.PhysicsRequest} PhysicsRequest instance
		 */
		PhysicsRequest.create = function create(properties) {
			return new PhysicsRequest(properties);
		};

		/**
		 * Encodes the specified PhysicsRequest message. Does not implicitly {@link shared.PhysicsRequest.verify|verify} messages.
		 * @function encode
		 * @memberof shared.PhysicsRequest
		 * @static
		 * @param {shared.IPhysicsRequest} message PhysicsRequest message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PhysicsRequest.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
				writer.uint32(/* id 1, wireType 2 =*/10).string(message.gameId);
			if (message.tick != null && Object.hasOwnProperty.call(message, "tick"))
				writer.uint32(/* id 2, wireType 0 =*/16).int64(message.tick);
			if (message.input != null && message.input.length)
				for (let i = 0; i < message.input.length; ++i)
					$root.shared.PaddleInput.encode(message.input[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
			if (message.stage != null && Object.hasOwnProperty.call(message, "stage"))
				writer.uint32(/* id 4, wireType 0 =*/32).int32(message.stage);
			return writer;
		};

		/**
		 * Encodes the specified PhysicsRequest message, length delimited. Does not implicitly {@link shared.PhysicsRequest.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.PhysicsRequest
		 * @static
		 * @param {shared.IPhysicsRequest} message PhysicsRequest message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PhysicsRequest.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a PhysicsRequest message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.PhysicsRequest
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.PhysicsRequest} PhysicsRequest
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PhysicsRequest.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.PhysicsRequest();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.gameId = reader.string();
						break;
					}
					case 2: {
						message.tick = reader.int64();
						break;
					}
					case 3: {
						if (!(message.input && message.input.length))
							message.input = [];
						message.input.push($root.shared.PaddleInput.decode(reader, reader.uint32()));
						break;
					}
					case 4: {
						message.stage = reader.int32();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a PhysicsRequest message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.PhysicsRequest
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.PhysicsRequest} PhysicsRequest
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PhysicsRequest.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a PhysicsRequest message.
		 * @function verify
		 * @memberof shared.PhysicsRequest
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		PhysicsRequest.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.gameId != null && message.hasOwnProperty("gameId"))
				if (!$util.isString(message.gameId))
					return "gameId: string expected";
			if (message.tick != null && message.hasOwnProperty("tick"))
				if (!$util.isInteger(message.tick) && !(message.tick && $util.isInteger(message.tick.low) && $util.isInteger(message.tick.high)))
					return "tick: integer|Long expected";
			if (message.input != null && message.hasOwnProperty("input")) {
				if (!Array.isArray(message.input))
					return "input: array expected";
				for (let i = 0; i < message.input.length; ++i) {
					let error = $root.shared.PaddleInput.verify(message.input[i]);
					if (error)
						return "input." + error;
				}
			}
			if (message.stage != null && message.hasOwnProperty("stage"))
				if (!$util.isInteger(message.stage))
					return "stage: integer expected";
			return null;
		};

		/**
		 * Creates a PhysicsRequest message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.PhysicsRequest
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.PhysicsRequest} PhysicsRequest
		 */
		PhysicsRequest.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.PhysicsRequest)
				return object;
			let message = new $root.shared.PhysicsRequest();
			if (object.gameId != null)
				message.gameId = String(object.gameId);
			if (object.tick != null)
				if ($util.Long)
					(message.tick = $util.Long.fromValue(object.tick)).unsigned = false;
				else if (typeof object.tick === "string")
					message.tick = parseInt(object.tick, 10);
				else if (typeof object.tick === "number")
					message.tick = object.tick;
				else if (typeof object.tick === "object")
					message.tick = new $util.LongBits(object.tick.low >>> 0, object.tick.high >>> 0).toNumber();
			if (object.input) {
				if (!Array.isArray(object.input))
					throw TypeError(".shared.PhysicsRequest.input: array expected");
				message.input = [];
				for (let i = 0; i < object.input.length; ++i) {
					if (typeof object.input[i] !== "object")
						throw TypeError(".shared.PhysicsRequest.input: object expected");
					message.input[i] = $root.shared.PaddleInput.fromObject(object.input[i]);
				}
			}
			if (object.stage != null)
				message.stage = object.stage | 0;
			return message;
		};

		/**
		 * Creates a plain object from a PhysicsRequest message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.PhysicsRequest
		 * @static
		 * @param {shared.PhysicsRequest} message PhysicsRequest
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		PhysicsRequest.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.arrays || options.defaults)
				object.input = [];
			if (options.defaults) {
				object.gameId = "";
				if ($util.Long) {
					let long = new $util.Long(0, 0, false);
					object.tick = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
				} else
					object.tick = options.longs === String ? "0" : 0;
				object.stage = 0;
			}
			if (message.gameId != null && message.hasOwnProperty("gameId"))
				object.gameId = message.gameId;
			if (message.tick != null && message.hasOwnProperty("tick"))
				if (typeof message.tick === "number")
					object.tick = options.longs === String ? String(message.tick) : message.tick;
				else
					object.tick = options.longs === String ? $util.Long.prototype.toString.call(message.tick) : options.longs === Number ? new $util.LongBits(message.tick.low >>> 0, message.tick.high >>> 0).toNumber() : message.tick;
			if (message.input && message.input.length) {
				object.input = [];
				for (let j = 0; j < message.input.length; ++j)
					object.input[j] = $root.shared.PaddleInput.toObject(message.input[j], options);
			}
			if (message.stage != null && message.hasOwnProperty("stage"))
				object.stage = message.stage;
			return object;
		};

		/**
		 * Converts this PhysicsRequest to JSON.
		 * @function toJSON
		 * @memberof shared.PhysicsRequest
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		PhysicsRequest.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for PhysicsRequest
		 * @function getTypeUrl
		 * @memberof shared.PhysicsRequest
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		PhysicsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.PhysicsRequest";
		};

		return PhysicsRequest;
	})();

	shared.PhysicsResponse = (function() {

		/**
		 * Properties of a PhysicsResponse.
		 * @memberof shared
		 * @interface IPhysicsResponse
		 * @property {string|null} [gameId] PhysicsResponse gameId
		 * @property {number|Long|null} [tick] PhysicsResponse tick
		 * @property {Array.<shared.IBall>|null} [balls] PhysicsResponse balls
		 * @property {Array.<shared.IPaddle>|null} [paddles] PhysicsResponse paddles
		 * @property {shared.IGoal|null} [goal] PhysicsResponse goal
		 */

		/**
		 * Constructs a new PhysicsResponse.
		 * @memberof shared
		 * @classdesc Represents a PhysicsResponse.
		 * @implements IPhysicsResponse
		 * @constructor
		 * @param {shared.IPhysicsResponse=} [properties] Properties to set
		 */
		function PhysicsResponse(properties) {
			this.balls = [];
			this.paddles = [];
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * PhysicsResponse gameId.
		 * @member {string} gameId
		 * @memberof shared.PhysicsResponse
		 * @instance
		 */
		PhysicsResponse.prototype.gameId = "";

		/**
		 * PhysicsResponse tick.
		 * @member {number|Long} tick
		 * @memberof shared.PhysicsResponse
		 * @instance
		 */
		PhysicsResponse.prototype.tick = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

		/**
		 * PhysicsResponse balls.
		 * @member {Array.<shared.IBall>} balls
		 * @memberof shared.PhysicsResponse
		 * @instance
		 */
		PhysicsResponse.prototype.balls = $util.emptyArray;

		/**
		 * PhysicsResponse paddles.
		 * @member {Array.<shared.IPaddle>} paddles
		 * @memberof shared.PhysicsResponse
		 * @instance
		 */
		PhysicsResponse.prototype.paddles = $util.emptyArray;

		/**
		 * PhysicsResponse goal.
		 * @member {shared.IGoal|null|undefined} goal
		 * @memberof shared.PhysicsResponse
		 * @instance
		 */
		PhysicsResponse.prototype.goal = null;

		/**
		 * Creates a new PhysicsResponse instance using the specified properties.
		 * @function create
		 * @memberof shared.PhysicsResponse
		 * @static
		 * @param {shared.IPhysicsResponse=} [properties] Properties to set
		 * @returns {shared.PhysicsResponse} PhysicsResponse instance
		 */
		PhysicsResponse.create = function create(properties) {
			return new PhysicsResponse(properties);
		};

		/**
		 * Encodes the specified PhysicsResponse message. Does not implicitly {@link shared.PhysicsResponse.verify|verify} messages.
		 * @function encode
		 * @memberof shared.PhysicsResponse
		 * @static
		 * @param {shared.IPhysicsResponse} message PhysicsResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PhysicsResponse.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
				writer.uint32(/* id 1, wireType 2 =*/10).string(message.gameId);
			if (message.tick != null && Object.hasOwnProperty.call(message, "tick"))
				writer.uint32(/* id 2, wireType 0 =*/16).int64(message.tick);
			if (message.balls != null && message.balls.length)
				for (let i = 0; i < message.balls.length; ++i)
					$root.shared.Ball.encode(message.balls[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
			if (message.paddles != null && message.paddles.length)
				for (let i = 0; i < message.paddles.length; ++i)
					$root.shared.Paddle.encode(message.paddles[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
			if (message.goal != null && Object.hasOwnProperty.call(message, "goal"))
				$root.shared.Goal.encode(message.goal, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified PhysicsResponse message, length delimited. Does not implicitly {@link shared.PhysicsResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof shared.PhysicsResponse
		 * @static
		 * @param {shared.IPhysicsResponse} message PhysicsResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PhysicsResponse.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a PhysicsResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof shared.PhysicsResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {shared.PhysicsResponse} PhysicsResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PhysicsResponse.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.PhysicsResponse();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.gameId = reader.string();
						break;
					}
					case 2: {
						message.tick = reader.int64();
						break;
					}
					case 3: {
						if (!(message.balls && message.balls.length))
							message.balls = [];
						message.balls.push($root.shared.Ball.decode(reader, reader.uint32()));
						break;
					}
					case 4: {
						if (!(message.paddles && message.paddles.length))
							message.paddles = [];
						message.paddles.push($root.shared.Paddle.decode(reader, reader.uint32()));
						break;
					}
					case 5: {
						message.goal = $root.shared.Goal.decode(reader, reader.uint32());
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a PhysicsResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof shared.PhysicsResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {shared.PhysicsResponse} PhysicsResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PhysicsResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a PhysicsResponse message.
		 * @function verify
		 * @memberof shared.PhysicsResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		PhysicsResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.gameId != null && message.hasOwnProperty("gameId"))
				if (!$util.isString(message.gameId))
					return "gameId: string expected";
			if (message.tick != null && message.hasOwnProperty("tick"))
				if (!$util.isInteger(message.tick) && !(message.tick && $util.isInteger(message.tick.low) && $util.isInteger(message.tick.high)))
					return "tick: integer|Long expected";
			if (message.balls != null && message.hasOwnProperty("balls")) {
				if (!Array.isArray(message.balls))
					return "balls: array expected";
				for (let i = 0; i < message.balls.length; ++i) {
					let error = $root.shared.Ball.verify(message.balls[i]);
					if (error)
						return "balls." + error;
				}
			}
			if (message.paddles != null && message.hasOwnProperty("paddles")) {
				if (!Array.isArray(message.paddles))
					return "paddles: array expected";
				for (let i = 0; i < message.paddles.length; ++i) {
					let error = $root.shared.Paddle.verify(message.paddles[i]);
					if (error)
						return "paddles." + error;
				}
			}
			if (message.goal != null && message.hasOwnProperty("goal")) {
				let error = $root.shared.Goal.verify(message.goal);
				if (error)
					return "goal." + error;
			}
			return null;
		};

		/**
		 * Creates a PhysicsResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof shared.PhysicsResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {shared.PhysicsResponse} PhysicsResponse
		 */
		PhysicsResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.shared.PhysicsResponse)
				return object;
			let message = new $root.shared.PhysicsResponse();
			if (object.gameId != null)
				message.gameId = String(object.gameId);
			if (object.tick != null)
				if ($util.Long)
					(message.tick = $util.Long.fromValue(object.tick)).unsigned = false;
				else if (typeof object.tick === "string")
					message.tick = parseInt(object.tick, 10);
				else if (typeof object.tick === "number")
					message.tick = object.tick;
				else if (typeof object.tick === "object")
					message.tick = new $util.LongBits(object.tick.low >>> 0, object.tick.high >>> 0).toNumber();
			if (object.balls) {
				if (!Array.isArray(object.balls))
					throw TypeError(".shared.PhysicsResponse.balls: array expected");
				message.balls = [];
				for (let i = 0; i < object.balls.length; ++i) {
					if (typeof object.balls[i] !== "object")
						throw TypeError(".shared.PhysicsResponse.balls: object expected");
					message.balls[i] = $root.shared.Ball.fromObject(object.balls[i]);
				}
			}
			if (object.paddles) {
				if (!Array.isArray(object.paddles))
					throw TypeError(".shared.PhysicsResponse.paddles: array expected");
				message.paddles = [];
				for (let i = 0; i < object.paddles.length; ++i) {
					if (typeof object.paddles[i] !== "object")
						throw TypeError(".shared.PhysicsResponse.paddles: object expected");
					message.paddles[i] = $root.shared.Paddle.fromObject(object.paddles[i]);
				}
			}
			if (object.goal != null) {
				if (typeof object.goal !== "object")
					throw TypeError(".shared.PhysicsResponse.goal: object expected");
				message.goal = $root.shared.Goal.fromObject(object.goal);
			}
			return message;
		};

		/**
		 * Creates a plain object from a PhysicsResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof shared.PhysicsResponse
		 * @static
		 * @param {shared.PhysicsResponse} message PhysicsResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		PhysicsResponse.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (options.arrays || options.defaults) {
				object.balls = [];
				object.paddles = [];
			}
			if (options.defaults) {
				object.gameId = "";
				if ($util.Long) {
					let long = new $util.Long(0, 0, false);
					object.tick = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
				} else
					object.tick = options.longs === String ? "0" : 0;
				object.goal = null;
			}
			if (message.gameId != null && message.hasOwnProperty("gameId"))
				object.gameId = message.gameId;
			if (message.tick != null && message.hasOwnProperty("tick"))
				if (typeof message.tick === "number")
					object.tick = options.longs === String ? String(message.tick) : message.tick;
				else
					object.tick = options.longs === String ? $util.Long.prototype.toString.call(message.tick) : options.longs === Number ? new $util.LongBits(message.tick.low >>> 0, message.tick.high >>> 0).toNumber() : message.tick;
			if (message.balls && message.balls.length) {
				object.balls = [];
				for (let j = 0; j < message.balls.length; ++j)
					object.balls[j] = $root.shared.Ball.toObject(message.balls[j], options);
			}
			if (message.paddles && message.paddles.length) {
				object.paddles = [];
				for (let j = 0; j < message.paddles.length; ++j)
					object.paddles[j] = $root.shared.Paddle.toObject(message.paddles[j], options);
			}
			if (message.goal != null && message.hasOwnProperty("goal"))
				object.goal = $root.shared.Goal.toObject(message.goal, options);
			return object;
		};

		/**
		 * Converts this PhysicsResponse to JSON.
		 * @function toJSON
		 * @memberof shared.PhysicsResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		PhysicsResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for PhysicsResponse
		 * @function getTypeUrl
		 * @memberof shared.PhysicsResponse
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		PhysicsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/shared.PhysicsResponse";
		};

		return PhysicsResponse;
	})();

	return shared;
})();

export const google = $root.google = (() => {

	/**
	 * Namespace google.
	 * @exports google
	 * @namespace
	 */
	const google = {};

	google.protobuf = (function() {

		/**
		 * Namespace protobuf.
		 * @memberof google
		 * @namespace
		 */
		const protobuf = {};

		protobuf.Empty = (function() {

			/**
			 * Properties of an Empty.
			 * @memberof google.protobuf
			 * @interface IEmpty
			 */

			/**
			 * Constructs a new Empty.
			 * @memberof google.protobuf
			 * @classdesc Represents an Empty.
			 * @implements IEmpty
			 * @constructor
			 * @param {google.protobuf.IEmpty=} [properties] Properties to set
			 */
			function Empty(properties) {
				if (properties)
					for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
						if (properties[keys[i]] != null)
							this[keys[i]] = properties[keys[i]];
			}

			/**
			 * Creates a new Empty instance using the specified properties.
			 * @function create
			 * @memberof google.protobuf.Empty
			 * @static
			 * @param {google.protobuf.IEmpty=} [properties] Properties to set
			 * @returns {google.protobuf.Empty} Empty instance
			 */
			Empty.create = function create(properties) {
				return new Empty(properties);
			};

			/**
			 * Encodes the specified Empty message. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
			 * @function encode
			 * @memberof google.protobuf.Empty
			 * @static
			 * @param {google.protobuf.IEmpty} message Empty message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			Empty.encode = function encode(message, writer) {
				if (!writer)
					writer = $Writer.create();
				return writer;
			};

			/**
			 * Encodes the specified Empty message, length delimited. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
			 * @function encodeDelimited
			 * @memberof google.protobuf.Empty
			 * @static
			 * @param {google.protobuf.IEmpty} message Empty message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			Empty.encodeDelimited = function encodeDelimited(message, writer) {
				return this.encode(message, writer).ldelim();
			};

			/**
			 * Decodes an Empty message from the specified reader or buffer.
			 * @function decode
			 * @memberof google.protobuf.Empty
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @param {number} [length] Message length if known beforehand
			 * @returns {google.protobuf.Empty} Empty
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			Empty.decode = function decode(reader, length, error) {
				if (!(reader instanceof $Reader))
					reader = $Reader.create(reader);
				let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Empty();
				while (reader.pos < end) {
					let tag = reader.uint32();
					if (tag === error)
						break;
					switch (tag >>> 3) {
						default:
							reader.skipType(tag & 7);
							break;
					}
				}
				return message;
			};

			/**
			 * Decodes an Empty message from the specified reader or buffer, length delimited.
			 * @function decodeDelimited
			 * @memberof google.protobuf.Empty
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @returns {google.protobuf.Empty} Empty
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			Empty.decodeDelimited = function decodeDelimited(reader) {
				if (!(reader instanceof $Reader))
					reader = new $Reader(reader);
				return this.decode(reader, reader.uint32());
			};

			/**
			 * Verifies an Empty message.
			 * @function verify
			 * @memberof google.protobuf.Empty
			 * @static
			 * @param {Object.<string,*>} message Plain object to verify
			 * @returns {string|null} `null` if valid, otherwise the reason why it is not
			 */
			Empty.verify = function verify(message) {
				if (typeof message !== "object" || message === null)
					return "object expected";
				return null;
			};

			/**
			 * Creates an Empty message from a plain object. Also converts values to their respective internal types.
			 * @function fromObject
			 * @memberof google.protobuf.Empty
			 * @static
			 * @param {Object.<string,*>} object Plain object
			 * @returns {google.protobuf.Empty} Empty
			 */
			Empty.fromObject = function fromObject(object) {
				if (object instanceof $root.google.protobuf.Empty)
					return object;
				return new $root.google.protobuf.Empty();
			};

			/**
			 * Creates a plain object from an Empty message. Also converts values to other types if specified.
			 * @function toObject
			 * @memberof google.protobuf.Empty
			 * @static
			 * @param {google.protobuf.Empty} message Empty
			 * @param {$protobuf.IConversionOptions} [options] Conversion options
			 * @returns {Object.<string,*>} Plain object
			 */
			Empty.toObject = function toObject() {
				return {};
			};

			/**
			 * Converts this Empty to JSON.
			 * @function toJSON
			 * @memberof google.protobuf.Empty
			 * @instance
			 * @returns {Object.<string,*>} JSON object
			 */
			Empty.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
			};

			/**
			 * Gets the default type url for Empty
			 * @function getTypeUrl
			 * @memberof google.protobuf.Empty
			 * @static
			 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
			 * @returns {string} The default type url
			 */
			Empty.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
				if (typeUrlPrefix === undefined) {
					typeUrlPrefix = "type.googleapis.com";
				}
				return typeUrlPrefix + "/google.protobuf.Empty";
			};

			return Empty;
		})();

		return protobuf;
	})();

	return google;
})();

export { $root as default };
