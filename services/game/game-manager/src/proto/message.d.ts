import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace shared. */
export namespace shared {

    /** Properties of a Ball. */
    interface IBall {

        /** Ball id */
        id?: (number|null);

        /** Ball x */
        x?: (number|null);

        /** Ball y */
        y?: (number|null);

        /** Ball vx */
        vx?: (number|null);

        /** Ball vy */
        vy?: (number|null);

        /** Ball disabled */
        disabled?: (boolean|null);
    }

    /** Represents a Ball. */
    class Ball implements IBall {

        /**
         * Constructs a new Ball.
         * @param [properties] Properties to set
         */
        constructor(properties?: shared.IBall);

        /** Ball id. */
        public id: number;

        /** Ball x. */
        public x: number;

        /** Ball y. */
        public y: number;

        /** Ball vx. */
        public vx: number;

        /** Ball vy. */
        public vy: number;

        /** Ball disabled. */
        public disabled: boolean;

        /**
         * Creates a new Ball instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Ball instance
         */
        public static create(properties?: shared.IBall): shared.Ball;

        /**
         * Encodes the specified Ball message. Does not implicitly {@link shared.Ball.verify|verify} messages.
         * @param message Ball message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: shared.IBall, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Encodes the specified Ball message, length delimited. Does not implicitly {@link shared.Ball.verify|verify} messages.
         * @param message Ball message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IBall, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Decodes a Ball message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Ball
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.default.Reader|Uint8Array), length?: number): shared.Ball;

        /**
         * Decodes a Ball message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Ball
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.default.Reader|Uint8Array)): shared.Ball;

        /**
         * Verifies a Ball message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Ball message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Ball
         */
        public static fromObject(object: { [k: string]: any }): shared.Ball;

        /**
         * Creates a plain object from a Ball message. Also converts values to other types if specified.
         * @param message Ball
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: shared.Ball, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Ball to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Ball
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Paddle. */
    interface IPaddle {

        /** Paddle id */
        id?: (number|null);

        /** Paddle playerId */
        playerId?: (number|null);

        /** Paddle move */
        move?: (number|null);

        /** Paddle offset */
        offset?: (number|null);

        /** Paddle dead */
        dead?: (boolean|null);
    }

    /** Represents a Paddle. */
    class Paddle implements IPaddle {

        /**
         * Constructs a new Paddle.
         * @param [properties] Properties to set
         */
        constructor(properties?: shared.IPaddle);

        /** Paddle id. */
        public id: number;

        /** Paddle playerId. */
        public playerId: number;

        /** Paddle move. */
        public move: number;

        /** Paddle offset. */
        public offset: number;

        /** Paddle dead. */
        public dead: boolean;

        /**
         * Creates a new Paddle instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Paddle instance
         */
        public static create(properties?: shared.IPaddle): shared.Paddle;

        /**
         * Encodes the specified Paddle message. Does not implicitly {@link shared.Paddle.verify|verify} messages.
         * @param message Paddle message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: shared.IPaddle, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Encodes the specified Paddle message, length delimited. Does not implicitly {@link shared.Paddle.verify|verify} messages.
         * @param message Paddle message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IPaddle, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Decodes a Paddle message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Paddle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.default.Reader|Uint8Array), length?: number): shared.Paddle;

        /**
         * Decodes a Paddle message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Paddle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.default.Reader|Uint8Array)): shared.Paddle;

        /**
         * Verifies a Paddle message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Paddle message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Paddle
         */
        public static fromObject(object: { [k: string]: any }): shared.Paddle;

        /**
         * Creates a plain object from a Paddle message. Also converts values to other types if specified.
         * @param message Paddle
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: shared.Paddle, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Paddle to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Paddle
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PaddleInput. */
    interface IPaddleInput {

        /** PaddleInput id */
        id?: (number|null);

        /** PaddleInput move */
        move?: (number|null);
    }

    /** Represents a PaddleInput. */
    class PaddleInput implements IPaddleInput {

        /**
         * Constructs a new PaddleInput.
         * @param [properties] Properties to set
         */
        constructor(properties?: shared.IPaddleInput);

        /** PaddleInput id. */
        public id: number;

        /** PaddleInput move. */
        public move: number;

        /**
         * Creates a new PaddleInput instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PaddleInput instance
         */
        public static create(properties?: shared.IPaddleInput): shared.PaddleInput;

        /**
         * Encodes the specified PaddleInput message. Does not implicitly {@link shared.PaddleInput.verify|verify} messages.
         * @param message PaddleInput message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: shared.IPaddleInput, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Encodes the specified PaddleInput message, length delimited. Does not implicitly {@link shared.PaddleInput.verify|verify} messages.
         * @param message PaddleInput message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IPaddleInput, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Decodes a PaddleInput message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PaddleInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.default.Reader|Uint8Array), length?: number): shared.PaddleInput;

        /**
         * Decodes a PaddleInput message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PaddleInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.default.Reader|Uint8Array)): shared.PaddleInput;

        /**
         * Verifies a PaddleInput message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PaddleInput message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PaddleInput
         */
        public static fromObject(object: { [k: string]: any }): shared.PaddleInput;

        /**
         * Creates a plain object from a PaddleInput message. Also converts values to other types if specified.
         * @param message PaddleInput
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: shared.PaddleInput, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PaddleInput to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PaddleInput
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Goal. */
    interface IGoal {

        /** Goal scorerId */
        scorerId?: (number|null);
    }

    /** Represents a Goal. */
    class Goal implements IGoal {

        /**
         * Constructs a new Goal.
         * @param [properties] Properties to set
         */
        constructor(properties?: shared.IGoal);

        /** Goal scorerId. */
        public scorerId: number;

        /**
         * Creates a new Goal instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Goal instance
         */
        public static create(properties?: shared.IGoal): shared.Goal;

        /**
         * Encodes the specified Goal message. Does not implicitly {@link shared.Goal.verify|verify} messages.
         * @param message Goal message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: shared.IGoal, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Encodes the specified Goal message, length delimited. Does not implicitly {@link shared.Goal.verify|verify} messages.
         * @param message Goal message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IGoal, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Decodes a Goal message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Goal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.default.Reader|Uint8Array), length?: number): shared.Goal;

        /**
         * Decodes a Goal message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Goal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.default.Reader|Uint8Array)): shared.Goal;

        /**
         * Verifies a Goal message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Goal message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Goal
         */
        public static fromObject(object: { [k: string]: any }): shared.Goal;

        /**
         * Creates a plain object from a Goal message. Also converts values to other types if specified.
         * @param message Goal
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: shared.Goal, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Goal to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Goal
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GameEvent. */
    interface IGameEvent {

        /** GameEvent type */
        type?: (string|null);

        /** GameEvent phase */
        phase?: (string|null);

        /** GameEvent remainingPlayers */
        remainingPlayers?: (number|null);

        /** GameEvent timestamp */
        timestamp?: (number|Long|null);

        /** GameEvent activePlayers */
        activePlayers?: (number[]|null);

        /** GameEvent playerMapping */
        playerMapping?: ({ [k: string]: number }|null);
    }

    /** Represents a GameEvent. */
    class GameEvent implements IGameEvent {

        /**
         * Constructs a new GameEvent.
         * @param [properties] Properties to set
         */
        constructor(properties?: shared.IGameEvent);

        /** GameEvent type. */
        public type: string;

        /** GameEvent phase. */
        public phase: string;

        /** GameEvent remainingPlayers. */
        public remainingPlayers: number;

        /** GameEvent timestamp. */
        public timestamp: (number|Long);

        /** GameEvent activePlayers. */
        public activePlayers: number[];

        /** GameEvent playerMapping. */
        public playerMapping: { [k: string]: number };

        /**
         * Creates a new GameEvent instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameEvent instance
         */
        public static create(properties?: shared.IGameEvent): shared.GameEvent;

        /**
         * Encodes the specified GameEvent message. Does not implicitly {@link shared.GameEvent.verify|verify} messages.
         * @param message GameEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: shared.IGameEvent, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Encodes the specified GameEvent message, length delimited. Does not implicitly {@link shared.GameEvent.verify|verify} messages.
         * @param message GameEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IGameEvent, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Decodes a GameEvent message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.default.Reader|Uint8Array), length?: number): shared.GameEvent;

        /**
         * Decodes a GameEvent message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.default.Reader|Uint8Array)): shared.GameEvent;

        /**
         * Verifies a GameEvent message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameEvent message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameEvent
         */
        public static fromObject(object: { [k: string]: any }): shared.GameEvent;

        /**
         * Creates a plain object from a GameEvent message. Also converts values to other types if specified.
         * @param message GameEvent
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: shared.GameEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameEvent to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GameEvent
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GameStateInfo. */
    interface IGameStateInfo {

        /** GameStateInfo activePlayers */
        activePlayers?: (number[]|null);

        /** GameStateInfo eliminatedPlayers */
        eliminatedPlayers?: (number[]|null);

        /** GameStateInfo currentPhase */
        currentPhase?: (string|null);

        /** GameStateInfo isRebuilding */
        isRebuilding?: (boolean|null);

        /** GameStateInfo rebuildTimeRemaining */
        rebuildTimeRemaining?: (number|Long|null);

        /** GameStateInfo playerMapping */
        playerMapping?: ({ [k: string]: number }|null);

        /** GameStateInfo isGameOver */
        isGameOver?: (boolean|null);

        /** GameStateInfo winner */
        winner?: (number|null);
    }

    /** Represents a GameStateInfo. */
    class GameStateInfo implements IGameStateInfo {

        /**
         * Constructs a new GameStateInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: shared.IGameStateInfo);

        /** GameStateInfo activePlayers. */
        public activePlayers: number[];

        /** GameStateInfo eliminatedPlayers. */
        public eliminatedPlayers: number[];

        /** GameStateInfo currentPhase. */
        public currentPhase: string;

        /** GameStateInfo isRebuilding. */
        public isRebuilding: boolean;

        /** GameStateInfo rebuildTimeRemaining. */
        public rebuildTimeRemaining: (number|Long);

        /** GameStateInfo playerMapping. */
        public playerMapping: { [k: string]: number };

        /** GameStateInfo isGameOver. */
        public isGameOver: boolean;

        /** GameStateInfo winner. */
        public winner: number;

        /**
         * Creates a new GameStateInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameStateInfo instance
         */
        public static create(properties?: shared.IGameStateInfo): shared.GameStateInfo;

        /**
         * Encodes the specified GameStateInfo message. Does not implicitly {@link shared.GameStateInfo.verify|verify} messages.
         * @param message GameStateInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: shared.IGameStateInfo, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Encodes the specified GameStateInfo message, length delimited. Does not implicitly {@link shared.GameStateInfo.verify|verify} messages.
         * @param message GameStateInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IGameStateInfo, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Decodes a GameStateInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameStateInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.default.Reader|Uint8Array), length?: number): shared.GameStateInfo;

        /**
         * Decodes a GameStateInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameStateInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.default.Reader|Uint8Array)): shared.GameStateInfo;

        /**
         * Verifies a GameStateInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameStateInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameStateInfo
         */
        public static fromObject(object: { [k: string]: any }): shared.GameStateInfo;

        /**
         * Creates a plain object from a GameStateInfo message. Also converts values to other types if specified.
         * @param message GameStateInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: shared.GameStateInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameStateInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GameStateInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a MatchState. */
    interface IMatchState {

        /** MatchState gameId */
        gameId?: (string|null);

        /** MatchState tick */
        tick?: (number|Long|null);

        /** MatchState balls */
        balls?: (shared.IBall[]|null);

        /** MatchState paddles */
        paddles?: (shared.IPaddle[]|null);

        /** MatchState score */
        score?: (number[]|null);

        /** MatchState ranks */
        ranks?: (number[]|null);

        /** MatchState stage */
        stage?: (number|null);

        /** MatchState events */
        events?: (shared.IGameEvent[]|null);

        /** MatchState gameState */
        gameState?: (shared.IGameStateInfo|null);
    }

    /** Represents a MatchState. */
    class MatchState implements IMatchState {

        /**
         * Constructs a new MatchState.
         * @param [properties] Properties to set
         */
        constructor(properties?: shared.IMatchState);

        /** MatchState gameId. */
        public gameId: string;

        /** MatchState tick. */
        public tick: (number|Long);

        /** MatchState balls. */
        public balls: shared.IBall[];

        /** MatchState paddles. */
        public paddles: shared.IPaddle[];

        /** MatchState score. */
        public score: number[];

        /** MatchState ranks. */
        public ranks: number[];

        /** MatchState stage. */
        public stage: number;

        /** MatchState events. */
        public events: shared.IGameEvent[];

        /** MatchState gameState. */
        public gameState?: (shared.IGameStateInfo|null);

        /**
         * Creates a new MatchState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchState instance
         */
        public static create(properties?: shared.IMatchState): shared.MatchState;

        /**
         * Encodes the specified MatchState message. Does not implicitly {@link shared.MatchState.verify|verify} messages.
         * @param message MatchState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: shared.IMatchState, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Encodes the specified MatchState message, length delimited. Does not implicitly {@link shared.MatchState.verify|verify} messages.
         * @param message MatchState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IMatchState, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Decodes a MatchState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.default.Reader|Uint8Array), length?: number): shared.MatchState;

        /**
         * Decodes a MatchState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.default.Reader|Uint8Array)): shared.MatchState;

        /**
         * Verifies a MatchState message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MatchState message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MatchState
         */
        public static fromObject(object: { [k: string]: any }): shared.MatchState;

        /**
         * Creates a plain object from a MatchState message. Also converts values to other types if specified.
         * @param message MatchState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: shared.MatchState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MatchState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MatchState
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a MatchCreateRequest. */
    interface IMatchCreateRequest {

        /** MatchCreateRequest players */
        players?: (string[]|null);
    }

    /** Represents a MatchCreateRequest. */
    class MatchCreateRequest implements IMatchCreateRequest {

        /**
         * Constructs a new MatchCreateRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: shared.IMatchCreateRequest);

        /** MatchCreateRequest players. */
        public players: string[];

        /**
         * Creates a new MatchCreateRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchCreateRequest instance
         */
        public static create(properties?: shared.IMatchCreateRequest): shared.MatchCreateRequest;

        /**
         * Encodes the specified MatchCreateRequest message. Does not implicitly {@link shared.MatchCreateRequest.verify|verify} messages.
         * @param message MatchCreateRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: shared.IMatchCreateRequest, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Encodes the specified MatchCreateRequest message, length delimited. Does not implicitly {@link shared.MatchCreateRequest.verify|verify} messages.
         * @param message MatchCreateRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IMatchCreateRequest, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Decodes a MatchCreateRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchCreateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.default.Reader|Uint8Array), length?: number): shared.MatchCreateRequest;

        /**
         * Decodes a MatchCreateRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchCreateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.default.Reader|Uint8Array)): shared.MatchCreateRequest;

        /**
         * Verifies a MatchCreateRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MatchCreateRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MatchCreateRequest
         */
        public static fromObject(object: { [k: string]: any }): shared.MatchCreateRequest;

        /**
         * Creates a plain object from a MatchCreateRequest message. Also converts values to other types if specified.
         * @param message MatchCreateRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: shared.MatchCreateRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MatchCreateRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MatchCreateRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a MatchCreateResponse. */
    interface IMatchCreateResponse {

        /** MatchCreateResponse gameId */
        gameId?: (string|null);
    }

    /** Represents a MatchCreateResponse. */
    class MatchCreateResponse implements IMatchCreateResponse {

        /**
         * Constructs a new MatchCreateResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: shared.IMatchCreateResponse);

        /** MatchCreateResponse gameId. */
        public gameId: string;

        /**
         * Creates a new MatchCreateResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchCreateResponse instance
         */
        public static create(properties?: shared.IMatchCreateResponse): shared.MatchCreateResponse;

        /**
         * Encodes the specified MatchCreateResponse message. Does not implicitly {@link shared.MatchCreateResponse.verify|verify} messages.
         * @param message MatchCreateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: shared.IMatchCreateResponse, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Encodes the specified MatchCreateResponse message, length delimited. Does not implicitly {@link shared.MatchCreateResponse.verify|verify} messages.
         * @param message MatchCreateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IMatchCreateResponse, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Decodes a MatchCreateResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchCreateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.default.Reader|Uint8Array), length?: number): shared.MatchCreateResponse;

        /**
         * Decodes a MatchCreateResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchCreateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.default.Reader|Uint8Array)): shared.MatchCreateResponse;

        /**
         * Verifies a MatchCreateResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MatchCreateResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MatchCreateResponse
         */
        public static fromObject(object: { [k: string]: any }): shared.MatchCreateResponse;

        /**
         * Creates a plain object from a MatchCreateResponse message. Also converts values to other types if specified.
         * @param message MatchCreateResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: shared.MatchCreateResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MatchCreateResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MatchCreateResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a MatchSetup. */
    interface IMatchSetup {

        /** MatchSetup players */
        players?: (string[]|null);
    }

    /** Represents a MatchSetup. */
    class MatchSetup implements IMatchSetup {

        /**
         * Constructs a new MatchSetup.
         * @param [properties] Properties to set
         */
        constructor(properties?: shared.IMatchSetup);

        /** MatchSetup players. */
        public players: string[];

        /**
         * Creates a new MatchSetup instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchSetup instance
         */
        public static create(properties?: shared.IMatchSetup): shared.MatchSetup;

        /**
         * Encodes the specified MatchSetup message. Does not implicitly {@link shared.MatchSetup.verify|verify} messages.
         * @param message MatchSetup message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: shared.IMatchSetup, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Encodes the specified MatchSetup message, length delimited. Does not implicitly {@link shared.MatchSetup.verify|verify} messages.
         * @param message MatchSetup message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IMatchSetup, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Decodes a MatchSetup message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchSetup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.default.Reader|Uint8Array), length?: number): shared.MatchSetup;

        /**
         * Decodes a MatchSetup message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchSetup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.default.Reader|Uint8Array)): shared.MatchSetup;

        /**
         * Verifies a MatchSetup message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MatchSetup message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MatchSetup
         */
        public static fromObject(object: { [k: string]: any }): shared.MatchSetup;

        /**
         * Creates a plain object from a MatchSetup message. Also converts values to other types if specified.
         * @param message MatchSetup
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: shared.MatchSetup, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MatchSetup to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MatchSetup
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a MatchInput. */
    interface IMatchInput {

        /** MatchInput paddleId */
        paddleId?: (number|null);

        /** MatchInput move */
        move?: (number|null);
    }

    /** Represents a MatchInput. */
    class MatchInput implements IMatchInput {

        /**
         * Constructs a new MatchInput.
         * @param [properties] Properties to set
         */
        constructor(properties?: shared.IMatchInput);

        /** MatchInput paddleId. */
        public paddleId: number;

        /** MatchInput move. */
        public move: number;

        /**
         * Creates a new MatchInput instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchInput instance
         */
        public static create(properties?: shared.IMatchInput): shared.MatchInput;

        /**
         * Encodes the specified MatchInput message. Does not implicitly {@link shared.MatchInput.verify|verify} messages.
         * @param message MatchInput message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: shared.IMatchInput, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Encodes the specified MatchInput message, length delimited. Does not implicitly {@link shared.MatchInput.verify|verify} messages.
         * @param message MatchInput message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IMatchInput, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Decodes a MatchInput message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.default.Reader|Uint8Array), length?: number): shared.MatchInput;

        /**
         * Decodes a MatchInput message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.default.Reader|Uint8Array)): shared.MatchInput;

        /**
         * Verifies a MatchInput message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MatchInput message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MatchInput
         */
        public static fromObject(object: { [k: string]: any }): shared.MatchInput;

        /**
         * Creates a plain object from a MatchInput message. Also converts values to other types if specified.
         * @param message MatchInput
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: shared.MatchInput, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MatchInput to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MatchInput
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a MatchQuit. */
    interface IMatchQuit {

        /** MatchQuit uuid */
        uuid?: (string|null);
    }

    /** Represents a MatchQuit. */
    class MatchQuit implements IMatchQuit {

        /**
         * Constructs a new MatchQuit.
         * @param [properties] Properties to set
         */
        constructor(properties?: shared.IMatchQuit);

        /** MatchQuit uuid. */
        public uuid: string;

        /**
         * Creates a new MatchQuit instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchQuit instance
         */
        public static create(properties?: shared.IMatchQuit): shared.MatchQuit;

        /**
         * Encodes the specified MatchQuit message. Does not implicitly {@link shared.MatchQuit.verify|verify} messages.
         * @param message MatchQuit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: shared.IMatchQuit, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Encodes the specified MatchQuit message, length delimited. Does not implicitly {@link shared.MatchQuit.verify|verify} messages.
         * @param message MatchQuit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IMatchQuit, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Decodes a MatchQuit message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchQuit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.default.Reader|Uint8Array), length?: number): shared.MatchQuit;

        /**
         * Decodes a MatchQuit message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchQuit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.default.Reader|Uint8Array)): shared.MatchQuit;

        /**
         * Verifies a MatchQuit message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MatchQuit message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MatchQuit
         */
        public static fromObject(object: { [k: string]: any }): shared.MatchQuit;

        /**
         * Creates a plain object from a MatchQuit message. Also converts values to other types if specified.
         * @param message MatchQuit
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: shared.MatchQuit, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MatchQuit to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MatchQuit
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a MatchStart. */
    interface IMatchStart {
    }

    /** Represents a MatchStart. */
    class MatchStart implements IMatchStart {

        /**
         * Constructs a new MatchStart.
         * @param [properties] Properties to set
         */
        constructor(properties?: shared.IMatchStart);

        /**
         * Creates a new MatchStart instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchStart instance
         */
        public static create(properties?: shared.IMatchStart): shared.MatchStart;

        /**
         * Encodes the specified MatchStart message. Does not implicitly {@link shared.MatchStart.verify|verify} messages.
         * @param message MatchStart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: shared.IMatchStart, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Encodes the specified MatchStart message, length delimited. Does not implicitly {@link shared.MatchStart.verify|verify} messages.
         * @param message MatchStart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IMatchStart, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Decodes a MatchStart message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.default.Reader|Uint8Array), length?: number): shared.MatchStart;

        /**
         * Decodes a MatchStart message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.default.Reader|Uint8Array)): shared.MatchStart;

        /**
         * Verifies a MatchStart message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MatchStart message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MatchStart
         */
        public static fromObject(object: { [k: string]: any }): shared.MatchStart;

        /**
         * Creates a plain object from a MatchStart message. Also converts values to other types if specified.
         * @param message MatchStart
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: shared.MatchStart, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MatchStart to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MatchStart
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a MatchEnd. */
    interface IMatchEnd {

        /** MatchEnd winner */
        winner?: (number|null);
    }

    /** Represents a MatchEnd. */
    class MatchEnd implements IMatchEnd {

        /**
         * Constructs a new MatchEnd.
         * @param [properties] Properties to set
         */
        constructor(properties?: shared.IMatchEnd);

        /** MatchEnd winner. */
        public winner: number;

        /**
         * Creates a new MatchEnd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchEnd instance
         */
        public static create(properties?: shared.IMatchEnd): shared.MatchEnd;

        /**
         * Encodes the specified MatchEnd message. Does not implicitly {@link shared.MatchEnd.verify|verify} messages.
         * @param message MatchEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: shared.IMatchEnd, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Encodes the specified MatchEnd message, length delimited. Does not implicitly {@link shared.MatchEnd.verify|verify} messages.
         * @param message MatchEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IMatchEnd, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Decodes a MatchEnd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.default.Reader|Uint8Array), length?: number): shared.MatchEnd;

        /**
         * Decodes a MatchEnd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.default.Reader|Uint8Array)): shared.MatchEnd;

        /**
         * Verifies a MatchEnd message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MatchEnd message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MatchEnd
         */
        public static fromObject(object: { [k: string]: any }): shared.MatchEnd;

        /**
         * Creates a plain object from a MatchEnd message. Also converts values to other types if specified.
         * @param message MatchEnd
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: shared.MatchEnd, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MatchEnd to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MatchEnd
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PhysicsRequest. */
    interface IPhysicsRequest {

        /** PhysicsRequest gameId */
        gameId?: (string|null);

        /** PhysicsRequest tick */
        tick?: (number|Long|null);

        /** PhysicsRequest input */
        input?: (shared.IPaddleInput[]|null);

        /** PhysicsRequest stage */
        stage?: (number|null);
    }

    /** Represents a PhysicsRequest. */
    class PhysicsRequest implements IPhysicsRequest {

        /**
         * Constructs a new PhysicsRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: shared.IPhysicsRequest);

        /** PhysicsRequest gameId. */
        public gameId: string;

        /** PhysicsRequest tick. */
        public tick: (number|Long);

        /** PhysicsRequest input. */
        public input: shared.IPaddleInput[];

        /** PhysicsRequest stage. */
        public stage: number;

        /**
         * Creates a new PhysicsRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PhysicsRequest instance
         */
        public static create(properties?: shared.IPhysicsRequest): shared.PhysicsRequest;

        /**
         * Encodes the specified PhysicsRequest message. Does not implicitly {@link shared.PhysicsRequest.verify|verify} messages.
         * @param message PhysicsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: shared.IPhysicsRequest, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Encodes the specified PhysicsRequest message, length delimited. Does not implicitly {@link shared.PhysicsRequest.verify|verify} messages.
         * @param message PhysicsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IPhysicsRequest, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Decodes a PhysicsRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PhysicsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.default.Reader|Uint8Array), length?: number): shared.PhysicsRequest;

        /**
         * Decodes a PhysicsRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PhysicsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.default.Reader|Uint8Array)): shared.PhysicsRequest;

        /**
         * Verifies a PhysicsRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PhysicsRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PhysicsRequest
         */
        public static fromObject(object: { [k: string]: any }): shared.PhysicsRequest;

        /**
         * Creates a plain object from a PhysicsRequest message. Also converts values to other types if specified.
         * @param message PhysicsRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: shared.PhysicsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PhysicsRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PhysicsRequest
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
            public static encode(message: google.protobuf.IEmpty, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

            /**
             * Encodes the specified Empty message, length delimited. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @param message Empty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEmpty, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

            /**
             * Decodes an Empty message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.default.Reader|Uint8Array), length?: number): google.protobuf.Empty;

            /**
             * Decodes an Empty message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.default.Reader|Uint8Array)): google.protobuf.Empty;

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

/** Namespace physics. */
export namespace physics {

    /** Properties of a PhysicsRequest. */
    interface IPhysicsRequest {

        /** PhysicsRequest gameId */
        gameId?: (string|null);

        /** PhysicsRequest tick */
        tick?: (number|Long|null);

        /** PhysicsRequest input */
        input?: (shared.IPaddleInput[]|null);

        /** PhysicsRequest stage */
        stage?: (number|null);
    }

    /** Represents a PhysicsRequest. */
    class PhysicsRequest implements IPhysicsRequest {

        /**
         * Constructs a new PhysicsRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: physics.IPhysicsRequest);

        /** PhysicsRequest gameId. */
        public gameId: string;

        /** PhysicsRequest tick. */
        public tick: (number|Long);

        /** PhysicsRequest input. */
        public input: shared.IPaddleInput[];

        /** PhysicsRequest stage. */
        public stage: number;

        /**
         * Creates a new PhysicsRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PhysicsRequest instance
         */
        public static create(properties?: physics.IPhysicsRequest): physics.PhysicsRequest;

        /**
         * Encodes the specified PhysicsRequest message. Does not implicitly {@link physics.PhysicsRequest.verify|verify} messages.
         * @param message PhysicsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: physics.IPhysicsRequest, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Encodes the specified PhysicsRequest message, length delimited. Does not implicitly {@link physics.PhysicsRequest.verify|verify} messages.
         * @param message PhysicsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: physics.IPhysicsRequest, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Decodes a PhysicsRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PhysicsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.default.Reader|Uint8Array), length?: number): physics.PhysicsRequest;

        /**
         * Decodes a PhysicsRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PhysicsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.default.Reader|Uint8Array)): physics.PhysicsRequest;

        /**
         * Verifies a PhysicsRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PhysicsRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PhysicsRequest
         */
        public static fromObject(object: { [k: string]: any }): physics.PhysicsRequest;

        /**
         * Creates a plain object from a PhysicsRequest message. Also converts values to other types if specified.
         * @param message PhysicsRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: physics.PhysicsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PhysicsRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PhysicsRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PhysicsResponse. */
    interface IPhysicsResponse {

        /** PhysicsResponse gameId */
        gameId?: (string|null);

        /** PhysicsResponse tick */
        tick?: (number|Long|null);

        /** PhysicsResponse balls */
        balls?: (shared.IBall[]|null);

        /** PhysicsResponse paddles */
        paddles?: (shared.IPaddle[]|null);

        /** PhysicsResponse goal */
        goal?: (shared.IGoal|null);

        /** PhysicsResponse ranks */
        ranks?: (number[]|null);

        /** PhysicsResponse stage */
        stage?: (number|null);

        /** PhysicsResponse end */
        end?: (boolean|null);

        /** PhysicsResponse events */
        events?: (shared.IGameEvent[]|null);

        /** PhysicsResponse gameState */
        gameState?: (shared.IGameStateInfo|null);
    }

    /** Represents a PhysicsResponse. */
    class PhysicsResponse implements IPhysicsResponse {

        /**
         * Constructs a new PhysicsResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: physics.IPhysicsResponse);

        /** PhysicsResponse gameId. */
        public gameId: string;

        /** PhysicsResponse tick. */
        public tick: (number|Long);

        /** PhysicsResponse balls. */
        public balls: shared.IBall[];

        /** PhysicsResponse paddles. */
        public paddles: shared.IPaddle[];

        /** PhysicsResponse goal. */
        public goal?: (shared.IGoal|null);

        /** PhysicsResponse ranks. */
        public ranks: number[];

        /** PhysicsResponse stage. */
        public stage: number;

        /** PhysicsResponse end. */
        public end: boolean;

        /** PhysicsResponse events. */
        public events: shared.IGameEvent[];

        /** PhysicsResponse gameState. */
        public gameState?: (shared.IGameStateInfo|null);

        /**
         * Creates a new PhysicsResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PhysicsResponse instance
         */
        public static create(properties?: physics.IPhysicsResponse): physics.PhysicsResponse;

        /**
         * Encodes the specified PhysicsResponse message. Does not implicitly {@link physics.PhysicsResponse.verify|verify} messages.
         * @param message PhysicsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: physics.IPhysicsResponse, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Encodes the specified PhysicsResponse message, length delimited. Does not implicitly {@link physics.PhysicsResponse.verify|verify} messages.
         * @param message PhysicsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: physics.IPhysicsResponse, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Decodes a PhysicsResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PhysicsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.default.Reader|Uint8Array), length?: number): physics.PhysicsResponse;

        /**
         * Decodes a PhysicsResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PhysicsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.default.Reader|Uint8Array)): physics.PhysicsResponse;

        /**
         * Verifies a PhysicsResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PhysicsResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PhysicsResponse
         */
        public static fromObject(object: { [k: string]: any }): physics.PhysicsResponse;

        /**
         * Creates a plain object from a PhysicsResponse message. Also converts values to other types if specified.
         * @param message PhysicsResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: physics.PhysicsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PhysicsResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PhysicsResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a MatchStateResponse. */
    interface IMatchStateResponse {

        /** MatchStateResponse state */
        state?: (shared.IMatchState|null);
    }

    /** Represents a MatchStateResponse. */
    class MatchStateResponse implements IMatchStateResponse {

        /**
         * Constructs a new MatchStateResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: physics.IMatchStateResponse);

        /** MatchStateResponse state. */
        public state?: (shared.IMatchState|null);

        /**
         * Creates a new MatchStateResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchStateResponse instance
         */
        public static create(properties?: physics.IMatchStateResponse): physics.MatchStateResponse;

        /**
         * Encodes the specified MatchStateResponse message. Does not implicitly {@link physics.MatchStateResponse.verify|verify} messages.
         * @param message MatchStateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: physics.IMatchStateResponse, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Encodes the specified MatchStateResponse message, length delimited. Does not implicitly {@link physics.MatchStateResponse.verify|verify} messages.
         * @param message MatchStateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: physics.IMatchStateResponse, writer?: $protobuf.default.Writer): $protobuf.default.Writer;

        /**
         * Decodes a MatchStateResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchStateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.default.Reader|Uint8Array), length?: number): physics.MatchStateResponse;

        /**
         * Decodes a MatchStateResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchStateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.default.Reader|Uint8Array)): physics.MatchStateResponse;

        /**
         * Verifies a MatchStateResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MatchStateResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MatchStateResponse
         */
        public static fromObject(object: { [k: string]: any }): physics.MatchStateResponse;

        /**
         * Creates a plain object from a MatchStateResponse message. Also converts values to other types if specified.
         * @param message MatchStateResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: physics.MatchStateResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MatchStateResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MatchStateResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
