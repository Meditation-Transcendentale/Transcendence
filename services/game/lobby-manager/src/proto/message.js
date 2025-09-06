/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal.js";

// Common aliases
const $Reader = $protobuf.default.Reader, $Writer = $protobuf.default.Writer, $util = $protobuf.default.util;

// Exported root namespace
const $root = $protobuf.default.roots || ($protobuf.default.roots = {});

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
         * @property {boolean|null} [disabled] Ball disabled
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
         * Ball disabled.
         * @member {boolean} disabled
         * @memberof shared.Ball
         * @instance
         */
        Ball.prototype.disabled = false;

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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        Ball.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.y);
            if (message.vx != null && Object.hasOwnProperty.call(message, "vx"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.vx);
            if (message.vy != null && Object.hasOwnProperty.call(message, "vy"))
                writer.uint32(/* id 5, wireType 5 =*/45).float(message.vy);
            if (message.disabled != null && Object.hasOwnProperty.call(message, "disabled"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.disabled);
            return writer;
        };

        /**
         * Encodes the specified Ball message, length delimited. Does not implicitly {@link shared.Ball.verify|verify} messages.
         * @function encodeDelimited
         * @memberof shared.Ball
         * @static
         * @param {shared.IBall} message Ball message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        Ball.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Ball message from the specified reader or buffer.
         * @function decode
         * @memberof shared.Ball
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {shared.Ball} Ball
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
                        message.x = reader.float();
                        break;
                    }
                case 3: {
                        message.y = reader.float();
                        break;
                    }
                case 4: {
                        message.vx = reader.float();
                        break;
                    }
                case 5: {
                        message.vy = reader.float();
                        break;
                    }
                case 6: {
                        message.disabled = reader.bool();
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
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {shared.Ball} Ball
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
                if (typeof message.x !== "number")
                    return "x: number expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (typeof message.y !== "number")
                    return "y: number expected";
            if (message.vx != null && message.hasOwnProperty("vx"))
                if (typeof message.vx !== "number")
                    return "vx: number expected";
            if (message.vy != null && message.hasOwnProperty("vy"))
                if (typeof message.vy !== "number")
                    return "vy: number expected";
            if (message.disabled != null && message.hasOwnProperty("disabled"))
                if (typeof message.disabled !== "boolean")
                    return "disabled: boolean expected";
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
                message.x = Number(object.x);
            if (object.y != null)
                message.y = Number(object.y);
            if (object.vx != null)
                message.vx = Number(object.vx);
            if (object.vy != null)
                message.vy = Number(object.vy);
            if (object.disabled != null)
                message.disabled = Boolean(object.disabled);
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
                object.disabled = false;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
            if (message.vx != null && message.hasOwnProperty("vx"))
                object.vx = options.json && !isFinite(message.vx) ? String(message.vx) : message.vx;
            if (message.vy != null && message.hasOwnProperty("vy"))
                object.vy = options.json && !isFinite(message.vy) ? String(message.vy) : message.vy;
            if (message.disabled != null && message.hasOwnProperty("disabled"))
                object.disabled = message.disabled;
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
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
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
         * @property {number|null} [playerId] Paddle playerId
         * @property {number|null} [move] Paddle move
         * @property {number|null} [offset] Paddle offset
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
         * Paddle playerId.
         * @member {number} playerId
         * @memberof shared.Paddle
         * @instance
         */
        Paddle.prototype.playerId = 0;

        /**
         * Paddle move.
         * @member {number} move
         * @memberof shared.Paddle
         * @instance
         */
        Paddle.prototype.move = 0;

        /**
         * Paddle offset.
         * @member {number} offset
         * @memberof shared.Paddle
         * @instance
         */
        Paddle.prototype.offset = 0;

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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        Paddle.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.playerId);
            if (message.move != null && Object.hasOwnProperty.call(message, "move"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.move);
            if (message.offset != null && Object.hasOwnProperty.call(message, "offset"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.offset);
            if (message.dead != null && Object.hasOwnProperty.call(message, "dead"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.dead);
            return writer;
        };

        /**
         * Encodes the specified Paddle message, length delimited. Does not implicitly {@link shared.Paddle.verify|verify} messages.
         * @function encodeDelimited
         * @memberof shared.Paddle
         * @static
         * @param {shared.IPaddle} message Paddle message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        Paddle.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Paddle message from the specified reader or buffer.
         * @function decode
         * @memberof shared.Paddle
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {shared.Paddle} Paddle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
                        message.playerId = reader.int32();
                        break;
                    }
                case 3: {
                        message.move = reader.int32();
                        break;
                    }
                case 4: {
                        message.offset = reader.float();
                        break;
                    }
                case 5: {
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
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {shared.Paddle} Paddle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId))
                    return "playerId: integer expected";
            if (message.move != null && message.hasOwnProperty("move"))
                if (!$util.isInteger(message.move))
                    return "move: integer expected";
            if (message.offset != null && message.hasOwnProperty("offset"))
                if (typeof message.offset !== "number")
                    return "offset: number expected";
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
            if (object.playerId != null)
                message.playerId = object.playerId | 0;
            if (object.move != null)
                message.move = object.move | 0;
            if (object.offset != null)
                message.offset = Number(object.offset);
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
                object.playerId = 0;
                object.move = 0;
                object.offset = 0;
                object.dead = false;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                object.playerId = message.playerId;
            if (message.move != null && message.hasOwnProperty("move"))
                object.move = message.move;
            if (message.offset != null && message.hasOwnProperty("offset"))
                object.offset = options.json && !isFinite(message.offset) ? String(message.offset) : message.offset;
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
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        PaddleInput.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PaddleInput message from the specified reader or buffer.
         * @function decode
         * @memberof shared.PaddleInput
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {shared.PaddleInput} PaddleInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {shared.PaddleInput} PaddleInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        Goal.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Goal message from the specified reader or buffer.
         * @function decode
         * @memberof shared.Goal
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {shared.Goal} Goal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {shared.Goal} Goal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
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

    shared.GameEvent = (function() {

        /**
         * Properties of a GameEvent.
         * @memberof shared
         * @interface IGameEvent
         * @property {string|null} [type] GameEvent type
         * @property {string|null} [phase] GameEvent phase
         * @property {number|null} [remainingPlayers] GameEvent remainingPlayers
         * @property {number|Long|null} [timestamp] GameEvent timestamp
         * @property {Array.<number>|null} [activePlayers] GameEvent activePlayers
         * @property {Object.<string,number>|null} [playerMapping] GameEvent playerMapping
         */

        /**
         * Constructs a new GameEvent.
         * @memberof shared
         * @classdesc Represents a GameEvent.
         * @implements IGameEvent
         * @constructor
         * @param {shared.IGameEvent=} [properties] Properties to set
         */
        function GameEvent(properties) {
            this.activePlayers = [];
            this.playerMapping = {};
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameEvent type.
         * @member {string} type
         * @memberof shared.GameEvent
         * @instance
         */
        GameEvent.prototype.type = "";

        /**
         * GameEvent phase.
         * @member {string} phase
         * @memberof shared.GameEvent
         * @instance
         */
        GameEvent.prototype.phase = "";

        /**
         * GameEvent remainingPlayers.
         * @member {number} remainingPlayers
         * @memberof shared.GameEvent
         * @instance
         */
        GameEvent.prototype.remainingPlayers = 0;

        /**
         * GameEvent timestamp.
         * @member {number|Long} timestamp
         * @memberof shared.GameEvent
         * @instance
         */
        GameEvent.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * GameEvent activePlayers.
         * @member {Array.<number>} activePlayers
         * @memberof shared.GameEvent
         * @instance
         */
        GameEvent.prototype.activePlayers = $util.emptyArray;

        /**
         * GameEvent playerMapping.
         * @member {Object.<string,number>} playerMapping
         * @memberof shared.GameEvent
         * @instance
         */
        GameEvent.prototype.playerMapping = $util.emptyObject;

        /**
         * Creates a new GameEvent instance using the specified properties.
         * @function create
         * @memberof shared.GameEvent
         * @static
         * @param {shared.IGameEvent=} [properties] Properties to set
         * @returns {shared.GameEvent} GameEvent instance
         */
        GameEvent.create = function create(properties) {
            return new GameEvent(properties);
        };

        /**
         * Encodes the specified GameEvent message. Does not implicitly {@link shared.GameEvent.verify|verify} messages.
         * @function encode
         * @memberof shared.GameEvent
         * @static
         * @param {shared.IGameEvent} message GameEvent message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        GameEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.type);
            if (message.phase != null && Object.hasOwnProperty.call(message, "phase"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.phase);
            if (message.remainingPlayers != null && Object.hasOwnProperty.call(message, "remainingPlayers"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.remainingPlayers);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.timestamp);
            if (message.activePlayers != null && message.activePlayers.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (let i = 0; i < message.activePlayers.length; ++i)
                    writer.int32(message.activePlayers[i]);
                writer.ldelim();
            }
            if (message.playerMapping != null && Object.hasOwnProperty.call(message, "playerMapping"))
                for (let keys = Object.keys(message.playerMapping), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 6, wireType 2 =*/50).fork().uint32(/* id 1, wireType 0 =*/8).int32(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.playerMapping[keys[i]]).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GameEvent message, length delimited. Does not implicitly {@link shared.GameEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof shared.GameEvent
         * @static
         * @param {shared.IGameEvent} message GameEvent message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        GameEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameEvent message from the specified reader or buffer.
         * @function decode
         * @memberof shared.GameEvent
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {shared.GameEvent} GameEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        GameEvent.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.GameEvent(), key, value;
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.string();
                        break;
                    }
                case 2: {
                        message.phase = reader.string();
                        break;
                    }
                case 3: {
                        message.remainingPlayers = reader.int32();
                        break;
                    }
                case 4: {
                        message.timestamp = reader.int64();
                        break;
                    }
                case 5: {
                        if (!(message.activePlayers && message.activePlayers.length))
                            message.activePlayers = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.activePlayers.push(reader.int32());
                        } else
                            message.activePlayers.push(reader.int32());
                        break;
                    }
                case 6: {
                        if (message.playerMapping === $util.emptyObject)
                            message.playerMapping = {};
                        let end2 = reader.uint32() + reader.pos;
                        key = 0;
                        value = 0;
                        while (reader.pos < end2) {
                            let tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                            case 1:
                                key = reader.int32();
                                break;
                            case 2:
                                value = reader.int32();
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                            }
                        }
                        message.playerMapping[key] = value;
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
         * Decodes a GameEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof shared.GameEvent
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {shared.GameEvent} GameEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        GameEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameEvent message.
         * @function verify
         * @memberof shared.GameEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isString(message.type))
                    return "type: string expected";
            if (message.phase != null && message.hasOwnProperty("phase"))
                if (!$util.isString(message.phase))
                    return "phase: string expected";
            if (message.remainingPlayers != null && message.hasOwnProperty("remainingPlayers"))
                if (!$util.isInteger(message.remainingPlayers))
                    return "remainingPlayers: integer expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            if (message.activePlayers != null && message.hasOwnProperty("activePlayers")) {
                if (!Array.isArray(message.activePlayers))
                    return "activePlayers: array expected";
                for (let i = 0; i < message.activePlayers.length; ++i)
                    if (!$util.isInteger(message.activePlayers[i]))
                        return "activePlayers: integer[] expected";
            }
            if (message.playerMapping != null && message.hasOwnProperty("playerMapping")) {
                if (!$util.isObject(message.playerMapping))
                    return "playerMapping: object expected";
                let key = Object.keys(message.playerMapping);
                for (let i = 0; i < key.length; ++i) {
                    if (!$util.key32Re.test(key[i]))
                        return "playerMapping: integer key{k:int32} expected";
                    if (!$util.isInteger(message.playerMapping[key[i]]))
                        return "playerMapping: integer{k:int32} expected";
                }
            }
            return null;
        };

        /**
         * Creates a GameEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof shared.GameEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {shared.GameEvent} GameEvent
         */
        GameEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.shared.GameEvent)
                return object;
            let message = new $root.shared.GameEvent();
            if (object.type != null)
                message.type = String(object.type);
            if (object.phase != null)
                message.phase = String(object.phase);
            if (object.remainingPlayers != null)
                message.remainingPlayers = object.remainingPlayers | 0;
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            if (object.activePlayers) {
                if (!Array.isArray(object.activePlayers))
                    throw TypeError(".shared.GameEvent.activePlayers: array expected");
                message.activePlayers = [];
                for (let i = 0; i < object.activePlayers.length; ++i)
                    message.activePlayers[i] = object.activePlayers[i] | 0;
            }
            if (object.playerMapping) {
                if (typeof object.playerMapping !== "object")
                    throw TypeError(".shared.GameEvent.playerMapping: object expected");
                message.playerMapping = {};
                for (let keys = Object.keys(object.playerMapping), i = 0; i < keys.length; ++i)
                    message.playerMapping[keys[i]] = object.playerMapping[keys[i]] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a GameEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof shared.GameEvent
         * @static
         * @param {shared.GameEvent} message GameEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.activePlayers = [];
            if (options.objects || options.defaults)
                object.playerMapping = {};
            if (options.defaults) {
                object.type = "";
                object.phase = "";
                object.remainingPlayers = 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.phase != null && message.hasOwnProperty("phase"))
                object.phase = message.phase;
            if (message.remainingPlayers != null && message.hasOwnProperty("remainingPlayers"))
                object.remainingPlayers = message.remainingPlayers;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            if (message.activePlayers && message.activePlayers.length) {
                object.activePlayers = [];
                for (let j = 0; j < message.activePlayers.length; ++j)
                    object.activePlayers[j] = message.activePlayers[j];
            }
            let keys2;
            if (message.playerMapping && (keys2 = Object.keys(message.playerMapping)).length) {
                object.playerMapping = {};
                for (let j = 0; j < keys2.length; ++j)
                    object.playerMapping[keys2[j]] = message.playerMapping[keys2[j]];
            }
            return object;
        };

        /**
         * Converts this GameEvent to JSON.
         * @function toJSON
         * @memberof shared.GameEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GameEvent
         * @function getTypeUrl
         * @memberof shared.GameEvent
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GameEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/shared.GameEvent";
        };

        return GameEvent;
    })();

    shared.GameStateInfo = (function() {

        /**
         * Properties of a GameStateInfo.
         * @memberof shared
         * @interface IGameStateInfo
         * @property {Array.<number>|null} [activePlayers] GameStateInfo activePlayers
         * @property {Array.<number>|null} [eliminatedPlayers] GameStateInfo eliminatedPlayers
         * @property {string|null} [currentPhase] GameStateInfo currentPhase
         * @property {boolean|null} [isRebuilding] GameStateInfo isRebuilding
         * @property {number|Long|null} [rebuildTimeRemaining] GameStateInfo rebuildTimeRemaining
         * @property {Object.<string,number>|null} [playerMapping] GameStateInfo playerMapping
         * @property {boolean|null} [isGameOver] GameStateInfo isGameOver
         * @property {number|null} [winner] GameStateInfo winner
         */

        /**
         * Constructs a new GameStateInfo.
         * @memberof shared
         * @classdesc Represents a GameStateInfo.
         * @implements IGameStateInfo
         * @constructor
         * @param {shared.IGameStateInfo=} [properties] Properties to set
         */
        function GameStateInfo(properties) {
            this.activePlayers = [];
            this.eliminatedPlayers = [];
            this.playerMapping = {};
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameStateInfo activePlayers.
         * @member {Array.<number>} activePlayers
         * @memberof shared.GameStateInfo
         * @instance
         */
        GameStateInfo.prototype.activePlayers = $util.emptyArray;

        /**
         * GameStateInfo eliminatedPlayers.
         * @member {Array.<number>} eliminatedPlayers
         * @memberof shared.GameStateInfo
         * @instance
         */
        GameStateInfo.prototype.eliminatedPlayers = $util.emptyArray;

        /**
         * GameStateInfo currentPhase.
         * @member {string} currentPhase
         * @memberof shared.GameStateInfo
         * @instance
         */
        GameStateInfo.prototype.currentPhase = "";

        /**
         * GameStateInfo isRebuilding.
         * @member {boolean} isRebuilding
         * @memberof shared.GameStateInfo
         * @instance
         */
        GameStateInfo.prototype.isRebuilding = false;

        /**
         * GameStateInfo rebuildTimeRemaining.
         * @member {number|Long} rebuildTimeRemaining
         * @memberof shared.GameStateInfo
         * @instance
         */
        GameStateInfo.prototype.rebuildTimeRemaining = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * GameStateInfo playerMapping.
         * @member {Object.<string,number>} playerMapping
         * @memberof shared.GameStateInfo
         * @instance
         */
        GameStateInfo.prototype.playerMapping = $util.emptyObject;

        /**
         * GameStateInfo isGameOver.
         * @member {boolean} isGameOver
         * @memberof shared.GameStateInfo
         * @instance
         */
        GameStateInfo.prototype.isGameOver = false;

        /**
         * GameStateInfo winner.
         * @member {number} winner
         * @memberof shared.GameStateInfo
         * @instance
         */
        GameStateInfo.prototype.winner = 0;

        /**
         * Creates a new GameStateInfo instance using the specified properties.
         * @function create
         * @memberof shared.GameStateInfo
         * @static
         * @param {shared.IGameStateInfo=} [properties] Properties to set
         * @returns {shared.GameStateInfo} GameStateInfo instance
         */
        GameStateInfo.create = function create(properties) {
            return new GameStateInfo(properties);
        };

        /**
         * Encodes the specified GameStateInfo message. Does not implicitly {@link shared.GameStateInfo.verify|verify} messages.
         * @function encode
         * @memberof shared.GameStateInfo
         * @static
         * @param {shared.IGameStateInfo} message GameStateInfo message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        GameStateInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.activePlayers != null && message.activePlayers.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (let i = 0; i < message.activePlayers.length; ++i)
                    writer.int32(message.activePlayers[i]);
                writer.ldelim();
            }
            if (message.eliminatedPlayers != null && message.eliminatedPlayers.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (let i = 0; i < message.eliminatedPlayers.length; ++i)
                    writer.int32(message.eliminatedPlayers[i]);
                writer.ldelim();
            }
            if (message.currentPhase != null && Object.hasOwnProperty.call(message, "currentPhase"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.currentPhase);
            if (message.isRebuilding != null && Object.hasOwnProperty.call(message, "isRebuilding"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isRebuilding);
            if (message.rebuildTimeRemaining != null && Object.hasOwnProperty.call(message, "rebuildTimeRemaining"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.rebuildTimeRemaining);
            if (message.playerMapping != null && Object.hasOwnProperty.call(message, "playerMapping"))
                for (let keys = Object.keys(message.playerMapping), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 6, wireType 2 =*/50).fork().uint32(/* id 1, wireType 0 =*/8).int32(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.playerMapping[keys[i]]).ldelim();
            if (message.isGameOver != null && Object.hasOwnProperty.call(message, "isGameOver"))
                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.isGameOver);
            if (message.winner != null && Object.hasOwnProperty.call(message, "winner"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.winner);
            return writer;
        };

        /**
         * Encodes the specified GameStateInfo message, length delimited. Does not implicitly {@link shared.GameStateInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof shared.GameStateInfo
         * @static
         * @param {shared.IGameStateInfo} message GameStateInfo message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        GameStateInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameStateInfo message from the specified reader or buffer.
         * @function decode
         * @memberof shared.GameStateInfo
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {shared.GameStateInfo} GameStateInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        GameStateInfo.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.GameStateInfo(), key, value;
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.activePlayers && message.activePlayers.length))
                            message.activePlayers = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.activePlayers.push(reader.int32());
                        } else
                            message.activePlayers.push(reader.int32());
                        break;
                    }
                case 2: {
                        if (!(message.eliminatedPlayers && message.eliminatedPlayers.length))
                            message.eliminatedPlayers = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.eliminatedPlayers.push(reader.int32());
                        } else
                            message.eliminatedPlayers.push(reader.int32());
                        break;
                    }
                case 3: {
                        message.currentPhase = reader.string();
                        break;
                    }
                case 4: {
                        message.isRebuilding = reader.bool();
                        break;
                    }
                case 5: {
                        message.rebuildTimeRemaining = reader.int64();
                        break;
                    }
                case 6: {
                        if (message.playerMapping === $util.emptyObject)
                            message.playerMapping = {};
                        let end2 = reader.uint32() + reader.pos;
                        key = 0;
                        value = 0;
                        while (reader.pos < end2) {
                            let tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                            case 1:
                                key = reader.int32();
                                break;
                            case 2:
                                value = reader.int32();
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                            }
                        }
                        message.playerMapping[key] = value;
                        break;
                    }
                case 7: {
                        message.isGameOver = reader.bool();
                        break;
                    }
                case 8: {
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
         * Decodes a GameStateInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof shared.GameStateInfo
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {shared.GameStateInfo} GameStateInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        GameStateInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameStateInfo message.
         * @function verify
         * @memberof shared.GameStateInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameStateInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.activePlayers != null && message.hasOwnProperty("activePlayers")) {
                if (!Array.isArray(message.activePlayers))
                    return "activePlayers: array expected";
                for (let i = 0; i < message.activePlayers.length; ++i)
                    if (!$util.isInteger(message.activePlayers[i]))
                        return "activePlayers: integer[] expected";
            }
            if (message.eliminatedPlayers != null && message.hasOwnProperty("eliminatedPlayers")) {
                if (!Array.isArray(message.eliminatedPlayers))
                    return "eliminatedPlayers: array expected";
                for (let i = 0; i < message.eliminatedPlayers.length; ++i)
                    if (!$util.isInteger(message.eliminatedPlayers[i]))
                        return "eliminatedPlayers: integer[] expected";
            }
            if (message.currentPhase != null && message.hasOwnProperty("currentPhase"))
                if (!$util.isString(message.currentPhase))
                    return "currentPhase: string expected";
            if (message.isRebuilding != null && message.hasOwnProperty("isRebuilding"))
                if (typeof message.isRebuilding !== "boolean")
                    return "isRebuilding: boolean expected";
            if (message.rebuildTimeRemaining != null && message.hasOwnProperty("rebuildTimeRemaining"))
                if (!$util.isInteger(message.rebuildTimeRemaining) && !(message.rebuildTimeRemaining && $util.isInteger(message.rebuildTimeRemaining.low) && $util.isInteger(message.rebuildTimeRemaining.high)))
                    return "rebuildTimeRemaining: integer|Long expected";
            if (message.playerMapping != null && message.hasOwnProperty("playerMapping")) {
                if (!$util.isObject(message.playerMapping))
                    return "playerMapping: object expected";
                let key = Object.keys(message.playerMapping);
                for (let i = 0; i < key.length; ++i) {
                    if (!$util.key32Re.test(key[i]))
                        return "playerMapping: integer key{k:int32} expected";
                    if (!$util.isInteger(message.playerMapping[key[i]]))
                        return "playerMapping: integer{k:int32} expected";
                }
            }
            if (message.isGameOver != null && message.hasOwnProperty("isGameOver"))
                if (typeof message.isGameOver !== "boolean")
                    return "isGameOver: boolean expected";
            if (message.winner != null && message.hasOwnProperty("winner"))
                if (!$util.isInteger(message.winner))
                    return "winner: integer expected";
            return null;
        };

        /**
         * Creates a GameStateInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof shared.GameStateInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {shared.GameStateInfo} GameStateInfo
         */
        GameStateInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.shared.GameStateInfo)
                return object;
            let message = new $root.shared.GameStateInfo();
            if (object.activePlayers) {
                if (!Array.isArray(object.activePlayers))
                    throw TypeError(".shared.GameStateInfo.activePlayers: array expected");
                message.activePlayers = [];
                for (let i = 0; i < object.activePlayers.length; ++i)
                    message.activePlayers[i] = object.activePlayers[i] | 0;
            }
            if (object.eliminatedPlayers) {
                if (!Array.isArray(object.eliminatedPlayers))
                    throw TypeError(".shared.GameStateInfo.eliminatedPlayers: array expected");
                message.eliminatedPlayers = [];
                for (let i = 0; i < object.eliminatedPlayers.length; ++i)
                    message.eliminatedPlayers[i] = object.eliminatedPlayers[i] | 0;
            }
            if (object.currentPhase != null)
                message.currentPhase = String(object.currentPhase);
            if (object.isRebuilding != null)
                message.isRebuilding = Boolean(object.isRebuilding);
            if (object.rebuildTimeRemaining != null)
                if ($util.Long)
                    (message.rebuildTimeRemaining = $util.Long.fromValue(object.rebuildTimeRemaining)).unsigned = false;
                else if (typeof object.rebuildTimeRemaining === "string")
                    message.rebuildTimeRemaining = parseInt(object.rebuildTimeRemaining, 10);
                else if (typeof object.rebuildTimeRemaining === "number")
                    message.rebuildTimeRemaining = object.rebuildTimeRemaining;
                else if (typeof object.rebuildTimeRemaining === "object")
                    message.rebuildTimeRemaining = new $util.LongBits(object.rebuildTimeRemaining.low >>> 0, object.rebuildTimeRemaining.high >>> 0).toNumber();
            if (object.playerMapping) {
                if (typeof object.playerMapping !== "object")
                    throw TypeError(".shared.GameStateInfo.playerMapping: object expected");
                message.playerMapping = {};
                for (let keys = Object.keys(object.playerMapping), i = 0; i < keys.length; ++i)
                    message.playerMapping[keys[i]] = object.playerMapping[keys[i]] | 0;
            }
            if (object.isGameOver != null)
                message.isGameOver = Boolean(object.isGameOver);
            if (object.winner != null)
                message.winner = object.winner | 0;
            return message;
        };

        /**
         * Creates a plain object from a GameStateInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof shared.GameStateInfo
         * @static
         * @param {shared.GameStateInfo} message GameStateInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameStateInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.activePlayers = [];
                object.eliminatedPlayers = [];
            }
            if (options.objects || options.defaults)
                object.playerMapping = {};
            if (options.defaults) {
                object.currentPhase = "";
                object.isRebuilding = false;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.rebuildTimeRemaining = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.rebuildTimeRemaining = options.longs === String ? "0" : 0;
                object.isGameOver = false;
                object.winner = 0;
            }
            if (message.activePlayers && message.activePlayers.length) {
                object.activePlayers = [];
                for (let j = 0; j < message.activePlayers.length; ++j)
                    object.activePlayers[j] = message.activePlayers[j];
            }
            if (message.eliminatedPlayers && message.eliminatedPlayers.length) {
                object.eliminatedPlayers = [];
                for (let j = 0; j < message.eliminatedPlayers.length; ++j)
                    object.eliminatedPlayers[j] = message.eliminatedPlayers[j];
            }
            if (message.currentPhase != null && message.hasOwnProperty("currentPhase"))
                object.currentPhase = message.currentPhase;
            if (message.isRebuilding != null && message.hasOwnProperty("isRebuilding"))
                object.isRebuilding = message.isRebuilding;
            if (message.rebuildTimeRemaining != null && message.hasOwnProperty("rebuildTimeRemaining"))
                if (typeof message.rebuildTimeRemaining === "number")
                    object.rebuildTimeRemaining = options.longs === String ? String(message.rebuildTimeRemaining) : message.rebuildTimeRemaining;
                else
                    object.rebuildTimeRemaining = options.longs === String ? $util.Long.prototype.toString.call(message.rebuildTimeRemaining) : options.longs === Number ? new $util.LongBits(message.rebuildTimeRemaining.low >>> 0, message.rebuildTimeRemaining.high >>> 0).toNumber() : message.rebuildTimeRemaining;
            let keys2;
            if (message.playerMapping && (keys2 = Object.keys(message.playerMapping)).length) {
                object.playerMapping = {};
                for (let j = 0; j < keys2.length; ++j)
                    object.playerMapping[keys2[j]] = message.playerMapping[keys2[j]];
            }
            if (message.isGameOver != null && message.hasOwnProperty("isGameOver"))
                object.isGameOver = message.isGameOver;
            if (message.winner != null && message.hasOwnProperty("winner"))
                object.winner = message.winner;
            return object;
        };

        /**
         * Converts this GameStateInfo to JSON.
         * @function toJSON
         * @memberof shared.GameStateInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameStateInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GameStateInfo
         * @function getTypeUrl
         * @memberof shared.GameStateInfo
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GameStateInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/shared.GameStateInfo";
        };

        return GameStateInfo;
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
         * @property {Array.<shared.IGameEvent>|null} [events] MatchState events
         * @property {shared.IGameStateInfo|null} [gameState] MatchState gameState
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
            this.events = [];
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
        MatchState.prototype.tick = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

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
         * MatchState events.
         * @member {Array.<shared.IGameEvent>} events
         * @memberof shared.MatchState
         * @instance
         */
        MatchState.prototype.events = $util.emptyArray;

        /**
         * MatchState gameState.
         * @member {shared.IGameStateInfo|null|undefined} gameState
         * @memberof shared.MatchState
         * @instance
         */
        MatchState.prototype.gameState = null;

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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
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
            if (message.events != null && message.events.length)
                for (let i = 0; i < message.events.length; ++i)
                    $root.shared.GameEvent.encode(message.events[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.gameState != null && Object.hasOwnProperty.call(message, "gameState"))
                $root.shared.GameStateInfo.encode(message.gameState, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified MatchState message, length delimited. Does not implicitly {@link shared.MatchState.verify|verify} messages.
         * @function encodeDelimited
         * @memberof shared.MatchState
         * @static
         * @param {shared.IMatchState} message MatchState message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchState message from the specified reader or buffer.
         * @function decode
         * @memberof shared.MatchState
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {shared.MatchState} MatchState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
                case 8: {
                        if (!(message.events && message.events.length))
                            message.events = [];
                        message.events.push($root.shared.GameEvent.decode(reader, reader.uint32()));
                        break;
                    }
                case 9: {
                        message.gameState = $root.shared.GameStateInfo.decode(reader, reader.uint32());
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
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {shared.MatchState} MatchState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
            if (message.events != null && message.hasOwnProperty("events")) {
                if (!Array.isArray(message.events))
                    return "events: array expected";
                for (let i = 0; i < message.events.length; ++i) {
                    let error = $root.shared.GameEvent.verify(message.events[i]);
                    if (error)
                        return "events." + error;
                }
            }
            if (message.gameState != null && message.hasOwnProperty("gameState")) {
                let error = $root.shared.GameStateInfo.verify(message.gameState);
                if (error)
                    return "gameState." + error;
            }
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
            if (object.events) {
                if (!Array.isArray(object.events))
                    throw TypeError(".shared.MatchState.events: array expected");
                message.events = [];
                for (let i = 0; i < object.events.length; ++i) {
                    if (typeof object.events[i] !== "object")
                        throw TypeError(".shared.MatchState.events: object expected");
                    message.events[i] = $root.shared.GameEvent.fromObject(object.events[i]);
                }
            }
            if (object.gameState != null) {
                if (typeof object.gameState !== "object")
                    throw TypeError(".shared.MatchState.gameState: object expected");
                message.gameState = $root.shared.GameStateInfo.fromObject(object.gameState);
            }
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
                object.events = [];
            }
            if (options.defaults) {
                object.gameId = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.tick = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.tick = options.longs === String ? "0" : 0;
                object.stage = 0;
                object.gameState = null;
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
            if (message.events && message.events.length) {
                object.events = [];
                for (let j = 0; j < message.events.length; ++j)
                    object.events[j] = $root.shared.GameEvent.toObject(message.events[j], options);
            }
            if (message.gameState != null && message.hasOwnProperty("gameState"))
                object.gameState = $root.shared.GameStateInfo.toObject(message.gameState, options);
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
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchCreateRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchCreateRequest message from the specified reader or buffer.
         * @function decode
         * @memberof shared.MatchCreateRequest
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {shared.MatchCreateRequest} MatchCreateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {shared.MatchCreateRequest} MatchCreateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchCreateResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchCreateResponse message from the specified reader or buffer.
         * @function decode
         * @memberof shared.MatchCreateResponse
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {shared.MatchCreateResponse} MatchCreateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {shared.MatchCreateResponse} MatchCreateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchSetup.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchSetup message from the specified reader or buffer.
         * @function decode
         * @memberof shared.MatchSetup
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {shared.MatchSetup} MatchSetup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {shared.MatchSetup} MatchSetup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchInput.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchInput message from the specified reader or buffer.
         * @function decode
         * @memberof shared.MatchInput
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {shared.MatchInput} MatchInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {shared.MatchInput} MatchInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchQuit.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchQuit message from the specified reader or buffer.
         * @function decode
         * @memberof shared.MatchQuit
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {shared.MatchQuit} MatchQuit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {shared.MatchQuit} MatchQuit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchStart.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchStart message from the specified reader or buffer.
         * @function decode
         * @memberof shared.MatchStart
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {shared.MatchStart} MatchStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {shared.MatchStart} MatchStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
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
         * @property {number|null} [winnerId] MatchEnd winnerId
         * @property {Array.<number>|null} [score] MatchEnd score
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
            this.score = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MatchEnd winnerId.
         * @member {number} winnerId
         * @memberof shared.MatchEnd
         * @instance
         */
        MatchEnd.prototype.winnerId = 0;

        /**
         * MatchEnd score.
         * @member {Array.<number>} score
         * @memberof shared.MatchEnd
         * @instance
         */
        MatchEnd.prototype.score = $util.emptyArray;

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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchEnd.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.winnerId != null && Object.hasOwnProperty.call(message, "winnerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.winnerId);
            if (message.score != null && message.score.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (let i = 0; i < message.score.length; ++i)
                    writer.int32(message.score[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified MatchEnd message, length delimited. Does not implicitly {@link shared.MatchEnd.verify|verify} messages.
         * @function encodeDelimited
         * @memberof shared.MatchEnd
         * @static
         * @param {shared.IMatchEnd} message MatchEnd message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchEnd.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchEnd message from the specified reader or buffer.
         * @function decode
         * @memberof shared.MatchEnd
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {shared.MatchEnd} MatchEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
                        message.winnerId = reader.int32();
                        break;
                    }
                case 2: {
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
         * Decodes a MatchEnd message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof shared.MatchEnd
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {shared.MatchEnd} MatchEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
            if (message.winnerId != null && message.hasOwnProperty("winnerId"))
                if (!$util.isInteger(message.winnerId))
                    return "winnerId: integer expected";
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
            if (object.winnerId != null)
                message.winnerId = object.winnerId | 0;
            if (object.score) {
                if (!Array.isArray(object.score))
                    throw TypeError(".shared.MatchEnd.score: array expected");
                message.score = [];
                for (let i = 0; i < object.score.length; ++i)
                    message.score[i] = object.score[i] | 0;
            }
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
            if (options.arrays || options.defaults)
                object.score = [];
            if (options.defaults)
                object.winnerId = 0;
            if (message.winnerId != null && message.hasOwnProperty("winnerId"))
                object.winnerId = message.winnerId;
            if (message.score && message.score.length) {
                object.score = [];
                for (let j = 0; j < message.score.length; ++j)
                    object.score[j] = message.score[j];
            }
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
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
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
        PhysicsRequest.prototype.tick = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        PhysicsRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PhysicsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof shared.PhysicsRequest
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {shared.PhysicsRequest} PhysicsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {shared.PhysicsRequest} PhysicsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
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
             * @param {$protobuf.default.Writer} [writer] Writer to encode to
             * @returns {$protobuf.default.Writer} Writer
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
             * @param {$protobuf.default.Writer} [writer] Writer to encode to
             * @returns {$protobuf.default.Writer} Writer
             */
            Empty.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Empty message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Empty
             * @static
             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Empty} Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Empty} Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
                return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
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

export const lobby = $root.lobby = (() => {

    /**
     * Namespace lobby.
     * @exports lobby
     * @namespace
     */
    const lobby = {};

    lobby.UserStatus = (function() {

        /**
         * Properties of a UserStatus.
         * @memberof lobby
         * @interface IUserStatus
         * @property {string|null} [uuid] UserStatus uuid
         * @property {string|null} [lobbyId] UserStatus lobbyId
         * @property {string|null} [status] UserStatus status
         */

        /**
         * Constructs a new UserStatus.
         * @memberof lobby
         * @classdesc Represents a UserStatus.
         * @implements IUserStatus
         * @constructor
         * @param {lobby.IUserStatus=} [properties] Properties to set
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
         * @memberof lobby.UserStatus
         * @instance
         */
        UserStatus.prototype.uuid = "";

        /**
         * UserStatus lobbyId.
         * @member {string} lobbyId
         * @memberof lobby.UserStatus
         * @instance
         */
        UserStatus.prototype.lobbyId = "";

        /**
         * UserStatus status.
         * @member {string} status
         * @memberof lobby.UserStatus
         * @instance
         */
        UserStatus.prototype.status = "";

        /**
         * Creates a new UserStatus instance using the specified properties.
         * @function create
         * @memberof lobby.UserStatus
         * @static
         * @param {lobby.IUserStatus=} [properties] Properties to set
         * @returns {lobby.UserStatus} UserStatus instance
         */
        UserStatus.create = function create(properties) {
            return new UserStatus(properties);
        };

        /**
         * Encodes the specified UserStatus message. Does not implicitly {@link lobby.UserStatus.verify|verify} messages.
         * @function encode
         * @memberof lobby.UserStatus
         * @static
         * @param {lobby.IUserStatus} message UserStatus message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
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
         * Encodes the specified UserStatus message, length delimited. Does not implicitly {@link lobby.UserStatus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof lobby.UserStatus
         * @static
         * @param {lobby.IUserStatus} message UserStatus message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        UserStatus.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserStatus message from the specified reader or buffer.
         * @function decode
         * @memberof lobby.UserStatus
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {lobby.UserStatus} UserStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        UserStatus.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.lobby.UserStatus();
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
         * @memberof lobby.UserStatus
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {lobby.UserStatus} UserStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        UserStatus.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserStatus message.
         * @function verify
         * @memberof lobby.UserStatus
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
         * @memberof lobby.UserStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {lobby.UserStatus} UserStatus
         */
        UserStatus.fromObject = function fromObject(object) {
            if (object instanceof $root.lobby.UserStatus)
                return object;
            let message = new $root.lobby.UserStatus();
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
         * @memberof lobby.UserStatus
         * @static
         * @param {lobby.UserStatus} message UserStatus
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
         * @memberof lobby.UserStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserStatus
         * @function getTypeUrl
         * @memberof lobby.UserStatus
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserStatus.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/lobby.UserStatus";
        };

        return UserStatus;
    })();

    lobby.QuitMessage = (function() {

        /**
         * Properties of a QuitMessage.
         * @memberof lobby
         * @interface IQuitMessage
         * @property {string|null} [uuid] QuitMessage uuid
         * @property {string|null} [lobbyId] QuitMessage lobbyId
         */

        /**
         * Constructs a new QuitMessage.
         * @memberof lobby
         * @classdesc Represents a QuitMessage.
         * @implements IQuitMessage
         * @constructor
         * @param {lobby.IQuitMessage=} [properties] Properties to set
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
         * @memberof lobby.QuitMessage
         * @instance
         */
        QuitMessage.prototype.uuid = "";

        /**
         * QuitMessage lobbyId.
         * @member {string} lobbyId
         * @memberof lobby.QuitMessage
         * @instance
         */
        QuitMessage.prototype.lobbyId = "";

        /**
         * Creates a new QuitMessage instance using the specified properties.
         * @function create
         * @memberof lobby.QuitMessage
         * @static
         * @param {lobby.IQuitMessage=} [properties] Properties to set
         * @returns {lobby.QuitMessage} QuitMessage instance
         */
        QuitMessage.create = function create(properties) {
            return new QuitMessage(properties);
        };

        /**
         * Encodes the specified QuitMessage message. Does not implicitly {@link lobby.QuitMessage.verify|verify} messages.
         * @function encode
         * @memberof lobby.QuitMessage
         * @static
         * @param {lobby.IQuitMessage} message QuitMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
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
         * Encodes the specified QuitMessage message, length delimited. Does not implicitly {@link lobby.QuitMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof lobby.QuitMessage
         * @static
         * @param {lobby.IQuitMessage} message QuitMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        QuitMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a QuitMessage message from the specified reader or buffer.
         * @function decode
         * @memberof lobby.QuitMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {lobby.QuitMessage} QuitMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        QuitMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.lobby.QuitMessage();
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
         * @memberof lobby.QuitMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {lobby.QuitMessage} QuitMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        QuitMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a QuitMessage message.
         * @function verify
         * @memberof lobby.QuitMessage
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
         * @memberof lobby.QuitMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {lobby.QuitMessage} QuitMessage
         */
        QuitMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.lobby.QuitMessage)
                return object;
            let message = new $root.lobby.QuitMessage();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            if (object.lobbyId != null)
                message.lobbyId = String(object.lobbyId);
            return message;
        };

        /**
         * Creates a plain object from a QuitMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof lobby.QuitMessage
         * @static
         * @param {lobby.QuitMessage} message QuitMessage
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
         * @memberof lobby.QuitMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        QuitMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for QuitMessage
         * @function getTypeUrl
         * @memberof lobby.QuitMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        QuitMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/lobby.QuitMessage";
        };

        return QuitMessage;
    })();

    lobby.ReadyMessage = (function() {

        /**
         * Properties of a ReadyMessage.
         * @memberof lobby
         * @interface IReadyMessage
         * @property {string|null} [lobbyId] ReadyMessage lobbyId
         */

        /**
         * Constructs a new ReadyMessage.
         * @memberof lobby
         * @classdesc Represents a ReadyMessage.
         * @implements IReadyMessage
         * @constructor
         * @param {lobby.IReadyMessage=} [properties] Properties to set
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
         * @memberof lobby.ReadyMessage
         * @instance
         */
        ReadyMessage.prototype.lobbyId = "";

        /**
         * Creates a new ReadyMessage instance using the specified properties.
         * @function create
         * @memberof lobby.ReadyMessage
         * @static
         * @param {lobby.IReadyMessage=} [properties] Properties to set
         * @returns {lobby.ReadyMessage} ReadyMessage instance
         */
        ReadyMessage.create = function create(properties) {
            return new ReadyMessage(properties);
        };

        /**
         * Encodes the specified ReadyMessage message. Does not implicitly {@link lobby.ReadyMessage.verify|verify} messages.
         * @function encode
         * @memberof lobby.ReadyMessage
         * @static
         * @param {lobby.IReadyMessage} message ReadyMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        ReadyMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.lobbyId != null && Object.hasOwnProperty.call(message, "lobbyId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.lobbyId);
            return writer;
        };

        /**
         * Encodes the specified ReadyMessage message, length delimited. Does not implicitly {@link lobby.ReadyMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof lobby.ReadyMessage
         * @static
         * @param {lobby.IReadyMessage} message ReadyMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        ReadyMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReadyMessage message from the specified reader or buffer.
         * @function decode
         * @memberof lobby.ReadyMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {lobby.ReadyMessage} ReadyMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        ReadyMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.lobby.ReadyMessage();
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
         * @memberof lobby.ReadyMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {lobby.ReadyMessage} ReadyMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        ReadyMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReadyMessage message.
         * @function verify
         * @memberof lobby.ReadyMessage
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
         * @memberof lobby.ReadyMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {lobby.ReadyMessage} ReadyMessage
         */
        ReadyMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.lobby.ReadyMessage)
                return object;
            let message = new $root.lobby.ReadyMessage();
            if (object.lobbyId != null)
                message.lobbyId = String(object.lobbyId);
            return message;
        };

        /**
         * Creates a plain object from a ReadyMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof lobby.ReadyMessage
         * @static
         * @param {lobby.ReadyMessage} message ReadyMessage
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
         * @memberof lobby.ReadyMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReadyMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ReadyMessage
         * @function getTypeUrl
         * @memberof lobby.ReadyMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ReadyMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/lobby.ReadyMessage";
        };

        return ReadyMessage;
    })();

    lobby.ErrorMessage = (function() {

        /**
         * Properties of an ErrorMessage.
         * @memberof lobby
         * @interface IErrorMessage
         * @property {string|null} [message] ErrorMessage message
         */

        /**
         * Constructs a new ErrorMessage.
         * @memberof lobby
         * @classdesc Represents an ErrorMessage.
         * @implements IErrorMessage
         * @constructor
         * @param {lobby.IErrorMessage=} [properties] Properties to set
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
         * @memberof lobby.ErrorMessage
         * @instance
         */
        ErrorMessage.prototype.message = "";

        /**
         * Creates a new ErrorMessage instance using the specified properties.
         * @function create
         * @memberof lobby.ErrorMessage
         * @static
         * @param {lobby.IErrorMessage=} [properties] Properties to set
         * @returns {lobby.ErrorMessage} ErrorMessage instance
         */
        ErrorMessage.create = function create(properties) {
            return new ErrorMessage(properties);
        };

        /**
         * Encodes the specified ErrorMessage message. Does not implicitly {@link lobby.ErrorMessage.verify|verify} messages.
         * @function encode
         * @memberof lobby.ErrorMessage
         * @static
         * @param {lobby.IErrorMessage} message ErrorMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        ErrorMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.message);
            return writer;
        };

        /**
         * Encodes the specified ErrorMessage message, length delimited. Does not implicitly {@link lobby.ErrorMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof lobby.ErrorMessage
         * @static
         * @param {lobby.IErrorMessage} message ErrorMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        ErrorMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ErrorMessage message from the specified reader or buffer.
         * @function decode
         * @memberof lobby.ErrorMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {lobby.ErrorMessage} ErrorMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        ErrorMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.lobby.ErrorMessage();
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
         * @memberof lobby.ErrorMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {lobby.ErrorMessage} ErrorMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        ErrorMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ErrorMessage message.
         * @function verify
         * @memberof lobby.ErrorMessage
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
         * @memberof lobby.ErrorMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {lobby.ErrorMessage} ErrorMessage
         */
        ErrorMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.lobby.ErrorMessage)
                return object;
            let message = new $root.lobby.ErrorMessage();
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from an ErrorMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof lobby.ErrorMessage
         * @static
         * @param {lobby.ErrorMessage} message ErrorMessage
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
         * @memberof lobby.ErrorMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ErrorMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ErrorMessage
         * @function getTypeUrl
         * @memberof lobby.ErrorMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ErrorMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/lobby.ErrorMessage";
        };

        return ErrorMessage;
    })();

    lobby.StartMessage = (function() {

        /**
         * Properties of a StartMessage.
         * @memberof lobby
         * @interface IStartMessage
         * @property {string|null} [lobbyId] StartMessage lobbyId
         * @property {string|null} [gameId] StartMessage gameId
         * @property {string|null} [map] StartMessage map
         */

        /**
         * Constructs a new StartMessage.
         * @memberof lobby
         * @classdesc Represents a StartMessage.
         * @implements IStartMessage
         * @constructor
         * @param {lobby.IStartMessage=} [properties] Properties to set
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
         * @memberof lobby.StartMessage
         * @instance
         */
        StartMessage.prototype.lobbyId = "";

        /**
         * StartMessage gameId.
         * @member {string} gameId
         * @memberof lobby.StartMessage
         * @instance
         */
        StartMessage.prototype.gameId = "";

        /**
         * StartMessage map.
         * @member {string} map
         * @memberof lobby.StartMessage
         * @instance
         */
        StartMessage.prototype.map = "";

        /**
         * Creates a new StartMessage instance using the specified properties.
         * @function create
         * @memberof lobby.StartMessage
         * @static
         * @param {lobby.IStartMessage=} [properties] Properties to set
         * @returns {lobby.StartMessage} StartMessage instance
         */
        StartMessage.create = function create(properties) {
            return new StartMessage(properties);
        };

        /**
         * Encodes the specified StartMessage message. Does not implicitly {@link lobby.StartMessage.verify|verify} messages.
         * @function encode
         * @memberof lobby.StartMessage
         * @static
         * @param {lobby.IStartMessage} message StartMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
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
         * Encodes the specified StartMessage message, length delimited. Does not implicitly {@link lobby.StartMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof lobby.StartMessage
         * @static
         * @param {lobby.IStartMessage} message StartMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        StartMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StartMessage message from the specified reader or buffer.
         * @function decode
         * @memberof lobby.StartMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {lobby.StartMessage} StartMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        StartMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.lobby.StartMessage();
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
         * @memberof lobby.StartMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {lobby.StartMessage} StartMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        StartMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StartMessage message.
         * @function verify
         * @memberof lobby.StartMessage
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
         * @memberof lobby.StartMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {lobby.StartMessage} StartMessage
         */
        StartMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.lobby.StartMessage)
                return object;
            let message = new $root.lobby.StartMessage();
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
         * @memberof lobby.StartMessage
         * @static
         * @param {lobby.StartMessage} message StartMessage
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
         * @memberof lobby.StartMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StartMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for StartMessage
         * @function getTypeUrl
         * @memberof lobby.StartMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        StartMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/lobby.StartMessage";
        };

        return StartMessage;
    })();

    lobby.StartTournamentMessage = (function() {

        /**
         * Properties of a StartTournamentMessage.
         * @memberof lobby
         * @interface IStartTournamentMessage
         * @property {string|null} [lobbyId] StartTournamentMessage lobbyId
         * @property {string|null} [tournamentId] StartTournamentMessage tournamentId
         * @property {string|null} [map] StartTournamentMessage map
         */

        /**
         * Constructs a new StartTournamentMessage.
         * @memberof lobby
         * @classdesc Represents a StartTournamentMessage.
         * @implements IStartTournamentMessage
         * @constructor
         * @param {lobby.IStartTournamentMessage=} [properties] Properties to set
         */
        function StartTournamentMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StartTournamentMessage lobbyId.
         * @member {string} lobbyId
         * @memberof lobby.StartTournamentMessage
         * @instance
         */
        StartTournamentMessage.prototype.lobbyId = "";

        /**
         * StartTournamentMessage tournamentId.
         * @member {string} tournamentId
         * @memberof lobby.StartTournamentMessage
         * @instance
         */
        StartTournamentMessage.prototype.tournamentId = "";

        /**
         * StartTournamentMessage map.
         * @member {string} map
         * @memberof lobby.StartTournamentMessage
         * @instance
         */
        StartTournamentMessage.prototype.map = "";

        /**
         * Creates a new StartTournamentMessage instance using the specified properties.
         * @function create
         * @memberof lobby.StartTournamentMessage
         * @static
         * @param {lobby.IStartTournamentMessage=} [properties] Properties to set
         * @returns {lobby.StartTournamentMessage} StartTournamentMessage instance
         */
        StartTournamentMessage.create = function create(properties) {
            return new StartTournamentMessage(properties);
        };

        /**
         * Encodes the specified StartTournamentMessage message. Does not implicitly {@link lobby.StartTournamentMessage.verify|verify} messages.
         * @function encode
         * @memberof lobby.StartTournamentMessage
         * @static
         * @param {lobby.IStartTournamentMessage} message StartTournamentMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        StartTournamentMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.lobbyId != null && Object.hasOwnProperty.call(message, "lobbyId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.lobbyId);
            if (message.tournamentId != null && Object.hasOwnProperty.call(message, "tournamentId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.tournamentId);
            if (message.map != null && Object.hasOwnProperty.call(message, "map"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.map);
            return writer;
        };

        /**
         * Encodes the specified StartTournamentMessage message, length delimited. Does not implicitly {@link lobby.StartTournamentMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof lobby.StartTournamentMessage
         * @static
         * @param {lobby.IStartTournamentMessage} message StartTournamentMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        StartTournamentMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StartTournamentMessage message from the specified reader or buffer.
         * @function decode
         * @memberof lobby.StartTournamentMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {lobby.StartTournamentMessage} StartTournamentMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        StartTournamentMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.lobby.StartTournamentMessage();
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
                        message.tournamentId = reader.string();
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
         * Decodes a StartTournamentMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof lobby.StartTournamentMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {lobby.StartTournamentMessage} StartTournamentMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        StartTournamentMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StartTournamentMessage message.
         * @function verify
         * @memberof lobby.StartTournamentMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StartTournamentMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.lobbyId != null && message.hasOwnProperty("lobbyId"))
                if (!$util.isString(message.lobbyId))
                    return "lobbyId: string expected";
            if (message.tournamentId != null && message.hasOwnProperty("tournamentId"))
                if (!$util.isString(message.tournamentId))
                    return "tournamentId: string expected";
            if (message.map != null && message.hasOwnProperty("map"))
                if (!$util.isString(message.map))
                    return "map: string expected";
            return null;
        };

        /**
         * Creates a StartTournamentMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof lobby.StartTournamentMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {lobby.StartTournamentMessage} StartTournamentMessage
         */
        StartTournamentMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.lobby.StartTournamentMessage)
                return object;
            let message = new $root.lobby.StartTournamentMessage();
            if (object.lobbyId != null)
                message.lobbyId = String(object.lobbyId);
            if (object.tournamentId != null)
                message.tournamentId = String(object.tournamentId);
            if (object.map != null)
                message.map = String(object.map);
            return message;
        };

        /**
         * Creates a plain object from a StartTournamentMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof lobby.StartTournamentMessage
         * @static
         * @param {lobby.StartTournamentMessage} message StartTournamentMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StartTournamentMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.lobbyId = "";
                object.tournamentId = "";
                object.map = "";
            }
            if (message.lobbyId != null && message.hasOwnProperty("lobbyId"))
                object.lobbyId = message.lobbyId;
            if (message.tournamentId != null && message.hasOwnProperty("tournamentId"))
                object.tournamentId = message.tournamentId;
            if (message.map != null && message.hasOwnProperty("map"))
                object.map = message.map;
            return object;
        };

        /**
         * Converts this StartTournamentMessage to JSON.
         * @function toJSON
         * @memberof lobby.StartTournamentMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StartTournamentMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for StartTournamentMessage
         * @function getTypeUrl
         * @memberof lobby.StartTournamentMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        StartTournamentMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/lobby.StartTournamentMessage";
        };

        return StartTournamentMessage;
    })();

    lobby.Player = (function() {

        /**
         * Properties of a Player.
         * @memberof lobby
         * @interface IPlayer
         * @property {string|null} [uuid] Player uuid
         * @property {boolean|null} [ready] Player ready
         */

        /**
         * Constructs a new Player.
         * @memberof lobby
         * @classdesc Represents a Player.
         * @implements IPlayer
         * @constructor
         * @param {lobby.IPlayer=} [properties] Properties to set
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
         * @memberof lobby.Player
         * @instance
         */
        Player.prototype.uuid = "";

        /**
         * Player ready.
         * @member {boolean} ready
         * @memberof lobby.Player
         * @instance
         */
        Player.prototype.ready = false;

        /**
         * Creates a new Player instance using the specified properties.
         * @function create
         * @memberof lobby.Player
         * @static
         * @param {lobby.IPlayer=} [properties] Properties to set
         * @returns {lobby.Player} Player instance
         */
        Player.create = function create(properties) {
            return new Player(properties);
        };

        /**
         * Encodes the specified Player message. Does not implicitly {@link lobby.Player.verify|verify} messages.
         * @function encode
         * @memberof lobby.Player
         * @static
         * @param {lobby.IPlayer} message Player message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
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
         * Encodes the specified Player message, length delimited. Does not implicitly {@link lobby.Player.verify|verify} messages.
         * @function encodeDelimited
         * @memberof lobby.Player
         * @static
         * @param {lobby.IPlayer} message Player message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        Player.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Player message from the specified reader or buffer.
         * @function decode
         * @memberof lobby.Player
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {lobby.Player} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        Player.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.lobby.Player();
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
         * @memberof lobby.Player
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {lobby.Player} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        Player.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Player message.
         * @function verify
         * @memberof lobby.Player
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
         * @memberof lobby.Player
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {lobby.Player} Player
         */
        Player.fromObject = function fromObject(object) {
            if (object instanceof $root.lobby.Player)
                return object;
            let message = new $root.lobby.Player();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            if (object.ready != null)
                message.ready = Boolean(object.ready);
            return message;
        };

        /**
         * Creates a plain object from a Player message. Also converts values to other types if specified.
         * @function toObject
         * @memberof lobby.Player
         * @static
         * @param {lobby.Player} message Player
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
         * @memberof lobby.Player
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Player.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Player
         * @function getTypeUrl
         * @memberof lobby.Player
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Player.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/lobby.Player";
        };

        return Player;
    })();

    lobby.UpdateMessage = (function() {

        /**
         * Properties of an UpdateMessage.
         * @memberof lobby
         * @interface IUpdateMessage
         * @property {string|null} [lobbyId] UpdateMessage lobbyId
         * @property {Array.<lobby.IPlayer>|null} [players] UpdateMessage players
         * @property {string|null} [status] UpdateMessage status
         * @property {string|null} [mode] UpdateMessage mode
         */

        /**
         * Constructs a new UpdateMessage.
         * @memberof lobby
         * @classdesc Represents an UpdateMessage.
         * @implements IUpdateMessage
         * @constructor
         * @param {lobby.IUpdateMessage=} [properties] Properties to set
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
         * @memberof lobby.UpdateMessage
         * @instance
         */
        UpdateMessage.prototype.lobbyId = "";

        /**
         * UpdateMessage players.
         * @member {Array.<lobby.IPlayer>} players
         * @memberof lobby.UpdateMessage
         * @instance
         */
        UpdateMessage.prototype.players = $util.emptyArray;

        /**
         * UpdateMessage status.
         * @member {string} status
         * @memberof lobby.UpdateMessage
         * @instance
         */
        UpdateMessage.prototype.status = "";

        /**
         * UpdateMessage mode.
         * @member {string} mode
         * @memberof lobby.UpdateMessage
         * @instance
         */
        UpdateMessage.prototype.mode = "";

        /**
         * Creates a new UpdateMessage instance using the specified properties.
         * @function create
         * @memberof lobby.UpdateMessage
         * @static
         * @param {lobby.IUpdateMessage=} [properties] Properties to set
         * @returns {lobby.UpdateMessage} UpdateMessage instance
         */
        UpdateMessage.create = function create(properties) {
            return new UpdateMessage(properties);
        };

        /**
         * Encodes the specified UpdateMessage message. Does not implicitly {@link lobby.UpdateMessage.verify|verify} messages.
         * @function encode
         * @memberof lobby.UpdateMessage
         * @static
         * @param {lobby.IUpdateMessage} message UpdateMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        UpdateMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.lobbyId != null && Object.hasOwnProperty.call(message, "lobbyId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.lobbyId);
            if (message.players != null && message.players.length)
                for (let i = 0; i < message.players.length; ++i)
                    $root.lobby.Player.encode(message.players[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.status);
            if (message.mode != null && Object.hasOwnProperty.call(message, "mode"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.mode);
            return writer;
        };

        /**
         * Encodes the specified UpdateMessage message, length delimited. Does not implicitly {@link lobby.UpdateMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof lobby.UpdateMessage
         * @static
         * @param {lobby.IUpdateMessage} message UpdateMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        UpdateMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an UpdateMessage message from the specified reader or buffer.
         * @function decode
         * @memberof lobby.UpdateMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {lobby.UpdateMessage} UpdateMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        UpdateMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.lobby.UpdateMessage();
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
                        message.players.push($root.lobby.Player.decode(reader, reader.uint32()));
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
         * @memberof lobby.UpdateMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {lobby.UpdateMessage} UpdateMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        UpdateMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UpdateMessage message.
         * @function verify
         * @memberof lobby.UpdateMessage
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
                    let error = $root.lobby.Player.verify(message.players[i]);
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
         * @memberof lobby.UpdateMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {lobby.UpdateMessage} UpdateMessage
         */
        UpdateMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.lobby.UpdateMessage)
                return object;
            let message = new $root.lobby.UpdateMessage();
            if (object.lobbyId != null)
                message.lobbyId = String(object.lobbyId);
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".lobby.UpdateMessage.players: array expected");
                message.players = [];
                for (let i = 0; i < object.players.length; ++i) {
                    if (typeof object.players[i] !== "object")
                        throw TypeError(".lobby.UpdateMessage.players: object expected");
                    message.players[i] = $root.lobby.Player.fromObject(object.players[i]);
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
         * @memberof lobby.UpdateMessage
         * @static
         * @param {lobby.UpdateMessage} message UpdateMessage
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
                    object.players[j] = $root.lobby.Player.toObject(message.players[j], options);
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
         * @memberof lobby.UpdateMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UpdateMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UpdateMessage
         * @function getTypeUrl
         * @memberof lobby.UpdateMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UpdateMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/lobby.UpdateMessage";
        };

        return UpdateMessage;
    })();

    lobby.ClientMessage = (function() {

        /**
         * Properties of a ClientMessage.
         * @memberof lobby
         * @interface IClientMessage
         * @property {lobby.IQuitMessage|null} [quit] ClientMessage quit
         * @property {lobby.IReadyMessage|null} [ready] ClientMessage ready
         */

        /**
         * Constructs a new ClientMessage.
         * @memberof lobby
         * @classdesc Represents a ClientMessage.
         * @implements IClientMessage
         * @constructor
         * @param {lobby.IClientMessage=} [properties] Properties to set
         */
        function ClientMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ClientMessage quit.
         * @member {lobby.IQuitMessage|null|undefined} quit
         * @memberof lobby.ClientMessage
         * @instance
         */
        ClientMessage.prototype.quit = null;

        /**
         * ClientMessage ready.
         * @member {lobby.IReadyMessage|null|undefined} ready
         * @memberof lobby.ClientMessage
         * @instance
         */
        ClientMessage.prototype.ready = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * ClientMessage payload.
         * @member {"quit"|"ready"|undefined} payload
         * @memberof lobby.ClientMessage
         * @instance
         */
        Object.defineProperty(ClientMessage.prototype, "payload", {
            get: $util.oneOfGetter($oneOfFields = ["quit", "ready"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new ClientMessage instance using the specified properties.
         * @function create
         * @memberof lobby.ClientMessage
         * @static
         * @param {lobby.IClientMessage=} [properties] Properties to set
         * @returns {lobby.ClientMessage} ClientMessage instance
         */
        ClientMessage.create = function create(properties) {
            return new ClientMessage(properties);
        };

        /**
         * Encodes the specified ClientMessage message. Does not implicitly {@link lobby.ClientMessage.verify|verify} messages.
         * @function encode
         * @memberof lobby.ClientMessage
         * @static
         * @param {lobby.IClientMessage} message ClientMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        ClientMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.quit != null && Object.hasOwnProperty.call(message, "quit"))
                $root.lobby.QuitMessage.encode(message.quit, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.ready != null && Object.hasOwnProperty.call(message, "ready"))
                $root.lobby.ReadyMessage.encode(message.ready, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ClientMessage message, length delimited. Does not implicitly {@link lobby.ClientMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof lobby.ClientMessage
         * @static
         * @param {lobby.IClientMessage} message ClientMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        ClientMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ClientMessage message from the specified reader or buffer.
         * @function decode
         * @memberof lobby.ClientMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {lobby.ClientMessage} ClientMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        ClientMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.lobby.ClientMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.quit = $root.lobby.QuitMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.ready = $root.lobby.ReadyMessage.decode(reader, reader.uint32());
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
         * @memberof lobby.ClientMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {lobby.ClientMessage} ClientMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        ClientMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ClientMessage message.
         * @function verify
         * @memberof lobby.ClientMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ClientMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.quit != null && message.hasOwnProperty("quit")) {
                properties.payload = 1;
                {
                    let error = $root.lobby.QuitMessage.verify(message.quit);
                    if (error)
                        return "quit." + error;
                }
            }
            if (message.ready != null && message.hasOwnProperty("ready")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.lobby.ReadyMessage.verify(message.ready);
                    if (error)
                        return "ready." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ClientMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof lobby.ClientMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {lobby.ClientMessage} ClientMessage
         */
        ClientMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.lobby.ClientMessage)
                return object;
            let message = new $root.lobby.ClientMessage();
            if (object.quit != null) {
                if (typeof object.quit !== "object")
                    throw TypeError(".lobby.ClientMessage.quit: object expected");
                message.quit = $root.lobby.QuitMessage.fromObject(object.quit);
            }
            if (object.ready != null) {
                if (typeof object.ready !== "object")
                    throw TypeError(".lobby.ClientMessage.ready: object expected");
                message.ready = $root.lobby.ReadyMessage.fromObject(object.ready);
            }
            return message;
        };

        /**
         * Creates a plain object from a ClientMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof lobby.ClientMessage
         * @static
         * @param {lobby.ClientMessage} message ClientMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClientMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.quit != null && message.hasOwnProperty("quit")) {
                object.quit = $root.lobby.QuitMessage.toObject(message.quit, options);
                if (options.oneofs)
                    object.payload = "quit";
            }
            if (message.ready != null && message.hasOwnProperty("ready")) {
                object.ready = $root.lobby.ReadyMessage.toObject(message.ready, options);
                if (options.oneofs)
                    object.payload = "ready";
            }
            return object;
        };

        /**
         * Converts this ClientMessage to JSON.
         * @function toJSON
         * @memberof lobby.ClientMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClientMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ClientMessage
         * @function getTypeUrl
         * @memberof lobby.ClientMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ClientMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/lobby.ClientMessage";
        };

        return ClientMessage;
    })();

    lobby.ServerMessage = (function() {

        /**
         * Properties of a ServerMessage.
         * @memberof lobby
         * @interface IServerMessage
         * @property {lobby.IStartMessage|null} [start] ServerMessage start
         * @property {lobby.IUpdateMessage|null} [update] ServerMessage update
         * @property {lobby.IErrorMessage|null} [error] ServerMessage error
         * @property {lobby.IStartTournamentMessage|null} [startTournament] ServerMessage startTournament
         */

        /**
         * Constructs a new ServerMessage.
         * @memberof lobby
         * @classdesc Represents a ServerMessage.
         * @implements IServerMessage
         * @constructor
         * @param {lobby.IServerMessage=} [properties] Properties to set
         */
        function ServerMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServerMessage start.
         * @member {lobby.IStartMessage|null|undefined} start
         * @memberof lobby.ServerMessage
         * @instance
         */
        ServerMessage.prototype.start = null;

        /**
         * ServerMessage update.
         * @member {lobby.IUpdateMessage|null|undefined} update
         * @memberof lobby.ServerMessage
         * @instance
         */
        ServerMessage.prototype.update = null;

        /**
         * ServerMessage error.
         * @member {lobby.IErrorMessage|null|undefined} error
         * @memberof lobby.ServerMessage
         * @instance
         */
        ServerMessage.prototype.error = null;

        /**
         * ServerMessage startTournament.
         * @member {lobby.IStartTournamentMessage|null|undefined} startTournament
         * @memberof lobby.ServerMessage
         * @instance
         */
        ServerMessage.prototype.startTournament = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * ServerMessage payload.
         * @member {"start"|"update"|"error"|"startTournament"|undefined} payload
         * @memberof lobby.ServerMessage
         * @instance
         */
        Object.defineProperty(ServerMessage.prototype, "payload", {
            get: $util.oneOfGetter($oneOfFields = ["start", "update", "error", "startTournament"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new ServerMessage instance using the specified properties.
         * @function create
         * @memberof lobby.ServerMessage
         * @static
         * @param {lobby.IServerMessage=} [properties] Properties to set
         * @returns {lobby.ServerMessage} ServerMessage instance
         */
        ServerMessage.create = function create(properties) {
            return new ServerMessage(properties);
        };

        /**
         * Encodes the specified ServerMessage message. Does not implicitly {@link lobby.ServerMessage.verify|verify} messages.
         * @function encode
         * @memberof lobby.ServerMessage
         * @static
         * @param {lobby.IServerMessage} message ServerMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        ServerMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.start != null && Object.hasOwnProperty.call(message, "start"))
                $root.lobby.StartMessage.encode(message.start, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.update != null && Object.hasOwnProperty.call(message, "update"))
                $root.lobby.UpdateMessage.encode(message.update, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.lobby.ErrorMessage.encode(message.error, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.startTournament != null && Object.hasOwnProperty.call(message, "startTournament"))
                $root.lobby.StartTournamentMessage.encode(message.startTournament, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ServerMessage message, length delimited. Does not implicitly {@link lobby.ServerMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof lobby.ServerMessage
         * @static
         * @param {lobby.IServerMessage} message ServerMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        ServerMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ServerMessage message from the specified reader or buffer.
         * @function decode
         * @memberof lobby.ServerMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {lobby.ServerMessage} ServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        ServerMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.lobby.ServerMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.start = $root.lobby.StartMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.update = $root.lobby.UpdateMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.error = $root.lobby.ErrorMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.startTournament = $root.lobby.StartTournamentMessage.decode(reader, reader.uint32());
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
         * @memberof lobby.ServerMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {lobby.ServerMessage} ServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        ServerMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServerMessage message.
         * @function verify
         * @memberof lobby.ServerMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServerMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.start != null && message.hasOwnProperty("start")) {
                properties.payload = 1;
                {
                    let error = $root.lobby.StartMessage.verify(message.start);
                    if (error)
                        return "start." + error;
                }
            }
            if (message.update != null && message.hasOwnProperty("update")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.lobby.UpdateMessage.verify(message.update);
                    if (error)
                        return "update." + error;
                }
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.lobby.ErrorMessage.verify(message.error);
                    if (error)
                        return "error." + error;
                }
            }
            if (message.startTournament != null && message.hasOwnProperty("startTournament")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.lobby.StartTournamentMessage.verify(message.startTournament);
                    if (error)
                        return "startTournament." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ServerMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof lobby.ServerMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {lobby.ServerMessage} ServerMessage
         */
        ServerMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.lobby.ServerMessage)
                return object;
            let message = new $root.lobby.ServerMessage();
            if (object.start != null) {
                if (typeof object.start !== "object")
                    throw TypeError(".lobby.ServerMessage.start: object expected");
                message.start = $root.lobby.StartMessage.fromObject(object.start);
            }
            if (object.update != null) {
                if (typeof object.update !== "object")
                    throw TypeError(".lobby.ServerMessage.update: object expected");
                message.update = $root.lobby.UpdateMessage.fromObject(object.update);
            }
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".lobby.ServerMessage.error: object expected");
                message.error = $root.lobby.ErrorMessage.fromObject(object.error);
            }
            if (object.startTournament != null) {
                if (typeof object.startTournament !== "object")
                    throw TypeError(".lobby.ServerMessage.startTournament: object expected");
                message.startTournament = $root.lobby.StartTournamentMessage.fromObject(object.startTournament);
            }
            return message;
        };

        /**
         * Creates a plain object from a ServerMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof lobby.ServerMessage
         * @static
         * @param {lobby.ServerMessage} message ServerMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServerMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.start != null && message.hasOwnProperty("start")) {
                object.start = $root.lobby.StartMessage.toObject(message.start, options);
                if (options.oneofs)
                    object.payload = "start";
            }
            if (message.update != null && message.hasOwnProperty("update")) {
                object.update = $root.lobby.UpdateMessage.toObject(message.update, options);
                if (options.oneofs)
                    object.payload = "update";
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                object.error = $root.lobby.ErrorMessage.toObject(message.error, options);
                if (options.oneofs)
                    object.payload = "error";
            }
            if (message.startTournament != null && message.hasOwnProperty("startTournament")) {
                object.startTournament = $root.lobby.StartTournamentMessage.toObject(message.startTournament, options);
                if (options.oneofs)
                    object.payload = "startTournament";
            }
            return object;
        };

        /**
         * Converts this ServerMessage to JSON.
         * @function toJSON
         * @memberof lobby.ServerMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServerMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServerMessage
         * @function getTypeUrl
         * @memberof lobby.ServerMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServerMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/lobby.ServerMessage";
        };

        return ServerMessage;
    })();

    lobby.UserStatusPublish = (function() {

        /**
         * Properties of a UserStatusPublish.
         * @memberof lobby
         * @interface IUserStatusPublish
         * @property {string|null} [uuid] UserStatusPublish uuid
         * @property {string|null} [lobbyId] UserStatusPublish lobbyId
         * @property {string|null} [status] UserStatusPublish status
         */

        /**
         * Constructs a new UserStatusPublish.
         * @memberof lobby
         * @classdesc Represents a UserStatusPublish.
         * @implements IUserStatusPublish
         * @constructor
         * @param {lobby.IUserStatusPublish=} [properties] Properties to set
         */
        function UserStatusPublish(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserStatusPublish uuid.
         * @member {string} uuid
         * @memberof lobby.UserStatusPublish
         * @instance
         */
        UserStatusPublish.prototype.uuid = "";

        /**
         * UserStatusPublish lobbyId.
         * @member {string} lobbyId
         * @memberof lobby.UserStatusPublish
         * @instance
         */
        UserStatusPublish.prototype.lobbyId = "";

        /**
         * UserStatusPublish status.
         * @member {string} status
         * @memberof lobby.UserStatusPublish
         * @instance
         */
        UserStatusPublish.prototype.status = "";

        /**
         * Creates a new UserStatusPublish instance using the specified properties.
         * @function create
         * @memberof lobby.UserStatusPublish
         * @static
         * @param {lobby.IUserStatusPublish=} [properties] Properties to set
         * @returns {lobby.UserStatusPublish} UserStatusPublish instance
         */
        UserStatusPublish.create = function create(properties) {
            return new UserStatusPublish(properties);
        };

        /**
         * Encodes the specified UserStatusPublish message. Does not implicitly {@link lobby.UserStatusPublish.verify|verify} messages.
         * @function encode
         * @memberof lobby.UserStatusPublish
         * @static
         * @param {lobby.IUserStatusPublish} message UserStatusPublish message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        UserStatusPublish.encode = function encode(message, writer) {
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
         * Encodes the specified UserStatusPublish message, length delimited. Does not implicitly {@link lobby.UserStatusPublish.verify|verify} messages.
         * @function encodeDelimited
         * @memberof lobby.UserStatusPublish
         * @static
         * @param {lobby.IUserStatusPublish} message UserStatusPublish message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        UserStatusPublish.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserStatusPublish message from the specified reader or buffer.
         * @function decode
         * @memberof lobby.UserStatusPublish
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {lobby.UserStatusPublish} UserStatusPublish
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        UserStatusPublish.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.lobby.UserStatusPublish();
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
         * Decodes a UserStatusPublish message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof lobby.UserStatusPublish
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {lobby.UserStatusPublish} UserStatusPublish
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        UserStatusPublish.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserStatusPublish message.
         * @function verify
         * @memberof lobby.UserStatusPublish
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserStatusPublish.verify = function verify(message) {
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
         * Creates a UserStatusPublish message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof lobby.UserStatusPublish
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {lobby.UserStatusPublish} UserStatusPublish
         */
        UserStatusPublish.fromObject = function fromObject(object) {
            if (object instanceof $root.lobby.UserStatusPublish)
                return object;
            let message = new $root.lobby.UserStatusPublish();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            if (object.lobbyId != null)
                message.lobbyId = String(object.lobbyId);
            if (object.status != null)
                message.status = String(object.status);
            return message;
        };

        /**
         * Creates a plain object from a UserStatusPublish message. Also converts values to other types if specified.
         * @function toObject
         * @memberof lobby.UserStatusPublish
         * @static
         * @param {lobby.UserStatusPublish} message UserStatusPublish
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserStatusPublish.toObject = function toObject(message, options) {
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
         * Converts this UserStatusPublish to JSON.
         * @function toJSON
         * @memberof lobby.UserStatusPublish
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserStatusPublish.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserStatusPublish
         * @function getTypeUrl
         * @memberof lobby.UserStatusPublish
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserStatusPublish.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/lobby.UserStatusPublish";
        };

        return UserStatusPublish;
    })();

    lobby.MatchCreateRequest = (function() {

        /**
         * Properties of a MatchCreateRequest.
         * @memberof lobby
         * @interface IMatchCreateRequest
         * @property {Array.<string>|null} [players] MatchCreateRequest players
         */

        /**
         * Constructs a new MatchCreateRequest.
         * @memberof lobby
         * @classdesc Represents a MatchCreateRequest.
         * @implements IMatchCreateRequest
         * @constructor
         * @param {lobby.IMatchCreateRequest=} [properties] Properties to set
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
         * @memberof lobby.MatchCreateRequest
         * @instance
         */
        MatchCreateRequest.prototype.players = $util.emptyArray;

        /**
         * Creates a new MatchCreateRequest instance using the specified properties.
         * @function create
         * @memberof lobby.MatchCreateRequest
         * @static
         * @param {lobby.IMatchCreateRequest=} [properties] Properties to set
         * @returns {lobby.MatchCreateRequest} MatchCreateRequest instance
         */
        MatchCreateRequest.create = function create(properties) {
            return new MatchCreateRequest(properties);
        };

        /**
         * Encodes the specified MatchCreateRequest message. Does not implicitly {@link lobby.MatchCreateRequest.verify|verify} messages.
         * @function encode
         * @memberof lobby.MatchCreateRequest
         * @static
         * @param {lobby.IMatchCreateRequest} message MatchCreateRequest message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
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
         * Encodes the specified MatchCreateRequest message, length delimited. Does not implicitly {@link lobby.MatchCreateRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof lobby.MatchCreateRequest
         * @static
         * @param {lobby.IMatchCreateRequest} message MatchCreateRequest message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchCreateRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchCreateRequest message from the specified reader or buffer.
         * @function decode
         * @memberof lobby.MatchCreateRequest
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {lobby.MatchCreateRequest} MatchCreateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        MatchCreateRequest.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.lobby.MatchCreateRequest();
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
         * @memberof lobby.MatchCreateRequest
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {lobby.MatchCreateRequest} MatchCreateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        MatchCreateRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MatchCreateRequest message.
         * @function verify
         * @memberof lobby.MatchCreateRequest
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
         * @memberof lobby.MatchCreateRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {lobby.MatchCreateRequest} MatchCreateRequest
         */
        MatchCreateRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.lobby.MatchCreateRequest)
                return object;
            let message = new $root.lobby.MatchCreateRequest();
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".lobby.MatchCreateRequest.players: array expected");
                message.players = [];
                for (let i = 0; i < object.players.length; ++i)
                    message.players[i] = String(object.players[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a MatchCreateRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof lobby.MatchCreateRequest
         * @static
         * @param {lobby.MatchCreateRequest} message MatchCreateRequest
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
         * @memberof lobby.MatchCreateRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchCreateRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MatchCreateRequest
         * @function getTypeUrl
         * @memberof lobby.MatchCreateRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MatchCreateRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/lobby.MatchCreateRequest";
        };

        return MatchCreateRequest;
    })();

    lobby.MatchCreateResponse = (function() {

        /**
         * Properties of a MatchCreateResponse.
         * @memberof lobby
         * @interface IMatchCreateResponse
         * @property {string|null} [gameId] MatchCreateResponse gameId
         */

        /**
         * Constructs a new MatchCreateResponse.
         * @memberof lobby
         * @classdesc Represents a MatchCreateResponse.
         * @implements IMatchCreateResponse
         * @constructor
         * @param {lobby.IMatchCreateResponse=} [properties] Properties to set
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
         * @memberof lobby.MatchCreateResponse
         * @instance
         */
        MatchCreateResponse.prototype.gameId = "";

        /**
         * Creates a new MatchCreateResponse instance using the specified properties.
         * @function create
         * @memberof lobby.MatchCreateResponse
         * @static
         * @param {lobby.IMatchCreateResponse=} [properties] Properties to set
         * @returns {lobby.MatchCreateResponse} MatchCreateResponse instance
         */
        MatchCreateResponse.create = function create(properties) {
            return new MatchCreateResponse(properties);
        };

        /**
         * Encodes the specified MatchCreateResponse message. Does not implicitly {@link lobby.MatchCreateResponse.verify|verify} messages.
         * @function encode
         * @memberof lobby.MatchCreateResponse
         * @static
         * @param {lobby.IMatchCreateResponse} message MatchCreateResponse message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchCreateResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.gameId);
            return writer;
        };

        /**
         * Encodes the specified MatchCreateResponse message, length delimited. Does not implicitly {@link lobby.MatchCreateResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof lobby.MatchCreateResponse
         * @static
         * @param {lobby.IMatchCreateResponse} message MatchCreateResponse message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchCreateResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchCreateResponse message from the specified reader or buffer.
         * @function decode
         * @memberof lobby.MatchCreateResponse
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {lobby.MatchCreateResponse} MatchCreateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        MatchCreateResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.lobby.MatchCreateResponse();
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
         * @memberof lobby.MatchCreateResponse
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {lobby.MatchCreateResponse} MatchCreateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        MatchCreateResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MatchCreateResponse message.
         * @function verify
         * @memberof lobby.MatchCreateResponse
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
         * @memberof lobby.MatchCreateResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {lobby.MatchCreateResponse} MatchCreateResponse
         */
        MatchCreateResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.lobby.MatchCreateResponse)
                return object;
            let message = new $root.lobby.MatchCreateResponse();
            if (object.gameId != null)
                message.gameId = String(object.gameId);
            return message;
        };

        /**
         * Creates a plain object from a MatchCreateResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof lobby.MatchCreateResponse
         * @static
         * @param {lobby.MatchCreateResponse} message MatchCreateResponse
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
         * @memberof lobby.MatchCreateResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchCreateResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MatchCreateResponse
         * @function getTypeUrl
         * @memberof lobby.MatchCreateResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MatchCreateResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/lobby.MatchCreateResponse";
        };

        return MatchCreateResponse;
    })();

    return lobby;
})();

export const notif = $root.notif = (() => {

    /**
     * Namespace notif.
     * @exports notif
     * @namespace
     */
    const notif = {};

    notif.FriendUpdate = (function() {

        /**
         * Properties of a FriendUpdate.
         * @memberof notif
         * @interface IFriendUpdate
         * @property {string|null} [sender] FriendUpdate sender
         */

        /**
         * Constructs a new FriendUpdate.
         * @memberof notif
         * @classdesc Represents a FriendUpdate.
         * @implements IFriendUpdate
         * @constructor
         * @param {notif.IFriendUpdate=} [properties] Properties to set
         */
        function FriendUpdate(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FriendUpdate sender.
         * @member {string} sender
         * @memberof notif.FriendUpdate
         * @instance
         */
        FriendUpdate.prototype.sender = "";

        /**
         * Creates a new FriendUpdate instance using the specified properties.
         * @function create
         * @memberof notif.FriendUpdate
         * @static
         * @param {notif.IFriendUpdate=} [properties] Properties to set
         * @returns {notif.FriendUpdate} FriendUpdate instance
         */
        FriendUpdate.create = function create(properties) {
            return new FriendUpdate(properties);
        };

        /**
         * Encodes the specified FriendUpdate message. Does not implicitly {@link notif.FriendUpdate.verify|verify} messages.
         * @function encode
         * @memberof notif.FriendUpdate
         * @static
         * @param {notif.IFriendUpdate} message FriendUpdate message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        FriendUpdate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.sender != null && Object.hasOwnProperty.call(message, "sender"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.sender);
            return writer;
        };

        /**
         * Encodes the specified FriendUpdate message, length delimited. Does not implicitly {@link notif.FriendUpdate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof notif.FriendUpdate
         * @static
         * @param {notif.IFriendUpdate} message FriendUpdate message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        FriendUpdate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a FriendUpdate message from the specified reader or buffer.
         * @function decode
         * @memberof notif.FriendUpdate
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {notif.FriendUpdate} FriendUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        FriendUpdate.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.notif.FriendUpdate();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.sender = reader.string();
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
         * Decodes a FriendUpdate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof notif.FriendUpdate
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {notif.FriendUpdate} FriendUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        FriendUpdate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a FriendUpdate message.
         * @function verify
         * @memberof notif.FriendUpdate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FriendUpdate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.sender != null && message.hasOwnProperty("sender"))
                if (!$util.isString(message.sender))
                    return "sender: string expected";
            return null;
        };

        /**
         * Creates a FriendUpdate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof notif.FriendUpdate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {notif.FriendUpdate} FriendUpdate
         */
        FriendUpdate.fromObject = function fromObject(object) {
            if (object instanceof $root.notif.FriendUpdate)
                return object;
            let message = new $root.notif.FriendUpdate();
            if (object.sender != null)
                message.sender = String(object.sender);
            return message;
        };

        /**
         * Creates a plain object from a FriendUpdate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof notif.FriendUpdate
         * @static
         * @param {notif.FriendUpdate} message FriendUpdate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FriendUpdate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.sender = "";
            if (message.sender != null && message.hasOwnProperty("sender"))
                object.sender = message.sender;
            return object;
        };

        /**
         * Converts this FriendUpdate to JSON.
         * @function toJSON
         * @memberof notif.FriendUpdate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FriendUpdate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for FriendUpdate
         * @function getTypeUrl
         * @memberof notif.FriendUpdate
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        FriendUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/notif.FriendUpdate";
        };

        return FriendUpdate;
    })();

    notif.GameInvite = (function() {

        /**
         * Properties of a GameInvite.
         * @memberof notif
         * @interface IGameInvite
         * @property {string|null} [sender] GameInvite sender
         * @property {string|null} [lobbyid] GameInvite lobbyid
         */

        /**
         * Constructs a new GameInvite.
         * @memberof notif
         * @classdesc Represents a GameInvite.
         * @implements IGameInvite
         * @constructor
         * @param {notif.IGameInvite=} [properties] Properties to set
         */
        function GameInvite(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameInvite sender.
         * @member {string} sender
         * @memberof notif.GameInvite
         * @instance
         */
        GameInvite.prototype.sender = "";

        /**
         * GameInvite lobbyid.
         * @member {string} lobbyid
         * @memberof notif.GameInvite
         * @instance
         */
        GameInvite.prototype.lobbyid = "";

        /**
         * Creates a new GameInvite instance using the specified properties.
         * @function create
         * @memberof notif.GameInvite
         * @static
         * @param {notif.IGameInvite=} [properties] Properties to set
         * @returns {notif.GameInvite} GameInvite instance
         */
        GameInvite.create = function create(properties) {
            return new GameInvite(properties);
        };

        /**
         * Encodes the specified GameInvite message. Does not implicitly {@link notif.GameInvite.verify|verify} messages.
         * @function encode
         * @memberof notif.GameInvite
         * @static
         * @param {notif.IGameInvite} message GameInvite message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        GameInvite.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.sender != null && Object.hasOwnProperty.call(message, "sender"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.sender);
            if (message.lobbyid != null && Object.hasOwnProperty.call(message, "lobbyid"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.lobbyid);
            return writer;
        };

        /**
         * Encodes the specified GameInvite message, length delimited. Does not implicitly {@link notif.GameInvite.verify|verify} messages.
         * @function encodeDelimited
         * @memberof notif.GameInvite
         * @static
         * @param {notif.IGameInvite} message GameInvite message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        GameInvite.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameInvite message from the specified reader or buffer.
         * @function decode
         * @memberof notif.GameInvite
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {notif.GameInvite} GameInvite
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        GameInvite.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.notif.GameInvite();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.sender = reader.string();
                        break;
                    }
                case 2: {
                        message.lobbyid = reader.string();
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
         * Decodes a GameInvite message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof notif.GameInvite
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {notif.GameInvite} GameInvite
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        GameInvite.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameInvite message.
         * @function verify
         * @memberof notif.GameInvite
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameInvite.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.sender != null && message.hasOwnProperty("sender"))
                if (!$util.isString(message.sender))
                    return "sender: string expected";
            if (message.lobbyid != null && message.hasOwnProperty("lobbyid"))
                if (!$util.isString(message.lobbyid))
                    return "lobbyid: string expected";
            return null;
        };

        /**
         * Creates a GameInvite message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof notif.GameInvite
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {notif.GameInvite} GameInvite
         */
        GameInvite.fromObject = function fromObject(object) {
            if (object instanceof $root.notif.GameInvite)
                return object;
            let message = new $root.notif.GameInvite();
            if (object.sender != null)
                message.sender = String(object.sender);
            if (object.lobbyid != null)
                message.lobbyid = String(object.lobbyid);
            return message;
        };

        /**
         * Creates a plain object from a GameInvite message. Also converts values to other types if specified.
         * @function toObject
         * @memberof notif.GameInvite
         * @static
         * @param {notif.GameInvite} message GameInvite
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameInvite.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.sender = "";
                object.lobbyid = "";
            }
            if (message.sender != null && message.hasOwnProperty("sender"))
                object.sender = message.sender;
            if (message.lobbyid != null && message.hasOwnProperty("lobbyid"))
                object.lobbyid = message.lobbyid;
            return object;
        };

        /**
         * Converts this GameInvite to JSON.
         * @function toJSON
         * @memberof notif.GameInvite
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameInvite.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GameInvite
         * @function getTypeUrl
         * @memberof notif.GameInvite
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GameInvite.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/notif.GameInvite";
        };

        return GameInvite;
    })();

    notif.StatusUpdate = (function() {

        /**
         * Properties of a StatusUpdate.
         * @memberof notif
         * @interface IStatusUpdate
         * @property {string|null} [sender] StatusUpdate sender
         * @property {string|null} [status] StatusUpdate status
         * @property {string|null} [option] StatusUpdate option
         */

        /**
         * Constructs a new StatusUpdate.
         * @memberof notif
         * @classdesc Represents a StatusUpdate.
         * @implements IStatusUpdate
         * @constructor
         * @param {notif.IStatusUpdate=} [properties] Properties to set
         */
        function StatusUpdate(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StatusUpdate sender.
         * @member {string} sender
         * @memberof notif.StatusUpdate
         * @instance
         */
        StatusUpdate.prototype.sender = "";

        /**
         * StatusUpdate status.
         * @member {string} status
         * @memberof notif.StatusUpdate
         * @instance
         */
        StatusUpdate.prototype.status = "";

        /**
         * StatusUpdate option.
         * @member {string} option
         * @memberof notif.StatusUpdate
         * @instance
         */
        StatusUpdate.prototype.option = "";

        /**
         * Creates a new StatusUpdate instance using the specified properties.
         * @function create
         * @memberof notif.StatusUpdate
         * @static
         * @param {notif.IStatusUpdate=} [properties] Properties to set
         * @returns {notif.StatusUpdate} StatusUpdate instance
         */
        StatusUpdate.create = function create(properties) {
            return new StatusUpdate(properties);
        };

        /**
         * Encodes the specified StatusUpdate message. Does not implicitly {@link notif.StatusUpdate.verify|verify} messages.
         * @function encode
         * @memberof notif.StatusUpdate
         * @static
         * @param {notif.IStatusUpdate} message StatusUpdate message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        StatusUpdate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.sender != null && Object.hasOwnProperty.call(message, "sender"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.sender);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.status);
            if (message.option != null && Object.hasOwnProperty.call(message, "option"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.option);
            return writer;
        };

        /**
         * Encodes the specified StatusUpdate message, length delimited. Does not implicitly {@link notif.StatusUpdate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof notif.StatusUpdate
         * @static
         * @param {notif.IStatusUpdate} message StatusUpdate message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        StatusUpdate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StatusUpdate message from the specified reader or buffer.
         * @function decode
         * @memberof notif.StatusUpdate
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {notif.StatusUpdate} StatusUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        StatusUpdate.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.notif.StatusUpdate();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.sender = reader.string();
                        break;
                    }
                case 2: {
                        message.status = reader.string();
                        break;
                    }
                case 3: {
                        message.option = reader.string();
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
         * Decodes a StatusUpdate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof notif.StatusUpdate
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {notif.StatusUpdate} StatusUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        StatusUpdate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StatusUpdate message.
         * @function verify
         * @memberof notif.StatusUpdate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StatusUpdate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.sender != null && message.hasOwnProperty("sender"))
                if (!$util.isString(message.sender))
                    return "sender: string expected";
            if (message.status != null && message.hasOwnProperty("status"))
                if (!$util.isString(message.status))
                    return "status: string expected";
            if (message.option != null && message.hasOwnProperty("option"))
                if (!$util.isString(message.option))
                    return "option: string expected";
            return null;
        };

        /**
         * Creates a StatusUpdate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof notif.StatusUpdate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {notif.StatusUpdate} StatusUpdate
         */
        StatusUpdate.fromObject = function fromObject(object) {
            if (object instanceof $root.notif.StatusUpdate)
                return object;
            let message = new $root.notif.StatusUpdate();
            if (object.sender != null)
                message.sender = String(object.sender);
            if (object.status != null)
                message.status = String(object.status);
            if (object.option != null)
                message.option = String(object.option);
            return message;
        };

        /**
         * Creates a plain object from a StatusUpdate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof notif.StatusUpdate
         * @static
         * @param {notif.StatusUpdate} message StatusUpdate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StatusUpdate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.sender = "";
                object.status = "";
                object.option = "";
            }
            if (message.sender != null && message.hasOwnProperty("sender"))
                object.sender = message.sender;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = message.status;
            if (message.option != null && message.hasOwnProperty("option"))
                object.option = message.option;
            return object;
        };

        /**
         * Converts this StatusUpdate to JSON.
         * @function toJSON
         * @memberof notif.StatusUpdate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StatusUpdate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for StatusUpdate
         * @function getTypeUrl
         * @memberof notif.StatusUpdate
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        StatusUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/notif.StatusUpdate";
        };

        return StatusUpdate;
    })();

    notif.NotificationMessage = (function() {

        /**
         * Properties of a NotificationMessage.
         * @memberof notif
         * @interface INotificationMessage
         * @property {notif.IFriendUpdate|null} [friendRequest] NotificationMessage friendRequest
         * @property {notif.IFriendUpdate|null} [friendAccept] NotificationMessage friendAccept
         * @property {notif.IGameInvite|null} [gameInvite] NotificationMessage gameInvite
         * @property {notif.IStatusUpdate|null} [statusUpdate] NotificationMessage statusUpdate
         */

        /**
         * Constructs a new NotificationMessage.
         * @memberof notif
         * @classdesc Represents a NotificationMessage.
         * @implements INotificationMessage
         * @constructor
         * @param {notif.INotificationMessage=} [properties] Properties to set
         */
        function NotificationMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NotificationMessage friendRequest.
         * @member {notif.IFriendUpdate|null|undefined} friendRequest
         * @memberof notif.NotificationMessage
         * @instance
         */
        NotificationMessage.prototype.friendRequest = null;

        /**
         * NotificationMessage friendAccept.
         * @member {notif.IFriendUpdate|null|undefined} friendAccept
         * @memberof notif.NotificationMessage
         * @instance
         */
        NotificationMessage.prototype.friendAccept = null;

        /**
         * NotificationMessage gameInvite.
         * @member {notif.IGameInvite|null|undefined} gameInvite
         * @memberof notif.NotificationMessage
         * @instance
         */
        NotificationMessage.prototype.gameInvite = null;

        /**
         * NotificationMessage statusUpdate.
         * @member {notif.IStatusUpdate|null|undefined} statusUpdate
         * @memberof notif.NotificationMessage
         * @instance
         */
        NotificationMessage.prototype.statusUpdate = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * NotificationMessage payload.
         * @member {"friendRequest"|"friendAccept"|"gameInvite"|"statusUpdate"|undefined} payload
         * @memberof notif.NotificationMessage
         * @instance
         */
        Object.defineProperty(NotificationMessage.prototype, "payload", {
            get: $util.oneOfGetter($oneOfFields = ["friendRequest", "friendAccept", "gameInvite", "statusUpdate"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new NotificationMessage instance using the specified properties.
         * @function create
         * @memberof notif.NotificationMessage
         * @static
         * @param {notif.INotificationMessage=} [properties] Properties to set
         * @returns {notif.NotificationMessage} NotificationMessage instance
         */
        NotificationMessage.create = function create(properties) {
            return new NotificationMessage(properties);
        };

        /**
         * Encodes the specified NotificationMessage message. Does not implicitly {@link notif.NotificationMessage.verify|verify} messages.
         * @function encode
         * @memberof notif.NotificationMessage
         * @static
         * @param {notif.INotificationMessage} message NotificationMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        NotificationMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.friendRequest != null && Object.hasOwnProperty.call(message, "friendRequest"))
                $root.notif.FriendUpdate.encode(message.friendRequest, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.friendAccept != null && Object.hasOwnProperty.call(message, "friendAccept"))
                $root.notif.FriendUpdate.encode(message.friendAccept, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.gameInvite != null && Object.hasOwnProperty.call(message, "gameInvite"))
                $root.notif.GameInvite.encode(message.gameInvite, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.statusUpdate != null && Object.hasOwnProperty.call(message, "statusUpdate"))
                $root.notif.StatusUpdate.encode(message.statusUpdate, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified NotificationMessage message, length delimited. Does not implicitly {@link notif.NotificationMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof notif.NotificationMessage
         * @static
         * @param {notif.INotificationMessage} message NotificationMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        NotificationMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NotificationMessage message from the specified reader or buffer.
         * @function decode
         * @memberof notif.NotificationMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {notif.NotificationMessage} NotificationMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        NotificationMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.notif.NotificationMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.friendRequest = $root.notif.FriendUpdate.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.friendAccept = $root.notif.FriendUpdate.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.gameInvite = $root.notif.GameInvite.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.statusUpdate = $root.notif.StatusUpdate.decode(reader, reader.uint32());
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
         * Decodes a NotificationMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof notif.NotificationMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {notif.NotificationMessage} NotificationMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        NotificationMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NotificationMessage message.
         * @function verify
         * @memberof notif.NotificationMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NotificationMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.friendRequest != null && message.hasOwnProperty("friendRequest")) {
                properties.payload = 1;
                {
                    let error = $root.notif.FriendUpdate.verify(message.friendRequest);
                    if (error)
                        return "friendRequest." + error;
                }
            }
            if (message.friendAccept != null && message.hasOwnProperty("friendAccept")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.notif.FriendUpdate.verify(message.friendAccept);
                    if (error)
                        return "friendAccept." + error;
                }
            }
            if (message.gameInvite != null && message.hasOwnProperty("gameInvite")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.notif.GameInvite.verify(message.gameInvite);
                    if (error)
                        return "gameInvite." + error;
                }
            }
            if (message.statusUpdate != null && message.hasOwnProperty("statusUpdate")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.notif.StatusUpdate.verify(message.statusUpdate);
                    if (error)
                        return "statusUpdate." + error;
                }
            }
            return null;
        };

        /**
         * Creates a NotificationMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof notif.NotificationMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {notif.NotificationMessage} NotificationMessage
         */
        NotificationMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.notif.NotificationMessage)
                return object;
            let message = new $root.notif.NotificationMessage();
            if (object.friendRequest != null) {
                if (typeof object.friendRequest !== "object")
                    throw TypeError(".notif.NotificationMessage.friendRequest: object expected");
                message.friendRequest = $root.notif.FriendUpdate.fromObject(object.friendRequest);
            }
            if (object.friendAccept != null) {
                if (typeof object.friendAccept !== "object")
                    throw TypeError(".notif.NotificationMessage.friendAccept: object expected");
                message.friendAccept = $root.notif.FriendUpdate.fromObject(object.friendAccept);
            }
            if (object.gameInvite != null) {
                if (typeof object.gameInvite !== "object")
                    throw TypeError(".notif.NotificationMessage.gameInvite: object expected");
                message.gameInvite = $root.notif.GameInvite.fromObject(object.gameInvite);
            }
            if (object.statusUpdate != null) {
                if (typeof object.statusUpdate !== "object")
                    throw TypeError(".notif.NotificationMessage.statusUpdate: object expected");
                message.statusUpdate = $root.notif.StatusUpdate.fromObject(object.statusUpdate);
            }
            return message;
        };

        /**
         * Creates a plain object from a NotificationMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof notif.NotificationMessage
         * @static
         * @param {notif.NotificationMessage} message NotificationMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NotificationMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.friendRequest != null && message.hasOwnProperty("friendRequest")) {
                object.friendRequest = $root.notif.FriendUpdate.toObject(message.friendRequest, options);
                if (options.oneofs)
                    object.payload = "friendRequest";
            }
            if (message.friendAccept != null && message.hasOwnProperty("friendAccept")) {
                object.friendAccept = $root.notif.FriendUpdate.toObject(message.friendAccept, options);
                if (options.oneofs)
                    object.payload = "friendAccept";
            }
            if (message.gameInvite != null && message.hasOwnProperty("gameInvite")) {
                object.gameInvite = $root.notif.GameInvite.toObject(message.gameInvite, options);
                if (options.oneofs)
                    object.payload = "gameInvite";
            }
            if (message.statusUpdate != null && message.hasOwnProperty("statusUpdate")) {
                object.statusUpdate = $root.notif.StatusUpdate.toObject(message.statusUpdate, options);
                if (options.oneofs)
                    object.payload = "statusUpdate";
            }
            return object;
        };

        /**
         * Converts this NotificationMessage to JSON.
         * @function toJSON
         * @memberof notif.NotificationMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NotificationMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NotificationMessage
         * @function getTypeUrl
         * @memberof notif.NotificationMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NotificationMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/notif.NotificationMessage";
        };

        return NotificationMessage;
    })();

    return notif;
})();

export { $root as default };
