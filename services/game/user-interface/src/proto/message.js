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
            if (message.move != null && Object.hasOwnProperty.call(message, "move"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.move);
            if (message.offset != null && Object.hasOwnProperty.call(message, "offset"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.offset);
            if (message.dead != null && Object.hasOwnProperty.call(message, "dead"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.dead);
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
                        message.move = reader.int32();
                        break;
                    }
                case 3: {
                        message.offset = reader.float();
                        break;
                    }
                case 4: {
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
                object.move = 0;
                object.offset = 0;
                object.dead = false;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
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

    userinterface.GameEndMessage = (function() {

        /**
         * Properties of a GameEndMessage.
         * @memberof userinterface
         * @interface IGameEndMessage
         * @property {Array.<number>|null} [score] GameEndMessage score
         */

        /**
         * Constructs a new GameEndMessage.
         * @memberof userinterface
         * @classdesc Represents a GameEndMessage.
         * @implements IGameEndMessage
         * @constructor
         * @param {userinterface.IGameEndMessage=} [properties] Properties to set
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
         * @memberof userinterface.GameEndMessage
         * @instance
         */
        GameEndMessage.prototype.score = $util.emptyArray;

        /**
         * Creates a new GameEndMessage instance using the specified properties.
         * @function create
         * @memberof userinterface.GameEndMessage
         * @static
         * @param {userinterface.IGameEndMessage=} [properties] Properties to set
         * @returns {userinterface.GameEndMessage} GameEndMessage instance
         */
        GameEndMessage.create = function create(properties) {
            return new GameEndMessage(properties);
        };

        /**
         * Encodes the specified GameEndMessage message. Does not implicitly {@link userinterface.GameEndMessage.verify|verify} messages.
         * @function encode
         * @memberof userinterface.GameEndMessage
         * @static
         * @param {userinterface.IGameEndMessage} message GameEndMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
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
         * Encodes the specified GameEndMessage message, length delimited. Does not implicitly {@link userinterface.GameEndMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof userinterface.GameEndMessage
         * @static
         * @param {userinterface.IGameEndMessage} message GameEndMessage message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        GameEndMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameEndMessage message from the specified reader or buffer.
         * @function decode
         * @memberof userinterface.GameEndMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {userinterface.GameEndMessage} GameEndMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        GameEndMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.userinterface.GameEndMessage();
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
         * @memberof userinterface.GameEndMessage
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {userinterface.GameEndMessage} GameEndMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        GameEndMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameEndMessage message.
         * @function verify
         * @memberof userinterface.GameEndMessage
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
         * @memberof userinterface.GameEndMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {userinterface.GameEndMessage} GameEndMessage
         */
        GameEndMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.userinterface.GameEndMessage)
                return object;
            let message = new $root.userinterface.GameEndMessage();
            if (object.score) {
                if (!Array.isArray(object.score))
                    throw TypeError(".userinterface.GameEndMessage.score: array expected");
                message.score = [];
                for (let i = 0; i < object.score.length; ++i)
                    message.score[i] = object.score[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a GameEndMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof userinterface.GameEndMessage
         * @static
         * @param {userinterface.GameEndMessage} message GameEndMessage
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
         * @memberof userinterface.GameEndMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameEndMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GameEndMessage
         * @function getTypeUrl
         * @memberof userinterface.GameEndMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GameEndMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/userinterface.GameEndMessage";
        };

        return GameEndMessage;
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
         * @property {userinterface.IGameEndMessage|null} [end] ServerMessage end
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
         * @member {userinterface.IGameEndMessage|null|undefined} end
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
                $root.userinterface.GameEndMessage.encode(message.end, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
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
                        message.end = $root.userinterface.GameEndMessage.decode(reader, reader.uint32());
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
                    let error = $root.userinterface.GameEndMessage.verify(message.end);
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
                message.end = $root.userinterface.GameEndMessage.fromObject(object.end);
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
                object.end = $root.userinterface.GameEndMessage.toObject(message.end, options);
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

export { $root as default };
