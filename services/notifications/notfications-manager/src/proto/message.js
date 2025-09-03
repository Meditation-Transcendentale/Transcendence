/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal.js";

// Common aliases
const $Reader = $protobuf.default.Reader, $Writer = $protobuf.default.Writer, $util = $protobuf.default.util;

// Exported root namespace
const $root = $protobuf.default.roots || ($protobuf.default.roots = {});

export const notif = $root.notif = (() => {

    /**
     * Namespace notif.
     * @exports notif
     * @namespace
     */
    const notif = {};

    notif.Friend = (function() {

        /**
         * Properties of a Friend.
         * @memberof notif
         * @interface IFriend
         * @property {string|null} [sender] Friend sender
         */

        /**
         * Constructs a new Friend.
         * @memberof notif
         * @classdesc Represents a Friend.
         * @implements IFriend
         * @constructor
         * @param {notif.IFriend=} [properties] Properties to set
         */
        function Friend(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Friend sender.
         * @member {string} sender
         * @memberof notif.Friend
         * @instance
         */
        Friend.prototype.sender = "";

        /**
         * Creates a new Friend instance using the specified properties.
         * @function create
         * @memberof notif.Friend
         * @static
         * @param {notif.IFriend=} [properties] Properties to set
         * @returns {notif.Friend} Friend instance
         */
        Friend.create = function create(properties) {
            return new Friend(properties);
        };

        /**
         * Encodes the specified Friend message. Does not implicitly {@link notif.Friend.verify|verify} messages.
         * @function encode
         * @memberof notif.Friend
         * @static
         * @param {notif.IFriend} message Friend message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        Friend.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.sender != null && Object.hasOwnProperty.call(message, "sender"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.sender);
            return writer;
        };

        /**
         * Encodes the specified Friend message, length delimited. Does not implicitly {@link notif.Friend.verify|verify} messages.
         * @function encodeDelimited
         * @memberof notif.Friend
         * @static
         * @param {notif.IFriend} message Friend message or plain object to encode
         * @param {$protobuf.default.Writer} [writer] Writer to encode to
         * @returns {$protobuf.default.Writer} Writer
         */
        Friend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Friend message from the specified reader or buffer.
         * @function decode
         * @memberof notif.Friend
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {notif.Friend} Friend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        Friend.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.notif.Friend();
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
         * Decodes a Friend message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof notif.Friend
         * @static
         * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {notif.Friend} Friend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        Friend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Friend message.
         * @function verify
         * @memberof notif.Friend
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Friend.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.sender != null && message.hasOwnProperty("sender"))
                if (!$util.isString(message.sender))
                    return "sender: string expected";
            return null;
        };

        /**
         * Creates a Friend message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof notif.Friend
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {notif.Friend} Friend
         */
        Friend.fromObject = function fromObject(object) {
            if (object instanceof $root.notif.Friend)
                return object;
            let message = new $root.notif.Friend();
            if (object.sender != null)
                message.sender = String(object.sender);
            return message;
        };

        /**
         * Creates a plain object from a Friend message. Also converts values to other types if specified.
         * @function toObject
         * @memberof notif.Friend
         * @static
         * @param {notif.Friend} message Friend
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Friend.toObject = function toObject(message, options) {
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
         * Converts this Friend to JSON.
         * @function toJSON
         * @memberof notif.Friend
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Friend.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Friend
         * @function getTypeUrl
         * @memberof notif.Friend
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Friend.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/notif.Friend";
        };

        return Friend;
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
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.status);
            if (message.option != null && Object.hasOwnProperty.call(message, "option"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.option);
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
                        message.status = reader.string();
                        break;
                    }
                case 2: {
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
                object.status = "";
                object.option = "";
            }
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

    return notif;
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

export { $root as default };
