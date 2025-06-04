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
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
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
        PhysicsResponse.prototype.tick = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

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
            return writer;
        };

        /**
         * Encodes the specified PhysicsResponse message, length delimited. Does not implicitly {@link shared.PhysicsResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof shared.PhysicsResponse
         * @static
         * @param {shared.IPhysicsResponse} message PhysicsResponse message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        PhysicsResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PhysicsResponse message from the specified reader or buffer.
         * @function decode
         * @memberof shared.PhysicsResponse
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {shared.PhysicsResponse} PhysicsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
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
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {shared.PhysicsResponse} PhysicsResponse
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
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
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

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * ServerMessage payload.
         * @member {"start"|"update"|"error"|undefined} payload
         * @memberof lobby.ServerMessage
         * @instance
         */
        Object.defineProperty(ServerMessage.prototype, "payload", {
            get: $util.oneOfGetter($oneOfFields = ["start", "update", "error"]),
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

export { $root as default };
