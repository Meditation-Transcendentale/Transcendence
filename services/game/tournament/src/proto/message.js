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

    shared.MatchScoreUpdate = (function() {

        /**
         * Properties of a MatchScoreUpdate.
         * @memberof shared
         * @interface IMatchScoreUpdate
         * @property {Array.<number>|null} [score] MatchScoreUpdate score
         */

        /**
         * Constructs a new MatchScoreUpdate.
         * @memberof shared
         * @classdesc Represents a MatchScoreUpdate.
         * @implements IMatchScoreUpdate
         * @constructor
         * @param {shared.IMatchScoreUpdate=} [properties] Properties to set
         */
        function MatchScoreUpdate(properties) {
            this.score = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MatchScoreUpdate score.
         * @member {Array.<number>} score
         * @memberof shared.MatchScoreUpdate
         * @instance
         */
        MatchScoreUpdate.prototype.score = $util.emptyArray;

        /**
         * Creates a new MatchScoreUpdate instance using the specified properties.
         * @function create
         * @memberof shared.MatchScoreUpdate
         * @static
         * @param {shared.IMatchScoreUpdate=} [properties] Properties to set
         * @returns {shared.MatchScoreUpdate} MatchScoreUpdate instance
         */
        MatchScoreUpdate.create = function create(properties) {
            return new MatchScoreUpdate(properties);
        };

        /**
         * Encodes the specified MatchScoreUpdate message. Does not implicitly {@link shared.MatchScoreUpdate.verify|verify} messages.
         * @function encode
         * @memberof shared.MatchScoreUpdate
         * @static
         * @param {shared.IMatchScoreUpdate} message MatchScoreUpdate message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchScoreUpdate.encode = function encode(message, writer) {
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
         * Encodes the specified MatchScoreUpdate message, length delimited. Does not implicitly {@link shared.MatchScoreUpdate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof shared.MatchScoreUpdate
         * @static
         * @param {shared.IMatchScoreUpdate} message MatchScoreUpdate message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchScoreUpdate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchScoreUpdate message from the specified reader or buffer.
         * @function decode
         * @memberof shared.MatchScoreUpdate
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {shared.MatchScoreUpdate} MatchScoreUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        MatchScoreUpdate.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.MatchScoreUpdate();
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
         * Decodes a MatchScoreUpdate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof shared.MatchScoreUpdate
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {shared.MatchScoreUpdate} MatchScoreUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        MatchScoreUpdate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MatchScoreUpdate message.
         * @function verify
         * @memberof shared.MatchScoreUpdate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MatchScoreUpdate.verify = function verify(message) {
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
         * Creates a MatchScoreUpdate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof shared.MatchScoreUpdate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {shared.MatchScoreUpdate} MatchScoreUpdate
         */
        MatchScoreUpdate.fromObject = function fromObject(object) {
            if (object instanceof $root.shared.MatchScoreUpdate)
                return object;
            let message = new $root.shared.MatchScoreUpdate();
            if (object.score) {
                if (!Array.isArray(object.score))
                    throw TypeError(".shared.MatchScoreUpdate.score: array expected");
                message.score = [];
                for (let i = 0; i < object.score.length; ++i)
                    message.score[i] = object.score[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a MatchScoreUpdate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof shared.MatchScoreUpdate
         * @static
         * @param {shared.MatchScoreUpdate} message MatchScoreUpdate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MatchScoreUpdate.toObject = function toObject(message, options) {
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
         * Converts this MatchScoreUpdate to JSON.
         * @function toJSON
         * @memberof shared.MatchScoreUpdate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchScoreUpdate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MatchScoreUpdate
         * @function getTypeUrl
         * @memberof shared.MatchScoreUpdate
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MatchScoreUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/shared.MatchScoreUpdate";
        };

        return MatchScoreUpdate;
    })();

    shared.MatchEnd = (function() {

        /**
         * Properties of a MatchEnd.
         * @memberof shared
         * @interface IMatchEnd
         * @property {string|null} [winnerId] MatchEnd winnerId
         * @property {string|null} [loserId] MatchEnd loserId
         * @property {Array.<number>|null} [score] MatchEnd score
         * @property {string|null} [forfeitId] MatchEnd forfeitId
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
         * @member {string} winnerId
         * @memberof shared.MatchEnd
         * @instance
         */
        MatchEnd.prototype.winnerId = "";

        /**
         * MatchEnd loserId.
         * @member {string} loserId
         * @memberof shared.MatchEnd
         * @instance
         */
        MatchEnd.prototype.loserId = "";

        /**
         * MatchEnd score.
         * @member {Array.<number>} score
         * @memberof shared.MatchEnd
         * @instance
         */
        MatchEnd.prototype.score = $util.emptyArray;

        /**
         * MatchEnd forfeitId.
         * @member {string} forfeitId
         * @memberof shared.MatchEnd
         * @instance
         */
        MatchEnd.prototype.forfeitId = "";

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
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.winnerId);
            if (message.loserId != null && Object.hasOwnProperty.call(message, "loserId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.loserId);
            if (message.score != null && message.score.length) {
                writer.uint32(/* id 3, wireType 2 =*/26).fork();
                for (let i = 0; i < message.score.length; ++i)
                    writer.int32(message.score[i]);
                writer.ldelim();
            }
            if (message.forfeitId != null && Object.hasOwnProperty.call(message, "forfeitId"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.forfeitId);
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
                        message.winnerId = reader.string();
                        break;
                    }
                case 2: {
                        message.loserId = reader.string();
                        break;
                    }
                case 3: {
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
                case 4: {
                        message.forfeitId = reader.string();
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
                if (!$util.isString(message.winnerId))
                    return "winnerId: string expected";
            if (message.loserId != null && message.hasOwnProperty("loserId"))
                if (!$util.isString(message.loserId))
                    return "loserId: string expected";
            if (message.score != null && message.hasOwnProperty("score")) {
                if (!Array.isArray(message.score))
                    return "score: array expected";
                for (let i = 0; i < message.score.length; ++i)
                    if (!$util.isInteger(message.score[i]))
                        return "score: integer[] expected";
            }
            if (message.forfeitId != null && message.hasOwnProperty("forfeitId"))
                if (!$util.isString(message.forfeitId))
                    return "forfeitId: string expected";
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
                message.winnerId = String(object.winnerId);
            if (object.loserId != null)
                message.loserId = String(object.loserId);
            if (object.score) {
                if (!Array.isArray(object.score))
                    throw TypeError(".shared.MatchEnd.score: array expected");
                message.score = [];
                for (let i = 0; i < object.score.length; ++i)
                    message.score[i] = object.score[i] | 0;
            }
            if (object.forfeitId != null)
                message.forfeitId = String(object.forfeitId);
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
            if (options.defaults) {
                object.winnerId = "";
                object.loserId = "";
                object.forfeitId = "";
            }
            if (message.winnerId != null && message.hasOwnProperty("winnerId"))
                object.winnerId = message.winnerId;
            if (message.loserId != null && message.hasOwnProperty("loserId"))
                object.loserId = message.loserId;
            if (message.score && message.score.length) {
                object.score = [];
                for (let j = 0; j < message.score.length; ++j)
                    object.score[j] = message.score[j];
            }
            if (message.forfeitId != null && message.hasOwnProperty("forfeitId"))
                object.forfeitId = message.forfeitId;
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

    shared.MatchEndBr = (function() {

        /**
         * Properties of a MatchEndBr.
         * @memberof shared
         * @interface IMatchEndBr
         * @property {Array.<string>|null} [rank] MatchEndBr rank
         */

        /**
         * Constructs a new MatchEndBr.
         * @memberof shared
         * @classdesc Represents a MatchEndBr.
         * @implements IMatchEndBr
         * @constructor
         * @param {shared.IMatchEndBr=} [properties] Properties to set
         */
        function MatchEndBr(properties) {
            this.rank = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MatchEndBr rank.
         * @member {Array.<string>} rank
         * @memberof shared.MatchEndBr
         * @instance
         */
        MatchEndBr.prototype.rank = $util.emptyArray;

        /**
         * Creates a new MatchEndBr instance using the specified properties.
         * @function create
         * @memberof shared.MatchEndBr
         * @static
         * @param {shared.IMatchEndBr=} [properties] Properties to set
         * @returns {shared.MatchEndBr} MatchEndBr instance
         */
        MatchEndBr.create = function create(properties) {
            return new MatchEndBr(properties);
        };

        /**
         * Encodes the specified MatchEndBr message. Does not implicitly {@link shared.MatchEndBr.verify|verify} messages.
         * @function encode
         * @memberof shared.MatchEndBr
         * @static
         * @param {shared.IMatchEndBr} message MatchEndBr message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchEndBr.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rank != null && message.rank.length)
                for (let i = 0; i < message.rank.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.rank[i]);
            return writer;
        };

        /**
         * Encodes the specified MatchEndBr message, length delimited. Does not implicitly {@link shared.MatchEndBr.verify|verify} messages.
         * @function encodeDelimited
         * @memberof shared.MatchEndBr
         * @static
         * @param {shared.IMatchEndBr} message MatchEndBr message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchEndBr.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchEndBr message from the specified reader or buffer.
         * @function decode
         * @memberof shared.MatchEndBr
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {shared.MatchEndBr} MatchEndBr
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        MatchEndBr.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.shared.MatchEndBr();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.rank && message.rank.length))
                            message.rank = [];
                        message.rank.push(reader.string());
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
         * Decodes a MatchEndBr message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof shared.MatchEndBr
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {shared.MatchEndBr} MatchEndBr
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        MatchEndBr.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MatchEndBr message.
         * @function verify
         * @memberof shared.MatchEndBr
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MatchEndBr.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rank != null && message.hasOwnProperty("rank")) {
                if (!Array.isArray(message.rank))
                    return "rank: array expected";
                for (let i = 0; i < message.rank.length; ++i)
                    if (!$util.isString(message.rank[i]))
                        return "rank: string[] expected";
            }
            return null;
        };

        /**
         * Creates a MatchEndBr message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof shared.MatchEndBr
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {shared.MatchEndBr} MatchEndBr
         */
        MatchEndBr.fromObject = function fromObject(object) {
            if (object instanceof $root.shared.MatchEndBr)
                return object;
            let message = new $root.shared.MatchEndBr();
            if (object.rank) {
                if (!Array.isArray(object.rank))
                    throw TypeError(".shared.MatchEndBr.rank: array expected");
                message.rank = [];
                for (let i = 0; i < object.rank.length; ++i)
                    message.rank[i] = String(object.rank[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a MatchEndBr message. Also converts values to other types if specified.
         * @function toObject
         * @memberof shared.MatchEndBr
         * @static
         * @param {shared.MatchEndBr} message MatchEndBr
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MatchEndBr.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.rank = [];
            if (message.rank && message.rank.length) {
                object.rank = [];
                for (let j = 0; j < message.rank.length; ++j)
                    object.rank[j] = message.rank[j];
            }
            return object;
        };

        /**
         * Converts this MatchEndBr to JSON.
         * @function toJSON
         * @memberof shared.MatchEndBr
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchEndBr.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MatchEndBr
         * @function getTypeUrl
         * @memberof shared.MatchEndBr
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MatchEndBr.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/shared.MatchEndBr";
        };

        return MatchEndBr;
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

export const userinterface = $root.userinterface = (() => {

    /**
     * Namespace userinterface.
     * @exports userinterface
     * @namespace
     */
    const userinterface = {};

    userinterface.PaddleUpdate = (function() {

        /**
         * Properties of a PaddleUpdate.
         * @memberof userinterface
         * @interface IPaddleUpdate
         * @property {number|null} [paddleId] PaddleUpdate paddleId
         * @property {number|null} [move] PaddleUpdate move
         */

        /**
         * Constructs a new PaddleUpdate.
         * @memberof userinterface
         * @classdesc Represents a PaddleUpdate.
         * @implements IPaddleUpdate
         * @constructor
         * @param {userinterface.IPaddleUpdate=} [properties] Properties to set
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
         * @memberof userinterface.PaddleUpdate
         * @instance
         */
        PaddleUpdate.prototype.paddleId = 0;

        /**
         * PaddleUpdate move.
         * @member {number} move
         * @memberof userinterface.PaddleUpdate
         * @instance
         */
        PaddleUpdate.prototype.move = 0;

        /**
         * Creates a new PaddleUpdate instance using the specified properties.
         * @function create
         * @memberof userinterface.PaddleUpdate
         * @static
         * @param {userinterface.IPaddleUpdate=} [properties] Properties to set
         * @returns {userinterface.PaddleUpdate} PaddleUpdate instance
         */
        PaddleUpdate.create = function create(properties) {
            return new PaddleUpdate(properties);
        };

        /**
         * Encodes the specified PaddleUpdate message. Does not implicitly {@link userinterface.PaddleUpdate.verify|verify} messages.
         * @function encode
         * @memberof userinterface.PaddleUpdate
         * @static
         * @param {userinterface.IPaddleUpdate} message PaddleUpdate message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
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
         * Encodes the specified PaddleUpdate message, length delimited. Does not implicitly {@link userinterface.PaddleUpdate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof userinterface.PaddleUpdate
         * @static
         * @param {userinterface.IPaddleUpdate} message PaddleUpdate message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        PaddleUpdate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PaddleUpdate message from the specified reader or buffer.
         * @function decode
         * @memberof userinterface.PaddleUpdate
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {userinterface.PaddleUpdate} PaddleUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        PaddleUpdate.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.userinterface.PaddleUpdate();
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
         * @memberof userinterface.PaddleUpdate
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {userinterface.PaddleUpdate} PaddleUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        PaddleUpdate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PaddleUpdate message.
         * @function verify
         * @memberof userinterface.PaddleUpdate
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
         * @memberof userinterface.PaddleUpdate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {userinterface.PaddleUpdate} PaddleUpdate
         */
        PaddleUpdate.fromObject = function fromObject(object) {
            if (object instanceof $root.userinterface.PaddleUpdate)
                return object;
            let message = new $root.userinterface.PaddleUpdate();
            if (object.paddleId != null)
                message.paddleId = object.paddleId | 0;
            if (object.move != null)
                message.move = object.move | 0;
            return message;
        };

        /**
         * Creates a plain object from a PaddleUpdate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof userinterface.PaddleUpdate
         * @static
         * @param {userinterface.PaddleUpdate} message PaddleUpdate
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
         * @memberof userinterface.PaddleUpdate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PaddleUpdate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PaddleUpdate
         * @function getTypeUrl
         * @memberof userinterface.PaddleUpdate
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PaddleUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/userinterface.PaddleUpdate";
        };

        return PaddleUpdate;
    })();

    userinterface.QuitMessage = (function() {

        /**
         * Properties of a QuitMessage.
         * @memberof userinterface
         * @interface IQuitMessage
         * @property {string|null} [uuid] QuitMessage uuid
         * @property {string|null} [lobbyId] QuitMessage lobbyId
         */

        /**
         * Constructs a new QuitMessage.
         * @memberof userinterface
         * @classdesc Represents a QuitMessage.
         * @implements IQuitMessage
         * @constructor
         * @param {userinterface.IQuitMessage=} [properties] Properties to set
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
         * @memberof userinterface.QuitMessage
         * @instance
         */
        QuitMessage.prototype.uuid = "";

        /**
         * QuitMessage lobbyId.
         * @member {string} lobbyId
         * @memberof userinterface.QuitMessage
         * @instance
         */
        QuitMessage.prototype.lobbyId = "";

        /**
         * Creates a new QuitMessage instance using the specified properties.
         * @function create
         * @memberof userinterface.QuitMessage
         * @static
         * @param {userinterface.IQuitMessage=} [properties] Properties to set
         * @returns {userinterface.QuitMessage} QuitMessage instance
         */
        QuitMessage.create = function create(properties) {
            return new QuitMessage(properties);
        };

        /**
         * Encodes the specified QuitMessage message. Does not implicitly {@link userinterface.QuitMessage.verify|verify} messages.
         * @function encode
         * @memberof userinterface.QuitMessage
         * @static
         * @param {userinterface.IQuitMessage} message QuitMessage message or plain object to encode
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
         * Encodes the specified QuitMessage message, length delimited. Does not implicitly {@link userinterface.QuitMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof userinterface.QuitMessage
         * @static
         * @param {userinterface.IQuitMessage} message QuitMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        QuitMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a QuitMessage message from the specified reader or buffer.
         * @function decode
         * @memberof userinterface.QuitMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {userinterface.QuitMessage} QuitMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        QuitMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.userinterface.QuitMessage();
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
         * @memberof userinterface.QuitMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {userinterface.QuitMessage} QuitMessage
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
         * @memberof userinterface.QuitMessage
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
         * @memberof userinterface.QuitMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {userinterface.QuitMessage} QuitMessage
         */
        QuitMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.userinterface.QuitMessage)
                return object;
            let message = new $root.userinterface.QuitMessage();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            if (object.lobbyId != null)
                message.lobbyId = String(object.lobbyId);
            return message;
        };

        /**
         * Creates a plain object from a QuitMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof userinterface.QuitMessage
         * @static
         * @param {userinterface.QuitMessage} message QuitMessage
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
         * @memberof userinterface.QuitMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        QuitMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for QuitMessage
         * @function getTypeUrl
         * @memberof userinterface.QuitMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        QuitMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/userinterface.QuitMessage";
        };

        return QuitMessage;
    })();

    userinterface.ReadyMessage = (function() {

        /**
         * Properties of a ReadyMessage.
         * @memberof userinterface
         * @interface IReadyMessage
         * @property {string|null} [lobbyId] ReadyMessage lobbyId
         */

        /**
         * Constructs a new ReadyMessage.
         * @memberof userinterface
         * @classdesc Represents a ReadyMessage.
         * @implements IReadyMessage
         * @constructor
         * @param {userinterface.IReadyMessage=} [properties] Properties to set
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
         * @memberof userinterface.ReadyMessage
         * @instance
         */
        ReadyMessage.prototype.lobbyId = "";

        /**
         * Creates a new ReadyMessage instance using the specified properties.
         * @function create
         * @memberof userinterface.ReadyMessage
         * @static
         * @param {userinterface.IReadyMessage=} [properties] Properties to set
         * @returns {userinterface.ReadyMessage} ReadyMessage instance
         */
        ReadyMessage.create = function create(properties) {
            return new ReadyMessage(properties);
        };

        /**
         * Encodes the specified ReadyMessage message. Does not implicitly {@link userinterface.ReadyMessage.verify|verify} messages.
         * @function encode
         * @memberof userinterface.ReadyMessage
         * @static
         * @param {userinterface.IReadyMessage} message ReadyMessage message or plain object to encode
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
         * Encodes the specified ReadyMessage message, length delimited. Does not implicitly {@link userinterface.ReadyMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof userinterface.ReadyMessage
         * @static
         * @param {userinterface.IReadyMessage} message ReadyMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        ReadyMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReadyMessage message from the specified reader or buffer.
         * @function decode
         * @memberof userinterface.ReadyMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {userinterface.ReadyMessage} ReadyMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        ReadyMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.userinterface.ReadyMessage();
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
         * @memberof userinterface.ReadyMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {userinterface.ReadyMessage} ReadyMessage
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
         * @memberof userinterface.ReadyMessage
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
         * @memberof userinterface.ReadyMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {userinterface.ReadyMessage} ReadyMessage
         */
        ReadyMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.userinterface.ReadyMessage)
                return object;
            let message = new $root.userinterface.ReadyMessage();
            if (object.lobbyId != null)
                message.lobbyId = String(object.lobbyId);
            return message;
        };

        /**
         * Creates a plain object from a ReadyMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof userinterface.ReadyMessage
         * @static
         * @param {userinterface.ReadyMessage} message ReadyMessage
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
         * @memberof userinterface.ReadyMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReadyMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ReadyMessage
         * @function getTypeUrl
         * @memberof userinterface.ReadyMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ReadyMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/userinterface.ReadyMessage";
        };

        return ReadyMessage;
    })();

    userinterface.SpectateMessage = (function() {

        /**
         * Properties of a SpectateMessage.
         * @memberof userinterface
         * @interface ISpectateMessage
         */

        /**
         * Constructs a new SpectateMessage.
         * @memberof userinterface
         * @classdesc Represents a SpectateMessage.
         * @implements ISpectateMessage
         * @constructor
         * @param {userinterface.ISpectateMessage=} [properties] Properties to set
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
         * @memberof userinterface.SpectateMessage
         * @static
         * @param {userinterface.ISpectateMessage=} [properties] Properties to set
         * @returns {userinterface.SpectateMessage} SpectateMessage instance
         */
        SpectateMessage.create = function create(properties) {
            return new SpectateMessage(properties);
        };

        /**
         * Encodes the specified SpectateMessage message. Does not implicitly {@link userinterface.SpectateMessage.verify|verify} messages.
         * @function encode
         * @memberof userinterface.SpectateMessage
         * @static
         * @param {userinterface.ISpectateMessage} message SpectateMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        SpectateMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified SpectateMessage message, length delimited. Does not implicitly {@link userinterface.SpectateMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof userinterface.SpectateMessage
         * @static
         * @param {userinterface.ISpectateMessage} message SpectateMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        SpectateMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SpectateMessage message from the specified reader or buffer.
         * @function decode
         * @memberof userinterface.SpectateMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {userinterface.SpectateMessage} SpectateMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        SpectateMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.userinterface.SpectateMessage();
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
         * @memberof userinterface.SpectateMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {userinterface.SpectateMessage} SpectateMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        SpectateMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SpectateMessage message.
         * @function verify
         * @memberof userinterface.SpectateMessage
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
         * @memberof userinterface.SpectateMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {userinterface.SpectateMessage} SpectateMessage
         */
        SpectateMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.userinterface.SpectateMessage)
                return object;
            return new $root.userinterface.SpectateMessage();
        };

        /**
         * Creates a plain object from a SpectateMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof userinterface.SpectateMessage
         * @static
         * @param {userinterface.SpectateMessage} message SpectateMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SpectateMessage.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this SpectateMessage to JSON.
         * @function toJSON
         * @memberof userinterface.SpectateMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SpectateMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SpectateMessage
         * @function getTypeUrl
         * @memberof userinterface.SpectateMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SpectateMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/userinterface.SpectateMessage";
        };

        return SpectateMessage;
    })();

    userinterface.ClientMessage = (function() {

        /**
         * Properties of a ClientMessage.
         * @memberof userinterface
         * @interface IClientMessage
         * @property {userinterface.IPaddleUpdate|null} [paddleUpdate] ClientMessage paddleUpdate
         * @property {userinterface.IQuitMessage|null} [quit] ClientMessage quit
         * @property {userinterface.IReadyMessage|null} [ready] ClientMessage ready
         * @property {userinterface.ISpectateMessage|null} [spectate] ClientMessage spectate
         */

        /**
         * Constructs a new ClientMessage.
         * @memberof userinterface
         * @classdesc Represents a ClientMessage.
         * @implements IClientMessage
         * @constructor
         * @param {userinterface.IClientMessage=} [properties] Properties to set
         */
        function ClientMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ClientMessage paddleUpdate.
         * @member {userinterface.IPaddleUpdate|null|undefined} paddleUpdate
         * @memberof userinterface.ClientMessage
         * @instance
         */
        ClientMessage.prototype.paddleUpdate = null;

        /**
         * ClientMessage quit.
         * @member {userinterface.IQuitMessage|null|undefined} quit
         * @memberof userinterface.ClientMessage
         * @instance
         */
        ClientMessage.prototype.quit = null;

        /**
         * ClientMessage ready.
         * @member {userinterface.IReadyMessage|null|undefined} ready
         * @memberof userinterface.ClientMessage
         * @instance
         */
        ClientMessage.prototype.ready = null;

        /**
         * ClientMessage spectate.
         * @member {userinterface.ISpectateMessage|null|undefined} spectate
         * @memberof userinterface.ClientMessage
         * @instance
         */
        ClientMessage.prototype.spectate = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * ClientMessage payload.
         * @member {"paddleUpdate"|"quit"|"ready"|"spectate"|undefined} payload
         * @memberof userinterface.ClientMessage
         * @instance
         */
        Object.defineProperty(ClientMessage.prototype, "payload", {
            get: $util.oneOfGetter($oneOfFields = ["paddleUpdate", "quit", "ready", "spectate"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new ClientMessage instance using the specified properties.
         * @function create
         * @memberof userinterface.ClientMessage
         * @static
         * @param {userinterface.IClientMessage=} [properties] Properties to set
         * @returns {userinterface.ClientMessage} ClientMessage instance
         */
        ClientMessage.create = function create(properties) {
            return new ClientMessage(properties);
        };

        /**
         * Encodes the specified ClientMessage message. Does not implicitly {@link userinterface.ClientMessage.verify|verify} messages.
         * @function encode
         * @memberof userinterface.ClientMessage
         * @static
         * @param {userinterface.IClientMessage} message ClientMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        ClientMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.paddleUpdate != null && Object.hasOwnProperty.call(message, "paddleUpdate"))
                $root.userinterface.PaddleUpdate.encode(message.paddleUpdate, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.quit != null && Object.hasOwnProperty.call(message, "quit"))
                $root.userinterface.QuitMessage.encode(message.quit, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.ready != null && Object.hasOwnProperty.call(message, "ready"))
                $root.userinterface.ReadyMessage.encode(message.ready, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.spectate != null && Object.hasOwnProperty.call(message, "spectate"))
                $root.userinterface.SpectateMessage.encode(message.spectate, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ClientMessage message, length delimited. Does not implicitly {@link userinterface.ClientMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof userinterface.ClientMessage
         * @static
         * @param {userinterface.IClientMessage} message ClientMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        ClientMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ClientMessage message from the specified reader or buffer.
         * @function decode
         * @memberof userinterface.ClientMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {userinterface.ClientMessage} ClientMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        ClientMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.userinterface.ClientMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.paddleUpdate = $root.userinterface.PaddleUpdate.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.quit = $root.userinterface.QuitMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.ready = $root.userinterface.ReadyMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.spectate = $root.userinterface.SpectateMessage.decode(reader, reader.uint32());
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
         * @memberof userinterface.ClientMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {userinterface.ClientMessage} ClientMessage
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
         * @memberof userinterface.ClientMessage
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
                    let error = $root.userinterface.PaddleUpdate.verify(message.paddleUpdate);
                    if (error)
                        return "paddleUpdate." + error;
                }
            }
            if (message.quit != null && message.hasOwnProperty("quit")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.userinterface.QuitMessage.verify(message.quit);
                    if (error)
                        return "quit." + error;
                }
            }
            if (message.ready != null && message.hasOwnProperty("ready")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.userinterface.ReadyMessage.verify(message.ready);
                    if (error)
                        return "ready." + error;
                }
            }
            if (message.spectate != null && message.hasOwnProperty("spectate")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.userinterface.SpectateMessage.verify(message.spectate);
                    if (error)
                        return "spectate." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ClientMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof userinterface.ClientMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {userinterface.ClientMessage} ClientMessage
         */
        ClientMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.userinterface.ClientMessage)
                return object;
            let message = new $root.userinterface.ClientMessage();
            if (object.paddleUpdate != null) {
                if (typeof object.paddleUpdate !== "object")
                    throw TypeError(".userinterface.ClientMessage.paddleUpdate: object expected");
                message.paddleUpdate = $root.userinterface.PaddleUpdate.fromObject(object.paddleUpdate);
            }
            if (object.quit != null) {
                if (typeof object.quit !== "object")
                    throw TypeError(".userinterface.ClientMessage.quit: object expected");
                message.quit = $root.userinterface.QuitMessage.fromObject(object.quit);
            }
            if (object.ready != null) {
                if (typeof object.ready !== "object")
                    throw TypeError(".userinterface.ClientMessage.ready: object expected");
                message.ready = $root.userinterface.ReadyMessage.fromObject(object.ready);
            }
            if (object.spectate != null) {
                if (typeof object.spectate !== "object")
                    throw TypeError(".userinterface.ClientMessage.spectate: object expected");
                message.spectate = $root.userinterface.SpectateMessage.fromObject(object.spectate);
            }
            return message;
        };

        /**
         * Creates a plain object from a ClientMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof userinterface.ClientMessage
         * @static
         * @param {userinterface.ClientMessage} message ClientMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClientMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.paddleUpdate != null && message.hasOwnProperty("paddleUpdate")) {
                object.paddleUpdate = $root.userinterface.PaddleUpdate.toObject(message.paddleUpdate, options);
                if (options.oneofs)
                    object.payload = "paddleUpdate";
            }
            if (message.quit != null && message.hasOwnProperty("quit")) {
                object.quit = $root.userinterface.QuitMessage.toObject(message.quit, options);
                if (options.oneofs)
                    object.payload = "quit";
            }
            if (message.ready != null && message.hasOwnProperty("ready")) {
                object.ready = $root.userinterface.ReadyMessage.toObject(message.ready, options);
                if (options.oneofs)
                    object.payload = "ready";
            }
            if (message.spectate != null && message.hasOwnProperty("spectate")) {
                object.spectate = $root.userinterface.SpectateMessage.toObject(message.spectate, options);
                if (options.oneofs)
                    object.payload = "spectate";
            }
            return object;
        };

        /**
         * Converts this ClientMessage to JSON.
         * @function toJSON
         * @memberof userinterface.ClientMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClientMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ClientMessage
         * @function getTypeUrl
         * @memberof userinterface.ClientMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ClientMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/userinterface.ClientMessage";
        };

        return ClientMessage;
    })();

    userinterface.ErrorMessage = (function() {

        /**
         * Properties of an ErrorMessage.
         * @memberof userinterface
         * @interface IErrorMessage
         * @property {string|null} [message] ErrorMessage message
         */

        /**
         * Constructs a new ErrorMessage.
         * @memberof userinterface
         * @classdesc Represents an ErrorMessage.
         * @implements IErrorMessage
         * @constructor
         * @param {userinterface.IErrorMessage=} [properties] Properties to set
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
         * @memberof userinterface.ErrorMessage
         * @instance
         */
        ErrorMessage.prototype.message = "";

        /**
         * Creates a new ErrorMessage instance using the specified properties.
         * @function create
         * @memberof userinterface.ErrorMessage
         * @static
         * @param {userinterface.IErrorMessage=} [properties] Properties to set
         * @returns {userinterface.ErrorMessage} ErrorMessage instance
         */
        ErrorMessage.create = function create(properties) {
            return new ErrorMessage(properties);
        };

        /**
         * Encodes the specified ErrorMessage message. Does not implicitly {@link userinterface.ErrorMessage.verify|verify} messages.
         * @function encode
         * @memberof userinterface.ErrorMessage
         * @static
         * @param {userinterface.IErrorMessage} message ErrorMessage message or plain object to encode
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
         * Encodes the specified ErrorMessage message, length delimited. Does not implicitly {@link userinterface.ErrorMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof userinterface.ErrorMessage
         * @static
         * @param {userinterface.IErrorMessage} message ErrorMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        ErrorMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ErrorMessage message from the specified reader or buffer.
         * @function decode
         * @memberof userinterface.ErrorMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {userinterface.ErrorMessage} ErrorMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        ErrorMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.userinterface.ErrorMessage();
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
         * @memberof userinterface.ErrorMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {userinterface.ErrorMessage} ErrorMessage
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
         * @memberof userinterface.ErrorMessage
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
         * @memberof userinterface.ErrorMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {userinterface.ErrorMessage} ErrorMessage
         */
        ErrorMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.userinterface.ErrorMessage)
                return object;
            let message = new $root.userinterface.ErrorMessage();
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from an ErrorMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof userinterface.ErrorMessage
         * @static
         * @param {userinterface.ErrorMessage} message ErrorMessage
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
         * @memberof userinterface.ErrorMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ErrorMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ErrorMessage
         * @function getTypeUrl
         * @memberof userinterface.ErrorMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ErrorMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/userinterface.ErrorMessage";
        };

        return ErrorMessage;
    })();

    userinterface.WelcomeMessage = (function() {

        /**
         * Properties of a WelcomeMessage.
         * @memberof userinterface
         * @interface IWelcomeMessage
         * @property {number|null} [paddleId] WelcomeMessage paddleId
         */

        /**
         * Constructs a new WelcomeMessage.
         * @memberof userinterface
         * @classdesc Represents a WelcomeMessage.
         * @implements IWelcomeMessage
         * @constructor
         * @param {userinterface.IWelcomeMessage=} [properties] Properties to set
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
         * @memberof userinterface.WelcomeMessage
         * @instance
         */
        WelcomeMessage.prototype.paddleId = 0;

        /**
         * Creates a new WelcomeMessage instance using the specified properties.
         * @function create
         * @memberof userinterface.WelcomeMessage
         * @static
         * @param {userinterface.IWelcomeMessage=} [properties] Properties to set
         * @returns {userinterface.WelcomeMessage} WelcomeMessage instance
         */
        WelcomeMessage.create = function create(properties) {
            return new WelcomeMessage(properties);
        };

        /**
         * Encodes the specified WelcomeMessage message. Does not implicitly {@link userinterface.WelcomeMessage.verify|verify} messages.
         * @function encode
         * @memberof userinterface.WelcomeMessage
         * @static
         * @param {userinterface.IWelcomeMessage} message WelcomeMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        WelcomeMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.paddleId != null && Object.hasOwnProperty.call(message, "paddleId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.paddleId);
            return writer;
        };

        /**
         * Encodes the specified WelcomeMessage message, length delimited. Does not implicitly {@link userinterface.WelcomeMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof userinterface.WelcomeMessage
         * @static
         * @param {userinterface.IWelcomeMessage} message WelcomeMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        WelcomeMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a WelcomeMessage message from the specified reader or buffer.
         * @function decode
         * @memberof userinterface.WelcomeMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {userinterface.WelcomeMessage} WelcomeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        WelcomeMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.userinterface.WelcomeMessage();
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
         * @memberof userinterface.WelcomeMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {userinterface.WelcomeMessage} WelcomeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        WelcomeMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a WelcomeMessage message.
         * @function verify
         * @memberof userinterface.WelcomeMessage
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
         * @memberof userinterface.WelcomeMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {userinterface.WelcomeMessage} WelcomeMessage
         */
        WelcomeMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.userinterface.WelcomeMessage)
                return object;
            let message = new $root.userinterface.WelcomeMessage();
            if (object.paddleId != null)
                message.paddleId = object.paddleId | 0;
            return message;
        };

        /**
         * Creates a plain object from a WelcomeMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof userinterface.WelcomeMessage
         * @static
         * @param {userinterface.WelcomeMessage} message WelcomeMessage
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
         * @memberof userinterface.WelcomeMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WelcomeMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for WelcomeMessage
         * @function getTypeUrl
         * @memberof userinterface.WelcomeMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        WelcomeMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/userinterface.WelcomeMessage";
        };

        return WelcomeMessage;
    })();

    userinterface.GameStartMessage = (function() {

        /**
         * Properties of a GameStartMessage.
         * @memberof userinterface
         * @interface IGameStartMessage
         */

        /**
         * Constructs a new GameStartMessage.
         * @memberof userinterface
         * @classdesc Represents a GameStartMessage.
         * @implements IGameStartMessage
         * @constructor
         * @param {userinterface.IGameStartMessage=} [properties] Properties to set
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
         * @memberof userinterface.GameStartMessage
         * @static
         * @param {userinterface.IGameStartMessage=} [properties] Properties to set
         * @returns {userinterface.GameStartMessage} GameStartMessage instance
         */
        GameStartMessage.create = function create(properties) {
            return new GameStartMessage(properties);
        };

        /**
         * Encodes the specified GameStartMessage message. Does not implicitly {@link userinterface.GameStartMessage.verify|verify} messages.
         * @function encode
         * @memberof userinterface.GameStartMessage
         * @static
         * @param {userinterface.IGameStartMessage} message GameStartMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        GameStartMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified GameStartMessage message, length delimited. Does not implicitly {@link userinterface.GameStartMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof userinterface.GameStartMessage
         * @static
         * @param {userinterface.IGameStartMessage} message GameStartMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        GameStartMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameStartMessage message from the specified reader or buffer.
         * @function decode
         * @memberof userinterface.GameStartMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {userinterface.GameStartMessage} GameStartMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        GameStartMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.userinterface.GameStartMessage();
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
         * @memberof userinterface.GameStartMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {userinterface.GameStartMessage} GameStartMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        GameStartMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameStartMessage message.
         * @function verify
         * @memberof userinterface.GameStartMessage
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
         * @memberof userinterface.GameStartMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {userinterface.GameStartMessage} GameStartMessage
         */
        GameStartMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.userinterface.GameStartMessage)
                return object;
            return new $root.userinterface.GameStartMessage();
        };

        /**
         * Creates a plain object from a GameStartMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof userinterface.GameStartMessage
         * @static
         * @param {userinterface.GameStartMessage} message GameStartMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameStartMessage.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this GameStartMessage to JSON.
         * @function toJSON
         * @memberof userinterface.GameStartMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameStartMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GameStartMessage
         * @function getTypeUrl
         * @memberof userinterface.GameStartMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GameStartMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/userinterface.GameStartMessage";
        };

        return GameStartMessage;
    })();

    userinterface.ServerMessage = (function() {

        /**
         * Properties of a ServerMessage.
         * @memberof userinterface
         * @interface IServerMessage
         * @property {userinterface.IErrorMessage|null} [error] ServerMessage error
         * @property {userinterface.IWelcomeMessage|null} [welcome] ServerMessage welcome
         * @property {userinterface.IGameStartMessage|null} [start] ServerMessage start
         * @property {shared.IMatchState|null} [state] ServerMessage state
         * @property {shared.IMatchEnd|null} [end] ServerMessage end
         */

        /**
         * Constructs a new ServerMessage.
         * @memberof userinterface
         * @classdesc Represents a ServerMessage.
         * @implements IServerMessage
         * @constructor
         * @param {userinterface.IServerMessage=} [properties] Properties to set
         */
        function ServerMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServerMessage error.
         * @member {userinterface.IErrorMessage|null|undefined} error
         * @memberof userinterface.ServerMessage
         * @instance
         */
        ServerMessage.prototype.error = null;

        /**
         * ServerMessage welcome.
         * @member {userinterface.IWelcomeMessage|null|undefined} welcome
         * @memberof userinterface.ServerMessage
         * @instance
         */
        ServerMessage.prototype.welcome = null;

        /**
         * ServerMessage start.
         * @member {userinterface.IGameStartMessage|null|undefined} start
         * @memberof userinterface.ServerMessage
         * @instance
         */
        ServerMessage.prototype.start = null;

        /**
         * ServerMessage state.
         * @member {shared.IMatchState|null|undefined} state
         * @memberof userinterface.ServerMessage
         * @instance
         */
        ServerMessage.prototype.state = null;

        /**
         * ServerMessage end.
         * @member {shared.IMatchEnd|null|undefined} end
         * @memberof userinterface.ServerMessage
         * @instance
         */
        ServerMessage.prototype.end = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * ServerMessage payload.
         * @member {"error"|"welcome"|"start"|"state"|"end"|undefined} payload
         * @memberof userinterface.ServerMessage
         * @instance
         */
        Object.defineProperty(ServerMessage.prototype, "payload", {
            get: $util.oneOfGetter($oneOfFields = ["error", "welcome", "start", "state", "end"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new ServerMessage instance using the specified properties.
         * @function create
         * @memberof userinterface.ServerMessage
         * @static
         * @param {userinterface.IServerMessage=} [properties] Properties to set
         * @returns {userinterface.ServerMessage} ServerMessage instance
         */
        ServerMessage.create = function create(properties) {
            return new ServerMessage(properties);
        };

        /**
         * Encodes the specified ServerMessage message. Does not implicitly {@link userinterface.ServerMessage.verify|verify} messages.
         * @function encode
         * @memberof userinterface.ServerMessage
         * @static
         * @param {userinterface.IServerMessage} message ServerMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        ServerMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.userinterface.ErrorMessage.encode(message.error, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.welcome != null && Object.hasOwnProperty.call(message, "welcome"))
                $root.userinterface.WelcomeMessage.encode(message.welcome, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.start != null && Object.hasOwnProperty.call(message, "start"))
                $root.userinterface.GameStartMessage.encode(message.start, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                $root.shared.MatchState.encode(message.state, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.end != null && Object.hasOwnProperty.call(message, "end"))
                $root.shared.MatchEnd.encode(message.end, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ServerMessage message, length delimited. Does not implicitly {@link userinterface.ServerMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof userinterface.ServerMessage
         * @static
         * @param {userinterface.IServerMessage} message ServerMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        ServerMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ServerMessage message from the specified reader or buffer.
         * @function decode
         * @memberof userinterface.ServerMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {userinterface.ServerMessage} ServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        ServerMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.userinterface.ServerMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.error = $root.userinterface.ErrorMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.welcome = $root.userinterface.WelcomeMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.start = $root.userinterface.GameStartMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.state = $root.shared.MatchState.decode(reader, reader.uint32());
                        break;
                    }
                case 5: {
                        message.end = $root.shared.MatchEnd.decode(reader, reader.uint32());
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
         * @memberof userinterface.ServerMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {userinterface.ServerMessage} ServerMessage
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
         * @memberof userinterface.ServerMessage
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
                    let error = $root.userinterface.ErrorMessage.verify(message.error);
                    if (error)
                        return "error." + error;
                }
            }
            if (message.welcome != null && message.hasOwnProperty("welcome")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.userinterface.WelcomeMessage.verify(message.welcome);
                    if (error)
                        return "welcome." + error;
                }
            }
            if (message.start != null && message.hasOwnProperty("start")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.userinterface.GameStartMessage.verify(message.start);
                    if (error)
                        return "start." + error;
                }
            }
            if (message.state != null && message.hasOwnProperty("state")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.shared.MatchState.verify(message.state);
                    if (error)
                        return "state." + error;
                }
            }
            if (message.end != null && message.hasOwnProperty("end")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.shared.MatchEnd.verify(message.end);
                    if (error)
                        return "end." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ServerMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof userinterface.ServerMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {userinterface.ServerMessage} ServerMessage
         */
        ServerMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.userinterface.ServerMessage)
                return object;
            let message = new $root.userinterface.ServerMessage();
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".userinterface.ServerMessage.error: object expected");
                message.error = $root.userinterface.ErrorMessage.fromObject(object.error);
            }
            if (object.welcome != null) {
                if (typeof object.welcome !== "object")
                    throw TypeError(".userinterface.ServerMessage.welcome: object expected");
                message.welcome = $root.userinterface.WelcomeMessage.fromObject(object.welcome);
            }
            if (object.start != null) {
                if (typeof object.start !== "object")
                    throw TypeError(".userinterface.ServerMessage.start: object expected");
                message.start = $root.userinterface.GameStartMessage.fromObject(object.start);
            }
            if (object.state != null) {
                if (typeof object.state !== "object")
                    throw TypeError(".userinterface.ServerMessage.state: object expected");
                message.state = $root.shared.MatchState.fromObject(object.state);
            }
            if (object.end != null) {
                if (typeof object.end !== "object")
                    throw TypeError(".userinterface.ServerMessage.end: object expected");
                message.end = $root.shared.MatchEnd.fromObject(object.end);
            }
            return message;
        };

        /**
         * Creates a plain object from a ServerMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof userinterface.ServerMessage
         * @static
         * @param {userinterface.ServerMessage} message ServerMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServerMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.error != null && message.hasOwnProperty("error")) {
                object.error = $root.userinterface.ErrorMessage.toObject(message.error, options);
                if (options.oneofs)
                    object.payload = "error";
            }
            if (message.welcome != null && message.hasOwnProperty("welcome")) {
                object.welcome = $root.userinterface.WelcomeMessage.toObject(message.welcome, options);
                if (options.oneofs)
                    object.payload = "welcome";
            }
            if (message.start != null && message.hasOwnProperty("start")) {
                object.start = $root.userinterface.GameStartMessage.toObject(message.start, options);
                if (options.oneofs)
                    object.payload = "start";
            }
            if (message.state != null && message.hasOwnProperty("state")) {
                object.state = $root.shared.MatchState.toObject(message.state, options);
                if (options.oneofs)
                    object.payload = "state";
            }
            if (message.end != null && message.hasOwnProperty("end")) {
                object.end = $root.shared.MatchEnd.toObject(message.end, options);
                if (options.oneofs)
                    object.payload = "end";
            }
            return object;
        };

        /**
         * Converts this ServerMessage to JSON.
         * @function toJSON
         * @memberof userinterface.ServerMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServerMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServerMessage
         * @function getTypeUrl
         * @memberof userinterface.ServerMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServerMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/userinterface.ServerMessage";
        };

        return ServerMessage;
    })();

    userinterface.MatchSetup = (function() {

        /**
         * Properties of a MatchSetup.
         * @memberof userinterface
         * @interface IMatchSetup
         * @property {Array.<string>|null} [players] MatchSetup players
         */

        /**
         * Constructs a new MatchSetup.
         * @memberof userinterface
         * @classdesc Represents a MatchSetup.
         * @implements IMatchSetup
         * @constructor
         * @param {userinterface.IMatchSetup=} [properties] Properties to set
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
         * @memberof userinterface.MatchSetup
         * @instance
         */
        MatchSetup.prototype.players = $util.emptyArray;

        /**
         * Creates a new MatchSetup instance using the specified properties.
         * @function create
         * @memberof userinterface.MatchSetup
         * @static
         * @param {userinterface.IMatchSetup=} [properties] Properties to set
         * @returns {userinterface.MatchSetup} MatchSetup instance
         */
        MatchSetup.create = function create(properties) {
            return new MatchSetup(properties);
        };

        /**
         * Encodes the specified MatchSetup message. Does not implicitly {@link userinterface.MatchSetup.verify|verify} messages.
         * @function encode
         * @memberof userinterface.MatchSetup
         * @static
         * @param {userinterface.IMatchSetup} message MatchSetup message or plain object to encode
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
         * Encodes the specified MatchSetup message, length delimited. Does not implicitly {@link userinterface.MatchSetup.verify|verify} messages.
         * @function encodeDelimited
         * @memberof userinterface.MatchSetup
         * @static
         * @param {userinterface.IMatchSetup} message MatchSetup message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchSetup.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchSetup message from the specified reader or buffer.
         * @function decode
         * @memberof userinterface.MatchSetup
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {userinterface.MatchSetup} MatchSetup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        MatchSetup.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.userinterface.MatchSetup();
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
         * @memberof userinterface.MatchSetup
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {userinterface.MatchSetup} MatchSetup
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
         * @memberof userinterface.MatchSetup
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
         * @memberof userinterface.MatchSetup
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {userinterface.MatchSetup} MatchSetup
         */
        MatchSetup.fromObject = function fromObject(object) {
            if (object instanceof $root.userinterface.MatchSetup)
                return object;
            let message = new $root.userinterface.MatchSetup();
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".userinterface.MatchSetup.players: array expected");
                message.players = [];
                for (let i = 0; i < object.players.length; ++i)
                    message.players[i] = String(object.players[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a MatchSetup message. Also converts values to other types if specified.
         * @function toObject
         * @memberof userinterface.MatchSetup
         * @static
         * @param {userinterface.MatchSetup} message MatchSetup
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
         * @memberof userinterface.MatchSetup
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchSetup.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MatchSetup
         * @function getTypeUrl
         * @memberof userinterface.MatchSetup
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MatchSetup.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/userinterface.MatchSetup";
        };

        return MatchSetup;
    })();

    userinterface.MatchInput = (function() {

        /**
         * Properties of a MatchInput.
         * @memberof userinterface
         * @interface IMatchInput
         * @property {number|null} [paddleId] MatchInput paddleId
         * @property {number|null} [move] MatchInput move
         */

        /**
         * Constructs a new MatchInput.
         * @memberof userinterface
         * @classdesc Represents a MatchInput.
         * @implements IMatchInput
         * @constructor
         * @param {userinterface.IMatchInput=} [properties] Properties to set
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
         * @memberof userinterface.MatchInput
         * @instance
         */
        MatchInput.prototype.paddleId = 0;

        /**
         * MatchInput move.
         * @member {number} move
         * @memberof userinterface.MatchInput
         * @instance
         */
        MatchInput.prototype.move = 0;

        /**
         * Creates a new MatchInput instance using the specified properties.
         * @function create
         * @memberof userinterface.MatchInput
         * @static
         * @param {userinterface.IMatchInput=} [properties] Properties to set
         * @returns {userinterface.MatchInput} MatchInput instance
         */
        MatchInput.create = function create(properties) {
            return new MatchInput(properties);
        };

        /**
         * Encodes the specified MatchInput message. Does not implicitly {@link userinterface.MatchInput.verify|verify} messages.
         * @function encode
         * @memberof userinterface.MatchInput
         * @static
         * @param {userinterface.IMatchInput} message MatchInput message or plain object to encode
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
         * Encodes the specified MatchInput message, length delimited. Does not implicitly {@link userinterface.MatchInput.verify|verify} messages.
         * @function encodeDelimited
         * @memberof userinterface.MatchInput
         * @static
         * @param {userinterface.IMatchInput} message MatchInput message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchInput.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchInput message from the specified reader or buffer.
         * @function decode
         * @memberof userinterface.MatchInput
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {userinterface.MatchInput} MatchInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        MatchInput.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.userinterface.MatchInput();
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
         * @memberof userinterface.MatchInput
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {userinterface.MatchInput} MatchInput
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
         * @memberof userinterface.MatchInput
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
         * @memberof userinterface.MatchInput
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {userinterface.MatchInput} MatchInput
         */
        MatchInput.fromObject = function fromObject(object) {
            if (object instanceof $root.userinterface.MatchInput)
                return object;
            let message = new $root.userinterface.MatchInput();
            if (object.paddleId != null)
                message.paddleId = object.paddleId | 0;
            if (object.move != null)
                message.move = object.move | 0;
            return message;
        };

        /**
         * Creates a plain object from a MatchInput message. Also converts values to other types if specified.
         * @function toObject
         * @memberof userinterface.MatchInput
         * @static
         * @param {userinterface.MatchInput} message MatchInput
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
         * @memberof userinterface.MatchInput
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchInput.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MatchInput
         * @function getTypeUrl
         * @memberof userinterface.MatchInput
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MatchInput.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/userinterface.MatchInput";
        };

        return MatchInput;
    })();

    userinterface.MatchQuit = (function() {

        /**
         * Properties of a MatchQuit.
         * @memberof userinterface
         * @interface IMatchQuit
         * @property {string|null} [uuid] MatchQuit uuid
         */

        /**
         * Constructs a new MatchQuit.
         * @memberof userinterface
         * @classdesc Represents a MatchQuit.
         * @implements IMatchQuit
         * @constructor
         * @param {userinterface.IMatchQuit=} [properties] Properties to set
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
         * @memberof userinterface.MatchQuit
         * @instance
         */
        MatchQuit.prototype.uuid = "";

        /**
         * Creates a new MatchQuit instance using the specified properties.
         * @function create
         * @memberof userinterface.MatchQuit
         * @static
         * @param {userinterface.IMatchQuit=} [properties] Properties to set
         * @returns {userinterface.MatchQuit} MatchQuit instance
         */
        MatchQuit.create = function create(properties) {
            return new MatchQuit(properties);
        };

        /**
         * Encodes the specified MatchQuit message. Does not implicitly {@link userinterface.MatchQuit.verify|verify} messages.
         * @function encode
         * @memberof userinterface.MatchQuit
         * @static
         * @param {userinterface.IMatchQuit} message MatchQuit message or plain object to encode
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
         * Encodes the specified MatchQuit message, length delimited. Does not implicitly {@link userinterface.MatchQuit.verify|verify} messages.
         * @function encodeDelimited
         * @memberof userinterface.MatchQuit
         * @static
         * @param {userinterface.IMatchQuit} message MatchQuit message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchQuit.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchQuit message from the specified reader or buffer.
         * @function decode
         * @memberof userinterface.MatchQuit
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {userinterface.MatchQuit} MatchQuit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        MatchQuit.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.userinterface.MatchQuit();
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
         * @memberof userinterface.MatchQuit
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {userinterface.MatchQuit} MatchQuit
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
         * @memberof userinterface.MatchQuit
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
         * @memberof userinterface.MatchQuit
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {userinterface.MatchQuit} MatchQuit
         */
        MatchQuit.fromObject = function fromObject(object) {
            if (object instanceof $root.userinterface.MatchQuit)
                return object;
            let message = new $root.userinterface.MatchQuit();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            return message;
        };

        /**
         * Creates a plain object from a MatchQuit message. Also converts values to other types if specified.
         * @function toObject
         * @memberof userinterface.MatchQuit
         * @static
         * @param {userinterface.MatchQuit} message MatchQuit
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
         * @memberof userinterface.MatchQuit
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchQuit.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MatchQuit
         * @function getTypeUrl
         * @memberof userinterface.MatchQuit
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MatchQuit.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/userinterface.MatchQuit";
        };

        return MatchQuit;
    })();

    userinterface.MatchStart = (function() {

        /**
         * Properties of a MatchStart.
         * @memberof userinterface
         * @interface IMatchStart
         * @property {string|null} [uuid] MatchStart uuid
         */

        /**
         * Constructs a new MatchStart.
         * @memberof userinterface
         * @classdesc Represents a MatchStart.
         * @implements IMatchStart
         * @constructor
         * @param {userinterface.IMatchStart=} [properties] Properties to set
         */
        function MatchStart(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MatchStart uuid.
         * @member {string} uuid
         * @memberof userinterface.MatchStart
         * @instance
         */
        MatchStart.prototype.uuid = "";

        /**
         * Creates a new MatchStart instance using the specified properties.
         * @function create
         * @memberof userinterface.MatchStart
         * @static
         * @param {userinterface.IMatchStart=} [properties] Properties to set
         * @returns {userinterface.MatchStart} MatchStart instance
         */
        MatchStart.create = function create(properties) {
            return new MatchStart(properties);
        };

        /**
         * Encodes the specified MatchStart message. Does not implicitly {@link userinterface.MatchStart.verify|verify} messages.
         * @function encode
         * @memberof userinterface.MatchStart
         * @static
         * @param {userinterface.IMatchStart} message MatchStart message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchStart.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
            return writer;
        };

        /**
         * Encodes the specified MatchStart message, length delimited. Does not implicitly {@link userinterface.MatchStart.verify|verify} messages.
         * @function encodeDelimited
         * @memberof userinterface.MatchStart
         * @static
         * @param {userinterface.IMatchStart} message MatchStart message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchStart.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchStart message from the specified reader or buffer.
         * @function decode
         * @memberof userinterface.MatchStart
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {userinterface.MatchStart} MatchStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        MatchStart.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.userinterface.MatchStart();
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
         * Decodes a MatchStart message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof userinterface.MatchStart
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {userinterface.MatchStart} MatchStart
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
         * @memberof userinterface.MatchStart
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MatchStart.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            return null;
        };

        /**
         * Creates a MatchStart message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof userinterface.MatchStart
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {userinterface.MatchStart} MatchStart
         */
        MatchStart.fromObject = function fromObject(object) {
            if (object instanceof $root.userinterface.MatchStart)
                return object;
            let message = new $root.userinterface.MatchStart();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            return message;
        };

        /**
         * Creates a plain object from a MatchStart message. Also converts values to other types if specified.
         * @function toObject
         * @memberof userinterface.MatchStart
         * @static
         * @param {userinterface.MatchStart} message MatchStart
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MatchStart.toObject = function toObject(message, options) {
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
         * Converts this MatchStart to JSON.
         * @function toJSON
         * @memberof userinterface.MatchStart
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchStart.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MatchStart
         * @function getTypeUrl
         * @memberof userinterface.MatchStart
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MatchStart.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/userinterface.MatchStart";
        };

        return MatchStart;
    })();

    userinterface.MatchEnd = (function() {

        /**
         * Properties of a MatchEnd.
         * @memberof userinterface
         * @interface IMatchEnd
         * @property {number|null} [winner] MatchEnd winner
         */

        /**
         * Constructs a new MatchEnd.
         * @memberof userinterface
         * @classdesc Represents a MatchEnd.
         * @implements IMatchEnd
         * @constructor
         * @param {userinterface.IMatchEnd=} [properties] Properties to set
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
         * @memberof userinterface.MatchEnd
         * @instance
         */
        MatchEnd.prototype.winner = 0;

        /**
         * Creates a new MatchEnd instance using the specified properties.
         * @function create
         * @memberof userinterface.MatchEnd
         * @static
         * @param {userinterface.IMatchEnd=} [properties] Properties to set
         * @returns {userinterface.MatchEnd} MatchEnd instance
         */
        MatchEnd.create = function create(properties) {
            return new MatchEnd(properties);
        };

        /**
         * Encodes the specified MatchEnd message. Does not implicitly {@link userinterface.MatchEnd.verify|verify} messages.
         * @function encode
         * @memberof userinterface.MatchEnd
         * @static
         * @param {userinterface.IMatchEnd} message MatchEnd message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchEnd.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.winner != null && Object.hasOwnProperty.call(message, "winner"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.winner);
            return writer;
        };

        /**
         * Encodes the specified MatchEnd message, length delimited. Does not implicitly {@link userinterface.MatchEnd.verify|verify} messages.
         * @function encodeDelimited
         * @memberof userinterface.MatchEnd
         * @static
         * @param {userinterface.IMatchEnd} message MatchEnd message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchEnd.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchEnd message from the specified reader or buffer.
         * @function decode
         * @memberof userinterface.MatchEnd
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {userinterface.MatchEnd} MatchEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        MatchEnd.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.userinterface.MatchEnd();
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
         * @memberof userinterface.MatchEnd
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {userinterface.MatchEnd} MatchEnd
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
         * @memberof userinterface.MatchEnd
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
         * @memberof userinterface.MatchEnd
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {userinterface.MatchEnd} MatchEnd
         */
        MatchEnd.fromObject = function fromObject(object) {
            if (object instanceof $root.userinterface.MatchEnd)
                return object;
            let message = new $root.userinterface.MatchEnd();
            if (object.winner != null)
                message.winner = object.winner | 0;
            return message;
        };

        /**
         * Creates a plain object from a MatchEnd message. Also converts values to other types if specified.
         * @function toObject
         * @memberof userinterface.MatchEnd
         * @static
         * @param {userinterface.MatchEnd} message MatchEnd
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
         * @memberof userinterface.MatchEnd
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchEnd.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MatchEnd
         * @function getTypeUrl
         * @memberof userinterface.MatchEnd
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MatchEnd.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/userinterface.MatchEnd";
        };

        return MatchEnd;
    })();

    return userinterface;
})();

export const tournament = $root.tournament = (() => {

    /**
     * Namespace tournament.
     * @exports tournament
     * @namespace
     */
    const tournament = {};

    tournament.Player = (function() {

        /**
         * Properties of a Player.
         * @memberof tournament
         * @interface IPlayer
         * @property {string|null} [uuid] Player uuid
         * @property {boolean|null} [ready] Player ready
         * @property {boolean|null} [connected] Player connected
         * @property {boolean|null} [eliminated] Player eliminated
         */

        /**
         * Constructs a new Player.
         * @memberof tournament
         * @classdesc Represents a Player.
         * @implements IPlayer
         * @constructor
         * @param {tournament.IPlayer=} [properties] Properties to set
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
         * @memberof tournament.Player
         * @instance
         */
        Player.prototype.uuid = "";

        /**
         * Player ready.
         * @member {boolean} ready
         * @memberof tournament.Player
         * @instance
         */
        Player.prototype.ready = false;

        /**
         * Player connected.
         * @member {boolean} connected
         * @memberof tournament.Player
         * @instance
         */
        Player.prototype.connected = false;

        /**
         * Player eliminated.
         * @member {boolean} eliminated
         * @memberof tournament.Player
         * @instance
         */
        Player.prototype.eliminated = false;

        /**
         * Creates a new Player instance using the specified properties.
         * @function create
         * @memberof tournament.Player
         * @static
         * @param {tournament.IPlayer=} [properties] Properties to set
         * @returns {tournament.Player} Player instance
         */
        Player.create = function create(properties) {
            return new Player(properties);
        };

        /**
         * Encodes the specified Player message. Does not implicitly {@link tournament.Player.verify|verify} messages.
         * @function encode
         * @memberof tournament.Player
         * @static
         * @param {tournament.IPlayer} message Player message or plain object to encode
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
            if (message.connected != null && Object.hasOwnProperty.call(message, "connected"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.connected);
            if (message.eliminated != null && Object.hasOwnProperty.call(message, "eliminated"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.eliminated);
            return writer;
        };

        /**
         * Encodes the specified Player message, length delimited. Does not implicitly {@link tournament.Player.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tournament.Player
         * @static
         * @param {tournament.IPlayer} message Player message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        Player.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Player message from the specified reader or buffer.
         * @function decode
         * @memberof tournament.Player
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tournament.Player} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        Player.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tournament.Player();
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
                case 3: {
                        message.connected = reader.bool();
                        break;
                    }
                case 4: {
                        message.eliminated = reader.bool();
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
         * @memberof tournament.Player
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tournament.Player} Player
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
         * @memberof tournament.Player
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
            if (message.connected != null && message.hasOwnProperty("connected"))
                if (typeof message.connected !== "boolean")
                    return "connected: boolean expected";
            if (message.eliminated != null && message.hasOwnProperty("eliminated"))
                if (typeof message.eliminated !== "boolean")
                    return "eliminated: boolean expected";
            return null;
        };

        /**
         * Creates a Player message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tournament.Player
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tournament.Player} Player
         */
        Player.fromObject = function fromObject(object) {
            if (object instanceof $root.tournament.Player)
                return object;
            let message = new $root.tournament.Player();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            if (object.ready != null)
                message.ready = Boolean(object.ready);
            if (object.connected != null)
                message.connected = Boolean(object.connected);
            if (object.eliminated != null)
                message.eliminated = Boolean(object.eliminated);
            return message;
        };

        /**
         * Creates a plain object from a Player message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tournament.Player
         * @static
         * @param {tournament.Player} message Player
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
                object.connected = false;
                object.eliminated = false;
            }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            if (message.ready != null && message.hasOwnProperty("ready"))
                object.ready = message.ready;
            if (message.connected != null && message.hasOwnProperty("connected"))
                object.connected = message.connected;
            if (message.eliminated != null && message.hasOwnProperty("eliminated"))
                object.eliminated = message.eliminated;
            return object;
        };

        /**
         * Converts this Player to JSON.
         * @function toJSON
         * @memberof tournament.Player
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Player.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Player
         * @function getTypeUrl
         * @memberof tournament.Player
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Player.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tournament.Player";
        };

        return Player;
    })();

    tournament.Score = (function() {

        /**
         * Properties of a Score.
         * @memberof tournament
         * @interface IScore
         * @property {Array.<number>|null} [values] Score values
         * @property {boolean|null} [forfeit] Score forfeit
         */

        /**
         * Constructs a new Score.
         * @memberof tournament
         * @classdesc Represents a Score.
         * @implements IScore
         * @constructor
         * @param {tournament.IScore=} [properties] Properties to set
         */
        function Score(properties) {
            this.values = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Score values.
         * @member {Array.<number>} values
         * @memberof tournament.Score
         * @instance
         */
        Score.prototype.values = $util.emptyArray;

        /**
         * Score forfeit.
         * @member {boolean} forfeit
         * @memberof tournament.Score
         * @instance
         */
        Score.prototype.forfeit = false;

        /**
         * Creates a new Score instance using the specified properties.
         * @function create
         * @memberof tournament.Score
         * @static
         * @param {tournament.IScore=} [properties] Properties to set
         * @returns {tournament.Score} Score instance
         */
        Score.create = function create(properties) {
            return new Score(properties);
        };

        /**
         * Encodes the specified Score message. Does not implicitly {@link tournament.Score.verify|verify} messages.
         * @function encode
         * @memberof tournament.Score
         * @static
         * @param {tournament.IScore} message Score message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        Score.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.values != null && message.values.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (let i = 0; i < message.values.length; ++i)
                    writer.int32(message.values[i]);
                writer.ldelim();
            }
            if (message.forfeit != null && Object.hasOwnProperty.call(message, "forfeit"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.forfeit);
            return writer;
        };

        /**
         * Encodes the specified Score message, length delimited. Does not implicitly {@link tournament.Score.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tournament.Score
         * @static
         * @param {tournament.IScore} message Score message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        Score.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Score message from the specified reader or buffer.
         * @function decode
         * @memberof tournament.Score
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tournament.Score} Score
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        Score.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tournament.Score();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.values && message.values.length))
                            message.values = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.values.push(reader.int32());
                        } else
                            message.values.push(reader.int32());
                        break;
                    }
                case 2: {
                        message.forfeit = reader.bool();
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
         * Decodes a Score message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tournament.Score
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tournament.Score} Score
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        Score.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Score message.
         * @function verify
         * @memberof tournament.Score
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Score.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.values != null && message.hasOwnProperty("values")) {
                if (!Array.isArray(message.values))
                    return "values: array expected";
                for (let i = 0; i < message.values.length; ++i)
                    if (!$util.isInteger(message.values[i]))
                        return "values: integer[] expected";
            }
            if (message.forfeit != null && message.hasOwnProperty("forfeit"))
                if (typeof message.forfeit !== "boolean")
                    return "forfeit: boolean expected";
            return null;
        };

        /**
         * Creates a Score message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tournament.Score
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tournament.Score} Score
         */
        Score.fromObject = function fromObject(object) {
            if (object instanceof $root.tournament.Score)
                return object;
            let message = new $root.tournament.Score();
            if (object.values) {
                if (!Array.isArray(object.values))
                    throw TypeError(".tournament.Score.values: array expected");
                message.values = [];
                for (let i = 0; i < object.values.length; ++i)
                    message.values[i] = object.values[i] | 0;
            }
            if (object.forfeit != null)
                message.forfeit = Boolean(object.forfeit);
            return message;
        };

        /**
         * Creates a plain object from a Score message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tournament.Score
         * @static
         * @param {tournament.Score} message Score
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Score.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.values = [];
            if (options.defaults)
                object.forfeit = false;
            if (message.values && message.values.length) {
                object.values = [];
                for (let j = 0; j < message.values.length; ++j)
                    object.values[j] = message.values[j];
            }
            if (message.forfeit != null && message.hasOwnProperty("forfeit"))
                object.forfeit = message.forfeit;
            return object;
        };

        /**
         * Converts this Score to JSON.
         * @function toJSON
         * @memberof tournament.Score
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Score.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Score
         * @function getTypeUrl
         * @memberof tournament.Score
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Score.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tournament.Score";
        };

        return Score;
    })();

    tournament.MatchNode = (function() {

        /**
         * Properties of a MatchNode.
         * @memberof tournament
         * @interface IMatchNode
         * @property {string|null} [player1Id] MatchNode player1Id
         * @property {string|null} [player2Id] MatchNode player2Id
         * @property {tournament.IScore|null} [score] MatchNode score
         * @property {string|null} [gameId] MatchNode gameId
         * @property {tournament.IMatchNode|null} [left] MatchNode left
         * @property {tournament.IMatchNode|null} [right] MatchNode right
         * @property {string|null} [winnerId] MatchNode winnerId
         */

        /**
         * Constructs a new MatchNode.
         * @memberof tournament
         * @classdesc Represents a MatchNode.
         * @implements IMatchNode
         * @constructor
         * @param {tournament.IMatchNode=} [properties] Properties to set
         */
        function MatchNode(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MatchNode player1Id.
         * @member {string} player1Id
         * @memberof tournament.MatchNode
         * @instance
         */
        MatchNode.prototype.player1Id = "";

        /**
         * MatchNode player2Id.
         * @member {string} player2Id
         * @memberof tournament.MatchNode
         * @instance
         */
        MatchNode.prototype.player2Id = "";

        /**
         * MatchNode score.
         * @member {tournament.IScore|null|undefined} score
         * @memberof tournament.MatchNode
         * @instance
         */
        MatchNode.prototype.score = null;

        /**
         * MatchNode gameId.
         * @member {string} gameId
         * @memberof tournament.MatchNode
         * @instance
         */
        MatchNode.prototype.gameId = "";

        /**
         * MatchNode left.
         * @member {tournament.IMatchNode|null|undefined} left
         * @memberof tournament.MatchNode
         * @instance
         */
        MatchNode.prototype.left = null;

        /**
         * MatchNode right.
         * @member {tournament.IMatchNode|null|undefined} right
         * @memberof tournament.MatchNode
         * @instance
         */
        MatchNode.prototype.right = null;

        /**
         * MatchNode winnerId.
         * @member {string} winnerId
         * @memberof tournament.MatchNode
         * @instance
         */
        MatchNode.prototype.winnerId = "";

        /**
         * Creates a new MatchNode instance using the specified properties.
         * @function create
         * @memberof tournament.MatchNode
         * @static
         * @param {tournament.IMatchNode=} [properties] Properties to set
         * @returns {tournament.MatchNode} MatchNode instance
         */
        MatchNode.create = function create(properties) {
            return new MatchNode(properties);
        };

        /**
         * Encodes the specified MatchNode message. Does not implicitly {@link tournament.MatchNode.verify|verify} messages.
         * @function encode
         * @memberof tournament.MatchNode
         * @static
         * @param {tournament.IMatchNode} message MatchNode message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchNode.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.player1Id != null && Object.hasOwnProperty.call(message, "player1Id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.player1Id);
            if (message.player2Id != null && Object.hasOwnProperty.call(message, "player2Id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.player2Id);
            if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                $root.tournament.Score.encode(message.score, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.gameId);
            if (message.left != null && Object.hasOwnProperty.call(message, "left"))
                $root.tournament.MatchNode.encode(message.left, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.right != null && Object.hasOwnProperty.call(message, "right"))
                $root.tournament.MatchNode.encode(message.right, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.winnerId != null && Object.hasOwnProperty.call(message, "winnerId"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.winnerId);
            return writer;
        };

        /**
         * Encodes the specified MatchNode message, length delimited. Does not implicitly {@link tournament.MatchNode.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tournament.MatchNode
         * @static
         * @param {tournament.IMatchNode} message MatchNode message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        MatchNode.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchNode message from the specified reader or buffer.
         * @function decode
         * @memberof tournament.MatchNode
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tournament.MatchNode} MatchNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        MatchNode.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tournament.MatchNode();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.player1Id = reader.string();
                        break;
                    }
                case 2: {
                        message.player2Id = reader.string();
                        break;
                    }
                case 3: {
                        message.score = $root.tournament.Score.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.gameId = reader.string();
                        break;
                    }
                case 5: {
                        message.left = $root.tournament.MatchNode.decode(reader, reader.uint32());
                        break;
                    }
                case 6: {
                        message.right = $root.tournament.MatchNode.decode(reader, reader.uint32());
                        break;
                    }
                case 7: {
                        message.winnerId = reader.string();
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
         * Decodes a MatchNode message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tournament.MatchNode
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tournament.MatchNode} MatchNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        MatchNode.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MatchNode message.
         * @function verify
         * @memberof tournament.MatchNode
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MatchNode.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.player1Id != null && message.hasOwnProperty("player1Id"))
                if (!$util.isString(message.player1Id))
                    return "player1Id: string expected";
            if (message.player2Id != null && message.hasOwnProperty("player2Id"))
                if (!$util.isString(message.player2Id))
                    return "player2Id: string expected";
            if (message.score != null && message.hasOwnProperty("score")) {
                let error = $root.tournament.Score.verify(message.score);
                if (error)
                    return "score." + error;
            }
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isString(message.gameId))
                    return "gameId: string expected";
            if (message.left != null && message.hasOwnProperty("left")) {
                let error = $root.tournament.MatchNode.verify(message.left);
                if (error)
                    return "left." + error;
            }
            if (message.right != null && message.hasOwnProperty("right")) {
                let error = $root.tournament.MatchNode.verify(message.right);
                if (error)
                    return "right." + error;
            }
            if (message.winnerId != null && message.hasOwnProperty("winnerId"))
                if (!$util.isString(message.winnerId))
                    return "winnerId: string expected";
            return null;
        };

        /**
         * Creates a MatchNode message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tournament.MatchNode
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tournament.MatchNode} MatchNode
         */
        MatchNode.fromObject = function fromObject(object) {
            if (object instanceof $root.tournament.MatchNode)
                return object;
            let message = new $root.tournament.MatchNode();
            if (object.player1Id != null)
                message.player1Id = String(object.player1Id);
            if (object.player2Id != null)
                message.player2Id = String(object.player2Id);
            if (object.score != null) {
                if (typeof object.score !== "object")
                    throw TypeError(".tournament.MatchNode.score: object expected");
                message.score = $root.tournament.Score.fromObject(object.score);
            }
            if (object.gameId != null)
                message.gameId = String(object.gameId);
            if (object.left != null) {
                if (typeof object.left !== "object")
                    throw TypeError(".tournament.MatchNode.left: object expected");
                message.left = $root.tournament.MatchNode.fromObject(object.left);
            }
            if (object.right != null) {
                if (typeof object.right !== "object")
                    throw TypeError(".tournament.MatchNode.right: object expected");
                message.right = $root.tournament.MatchNode.fromObject(object.right);
            }
            if (object.winnerId != null)
                message.winnerId = String(object.winnerId);
            return message;
        };

        /**
         * Creates a plain object from a MatchNode message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tournament.MatchNode
         * @static
         * @param {tournament.MatchNode} message MatchNode
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MatchNode.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.player1Id = "";
                object.player2Id = "";
                object.score = null;
                object.gameId = "";
                object.left = null;
                object.right = null;
                object.winnerId = "";
            }
            if (message.player1Id != null && message.hasOwnProperty("player1Id"))
                object.player1Id = message.player1Id;
            if (message.player2Id != null && message.hasOwnProperty("player2Id"))
                object.player2Id = message.player2Id;
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = $root.tournament.Score.toObject(message.score, options);
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.left != null && message.hasOwnProperty("left"))
                object.left = $root.tournament.MatchNode.toObject(message.left, options);
            if (message.right != null && message.hasOwnProperty("right"))
                object.right = $root.tournament.MatchNode.toObject(message.right, options);
            if (message.winnerId != null && message.hasOwnProperty("winnerId"))
                object.winnerId = message.winnerId;
            return object;
        };

        /**
         * Converts this MatchNode to JSON.
         * @function toJSON
         * @memberof tournament.MatchNode
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchNode.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MatchNode
         * @function getTypeUrl
         * @memberof tournament.MatchNode
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MatchNode.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tournament.MatchNode";
        };

        return MatchNode;
    })();

    tournament.TournamentUpdateMessage = (function() {

        /**
         * Properties of a TournamentUpdateMessage.
         * @memberof tournament
         * @interface ITournamentUpdateMessage
         * @property {tournament.IMatchNode|null} [tournamentRoot] TournamentUpdateMessage tournamentRoot
         * @property {Array.<tournament.IPlayer>|null} [players] TournamentUpdateMessage players
         */

        /**
         * Constructs a new TournamentUpdateMessage.
         * @memberof tournament
         * @classdesc Represents a TournamentUpdateMessage.
         * @implements ITournamentUpdateMessage
         * @constructor
         * @param {tournament.ITournamentUpdateMessage=} [properties] Properties to set
         */
        function TournamentUpdateMessage(properties) {
            this.players = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TournamentUpdateMessage tournamentRoot.
         * @member {tournament.IMatchNode|null|undefined} tournamentRoot
         * @memberof tournament.TournamentUpdateMessage
         * @instance
         */
        TournamentUpdateMessage.prototype.tournamentRoot = null;

        /**
         * TournamentUpdateMessage players.
         * @member {Array.<tournament.IPlayer>} players
         * @memberof tournament.TournamentUpdateMessage
         * @instance
         */
        TournamentUpdateMessage.prototype.players = $util.emptyArray;

        /**
         * Creates a new TournamentUpdateMessage instance using the specified properties.
         * @function create
         * @memberof tournament.TournamentUpdateMessage
         * @static
         * @param {tournament.ITournamentUpdateMessage=} [properties] Properties to set
         * @returns {tournament.TournamentUpdateMessage} TournamentUpdateMessage instance
         */
        TournamentUpdateMessage.create = function create(properties) {
            return new TournamentUpdateMessage(properties);
        };

        /**
         * Encodes the specified TournamentUpdateMessage message. Does not implicitly {@link tournament.TournamentUpdateMessage.verify|verify} messages.
         * @function encode
         * @memberof tournament.TournamentUpdateMessage
         * @static
         * @param {tournament.ITournamentUpdateMessage} message TournamentUpdateMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentUpdateMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.tournamentRoot != null && Object.hasOwnProperty.call(message, "tournamentRoot"))
                $root.tournament.MatchNode.encode(message.tournamentRoot, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.players != null && message.players.length)
                for (let i = 0; i < message.players.length; ++i)
                    $root.tournament.Player.encode(message.players[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TournamentUpdateMessage message, length delimited. Does not implicitly {@link tournament.TournamentUpdateMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tournament.TournamentUpdateMessage
         * @static
         * @param {tournament.ITournamentUpdateMessage} message TournamentUpdateMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentUpdateMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TournamentUpdateMessage message from the specified reader or buffer.
         * @function decode
         * @memberof tournament.TournamentUpdateMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tournament.TournamentUpdateMessage} TournamentUpdateMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentUpdateMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tournament.TournamentUpdateMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.tournamentRoot = $root.tournament.MatchNode.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        if (!(message.players && message.players.length))
                            message.players = [];
                        message.players.push($root.tournament.Player.decode(reader, reader.uint32()));
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
         * Decodes a TournamentUpdateMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tournament.TournamentUpdateMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tournament.TournamentUpdateMessage} TournamentUpdateMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentUpdateMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TournamentUpdateMessage message.
         * @function verify
         * @memberof tournament.TournamentUpdateMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TournamentUpdateMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.tournamentRoot != null && message.hasOwnProperty("tournamentRoot")) {
                let error = $root.tournament.MatchNode.verify(message.tournamentRoot);
                if (error)
                    return "tournamentRoot." + error;
            }
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!Array.isArray(message.players))
                    return "players: array expected";
                for (let i = 0; i < message.players.length; ++i) {
                    let error = $root.tournament.Player.verify(message.players[i]);
                    if (error)
                        return "players." + error;
                }
            }
            return null;
        };

        /**
         * Creates a TournamentUpdateMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tournament.TournamentUpdateMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tournament.TournamentUpdateMessage} TournamentUpdateMessage
         */
        TournamentUpdateMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.tournament.TournamentUpdateMessage)
                return object;
            let message = new $root.tournament.TournamentUpdateMessage();
            if (object.tournamentRoot != null) {
                if (typeof object.tournamentRoot !== "object")
                    throw TypeError(".tournament.TournamentUpdateMessage.tournamentRoot: object expected");
                message.tournamentRoot = $root.tournament.MatchNode.fromObject(object.tournamentRoot);
            }
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".tournament.TournamentUpdateMessage.players: array expected");
                message.players = [];
                for (let i = 0; i < object.players.length; ++i) {
                    if (typeof object.players[i] !== "object")
                        throw TypeError(".tournament.TournamentUpdateMessage.players: object expected");
                    message.players[i] = $root.tournament.Player.fromObject(object.players[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a TournamentUpdateMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tournament.TournamentUpdateMessage
         * @static
         * @param {tournament.TournamentUpdateMessage} message TournamentUpdateMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TournamentUpdateMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.players = [];
            if (options.defaults)
                object.tournamentRoot = null;
            if (message.tournamentRoot != null && message.hasOwnProperty("tournamentRoot"))
                object.tournamentRoot = $root.tournament.MatchNode.toObject(message.tournamentRoot, options);
            if (message.players && message.players.length) {
                object.players = [];
                for (let j = 0; j < message.players.length; ++j)
                    object.players[j] = $root.tournament.Player.toObject(message.players[j], options);
            }
            return object;
        };

        /**
         * Converts this TournamentUpdateMessage to JSON.
         * @function toJSON
         * @memberof tournament.TournamentUpdateMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TournamentUpdateMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TournamentUpdateMessage
         * @function getTypeUrl
         * @memberof tournament.TournamentUpdateMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TournamentUpdateMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tournament.TournamentUpdateMessage";
        };

        return TournamentUpdateMessage;
    })();

    tournament.TournamentClientReadyMessage = (function() {

        /**
         * Properties of a TournamentClientReadyMessage.
         * @memberof tournament
         * @interface ITournamentClientReadyMessage
         */

        /**
         * Constructs a new TournamentClientReadyMessage.
         * @memberof tournament
         * @classdesc Represents a TournamentClientReadyMessage.
         * @implements ITournamentClientReadyMessage
         * @constructor
         * @param {tournament.ITournamentClientReadyMessage=} [properties] Properties to set
         */
        function TournamentClientReadyMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new TournamentClientReadyMessage instance using the specified properties.
         * @function create
         * @memberof tournament.TournamentClientReadyMessage
         * @static
         * @param {tournament.ITournamentClientReadyMessage=} [properties] Properties to set
         * @returns {tournament.TournamentClientReadyMessage} TournamentClientReadyMessage instance
         */
        TournamentClientReadyMessage.create = function create(properties) {
            return new TournamentClientReadyMessage(properties);
        };

        /**
         * Encodes the specified TournamentClientReadyMessage message. Does not implicitly {@link tournament.TournamentClientReadyMessage.verify|verify} messages.
         * @function encode
         * @memberof tournament.TournamentClientReadyMessage
         * @static
         * @param {tournament.ITournamentClientReadyMessage} message TournamentClientReadyMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentClientReadyMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified TournamentClientReadyMessage message, length delimited. Does not implicitly {@link tournament.TournamentClientReadyMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tournament.TournamentClientReadyMessage
         * @static
         * @param {tournament.ITournamentClientReadyMessage} message TournamentClientReadyMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentClientReadyMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TournamentClientReadyMessage message from the specified reader or buffer.
         * @function decode
         * @memberof tournament.TournamentClientReadyMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tournament.TournamentClientReadyMessage} TournamentClientReadyMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentClientReadyMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tournament.TournamentClientReadyMessage();
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
         * Decodes a TournamentClientReadyMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tournament.TournamentClientReadyMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tournament.TournamentClientReadyMessage} TournamentClientReadyMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentClientReadyMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TournamentClientReadyMessage message.
         * @function verify
         * @memberof tournament.TournamentClientReadyMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TournamentClientReadyMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a TournamentClientReadyMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tournament.TournamentClientReadyMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tournament.TournamentClientReadyMessage} TournamentClientReadyMessage
         */
        TournamentClientReadyMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.tournament.TournamentClientReadyMessage)
                return object;
            return new $root.tournament.TournamentClientReadyMessage();
        };

        /**
         * Creates a plain object from a TournamentClientReadyMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tournament.TournamentClientReadyMessage
         * @static
         * @param {tournament.TournamentClientReadyMessage} message TournamentClientReadyMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TournamentClientReadyMessage.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this TournamentClientReadyMessage to JSON.
         * @function toJSON
         * @memberof tournament.TournamentClientReadyMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TournamentClientReadyMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TournamentClientReadyMessage
         * @function getTypeUrl
         * @memberof tournament.TournamentClientReadyMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TournamentClientReadyMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tournament.TournamentClientReadyMessage";
        };

        return TournamentClientReadyMessage;
    })();

    tournament.TournamentReadyCheckMessage = (function() {

        /**
         * Properties of a TournamentReadyCheckMessage.
         * @memberof tournament
         * @interface ITournamentReadyCheckMessage
         * @property {number|Long|null} [deadlineMs] TournamentReadyCheckMessage deadlineMs
         */

        /**
         * Constructs a new TournamentReadyCheckMessage.
         * @memberof tournament
         * @classdesc Represents a TournamentReadyCheckMessage.
         * @implements ITournamentReadyCheckMessage
         * @constructor
         * @param {tournament.ITournamentReadyCheckMessage=} [properties] Properties to set
         */
        function TournamentReadyCheckMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TournamentReadyCheckMessage deadlineMs.
         * @member {number|Long} deadlineMs
         * @memberof tournament.TournamentReadyCheckMessage
         * @instance
         */
        TournamentReadyCheckMessage.prototype.deadlineMs = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new TournamentReadyCheckMessage instance using the specified properties.
         * @function create
         * @memberof tournament.TournamentReadyCheckMessage
         * @static
         * @param {tournament.ITournamentReadyCheckMessage=} [properties] Properties to set
         * @returns {tournament.TournamentReadyCheckMessage} TournamentReadyCheckMessage instance
         */
        TournamentReadyCheckMessage.create = function create(properties) {
            return new TournamentReadyCheckMessage(properties);
        };

        /**
         * Encodes the specified TournamentReadyCheckMessage message. Does not implicitly {@link tournament.TournamentReadyCheckMessage.verify|verify} messages.
         * @function encode
         * @memberof tournament.TournamentReadyCheckMessage
         * @static
         * @param {tournament.ITournamentReadyCheckMessage} message TournamentReadyCheckMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentReadyCheckMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.deadlineMs != null && Object.hasOwnProperty.call(message, "deadlineMs"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.deadlineMs);
            return writer;
        };

        /**
         * Encodes the specified TournamentReadyCheckMessage message, length delimited. Does not implicitly {@link tournament.TournamentReadyCheckMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tournament.TournamentReadyCheckMessage
         * @static
         * @param {tournament.ITournamentReadyCheckMessage} message TournamentReadyCheckMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentReadyCheckMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TournamentReadyCheckMessage message from the specified reader or buffer.
         * @function decode
         * @memberof tournament.TournamentReadyCheckMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tournament.TournamentReadyCheckMessage} TournamentReadyCheckMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentReadyCheckMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tournament.TournamentReadyCheckMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.deadlineMs = reader.int64();
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
         * Decodes a TournamentReadyCheckMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tournament.TournamentReadyCheckMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tournament.TournamentReadyCheckMessage} TournamentReadyCheckMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentReadyCheckMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TournamentReadyCheckMessage message.
         * @function verify
         * @memberof tournament.TournamentReadyCheckMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TournamentReadyCheckMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.deadlineMs != null && message.hasOwnProperty("deadlineMs"))
                if (!$util.isInteger(message.deadlineMs) && !(message.deadlineMs && $util.isInteger(message.deadlineMs.low) && $util.isInteger(message.deadlineMs.high)))
                    return "deadlineMs: integer|Long expected";
            return null;
        };

        /**
         * Creates a TournamentReadyCheckMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tournament.TournamentReadyCheckMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tournament.TournamentReadyCheckMessage} TournamentReadyCheckMessage
         */
        TournamentReadyCheckMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.tournament.TournamentReadyCheckMessage)
                return object;
            let message = new $root.tournament.TournamentReadyCheckMessage();
            if (object.deadlineMs != null)
                if ($util.Long)
                    (message.deadlineMs = $util.Long.fromValue(object.deadlineMs)).unsigned = false;
                else if (typeof object.deadlineMs === "string")
                    message.deadlineMs = parseInt(object.deadlineMs, 10);
                else if (typeof object.deadlineMs === "number")
                    message.deadlineMs = object.deadlineMs;
                else if (typeof object.deadlineMs === "object")
                    message.deadlineMs = new $util.LongBits(object.deadlineMs.low >>> 0, object.deadlineMs.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a TournamentReadyCheckMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tournament.TournamentReadyCheckMessage
         * @static
         * @param {tournament.TournamentReadyCheckMessage} message TournamentReadyCheckMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TournamentReadyCheckMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.deadlineMs = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.deadlineMs = options.longs === String ? "0" : 0;
            if (message.deadlineMs != null && message.hasOwnProperty("deadlineMs"))
                if (typeof message.deadlineMs === "number")
                    object.deadlineMs = options.longs === String ? String(message.deadlineMs) : message.deadlineMs;
                else
                    object.deadlineMs = options.longs === String ? $util.Long.prototype.toString.call(message.deadlineMs) : options.longs === Number ? new $util.LongBits(message.deadlineMs.low >>> 0, message.deadlineMs.high >>> 0).toNumber() : message.deadlineMs;
            return object;
        };

        /**
         * Converts this TournamentReadyCheckMessage to JSON.
         * @function toJSON
         * @memberof tournament.TournamentReadyCheckMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TournamentReadyCheckMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TournamentReadyCheckMessage
         * @function getTypeUrl
         * @memberof tournament.TournamentReadyCheckMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TournamentReadyCheckMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tournament.TournamentReadyCheckMessage";
        };

        return TournamentReadyCheckMessage;
    })();

    tournament.TournamentFinishedMessage = (function() {

        /**
         * Properties of a TournamentFinishedMessage.
         * @memberof tournament
         * @interface ITournamentFinishedMessage
         */

        /**
         * Constructs a new TournamentFinishedMessage.
         * @memberof tournament
         * @classdesc Represents a TournamentFinishedMessage.
         * @implements ITournamentFinishedMessage
         * @constructor
         * @param {tournament.ITournamentFinishedMessage=} [properties] Properties to set
         */
        function TournamentFinishedMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new TournamentFinishedMessage instance using the specified properties.
         * @function create
         * @memberof tournament.TournamentFinishedMessage
         * @static
         * @param {tournament.ITournamentFinishedMessage=} [properties] Properties to set
         * @returns {tournament.TournamentFinishedMessage} TournamentFinishedMessage instance
         */
        TournamentFinishedMessage.create = function create(properties) {
            return new TournamentFinishedMessage(properties);
        };

        /**
         * Encodes the specified TournamentFinishedMessage message. Does not implicitly {@link tournament.TournamentFinishedMessage.verify|verify} messages.
         * @function encode
         * @memberof tournament.TournamentFinishedMessage
         * @static
         * @param {tournament.ITournamentFinishedMessage} message TournamentFinishedMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentFinishedMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified TournamentFinishedMessage message, length delimited. Does not implicitly {@link tournament.TournamentFinishedMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tournament.TournamentFinishedMessage
         * @static
         * @param {tournament.ITournamentFinishedMessage} message TournamentFinishedMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentFinishedMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TournamentFinishedMessage message from the specified reader or buffer.
         * @function decode
         * @memberof tournament.TournamentFinishedMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tournament.TournamentFinishedMessage} TournamentFinishedMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentFinishedMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tournament.TournamentFinishedMessage();
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
         * Decodes a TournamentFinishedMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tournament.TournamentFinishedMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tournament.TournamentFinishedMessage} TournamentFinishedMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentFinishedMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TournamentFinishedMessage message.
         * @function verify
         * @memberof tournament.TournamentFinishedMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TournamentFinishedMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a TournamentFinishedMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tournament.TournamentFinishedMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tournament.TournamentFinishedMessage} TournamentFinishedMessage
         */
        TournamentFinishedMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.tournament.TournamentFinishedMessage)
                return object;
            return new $root.tournament.TournamentFinishedMessage();
        };

        /**
         * Creates a plain object from a TournamentFinishedMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tournament.TournamentFinishedMessage
         * @static
         * @param {tournament.TournamentFinishedMessage} message TournamentFinishedMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TournamentFinishedMessage.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this TournamentFinishedMessage to JSON.
         * @function toJSON
         * @memberof tournament.TournamentFinishedMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TournamentFinishedMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TournamentFinishedMessage
         * @function getTypeUrl
         * @memberof tournament.TournamentFinishedMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TournamentFinishedMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tournament.TournamentFinishedMessage";
        };

        return TournamentFinishedMessage;
    })();

    tournament.TournamentQuitMessage = (function() {

        /**
         * Properties of a TournamentQuitMessage.
         * @memberof tournament
         * @interface ITournamentQuitMessage
         */

        /**
         * Constructs a new TournamentQuitMessage.
         * @memberof tournament
         * @classdesc Represents a TournamentQuitMessage.
         * @implements ITournamentQuitMessage
         * @constructor
         * @param {tournament.ITournamentQuitMessage=} [properties] Properties to set
         */
        function TournamentQuitMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new TournamentQuitMessage instance using the specified properties.
         * @function create
         * @memberof tournament.TournamentQuitMessage
         * @static
         * @param {tournament.ITournamentQuitMessage=} [properties] Properties to set
         * @returns {tournament.TournamentQuitMessage} TournamentQuitMessage instance
         */
        TournamentQuitMessage.create = function create(properties) {
            return new TournamentQuitMessage(properties);
        };

        /**
         * Encodes the specified TournamentQuitMessage message. Does not implicitly {@link tournament.TournamentQuitMessage.verify|verify} messages.
         * @function encode
         * @memberof tournament.TournamentQuitMessage
         * @static
         * @param {tournament.ITournamentQuitMessage} message TournamentQuitMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentQuitMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified TournamentQuitMessage message, length delimited. Does not implicitly {@link tournament.TournamentQuitMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tournament.TournamentQuitMessage
         * @static
         * @param {tournament.ITournamentQuitMessage} message TournamentQuitMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentQuitMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TournamentQuitMessage message from the specified reader or buffer.
         * @function decode
         * @memberof tournament.TournamentQuitMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tournament.TournamentQuitMessage} TournamentQuitMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentQuitMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tournament.TournamentQuitMessage();
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
         * Decodes a TournamentQuitMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tournament.TournamentQuitMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tournament.TournamentQuitMessage} TournamentQuitMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentQuitMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TournamentQuitMessage message.
         * @function verify
         * @memberof tournament.TournamentQuitMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TournamentQuitMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a TournamentQuitMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tournament.TournamentQuitMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tournament.TournamentQuitMessage} TournamentQuitMessage
         */
        TournamentQuitMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.tournament.TournamentQuitMessage)
                return object;
            return new $root.tournament.TournamentQuitMessage();
        };

        /**
         * Creates a plain object from a TournamentQuitMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tournament.TournamentQuitMessage
         * @static
         * @param {tournament.TournamentQuitMessage} message TournamentQuitMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TournamentQuitMessage.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this TournamentQuitMessage to JSON.
         * @function toJSON
         * @memberof tournament.TournamentQuitMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TournamentQuitMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TournamentQuitMessage
         * @function getTypeUrl
         * @memberof tournament.TournamentQuitMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TournamentQuitMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tournament.TournamentQuitMessage";
        };

        return TournamentQuitMessage;
    })();

    tournament.TournamentErrorMessage = (function() {

        /**
         * Properties of a TournamentErrorMessage.
         * @memberof tournament
         * @interface ITournamentErrorMessage
         * @property {string|null} [message] TournamentErrorMessage message
         */

        /**
         * Constructs a new TournamentErrorMessage.
         * @memberof tournament
         * @classdesc Represents a TournamentErrorMessage.
         * @implements ITournamentErrorMessage
         * @constructor
         * @param {tournament.ITournamentErrorMessage=} [properties] Properties to set
         */
        function TournamentErrorMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TournamentErrorMessage message.
         * @member {string} message
         * @memberof tournament.TournamentErrorMessage
         * @instance
         */
        TournamentErrorMessage.prototype.message = "";

        /**
         * Creates a new TournamentErrorMessage instance using the specified properties.
         * @function create
         * @memberof tournament.TournamentErrorMessage
         * @static
         * @param {tournament.ITournamentErrorMessage=} [properties] Properties to set
         * @returns {tournament.TournamentErrorMessage} TournamentErrorMessage instance
         */
        TournamentErrorMessage.create = function create(properties) {
            return new TournamentErrorMessage(properties);
        };

        /**
         * Encodes the specified TournamentErrorMessage message. Does not implicitly {@link tournament.TournamentErrorMessage.verify|verify} messages.
         * @function encode
         * @memberof tournament.TournamentErrorMessage
         * @static
         * @param {tournament.ITournamentErrorMessage} message TournamentErrorMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentErrorMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.message);
            return writer;
        };

        /**
         * Encodes the specified TournamentErrorMessage message, length delimited. Does not implicitly {@link tournament.TournamentErrorMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tournament.TournamentErrorMessage
         * @static
         * @param {tournament.ITournamentErrorMessage} message TournamentErrorMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentErrorMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TournamentErrorMessage message from the specified reader or buffer.
         * @function decode
         * @memberof tournament.TournamentErrorMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tournament.TournamentErrorMessage} TournamentErrorMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentErrorMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tournament.TournamentErrorMessage();
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
         * Decodes a TournamentErrorMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tournament.TournamentErrorMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tournament.TournamentErrorMessage} TournamentErrorMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentErrorMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TournamentErrorMessage message.
         * @function verify
         * @memberof tournament.TournamentErrorMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TournamentErrorMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            return null;
        };

        /**
         * Creates a TournamentErrorMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tournament.TournamentErrorMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tournament.TournamentErrorMessage} TournamentErrorMessage
         */
        TournamentErrorMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.tournament.TournamentErrorMessage)
                return object;
            let message = new $root.tournament.TournamentErrorMessage();
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a TournamentErrorMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tournament.TournamentErrorMessage
         * @static
         * @param {tournament.TournamentErrorMessage} message TournamentErrorMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TournamentErrorMessage.toObject = function toObject(message, options) {
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
         * Converts this TournamentErrorMessage to JSON.
         * @function toJSON
         * @memberof tournament.TournamentErrorMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TournamentErrorMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TournamentErrorMessage
         * @function getTypeUrl
         * @memberof tournament.TournamentErrorMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TournamentErrorMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tournament.TournamentErrorMessage";
        };

        return TournamentErrorMessage;
    })();

    tournament.TournamentCreateRequest = (function() {

        /**
         * Properties of a TournamentCreateRequest.
         * @memberof tournament
         * @interface ITournamentCreateRequest
         * @property {Array.<string>|null} [players] TournamentCreateRequest players
         */

        /**
         * Constructs a new TournamentCreateRequest.
         * @memberof tournament
         * @classdesc Represents a TournamentCreateRequest.
         * @implements ITournamentCreateRequest
         * @constructor
         * @param {tournament.ITournamentCreateRequest=} [properties] Properties to set
         */
        function TournamentCreateRequest(properties) {
            this.players = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TournamentCreateRequest players.
         * @member {Array.<string>} players
         * @memberof tournament.TournamentCreateRequest
         * @instance
         */
        TournamentCreateRequest.prototype.players = $util.emptyArray;

        /**
         * Creates a new TournamentCreateRequest instance using the specified properties.
         * @function create
         * @memberof tournament.TournamentCreateRequest
         * @static
         * @param {tournament.ITournamentCreateRequest=} [properties] Properties to set
         * @returns {tournament.TournamentCreateRequest} TournamentCreateRequest instance
         */
        TournamentCreateRequest.create = function create(properties) {
            return new TournamentCreateRequest(properties);
        };

        /**
         * Encodes the specified TournamentCreateRequest message. Does not implicitly {@link tournament.TournamentCreateRequest.verify|verify} messages.
         * @function encode
         * @memberof tournament.TournamentCreateRequest
         * @static
         * @param {tournament.ITournamentCreateRequest} message TournamentCreateRequest message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentCreateRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.players != null && message.players.length)
                for (let i = 0; i < message.players.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.players[i]);
            return writer;
        };

        /**
         * Encodes the specified TournamentCreateRequest message, length delimited. Does not implicitly {@link tournament.TournamentCreateRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tournament.TournamentCreateRequest
         * @static
         * @param {tournament.ITournamentCreateRequest} message TournamentCreateRequest message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentCreateRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TournamentCreateRequest message from the specified reader or buffer.
         * @function decode
         * @memberof tournament.TournamentCreateRequest
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tournament.TournamentCreateRequest} TournamentCreateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentCreateRequest.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tournament.TournamentCreateRequest();
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
         * Decodes a TournamentCreateRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tournament.TournamentCreateRequest
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tournament.TournamentCreateRequest} TournamentCreateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentCreateRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TournamentCreateRequest message.
         * @function verify
         * @memberof tournament.TournamentCreateRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TournamentCreateRequest.verify = function verify(message) {
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
         * Creates a TournamentCreateRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tournament.TournamentCreateRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tournament.TournamentCreateRequest} TournamentCreateRequest
         */
        TournamentCreateRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.tournament.TournamentCreateRequest)
                return object;
            let message = new $root.tournament.TournamentCreateRequest();
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".tournament.TournamentCreateRequest.players: array expected");
                message.players = [];
                for (let i = 0; i < object.players.length; ++i)
                    message.players[i] = String(object.players[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a TournamentCreateRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tournament.TournamentCreateRequest
         * @static
         * @param {tournament.TournamentCreateRequest} message TournamentCreateRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TournamentCreateRequest.toObject = function toObject(message, options) {
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
         * Converts this TournamentCreateRequest to JSON.
         * @function toJSON
         * @memberof tournament.TournamentCreateRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TournamentCreateRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TournamentCreateRequest
         * @function getTypeUrl
         * @memberof tournament.TournamentCreateRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TournamentCreateRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tournament.TournamentCreateRequest";
        };

        return TournamentCreateRequest;
    })();

    tournament.TournamentCreateResponse = (function() {

        /**
         * Properties of a TournamentCreateResponse.
         * @memberof tournament
         * @interface ITournamentCreateResponse
         * @property {string|null} [tournamentId] TournamentCreateResponse tournamentId
         */

        /**
         * Constructs a new TournamentCreateResponse.
         * @memberof tournament
         * @classdesc Represents a TournamentCreateResponse.
         * @implements ITournamentCreateResponse
         * @constructor
         * @param {tournament.ITournamentCreateResponse=} [properties] Properties to set
         */
        function TournamentCreateResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TournamentCreateResponse tournamentId.
         * @member {string} tournamentId
         * @memberof tournament.TournamentCreateResponse
         * @instance
         */
        TournamentCreateResponse.prototype.tournamentId = "";

        /**
         * Creates a new TournamentCreateResponse instance using the specified properties.
         * @function create
         * @memberof tournament.TournamentCreateResponse
         * @static
         * @param {tournament.ITournamentCreateResponse=} [properties] Properties to set
         * @returns {tournament.TournamentCreateResponse} TournamentCreateResponse instance
         */
        TournamentCreateResponse.create = function create(properties) {
            return new TournamentCreateResponse(properties);
        };

        /**
         * Encodes the specified TournamentCreateResponse message. Does not implicitly {@link tournament.TournamentCreateResponse.verify|verify} messages.
         * @function encode
         * @memberof tournament.TournamentCreateResponse
         * @static
         * @param {tournament.ITournamentCreateResponse} message TournamentCreateResponse message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentCreateResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.tournamentId != null && Object.hasOwnProperty.call(message, "tournamentId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.tournamentId);
            return writer;
        };

        /**
         * Encodes the specified TournamentCreateResponse message, length delimited. Does not implicitly {@link tournament.TournamentCreateResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tournament.TournamentCreateResponse
         * @static
         * @param {tournament.ITournamentCreateResponse} message TournamentCreateResponse message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentCreateResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TournamentCreateResponse message from the specified reader or buffer.
         * @function decode
         * @memberof tournament.TournamentCreateResponse
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tournament.TournamentCreateResponse} TournamentCreateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentCreateResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tournament.TournamentCreateResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.tournamentId = reader.string();
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
         * Decodes a TournamentCreateResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tournament.TournamentCreateResponse
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tournament.TournamentCreateResponse} TournamentCreateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentCreateResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TournamentCreateResponse message.
         * @function verify
         * @memberof tournament.TournamentCreateResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TournamentCreateResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.tournamentId != null && message.hasOwnProperty("tournamentId"))
                if (!$util.isString(message.tournamentId))
                    return "tournamentId: string expected";
            return null;
        };

        /**
         * Creates a TournamentCreateResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tournament.TournamentCreateResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tournament.TournamentCreateResponse} TournamentCreateResponse
         */
        TournamentCreateResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.tournament.TournamentCreateResponse)
                return object;
            let message = new $root.tournament.TournamentCreateResponse();
            if (object.tournamentId != null)
                message.tournamentId = String(object.tournamentId);
            return message;
        };

        /**
         * Creates a plain object from a TournamentCreateResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tournament.TournamentCreateResponse
         * @static
         * @param {tournament.TournamentCreateResponse} message TournamentCreateResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TournamentCreateResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.tournamentId = "";
            if (message.tournamentId != null && message.hasOwnProperty("tournamentId"))
                object.tournamentId = message.tournamentId;
            return object;
        };

        /**
         * Converts this TournamentCreateResponse to JSON.
         * @function toJSON
         * @memberof tournament.TournamentCreateResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TournamentCreateResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TournamentCreateResponse
         * @function getTypeUrl
         * @memberof tournament.TournamentCreateResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TournamentCreateResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tournament.TournamentCreateResponse";
        };

        return TournamentCreateResponse;
    })();

    tournament.TournamentClientMessage = (function() {

        /**
         * Properties of a TournamentClientMessage.
         * @memberof tournament
         * @interface ITournamentClientMessage
         * @property {tournament.ITournamentQuitMessage|null} [quit] TournamentClientMessage quit
         * @property {tournament.ITournamentClientReadyMessage|null} [ready] TournamentClientMessage ready
         */

        /**
         * Constructs a new TournamentClientMessage.
         * @memberof tournament
         * @classdesc Represents a TournamentClientMessage.
         * @implements ITournamentClientMessage
         * @constructor
         * @param {tournament.ITournamentClientMessage=} [properties] Properties to set
         */
        function TournamentClientMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TournamentClientMessage quit.
         * @member {tournament.ITournamentQuitMessage|null|undefined} quit
         * @memberof tournament.TournamentClientMessage
         * @instance
         */
        TournamentClientMessage.prototype.quit = null;

        /**
         * TournamentClientMessage ready.
         * @member {tournament.ITournamentClientReadyMessage|null|undefined} ready
         * @memberof tournament.TournamentClientMessage
         * @instance
         */
        TournamentClientMessage.prototype.ready = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * TournamentClientMessage payload.
         * @member {"quit"|"ready"|undefined} payload
         * @memberof tournament.TournamentClientMessage
         * @instance
         */
        Object.defineProperty(TournamentClientMessage.prototype, "payload", {
            get: $util.oneOfGetter($oneOfFields = ["quit", "ready"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new TournamentClientMessage instance using the specified properties.
         * @function create
         * @memberof tournament.TournamentClientMessage
         * @static
         * @param {tournament.ITournamentClientMessage=} [properties] Properties to set
         * @returns {tournament.TournamentClientMessage} TournamentClientMessage instance
         */
        TournamentClientMessage.create = function create(properties) {
            return new TournamentClientMessage(properties);
        };

        /**
         * Encodes the specified TournamentClientMessage message. Does not implicitly {@link tournament.TournamentClientMessage.verify|verify} messages.
         * @function encode
         * @memberof tournament.TournamentClientMessage
         * @static
         * @param {tournament.ITournamentClientMessage} message TournamentClientMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentClientMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.quit != null && Object.hasOwnProperty.call(message, "quit"))
                $root.tournament.TournamentQuitMessage.encode(message.quit, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.ready != null && Object.hasOwnProperty.call(message, "ready"))
                $root.tournament.TournamentClientReadyMessage.encode(message.ready, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TournamentClientMessage message, length delimited. Does not implicitly {@link tournament.TournamentClientMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tournament.TournamentClientMessage
         * @static
         * @param {tournament.ITournamentClientMessage} message TournamentClientMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentClientMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TournamentClientMessage message from the specified reader or buffer.
         * @function decode
         * @memberof tournament.TournamentClientMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tournament.TournamentClientMessage} TournamentClientMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentClientMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tournament.TournamentClientMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.quit = $root.tournament.TournamentQuitMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.ready = $root.tournament.TournamentClientReadyMessage.decode(reader, reader.uint32());
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
         * Decodes a TournamentClientMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tournament.TournamentClientMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tournament.TournamentClientMessage} TournamentClientMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentClientMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TournamentClientMessage message.
         * @function verify
         * @memberof tournament.TournamentClientMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TournamentClientMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.quit != null && message.hasOwnProperty("quit")) {
                properties.payload = 1;
                {
                    let error = $root.tournament.TournamentQuitMessage.verify(message.quit);
                    if (error)
                        return "quit." + error;
                }
            }
            if (message.ready != null && message.hasOwnProperty("ready")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.tournament.TournamentClientReadyMessage.verify(message.ready);
                    if (error)
                        return "ready." + error;
                }
            }
            return null;
        };

        /**
         * Creates a TournamentClientMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tournament.TournamentClientMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tournament.TournamentClientMessage} TournamentClientMessage
         */
        TournamentClientMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.tournament.TournamentClientMessage)
                return object;
            let message = new $root.tournament.TournamentClientMessage();
            if (object.quit != null) {
                if (typeof object.quit !== "object")
                    throw TypeError(".tournament.TournamentClientMessage.quit: object expected");
                message.quit = $root.tournament.TournamentQuitMessage.fromObject(object.quit);
            }
            if (object.ready != null) {
                if (typeof object.ready !== "object")
                    throw TypeError(".tournament.TournamentClientMessage.ready: object expected");
                message.ready = $root.tournament.TournamentClientReadyMessage.fromObject(object.ready);
            }
            return message;
        };

        /**
         * Creates a plain object from a TournamentClientMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tournament.TournamentClientMessage
         * @static
         * @param {tournament.TournamentClientMessage} message TournamentClientMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TournamentClientMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.quit != null && message.hasOwnProperty("quit")) {
                object.quit = $root.tournament.TournamentQuitMessage.toObject(message.quit, options);
                if (options.oneofs)
                    object.payload = "quit";
            }
            if (message.ready != null && message.hasOwnProperty("ready")) {
                object.ready = $root.tournament.TournamentClientReadyMessage.toObject(message.ready, options);
                if (options.oneofs)
                    object.payload = "ready";
            }
            return object;
        };

        /**
         * Converts this TournamentClientMessage to JSON.
         * @function toJSON
         * @memberof tournament.TournamentClientMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TournamentClientMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TournamentClientMessage
         * @function getTypeUrl
         * @memberof tournament.TournamentClientMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TournamentClientMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tournament.TournamentClientMessage";
        };

        return TournamentClientMessage;
    })();

    tournament.TournamentStartGameMessage = (function() {

        /**
         * Properties of a TournamentStartGameMessage.
         * @memberof tournament
         * @interface ITournamentStartGameMessage
         * @property {string|null} [gameId] TournamentStartGameMessage gameId
         */

        /**
         * Constructs a new TournamentStartGameMessage.
         * @memberof tournament
         * @classdesc Represents a TournamentStartGameMessage.
         * @implements ITournamentStartGameMessage
         * @constructor
         * @param {tournament.ITournamentStartGameMessage=} [properties] Properties to set
         */
        function TournamentStartGameMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TournamentStartGameMessage gameId.
         * @member {string} gameId
         * @memberof tournament.TournamentStartGameMessage
         * @instance
         */
        TournamentStartGameMessage.prototype.gameId = "";

        /**
         * Creates a new TournamentStartGameMessage instance using the specified properties.
         * @function create
         * @memberof tournament.TournamentStartGameMessage
         * @static
         * @param {tournament.ITournamentStartGameMessage=} [properties] Properties to set
         * @returns {tournament.TournamentStartGameMessage} TournamentStartGameMessage instance
         */
        TournamentStartGameMessage.create = function create(properties) {
            return new TournamentStartGameMessage(properties);
        };

        /**
         * Encodes the specified TournamentStartGameMessage message. Does not implicitly {@link tournament.TournamentStartGameMessage.verify|verify} messages.
         * @function encode
         * @memberof tournament.TournamentStartGameMessage
         * @static
         * @param {tournament.ITournamentStartGameMessage} message TournamentStartGameMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentStartGameMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.gameId);
            return writer;
        };

        /**
         * Encodes the specified TournamentStartGameMessage message, length delimited. Does not implicitly {@link tournament.TournamentStartGameMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tournament.TournamentStartGameMessage
         * @static
         * @param {tournament.ITournamentStartGameMessage} message TournamentStartGameMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentStartGameMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TournamentStartGameMessage message from the specified reader or buffer.
         * @function decode
         * @memberof tournament.TournamentStartGameMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tournament.TournamentStartGameMessage} TournamentStartGameMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentStartGameMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tournament.TournamentStartGameMessage();
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
         * Decodes a TournamentStartGameMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tournament.TournamentStartGameMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tournament.TournamentStartGameMessage} TournamentStartGameMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentStartGameMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TournamentStartGameMessage message.
         * @function verify
         * @memberof tournament.TournamentStartGameMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TournamentStartGameMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isString(message.gameId))
                    return "gameId: string expected";
            return null;
        };

        /**
         * Creates a TournamentStartGameMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tournament.TournamentStartGameMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tournament.TournamentStartGameMessage} TournamentStartGameMessage
         */
        TournamentStartGameMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.tournament.TournamentStartGameMessage)
                return object;
            let message = new $root.tournament.TournamentStartGameMessage();
            if (object.gameId != null)
                message.gameId = String(object.gameId);
            return message;
        };

        /**
         * Creates a plain object from a TournamentStartGameMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tournament.TournamentStartGameMessage
         * @static
         * @param {tournament.TournamentStartGameMessage} message TournamentStartGameMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TournamentStartGameMessage.toObject = function toObject(message, options) {
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
         * Converts this TournamentStartGameMessage to JSON.
         * @function toJSON
         * @memberof tournament.TournamentStartGameMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TournamentStartGameMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TournamentStartGameMessage
         * @function getTypeUrl
         * @memberof tournament.TournamentStartGameMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TournamentStartGameMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tournament.TournamentStartGameMessage";
        };

        return TournamentStartGameMessage;
    })();

    tournament.TournamentServerMessage = (function() {

        /**
         * Properties of a TournamentServerMessage.
         * @memberof tournament
         * @interface ITournamentServerMessage
         * @property {tournament.ITournamentUpdateMessage|null} [update] TournamentServerMessage update
         * @property {tournament.ITournamentErrorMessage|null} [error] TournamentServerMessage error
         * @property {tournament.ITournamentReadyCheckMessage|null} [readyCheck] TournamentServerMessage readyCheck
         * @property {tournament.ITournamentStartGameMessage|null} [startGame] TournamentServerMessage startGame
         */

        /**
         * Constructs a new TournamentServerMessage.
         * @memberof tournament
         * @classdesc Represents a TournamentServerMessage.
         * @implements ITournamentServerMessage
         * @constructor
         * @param {tournament.ITournamentServerMessage=} [properties] Properties to set
         */
        function TournamentServerMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TournamentServerMessage update.
         * @member {tournament.ITournamentUpdateMessage|null|undefined} update
         * @memberof tournament.TournamentServerMessage
         * @instance
         */
        TournamentServerMessage.prototype.update = null;

        /**
         * TournamentServerMessage error.
         * @member {tournament.ITournamentErrorMessage|null|undefined} error
         * @memberof tournament.TournamentServerMessage
         * @instance
         */
        TournamentServerMessage.prototype.error = null;

        /**
         * TournamentServerMessage readyCheck.
         * @member {tournament.ITournamentReadyCheckMessage|null|undefined} readyCheck
         * @memberof tournament.TournamentServerMessage
         * @instance
         */
        TournamentServerMessage.prototype.readyCheck = null;

        /**
         * TournamentServerMessage startGame.
         * @member {tournament.ITournamentStartGameMessage|null|undefined} startGame
         * @memberof tournament.TournamentServerMessage
         * @instance
         */
        TournamentServerMessage.prototype.startGame = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * TournamentServerMessage payload.
         * @member {"update"|"error"|"readyCheck"|"startGame"|undefined} payload
         * @memberof tournament.TournamentServerMessage
         * @instance
         */
        Object.defineProperty(TournamentServerMessage.prototype, "payload", {
            get: $util.oneOfGetter($oneOfFields = ["update", "error", "readyCheck", "startGame"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new TournamentServerMessage instance using the specified properties.
         * @function create
         * @memberof tournament.TournamentServerMessage
         * @static
         * @param {tournament.ITournamentServerMessage=} [properties] Properties to set
         * @returns {tournament.TournamentServerMessage} TournamentServerMessage instance
         */
        TournamentServerMessage.create = function create(properties) {
            return new TournamentServerMessage(properties);
        };

        /**
         * Encodes the specified TournamentServerMessage message. Does not implicitly {@link tournament.TournamentServerMessage.verify|verify} messages.
         * @function encode
         * @memberof tournament.TournamentServerMessage
         * @static
         * @param {tournament.ITournamentServerMessage} message TournamentServerMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentServerMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.update != null && Object.hasOwnProperty.call(message, "update"))
                $root.tournament.TournamentUpdateMessage.encode(message.update, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.tournament.TournamentErrorMessage.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.readyCheck != null && Object.hasOwnProperty.call(message, "readyCheck"))
                $root.tournament.TournamentReadyCheckMessage.encode(message.readyCheck, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.startGame != null && Object.hasOwnProperty.call(message, "startGame"))
                $root.tournament.TournamentStartGameMessage.encode(message.startGame, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TournamentServerMessage message, length delimited. Does not implicitly {@link tournament.TournamentServerMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tournament.TournamentServerMessage
         * @static
         * @param {tournament.ITournamentServerMessage} message TournamentServerMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        TournamentServerMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TournamentServerMessage message from the specified reader or buffer.
         * @function decode
         * @memberof tournament.TournamentServerMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tournament.TournamentServerMessage} TournamentServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentServerMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tournament.TournamentServerMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.update = $root.tournament.TournamentUpdateMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.error = $root.tournament.TournamentErrorMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.readyCheck = $root.tournament.TournamentReadyCheckMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.startGame = $root.tournament.TournamentStartGameMessage.decode(reader, reader.uint32());
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
         * Decodes a TournamentServerMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tournament.TournamentServerMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tournament.TournamentServerMessage} TournamentServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        TournamentServerMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TournamentServerMessage message.
         * @function verify
         * @memberof tournament.TournamentServerMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TournamentServerMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.update != null && message.hasOwnProperty("update")) {
                properties.payload = 1;
                {
                    let error = $root.tournament.TournamentUpdateMessage.verify(message.update);
                    if (error)
                        return "update." + error;
                }
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.tournament.TournamentErrorMessage.verify(message.error);
                    if (error)
                        return "error." + error;
                }
            }
            if (message.readyCheck != null && message.hasOwnProperty("readyCheck")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.tournament.TournamentReadyCheckMessage.verify(message.readyCheck);
                    if (error)
                        return "readyCheck." + error;
                }
            }
            if (message.startGame != null && message.hasOwnProperty("startGame")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.tournament.TournamentStartGameMessage.verify(message.startGame);
                    if (error)
                        return "startGame." + error;
                }
            }
            return null;
        };

        /**
         * Creates a TournamentServerMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tournament.TournamentServerMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tournament.TournamentServerMessage} TournamentServerMessage
         */
        TournamentServerMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.tournament.TournamentServerMessage)
                return object;
            let message = new $root.tournament.TournamentServerMessage();
            if (object.update != null) {
                if (typeof object.update !== "object")
                    throw TypeError(".tournament.TournamentServerMessage.update: object expected");
                message.update = $root.tournament.TournamentUpdateMessage.fromObject(object.update);
            }
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".tournament.TournamentServerMessage.error: object expected");
                message.error = $root.tournament.TournamentErrorMessage.fromObject(object.error);
            }
            if (object.readyCheck != null) {
                if (typeof object.readyCheck !== "object")
                    throw TypeError(".tournament.TournamentServerMessage.readyCheck: object expected");
                message.readyCheck = $root.tournament.TournamentReadyCheckMessage.fromObject(object.readyCheck);
            }
            if (object.startGame != null) {
                if (typeof object.startGame !== "object")
                    throw TypeError(".tournament.TournamentServerMessage.startGame: object expected");
                message.startGame = $root.tournament.TournamentStartGameMessage.fromObject(object.startGame);
            }
            return message;
        };

        /**
         * Creates a plain object from a TournamentServerMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tournament.TournamentServerMessage
         * @static
         * @param {tournament.TournamentServerMessage} message TournamentServerMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TournamentServerMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.update != null && message.hasOwnProperty("update")) {
                object.update = $root.tournament.TournamentUpdateMessage.toObject(message.update, options);
                if (options.oneofs)
                    object.payload = "update";
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                object.error = $root.tournament.TournamentErrorMessage.toObject(message.error, options);
                if (options.oneofs)
                    object.payload = "error";
            }
            if (message.readyCheck != null && message.hasOwnProperty("readyCheck")) {
                object.readyCheck = $root.tournament.TournamentReadyCheckMessage.toObject(message.readyCheck, options);
                if (options.oneofs)
                    object.payload = "readyCheck";
            }
            if (message.startGame != null && message.hasOwnProperty("startGame")) {
                object.startGame = $root.tournament.TournamentStartGameMessage.toObject(message.startGame, options);
                if (options.oneofs)
                    object.payload = "startGame";
            }
            return object;
        };

        /**
         * Converts this TournamentServerMessage to JSON.
         * @function toJSON
         * @memberof tournament.TournamentServerMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TournamentServerMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TournamentServerMessage
         * @function getTypeUrl
         * @memberof tournament.TournamentServerMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TournamentServerMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tournament.TournamentServerMessage";
        };

        return TournamentServerMessage;
    })();

    return tournament;
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
         * @property {string|null} [map] UpdateMessage map
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
         * UpdateMessage map.
         * @member {string} map
         * @memberof lobby.UpdateMessage
         * @instance
         */
        UpdateMessage.prototype.map = "";

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
            if (message.map != null && Object.hasOwnProperty.call(message, "map"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.map);
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
                case 5: {
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
            if (message.map != null && message.hasOwnProperty("map"))
                if (!$util.isString(message.map))
                    return "map: string expected";
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
            if (object.map != null)
                message.map = String(object.map);
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
                object.map = "";
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
            if (message.map != null && message.hasOwnProperty("map"))
                object.map = message.map;
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
