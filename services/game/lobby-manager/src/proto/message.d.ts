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
        public static encode(message: shared.IBall, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Ball message, length delimited. Does not implicitly {@link shared.Ball.verify|verify} messages.
         * @param message Ball message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IBall, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Ball message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Ball
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): shared.Ball;

        /**
         * Decodes a Ball message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Ball
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): shared.Ball;

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
        public static encode(message: shared.IPaddle, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Paddle message, length delimited. Does not implicitly {@link shared.Paddle.verify|verify} messages.
         * @param message Paddle message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IPaddle, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Paddle message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Paddle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): shared.Paddle;

        /**
         * Decodes a Paddle message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Paddle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): shared.Paddle;

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
        public static encode(message: shared.IPaddleInput, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PaddleInput message, length delimited. Does not implicitly {@link shared.PaddleInput.verify|verify} messages.
         * @param message PaddleInput message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IPaddleInput, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PaddleInput message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PaddleInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): shared.PaddleInput;

        /**
         * Decodes a PaddleInput message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PaddleInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): shared.PaddleInput;

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
        public static encode(message: shared.IGoal, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Goal message, length delimited. Does not implicitly {@link shared.Goal.verify|verify} messages.
         * @param message Goal message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IGoal, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Goal message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Goal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): shared.Goal;

        /**
         * Decodes a Goal message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Goal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): shared.Goal;

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
        public static encode(message: shared.IGameEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameEvent message, length delimited. Does not implicitly {@link shared.GameEvent.verify|verify} messages.
         * @param message GameEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IGameEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameEvent message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): shared.GameEvent;

        /**
         * Decodes a GameEvent message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): shared.GameEvent;

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
        public static encode(message: shared.IGameStateInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameStateInfo message, length delimited. Does not implicitly {@link shared.GameStateInfo.verify|verify} messages.
         * @param message GameStateInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IGameStateInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameStateInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameStateInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): shared.GameStateInfo;

        /**
         * Decodes a GameStateInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameStateInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): shared.GameStateInfo;

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
        public static encode(message: shared.IMatchState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchState message, length delimited. Does not implicitly {@link shared.MatchState.verify|verify} messages.
         * @param message MatchState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IMatchState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): shared.MatchState;

        /**
         * Decodes a MatchState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): shared.MatchState;

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
        public static encode(message: shared.IMatchCreateRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchCreateRequest message, length delimited. Does not implicitly {@link shared.MatchCreateRequest.verify|verify} messages.
         * @param message MatchCreateRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IMatchCreateRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchCreateRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchCreateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): shared.MatchCreateRequest;

        /**
         * Decodes a MatchCreateRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchCreateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): shared.MatchCreateRequest;

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
        public static encode(message: shared.IMatchCreateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchCreateResponse message, length delimited. Does not implicitly {@link shared.MatchCreateResponse.verify|verify} messages.
         * @param message MatchCreateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IMatchCreateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchCreateResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchCreateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): shared.MatchCreateResponse;

        /**
         * Decodes a MatchCreateResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchCreateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): shared.MatchCreateResponse;

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
        public static encode(message: shared.IMatchSetup, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchSetup message, length delimited. Does not implicitly {@link shared.MatchSetup.verify|verify} messages.
         * @param message MatchSetup message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IMatchSetup, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchSetup message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchSetup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): shared.MatchSetup;

        /**
         * Decodes a MatchSetup message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchSetup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): shared.MatchSetup;

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
        public static encode(message: shared.IMatchInput, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchInput message, length delimited. Does not implicitly {@link shared.MatchInput.verify|verify} messages.
         * @param message MatchInput message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IMatchInput, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchInput message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): shared.MatchInput;

        /**
         * Decodes a MatchInput message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): shared.MatchInput;

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
        public static encode(message: shared.IMatchQuit, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchQuit message, length delimited. Does not implicitly {@link shared.MatchQuit.verify|verify} messages.
         * @param message MatchQuit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IMatchQuit, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchQuit message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchQuit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): shared.MatchQuit;

        /**
         * Decodes a MatchQuit message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchQuit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): shared.MatchQuit;

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
        public static encode(message: shared.IMatchStart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchStart message, length delimited. Does not implicitly {@link shared.MatchStart.verify|verify} messages.
         * @param message MatchStart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IMatchStart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchStart message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): shared.MatchStart;

        /**
         * Decodes a MatchStart message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): shared.MatchStart;

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
        public static encode(message: shared.IMatchEnd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchEnd message, length delimited. Does not implicitly {@link shared.MatchEnd.verify|verify} messages.
         * @param message MatchEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IMatchEnd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchEnd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): shared.MatchEnd;

        /**
         * Decodes a MatchEnd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): shared.MatchEnd;

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
        public static encode(message: shared.IPhysicsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PhysicsRequest message, length delimited. Does not implicitly {@link shared.PhysicsRequest.verify|verify} messages.
         * @param message PhysicsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IPhysicsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PhysicsRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PhysicsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): shared.PhysicsRequest;

        /**
         * Decodes a PhysicsRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PhysicsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): shared.PhysicsRequest;

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

/** Namespace lobby. */
export namespace lobby {

    /** Properties of a UserStatus. */
    interface IUserStatus {

        /** UserStatus uuid */
        uuid?: (string|null);

        /** UserStatus lobbyId */
        lobbyId?: (string|null);

        /** UserStatus status */
        status?: (string|null);
    }

    /** Represents a UserStatus. */
    class UserStatus implements IUserStatus {

        /**
         * Constructs a new UserStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: lobby.IUserStatus);

        /** UserStatus uuid. */
        public uuid: string;

        /** UserStatus lobbyId. */
        public lobbyId: string;

        /** UserStatus status. */
        public status: string;

        /**
         * Creates a new UserStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserStatus instance
         */
        public static create(properties?: lobby.IUserStatus): lobby.UserStatus;

        /**
         * Encodes the specified UserStatus message. Does not implicitly {@link lobby.UserStatus.verify|verify} messages.
         * @param message UserStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: lobby.IUserStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserStatus message, length delimited. Does not implicitly {@link lobby.UserStatus.verify|verify} messages.
         * @param message UserStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: lobby.IUserStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): lobby.UserStatus;

        /**
         * Decodes a UserStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): lobby.UserStatus;

        /**
         * Verifies a UserStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserStatus
         */
        public static fromObject(object: { [k: string]: any }): lobby.UserStatus;

        /**
         * Creates a plain object from a UserStatus message. Also converts values to other types if specified.
         * @param message UserStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: lobby.UserStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UserStatus
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a QuitMessage. */
    interface IQuitMessage {

        /** QuitMessage uuid */
        uuid?: (string|null);

        /** QuitMessage lobbyId */
        lobbyId?: (string|null);
    }

    /** Represents a QuitMessage. */
    class QuitMessage implements IQuitMessage {

        /**
         * Constructs a new QuitMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: lobby.IQuitMessage);

        /** QuitMessage uuid. */
        public uuid: string;

        /** QuitMessage lobbyId. */
        public lobbyId: string;

        /**
         * Creates a new QuitMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QuitMessage instance
         */
        public static create(properties?: lobby.IQuitMessage): lobby.QuitMessage;

        /**
         * Encodes the specified QuitMessage message. Does not implicitly {@link lobby.QuitMessage.verify|verify} messages.
         * @param message QuitMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: lobby.IQuitMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified QuitMessage message, length delimited. Does not implicitly {@link lobby.QuitMessage.verify|verify} messages.
         * @param message QuitMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: lobby.IQuitMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a QuitMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns QuitMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): lobby.QuitMessage;

        /**
         * Decodes a QuitMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns QuitMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): lobby.QuitMessage;

        /**
         * Verifies a QuitMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a QuitMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns QuitMessage
         */
        public static fromObject(object: { [k: string]: any }): lobby.QuitMessage;

        /**
         * Creates a plain object from a QuitMessage message. Also converts values to other types if specified.
         * @param message QuitMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: lobby.QuitMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this QuitMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for QuitMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReadyMessage. */
    interface IReadyMessage {

        /** ReadyMessage lobbyId */
        lobbyId?: (string|null);
    }

    /** Represents a ReadyMessage. */
    class ReadyMessage implements IReadyMessage {

        /**
         * Constructs a new ReadyMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: lobby.IReadyMessage);

        /** ReadyMessage lobbyId. */
        public lobbyId: string;

        /**
         * Creates a new ReadyMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReadyMessage instance
         */
        public static create(properties?: lobby.IReadyMessage): lobby.ReadyMessage;

        /**
         * Encodes the specified ReadyMessage message. Does not implicitly {@link lobby.ReadyMessage.verify|verify} messages.
         * @param message ReadyMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: lobby.IReadyMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReadyMessage message, length delimited. Does not implicitly {@link lobby.ReadyMessage.verify|verify} messages.
         * @param message ReadyMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: lobby.IReadyMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReadyMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReadyMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): lobby.ReadyMessage;

        /**
         * Decodes a ReadyMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReadyMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): lobby.ReadyMessage;

        /**
         * Verifies a ReadyMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReadyMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReadyMessage
         */
        public static fromObject(object: { [k: string]: any }): lobby.ReadyMessage;

        /**
         * Creates a plain object from a ReadyMessage message. Also converts values to other types if specified.
         * @param message ReadyMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: lobby.ReadyMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReadyMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReadyMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an ErrorMessage. */
    interface IErrorMessage {

        /** ErrorMessage message */
        message?: (string|null);
    }

    /** Represents an ErrorMessage. */
    class ErrorMessage implements IErrorMessage {

        /**
         * Constructs a new ErrorMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: lobby.IErrorMessage);

        /** ErrorMessage message. */
        public message: string;

        /**
         * Creates a new ErrorMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ErrorMessage instance
         */
        public static create(properties?: lobby.IErrorMessage): lobby.ErrorMessage;

        /**
         * Encodes the specified ErrorMessage message. Does not implicitly {@link lobby.ErrorMessage.verify|verify} messages.
         * @param message ErrorMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: lobby.IErrorMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ErrorMessage message, length delimited. Does not implicitly {@link lobby.ErrorMessage.verify|verify} messages.
         * @param message ErrorMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: lobby.IErrorMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ErrorMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ErrorMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): lobby.ErrorMessage;

        /**
         * Decodes an ErrorMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ErrorMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): lobby.ErrorMessage;

        /**
         * Verifies an ErrorMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ErrorMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ErrorMessage
         */
        public static fromObject(object: { [k: string]: any }): lobby.ErrorMessage;

        /**
         * Creates a plain object from an ErrorMessage message. Also converts values to other types if specified.
         * @param message ErrorMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: lobby.ErrorMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ErrorMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ErrorMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a StartMessage. */
    interface IStartMessage {

        /** StartMessage lobbyId */
        lobbyId?: (string|null);

        /** StartMessage gameId */
        gameId?: (string|null);

        /** StartMessage map */
        map?: (string|null);
    }

    /** Represents a StartMessage. */
    class StartMessage implements IStartMessage {

        /**
         * Constructs a new StartMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: lobby.IStartMessage);

        /** StartMessage lobbyId. */
        public lobbyId: string;

        /** StartMessage gameId. */
        public gameId: string;

        /** StartMessage map. */
        public map: string;

        /**
         * Creates a new StartMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StartMessage instance
         */
        public static create(properties?: lobby.IStartMessage): lobby.StartMessage;

        /**
         * Encodes the specified StartMessage message. Does not implicitly {@link lobby.StartMessage.verify|verify} messages.
         * @param message StartMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: lobby.IStartMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StartMessage message, length delimited. Does not implicitly {@link lobby.StartMessage.verify|verify} messages.
         * @param message StartMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: lobby.IStartMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StartMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StartMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): lobby.StartMessage;

        /**
         * Decodes a StartMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StartMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): lobby.StartMessage;

        /**
         * Verifies a StartMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StartMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StartMessage
         */
        public static fromObject(object: { [k: string]: any }): lobby.StartMessage;

        /**
         * Creates a plain object from a StartMessage message. Also converts values to other types if specified.
         * @param message StartMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: lobby.StartMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StartMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for StartMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Player. */
    interface IPlayer {

        /** Player uuid */
        uuid?: (string|null);

        /** Player ready */
        ready?: (boolean|null);
    }

    /** Represents a Player. */
    class Player implements IPlayer {

        /**
         * Constructs a new Player.
         * @param [properties] Properties to set
         */
        constructor(properties?: lobby.IPlayer);

        /** Player uuid. */
        public uuid: string;

        /** Player ready. */
        public ready: boolean;

        /**
         * Creates a new Player instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Player instance
         */
        public static create(properties?: lobby.IPlayer): lobby.Player;

        /**
         * Encodes the specified Player message. Does not implicitly {@link lobby.Player.verify|verify} messages.
         * @param message Player message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: lobby.IPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Player message, length delimited. Does not implicitly {@link lobby.Player.verify|verify} messages.
         * @param message Player message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: lobby.IPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Player message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): lobby.Player;

        /**
         * Decodes a Player message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): lobby.Player;

        /**
         * Verifies a Player message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Player message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Player
         */
        public static fromObject(object: { [k: string]: any }): lobby.Player;

        /**
         * Creates a plain object from a Player message. Also converts values to other types if specified.
         * @param message Player
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: lobby.Player, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Player to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Player
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an UpdateMessage. */
    interface IUpdateMessage {

        /** UpdateMessage lobbyId */
        lobbyId?: (string|null);

        /** UpdateMessage players */
        players?: (lobby.IPlayer[]|null);

        /** UpdateMessage status */
        status?: (string|null);

        /** UpdateMessage mode */
        mode?: (string|null);
    }

    /** Represents an UpdateMessage. */
    class UpdateMessage implements IUpdateMessage {

        /**
         * Constructs a new UpdateMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: lobby.IUpdateMessage);

        /** UpdateMessage lobbyId. */
        public lobbyId: string;

        /** UpdateMessage players. */
        public players: lobby.IPlayer[];

        /** UpdateMessage status. */
        public status: string;

        /** UpdateMessage mode. */
        public mode: string;

        /**
         * Creates a new UpdateMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UpdateMessage instance
         */
        public static create(properties?: lobby.IUpdateMessage): lobby.UpdateMessage;

        /**
         * Encodes the specified UpdateMessage message. Does not implicitly {@link lobby.UpdateMessage.verify|verify} messages.
         * @param message UpdateMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: lobby.IUpdateMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UpdateMessage message, length delimited. Does not implicitly {@link lobby.UpdateMessage.verify|verify} messages.
         * @param message UpdateMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: lobby.IUpdateMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UpdateMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UpdateMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): lobby.UpdateMessage;

        /**
         * Decodes an UpdateMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UpdateMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): lobby.UpdateMessage;

        /**
         * Verifies an UpdateMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UpdateMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpdateMessage
         */
        public static fromObject(object: { [k: string]: any }): lobby.UpdateMessage;

        /**
         * Creates a plain object from an UpdateMessage message. Also converts values to other types if specified.
         * @param message UpdateMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: lobby.UpdateMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpdateMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UpdateMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ClientMessage. */
    interface IClientMessage {

        /** ClientMessage quit */
        quit?: (lobby.IQuitMessage|null);

        /** ClientMessage ready */
        ready?: (lobby.IReadyMessage|null);
    }

    /** Represents a ClientMessage. */
    class ClientMessage implements IClientMessage {

        /**
         * Constructs a new ClientMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: lobby.IClientMessage);

        /** ClientMessage quit. */
        public quit?: (lobby.IQuitMessage|null);

        /** ClientMessage ready. */
        public ready?: (lobby.IReadyMessage|null);

        /** ClientMessage payload. */
        public payload?: ("quit"|"ready");

        /**
         * Creates a new ClientMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClientMessage instance
         */
        public static create(properties?: lobby.IClientMessage): lobby.ClientMessage;

        /**
         * Encodes the specified ClientMessage message. Does not implicitly {@link lobby.ClientMessage.verify|verify} messages.
         * @param message ClientMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: lobby.IClientMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClientMessage message, length delimited. Does not implicitly {@link lobby.ClientMessage.verify|verify} messages.
         * @param message ClientMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: lobby.IClientMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClientMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClientMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): lobby.ClientMessage;

        /**
         * Decodes a ClientMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClientMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): lobby.ClientMessage;

        /**
         * Verifies a ClientMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClientMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClientMessage
         */
        public static fromObject(object: { [k: string]: any }): lobby.ClientMessage;

        /**
         * Creates a plain object from a ClientMessage message. Also converts values to other types if specified.
         * @param message ClientMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: lobby.ClientMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClientMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ClientMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ServerMessage. */
    interface IServerMessage {

        /** ServerMessage start */
        start?: (lobby.IStartMessage|null);

        /** ServerMessage update */
        update?: (lobby.IUpdateMessage|null);

        /** ServerMessage error */
        error?: (lobby.IErrorMessage|null);
    }

    /** Represents a ServerMessage. */
    class ServerMessage implements IServerMessage {

        /**
         * Constructs a new ServerMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: lobby.IServerMessage);

        /** ServerMessage start. */
        public start?: (lobby.IStartMessage|null);

        /** ServerMessage update. */
        public update?: (lobby.IUpdateMessage|null);

        /** ServerMessage error. */
        public error?: (lobby.IErrorMessage|null);

        /** ServerMessage payload. */
        public payload?: ("start"|"update"|"error");

        /**
         * Creates a new ServerMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ServerMessage instance
         */
        public static create(properties?: lobby.IServerMessage): lobby.ServerMessage;

        /**
         * Encodes the specified ServerMessage message. Does not implicitly {@link lobby.ServerMessage.verify|verify} messages.
         * @param message ServerMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: lobby.IServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ServerMessage message, length delimited. Does not implicitly {@link lobby.ServerMessage.verify|verify} messages.
         * @param message ServerMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: lobby.IServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ServerMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): lobby.ServerMessage;

        /**
         * Decodes a ServerMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): lobby.ServerMessage;

        /**
         * Verifies a ServerMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ServerMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ServerMessage
         */
        public static fromObject(object: { [k: string]: any }): lobby.ServerMessage;

        /**
         * Creates a plain object from a ServerMessage message. Also converts values to other types if specified.
         * @param message ServerMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: lobby.ServerMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ServerMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ServerMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a UserStatusPublish. */
    interface IUserStatusPublish {

        /** UserStatusPublish uuid */
        uuid?: (string|null);

        /** UserStatusPublish lobbyId */
        lobbyId?: (string|null);

        /** UserStatusPublish status */
        status?: (string|null);
    }

    /** Represents a UserStatusPublish. */
    class UserStatusPublish implements IUserStatusPublish {

        /**
         * Constructs a new UserStatusPublish.
         * @param [properties] Properties to set
         */
        constructor(properties?: lobby.IUserStatusPublish);

        /** UserStatusPublish uuid. */
        public uuid: string;

        /** UserStatusPublish lobbyId. */
        public lobbyId: string;

        /** UserStatusPublish status. */
        public status: string;

        /**
         * Creates a new UserStatusPublish instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserStatusPublish instance
         */
        public static create(properties?: lobby.IUserStatusPublish): lobby.UserStatusPublish;

        /**
         * Encodes the specified UserStatusPublish message. Does not implicitly {@link lobby.UserStatusPublish.verify|verify} messages.
         * @param message UserStatusPublish message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: lobby.IUserStatusPublish, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserStatusPublish message, length delimited. Does not implicitly {@link lobby.UserStatusPublish.verify|verify} messages.
         * @param message UserStatusPublish message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: lobby.IUserStatusPublish, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserStatusPublish message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserStatusPublish
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): lobby.UserStatusPublish;

        /**
         * Decodes a UserStatusPublish message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserStatusPublish
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): lobby.UserStatusPublish;

        /**
         * Verifies a UserStatusPublish message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserStatusPublish message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserStatusPublish
         */
        public static fromObject(object: { [k: string]: any }): lobby.UserStatusPublish;

        /**
         * Creates a plain object from a UserStatusPublish message. Also converts values to other types if specified.
         * @param message UserStatusPublish
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: lobby.UserStatusPublish, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserStatusPublish to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UserStatusPublish
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
        constructor(properties?: lobby.IMatchCreateRequest);

        /** MatchCreateRequest players. */
        public players: string[];

        /**
         * Creates a new MatchCreateRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchCreateRequest instance
         */
        public static create(properties?: lobby.IMatchCreateRequest): lobby.MatchCreateRequest;

        /**
         * Encodes the specified MatchCreateRequest message. Does not implicitly {@link lobby.MatchCreateRequest.verify|verify} messages.
         * @param message MatchCreateRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: lobby.IMatchCreateRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchCreateRequest message, length delimited. Does not implicitly {@link lobby.MatchCreateRequest.verify|verify} messages.
         * @param message MatchCreateRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: lobby.IMatchCreateRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchCreateRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchCreateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): lobby.MatchCreateRequest;

        /**
         * Decodes a MatchCreateRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchCreateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): lobby.MatchCreateRequest;

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
        public static fromObject(object: { [k: string]: any }): lobby.MatchCreateRequest;

        /**
         * Creates a plain object from a MatchCreateRequest message. Also converts values to other types if specified.
         * @param message MatchCreateRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: lobby.MatchCreateRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: lobby.IMatchCreateResponse);

        /** MatchCreateResponse gameId. */
        public gameId: string;

        /**
         * Creates a new MatchCreateResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchCreateResponse instance
         */
        public static create(properties?: lobby.IMatchCreateResponse): lobby.MatchCreateResponse;

        /**
         * Encodes the specified MatchCreateResponse message. Does not implicitly {@link lobby.MatchCreateResponse.verify|verify} messages.
         * @param message MatchCreateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: lobby.IMatchCreateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchCreateResponse message, length delimited. Does not implicitly {@link lobby.MatchCreateResponse.verify|verify} messages.
         * @param message MatchCreateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: lobby.IMatchCreateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchCreateResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchCreateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): lobby.MatchCreateResponse;

        /**
         * Decodes a MatchCreateResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchCreateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): lobby.MatchCreateResponse;

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
        public static fromObject(object: { [k: string]: any }): lobby.MatchCreateResponse;

        /**
         * Creates a plain object from a MatchCreateResponse message. Also converts values to other types if specified.
         * @param message MatchCreateResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: lobby.MatchCreateResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
}

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

        /** NotificationMessage friendUpdate */
        friendUpdate?: (notif.IFriendUpdate|null);

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

        /** NotificationMessage friendUpdate. */
        public friendUpdate?: (notif.IFriendUpdate|null);

        /** NotificationMessage gameInvite. */
        public gameInvite?: (notif.IGameInvite|null);

        /** NotificationMessage statusUpdate. */
        public statusUpdate?: (notif.IStatusUpdate|null);

        /** NotificationMessage payload. */
        public payload?: ("friendUpdate"|"gameInvite"|"statusUpdate");

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
