import * as $protobuf from "protobufjs";
import Long = require("long");
/**
 * * Namespace game.
 * 	 * @exports game
 * 	 * @namespace
 */
export namespace game {

	/**
	 * * Properties of a Ball.
	 * 		 * @memberof game
	 * 		 * @interface IBall
	 * 		 * @property {number|null} [id] Ball id
	 * 		 * @property {number|null} [x] Ball x
	 * 		 * @property {number|null} [y] Ball y
	 * 		 * @property {number|null} [vx] Ball vx
	 * 		 * @property {number|null} [vy] Ball vy
	 */
	interface IBall {

		/** Ball id */
		id?: (number | null);

		/** Ball x */
		x?: (number | null);

		/** Ball y */
		y?: (number | null);

		/** Ball vx */
		vx?: (number | null);

		/** Ball vy */
		vy?: (number | null);
	}

	/**
	 * * Constructs a new Ball.
	 * 		 * @memberof game
	 * 		 * @classdesc Represents a Ball.
	 * 		 * @implements IBall
	 * 		 * @constructor
	 * 		 * @param {game.IBall=} [properties] Properties to set
	 */
	class Ball implements IBall {

		/**
		 * * Constructs a new Ball.
		 * 		 * @memberof game
		 * 		 * @classdesc Represents a Ball.
		 * 		 * @implements IBall
		 * 		 * @constructor
		 * 		 * @param {game.IBall=} [properties] Properties to set
		 */
		constructor(properties?: game.IBall);

		/**
		 * * Ball id.
		 * 		 * @member {number} id
		 * 		 * @memberof game.Ball
		 * 		 * @instance
		 */
		public id: number;

		/**
		 * * Ball x.
		 * 		 * @member {number} x
		 * 		 * @memberof game.Ball
		 * 		 * @instance
		 */
		public x: number;

		/**
		 * * Ball y.
		 * 		 * @member {number} y
		 * 		 * @memberof game.Ball
		 * 		 * @instance
		 */
		public y: number;

		/**
		 * * Ball vx.
		 * 		 * @member {number} vx
		 * 		 * @memberof game.Ball
		 * 		 * @instance
		 */
		public vx: number;

		/**
		 * * Ball vy.
		 * 		 * @member {number} vy
		 * 		 * @memberof game.Ball
		 * 		 * @instance
		 */
		public vy: number;

		/**
		 * * Creates a new Ball instance using the specified properties.
		 * 		 * @function create
		 * 		 * @memberof game.Ball
		 * 		 * @static
		 * 		 * @param {game.IBall=} [properties] Properties to set
		 * 		 * @returns {game.Ball} Ball instance
		 */
		public static create(properties?: game.IBall): game.Ball;

		/**
		 * * Encodes the specified Ball message. Does not implicitly {@link game.Ball.verify|verify} messages.
		 * 		 * @function encode
		 * 		 * @memberof game.Ball
		 * 		 * @static
		 * 		 * @param {game.IBall} message Ball message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encode(message: game.IBall, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Encodes the specified Ball message, length delimited. Does not implicitly {@link game.Ball.verify|verify} messages.
		 * 		 * @function encodeDelimited
		 * 		 * @memberof game.Ball
		 * 		 * @static
		 * 		 * @param {game.IBall} message Ball message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encodeDelimited(message: game.IBall, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Decodes a Ball message from the specified reader or buffer.
		 * 		 * @function decode
		 * 		 * @memberof game.Ball
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @param {number} [length] Message length if known beforehand
		 * 		 * @returns {game.Ball} Ball
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): game.Ball;

		/**
		 * * Decodes a Ball message from the specified reader or buffer, length delimited.
		 * 		 * @function decodeDelimited
		 * 		 * @memberof game.Ball
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @returns {game.Ball} Ball
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): game.Ball;

		/**
		 * * Verifies a Ball message.
		 * 		 * @function verify
		 * 		 * @memberof game.Ball
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} message Plain object to verify
		 * 		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): (string | null);

		/**
		 * * Creates a Ball message from a plain object. Also converts values to their respective internal types.
		 * 		 * @function fromObject
		 * 		 * @memberof game.Ball
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} object Plain object
		 * 		 * @returns {game.Ball} Ball
		 */
		public static fromObject(object: { [k: string]: any }): game.Ball;

		/**
		 * * Creates a plain object from a Ball message. Also converts values to other types if specified.
		 * 		 * @function toObject
		 * 		 * @memberof game.Ball
		 * 		 * @static
		 * 		 * @param {game.Ball} message Ball
		 * 		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * 		 * @returns {Object.<string,*>} Plain object
		 */
		public static toObject(message: game.Ball, options?: $protobuf.IConversionOptions): { [k: string]: any };

		/**
		 * * Converts this Ball to JSON.
		 * 		 * @function toJSON
		 * 		 * @memberof game.Ball
		 * 		 * @instance
		 * 		 * @returns {Object.<string,*>} JSON object
		 */
		public toJSON(): { [k: string]: any };

		/**
		 * * Gets the default type url for Ball
		 * 		 * @function getTypeUrl
		 * 		 * @memberof game.Ball
		 * 		 * @static
		 * 		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * 		 * @returns {string} The default type url
		 */
		public static getTypeUrl(typeUrlPrefix?: string): string;
	}

	/**
	 * * Properties of a Paddle.
	 * 		 * @memberof game
	 * 		 * @interface IPaddle
	 * 		 * @property {number|null} [id] Paddle id
	 * 		 * @property {number|null} [move] Paddle move
	 * 		 * @property {boolean|null} [dead] Paddle dead
	 */
	interface IPaddle {

		/** Paddle id */
		id?: (number | null);

		/** Paddle move */
		move?: (number | null);

		/** Paddle dead */
		dead?: (boolean | null);
	}

	/**
	 * * Constructs a new Paddle.
	 * 		 * @memberof game
	 * 		 * @classdesc Represents a Paddle.
	 * 		 * @implements IPaddle
	 * 		 * @constructor
	 * 		 * @param {game.IPaddle=} [properties] Properties to set
	 */
	class Paddle implements IPaddle {

		/**
		 * * Constructs a new Paddle.
		 * 		 * @memberof game
		 * 		 * @classdesc Represents a Paddle.
		 * 		 * @implements IPaddle
		 * 		 * @constructor
		 * 		 * @param {game.IPaddle=} [properties] Properties to set
		 */
		constructor(properties?: game.IPaddle);

		/**
		 * * Paddle id.
		 * 		 * @member {number} id
		 * 		 * @memberof game.Paddle
		 * 		 * @instance
		 */
		public id: number;

		/**
		 * * Paddle move.
		 * 		 * @member {number} move
		 * 		 * @memberof game.Paddle
		 * 		 * @instance
		 */
		public move: number;

		/**
		 * * Paddle dead.
		 * 		 * @member {boolean} dead
		 * 		 * @memberof game.Paddle
		 * 		 * @instance
		 */
		public dead: boolean;

		/**
		 * * Creates a new Paddle instance using the specified properties.
		 * 		 * @function create
		 * 		 * @memberof game.Paddle
		 * 		 * @static
		 * 		 * @param {game.IPaddle=} [properties] Properties to set
		 * 		 * @returns {game.Paddle} Paddle instance
		 */
		public static create(properties?: game.IPaddle): game.Paddle;

		/**
		 * * Encodes the specified Paddle message. Does not implicitly {@link game.Paddle.verify|verify} messages.
		 * 		 * @function encode
		 * 		 * @memberof game.Paddle
		 * 		 * @static
		 * 		 * @param {game.IPaddle} message Paddle message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encode(message: game.IPaddle, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Encodes the specified Paddle message, length delimited. Does not implicitly {@link game.Paddle.verify|verify} messages.
		 * 		 * @function encodeDelimited
		 * 		 * @memberof game.Paddle
		 * 		 * @static
		 * 		 * @param {game.IPaddle} message Paddle message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encodeDelimited(message: game.IPaddle, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Decodes a Paddle message from the specified reader or buffer.
		 * 		 * @function decode
		 * 		 * @memberof game.Paddle
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @param {number} [length] Message length if known beforehand
		 * 		 * @returns {game.Paddle} Paddle
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): game.Paddle;

		/**
		 * * Decodes a Paddle message from the specified reader or buffer, length delimited.
		 * 		 * @function decodeDelimited
		 * 		 * @memberof game.Paddle
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @returns {game.Paddle} Paddle
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): game.Paddle;

		/**
		 * * Verifies a Paddle message.
		 * 		 * @function verify
		 * 		 * @memberof game.Paddle
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} message Plain object to verify
		 * 		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): (string | null);

		/**
		 * * Creates a Paddle message from a plain object. Also converts values to their respective internal types.
		 * 		 * @function fromObject
		 * 		 * @memberof game.Paddle
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} object Plain object
		 * 		 * @returns {game.Paddle} Paddle
		 */
		public static fromObject(object: { [k: string]: any }): game.Paddle;

		/**
		 * * Creates a plain object from a Paddle message. Also converts values to other types if specified.
		 * 		 * @function toObject
		 * 		 * @memberof game.Paddle
		 * 		 * @static
		 * 		 * @param {game.Paddle} message Paddle
		 * 		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * 		 * @returns {Object.<string,*>} Plain object
		 */
		public static toObject(message: game.Paddle, options?: $protobuf.IConversionOptions): { [k: string]: any };

		/**
		 * * Converts this Paddle to JSON.
		 * 		 * @function toJSON
		 * 		 * @memberof game.Paddle
		 * 		 * @instance
		 * 		 * @returns {Object.<string,*>} JSON object
		 */
		public toJSON(): { [k: string]: any };

		/**
		 * * Gets the default type url for Paddle
		 * 		 * @function getTypeUrl
		 * 		 * @memberof game.Paddle
		 * 		 * @static
		 * 		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * 		 * @returns {string} The default type url
		 */
		public static getTypeUrl(typeUrlPrefix?: string): string;
	}

	/**
	 * * Properties of a MatchState.
	 * 		 * @memberof game
	 * 		 * @interface IMatchState
	 * 		 * @property {string|null} [gameId] MatchState gameId
	 * 		 * @property {number|Long|null} [tick] MatchState tick
	 * 		 * @property {Array.<game.IBall>|null} [balls] MatchState balls
	 * 		 * @property {Array.<game.IPaddle>|null} [paddles] MatchState paddles
	 * 		 * @property {Array.<number>|null} [score] MatchState score
	 * 		 * @property {Array.<number>|null} [ranks] MatchState ranks
	 * 		 * @property {number|null} [stage] MatchState stage
	 */
	interface IMatchState {

		/** MatchState gameId */
		gameId?: (string | null);

		/** MatchState tick */
		tick?: (number | Long | null);

		/** MatchState balls */
		balls?: (game.IBall[] | null);

		/** MatchState paddles */
		paddles?: (game.IPaddle[] | null);

		/** MatchState score */
		score?: (number[] | null);

		/** MatchState ranks */
		ranks?: (number[] | null);

		/** MatchState stage */
		stage?: (number | null);
	}

	/**
	 * * Constructs a new MatchState.
	 * 		 * @memberof game
	 * 		 * @classdesc Represents a MatchState.
	 * 		 * @implements IMatchState
	 * 		 * @constructor
	 * 		 * @param {game.IMatchState=} [properties] Properties to set
	 */
	class MatchState implements IMatchState {

		/**
		 * * Constructs a new MatchState.
		 * 		 * @memberof game
		 * 		 * @classdesc Represents a MatchState.
		 * 		 * @implements IMatchState
		 * 		 * @constructor
		 * 		 * @param {game.IMatchState=} [properties] Properties to set
		 */
		constructor(properties?: game.IMatchState);

		/**
		 * * MatchState gameId.
		 * 		 * @member {string} gameId
		 * 		 * @memberof game.MatchState
		 * 		 * @instance
		 */
		public gameId: string;

		/**
		 * * MatchState tick.
		 * 		 * @member {number|Long} tick
		 * 		 * @memberof game.MatchState
		 * 		 * @instance
		 */
		public tick: (number | Long);

		/**
		 * * MatchState balls.
		 * 		 * @member {Array.<game.IBall>} balls
		 * 		 * @memberof game.MatchState
		 * 		 * @instance
		 */
		public balls: game.IBall[];

		/**
		 * * MatchState paddles.
		 * 		 * @member {Array.<game.IPaddle>} paddles
		 * 		 * @memberof game.MatchState
		 * 		 * @instance
		 */
		public paddles: game.IPaddle[];

		/**
		 * * MatchState score.
		 * 		 * @member {Array.<number>} score
		 * 		 * @memberof game.MatchState
		 * 		 * @instance
		 */
		public score: number[];

		/**
		 * * MatchState ranks.
		 * 		 * @member {Array.<number>} ranks
		 * 		 * @memberof game.MatchState
		 * 		 * @instance
		 */
		public ranks: number[];

		/**
		 * * MatchState stage.
		 * 		 * @member {number} stage
		 * 		 * @memberof game.MatchState
		 * 		 * @instance
		 */
		public stage: number;

		/**
		 * * Creates a new MatchState instance using the specified properties.
		 * 		 * @function create
		 * 		 * @memberof game.MatchState
		 * 		 * @static
		 * 		 * @param {game.IMatchState=} [properties] Properties to set
		 * 		 * @returns {game.MatchState} MatchState instance
		 */
		public static create(properties?: game.IMatchState): game.MatchState;

		/**
		 * * Encodes the specified MatchState message. Does not implicitly {@link game.MatchState.verify|verify} messages.
		 * 		 * @function encode
		 * 		 * @memberof game.MatchState
		 * 		 * @static
		 * 		 * @param {game.IMatchState} message MatchState message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encode(message: game.IMatchState, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Encodes the specified MatchState message, length delimited. Does not implicitly {@link game.MatchState.verify|verify} messages.
		 * 		 * @function encodeDelimited
		 * 		 * @memberof game.MatchState
		 * 		 * @static
		 * 		 * @param {game.IMatchState} message MatchState message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encodeDelimited(message: game.IMatchState, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Decodes a MatchState message from the specified reader or buffer.
		 * 		 * @function decode
		 * 		 * @memberof game.MatchState
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @param {number} [length] Message length if known beforehand
		 * 		 * @returns {game.MatchState} MatchState
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): game.MatchState;

		/**
		 * * Decodes a MatchState message from the specified reader or buffer, length delimited.
		 * 		 * @function decodeDelimited
		 * 		 * @memberof game.MatchState
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @returns {game.MatchState} MatchState
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): game.MatchState;

		/**
		 * * Verifies a MatchState message.
		 * 		 * @function verify
		 * 		 * @memberof game.MatchState
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} message Plain object to verify
		 * 		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): (string | null);

		/**
		 * * Creates a MatchState message from a plain object. Also converts values to their respective internal types.
		 * 		 * @function fromObject
		 * 		 * @memberof game.MatchState
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} object Plain object
		 * 		 * @returns {game.MatchState} MatchState
		 */
		public static fromObject(object: { [k: string]: any }): game.MatchState;

		/**
		 * * Creates a plain object from a MatchState message. Also converts values to other types if specified.
		 * 		 * @function toObject
		 * 		 * @memberof game.MatchState
		 * 		 * @static
		 * 		 * @param {game.MatchState} message MatchState
		 * 		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * 		 * @returns {Object.<string,*>} Plain object
		 */
		public static toObject(message: game.MatchState, options?: $protobuf.IConversionOptions): { [k: string]: any };

		/**
		 * * Converts this MatchState to JSON.
		 * 		 * @function toJSON
		 * 		 * @memberof game.MatchState
		 * 		 * @instance
		 * 		 * @returns {Object.<string,*>} JSON object
		 */
		public toJSON(): { [k: string]: any };

		/**
		 * * Gets the default type url for MatchState
		 * 		 * @function getTypeUrl
		 * 		 * @memberof game.MatchState
		 * 		 * @static
		 * 		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * 		 * @returns {string} The default type url
		 */
		public static getTypeUrl(typeUrlPrefix?: string): string;
	}

	/**
	 * * Properties of a PaddleUpdate.
	 * 		 * @memberof game
	 * 		 * @interface IPaddleUpdate
	 * 		 * @property {number|null} [paddleId] PaddleUpdate paddleId
	 * 		 * @property {number|null} [move] PaddleUpdate move
	 */
	interface IPaddleUpdate {

		/** PaddleUpdate paddleId */
		paddleId?: (number | null);

		/** PaddleUpdate move */
		move?: (number | null);
	}

	/**
	 * * Constructs a new PaddleUpdate.
	 * 		 * @memberof game
	 * 		 * @classdesc Represents a PaddleUpdate.
	 * 		 * @implements IPaddleUpdate
	 * 		 * @constructor
	 * 		 * @param {game.IPaddleUpdate=} [properties] Properties to set
	 */
	class PaddleUpdate implements IPaddleUpdate {

		/**
		 * * Constructs a new PaddleUpdate.
		 * 		 * @memberof game
		 * 		 * @classdesc Represents a PaddleUpdate.
		 * 		 * @implements IPaddleUpdate
		 * 		 * @constructor
		 * 		 * @param {game.IPaddleUpdate=} [properties] Properties to set
		 */
		constructor(properties?: game.IPaddleUpdate);

		/**
		 * * PaddleUpdate paddleId.
		 * 		 * @member {number} paddleId
		 * 		 * @memberof game.PaddleUpdate
		 * 		 * @instance
		 */
		public paddleId: number;

		/**
		 * * PaddleUpdate move.
		 * 		 * @member {number} move
		 * 		 * @memberof game.PaddleUpdate
		 * 		 * @instance
		 */
		public move: number;

		/**
		 * * Creates a new PaddleUpdate instance using the specified properties.
		 * 		 * @function create
		 * 		 * @memberof game.PaddleUpdate
		 * 		 * @static
		 * 		 * @param {game.IPaddleUpdate=} [properties] Properties to set
		 * 		 * @returns {game.PaddleUpdate} PaddleUpdate instance
		 */
		public static create(properties?: game.IPaddleUpdate): game.PaddleUpdate;

		/**
		 * * Encodes the specified PaddleUpdate message. Does not implicitly {@link game.PaddleUpdate.verify|verify} messages.
		 * 		 * @function encode
		 * 		 * @memberof game.PaddleUpdate
		 * 		 * @static
		 * 		 * @param {game.IPaddleUpdate} message PaddleUpdate message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encode(message: game.IPaddleUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Encodes the specified PaddleUpdate message, length delimited. Does not implicitly {@link game.PaddleUpdate.verify|verify} messages.
		 * 		 * @function encodeDelimited
		 * 		 * @memberof game.PaddleUpdate
		 * 		 * @static
		 * 		 * @param {game.IPaddleUpdate} message PaddleUpdate message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encodeDelimited(message: game.IPaddleUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Decodes a PaddleUpdate message from the specified reader or buffer.
		 * 		 * @function decode
		 * 		 * @memberof game.PaddleUpdate
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @param {number} [length] Message length if known beforehand
		 * 		 * @returns {game.PaddleUpdate} PaddleUpdate
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): game.PaddleUpdate;

		/**
		 * * Decodes a PaddleUpdate message from the specified reader or buffer, length delimited.
		 * 		 * @function decodeDelimited
		 * 		 * @memberof game.PaddleUpdate
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @returns {game.PaddleUpdate} PaddleUpdate
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): game.PaddleUpdate;

		/**
		 * * Verifies a PaddleUpdate message.
		 * 		 * @function verify
		 * 		 * @memberof game.PaddleUpdate
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} message Plain object to verify
		 * 		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): (string | null);

		/**
		 * * Creates a PaddleUpdate message from a plain object. Also converts values to their respective internal types.
		 * 		 * @function fromObject
		 * 		 * @memberof game.PaddleUpdate
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} object Plain object
		 * 		 * @returns {game.PaddleUpdate} PaddleUpdate
		 */
		public static fromObject(object: { [k: string]: any }): game.PaddleUpdate;

		/**
		 * * Creates a plain object from a PaddleUpdate message. Also converts values to other types if specified.
		 * 		 * @function toObject
		 * 		 * @memberof game.PaddleUpdate
		 * 		 * @static
		 * 		 * @param {game.PaddleUpdate} message PaddleUpdate
		 * 		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * 		 * @returns {Object.<string,*>} Plain object
		 */
		public static toObject(message: game.PaddleUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

		/**
		 * * Converts this PaddleUpdate to JSON.
		 * 		 * @function toJSON
		 * 		 * @memberof game.PaddleUpdate
		 * 		 * @instance
		 * 		 * @returns {Object.<string,*>} JSON object
		 */
		public toJSON(): { [k: string]: any };

		/**
		 * * Gets the default type url for PaddleUpdate
		 * 		 * @function getTypeUrl
		 * 		 * @memberof game.PaddleUpdate
		 * 		 * @static
		 * 		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * 		 * @returns {string} The default type url
		 */
		public static getTypeUrl(typeUrlPrefix?: string): string;
	}

	/**
	 * * Properties of a QuitMessage.
	 * 		 * @memberof game
	 * 		 * @interface IQuitMessage
	 */
	interface IQuitMessage {
	}

	/**
	 * * Constructs a new QuitMessage.
	 * 		 * @memberof game
	 * 		 * @classdesc Represents a QuitMessage.
	 * 		 * @implements IQuitMessage
	 * 		 * @constructor
	 * 		 * @param {game.IQuitMessage=} [properties] Properties to set
	 */
	class QuitMessage implements IQuitMessage {

		/**
		 * * Constructs a new QuitMessage.
		 * 		 * @memberof game
		 * 		 * @classdesc Represents a QuitMessage.
		 * 		 * @implements IQuitMessage
		 * 		 * @constructor
		 * 		 * @param {game.IQuitMessage=} [properties] Properties to set
		 */
		constructor(properties?: game.IQuitMessage);

		/**
		 * * Creates a new QuitMessage instance using the specified properties.
		 * 		 * @function create
		 * 		 * @memberof game.QuitMessage
		 * 		 * @static
		 * 		 * @param {game.IQuitMessage=} [properties] Properties to set
		 * 		 * @returns {game.QuitMessage} QuitMessage instance
		 */
		public static create(properties?: game.IQuitMessage): game.QuitMessage;

		/**
		 * * Encodes the specified QuitMessage message. Does not implicitly {@link game.QuitMessage.verify|verify} messages.
		 * 		 * @function encode
		 * 		 * @memberof game.QuitMessage
		 * 		 * @static
		 * 		 * @param {game.IQuitMessage} message QuitMessage message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encode(message: game.IQuitMessage, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Encodes the specified QuitMessage message, length delimited. Does not implicitly {@link game.QuitMessage.verify|verify} messages.
		 * 		 * @function encodeDelimited
		 * 		 * @memberof game.QuitMessage
		 * 		 * @static
		 * 		 * @param {game.IQuitMessage} message QuitMessage message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encodeDelimited(message: game.IQuitMessage, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Decodes a QuitMessage message from the specified reader or buffer.
		 * 		 * @function decode
		 * 		 * @memberof game.QuitMessage
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @param {number} [length] Message length if known beforehand
		 * 		 * @returns {game.QuitMessage} QuitMessage
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): game.QuitMessage;

		/**
		 * * Decodes a QuitMessage message from the specified reader or buffer, length delimited.
		 * 		 * @function decodeDelimited
		 * 		 * @memberof game.QuitMessage
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @returns {game.QuitMessage} QuitMessage
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): game.QuitMessage;

		/**
		 * * Verifies a QuitMessage message.
		 * 		 * @function verify
		 * 		 * @memberof game.QuitMessage
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} message Plain object to verify
		 * 		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): (string | null);

		/**
		 * * Creates a QuitMessage message from a plain object. Also converts values to their respective internal types.
		 * 		 * @function fromObject
		 * 		 * @memberof game.QuitMessage
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} object Plain object
		 * 		 * @returns {game.QuitMessage} QuitMessage
		 */
		public static fromObject(object: { [k: string]: any }): game.QuitMessage;

		/**
		 * * Creates a plain object from a QuitMessage message. Also converts values to other types if specified.
		 * 		 * @function toObject
		 * 		 * @memberof game.QuitMessage
		 * 		 * @static
		 * 		 * @param {game.QuitMessage} message QuitMessage
		 * 		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * 		 * @returns {Object.<string,*>} Plain object
		 */
		public static toObject(message: game.QuitMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

		/**
		 * * Converts this QuitMessage to JSON.
		 * 		 * @function toJSON
		 * 		 * @memberof game.QuitMessage
		 * 		 * @instance
		 * 		 * @returns {Object.<string,*>} JSON object
		 */
		public toJSON(): { [k: string]: any };

		/**
		 * * Gets the default type url for QuitMessage
		 * 		 * @function getTypeUrl
		 * 		 * @memberof game.QuitMessage
		 * 		 * @static
		 * 		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * 		 * @returns {string} The default type url
		 */
		public static getTypeUrl(typeUrlPrefix?: string): string;
	}

	/**
	 * * Properties of a ReadyMessage.
	 * 		 * @memberof game
	 * 		 * @interface IReadyMessage
	 */
	interface IReadyMessage {
	}

	/**
	 * * Constructs a new ReadyMessage.
	 * 		 * @memberof game
	 * 		 * @classdesc Represents a ReadyMessage.
	 * 		 * @implements IReadyMessage
	 * 		 * @constructor
	 * 		 * @param {game.IReadyMessage=} [properties] Properties to set
	 */
	class ReadyMessage implements IReadyMessage {

		/**
		 * * Constructs a new ReadyMessage.
		 * 		 * @memberof game
		 * 		 * @classdesc Represents a ReadyMessage.
		 * 		 * @implements IReadyMessage
		 * 		 * @constructor
		 * 		 * @param {game.IReadyMessage=} [properties] Properties to set
		 */
		constructor(properties?: game.IReadyMessage);

		/**
		 * * Creates a new ReadyMessage instance using the specified properties.
		 * 		 * @function create
		 * 		 * @memberof game.ReadyMessage
		 * 		 * @static
		 * 		 * @param {game.IReadyMessage=} [properties] Properties to set
		 * 		 * @returns {game.ReadyMessage} ReadyMessage instance
		 */
		public static create(properties?: game.IReadyMessage): game.ReadyMessage;

		/**
		 * * Encodes the specified ReadyMessage message. Does not implicitly {@link game.ReadyMessage.verify|verify} messages.
		 * 		 * @function encode
		 * 		 * @memberof game.ReadyMessage
		 * 		 * @static
		 * 		 * @param {game.IReadyMessage} message ReadyMessage message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encode(message: game.IReadyMessage, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Encodes the specified ReadyMessage message, length delimited. Does not implicitly {@link game.ReadyMessage.verify|verify} messages.
		 * 		 * @function encodeDelimited
		 * 		 * @memberof game.ReadyMessage
		 * 		 * @static
		 * 		 * @param {game.IReadyMessage} message ReadyMessage message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encodeDelimited(message: game.IReadyMessage, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Decodes a ReadyMessage message from the specified reader or buffer.
		 * 		 * @function decode
		 * 		 * @memberof game.ReadyMessage
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @param {number} [length] Message length if known beforehand
		 * 		 * @returns {game.ReadyMessage} ReadyMessage
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): game.ReadyMessage;

		/**
		 * * Decodes a ReadyMessage message from the specified reader or buffer, length delimited.
		 * 		 * @function decodeDelimited
		 * 		 * @memberof game.ReadyMessage
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @returns {game.ReadyMessage} ReadyMessage
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): game.ReadyMessage;

		/**
		 * * Verifies a ReadyMessage message.
		 * 		 * @function verify
		 * 		 * @memberof game.ReadyMessage
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} message Plain object to verify
		 * 		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): (string | null);

		/**
		 * * Creates a ReadyMessage message from a plain object. Also converts values to their respective internal types.
		 * 		 * @function fromObject
		 * 		 * @memberof game.ReadyMessage
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} object Plain object
		 * 		 * @returns {game.ReadyMessage} ReadyMessage
		 */
		public static fromObject(object: { [k: string]: any }): game.ReadyMessage;

		/**
		 * * Creates a plain object from a ReadyMessage message. Also converts values to other types if specified.
		 * 		 * @function toObject
		 * 		 * @memberof game.ReadyMessage
		 * 		 * @static
		 * 		 * @param {game.ReadyMessage} message ReadyMessage
		 * 		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * 		 * @returns {Object.<string,*>} Plain object
		 */
		public static toObject(message: game.ReadyMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

		/**
		 * * Converts this ReadyMessage to JSON.
		 * 		 * @function toJSON
		 * 		 * @memberof game.ReadyMessage
		 * 		 * @instance
		 * 		 * @returns {Object.<string,*>} JSON object
		 */
		public toJSON(): { [k: string]: any };

		/**
		 * * Gets the default type url for ReadyMessage
		 * 		 * @function getTypeUrl
		 * 		 * @memberof game.ReadyMessage
		 * 		 * @static
		 * 		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * 		 * @returns {string} The default type url
		 */
		public static getTypeUrl(typeUrlPrefix?: string): string;
	}

	/**
	 * * Properties of a SpectateMessage.
	 * 		 * @memberof game
	 * 		 * @interface ISpectateMessage
	 */
	interface ISpectateMessage {
	}

	/**
	 * * Constructs a new SpectateMessage.
	 * 		 * @memberof game
	 * 		 * @classdesc Represents a SpectateMessage.
	 * 		 * @implements ISpectateMessage
	 * 		 * @constructor
	 * 		 * @param {game.ISpectateMessage=} [properties] Properties to set
	 */
	class SpectateMessage implements ISpectateMessage {

		/**
		 * * Constructs a new SpectateMessage.
		 * 		 * @memberof game
		 * 		 * @classdesc Represents a SpectateMessage.
		 * 		 * @implements ISpectateMessage
		 * 		 * @constructor
		 * 		 * @param {game.ISpectateMessage=} [properties] Properties to set
		 */
		constructor(properties?: game.ISpectateMessage);

		/**
		 * * Creates a new SpectateMessage instance using the specified properties.
		 * 		 * @function create
		 * 		 * @memberof game.SpectateMessage
		 * 		 * @static
		 * 		 * @param {game.ISpectateMessage=} [properties] Properties to set
		 * 		 * @returns {game.SpectateMessage} SpectateMessage instance
		 */
		public static create(properties?: game.ISpectateMessage): game.SpectateMessage;

		/**
		 * * Encodes the specified SpectateMessage message. Does not implicitly {@link game.SpectateMessage.verify|verify} messages.
		 * 		 * @function encode
		 * 		 * @memberof game.SpectateMessage
		 * 		 * @static
		 * 		 * @param {game.ISpectateMessage} message SpectateMessage message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encode(message: game.ISpectateMessage, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Encodes the specified SpectateMessage message, length delimited. Does not implicitly {@link game.SpectateMessage.verify|verify} messages.
		 * 		 * @function encodeDelimited
		 * 		 * @memberof game.SpectateMessage
		 * 		 * @static
		 * 		 * @param {game.ISpectateMessage} message SpectateMessage message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encodeDelimited(message: game.ISpectateMessage, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Decodes a SpectateMessage message from the specified reader or buffer.
		 * 		 * @function decode
		 * 		 * @memberof game.SpectateMessage
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @param {number} [length] Message length if known beforehand
		 * 		 * @returns {game.SpectateMessage} SpectateMessage
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): game.SpectateMessage;

		/**
		 * * Decodes a SpectateMessage message from the specified reader or buffer, length delimited.
		 * 		 * @function decodeDelimited
		 * 		 * @memberof game.SpectateMessage
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @returns {game.SpectateMessage} SpectateMessage
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): game.SpectateMessage;

		/**
		 * * Verifies a SpectateMessage message.
		 * 		 * @function verify
		 * 		 * @memberof game.SpectateMessage
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} message Plain object to verify
		 * 		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): (string | null);

		/**
		 * * Creates a SpectateMessage message from a plain object. Also converts values to their respective internal types.
		 * 		 * @function fromObject
		 * 		 * @memberof game.SpectateMessage
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} object Plain object
		 * 		 * @returns {game.SpectateMessage} SpectateMessage
		 */
		public static fromObject(object: { [k: string]: any }): game.SpectateMessage;

		/**
		 * * Creates a plain object from a SpectateMessage message. Also converts values to other types if specified.
		 * 		 * @function toObject
		 * 		 * @memberof game.SpectateMessage
		 * 		 * @static
		 * 		 * @param {game.SpectateMessage} message SpectateMessage
		 * 		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * 		 * @returns {Object.<string,*>} Plain object
		 */
		public static toObject(message: game.SpectateMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

		/**
		 * * Converts this SpectateMessage to JSON.
		 * 		 * @function toJSON
		 * 		 * @memberof game.SpectateMessage
		 * 		 * @instance
		 * 		 * @returns {Object.<string,*>} JSON object
		 */
		public toJSON(): { [k: string]: any };

		/**
		 * * Gets the default type url for SpectateMessage
		 * 		 * @function getTypeUrl
		 * 		 * @memberof game.SpectateMessage
		 * 		 * @static
		 * 		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * 		 * @returns {string} The default type url
		 */
		public static getTypeUrl(typeUrlPrefix?: string): string;
	}

	/**
	 * * Properties of a ClientMessage.
	 * 		 * @memberof game
	 * 		 * @interface IClientMessage
	 * 		 * @property {game.IPaddleUpdate|null} [paddleUpdate] ClientMessage paddleUpdate
	 * 		 * @property {game.IQuitMessage|null} [quit] ClientMessage quit
	 * 		 * @property {game.IReadyMessage|null} [ready] ClientMessage ready
	 * 		 * @property {game.ISpectateMessage|null} [spectate] ClientMessage spectate
	 */
	interface IClientMessage {

		/** ClientMessage paddleUpdate */
		paddleUpdate?: (game.IPaddleUpdate | null);

		/** ClientMessage quit */
		quit?: (game.IQuitMessage | null);

		/** ClientMessage ready */
		ready?: (game.IReadyMessage | null);

		/** ClientMessage spectate */
		spectate?: (game.ISpectateMessage | null);
	}

	/**
	 * * Constructs a new ClientMessage.
	 * 		 * @memberof game
	 * 		 * @classdesc Represents a ClientMessage.
	 * 		 * @implements IClientMessage
	 * 		 * @constructor
	 * 		 * @param {game.IClientMessage=} [properties] Properties to set
	 */
	class ClientMessage implements IClientMessage {

		/**
		 * * Constructs a new ClientMessage.
		 * 		 * @memberof game
		 * 		 * @classdesc Represents a ClientMessage.
		 * 		 * @implements IClientMessage
		 * 		 * @constructor
		 * 		 * @param {game.IClientMessage=} [properties] Properties to set
		 */
		constructor(properties?: game.IClientMessage);

		/**
		 * * ClientMessage paddleUpdate.
		 * 		 * @member {game.IPaddleUpdate|null|undefined} paddleUpdate
		 * 		 * @memberof game.ClientMessage
		 * 		 * @instance
		 */
		public paddleUpdate?: (game.IPaddleUpdate | null);

		/**
		 * * ClientMessage quit.
		 * 		 * @member {game.IQuitMessage|null|undefined} quit
		 * 		 * @memberof game.ClientMessage
		 * 		 * @instance
		 */
		public quit?: (game.IQuitMessage | null);

		/**
		 * * ClientMessage ready.
		 * 		 * @member {game.IReadyMessage|null|undefined} ready
		 * 		 * @memberof game.ClientMessage
		 * 		 * @instance
		 */
		public ready?: (game.IReadyMessage | null);

		/**
		 * * ClientMessage spectate.
		 * 		 * @member {game.ISpectateMessage|null|undefined} spectate
		 * 		 * @memberof game.ClientMessage
		 * 		 * @instance
		 */
		public spectate?: (game.ISpectateMessage | null);

		/**
		 * * ClientMessage payload.
		 * 		 * @member {"paddleUpdate"|"quit"|"ready"|"spectate"|undefined} payload
		 * 		 * @memberof game.ClientMessage
		 * 		 * @instance
		 */
		public payload?: ("paddleUpdate" | "quit" | "ready" | "spectate");

		/**
		 * * Creates a new ClientMessage instance using the specified properties.
		 * 		 * @function create
		 * 		 * @memberof game.ClientMessage
		 * 		 * @static
		 * 		 * @param {game.IClientMessage=} [properties] Properties to set
		 * 		 * @returns {game.ClientMessage} ClientMessage instance
		 */
		public static create(properties?: game.IClientMessage): game.ClientMessage;

		/**
		 * * Encodes the specified ClientMessage message. Does not implicitly {@link game.ClientMessage.verify|verify} messages.
		 * 		 * @function encode
		 * 		 * @memberof game.ClientMessage
		 * 		 * @static
		 * 		 * @param {game.IClientMessage} message ClientMessage message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encode(message: game.IClientMessage, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Encodes the specified ClientMessage message, length delimited. Does not implicitly {@link game.ClientMessage.verify|verify} messages.
		 * 		 * @function encodeDelimited
		 * 		 * @memberof game.ClientMessage
		 * 		 * @static
		 * 		 * @param {game.IClientMessage} message ClientMessage message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encodeDelimited(message: game.IClientMessage, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Decodes a ClientMessage message from the specified reader or buffer.
		 * 		 * @function decode
		 * 		 * @memberof game.ClientMessage
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @param {number} [length] Message length if known beforehand
		 * 		 * @returns {game.ClientMessage} ClientMessage
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): game.ClientMessage;

		/**
		 * * Decodes a ClientMessage message from the specified reader or buffer, length delimited.
		 * 		 * @function decodeDelimited
		 * 		 * @memberof game.ClientMessage
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @returns {game.ClientMessage} ClientMessage
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): game.ClientMessage;

		/**
		 * * Verifies a ClientMessage message.
		 * 		 * @function verify
		 * 		 * @memberof game.ClientMessage
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} message Plain object to verify
		 * 		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): (string | null);

		/**
		 * * Creates a ClientMessage message from a plain object. Also converts values to their respective internal types.
		 * 		 * @function fromObject
		 * 		 * @memberof game.ClientMessage
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} object Plain object
		 * 		 * @returns {game.ClientMessage} ClientMessage
		 */
		public static fromObject(object: { [k: string]: any }): game.ClientMessage;

		/**
		 * * Creates a plain object from a ClientMessage message. Also converts values to other types if specified.
		 * 		 * @function toObject
		 * 		 * @memberof game.ClientMessage
		 * 		 * @static
		 * 		 * @param {game.ClientMessage} message ClientMessage
		 * 		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * 		 * @returns {Object.<string,*>} Plain object
		 */
		public static toObject(message: game.ClientMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

		/**
		 * * Converts this ClientMessage to JSON.
		 * 		 * @function toJSON
		 * 		 * @memberof game.ClientMessage
		 * 		 * @instance
		 * 		 * @returns {Object.<string,*>} JSON object
		 */
		public toJSON(): { [k: string]: any };

		/**
		 * * Gets the default type url for ClientMessage
		 * 		 * @function getTypeUrl
		 * 		 * @memberof game.ClientMessage
		 * 		 * @static
		 * 		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * 		 * @returns {string} The default type url
		 */
		public static getTypeUrl(typeUrlPrefix?: string): string;
	}

	/**
	 * * Properties of an ErrorMessage.
	 * 		 * @memberof game
	 * 		 * @interface IErrorMessage
	 * 		 * @property {string|null} [message] ErrorMessage message
	 */
	interface IErrorMessage {

		/** ErrorMessage message */
		message?: (string | null);
	}

	/**
	 * * Constructs a new ErrorMessage.
	 * 		 * @memberof game
	 * 		 * @classdesc Represents an ErrorMessage.
	 * 		 * @implements IErrorMessage
	 * 		 * @constructor
	 * 		 * @param {game.IErrorMessage=} [properties] Properties to set
	 */
	class ErrorMessage implements IErrorMessage {

		/**
		 * * Constructs a new ErrorMessage.
		 * 		 * @memberof game
		 * 		 * @classdesc Represents an ErrorMessage.
		 * 		 * @implements IErrorMessage
		 * 		 * @constructor
		 * 		 * @param {game.IErrorMessage=} [properties] Properties to set
		 */
		constructor(properties?: game.IErrorMessage);

		/**
		 * * ErrorMessage message.
		 * 		 * @member {string} message
		 * 		 * @memberof game.ErrorMessage
		 * 		 * @instance
		 */
		public message: string;

		/**
		 * * Creates a new ErrorMessage instance using the specified properties.
		 * 		 * @function create
		 * 		 * @memberof game.ErrorMessage
		 * 		 * @static
		 * 		 * @param {game.IErrorMessage=} [properties] Properties to set
		 * 		 * @returns {game.ErrorMessage} ErrorMessage instance
		 */
		public static create(properties?: game.IErrorMessage): game.ErrorMessage;

		/**
		 * * Encodes the specified ErrorMessage message. Does not implicitly {@link game.ErrorMessage.verify|verify} messages.
		 * 		 * @function encode
		 * 		 * @memberof game.ErrorMessage
		 * 		 * @static
		 * 		 * @param {game.IErrorMessage} message ErrorMessage message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encode(message: game.IErrorMessage, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Encodes the specified ErrorMessage message, length delimited. Does not implicitly {@link game.ErrorMessage.verify|verify} messages.
		 * 		 * @function encodeDelimited
		 * 		 * @memberof game.ErrorMessage
		 * 		 * @static
		 * 		 * @param {game.IErrorMessage} message ErrorMessage message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encodeDelimited(message: game.IErrorMessage, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Decodes an ErrorMessage message from the specified reader or buffer.
		 * 		 * @function decode
		 * 		 * @memberof game.ErrorMessage
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @param {number} [length] Message length if known beforehand
		 * 		 * @returns {game.ErrorMessage} ErrorMessage
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): game.ErrorMessage;

		/**
		 * * Decodes an ErrorMessage message from the specified reader or buffer, length delimited.
		 * 		 * @function decodeDelimited
		 * 		 * @memberof game.ErrorMessage
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @returns {game.ErrorMessage} ErrorMessage
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): game.ErrorMessage;

		/**
		 * * Verifies an ErrorMessage message.
		 * 		 * @function verify
		 * 		 * @memberof game.ErrorMessage
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} message Plain object to verify
		 * 		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): (string | null);

		/**
		 * * Creates an ErrorMessage message from a plain object. Also converts values to their respective internal types.
		 * 		 * @function fromObject
		 * 		 * @memberof game.ErrorMessage
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} object Plain object
		 * 		 * @returns {game.ErrorMessage} ErrorMessage
		 */
		public static fromObject(object: { [k: string]: any }): game.ErrorMessage;

		/**
		 * * Creates a plain object from an ErrorMessage message. Also converts values to other types if specified.
		 * 		 * @function toObject
		 * 		 * @memberof game.ErrorMessage
		 * 		 * @static
		 * 		 * @param {game.ErrorMessage} message ErrorMessage
		 * 		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * 		 * @returns {Object.<string,*>} Plain object
		 */
		public static toObject(message: game.ErrorMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

		/**
		 * * Converts this ErrorMessage to JSON.
		 * 		 * @function toJSON
		 * 		 * @memberof game.ErrorMessage
		 * 		 * @instance
		 * 		 * @returns {Object.<string,*>} JSON object
		 */
		public toJSON(): { [k: string]: any };

		/**
		 * * Gets the default type url for ErrorMessage
		 * 		 * @function getTypeUrl
		 * 		 * @memberof game.ErrorMessage
		 * 		 * @static
		 * 		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * 		 * @returns {string} The default type url
		 */
		public static getTypeUrl(typeUrlPrefix?: string): string;
	}

	/**
	 * * Properties of a WelcomeMessage.
	 * 		 * @memberof game
	 * 		 * @interface IWelcomeMessage
	 * 		 * @property {number|null} [paddleId] WelcomeMessage paddleId
	 */
	interface IWelcomeMessage {

		/** WelcomeMessage paddleId */
		paddleId?: (number | null);
	}

	/**
	 * * Constructs a new WelcomeMessage.
	 * 		 * @memberof game
	 * 		 * @classdesc Represents a WelcomeMessage.
	 * 		 * @implements IWelcomeMessage
	 * 		 * @constructor
	 * 		 * @param {game.IWelcomeMessage=} [properties] Properties to set
	 */
	class WelcomeMessage implements IWelcomeMessage {

		/**
		 * * Constructs a new WelcomeMessage.
		 * 		 * @memberof game
		 * 		 * @classdesc Represents a WelcomeMessage.
		 * 		 * @implements IWelcomeMessage
		 * 		 * @constructor
		 * 		 * @param {game.IWelcomeMessage=} [properties] Properties to set
		 */
		constructor(properties?: game.IWelcomeMessage);

		/**
		 * * WelcomeMessage paddleId.
		 * 		 * @member {number} paddleId
		 * 		 * @memberof game.WelcomeMessage
		 * 		 * @instance
		 */
		public paddleId: number;

		/**
		 * * Creates a new WelcomeMessage instance using the specified properties.
		 * 		 * @function create
		 * 		 * @memberof game.WelcomeMessage
		 * 		 * @static
		 * 		 * @param {game.IWelcomeMessage=} [properties] Properties to set
		 * 		 * @returns {game.WelcomeMessage} WelcomeMessage instance
		 */
		public static create(properties?: game.IWelcomeMessage): game.WelcomeMessage;

		/**
		 * * Encodes the specified WelcomeMessage message. Does not implicitly {@link game.WelcomeMessage.verify|verify} messages.
		 * 		 * @function encode
		 * 		 * @memberof game.WelcomeMessage
		 * 		 * @static
		 * 		 * @param {game.IWelcomeMessage} message WelcomeMessage message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encode(message: game.IWelcomeMessage, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Encodes the specified WelcomeMessage message, length delimited. Does not implicitly {@link game.WelcomeMessage.verify|verify} messages.
		 * 		 * @function encodeDelimited
		 * 		 * @memberof game.WelcomeMessage
		 * 		 * @static
		 * 		 * @param {game.IWelcomeMessage} message WelcomeMessage message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encodeDelimited(message: game.IWelcomeMessage, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Decodes a WelcomeMessage message from the specified reader or buffer.
		 * 		 * @function decode
		 * 		 * @memberof game.WelcomeMessage
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @param {number} [length] Message length if known beforehand
		 * 		 * @returns {game.WelcomeMessage} WelcomeMessage
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): game.WelcomeMessage;

		/**
		 * * Decodes a WelcomeMessage message from the specified reader or buffer, length delimited.
		 * 		 * @function decodeDelimited
		 * 		 * @memberof game.WelcomeMessage
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @returns {game.WelcomeMessage} WelcomeMessage
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): game.WelcomeMessage;

		/**
		 * * Verifies a WelcomeMessage message.
		 * 		 * @function verify
		 * 		 * @memberof game.WelcomeMessage
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} message Plain object to verify
		 * 		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): (string | null);

		/**
		 * * Creates a WelcomeMessage message from a plain object. Also converts values to their respective internal types.
		 * 		 * @function fromObject
		 * 		 * @memberof game.WelcomeMessage
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} object Plain object
		 * 		 * @returns {game.WelcomeMessage} WelcomeMessage
		 */
		public static fromObject(object: { [k: string]: any }): game.WelcomeMessage;

		/**
		 * * Creates a plain object from a WelcomeMessage message. Also converts values to other types if specified.
		 * 		 * @function toObject
		 * 		 * @memberof game.WelcomeMessage
		 * 		 * @static
		 * 		 * @param {game.WelcomeMessage} message WelcomeMessage
		 * 		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * 		 * @returns {Object.<string,*>} Plain object
		 */
		public static toObject(message: game.WelcomeMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

		/**
		 * * Converts this WelcomeMessage to JSON.
		 * 		 * @function toJSON
		 * 		 * @memberof game.WelcomeMessage
		 * 		 * @instance
		 * 		 * @returns {Object.<string,*>} JSON object
		 */
		public toJSON(): { [k: string]: any };

		/**
		 * * Gets the default type url for WelcomeMessage
		 * 		 * @function getTypeUrl
		 * 		 * @memberof game.WelcomeMessage
		 * 		 * @static
		 * 		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * 		 * @returns {string} The default type url
		 */
		public static getTypeUrl(typeUrlPrefix?: string): string;
	}

	/**
	 * * Properties of a GameStartMessage.
	 * 		 * @memberof game
	 * 		 * @interface IGameStartMessage
	 */
	interface IGameStartMessage {
	}

	/**
	 * * Constructs a new GameStartMessage.
	 * 		 * @memberof game
	 * 		 * @classdesc Represents a GameStartMessage.
	 * 		 * @implements IGameStartMessage
	 * 		 * @constructor
	 * 		 * @param {game.IGameStartMessage=} [properties] Properties to set
	 */
	class GameStartMessage implements IGameStartMessage {

		/**
		 * * Constructs a new GameStartMessage.
		 * 		 * @memberof game
		 * 		 * @classdesc Represents a GameStartMessage.
		 * 		 * @implements IGameStartMessage
		 * 		 * @constructor
		 * 		 * @param {game.IGameStartMessage=} [properties] Properties to set
		 */
		constructor(properties?: game.IGameStartMessage);

		/**
		 * * Creates a new GameStartMessage instance using the specified properties.
		 * 		 * @function create
		 * 		 * @memberof game.GameStartMessage
		 * 		 * @static
		 * 		 * @param {game.IGameStartMessage=} [properties] Properties to set
		 * 		 * @returns {game.GameStartMessage} GameStartMessage instance
		 */
		public static create(properties?: game.IGameStartMessage): game.GameStartMessage;

		/**
		 * * Encodes the specified GameStartMessage message. Does not implicitly {@link game.GameStartMessage.verify|verify} messages.
		 * 		 * @function encode
		 * 		 * @memberof game.GameStartMessage
		 * 		 * @static
		 * 		 * @param {game.IGameStartMessage} message GameStartMessage message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encode(message: game.IGameStartMessage, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Encodes the specified GameStartMessage message, length delimited. Does not implicitly {@link game.GameStartMessage.verify|verify} messages.
		 * 		 * @function encodeDelimited
		 * 		 * @memberof game.GameStartMessage
		 * 		 * @static
		 * 		 * @param {game.IGameStartMessage} message GameStartMessage message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encodeDelimited(message: game.IGameStartMessage, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Decodes a GameStartMessage message from the specified reader or buffer.
		 * 		 * @function decode
		 * 		 * @memberof game.GameStartMessage
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @param {number} [length] Message length if known beforehand
		 * 		 * @returns {game.GameStartMessage} GameStartMessage
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): game.GameStartMessage;

		/**
		 * * Decodes a GameStartMessage message from the specified reader or buffer, length delimited.
		 * 		 * @function decodeDelimited
		 * 		 * @memberof game.GameStartMessage
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @returns {game.GameStartMessage} GameStartMessage
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): game.GameStartMessage;

		/**
		 * * Verifies a GameStartMessage message.
		 * 		 * @function verify
		 * 		 * @memberof game.GameStartMessage
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} message Plain object to verify
		 * 		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): (string | null);

		/**
		 * * Creates a GameStartMessage message from a plain object. Also converts values to their respective internal types.
		 * 		 * @function fromObject
		 * 		 * @memberof game.GameStartMessage
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} object Plain object
		 * 		 * @returns {game.GameStartMessage} GameStartMessage
		 */
		public static fromObject(object: { [k: string]: any }): game.GameStartMessage;

		/**
		 * * Creates a plain object from a GameStartMessage message. Also converts values to other types if specified.
		 * 		 * @function toObject
		 * 		 * @memberof game.GameStartMessage
		 * 		 * @static
		 * 		 * @param {game.GameStartMessage} message GameStartMessage
		 * 		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * 		 * @returns {Object.<string,*>} Plain object
		 */
		public static toObject(message: game.GameStartMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

		/**
		 * * Converts this GameStartMessage to JSON.
		 * 		 * @function toJSON
		 * 		 * @memberof game.GameStartMessage
		 * 		 * @instance
		 * 		 * @returns {Object.<string,*>} JSON object
		 */
		public toJSON(): { [k: string]: any };

		/**
		 * * Gets the default type url for GameStartMessage
		 * 		 * @function getTypeUrl
		 * 		 * @memberof game.GameStartMessage
		 * 		 * @static
		 * 		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * 		 * @returns {string} The default type url
		 */
		public static getTypeUrl(typeUrlPrefix?: string): string;
	}

	/**
	 * * Properties of a GameEndMessage.
	 * 		 * @memberof game
	 * 		 * @interface IGameEndMessage
	 * 		 * @property {Array.<number>|null} [score] GameEndMessage score
	 */
	interface IGameEndMessage {

		/** GameEndMessage score */
		score?: (number[] | null);
	}

	/**
	 * * Constructs a new GameEndMessage.
	 * 		 * @memberof game
	 * 		 * @classdesc Represents a GameEndMessage.
	 * 		 * @implements IGameEndMessage
	 * 		 * @constructor
	 * 		 * @param {game.IGameEndMessage=} [properties] Properties to set
	 */
	class GameEndMessage implements IGameEndMessage {

		/**
		 * * Constructs a new GameEndMessage.
		 * 		 * @memberof game
		 * 		 * @classdesc Represents a GameEndMessage.
		 * 		 * @implements IGameEndMessage
		 * 		 * @constructor
		 * 		 * @param {game.IGameEndMessage=} [properties] Properties to set
		 */
		constructor(properties?: game.IGameEndMessage);

		/**
		 * * GameEndMessage score.
		 * 		 * @member {Array.<number>} score
		 * 		 * @memberof game.GameEndMessage
		 * 		 * @instance
		 */
		public score: number[];

		/**
		 * * Creates a new GameEndMessage instance using the specified properties.
		 * 		 * @function create
		 * 		 * @memberof game.GameEndMessage
		 * 		 * @static
		 * 		 * @param {game.IGameEndMessage=} [properties] Properties to set
		 * 		 * @returns {game.GameEndMessage} GameEndMessage instance
		 */
		public static create(properties?: game.IGameEndMessage): game.GameEndMessage;

		/**
		 * * Encodes the specified GameEndMessage message. Does not implicitly {@link game.GameEndMessage.verify|verify} messages.
		 * 		 * @function encode
		 * 		 * @memberof game.GameEndMessage
		 * 		 * @static
		 * 		 * @param {game.IGameEndMessage} message GameEndMessage message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encode(message: game.IGameEndMessage, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Encodes the specified GameEndMessage message, length delimited. Does not implicitly {@link game.GameEndMessage.verify|verify} messages.
		 * 		 * @function encodeDelimited
		 * 		 * @memberof game.GameEndMessage
		 * 		 * @static
		 * 		 * @param {game.IGameEndMessage} message GameEndMessage message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encodeDelimited(message: game.IGameEndMessage, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Decodes a GameEndMessage message from the specified reader or buffer.
		 * 		 * @function decode
		 * 		 * @memberof game.GameEndMessage
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @param {number} [length] Message length if known beforehand
		 * 		 * @returns {game.GameEndMessage} GameEndMessage
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): game.GameEndMessage;

		/**
		 * * Decodes a GameEndMessage message from the specified reader or buffer, length delimited.
		 * 		 * @function decodeDelimited
		 * 		 * @memberof game.GameEndMessage
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @returns {game.GameEndMessage} GameEndMessage
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): game.GameEndMessage;

		/**
		 * * Verifies a GameEndMessage message.
		 * 		 * @function verify
		 * 		 * @memberof game.GameEndMessage
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} message Plain object to verify
		 * 		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): (string | null);

		/**
		 * * Creates a GameEndMessage message from a plain object. Also converts values to their respective internal types.
		 * 		 * @function fromObject
		 * 		 * @memberof game.GameEndMessage
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} object Plain object
		 * 		 * @returns {game.GameEndMessage} GameEndMessage
		 */
		public static fromObject(object: { [k: string]: any }): game.GameEndMessage;

		/**
		 * * Creates a plain object from a GameEndMessage message. Also converts values to other types if specified.
		 * 		 * @function toObject
		 * 		 * @memberof game.GameEndMessage
		 * 		 * @static
		 * 		 * @param {game.GameEndMessage} message GameEndMessage
		 * 		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * 		 * @returns {Object.<string,*>} Plain object
		 */
		public static toObject(message: game.GameEndMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

		/**
		 * * Converts this GameEndMessage to JSON.
		 * 		 * @function toJSON
		 * 		 * @memberof game.GameEndMessage
		 * 		 * @instance
		 * 		 * @returns {Object.<string,*>} JSON object
		 */
		public toJSON(): { [k: string]: any };

		/**
		 * * Gets the default type url for GameEndMessage
		 * 		 * @function getTypeUrl
		 * 		 * @memberof game.GameEndMessage
		 * 		 * @static
		 * 		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * 		 * @returns {string} The default type url
		 */
		public static getTypeUrl(typeUrlPrefix?: string): string;
	}

	/**
	 * * Properties of a StateMessage.
	 * 		 * @memberof game
	 * 		 * @interface IStateMessage
	 * 		 * @property {game.IMatchState|null} [state] StateMessage state
	 */
	interface IStateMessage {

		/** StateMessage state */
		state?: (game.IMatchState | null);
	}

	/**
	 * * Constructs a new StateMessage.
	 * 		 * @memberof game
	 * 		 * @classdesc Represents a StateMessage.
	 * 		 * @implements IStateMessage
	 * 		 * @constructor
	 * 		 * @param {game.IStateMessage=} [properties] Properties to set
	 */
	class StateMessage implements IStateMessage {

		/**
		 * * Constructs a new StateMessage.
		 * 		 * @memberof game
		 * 		 * @classdesc Represents a StateMessage.
		 * 		 * @implements IStateMessage
		 * 		 * @constructor
		 * 		 * @param {game.IStateMessage=} [properties] Properties to set
		 */
		constructor(properties?: game.IStateMessage);

		/**
		 * * StateMessage state.
		 * 		 * @member {game.IMatchState|null|undefined} state
		 * 		 * @memberof game.StateMessage
		 * 		 * @instance
		 */
		public state?: (game.IMatchState | null);

		/**
		 * * Creates a new StateMessage instance using the specified properties.
		 * 		 * @function create
		 * 		 * @memberof game.StateMessage
		 * 		 * @static
		 * 		 * @param {game.IStateMessage=} [properties] Properties to set
		 * 		 * @returns {game.StateMessage} StateMessage instance
		 */
		public static create(properties?: game.IStateMessage): game.StateMessage;

		/**
		 * * Encodes the specified StateMessage message. Does not implicitly {@link game.StateMessage.verify|verify} messages.
		 * 		 * @function encode
		 * 		 * @memberof game.StateMessage
		 * 		 * @static
		 * 		 * @param {game.IStateMessage} message StateMessage message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encode(message: game.IStateMessage, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Encodes the specified StateMessage message, length delimited. Does not implicitly {@link game.StateMessage.verify|verify} messages.
		 * 		 * @function encodeDelimited
		 * 		 * @memberof game.StateMessage
		 * 		 * @static
		 * 		 * @param {game.IStateMessage} message StateMessage message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encodeDelimited(message: game.IStateMessage, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Decodes a StateMessage message from the specified reader or buffer.
		 * 		 * @function decode
		 * 		 * @memberof game.StateMessage
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @param {number} [length] Message length if known beforehand
		 * 		 * @returns {game.StateMessage} StateMessage
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): game.StateMessage;

		/**
		 * * Decodes a StateMessage message from the specified reader or buffer, length delimited.
		 * 		 * @function decodeDelimited
		 * 		 * @memberof game.StateMessage
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @returns {game.StateMessage} StateMessage
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): game.StateMessage;

		/**
		 * * Verifies a StateMessage message.
		 * 		 * @function verify
		 * 		 * @memberof game.StateMessage
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} message Plain object to verify
		 * 		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): (string | null);

		/**
		 * * Creates a StateMessage message from a plain object. Also converts values to their respective internal types.
		 * 		 * @function fromObject
		 * 		 * @memberof game.StateMessage
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} object Plain object
		 * 		 * @returns {game.StateMessage} StateMessage
		 */
		public static fromObject(object: { [k: string]: any }): game.StateMessage;

		/**
		 * * Creates a plain object from a StateMessage message. Also converts values to other types if specified.
		 * 		 * @function toObject
		 * 		 * @memberof game.StateMessage
		 * 		 * @static
		 * 		 * @param {game.StateMessage} message StateMessage
		 * 		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * 		 * @returns {Object.<string,*>} Plain object
		 */
		public static toObject(message: game.StateMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

		/**
		 * * Converts this StateMessage to JSON.
		 * 		 * @function toJSON
		 * 		 * @memberof game.StateMessage
		 * 		 * @instance
		 * 		 * @returns {Object.<string,*>} JSON object
		 */
		public toJSON(): { [k: string]: any };

		/**
		 * * Gets the default type url for StateMessage
		 * 		 * @function getTypeUrl
		 * 		 * @memberof game.StateMessage
		 * 		 * @static
		 * 		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * 		 * @returns {string} The default type url
		 */
		public static getTypeUrl(typeUrlPrefix?: string): string;
	}

	/**
	 * * Properties of a ServerMessage.
	 * 		 * @memberof game
	 * 		 * @interface IServerMessage
	 * 		 * @property {game.IErrorMessage|null} [error] ServerMessage error
	 * 		 * @property {game.IWelcomeMessage|null} [welcome] ServerMessage welcome
	 * 		 * @property {game.IGameStartMessage|null} [start] ServerMessage start
	 * 		 * @property {game.IStateMessage|null} [state] ServerMessage state
	 * 		 * @property {game.IGameEndMessage|null} [end] ServerMessage end
	 */
	interface IServerMessage {

		/** ServerMessage error */
		error?: (game.IErrorMessage | null);

		/** ServerMessage welcome */
		welcome?: (game.IWelcomeMessage | null);

		/** ServerMessage start */
		start?: (game.IGameStartMessage | null);

		/** ServerMessage state */
		state?: (game.IStateMessage | null);

		/** ServerMessage end */
		end?: (game.IGameEndMessage | null);
	}

	/**
	 * * Constructs a new ServerMessage.
	 * 		 * @memberof game
	 * 		 * @classdesc Represents a ServerMessage.
	 * 		 * @implements IServerMessage
	 * 		 * @constructor
	 * 		 * @param {game.IServerMessage=} [properties] Properties to set
	 */
	class ServerMessage implements IServerMessage {

		/**
		 * * Constructs a new ServerMessage.
		 * 		 * @memberof game
		 * 		 * @classdesc Represents a ServerMessage.
		 * 		 * @implements IServerMessage
		 * 		 * @constructor
		 * 		 * @param {game.IServerMessage=} [properties] Properties to set
		 */
		constructor(properties?: game.IServerMessage);

		/**
		 * * ServerMessage error.
		 * 		 * @member {game.IErrorMessage|null|undefined} error
		 * 		 * @memberof game.ServerMessage
		 * 		 * @instance
		 */
		public error?: (game.IErrorMessage | null);

		/**
		 * * ServerMessage welcome.
		 * 		 * @member {game.IWelcomeMessage|null|undefined} welcome
		 * 		 * @memberof game.ServerMessage
		 * 		 * @instance
		 */
		public welcome?: (game.IWelcomeMessage | null);

		/**
		 * * ServerMessage start.
		 * 		 * @member {game.IGameStartMessage|null|undefined} start
		 * 		 * @memberof game.ServerMessage
		 * 		 * @instance
		 */
		public start?: (game.IGameStartMessage | null);

		/**
		 * * ServerMessage state.
		 * 		 * @member {game.IStateMessage|null|undefined} state
		 * 		 * @memberof game.ServerMessage
		 * 		 * @instance
		 */
		public state?: (game.IStateMessage | null);

		/**
		 * * ServerMessage end.
		 * 		 * @member {game.IGameEndMessage|null|undefined} end
		 * 		 * @memberof game.ServerMessage
		 * 		 * @instance
		 */
		public end?: (game.IGameEndMessage | null);

		/**
		 * * ServerMessage payload.
		 * 		 * @member {"error"|"welcome"|"start"|"state"|"end"|undefined} payload
		 * 		 * @memberof game.ServerMessage
		 * 		 * @instance
		 */
		public payload?: ("error" | "welcome" | "start" | "state" | "end");

		/**
		 * * Creates a new ServerMessage instance using the specified properties.
		 * 		 * @function create
		 * 		 * @memberof game.ServerMessage
		 * 		 * @static
		 * 		 * @param {game.IServerMessage=} [properties] Properties to set
		 * 		 * @returns {game.ServerMessage} ServerMessage instance
		 */
		public static create(properties?: game.IServerMessage): game.ServerMessage;

		/**
		 * * Encodes the specified ServerMessage message. Does not implicitly {@link game.ServerMessage.verify|verify} messages.
		 * 		 * @function encode
		 * 		 * @memberof game.ServerMessage
		 * 		 * @static
		 * 		 * @param {game.IServerMessage} message ServerMessage message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encode(message: game.IServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Encodes the specified ServerMessage message, length delimited. Does not implicitly {@link game.ServerMessage.verify|verify} messages.
		 * 		 * @function encodeDelimited
		 * 		 * @memberof game.ServerMessage
		 * 		 * @static
		 * 		 * @param {game.IServerMessage} message ServerMessage message or plain object to encode
		 * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * 		 * @returns {$protobuf.Writer} Writer
		 */
		public static encodeDelimited(message: game.IServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * * Decodes a ServerMessage message from the specified reader or buffer.
		 * 		 * @function decode
		 * 		 * @memberof game.ServerMessage
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @param {number} [length] Message length if known beforehand
		 * 		 * @returns {game.ServerMessage} ServerMessage
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): game.ServerMessage;

		/**
		 * * Decodes a ServerMessage message from the specified reader or buffer, length delimited.
		 * 		 * @function decodeDelimited
		 * 		 * @memberof game.ServerMessage
		 * 		 * @static
		 * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * 		 * @returns {game.ServerMessage} ServerMessage
		 * 		 * @throws {Error} If the payload is not a reader or valid buffer
		 * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): game.ServerMessage;

		/**
		 * * Verifies a ServerMessage message.
		 * 		 * @function verify
		 * 		 * @memberof game.ServerMessage
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} message Plain object to verify
		 * 		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): (string | null);

		/**
		 * * Creates a ServerMessage message from a plain object. Also converts values to their respective internal types.
		 * 		 * @function fromObject
		 * 		 * @memberof game.ServerMessage
		 * 		 * @static
		 * 		 * @param {Object.<string,*>} object Plain object
		 * 		 * @returns {game.ServerMessage} ServerMessage
		 */
		public static fromObject(object: { [k: string]: any }): game.ServerMessage;

		/**
		 * * Creates a plain object from a ServerMessage message. Also converts values to other types if specified.
		 * 		 * @function toObject
		 * 		 * @memberof game.ServerMessage
		 * 		 * @static
		 * 		 * @param {game.ServerMessage} message ServerMessage
		 * 		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * 		 * @returns {Object.<string,*>} Plain object
		 */
		public static toObject(message: game.ServerMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

		/**
		 * * Converts this ServerMessage to JSON.
		 * 		 * @function toJSON
		 * 		 * @memberof game.ServerMessage
		 * 		 * @instance
		 * 		 * @returns {Object.<string,*>} JSON object
		 */
		public toJSON(): { [k: string]: any };

		/**
		 * * Gets the default type url for ServerMessage
		 * 		 * @function getTypeUrl
		 * 		 * @memberof game.ServerMessage
		 * 		 * @static
		 * 		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * 		 * @returns {string} The default type url
		 */
		public static getTypeUrl(typeUrlPrefix?: string): string;
	}
}
