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

    /** Properties of a ScoreUpdate. */
    interface IScoreUpdate {

        /** ScoreUpdate score */
        score?: (number[]|null);
    }

    /** Represents a ScoreUpdate. */
    class ScoreUpdate implements IScoreUpdate {

        /**
         * Constructs a new ScoreUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: shared.IScoreUpdate);

        /** ScoreUpdate score. */
        public score: number[];

        /**
         * Creates a new ScoreUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ScoreUpdate instance
         */
        public static create(properties?: shared.IScoreUpdate): shared.ScoreUpdate;

        /**
         * Encodes the specified ScoreUpdate message. Does not implicitly {@link shared.ScoreUpdate.verify|verify} messages.
         * @param message ScoreUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: shared.IScoreUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ScoreUpdate message, length delimited. Does not implicitly {@link shared.ScoreUpdate.verify|verify} messages.
         * @param message ScoreUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: shared.IScoreUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ScoreUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ScoreUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): shared.ScoreUpdate;

        /**
         * Decodes a ScoreUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ScoreUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): shared.ScoreUpdate;

        /**
         * Verifies a ScoreUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ScoreUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ScoreUpdate
         */
        public static fromObject(object: { [k: string]: any }): shared.ScoreUpdate;

        /**
         * Creates a plain object from a ScoreUpdate message. Also converts values to other types if specified.
         * @param message ScoreUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: shared.ScoreUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ScoreUpdate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ScoreUpdate
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a MatchEnd. */
    interface IMatchEnd {

        /** MatchEnd winnerId */
        winnerId?: (string|null);

        /** MatchEnd loserId */
        loserId?: (string|null);

        /** MatchEnd score */
        score?: (number[]|null);

        /** MatchEnd forfeitId */
        forfeitId?: (string|null);
    }

    /** Represents a MatchEnd. */
    class MatchEnd implements IMatchEnd {

        /**
         * Constructs a new MatchEnd.
         * @param [properties] Properties to set
         */
        constructor(properties?: shared.IMatchEnd);

        /** MatchEnd winnerId. */
        public winnerId: string;

        /** MatchEnd loserId. */
        public loserId: string;

        /** MatchEnd score. */
        public score: number[];

        /** MatchEnd forfeitId. */
        public forfeitId: string;

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

/** Namespace userinterface. */
export namespace userinterface {

    /** Properties of a PaddleUpdate. */
    interface IPaddleUpdate {

        /** PaddleUpdate paddleId */
        paddleId?: (number|null);

        /** PaddleUpdate move */
        move?: (number|null);
    }

    /** Represents a PaddleUpdate. */
    class PaddleUpdate implements IPaddleUpdate {

        /**
         * Constructs a new PaddleUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: userinterface.IPaddleUpdate);

        /** PaddleUpdate paddleId. */
        public paddleId: number;

        /** PaddleUpdate move. */
        public move: number;

        /**
         * Creates a new PaddleUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PaddleUpdate instance
         */
        public static create(properties?: userinterface.IPaddleUpdate): userinterface.PaddleUpdate;

        /**
         * Encodes the specified PaddleUpdate message. Does not implicitly {@link userinterface.PaddleUpdate.verify|verify} messages.
         * @param message PaddleUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: userinterface.IPaddleUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PaddleUpdate message, length delimited. Does not implicitly {@link userinterface.PaddleUpdate.verify|verify} messages.
         * @param message PaddleUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: userinterface.IPaddleUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PaddleUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PaddleUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): userinterface.PaddleUpdate;

        /**
         * Decodes a PaddleUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PaddleUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): userinterface.PaddleUpdate;

        /**
         * Verifies a PaddleUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PaddleUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PaddleUpdate
         */
        public static fromObject(object: { [k: string]: any }): userinterface.PaddleUpdate;

        /**
         * Creates a plain object from a PaddleUpdate message. Also converts values to other types if specified.
         * @param message PaddleUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: userinterface.PaddleUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PaddleUpdate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PaddleUpdate
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
        constructor(properties?: userinterface.IQuitMessage);

        /** QuitMessage uuid. */
        public uuid: string;

        /** QuitMessage lobbyId. */
        public lobbyId: string;

        /**
         * Creates a new QuitMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QuitMessage instance
         */
        public static create(properties?: userinterface.IQuitMessage): userinterface.QuitMessage;

        /**
         * Encodes the specified QuitMessage message. Does not implicitly {@link userinterface.QuitMessage.verify|verify} messages.
         * @param message QuitMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: userinterface.IQuitMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified QuitMessage message, length delimited. Does not implicitly {@link userinterface.QuitMessage.verify|verify} messages.
         * @param message QuitMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: userinterface.IQuitMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a QuitMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns QuitMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): userinterface.QuitMessage;

        /**
         * Decodes a QuitMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns QuitMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): userinterface.QuitMessage;

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
        public static fromObject(object: { [k: string]: any }): userinterface.QuitMessage;

        /**
         * Creates a plain object from a QuitMessage message. Also converts values to other types if specified.
         * @param message QuitMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: userinterface.QuitMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: userinterface.IReadyMessage);

        /** ReadyMessage lobbyId. */
        public lobbyId: string;

        /**
         * Creates a new ReadyMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReadyMessage instance
         */
        public static create(properties?: userinterface.IReadyMessage): userinterface.ReadyMessage;

        /**
         * Encodes the specified ReadyMessage message. Does not implicitly {@link userinterface.ReadyMessage.verify|verify} messages.
         * @param message ReadyMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: userinterface.IReadyMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReadyMessage message, length delimited. Does not implicitly {@link userinterface.ReadyMessage.verify|verify} messages.
         * @param message ReadyMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: userinterface.IReadyMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReadyMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReadyMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): userinterface.ReadyMessage;

        /**
         * Decodes a ReadyMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReadyMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): userinterface.ReadyMessage;

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
        public static fromObject(object: { [k: string]: any }): userinterface.ReadyMessage;

        /**
         * Creates a plain object from a ReadyMessage message. Also converts values to other types if specified.
         * @param message ReadyMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: userinterface.ReadyMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

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

    /** Properties of a SpectateMessage. */
    interface ISpectateMessage {
    }

    /** Represents a SpectateMessage. */
    class SpectateMessage implements ISpectateMessage {

        /**
         * Constructs a new SpectateMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: userinterface.ISpectateMessage);

        /**
         * Creates a new SpectateMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SpectateMessage instance
         */
        public static create(properties?: userinterface.ISpectateMessage): userinterface.SpectateMessage;

        /**
         * Encodes the specified SpectateMessage message. Does not implicitly {@link userinterface.SpectateMessage.verify|verify} messages.
         * @param message SpectateMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: userinterface.ISpectateMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SpectateMessage message, length delimited. Does not implicitly {@link userinterface.SpectateMessage.verify|verify} messages.
         * @param message SpectateMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: userinterface.ISpectateMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SpectateMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SpectateMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): userinterface.SpectateMessage;

        /**
         * Decodes a SpectateMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SpectateMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): userinterface.SpectateMessage;

        /**
         * Verifies a SpectateMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SpectateMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SpectateMessage
         */
        public static fromObject(object: { [k: string]: any }): userinterface.SpectateMessage;

        /**
         * Creates a plain object from a SpectateMessage message. Also converts values to other types if specified.
         * @param message SpectateMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: userinterface.SpectateMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SpectateMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SpectateMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ClientMessage. */
    interface IClientMessage {

        /** ClientMessage paddleUpdate */
        paddleUpdate?: (userinterface.IPaddleUpdate|null);

        /** ClientMessage quit */
        quit?: (userinterface.IQuitMessage|null);

        /** ClientMessage ready */
        ready?: (userinterface.IReadyMessage|null);

        /** ClientMessage spectate */
        spectate?: (userinterface.ISpectateMessage|null);
    }

    /** Represents a ClientMessage. */
    class ClientMessage implements IClientMessage {

        /**
         * Constructs a new ClientMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: userinterface.IClientMessage);

        /** ClientMessage paddleUpdate. */
        public paddleUpdate?: (userinterface.IPaddleUpdate|null);

        /** ClientMessage quit. */
        public quit?: (userinterface.IQuitMessage|null);

        /** ClientMessage ready. */
        public ready?: (userinterface.IReadyMessage|null);

        /** ClientMessage spectate. */
        public spectate?: (userinterface.ISpectateMessage|null);

        /** ClientMessage payload. */
        public payload?: ("paddleUpdate"|"quit"|"ready"|"spectate");

        /**
         * Creates a new ClientMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClientMessage instance
         */
        public static create(properties?: userinterface.IClientMessage): userinterface.ClientMessage;

        /**
         * Encodes the specified ClientMessage message. Does not implicitly {@link userinterface.ClientMessage.verify|verify} messages.
         * @param message ClientMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: userinterface.IClientMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClientMessage message, length delimited. Does not implicitly {@link userinterface.ClientMessage.verify|verify} messages.
         * @param message ClientMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: userinterface.IClientMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClientMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClientMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): userinterface.ClientMessage;

        /**
         * Decodes a ClientMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClientMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): userinterface.ClientMessage;

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
        public static fromObject(object: { [k: string]: any }): userinterface.ClientMessage;

        /**
         * Creates a plain object from a ClientMessage message. Also converts values to other types if specified.
         * @param message ClientMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: userinterface.ClientMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: userinterface.IErrorMessage);

        /** ErrorMessage message. */
        public message: string;

        /**
         * Creates a new ErrorMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ErrorMessage instance
         */
        public static create(properties?: userinterface.IErrorMessage): userinterface.ErrorMessage;

        /**
         * Encodes the specified ErrorMessage message. Does not implicitly {@link userinterface.ErrorMessage.verify|verify} messages.
         * @param message ErrorMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: userinterface.IErrorMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ErrorMessage message, length delimited. Does not implicitly {@link userinterface.ErrorMessage.verify|verify} messages.
         * @param message ErrorMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: userinterface.IErrorMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ErrorMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ErrorMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): userinterface.ErrorMessage;

        /**
         * Decodes an ErrorMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ErrorMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): userinterface.ErrorMessage;

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
        public static fromObject(object: { [k: string]: any }): userinterface.ErrorMessage;

        /**
         * Creates a plain object from an ErrorMessage message. Also converts values to other types if specified.
         * @param message ErrorMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: userinterface.ErrorMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

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

    /** Properties of a WelcomeMessage. */
    interface IWelcomeMessage {

        /** WelcomeMessage paddleId */
        paddleId?: (number|null);
    }

    /** Represents a WelcomeMessage. */
    class WelcomeMessage implements IWelcomeMessage {

        /**
         * Constructs a new WelcomeMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: userinterface.IWelcomeMessage);

        /** WelcomeMessage paddleId. */
        public paddleId: number;

        /**
         * Creates a new WelcomeMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WelcomeMessage instance
         */
        public static create(properties?: userinterface.IWelcomeMessage): userinterface.WelcomeMessage;

        /**
         * Encodes the specified WelcomeMessage message. Does not implicitly {@link userinterface.WelcomeMessage.verify|verify} messages.
         * @param message WelcomeMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: userinterface.IWelcomeMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WelcomeMessage message, length delimited. Does not implicitly {@link userinterface.WelcomeMessage.verify|verify} messages.
         * @param message WelcomeMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: userinterface.IWelcomeMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WelcomeMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WelcomeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): userinterface.WelcomeMessage;

        /**
         * Decodes a WelcomeMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WelcomeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): userinterface.WelcomeMessage;

        /**
         * Verifies a WelcomeMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WelcomeMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WelcomeMessage
         */
        public static fromObject(object: { [k: string]: any }): userinterface.WelcomeMessage;

        /**
         * Creates a plain object from a WelcomeMessage message. Also converts values to other types if specified.
         * @param message WelcomeMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: userinterface.WelcomeMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WelcomeMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for WelcomeMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GameStartMessage. */
    interface IGameStartMessage {
    }

    /** Represents a GameStartMessage. */
    class GameStartMessage implements IGameStartMessage {

        /**
         * Constructs a new GameStartMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: userinterface.IGameStartMessage);

        /**
         * Creates a new GameStartMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameStartMessage instance
         */
        public static create(properties?: userinterface.IGameStartMessage): userinterface.GameStartMessage;

        /**
         * Encodes the specified GameStartMessage message. Does not implicitly {@link userinterface.GameStartMessage.verify|verify} messages.
         * @param message GameStartMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: userinterface.IGameStartMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameStartMessage message, length delimited. Does not implicitly {@link userinterface.GameStartMessage.verify|verify} messages.
         * @param message GameStartMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: userinterface.IGameStartMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameStartMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameStartMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): userinterface.GameStartMessage;

        /**
         * Decodes a GameStartMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameStartMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): userinterface.GameStartMessage;

        /**
         * Verifies a GameStartMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameStartMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameStartMessage
         */
        public static fromObject(object: { [k: string]: any }): userinterface.GameStartMessage;

        /**
         * Creates a plain object from a GameStartMessage message. Also converts values to other types if specified.
         * @param message GameStartMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: userinterface.GameStartMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameStartMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GameStartMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GameEndMessage. */
    interface IGameEndMessage {

        /** GameEndMessage score */
        score?: (number[]|null);
    }

    /** Represents a GameEndMessage. */
    class GameEndMessage implements IGameEndMessage {

        /**
         * Constructs a new GameEndMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: userinterface.IGameEndMessage);

        /** GameEndMessage score. */
        public score: number[];

        /**
         * Creates a new GameEndMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameEndMessage instance
         */
        public static create(properties?: userinterface.IGameEndMessage): userinterface.GameEndMessage;

        /**
         * Encodes the specified GameEndMessage message. Does not implicitly {@link userinterface.GameEndMessage.verify|verify} messages.
         * @param message GameEndMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: userinterface.IGameEndMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameEndMessage message, length delimited. Does not implicitly {@link userinterface.GameEndMessage.verify|verify} messages.
         * @param message GameEndMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: userinterface.IGameEndMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameEndMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameEndMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): userinterface.GameEndMessage;

        /**
         * Decodes a GameEndMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameEndMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): userinterface.GameEndMessage;

        /**
         * Verifies a GameEndMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameEndMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameEndMessage
         */
        public static fromObject(object: { [k: string]: any }): userinterface.GameEndMessage;

        /**
         * Creates a plain object from a GameEndMessage message. Also converts values to other types if specified.
         * @param message GameEndMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: userinterface.GameEndMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameEndMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GameEndMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ServerMessage. */
    interface IServerMessage {

        /** ServerMessage error */
        error?: (userinterface.IErrorMessage|null);

        /** ServerMessage welcome */
        welcome?: (userinterface.IWelcomeMessage|null);

        /** ServerMessage start */
        start?: (userinterface.IGameStartMessage|null);

        /** ServerMessage state */
        state?: (shared.IMatchState|null);

        /** ServerMessage end */
        end?: (userinterface.IGameEndMessage|null);
    }

    /** Represents a ServerMessage. */
    class ServerMessage implements IServerMessage {

        /**
         * Constructs a new ServerMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: userinterface.IServerMessage);

        /** ServerMessage error. */
        public error?: (userinterface.IErrorMessage|null);

        /** ServerMessage welcome. */
        public welcome?: (userinterface.IWelcomeMessage|null);

        /** ServerMessage start. */
        public start?: (userinterface.IGameStartMessage|null);

        /** ServerMessage state. */
        public state?: (shared.IMatchState|null);

        /** ServerMessage end. */
        public end?: (userinterface.IGameEndMessage|null);

        /** ServerMessage payload. */
        public payload?: ("error"|"welcome"|"start"|"state"|"end");

        /**
         * Creates a new ServerMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ServerMessage instance
         */
        public static create(properties?: userinterface.IServerMessage): userinterface.ServerMessage;

        /**
         * Encodes the specified ServerMessage message. Does not implicitly {@link userinterface.ServerMessage.verify|verify} messages.
         * @param message ServerMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: userinterface.IServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ServerMessage message, length delimited. Does not implicitly {@link userinterface.ServerMessage.verify|verify} messages.
         * @param message ServerMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: userinterface.IServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ServerMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): userinterface.ServerMessage;

        /**
         * Decodes a ServerMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): userinterface.ServerMessage;

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
        public static fromObject(object: { [k: string]: any }): userinterface.ServerMessage;

        /**
         * Creates a plain object from a ServerMessage message. Also converts values to other types if specified.
         * @param message ServerMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: userinterface.ServerMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: userinterface.IMatchSetup);

        /** MatchSetup players. */
        public players: string[];

        /**
         * Creates a new MatchSetup instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchSetup instance
         */
        public static create(properties?: userinterface.IMatchSetup): userinterface.MatchSetup;

        /**
         * Encodes the specified MatchSetup message. Does not implicitly {@link userinterface.MatchSetup.verify|verify} messages.
         * @param message MatchSetup message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: userinterface.IMatchSetup, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchSetup message, length delimited. Does not implicitly {@link userinterface.MatchSetup.verify|verify} messages.
         * @param message MatchSetup message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: userinterface.IMatchSetup, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchSetup message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchSetup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): userinterface.MatchSetup;

        /**
         * Decodes a MatchSetup message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchSetup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): userinterface.MatchSetup;

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
        public static fromObject(object: { [k: string]: any }): userinterface.MatchSetup;

        /**
         * Creates a plain object from a MatchSetup message. Also converts values to other types if specified.
         * @param message MatchSetup
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: userinterface.MatchSetup, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: userinterface.IMatchInput);

        /** MatchInput paddleId. */
        public paddleId: number;

        /** MatchInput move. */
        public move: number;

        /**
         * Creates a new MatchInput instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchInput instance
         */
        public static create(properties?: userinterface.IMatchInput): userinterface.MatchInput;

        /**
         * Encodes the specified MatchInput message. Does not implicitly {@link userinterface.MatchInput.verify|verify} messages.
         * @param message MatchInput message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: userinterface.IMatchInput, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchInput message, length delimited. Does not implicitly {@link userinterface.MatchInput.verify|verify} messages.
         * @param message MatchInput message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: userinterface.IMatchInput, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchInput message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): userinterface.MatchInput;

        /**
         * Decodes a MatchInput message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): userinterface.MatchInput;

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
        public static fromObject(object: { [k: string]: any }): userinterface.MatchInput;

        /**
         * Creates a plain object from a MatchInput message. Also converts values to other types if specified.
         * @param message MatchInput
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: userinterface.MatchInput, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: userinterface.IMatchQuit);

        /** MatchQuit uuid. */
        public uuid: string;

        /**
         * Creates a new MatchQuit instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchQuit instance
         */
        public static create(properties?: userinterface.IMatchQuit): userinterface.MatchQuit;

        /**
         * Encodes the specified MatchQuit message. Does not implicitly {@link userinterface.MatchQuit.verify|verify} messages.
         * @param message MatchQuit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: userinterface.IMatchQuit, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchQuit message, length delimited. Does not implicitly {@link userinterface.MatchQuit.verify|verify} messages.
         * @param message MatchQuit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: userinterface.IMatchQuit, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchQuit message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchQuit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): userinterface.MatchQuit;

        /**
         * Decodes a MatchQuit message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchQuit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): userinterface.MatchQuit;

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
        public static fromObject(object: { [k: string]: any }): userinterface.MatchQuit;

        /**
         * Creates a plain object from a MatchQuit message. Also converts values to other types if specified.
         * @param message MatchQuit
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: userinterface.MatchQuit, options?: $protobuf.IConversionOptions): { [k: string]: any };

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

        /** MatchStart uuid */
        uuid?: (string|null);
    }

    /** Represents a MatchStart. */
    class MatchStart implements IMatchStart {

        /**
         * Constructs a new MatchStart.
         * @param [properties] Properties to set
         */
        constructor(properties?: userinterface.IMatchStart);

        /** MatchStart uuid. */
        public uuid: string;

        /**
         * Creates a new MatchStart instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchStart instance
         */
        public static create(properties?: userinterface.IMatchStart): userinterface.MatchStart;

        /**
         * Encodes the specified MatchStart message. Does not implicitly {@link userinterface.MatchStart.verify|verify} messages.
         * @param message MatchStart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: userinterface.IMatchStart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchStart message, length delimited. Does not implicitly {@link userinterface.MatchStart.verify|verify} messages.
         * @param message MatchStart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: userinterface.IMatchStart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchStart message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): userinterface.MatchStart;

        /**
         * Decodes a MatchStart message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): userinterface.MatchStart;

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
        public static fromObject(object: { [k: string]: any }): userinterface.MatchStart;

        /**
         * Creates a plain object from a MatchStart message. Also converts values to other types if specified.
         * @param message MatchStart
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: userinterface.MatchStart, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: userinterface.IMatchEnd);

        /** MatchEnd winner. */
        public winner: number;

        /**
         * Creates a new MatchEnd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchEnd instance
         */
        public static create(properties?: userinterface.IMatchEnd): userinterface.MatchEnd;

        /**
         * Encodes the specified MatchEnd message. Does not implicitly {@link userinterface.MatchEnd.verify|verify} messages.
         * @param message MatchEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: userinterface.IMatchEnd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchEnd message, length delimited. Does not implicitly {@link userinterface.MatchEnd.verify|verify} messages.
         * @param message MatchEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: userinterface.IMatchEnd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchEnd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): userinterface.MatchEnd;

        /**
         * Decodes a MatchEnd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): userinterface.MatchEnd;

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
        public static fromObject(object: { [k: string]: any }): userinterface.MatchEnd;

        /**
         * Creates a plain object from a MatchEnd message. Also converts values to other types if specified.
         * @param message MatchEnd
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: userinterface.MatchEnd, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
