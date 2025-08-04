/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const game = $root.game = (() => {

	/**
	 * Namespace game.
	 * @exports game
	 * @namespace
	 */
	const game = {};

	game.Ball = (function() {

		/**
		 * Properties of a Ball.
		 * @memberof game
		 * @interface IBall
		 * @property {number|null} [id] Ball id
		 * @property {number|null} [x] Ball x
		 * @property {number|null} [y] Ball y
		 * @property {number|null} [vx] Ball vx
		 * @property {number|null} [vy] Ball vy
		 */

		/**
		 * Constructs a new Ball.
		 * @memberof game
		 * @classdesc Represents a Ball.
		 * @implements IBall
		 * @constructor
		 * @param {game.IBall=} [properties] Properties to set
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
		 * @memberof game.Ball
		 * @instance
		 */
		Ball.prototype.id = 0;

		/**
		 * Ball x.
		 * @member {number} x
		 * @memberof game.Ball
		 * @instance
		 */
		Ball.prototype.x = 0;

		/**
		 * Ball y.
		 * @member {number} y
		 * @memberof game.Ball
		 * @instance
		 */
		Ball.prototype.y = 0;

		/**
		 * Ball vx.
		 * @member {number} vx
		 * @memberof game.Ball
		 * @instance
		 */
		Ball.prototype.vx = 0;

		/**
		 * Ball vy.
		 * @member {number} vy
		 * @memberof game.Ball
		 * @instance
		 */
		Ball.prototype.vy = 0;

		/**
		 * Creates a new Ball instance using the specified properties.
		 * @function create
		 * @memberof game.Ball
		 * @static
		 * @param {game.IBall=} [properties] Properties to set
		 * @returns {game.Ball} Ball instance
		 */
		Ball.create = function create(properties) {
			return new Ball(properties);
		};

		/**
		 * Encodes the specified Ball message. Does not implicitly {@link game.Ball.verify|verify} messages.
		 * @function encode
		 * @memberof game.Ball
		 * @static
		 * @param {game.IBall} message Ball message or plain object to encode
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
		 * Encodes the specified Ball message, length delimited. Does not implicitly {@link game.Ball.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof game.Ball
		 * @static
		 * @param {game.IBall} message Ball message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Ball.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a Ball message from the specified reader or buffer.
		 * @function decode
		 * @memberof game.Ball
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {game.Ball} Ball
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Ball.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.Ball();
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
		 * @memberof game.Ball
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {game.Ball} Ball
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
		 * @memberof game.Ball
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
		 * @memberof game.Ball
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {game.Ball} Ball
		 */
		Ball.fromObject = function fromObject(object) {
			if (object instanceof $root.game.Ball)
				return object;
			let message = new $root.game.Ball();
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
		 * @memberof game.Ball
		 * @static
		 * @param {game.Ball} message Ball
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
		 * @memberof game.Ball
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		Ball.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for Ball
		 * @function getTypeUrl
		 * @memberof game.Ball
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		Ball.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/game.Ball";
		};

		return Ball;
	})();

	game.Paddle = (function() {

		/**
		 * Properties of a Paddle.
		 * @memberof game
		 * @interface IPaddle
		 * @property {number|null} [id] Paddle id
		 * @property {number|null} [move] Paddle move
		 * @property {boolean|null} [dead] Paddle dead
		 */

		/**
		 * Constructs a new Paddle.
		 * @memberof game
		 * @classdesc Represents a Paddle.
		 * @implements IPaddle
		 * @constructor
		 * @param {game.IPaddle=} [properties] Properties to set
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
		 * @memberof game.Paddle
		 * @instance
		 */
		Paddle.prototype.id = 0;

		/**
		 * Paddle move.
		 * @member {number} move
		 * @memberof game.Paddle
		 * @instance
		 */
		Paddle.prototype.move = 0;

		/**
		 * Paddle dead.
		 * @member {boolean} dead
		 * @memberof game.Paddle
		 * @instance
		 */
		Paddle.prototype.dead = false;

		/**
		 * Creates a new Paddle instance using the specified properties.
		 * @function create
		 * @memberof game.Paddle
		 * @static
		 * @param {game.IPaddle=} [properties] Properties to set
		 * @returns {game.Paddle} Paddle instance
		 */
		Paddle.create = function create(properties) {
			return new Paddle(properties);
		};

		/**
		 * Encodes the specified Paddle message. Does not implicitly {@link game.Paddle.verify|verify} messages.
		 * @function encode
		 * @memberof game.Paddle
		 * @static
		 * @param {game.IPaddle} message Paddle message or plain object to encode
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
		 * Encodes the specified Paddle message, length delimited. Does not implicitly {@link game.Paddle.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof game.Paddle
		 * @static
		 * @param {game.IPaddle} message Paddle message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Paddle.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a Paddle message from the specified reader or buffer.
		 * @function decode
		 * @memberof game.Paddle
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {game.Paddle} Paddle
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Paddle.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.Paddle();
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
		 * @memberof game.Paddle
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {game.Paddle} Paddle
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
		 * @memberof game.Paddle
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
		 * @memberof game.Paddle
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {game.Paddle} Paddle
		 */
		Paddle.fromObject = function fromObject(object) {
			if (object instanceof $root.game.Paddle)
				return object;
			let message = new $root.game.Paddle();
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
		 * @memberof game.Paddle
		 * @static
		 * @param {game.Paddle} message Paddle
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
		 * @memberof game.Paddle
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		Paddle.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for Paddle
		 * @function getTypeUrl
		 * @memberof game.Paddle
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		Paddle.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/game.Paddle";
		};

		return Paddle;
	})();

	game.MatchState = (function() {

		/**
		 * Properties of a MatchState.
		 * @memberof game
		 * @interface IMatchState
		 * @property {string|null} [gameId] MatchState gameId
		 * @property {number|Long|null} [tick] MatchState tick
		 * @property {Array.<game.IBall>|null} [balls] MatchState balls
		 * @property {Array.<game.IPaddle>|null} [paddles] MatchState paddles
		 * @property {Array.<number>|null} [score] MatchState score
		 * @property {Array.<number>|null} [ranks] MatchState ranks
		 * @property {number|null} [stage] MatchState stage
		 */

		/**
		 * Constructs a new MatchState.
		 * @memberof game
		 * @classdesc Represents a MatchState.
		 * @implements IMatchState
		 * @constructor
		 * @param {game.IMatchState=} [properties] Properties to set
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
		 * @memberof game.MatchState
		 * @instance
		 */
		MatchState.prototype.gameId = "";

		/**
		 * MatchState tick.
		 * @member {number|Long} tick
		 * @memberof game.MatchState
		 * @instance
		 */
		MatchState.prototype.tick = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

		/**
		 * MatchState balls.
		 * @member {Array.<game.IBall>} balls
		 * @memberof game.MatchState
		 * @instance
		 */
		MatchState.prototype.balls = $util.emptyArray;

		/**
		 * MatchState paddles.
		 * @member {Array.<game.IPaddle>} paddles
		 * @memberof game.MatchState
		 * @instance
		 */
		MatchState.prototype.paddles = $util.emptyArray;

		/**
		 * MatchState score.
		 * @member {Array.<number>} score
		 * @memberof game.MatchState
		 * @instance
		 */
		MatchState.prototype.score = $util.emptyArray;

		/**
		 * MatchState ranks.
		 * @member {Array.<number>} ranks
		 * @memberof game.MatchState
		 * @instance
		 */
		MatchState.prototype.ranks = $util.emptyArray;

		/**
		 * MatchState stage.
		 * @member {number} stage
		 * @memberof game.MatchState
		 * @instance
		 */
		MatchState.prototype.stage = 0;

		/**
		 * Creates a new MatchState instance using the specified properties.
		 * @function create
		 * @memberof game.MatchState
		 * @static
		 * @param {game.IMatchState=} [properties] Properties to set
		 * @returns {game.MatchState} MatchState instance
		 */
		MatchState.create = function create(properties) {
			return new MatchState(properties);
		};

		/**
		 * Encodes the specified MatchState message. Does not implicitly {@link game.MatchState.verify|verify} messages.
		 * @function encode
		 * @memberof game.MatchState
		 * @static
		 * @param {game.IMatchState} message MatchState message or plain object to encode
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
					$root.game.Ball.encode(message.balls[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
			if (message.paddles != null && message.paddles.length)
				for (let i = 0; i < message.paddles.length; ++i)
					$root.game.Paddle.encode(message.paddles[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
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
		 * Encodes the specified MatchState message, length delimited. Does not implicitly {@link game.MatchState.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof game.MatchState
		 * @static
		 * @param {game.IMatchState} message MatchState message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MatchState.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a MatchState message from the specified reader or buffer.
		 * @function decode
		 * @memberof game.MatchState
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {game.MatchState} MatchState
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MatchState.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.MatchState();
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
						message.balls.push($root.game.Ball.decode(reader, reader.uint32()));
						break;
					}
					case 4: {
						if (!(message.paddles && message.paddles.length))
							message.paddles = [];
						message.paddles.push($root.game.Paddle.decode(reader, reader.uint32()));
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
		 * @memberof game.MatchState
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {game.MatchState} MatchState
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
		 * @memberof game.MatchState
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
					let error = $root.game.Ball.verify(message.balls[i]);
					if (error)
						return "balls." + error;
				}
			}
			if (message.paddles != null && message.hasOwnProperty("paddles")) {
				if (!Array.isArray(message.paddles))
					return "paddles: array expected";
				for (let i = 0; i < message.paddles.length; ++i) {
					let error = $root.game.Paddle.verify(message.paddles[i]);
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
		 * @memberof game.MatchState
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {game.MatchState} MatchState
		 */
		MatchState.fromObject = function fromObject(object) {
			if (object instanceof $root.game.MatchState)
				return object;
			let message = new $root.game.MatchState();
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
					throw TypeError(".game.MatchState.balls: array expected");
				message.balls = [];
				for (let i = 0; i < object.balls.length; ++i) {
					if (typeof object.balls[i] !== "object")
						throw TypeError(".game.MatchState.balls: object expected");
					message.balls[i] = $root.game.Ball.fromObject(object.balls[i]);
				}
			}
			if (object.paddles) {
				if (!Array.isArray(object.paddles))
					throw TypeError(".game.MatchState.paddles: array expected");
				message.paddles = [];
				for (let i = 0; i < object.paddles.length; ++i) {
					if (typeof object.paddles[i] !== "object")
						throw TypeError(".game.MatchState.paddles: object expected");
					message.paddles[i] = $root.game.Paddle.fromObject(object.paddles[i]);
				}
			}
			if (object.score) {
				if (!Array.isArray(object.score))
					throw TypeError(".game.MatchState.score: array expected");
				message.score = [];
				for (let i = 0; i < object.score.length; ++i)
					message.score[i] = object.score[i] | 0;
			}
			if (object.ranks) {
				if (!Array.isArray(object.ranks))
					throw TypeError(".game.MatchState.ranks: array expected");
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
		 * @memberof game.MatchState
		 * @static
		 * @param {game.MatchState} message MatchState
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
					object.balls[j] = $root.game.Ball.toObject(message.balls[j], options);
			}
			if (message.paddles && message.paddles.length) {
				object.paddles = [];
				for (let j = 0; j < message.paddles.length; ++j)
					object.paddles[j] = $root.game.Paddle.toObject(message.paddles[j], options);
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
		 * @memberof game.MatchState
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		MatchState.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for MatchState
		 * @function getTypeUrl
		 * @memberof game.MatchState
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		MatchState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/game.MatchState";
		};

		return MatchState;
	})();

	game.PaddleUpdate = (function() {

		/**
		 * Properties of a PaddleUpdate.
		 * @memberof game
		 * @interface IPaddleUpdate
		 * @property {number|null} [paddleId] PaddleUpdate paddleId
		 * @property {number|null} [move] PaddleUpdate move
		 */

		/**
		 * Constructs a new PaddleUpdate.
		 * @memberof game
		 * @classdesc Represents a PaddleUpdate.
		 * @implements IPaddleUpdate
		 * @constructor
		 * @param {game.IPaddleUpdate=} [properties] Properties to set
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
		 * @memberof game.PaddleUpdate
		 * @instance
		 */
		PaddleUpdate.prototype.paddleId = 0;

		/**
		 * PaddleUpdate move.
		 * @member {number} move
		 * @memberof game.PaddleUpdate
		 * @instance
		 */
		PaddleUpdate.prototype.move = 0;

		/**
		 * Creates a new PaddleUpdate instance using the specified properties.
		 * @function create
		 * @memberof game.PaddleUpdate
		 * @static
		 * @param {game.IPaddleUpdate=} [properties] Properties to set
		 * @returns {game.PaddleUpdate} PaddleUpdate instance
		 */
		PaddleUpdate.create = function create(properties) {
			return new PaddleUpdate(properties);
		};

		/**
		 * Encodes the specified PaddleUpdate message. Does not implicitly {@link game.PaddleUpdate.verify|verify} messages.
		 * @function encode
		 * @memberof game.PaddleUpdate
		 * @static
		 * @param {game.IPaddleUpdate} message PaddleUpdate message or plain object to encode
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
		 * Encodes the specified PaddleUpdate message, length delimited. Does not implicitly {@link game.PaddleUpdate.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof game.PaddleUpdate
		 * @static
		 * @param {game.IPaddleUpdate} message PaddleUpdate message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PaddleUpdate.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a PaddleUpdate message from the specified reader or buffer.
		 * @function decode
		 * @memberof game.PaddleUpdate
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {game.PaddleUpdate} PaddleUpdate
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PaddleUpdate.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.PaddleUpdate();
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
		 * @memberof game.PaddleUpdate
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {game.PaddleUpdate} PaddleUpdate
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
		 * @memberof game.PaddleUpdate
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
		 * @memberof game.PaddleUpdate
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {game.PaddleUpdate} PaddleUpdate
		 */
		PaddleUpdate.fromObject = function fromObject(object) {
			if (object instanceof $root.game.PaddleUpdate)
				return object;
			let message = new $root.game.PaddleUpdate();
			if (object.paddleId != null)
				message.paddleId = object.paddleId | 0;
			if (object.move != null)
				message.move = object.move | 0;
			return message;
		};

		/**
		 * Creates a plain object from a PaddleUpdate message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof game.PaddleUpdate
		 * @static
		 * @param {game.PaddleUpdate} message PaddleUpdate
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
		 * @memberof game.PaddleUpdate
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		PaddleUpdate.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for PaddleUpdate
		 * @function getTypeUrl
		 * @memberof game.PaddleUpdate
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		PaddleUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/game.PaddleUpdate";
		};

		return PaddleUpdate;
	})();

	game.QuitMessage = (function() {

		/**
		 * Properties of a QuitMessage.
		 * @memberof game
		 * @interface IQuitMessage
		 */

		/**
		 * Constructs a new QuitMessage.
		 * @memberof game
		 * @classdesc Represents a QuitMessage.
		 * @implements IQuitMessage
		 * @constructor
		 * @param {game.IQuitMessage=} [properties] Properties to set
		 */
		function QuitMessage(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * Creates a new QuitMessage instance using the specified properties.
		 * @function create
		 * @memberof game.QuitMessage
		 * @static
		 * @param {game.IQuitMessage=} [properties] Properties to set
		 * @returns {game.QuitMessage} QuitMessage instance
		 */
		QuitMessage.create = function create(properties) {
			return new QuitMessage(properties);
		};

		/**
		 * Encodes the specified QuitMessage message. Does not implicitly {@link game.QuitMessage.verify|verify} messages.
		 * @function encode
		 * @memberof game.QuitMessage
		 * @static
		 * @param {game.IQuitMessage} message QuitMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		QuitMessage.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			return writer;
		};

		/**
		 * Encodes the specified QuitMessage message, length delimited. Does not implicitly {@link game.QuitMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof game.QuitMessage
		 * @static
		 * @param {game.IQuitMessage} message QuitMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		QuitMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a QuitMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof game.QuitMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {game.QuitMessage} QuitMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		QuitMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.QuitMessage();
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
		 * Decodes a QuitMessage message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof game.QuitMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {game.QuitMessage} QuitMessage
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
		 * @memberof game.QuitMessage
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		QuitMessage.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			return null;
		};

		/**
		 * Creates a QuitMessage message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof game.QuitMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {game.QuitMessage} QuitMessage
		 */
		QuitMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.game.QuitMessage)
				return object;
			return new $root.game.QuitMessage();
		};

		/**
		 * Creates a plain object from a QuitMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof game.QuitMessage
		 * @static
		 * @param {game.QuitMessage} message QuitMessage
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		QuitMessage.toObject = function toObject() {
			return {};
		};

		/**
		 * Converts this QuitMessage to JSON.
		 * @function toJSON
		 * @memberof game.QuitMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		QuitMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for QuitMessage
		 * @function getTypeUrl
		 * @memberof game.QuitMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		QuitMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/game.QuitMessage";
		};

		return QuitMessage;
	})();

	game.ReadyMessage = (function() {

		/**
		 * Properties of a ReadyMessage.
		 * @memberof game
		 * @interface IReadyMessage
		 */

		/**
		 * Constructs a new ReadyMessage.
		 * @memberof game
		 * @classdesc Represents a ReadyMessage.
		 * @implements IReadyMessage
		 * @constructor
		 * @param {game.IReadyMessage=} [properties] Properties to set
		 */
		function ReadyMessage(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * Creates a new ReadyMessage instance using the specified properties.
		 * @function create
		 * @memberof game.ReadyMessage
		 * @static
		 * @param {game.IReadyMessage=} [properties] Properties to set
		 * @returns {game.ReadyMessage} ReadyMessage instance
		 */
		ReadyMessage.create = function create(properties) {
			return new ReadyMessage(properties);
		};

		/**
		 * Encodes the specified ReadyMessage message. Does not implicitly {@link game.ReadyMessage.verify|verify} messages.
		 * @function encode
		 * @memberof game.ReadyMessage
		 * @static
		 * @param {game.IReadyMessage} message ReadyMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ReadyMessage.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			return writer;
		};

		/**
		 * Encodes the specified ReadyMessage message, length delimited. Does not implicitly {@link game.ReadyMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof game.ReadyMessage
		 * @static
		 * @param {game.IReadyMessage} message ReadyMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ReadyMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ReadyMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof game.ReadyMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {game.ReadyMessage} ReadyMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ReadyMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.ReadyMessage();
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
		 * Decodes a ReadyMessage message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof game.ReadyMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {game.ReadyMessage} ReadyMessage
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
		 * @memberof game.ReadyMessage
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		ReadyMessage.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			return null;
		};

		/**
		 * Creates a ReadyMessage message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof game.ReadyMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {game.ReadyMessage} ReadyMessage
		 */
		ReadyMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.game.ReadyMessage)
				return object;
			return new $root.game.ReadyMessage();
		};

		/**
		 * Creates a plain object from a ReadyMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof game.ReadyMessage
		 * @static
		 * @param {game.ReadyMessage} message ReadyMessage
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ReadyMessage.toObject = function toObject() {
			return {};
		};

		/**
		 * Converts this ReadyMessage to JSON.
		 * @function toJSON
		 * @memberof game.ReadyMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ReadyMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for ReadyMessage
		 * @function getTypeUrl
		 * @memberof game.ReadyMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		ReadyMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/game.ReadyMessage";
		};

		return ReadyMessage;
	})();

	game.SpectateMessage = (function() {

		/**
		 * Properties of a SpectateMessage.
		 * @memberof game
		 * @interface ISpectateMessage
		 */

		/**
		 * Constructs a new SpectateMessage.
		 * @memberof game
		 * @classdesc Represents a SpectateMessage.
		 * @implements ISpectateMessage
		 * @constructor
		 * @param {game.ISpectateMessage=} [properties] Properties to set
		 */
		function SpectateMessage(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * Creates a new SpectateMessage instance using the specified properties.
		 * @function create
		 * @memberof game.SpectateMessage
		 * @static
		 * @param {game.ISpectateMessage=} [properties] Properties to set
		 * @returns {game.SpectateMessage} SpectateMessage instance
		 */
		SpectateMessage.create = function create(properties) {
			return new SpectateMessage(properties);
		};

		/**
		 * Encodes the specified SpectateMessage message. Does not implicitly {@link game.SpectateMessage.verify|verify} messages.
		 * @function encode
		 * @memberof game.SpectateMessage
		 * @static
		 * @param {game.ISpectateMessage} message SpectateMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SpectateMessage.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			return writer;
		};

		/**
		 * Encodes the specified SpectateMessage message, length delimited. Does not implicitly {@link game.SpectateMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof game.SpectateMessage
		 * @static
		 * @param {game.ISpectateMessage} message SpectateMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SpectateMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SpectateMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof game.SpectateMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {game.SpectateMessage} SpectateMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SpectateMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.SpectateMessage();
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
		 * Decodes a SpectateMessage message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof game.SpectateMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {game.SpectateMessage} SpectateMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SpectateMessage.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader))
				reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SpectateMessage message.
		 * @function verify
		 * @memberof game.SpectateMessage
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SpectateMessage.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			return null;
		};

		/**
		 * Creates a SpectateMessage message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof game.SpectateMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {game.SpectateMessage} SpectateMessage
		 */
		SpectateMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.game.SpectateMessage)
				return object;
			return new $root.game.SpectateMessage();
		};

		/**
		 * Creates a plain object from a SpectateMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof game.SpectateMessage
		 * @static
		 * @param {game.SpectateMessage} message SpectateMessage
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SpectateMessage.toObject = function toObject() {
			return {};
		};

		/**
		 * Converts this SpectateMessage to JSON.
		 * @function toJSON
		 * @memberof game.SpectateMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SpectateMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for SpectateMessage
		 * @function getTypeUrl
		 * @memberof game.SpectateMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		SpectateMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/game.SpectateMessage";
		};

		return SpectateMessage;
	})();

	game.ClientMessage = (function() {

		/**
		 * Properties of a ClientMessage.
		 * @memberof game
		 * @interface IClientMessage
		 * @property {game.IPaddleUpdate|null} [paddleUpdate] ClientMessage paddleUpdate
		 * @property {game.IQuitMessage|null} [quit] ClientMessage quit
		 * @property {game.IReadyMessage|null} [ready] ClientMessage ready
		 * @property {game.ISpectateMessage|null} [spectate] ClientMessage spectate
		 */

		/**
		 * Constructs a new ClientMessage.
		 * @memberof game
		 * @classdesc Represents a ClientMessage.
		 * @implements IClientMessage
		 * @constructor
		 * @param {game.IClientMessage=} [properties] Properties to set
		 */
		function ClientMessage(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ClientMessage paddleUpdate.
		 * @member {game.IPaddleUpdate|null|undefined} paddleUpdate
		 * @memberof game.ClientMessage
		 * @instance
		 */
		ClientMessage.prototype.paddleUpdate = null;

		/**
		 * ClientMessage quit.
		 * @member {game.IQuitMessage|null|undefined} quit
		 * @memberof game.ClientMessage
		 * @instance
		 */
		ClientMessage.prototype.quit = null;

		/**
		 * ClientMessage ready.
		 * @member {game.IReadyMessage|null|undefined} ready
		 * @memberof game.ClientMessage
		 * @instance
		 */
		ClientMessage.prototype.ready = null;

		/**
		 * ClientMessage spectate.
		 * @member {game.ISpectateMessage|null|undefined} spectate
		 * @memberof game.ClientMessage
		 * @instance
		 */
		ClientMessage.prototype.spectate = null;

		// OneOf field names bound to virtual getters and setters
		let $oneOfFields;

		/**
		 * ClientMessage payload.
		 * @member {"paddleUpdate"|"quit"|"ready"|"spectate"|undefined} payload
		 * @memberof game.ClientMessage
		 * @instance
		 */
		Object.defineProperty(ClientMessage.prototype, "payload", {
			get: $util.oneOfGetter($oneOfFields = ["paddleUpdate", "quit", "ready", "spectate"]),
			set: $util.oneOfSetter($oneOfFields)
		});

		/**
		 * Creates a new ClientMessage instance using the specified properties.
		 * @function create
		 * @memberof game.ClientMessage
		 * @static
		 * @param {game.IClientMessage=} [properties] Properties to set
		 * @returns {game.ClientMessage} ClientMessage instance
		 */
		ClientMessage.create = function create(properties) {
			return new ClientMessage(properties);
		};

		/**
		 * Encodes the specified ClientMessage message. Does not implicitly {@link game.ClientMessage.verify|verify} messages.
		 * @function encode
		 * @memberof game.ClientMessage
		 * @static
		 * @param {game.IClientMessage} message ClientMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ClientMessage.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.paddleUpdate != null && Object.hasOwnProperty.call(message, "paddleUpdate"))
				$root.game.PaddleUpdate.encode(message.paddleUpdate, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
			if (message.quit != null && Object.hasOwnProperty.call(message, "quit"))
				$root.game.QuitMessage.encode(message.quit, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
			if (message.ready != null && Object.hasOwnProperty.call(message, "ready"))
				$root.game.ReadyMessage.encode(message.ready, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
			if (message.spectate != null && Object.hasOwnProperty.call(message, "spectate"))
				$root.game.SpectateMessage.encode(message.spectate, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified ClientMessage message, length delimited. Does not implicitly {@link game.ClientMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof game.ClientMessage
		 * @static
		 * @param {game.IClientMessage} message ClientMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ClientMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ClientMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof game.ClientMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {game.ClientMessage} ClientMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ClientMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.ClientMessage();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.paddleUpdate = $root.game.PaddleUpdate.decode(reader, reader.uint32());
						break;
					}
					case 2: {
						message.quit = $root.game.QuitMessage.decode(reader, reader.uint32());
						break;
					}
					case 3: {
						message.ready = $root.game.ReadyMessage.decode(reader, reader.uint32());
						break;
					}
					case 4: {
						message.spectate = $root.game.SpectateMessage.decode(reader, reader.uint32());
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
		 * @memberof game.ClientMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {game.ClientMessage} ClientMessage
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
		 * @memberof game.ClientMessage
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
					let error = $root.game.PaddleUpdate.verify(message.paddleUpdate);
					if (error)
						return "paddleUpdate." + error;
				}
			}
			if (message.quit != null && message.hasOwnProperty("quit")) {
				if (properties.payload === 1)
					return "payload: multiple values";
				properties.payload = 1;
				{
					let error = $root.game.QuitMessage.verify(message.quit);
					if (error)
						return "quit." + error;
				}
			}
			if (message.ready != null && message.hasOwnProperty("ready")) {
				if (properties.payload === 1)
					return "payload: multiple values";
				properties.payload = 1;
				{
					let error = $root.game.ReadyMessage.verify(message.ready);
					if (error)
						return "ready." + error;
				}
			}
			if (message.spectate != null && message.hasOwnProperty("spectate")) {
				if (properties.payload === 1)
					return "payload: multiple values";
				properties.payload = 1;
				{
					let error = $root.game.SpectateMessage.verify(message.spectate);
					if (error)
						return "spectate." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a ClientMessage message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof game.ClientMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {game.ClientMessage} ClientMessage
		 */
		ClientMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.game.ClientMessage)
				return object;
			let message = new $root.game.ClientMessage();
			if (object.paddleUpdate != null) {
				if (typeof object.paddleUpdate !== "object")
					throw TypeError(".game.ClientMessage.paddleUpdate: object expected");
				message.paddleUpdate = $root.game.PaddleUpdate.fromObject(object.paddleUpdate);
			}
			if (object.quit != null) {
				if (typeof object.quit !== "object")
					throw TypeError(".game.ClientMessage.quit: object expected");
				message.quit = $root.game.QuitMessage.fromObject(object.quit);
			}
			if (object.ready != null) {
				if (typeof object.ready !== "object")
					throw TypeError(".game.ClientMessage.ready: object expected");
				message.ready = $root.game.ReadyMessage.fromObject(object.ready);
			}
			if (object.spectate != null) {
				if (typeof object.spectate !== "object")
					throw TypeError(".game.ClientMessage.spectate: object expected");
				message.spectate = $root.game.SpectateMessage.fromObject(object.spectate);
			}
			return message;
		};

		/**
		 * Creates a plain object from a ClientMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof game.ClientMessage
		 * @static
		 * @param {game.ClientMessage} message ClientMessage
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ClientMessage.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (message.paddleUpdate != null && message.hasOwnProperty("paddleUpdate")) {
				object.paddleUpdate = $root.game.PaddleUpdate.toObject(message.paddleUpdate, options);
				if (options.oneofs)
					object.payload = "paddleUpdate";
			}
			if (message.quit != null && message.hasOwnProperty("quit")) {
				object.quit = $root.game.QuitMessage.toObject(message.quit, options);
				if (options.oneofs)
					object.payload = "quit";
			}
			if (message.ready != null && message.hasOwnProperty("ready")) {
				object.ready = $root.game.ReadyMessage.toObject(message.ready, options);
				if (options.oneofs)
					object.payload = "ready";
			}
			if (message.spectate != null && message.hasOwnProperty("spectate")) {
				object.spectate = $root.game.SpectateMessage.toObject(message.spectate, options);
				if (options.oneofs)
					object.payload = "spectate";
			}
			return object;
		};

		/**
		 * Converts this ClientMessage to JSON.
		 * @function toJSON
		 * @memberof game.ClientMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ClientMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for ClientMessage
		 * @function getTypeUrl
		 * @memberof game.ClientMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		ClientMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/game.ClientMessage";
		};

		return ClientMessage;
	})();

	game.ErrorMessage = (function() {

		/**
		 * Properties of an ErrorMessage.
		 * @memberof game
		 * @interface IErrorMessage
		 * @property {string|null} [message] ErrorMessage message
		 */

		/**
		 * Constructs a new ErrorMessage.
		 * @memberof game
		 * @classdesc Represents an ErrorMessage.
		 * @implements IErrorMessage
		 * @constructor
		 * @param {game.IErrorMessage=} [properties] Properties to set
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
		 * @memberof game.ErrorMessage
		 * @instance
		 */
		ErrorMessage.prototype.message = "";

		/**
		 * Creates a new ErrorMessage instance using the specified properties.
		 * @function create
		 * @memberof game.ErrorMessage
		 * @static
		 * @param {game.IErrorMessage=} [properties] Properties to set
		 * @returns {game.ErrorMessage} ErrorMessage instance
		 */
		ErrorMessage.create = function create(properties) {
			return new ErrorMessage(properties);
		};

		/**
		 * Encodes the specified ErrorMessage message. Does not implicitly {@link game.ErrorMessage.verify|verify} messages.
		 * @function encode
		 * @memberof game.ErrorMessage
		 * @static
		 * @param {game.IErrorMessage} message ErrorMessage message or plain object to encode
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
		 * Encodes the specified ErrorMessage message, length delimited. Does not implicitly {@link game.ErrorMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof game.ErrorMessage
		 * @static
		 * @param {game.IErrorMessage} message ErrorMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ErrorMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an ErrorMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof game.ErrorMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {game.ErrorMessage} ErrorMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ErrorMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.ErrorMessage();
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
		 * @memberof game.ErrorMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {game.ErrorMessage} ErrorMessage
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
		 * @memberof game.ErrorMessage
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
		 * @memberof game.ErrorMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {game.ErrorMessage} ErrorMessage
		 */
		ErrorMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.game.ErrorMessage)
				return object;
			let message = new $root.game.ErrorMessage();
			if (object.message != null)
				message.message = String(object.message);
			return message;
		};

		/**
		 * Creates a plain object from an ErrorMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof game.ErrorMessage
		 * @static
		 * @param {game.ErrorMessage} message ErrorMessage
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
		 * @memberof game.ErrorMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ErrorMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for ErrorMessage
		 * @function getTypeUrl
		 * @memberof game.ErrorMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		ErrorMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/game.ErrorMessage";
		};

		return ErrorMessage;
	})();

	game.WelcomeMessage = (function() {

		/**
		 * Properties of a WelcomeMessage.
		 * @memberof game
		 * @interface IWelcomeMessage
		 * @property {number|null} [paddleId] WelcomeMessage paddleId
		 */

		/**
		 * Constructs a new WelcomeMessage.
		 * @memberof game
		 * @classdesc Represents a WelcomeMessage.
		 * @implements IWelcomeMessage
		 * @constructor
		 * @param {game.IWelcomeMessage=} [properties] Properties to set
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
		 * @memberof game.WelcomeMessage
		 * @instance
		 */
		WelcomeMessage.prototype.paddleId = 0;

		/**
		 * Creates a new WelcomeMessage instance using the specified properties.
		 * @function create
		 * @memberof game.WelcomeMessage
		 * @static
		 * @param {game.IWelcomeMessage=} [properties] Properties to set
		 * @returns {game.WelcomeMessage} WelcomeMessage instance
		 */
		WelcomeMessage.create = function create(properties) {
			return new WelcomeMessage(properties);
		};

		/**
		 * Encodes the specified WelcomeMessage message. Does not implicitly {@link game.WelcomeMessage.verify|verify} messages.
		 * @function encode
		 * @memberof game.WelcomeMessage
		 * @static
		 * @param {game.IWelcomeMessage} message WelcomeMessage message or plain object to encode
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
		 * Encodes the specified WelcomeMessage message, length delimited. Does not implicitly {@link game.WelcomeMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof game.WelcomeMessage
		 * @static
		 * @param {game.IWelcomeMessage} message WelcomeMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		WelcomeMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a WelcomeMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof game.WelcomeMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {game.WelcomeMessage} WelcomeMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		WelcomeMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.WelcomeMessage();
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
		 * @memberof game.WelcomeMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {game.WelcomeMessage} WelcomeMessage
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
		 * @memberof game.WelcomeMessage
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
		 * @memberof game.WelcomeMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {game.WelcomeMessage} WelcomeMessage
		 */
		WelcomeMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.game.WelcomeMessage)
				return object;
			let message = new $root.game.WelcomeMessage();
			if (object.paddleId != null)
				message.paddleId = object.paddleId | 0;
			return message;
		};

		/**
		 * Creates a plain object from a WelcomeMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof game.WelcomeMessage
		 * @static
		 * @param {game.WelcomeMessage} message WelcomeMessage
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
		 * @memberof game.WelcomeMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		WelcomeMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for WelcomeMessage
		 * @function getTypeUrl
		 * @memberof game.WelcomeMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		WelcomeMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/game.WelcomeMessage";
		};

		return WelcomeMessage;
	})();

	game.GameStartMessage = (function() {

		/**
		 * Properties of a GameStartMessage.
		 * @memberof game
		 * @interface IGameStartMessage
		 */

		/**
		 * Constructs a new GameStartMessage.
		 * @memberof game
		 * @classdesc Represents a GameStartMessage.
		 * @implements IGameStartMessage
		 * @constructor
		 * @param {game.IGameStartMessage=} [properties] Properties to set
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
		 * @memberof game.GameStartMessage
		 * @static
		 * @param {game.IGameStartMessage=} [properties] Properties to set
		 * @returns {game.GameStartMessage} GameStartMessage instance
		 */
		GameStartMessage.create = function create(properties) {
			return new GameStartMessage(properties);
		};

		/**
		 * Encodes the specified GameStartMessage message. Does not implicitly {@link game.GameStartMessage.verify|verify} messages.
		 * @function encode
		 * @memberof game.GameStartMessage
		 * @static
		 * @param {game.IGameStartMessage} message GameStartMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GameStartMessage.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			return writer;
		};

		/**
		 * Encodes the specified GameStartMessage message, length delimited. Does not implicitly {@link game.GameStartMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof game.GameStartMessage
		 * @static
		 * @param {game.IGameStartMessage} message GameStartMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GameStartMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a GameStartMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof game.GameStartMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {game.GameStartMessage} GameStartMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GameStartMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.GameStartMessage();
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
		 * @memberof game.GameStartMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {game.GameStartMessage} GameStartMessage
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
		 * @memberof game.GameStartMessage
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
		 * @memberof game.GameStartMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {game.GameStartMessage} GameStartMessage
		 */
		GameStartMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.game.GameStartMessage)
				return object;
			return new $root.game.GameStartMessage();
		};

		/**
		 * Creates a plain object from a GameStartMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof game.GameStartMessage
		 * @static
		 * @param {game.GameStartMessage} message GameStartMessage
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		GameStartMessage.toObject = function toObject() {
			return {};
		};

		/**
		 * Converts this GameStartMessage to JSON.
		 * @function toJSON
		 * @memberof game.GameStartMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		GameStartMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for GameStartMessage
		 * @function getTypeUrl
		 * @memberof game.GameStartMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		GameStartMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/game.GameStartMessage";
		};

		return GameStartMessage;
	})();

	game.GameEndMessage = (function() {

		/**
		 * Properties of a GameEndMessage.
		 * @memberof game
		 * @interface IGameEndMessage
		 * @property {Array.<number>|null} [score] GameEndMessage score
		 */

		/**
		 * Constructs a new GameEndMessage.
		 * @memberof game
		 * @classdesc Represents a GameEndMessage.
		 * @implements IGameEndMessage
		 * @constructor
		 * @param {game.IGameEndMessage=} [properties] Properties to set
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
		 * @memberof game.GameEndMessage
		 * @instance
		 */
		GameEndMessage.prototype.score = $util.emptyArray;

		/**
		 * Creates a new GameEndMessage instance using the specified properties.
		 * @function create
		 * @memberof game.GameEndMessage
		 * @static
		 * @param {game.IGameEndMessage=} [properties] Properties to set
		 * @returns {game.GameEndMessage} GameEndMessage instance
		 */
		GameEndMessage.create = function create(properties) {
			return new GameEndMessage(properties);
		};

		/**
		 * Encodes the specified GameEndMessage message. Does not implicitly {@link game.GameEndMessage.verify|verify} messages.
		 * @function encode
		 * @memberof game.GameEndMessage
		 * @static
		 * @param {game.IGameEndMessage} message GameEndMessage message or plain object to encode
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
		 * Encodes the specified GameEndMessage message, length delimited. Does not implicitly {@link game.GameEndMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof game.GameEndMessage
		 * @static
		 * @param {game.IGameEndMessage} message GameEndMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GameEndMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a GameEndMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof game.GameEndMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {game.GameEndMessage} GameEndMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GameEndMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.GameEndMessage();
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
		 * @memberof game.GameEndMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {game.GameEndMessage} GameEndMessage
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
		 * @memberof game.GameEndMessage
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
		 * @memberof game.GameEndMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {game.GameEndMessage} GameEndMessage
		 */
		GameEndMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.game.GameEndMessage)
				return object;
			let message = new $root.game.GameEndMessage();
			if (object.score) {
				if (!Array.isArray(object.score))
					throw TypeError(".game.GameEndMessage.score: array expected");
				message.score = [];
				for (let i = 0; i < object.score.length; ++i)
					message.score[i] = object.score[i] | 0;
			}
			return message;
		};

		/**
		 * Creates a plain object from a GameEndMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof game.GameEndMessage
		 * @static
		 * @param {game.GameEndMessage} message GameEndMessage
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
		 * @memberof game.GameEndMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		GameEndMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for GameEndMessage
		 * @function getTypeUrl
		 * @memberof game.GameEndMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		GameEndMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/game.GameEndMessage";
		};

		return GameEndMessage;
	})();

	game.StateMessage = (function() {

		/**
		 * Properties of a StateMessage.
		 * @memberof game
		 * @interface IStateMessage
		 * @property {game.IMatchState|null} [state] StateMessage state
		 */

		/**
		 * Constructs a new StateMessage.
		 * @memberof game
		 * @classdesc Represents a StateMessage.
		 * @implements IStateMessage
		 * @constructor
		 * @param {game.IStateMessage=} [properties] Properties to set
		 */
		function StateMessage(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * StateMessage state.
		 * @member {game.IMatchState|null|undefined} state
		 * @memberof game.StateMessage
		 * @instance
		 */
		StateMessage.prototype.state = null;

		/**
		 * Creates a new StateMessage instance using the specified properties.
		 * @function create
		 * @memberof game.StateMessage
		 * @static
		 * @param {game.IStateMessage=} [properties] Properties to set
		 * @returns {game.StateMessage} StateMessage instance
		 */
		StateMessage.create = function create(properties) {
			return new StateMessage(properties);
		};

		/**
		 * Encodes the specified StateMessage message. Does not implicitly {@link game.StateMessage.verify|verify} messages.
		 * @function encode
		 * @memberof game.StateMessage
		 * @static
		 * @param {game.IStateMessage} message StateMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		StateMessage.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.state != null && Object.hasOwnProperty.call(message, "state"))
				$root.game.MatchState.encode(message.state, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified StateMessage message, length delimited. Does not implicitly {@link game.StateMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof game.StateMessage
		 * @static
		 * @param {game.IStateMessage} message StateMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		StateMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a StateMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof game.StateMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {game.StateMessage} StateMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		StateMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.StateMessage();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.state = $root.game.MatchState.decode(reader, reader.uint32());
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
		 * @memberof game.StateMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {game.StateMessage} StateMessage
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
		 * @memberof game.StateMessage
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		StateMessage.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.state != null && message.hasOwnProperty("state")) {
				let error = $root.game.MatchState.verify(message.state);
				if (error)
					return "state." + error;
			}
			return null;
		};

		/**
		 * Creates a StateMessage message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof game.StateMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {game.StateMessage} StateMessage
		 */
		StateMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.game.StateMessage)
				return object;
			let message = new $root.game.StateMessage();
			if (object.state != null) {
				if (typeof object.state !== "object")
					throw TypeError(".game.StateMessage.state: object expected");
				message.state = $root.game.MatchState.fromObject(object.state);
			}
			return message;
		};

		/**
		 * Creates a plain object from a StateMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof game.StateMessage
		 * @static
		 * @param {game.StateMessage} message StateMessage
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
				object.state = $root.game.MatchState.toObject(message.state, options);
			return object;
		};

		/**
		 * Converts this StateMessage to JSON.
		 * @function toJSON
		 * @memberof game.StateMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		StateMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for StateMessage
		 * @function getTypeUrl
		 * @memberof game.StateMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		StateMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/game.StateMessage";
		};

		return StateMessage;
	})();

	game.ServerMessage = (function() {

		/**
		 * Properties of a ServerMessage.
		 * @memberof game
		 * @interface IServerMessage
		 * @property {game.IErrorMessage|null} [error] ServerMessage error
		 * @property {game.IWelcomeMessage|null} [welcome] ServerMessage welcome
		 * @property {game.IGameStartMessage|null} [start] ServerMessage start
		 * @property {game.IStateMessage|null} [state] ServerMessage state
		 * @property {game.IGameEndMessage|null} [end] ServerMessage end
		 */

		/**
		 * Constructs a new ServerMessage.
		 * @memberof game
		 * @classdesc Represents a ServerMessage.
		 * @implements IServerMessage
		 * @constructor
		 * @param {game.IServerMessage=} [properties] Properties to set
		 */
		function ServerMessage(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ServerMessage error.
		 * @member {game.IErrorMessage|null|undefined} error
		 * @memberof game.ServerMessage
		 * @instance
		 */
		ServerMessage.prototype.error = null;

		/**
		 * ServerMessage welcome.
		 * @member {game.IWelcomeMessage|null|undefined} welcome
		 * @memberof game.ServerMessage
		 * @instance
		 */
		ServerMessage.prototype.welcome = null;

		/**
		 * ServerMessage start.
		 * @member {game.IGameStartMessage|null|undefined} start
		 * @memberof game.ServerMessage
		 * @instance
		 */
		ServerMessage.prototype.start = null;

		/**
		 * ServerMessage state.
		 * @member {game.IStateMessage|null|undefined} state
		 * @memberof game.ServerMessage
		 * @instance
		 */
		ServerMessage.prototype.state = null;

		/**
		 * ServerMessage end.
		 * @member {game.IGameEndMessage|null|undefined} end
		 * @memberof game.ServerMessage
		 * @instance
		 */
		ServerMessage.prototype.end = null;

		// OneOf field names bound to virtual getters and setters
		let $oneOfFields;

		/**
		 * ServerMessage payload.
		 * @member {"error"|"welcome"|"start"|"state"|"end"|undefined} payload
		 * @memberof game.ServerMessage
		 * @instance
		 */
		Object.defineProperty(ServerMessage.prototype, "payload", {
			get: $util.oneOfGetter($oneOfFields = ["error", "welcome", "start", "state", "end"]),
			set: $util.oneOfSetter($oneOfFields)
		});

		/**
		 * Creates a new ServerMessage instance using the specified properties.
		 * @function create
		 * @memberof game.ServerMessage
		 * @static
		 * @param {game.IServerMessage=} [properties] Properties to set
		 * @returns {game.ServerMessage} ServerMessage instance
		 */
		ServerMessage.create = function create(properties) {
			return new ServerMessage(properties);
		};

		/**
		 * Encodes the specified ServerMessage message. Does not implicitly {@link game.ServerMessage.verify|verify} messages.
		 * @function encode
		 * @memberof game.ServerMessage
		 * @static
		 * @param {game.IServerMessage} message ServerMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ServerMessage.encode = function encode(message, writer) {
			if (!writer)
				writer = $Writer.create();
			if (message.error != null && Object.hasOwnProperty.call(message, "error"))
				$root.game.ErrorMessage.encode(message.error, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
			if (message.welcome != null && Object.hasOwnProperty.call(message, "welcome"))
				$root.game.WelcomeMessage.encode(message.welcome, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
			if (message.start != null && Object.hasOwnProperty.call(message, "start"))
				$root.game.GameStartMessage.encode(message.start, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
			if (message.state != null && Object.hasOwnProperty.call(message, "state"))
				$root.game.StateMessage.encode(message.state, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
			if (message.end != null && Object.hasOwnProperty.call(message, "end"))
				$root.game.GameEndMessage.encode(message.end, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified ServerMessage message, length delimited. Does not implicitly {@link game.ServerMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof game.ServerMessage
		 * @static
		 * @param {game.IServerMessage} message ServerMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ServerMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ServerMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof game.ServerMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {game.ServerMessage} ServerMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ServerMessage.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader))
				reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.ServerMessage();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error)
					break;
				switch (tag >>> 3) {
					case 1: {
						message.error = $root.game.ErrorMessage.decode(reader, reader.uint32());
						break;
					}
					case 2: {
						message.welcome = $root.game.WelcomeMessage.decode(reader, reader.uint32());
						break;
					}
					case 3: {
						message.start = $root.game.GameStartMessage.decode(reader, reader.uint32());
						break;
					}
					case 4: {
						message.state = $root.game.StateMessage.decode(reader, reader.uint32());
						break;
					}
					case 5: {
						message.end = $root.game.GameEndMessage.decode(reader, reader.uint32());
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
		 * @memberof game.ServerMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {game.ServerMessage} ServerMessage
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
		 * @memberof game.ServerMessage
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
					let error = $root.game.ErrorMessage.verify(message.error);
					if (error)
						return "error." + error;
				}
			}
			if (message.welcome != null && message.hasOwnProperty("welcome")) {
				if (properties.payload === 1)
					return "payload: multiple values";
				properties.payload = 1;
				{
					let error = $root.game.WelcomeMessage.verify(message.welcome);
					if (error)
						return "welcome." + error;
				}
			}
			if (message.start != null && message.hasOwnProperty("start")) {
				if (properties.payload === 1)
					return "payload: multiple values";
				properties.payload = 1;
				{
					let error = $root.game.GameStartMessage.verify(message.start);
					if (error)
						return "start." + error;
				}
			}
			if (message.state != null && message.hasOwnProperty("state")) {
				if (properties.payload === 1)
					return "payload: multiple values";
				properties.payload = 1;
				{
					let error = $root.game.StateMessage.verify(message.state);
					if (error)
						return "state." + error;
				}
			}
			if (message.end != null && message.hasOwnProperty("end")) {
				if (properties.payload === 1)
					return "payload: multiple values";
				properties.payload = 1;
				{
					let error = $root.game.GameEndMessage.verify(message.end);
					if (error)
						return "end." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a ServerMessage message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof game.ServerMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {game.ServerMessage} ServerMessage
		 */
		ServerMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.game.ServerMessage)
				return object;
			let message = new $root.game.ServerMessage();
			if (object.error != null) {
				if (typeof object.error !== "object")
					throw TypeError(".game.ServerMessage.error: object expected");
				message.error = $root.game.ErrorMessage.fromObject(object.error);
			}
			if (object.welcome != null) {
				if (typeof object.welcome !== "object")
					throw TypeError(".game.ServerMessage.welcome: object expected");
				message.welcome = $root.game.WelcomeMessage.fromObject(object.welcome);
			}
			if (object.start != null) {
				if (typeof object.start !== "object")
					throw TypeError(".game.ServerMessage.start: object expected");
				message.start = $root.game.GameStartMessage.fromObject(object.start);
			}
			if (object.state != null) {
				if (typeof object.state !== "object")
					throw TypeError(".game.ServerMessage.state: object expected");
				message.state = $root.game.StateMessage.fromObject(object.state);
			}
			if (object.end != null) {
				if (typeof object.end !== "object")
					throw TypeError(".game.ServerMessage.end: object expected");
				message.end = $root.game.GameEndMessage.fromObject(object.end);
			}
			return message;
		};

		/**
		 * Creates a plain object from a ServerMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof game.ServerMessage
		 * @static
		 * @param {game.ServerMessage} message ServerMessage
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ServerMessage.toObject = function toObject(message, options) {
			if (!options)
				options = {};
			let object = {};
			if (message.error != null && message.hasOwnProperty("error")) {
				object.error = $root.game.ErrorMessage.toObject(message.error, options);
				if (options.oneofs)
					object.payload = "error";
			}
			if (message.welcome != null && message.hasOwnProperty("welcome")) {
				object.welcome = $root.game.WelcomeMessage.toObject(message.welcome, options);
				if (options.oneofs)
					object.payload = "welcome";
			}
			if (message.start != null && message.hasOwnProperty("start")) {
				object.start = $root.game.GameStartMessage.toObject(message.start, options);
				if (options.oneofs)
					object.payload = "start";
			}
			if (message.state != null && message.hasOwnProperty("state")) {
				object.state = $root.game.StateMessage.toObject(message.state, options);
				if (options.oneofs)
					object.payload = "state";
			}
			if (message.end != null && message.hasOwnProperty("end")) {
				object.end = $root.game.GameEndMessage.toObject(message.end, options);
				if (options.oneofs)
					object.payload = "end";
			}
			return object;
		};

		/**
		 * Converts this ServerMessage to JSON.
		 * @function toJSON
		 * @memberof game.ServerMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ServerMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for ServerMessage
		 * @function getTypeUrl
		 * @memberof game.ServerMessage
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		ServerMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/game.ServerMessage";
		};

		return ServerMessage;
	})();

	return game;
})();

export { $root as default };
