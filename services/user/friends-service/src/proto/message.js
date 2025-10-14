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
         * @property {notif.IFriendUpdate|null} [friendRemove] NotificationMessage friendRemove
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

        /**
         * NotificationMessage friendRemove.
         * @member {notif.IFriendUpdate|null|undefined} friendRemove
         * @memberof notif.NotificationMessage
         * @instance
         */
        NotificationMessage.prototype.friendRemove = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * NotificationMessage payload.
         * @member {"friendRequest"|"friendAccept"|"gameInvite"|"statusUpdate"|"friendRemove"|undefined} payload
         * @memberof notif.NotificationMessage
         * @instance
         */
        Object.defineProperty(NotificationMessage.prototype, "payload", {
            get: $util.oneOfGetter($oneOfFields = ["friendRequest", "friendAccept", "gameInvite", "statusUpdate", "friendRemove"]),
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
            if (message.friendRemove != null && Object.hasOwnProperty.call(message, "friendRemove"))
                $root.notif.FriendUpdate.encode(message.friendRemove, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
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
                case 5: {
                        message.friendRemove = $root.notif.FriendUpdate.decode(reader, reader.uint32());
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
            if (message.friendRemove != null && message.hasOwnProperty("friendRemove")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.notif.FriendUpdate.verify(message.friendRemove);
                    if (error)
                        return "friendRemove." + error;
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
            if (object.friendRemove != null) {
                if (typeof object.friendRemove !== "object")
                    throw TypeError(".notif.NotificationMessage.friendRemove: object expected");
                message.friendRemove = $root.notif.FriendUpdate.fromObject(object.friendRemove);
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
            if (message.friendRemove != null && message.hasOwnProperty("friendRemove")) {
                object.friendRemove = $root.notif.FriendUpdate.toObject(message.friendRemove, options);
                if (options.oneofs)
                    object.payload = "friendRemove";
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
