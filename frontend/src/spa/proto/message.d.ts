import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace notif. */
export namespace notif {

    /** Properties of a FriendUpdate. */
    interface IFriendUpdate {

        /** FriendUpdate sender */
        sender?: (string|null);
    }

    /** Represents a FriendUpdate. */
    class FriendUpdate implements IFriendUpdate {

        /**
         * Constructs a new FriendUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: notif.IFriendUpdate);

        /** FriendUpdate sender. */
        public sender: string;

        /**
         * Creates a new FriendUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns FriendUpdate instance
         */
        public static create(properties?: notif.IFriendUpdate): notif.FriendUpdate;

        /**
         * Encodes the specified FriendUpdate message. Does not implicitly {@link notif.FriendUpdate.verify|verify} messages.
         * @param message FriendUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: notif.IFriendUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified FriendUpdate message, length delimited. Does not implicitly {@link notif.FriendUpdate.verify|verify} messages.
         * @param message FriendUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: notif.IFriendUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FriendUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FriendUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): notif.FriendUpdate;

        /**
         * Decodes a FriendUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns FriendUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): notif.FriendUpdate;

        /**
         * Verifies a FriendUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a FriendUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns FriendUpdate
         */
        public static fromObject(object: { [k: string]: any }): notif.FriendUpdate;

        /**
         * Creates a plain object from a FriendUpdate message. Also converts values to other types if specified.
         * @param message FriendUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: notif.FriendUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this FriendUpdate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for FriendUpdate
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GameInvite. */
    interface IGameInvite {

        /** GameInvite sender */
        sender?: (string|null);

        /** GameInvite lobbyid */
        lobbyid?: (string|null);
    }

    /** Represents a GameInvite. */
    class GameInvite implements IGameInvite {

        /**
         * Constructs a new GameInvite.
         * @param [properties] Properties to set
         */
        constructor(properties?: notif.IGameInvite);

        /** GameInvite sender. */
        public sender: string;

        /** GameInvite lobbyid. */
        public lobbyid: string;

        /**
         * Creates a new GameInvite instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameInvite instance
         */
        public static create(properties?: notif.IGameInvite): notif.GameInvite;

        /**
         * Encodes the specified GameInvite message. Does not implicitly {@link notif.GameInvite.verify|verify} messages.
         * @param message GameInvite message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: notif.IGameInvite, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameInvite message, length delimited. Does not implicitly {@link notif.GameInvite.verify|verify} messages.
         * @param message GameInvite message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: notif.IGameInvite, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameInvite message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameInvite
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): notif.GameInvite;

        /**
         * Decodes a GameInvite message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameInvite
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): notif.GameInvite;

        /**
         * Verifies a GameInvite message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameInvite message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameInvite
         */
        public static fromObject(object: { [k: string]: any }): notif.GameInvite;

        /**
         * Creates a plain object from a GameInvite message. Also converts values to other types if specified.
         * @param message GameInvite
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: notif.GameInvite, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameInvite to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GameInvite
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a StatusUpdate. */
    interface IStatusUpdate {

        /** StatusUpdate sender */
        sender?: (string|null);

        /** StatusUpdate status */
        status?: (string|null);

        /** StatusUpdate option */
        option?: (string|null);
    }

    /** Represents a StatusUpdate. */
    class StatusUpdate implements IStatusUpdate {

        /**
         * Constructs a new StatusUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: notif.IStatusUpdate);

        /** StatusUpdate sender. */
        public sender: string;

        /** StatusUpdate status. */
        public status: string;

        /** StatusUpdate option. */
        public option: string;

        /**
         * Creates a new StatusUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StatusUpdate instance
         */
        public static create(properties?: notif.IStatusUpdate): notif.StatusUpdate;

        /**
         * Encodes the specified StatusUpdate message. Does not implicitly {@link notif.StatusUpdate.verify|verify} messages.
         * @param message StatusUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: notif.IStatusUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StatusUpdate message, length delimited. Does not implicitly {@link notif.StatusUpdate.verify|verify} messages.
         * @param message StatusUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: notif.IStatusUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StatusUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StatusUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): notif.StatusUpdate;

        /**
         * Decodes a StatusUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StatusUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): notif.StatusUpdate;

        /**
         * Verifies a StatusUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StatusUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StatusUpdate
         */
        public static fromObject(object: { [k: string]: any }): notif.StatusUpdate;

        /**
         * Creates a plain object from a StatusUpdate message. Also converts values to other types if specified.
         * @param message StatusUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: notif.StatusUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StatusUpdate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for StatusUpdate
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a NotificationMessage. */
    interface INotificationMessage {

        /** NotificationMessage friendRequest */
        friendRequest?: (notif.IFriendUpdate|null);

        /** NotificationMessage friendAccept */
        friendAccept?: (notif.IFriendUpdate|null);

        /** NotificationMessage gameInvite */
        gameInvite?: (notif.IGameInvite|null);

        /** NotificationMessage statusUpdate */
        statusUpdate?: (notif.IStatusUpdate|null);
    }

    /** Represents a NotificationMessage. */
    class NotificationMessage implements INotificationMessage {

        /**
         * Constructs a new NotificationMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: notif.INotificationMessage);

        /** NotificationMessage friendRequest. */
        public friendRequest?: (notif.IFriendUpdate|null);

        /** NotificationMessage friendAccept. */
        public friendAccept?: (notif.IFriendUpdate|null);

        /** NotificationMessage gameInvite. */
        public gameInvite?: (notif.IGameInvite|null);

        /** NotificationMessage statusUpdate. */
        public statusUpdate?: (notif.IStatusUpdate|null);

        /** NotificationMessage payload. */
        public payload?: ("friendRequest"|"friendAccept"|"gameInvite"|"statusUpdate");

        /**
         * Creates a new NotificationMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NotificationMessage instance
         */
        public static create(properties?: notif.INotificationMessage): notif.NotificationMessage;

        /**
         * Encodes the specified NotificationMessage message. Does not implicitly {@link notif.NotificationMessage.verify|verify} messages.
         * @param message NotificationMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: notif.INotificationMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NotificationMessage message, length delimited. Does not implicitly {@link notif.NotificationMessage.verify|verify} messages.
         * @param message NotificationMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: notif.INotificationMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NotificationMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NotificationMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): notif.NotificationMessage;

        /**
         * Decodes a NotificationMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NotificationMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): notif.NotificationMessage;

        /**
         * Verifies a NotificationMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NotificationMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NotificationMessage
         */
        public static fromObject(object: { [k: string]: any }): notif.NotificationMessage;

        /**
         * Creates a plain object from a NotificationMessage message. Also converts values to other types if specified.
         * @param message NotificationMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: notif.NotificationMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NotificationMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for NotificationMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of an Empty. */
        interface IEmpty {
        }

        /** Represents an Empty. */
        class Empty implements IEmpty {

            /**
             * Constructs a new Empty.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEmpty);

            /**
             * Creates a new Empty instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Empty instance
             */
            public static create(properties?: google.protobuf.IEmpty): google.protobuf.Empty;

            /**
             * Encodes the specified Empty message. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @param message Empty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Empty message, length delimited. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @param message Empty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Empty message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Empty;

            /**
             * Decodes an Empty message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Empty;

            /**
             * Verifies an Empty message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Empty message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Empty
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Empty;

            /**
             * Creates a plain object from an Empty message. Also converts values to other types if specified.
             * @param message Empty
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Empty, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Empty to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Empty
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}
