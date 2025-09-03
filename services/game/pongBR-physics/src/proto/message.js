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
         * @property {string|null} [winnerUuid] MatchEnd winnerUuid
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
         * MatchEnd winnerUuid.
         * @member {string} winnerUuid
         * @memberof shared.MatchEnd
         * @instance
         */
        MatchEnd.prototype.winnerUuid = "";

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
            if (message.winnerUuid != null && Object.hasOwnProperty.call(message, "winnerUuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.winnerUuid);
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
                        message.winnerUuid = reader.string();
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
            if (message.winnerUuid != null && message.hasOwnProperty("winnerUuid"))
                if (!$util.isString(message.winnerUuid))
                    return "winnerUuid: string expected";
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
            if (object.winnerUuid != null)
                message.winnerUuid = String(object.winnerUuid);
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
                object.winnerUuid = "";
            if (message.winnerUuid != null && message.hasOwnProperty("winnerUuid"))
                object.winnerUuid = message.winnerUuid;
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

export const physics = $root.physics = (() => {

    /**
     * Namespace physics.
     * @exports physics
     * @namespace
     */
    const physics = {};

    physics.PhysicsRequest = (function() {

        /**
         * Properties of a PhysicsRequest.
         * @memberof physics
         * @interface IPhysicsRequest
         * @property {string|null} [gameId] PhysicsRequest gameId
         * @property {number|Long|null} [tick] PhysicsRequest tick
         * @property {Array.<shared.IPaddleInput>|null} [input] PhysicsRequest input
         * @property {number|null} [stage] PhysicsRequest stage
         */

        /**
         * Constructs a new PhysicsRequest.
         * @memberof physics
         * @classdesc Represents a PhysicsRequest.
         * @implements IPhysicsRequest
         * @constructor
         * @param {physics.IPhysicsRequest=} [properties] Properties to set
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
         * @memberof physics.PhysicsRequest
         * @instance
         */
        PhysicsRequest.prototype.gameId = "";

        /**
         * PhysicsRequest tick.
         * @member {number|Long} tick
         * @memberof physics.PhysicsRequest
         * @instance
         */
        PhysicsRequest.prototype.tick = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PhysicsRequest input.
         * @member {Array.<shared.IPaddleInput>} input
         * @memberof physics.PhysicsRequest
         * @instance
         */
        PhysicsRequest.prototype.input = $util.emptyArray;

        /**
         * PhysicsRequest stage.
         * @member {number} stage
         * @memberof physics.PhysicsRequest
         * @instance
         */
        PhysicsRequest.prototype.stage = 0;

        /**
         * Creates a new PhysicsRequest instance using the specified properties.
         * @function create
         * @memberof physics.PhysicsRequest
         * @static
         * @param {physics.IPhysicsRequest=} [properties] Properties to set
         * @returns {physics.PhysicsRequest} PhysicsRequest instance
         */
        PhysicsRequest.create = function create(properties) {
            return new PhysicsRequest(properties);
        };

        /**
         * Encodes the specified PhysicsRequest message. Does not implicitly {@link physics.PhysicsRequest.verify|verify} messages.
         * @function encode
         * @memberof physics.PhysicsRequest
         * @static
         * @param {physics.IPhysicsRequest} message PhysicsRequest message or plain object to encode
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
         * Encodes the specified PhysicsRequest message, length delimited. Does not implicitly {@link physics.PhysicsRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof physics.PhysicsRequest
         * @static
         * @param {physics.IPhysicsRequest} message PhysicsRequest message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        PhysicsRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PhysicsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof physics.PhysicsRequest
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {physics.PhysicsRequest} PhysicsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        PhysicsRequest.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.physics.PhysicsRequest();
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
         * @memberof physics.PhysicsRequest
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {physics.PhysicsRequest} PhysicsRequest
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
         * @memberof physics.PhysicsRequest
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
         * @memberof physics.PhysicsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {physics.PhysicsRequest} PhysicsRequest
         */
        PhysicsRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.physics.PhysicsRequest)
                return object;
            let message = new $root.physics.PhysicsRequest();
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
                    throw TypeError(".physics.PhysicsRequest.input: array expected");
                message.input = [];
                for (let i = 0; i < object.input.length; ++i) {
                    if (typeof object.input[i] !== "object")
                        throw TypeError(".physics.PhysicsRequest.input: object expected");
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
         * @memberof physics.PhysicsRequest
         * @static
         * @param {physics.PhysicsRequest} message PhysicsRequest
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
         * @memberof physics.PhysicsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PhysicsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PhysicsRequest
         * @function getTypeUrl
         * @memberof physics.PhysicsRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PhysicsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/physics.PhysicsRequest";
        };

        return PhysicsRequest;
    })();

    physics.PhysicsResponse = (function() {

        /**
         * Properties of a PhysicsResponse.
         * @memberof physics
         * @interface IPhysicsResponse
         * @property {string|null} [gameId] PhysicsResponse gameId
         * @property {number|Long|null} [tick] PhysicsResponse tick
         * @property {Array.<shared.IBall>|null} [balls] PhysicsResponse balls
         * @property {Array.<shared.IPaddle>|null} [paddles] PhysicsResponse paddles
         * @property {shared.IGoal|null} [goal] PhysicsResponse goal
         * @property {Array.<number>|null} [ranks] PhysicsResponse ranks
         * @property {number|null} [stage] PhysicsResponse stage
         * @property {boolean|null} [end] PhysicsResponse end
         * @property {Array.<shared.IGameEvent>|null} [events] PhysicsResponse events
         * @property {shared.IGameStateInfo|null} [gameState] PhysicsResponse gameState
         */

        /**
         * Constructs a new PhysicsResponse.
         * @memberof physics
         * @classdesc Represents a PhysicsResponse.
         * @implements IPhysicsResponse
         * @constructor
         * @param {physics.IPhysicsResponse=} [properties] Properties to set
         */
        function PhysicsResponse(properties) {
            this.balls = [];
            this.paddles = [];
            this.ranks = [];
            this.events = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PhysicsResponse gameId.
         * @member {string} gameId
         * @memberof physics.PhysicsResponse
         * @instance
         */
        PhysicsResponse.prototype.gameId = "";

        /**
         * PhysicsResponse tick.
         * @member {number|Long} tick
         * @memberof physics.PhysicsResponse
         * @instance
         */
        PhysicsResponse.prototype.tick = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PhysicsResponse balls.
         * @member {Array.<shared.IBall>} balls
         * @memberof physics.PhysicsResponse
         * @instance
         */
        PhysicsResponse.prototype.balls = $util.emptyArray;

        /**
         * PhysicsResponse paddles.
         * @member {Array.<shared.IPaddle>} paddles
         * @memberof physics.PhysicsResponse
         * @instance
         */
        PhysicsResponse.prototype.paddles = $util.emptyArray;

        /**
         * PhysicsResponse goal.
         * @member {shared.IGoal|null|undefined} goal
         * @memberof physics.PhysicsResponse
         * @instance
         */
        PhysicsResponse.prototype.goal = null;

        /**
         * PhysicsResponse ranks.
         * @member {Array.<number>} ranks
         * @memberof physics.PhysicsResponse
         * @instance
         */
        PhysicsResponse.prototype.ranks = $util.emptyArray;

        /**
         * PhysicsResponse stage.
         * @member {number} stage
         * @memberof physics.PhysicsResponse
         * @instance
         */
        PhysicsResponse.prototype.stage = 0;

        /**
         * PhysicsResponse end.
         * @member {boolean} end
         * @memberof physics.PhysicsResponse
         * @instance
         */
        PhysicsResponse.prototype.end = false;

        /**
         * PhysicsResponse events.
         * @member {Array.<shared.IGameEvent>} events
         * @memberof physics.PhysicsResponse
         * @instance
         */
        PhysicsResponse.prototype.events = $util.emptyArray;

        /**
         * PhysicsResponse gameState.
         * @member {shared.IGameStateInfo|null|undefined} gameState
         * @memberof physics.PhysicsResponse
         * @instance
         */
        PhysicsResponse.prototype.gameState = null;

        /**
         * Creates a new PhysicsResponse instance using the specified properties.
         * @function create
         * @memberof physics.PhysicsResponse
         * @static
         * @param {physics.IPhysicsResponse=} [properties] Properties to set
         * @returns {physics.PhysicsResponse} PhysicsResponse instance
         */
        PhysicsResponse.create = function create(properties) {
            return new PhysicsResponse(properties);
        };

        /**
         * Encodes the specified PhysicsResponse message. Does not implicitly {@link physics.PhysicsResponse.verify|verify} messages.
         * @function encode
         * @memberof physics.PhysicsResponse
         * @static
         * @param {physics.IPhysicsResponse} message PhysicsResponse message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
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
            if (message.ranks != null && message.ranks.length) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork();
                for (let i = 0; i < message.ranks.length; ++i)
                    writer.int32(message.ranks[i]);
                writer.ldelim();
            }
            if (message.stage != null && Object.hasOwnProperty.call(message, "stage"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.stage);
            if (message.end != null && Object.hasOwnProperty.call(message, "end"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.end);
            if (message.events != null && message.events.length)
                for (let i = 0; i < message.events.length; ++i)
                    $root.shared.GameEvent.encode(message.events[i], writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.gameState != null && Object.hasOwnProperty.call(message, "gameState"))
                $root.shared.GameStateInfo.encode(message.gameState, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PhysicsResponse message, length delimited. Does not implicitly {@link physics.PhysicsResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof physics.PhysicsResponse
         * @static
         * @param {physics.IPhysicsResponse} message PhysicsResponse message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        PhysicsResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PhysicsResponse message from the specified reader or buffer.
         * @function decode
         * @memberof physics.PhysicsResponse
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {physics.PhysicsResponse} PhysicsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        PhysicsResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.physics.PhysicsResponse();
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
                        message.end = reader.bool();
                        break;
                    }
                case 9: {
                        if (!(message.events && message.events.length))
                            message.events = [];
                        message.events.push($root.shared.GameEvent.decode(reader, reader.uint32()));
                        break;
                    }
                case 10: {
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
         * Decodes a PhysicsResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof physics.PhysicsResponse
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {physics.PhysicsResponse} PhysicsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        PhysicsResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PhysicsResponse message.
         * @function verify
         * @memberof physics.PhysicsResponse
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
            if (message.end != null && message.hasOwnProperty("end"))
                if (typeof message.end !== "boolean")
                    return "end: boolean expected";
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
         * Creates a PhysicsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof physics.PhysicsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {physics.PhysicsResponse} PhysicsResponse
         */
        PhysicsResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.physics.PhysicsResponse)
                return object;
            let message = new $root.physics.PhysicsResponse();
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
                    throw TypeError(".physics.PhysicsResponse.balls: array expected");
                message.balls = [];
                for (let i = 0; i < object.balls.length; ++i) {
                    if (typeof object.balls[i] !== "object")
                        throw TypeError(".physics.PhysicsResponse.balls: object expected");
                    message.balls[i] = $root.shared.Ball.fromObject(object.balls[i]);
                }
            }
            if (object.paddles) {
                if (!Array.isArray(object.paddles))
                    throw TypeError(".physics.PhysicsResponse.paddles: array expected");
                message.paddles = [];
                for (let i = 0; i < object.paddles.length; ++i) {
                    if (typeof object.paddles[i] !== "object")
                        throw TypeError(".physics.PhysicsResponse.paddles: object expected");
                    message.paddles[i] = $root.shared.Paddle.fromObject(object.paddles[i]);
                }
            }
            if (object.goal != null) {
                if (typeof object.goal !== "object")
                    throw TypeError(".physics.PhysicsResponse.goal: object expected");
                message.goal = $root.shared.Goal.fromObject(object.goal);
            }
            if (object.ranks) {
                if (!Array.isArray(object.ranks))
                    throw TypeError(".physics.PhysicsResponse.ranks: array expected");
                message.ranks = [];
                for (let i = 0; i < object.ranks.length; ++i)
                    message.ranks[i] = object.ranks[i] | 0;
            }
            if (object.stage != null)
                message.stage = object.stage | 0;
            if (object.end != null)
                message.end = Boolean(object.end);
            if (object.events) {
                if (!Array.isArray(object.events))
                    throw TypeError(".physics.PhysicsResponse.events: array expected");
                message.events = [];
                for (let i = 0; i < object.events.length; ++i) {
                    if (typeof object.events[i] !== "object")
                        throw TypeError(".physics.PhysicsResponse.events: object expected");
                    message.events[i] = $root.shared.GameEvent.fromObject(object.events[i]);
                }
            }
            if (object.gameState != null) {
                if (typeof object.gameState !== "object")
                    throw TypeError(".physics.PhysicsResponse.gameState: object expected");
                message.gameState = $root.shared.GameStateInfo.fromObject(object.gameState);
            }
            return message;
        };

        /**
         * Creates a plain object from a PhysicsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof physics.PhysicsResponse
         * @static
         * @param {physics.PhysicsResponse} message PhysicsResponse
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
                object.goal = null;
                object.stage = 0;
                object.end = false;
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
            if (message.goal != null && message.hasOwnProperty("goal"))
                object.goal = $root.shared.Goal.toObject(message.goal, options);
            if (message.ranks && message.ranks.length) {
                object.ranks = [];
                for (let j = 0; j < message.ranks.length; ++j)
                    object.ranks[j] = message.ranks[j];
            }
            if (message.stage != null && message.hasOwnProperty("stage"))
                object.stage = message.stage;
            if (message.end != null && message.hasOwnProperty("end"))
                object.end = message.end;
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
         * Converts this PhysicsResponse to JSON.
         * @function toJSON
         * @memberof physics.PhysicsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PhysicsResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PhysicsResponse
         * @function getTypeUrl
         * @memberof physics.PhysicsResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PhysicsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/physics.PhysicsResponse";
        };

        return PhysicsResponse;
    })();

    physics.MatchStateResponse = (function() {

        /**
         * Properties of a MatchStateResponse.
         * @memberof physics
         * @interface IMatchStateResponse
         * @property {shared.IMatchState|null} [state] MatchStateResponse state
         */

        /**
         * Constructs a new MatchStateResponse.
         * @memberof physics
         * @classdesc Represents a MatchStateResponse.
         * @implements IMatchStateResponse
         * @constructor
         * @param {physics.IMatchStateResponse=} [properties] Properties to set
         */
        function MatchStateResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MatchStateResponse state.
         * @member {shared.IMatchState|null|undefined} state
         * @memberof physics.MatchStateResponse
         * @instance
         */
        MatchStateResponse.prototype.state = null;

        /**
         * Creates a new MatchStateResponse instance using the specified properties.
         * @function create
         * @memberof physics.MatchStateResponse
         * @static
         * @param {physics.IMatchStateResponse=} [properties] Properties to set
         * @returns {physics.MatchStateResponse} MatchStateResponse instance
         */
        MatchStateResponse.create = function create(properties) {
            return new MatchStateResponse(properties);
        };

        /**
         * Encodes the specified MatchStateResponse message. Does not implicitly {@link physics.MatchStateResponse.verify|verify} messages.
         * @function encode
         * @memberof physics.MatchStateResponse
         * @static
         * @param {physics.IMatchStateResponse} message MatchStateResponse message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchStateResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                $root.shared.MatchState.encode(message.state, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified MatchStateResponse message, length delimited. Does not implicitly {@link physics.MatchStateResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof physics.MatchStateResponse
         * @static
         * @param {physics.IMatchStateResponse} message MatchStateResponse message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchStateResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchStateResponse message from the specified reader or buffer.
         * @function decode
         * @memberof physics.MatchStateResponse
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {physics.MatchStateResponse} MatchStateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        MatchStateResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.physics.MatchStateResponse();
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
         * Decodes a MatchStateResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof physics.MatchStateResponse
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {physics.MatchStateResponse} MatchStateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        MatchStateResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MatchStateResponse message.
         * @function verify
         * @memberof physics.MatchStateResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MatchStateResponse.verify = function verify(message) {
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
         * Creates a MatchStateResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof physics.MatchStateResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {physics.MatchStateResponse} MatchStateResponse
         */
        MatchStateResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.physics.MatchStateResponse)
                return object;
            let message = new $root.physics.MatchStateResponse();
            if (object.state != null) {
                if (typeof object.state !== "object")
                    throw TypeError(".physics.MatchStateResponse.state: object expected");
                message.state = $root.shared.MatchState.fromObject(object.state);
            }
            return message;
        };

        /**
         * Creates a plain object from a MatchStateResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof physics.MatchStateResponse
         * @static
         * @param {physics.MatchStateResponse} message MatchStateResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MatchStateResponse.toObject = function toObject(message, options) {
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
         * Converts this MatchStateResponse to JSON.
         * @function toJSON
         * @memberof physics.MatchStateResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchStateResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MatchStateResponse
         * @function getTypeUrl
         * @memberof physics.MatchStateResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MatchStateResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/physics.MatchStateResponse";
        };

        return MatchStateResponse;
    })();

    return physics;
})();

export { $root as default };
