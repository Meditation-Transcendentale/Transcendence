export function encodeBall(message) {
  let bb = popByteBuffer();
  _encodeBall(message, bb);
  return toUint8Array(bb);
}

function _encodeBall(message, bb) {
  // optional uint32 id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $id);
  }

  // optional int32 x = 2;
  let $x = message.x;
  if ($x !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($x));
  }

  // optional int32 y = 3;
  let $y = message.y;
  if ($y !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($y));
  }

  // optional int32 vx = 4;
  let $vx = message.vx;
  if ($vx !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($vx));
  }

  // optional int32 vy = 5;
  let $vy = message.vy;
  if ($vy !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($vy));
  }
}

export function decodeBall(binary) {
  return _decodeBall(wrapByteBuffer(binary));
}

function _decodeBall(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 id = 1;
      case 1: {
        message.id = readVarint32(bb) >>> 0;
        break;
      }

      // optional int32 x = 2;
      case 2: {
        message.x = readVarint32(bb);
        break;
      }

      // optional int32 y = 3;
      case 3: {
        message.y = readVarint32(bb);
        break;
      }

      // optional int32 vx = 4;
      case 4: {
        message.vx = readVarint32(bb);
        break;
      }

      // optional int32 vy = 5;
      case 5: {
        message.vy = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodePaddle(message) {
  let bb = popByteBuffer();
  _encodePaddle(message, bb);
  return toUint8Array(bb);
}

function _encodePaddle(message, bb) {
  // optional uint32 id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $id);
  }

  // optional int32 offset = 2;
  let $offset = message.offset;
  if ($offset !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($offset));
  }
}

export function decodePaddle(binary) {
  return _decodePaddle(wrapByteBuffer(binary));
}

function _decodePaddle(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 id = 1;
      case 1: {
        message.id = readVarint32(bb) >>> 0;
        break;
      }

      // optional int32 offset = 2;
      case 2: {
        message.offset = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeScoreEntry(message) {
  let bb = popByteBuffer();
  _encodeScoreEntry(message, bb);
  return toUint8Array(bb);
}

function _encodeScoreEntry(message, bb) {
  // optional uint32 playerId = 1;
  let $playerId = message.playerId;
  if ($playerId !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $playerId);
  }

  // optional uint32 score = 2;
  let $score = message.score;
  if ($score !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, $score);
  }
}

export function decodeScoreEntry(binary) {
  return _decodeScoreEntry(wrapByteBuffer(binary));
}

function _decodeScoreEntry(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 playerId = 1;
      case 1: {
        message.playerId = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 score = 2;
      case 2: {
        message.score = readVarint32(bb) >>> 0;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeFullState(message) {
  let bb = popByteBuffer();
  _encodeFullState(message, bb);
  return toUint8Array(bb);
}

function _encodeFullState(message, bb) {
  // optional uint32 gameId = 1;
  let $gameId = message.gameId;
  if ($gameId !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $gameId);
  }

  // optional uint32 tick = 2;
  let $tick = message.tick;
  if ($tick !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, $tick);
  }

  // repeated Ball balls = 3;
  let array$balls = message.balls;
  if (array$balls !== undefined) {
    for (let value of array$balls) {
      writeVarint32(bb, 26);
      let nested = popByteBuffer();
      _encodeBall(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated Paddle paddles = 4;
  let array$paddles = message.paddles;
  if (array$paddles !== undefined) {
    for (let value of array$paddles) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodePaddle(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional bool isPaused = 5;
  let $isPaused = message.isPaused;
  if ($isPaused !== undefined) {
    writeVarint32(bb, 40);
    writeByte(bb, $isPaused ? 1 : 0);
  }

  // optional bool isGameOver = 6;
  let $isGameOver = message.isGameOver;
  if ($isGameOver !== undefined) {
    writeVarint32(bb, 48);
    writeByte(bb, $isGameOver ? 1 : 0);
  }

  // repeated ScoreEntry scores = 7;
  let array$scores = message.scores;
  if (array$scores !== undefined) {
    for (let value of array$scores) {
      writeVarint32(bb, 58);
      let nested = popByteBuffer();
      _encodeScoreEntry(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeFullState(binary) {
  return _decodeFullState(wrapByteBuffer(binary));
}

function _decodeFullState(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 gameId = 1;
      case 1: {
        message.gameId = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 tick = 2;
      case 2: {
        message.tick = readVarint32(bb) >>> 0;
        break;
      }

      // repeated Ball balls = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        let values = message.balls || (message.balls = []);
        values.push(_decodeBall(bb));
        bb.limit = limit;
        break;
      }

      // repeated Paddle paddles = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.paddles || (message.paddles = []);
        values.push(_decodePaddle(bb));
        bb.limit = limit;
        break;
      }

      // optional bool isPaused = 5;
      case 5: {
        message.isPaused = !!readByte(bb);
        break;
      }

      // optional bool isGameOver = 6;
      case 6: {
        message.isGameOver = !!readByte(bb);
        break;
      }

      // repeated ScoreEntry scores = 7;
      case 7: {
        let limit = pushTemporaryLength(bb);
        let values = message.scores || (message.scores = []);
        values.push(_decodeScoreEntry(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodePlayerInput(message) {
  let bb = popByteBuffer();
  _encodePlayerInput(message, bb);
  return toUint8Array(bb);
}

function _encodePlayerInput(message, bb) {
  // optional string playerId = 1;
  let $playerId = message.playerId;
  if ($playerId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $playerId);
  }

  // optional float x = 2;
  let $x = message.x;
  if ($x !== undefined) {
    writeVarint32(bb, 21);
    writeFloat(bb, $x);
  }

  // optional float y = 3;
  let $y = message.y;
  if ($y !== undefined) {
    writeVarint32(bb, 29);
    writeFloat(bb, $y);
  }
}

export function decodePlayerInput(binary) {
  return _decodePlayerInput(wrapByteBuffer(binary));
}

function _decodePlayerInput(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string playerId = 1;
      case 1: {
        message.playerId = readString(bb, readVarint32(bb));
        break;
      }

      // optional float x = 2;
      case 2: {
        message.x = readFloat(bb);
        break;
      }

      // optional float y = 3;
      case 3: {
        message.y = readFloat(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeMatchCreateRequest(message) {
  let bb = popByteBuffer();
  _encodeMatchCreateRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeMatchCreateRequest(message, bb) {
  // optional string mode = 1;
  let $mode = message.mode;
  if ($mode !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $mode);
  }

  // repeated string players = 2;
  let array$players = message.players;
  if (array$players !== undefined) {
    for (let value of array$players) {
      writeVarint32(bb, 18);
      writeString(bb, value);
    }
  }

  // optional map<string, string> options = 3;
  let map$options = message.options;
  if (map$options !== undefined) {
    for (let key in map$options) {
      let nested = popByteBuffer();
      let value = map$options[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 18);
      writeString(nested, value);
      writeVarint32(bb, 26);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeMatchCreateRequest(binary) {
  return _decodeMatchCreateRequest(wrapByteBuffer(binary));
}

function _decodeMatchCreateRequest(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string mode = 1;
      case 1: {
        message.mode = readString(bb, readVarint32(bb));
        break;
      }

      // repeated string players = 2;
      case 2: {
        let values = message.players || (message.players = []);
        values.push(readString(bb, readVarint32(bb)));
        break;
      }

      // optional map<string, string> options = 3;
      case 3: {
        let values = message.options || (message.options = {});
        let outerLimit = pushTemporaryLength(bb);
        let key;
        let value;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readString(bb, readVarint32(bb));
              break;
            }
            case 2: {
              value = readString(bb, readVarint32(bb));
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: options");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeMatchCreateResponse(message) {
  let bb = popByteBuffer();
  _encodeMatchCreateResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeMatchCreateResponse(message, bb) {
  // optional string gameId = 1;
  let $gameId = message.gameId;
  if ($gameId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $gameId);
  }

  // optional string error = 2;
  let $error = message.error;
  if ($error !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $error);
  }
}

export function decodeMatchCreateResponse(binary) {
  return _decodeMatchCreateResponse(wrapByteBuffer(binary));
}

function _decodeMatchCreateResponse(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string gameId = 1;
      case 1: {
        message.gameId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string error = 2;
      case 2: {
        message.error = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodePhysicsRequest(message) {
  let bb = popByteBuffer();
  _encodePhysicsRequest(message, bb);
  return toUint8Array(bb);
}

function _encodePhysicsRequest(message, bb) {
  // optional string gameId = 1;
  let $gameId = message.gameId;
  if ($gameId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $gameId);
  }

  // repeated PlayerInput inputs = 2;
  let array$inputs = message.inputs;
  if (array$inputs !== undefined) {
    for (let value of array$inputs) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodePlayerInput(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional FullState lastState = 3;
  let $lastState = message.lastState;
  if ($lastState !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeFullState($lastState, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodePhysicsRequest(binary) {
  return _decodePhysicsRequest(wrapByteBuffer(binary));
}

function _decodePhysicsRequest(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string gameId = 1;
      case 1: {
        message.gameId = readString(bb, readVarint32(bb));
        break;
      }

      // repeated PlayerInput inputs = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.inputs || (message.inputs = []);
        values.push(_decodePlayerInput(bb));
        bb.limit = limit;
        break;
      }

      // optional FullState lastState = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.lastState = _decodeFullState(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodePhysicsResponse(message) {
  let bb = popByteBuffer();
  _encodePhysicsResponse(message, bb);
  return toUint8Array(bb);
}

function _encodePhysicsResponse(message, bb) {
  // optional FullState newState = 1;
  let $newState = message.newState;
  if ($newState !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeFullState($newState, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string error = 2;
  let $error = message.error;
  if ($error !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $error);
  }

  // optional bool goalScored = 3;
  let $goalScored = message.goalScored;
  if ($goalScored !== undefined) {
    writeVarint32(bb, 24);
    writeByte(bb, $goalScored ? 1 : 0);
  }

  // optional string scorerId = 4;
  let $scorerId = message.scorerId;
  if ($scorerId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $scorerId);
  }
}

export function decodePhysicsResponse(binary) {
  return _decodePhysicsResponse(wrapByteBuffer(binary));
}

function _decodePhysicsResponse(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional FullState newState = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.newState = _decodeFullState(bb);
        bb.limit = limit;
        break;
      }

      // optional string error = 2;
      case 2: {
        message.error = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool goalScored = 3;
      case 3: {
        message.goalScored = !!readByte(bb);
        break;
      }

      // optional string scorerId = 4;
      case 4: {
        message.scorerId = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeStateUpdate(message) {
  let bb = popByteBuffer();
  _encodeStateUpdate(message, bb);
  return toUint8Array(bb);
}

function _encodeStateUpdate(message, bb) {
  // optional FullState state = 1;
  let $state = message.state;
  if ($state !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeFullState($state, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeStateUpdate(binary) {
  return _decodeStateUpdate(wrapByteBuffer(binary));
}

function _decodeStateUpdate(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional FullState state = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.state = _decodeFullState(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeMatchSetup(message) {
  let bb = popByteBuffer();
  _encodeMatchSetup(message, bb);
  return toUint8Array(bb);
}

function _encodeMatchSetup(message, bb) {
  // optional string mode = 1;
  let $mode = message.mode;
  if ($mode !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $mode);
  }

  // optional string gameId = 2;
  let $gameId = message.gameId;
  if ($gameId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $gameId);
  }

  // repeated string players = 3;
  let array$players = message.players;
  if (array$players !== undefined) {
    for (let value of array$players) {
      writeVarint32(bb, 26);
      writeString(bb, value);
    }
  }

  // optional map<string, string> options = 4;
  let map$options = message.options;
  if (map$options !== undefined) {
    for (let key in map$options) {
      let nested = popByteBuffer();
      let value = map$options[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 18);
      writeString(nested, value);
      writeVarint32(bb, 34);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeMatchSetup(binary) {
  return _decodeMatchSetup(wrapByteBuffer(binary));
}

function _decodeMatchSetup(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string mode = 1;
      case 1: {
        message.mode = readString(bb, readVarint32(bb));
        break;
      }

      // optional string gameId = 2;
      case 2: {
        message.gameId = readString(bb, readVarint32(bb));
        break;
      }

      // repeated string players = 3;
      case 3: {
        let values = message.players || (message.players = []);
        values.push(readString(bb, readVarint32(bb)));
        break;
      }

      // optional map<string, string> options = 4;
      case 4: {
        let values = message.options || (message.options = {});
        let outerLimit = pushTemporaryLength(bb);
        let key;
        let value;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readString(bb, readVarint32(bb));
              break;
            }
            case 2: {
              value = readString(bb, readVarint32(bb));
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: options");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeMatchInput(message) {
  let bb = popByteBuffer();
  _encodeMatchInput(message, bb);
  return toUint8Array(bb);
}

function _encodeMatchInput(message, bb) {
  // optional string gameId = 1;
  let $gameId = message.gameId;
  if ($gameId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $gameId);
  }

  // repeated PlayerInput inputs = 2;
  let array$inputs = message.inputs;
  if (array$inputs !== undefined) {
    for (let value of array$inputs) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodePlayerInput(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeMatchInput(binary) {
  return _decodeMatchInput(wrapByteBuffer(binary));
}

function _decodeMatchInput(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string gameId = 1;
      case 1: {
        message.gameId = readString(bb, readVarint32(bb));
        break;
      }

      // repeated PlayerInput inputs = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.inputs || (message.inputs = []);
        values.push(_decodePlayerInput(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeGameOver(message) {
  let bb = popByteBuffer();
  _encodeGameOver(message, bb);
  return toUint8Array(bb);
}

function _encodeGameOver(message, bb) {
  // optional uint32 winnerId = 1;
  let $winnerId = message.winnerId;
  if ($winnerId !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $winnerId);
  }

  // repeated ScoreEntry finalScores = 2;
  let array$finalScores = message.finalScores;
  if (array$finalScores !== undefined) {
    for (let value of array$finalScores) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeScoreEntry(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeGameOver(binary) {
  return _decodeGameOver(wrapByteBuffer(binary));
}

function _decodeGameOver(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 winnerId = 1;
      case 1: {
        message.winnerId = readVarint32(bb) >>> 0;
        break;
      }

      // repeated ScoreEntry finalScores = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.finalScores || (message.finalScores = []);
        values.push(_decodeScoreEntry(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeGamePaused(message) {
  let bb = popByteBuffer();
  _encodeGamePaused(message, bb);
  return toUint8Array(bb);
}

function _encodeGamePaused(message, bb) {
  // optional string reason = 1;
  let $reason = message.reason;
  if ($reason !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $reason);
  }
}

export function decodeGamePaused(binary) {
  return _decodeGamePaused(wrapByteBuffer(binary));
}

function _decodeGamePaused(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string reason = 1;
      case 1: {
        message.reason = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeGameReset(message) {
  let bb = popByteBuffer();
  _encodeGameReset(message, bb);
  return toUint8Array(bb);
}

function _encodeGameReset(message, bb) {
  // optional string reason = 1;
  let $reason = message.reason;
  if ($reason !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $reason);
  }
}

export function decodeGameReset(binary) {
  return _decodeGameReset(wrapByteBuffer(binary));
}

function _decodeGameReset(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string reason = 1;
      case 1: {
        message.reason = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeWsMessage(message) {
  let bb = popByteBuffer();
  _encodeWsMessage(message, bb);
  return toUint8Array(bb);
}

function _encodeWsMessage(message, bb) {
  // optional FullState state = 1;
  let $state = message.state;
  if ($state !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeFullState($state, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional GameOver gameOver = 2;
  let $gameOver = message.gameOver;
  if ($gameOver !== undefined) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeGameOver($gameOver, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional GamePaused gamePaused = 3;
  let $gamePaused = message.gamePaused;
  if ($gamePaused !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeGamePaused($gamePaused, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional GameReset gameReset = 4;
  let $gameReset = message.gameReset;
  if ($gameReset !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeGameReset($gameReset, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeWsMessage(binary) {
  return _decodeWsMessage(wrapByteBuffer(binary));
}

function _decodeWsMessage(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional FullState state = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.state = _decodeFullState(bb);
        bb.limit = limit;
        break;
      }

      // optional GameOver gameOver = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.gameOver = _decodeGameOver(bb);
        bb.limit = limit;
        break;
      }

      // optional GamePaused gamePaused = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.gamePaused = _decodeGamePaused(bb);
        bb.limit = limit;
        break;
      }

      // optional GameReset gameReset = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameReset = _decodeGameReset(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

function pushTemporaryLength(bb) {
  let length = readVarint32(bb);
  let limit = bb.limit;
  bb.limit = bb.offset + length;
  return limit;
}

function skipUnknownField(bb, type) {
  switch (type) {
    case 0: while (readByte(bb) & 0x80) { } break;
    case 2: skip(bb, readVarint32(bb)); break;
    case 5: skip(bb, 4); break;
    case 1: skip(bb, 8); break;
    default: throw new Error("Unimplemented type: " + type);
  }
}

function stringToLong(value) {
  return {
    low: value.charCodeAt(0) | (value.charCodeAt(1) << 16),
    high: value.charCodeAt(2) | (value.charCodeAt(3) << 16),
    unsigned: false,
  };
}

function longToString(value) {
  let low = value.low;
  let high = value.high;
  return String.fromCharCode(
    low & 0xFFFF,
    low >>> 16,
    high & 0xFFFF,
    high >>> 16);
}

// The code below was modified from https://github.com/protobufjs/bytebuffer.js
// which is under the Apache License 2.0.

let f32 = new Float32Array(1);
let f32_u8 = new Uint8Array(f32.buffer);

let f64 = new Float64Array(1);
let f64_u8 = new Uint8Array(f64.buffer);

function intToLong(value) {
  value |= 0;
  return {
    low: value,
    high: value >> 31,
    unsigned: value >= 0,
  };
}

let bbStack = [];

function popByteBuffer() {
  const bb = bbStack.pop();
  if (!bb) return { bytes: new Uint8Array(64), offset: 0, limit: 0 };
  bb.offset = bb.limit = 0;
  return bb;
}

function pushByteBuffer(bb) {
  bbStack.push(bb);
}

function wrapByteBuffer(bytes) {
  return { bytes, offset: 0, limit: bytes.length };
}

function toUint8Array(bb) {
  let bytes = bb.bytes;
  let limit = bb.limit;
  return bytes.length === limit ? bytes : bytes.subarray(0, limit);
}

function skip(bb, offset) {
  if (bb.offset + offset > bb.limit) {
    throw new Error('Skip past limit');
  }
  bb.offset += offset;
}

function isAtEnd(bb) {
  return bb.offset >= bb.limit;
}

function grow(bb, count) {
  let bytes = bb.bytes;
  let offset = bb.offset;
  let limit = bb.limit;
  let finalOffset = offset + count;
  if (finalOffset > bytes.length) {
    let newBytes = new Uint8Array(finalOffset * 2);
    newBytes.set(bytes);
    bb.bytes = newBytes;
  }
  bb.offset = finalOffset;
  if (finalOffset > limit) {
    bb.limit = finalOffset;
  }
  return offset;
}

function advance(bb, count) {
  let offset = bb.offset;
  if (offset + count > bb.limit) {
    throw new Error('Read past limit');
  }
  bb.offset += count;
  return offset;
}

function readBytes(bb, count) {
  let offset = advance(bb, count);
  return bb.bytes.subarray(offset, offset + count);
}

function writeBytes(bb, buffer) {
  let offset = grow(bb, buffer.length);
  bb.bytes.set(buffer, offset);
}

function readString(bb, count) {
  // Sadly a hand-coded UTF8 decoder is much faster than subarray+TextDecoder in V8
  let offset = advance(bb, count);
  let fromCharCode = String.fromCharCode;
  let bytes = bb.bytes;
  let invalid = '\uFFFD';
  let text = '';

  for (let i = 0; i < count; i++) {
    let c1 = bytes[i + offset], c2, c3, c4, c;

    // 1 byte
    if ((c1 & 0x80) === 0) {
      text += fromCharCode(c1);
    }

    // 2 bytes
    else if ((c1 & 0xE0) === 0xC0) {
      if (i + 1 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        if ((c2 & 0xC0) !== 0x80) text += invalid;
        else {
          c = ((c1 & 0x1F) << 6) | (c2 & 0x3F);
          if (c < 0x80) text += invalid;
          else {
            text += fromCharCode(c);
            i++;
          }
        }
      }
    }

    // 3 bytes
    else if ((c1 & 0xF0) == 0xE0) {
      if (i + 2 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        if (((c2 | (c3 << 8)) & 0xC0C0) !== 0x8080) text += invalid;
        else {
          c = ((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
          if (c < 0x0800 || (c >= 0xD800 && c <= 0xDFFF)) text += invalid;
          else {
            text += fromCharCode(c);
            i += 2;
          }
        }
      }
    }

    // 4 bytes
    else if ((c1 & 0xF8) == 0xF0) {
      if (i + 3 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        c4 = bytes[i + offset + 3];
        if (((c2 | (c3 << 8) | (c4 << 16)) & 0xC0C0C0) !== 0x808080) text += invalid;
        else {
          c = ((c1 & 0x07) << 0x12) | ((c2 & 0x3F) << 0x0C) | ((c3 & 0x3F) << 0x06) | (c4 & 0x3F);
          if (c < 0x10000 || c > 0x10FFFF) text += invalid;
          else {
            c -= 0x10000;
            text += fromCharCode((c >> 10) + 0xD800, (c & 0x3FF) + 0xDC00);
            i += 3;
          }
        }
      }
    }

    else text += invalid;
  }

  return text;
}

function writeString(bb, text) {
  // Sadly a hand-coded UTF8 encoder is much faster than TextEncoder+set in V8
  let n = text.length;
  let byteCount = 0;

  // Write the byte count first
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    byteCount += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }
  writeVarint32(bb, byteCount);

  let offset = grow(bb, byteCount);
  let bytes = bb.bytes;

  // Then write the bytes
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    if (c < 0x80) {
      bytes[offset++] = c;
    } else {
      if (c < 0x800) {
        bytes[offset++] = ((c >> 6) & 0x1F) | 0xC0;
      } else {
        if (c < 0x10000) {
          bytes[offset++] = ((c >> 12) & 0x0F) | 0xE0;
        } else {
          bytes[offset++] = ((c >> 18) & 0x07) | 0xF0;
          bytes[offset++] = ((c >> 12) & 0x3F) | 0x80;
        }
        bytes[offset++] = ((c >> 6) & 0x3F) | 0x80;
      }
      bytes[offset++] = (c & 0x3F) | 0x80;
    }
  }
}

function writeByteBuffer(bb, buffer) {
  let offset = grow(bb, buffer.limit);
  let from = bb.bytes;
  let to = buffer.bytes;

  // This for loop is much faster than subarray+set on V8
  for (let i = 0, n = buffer.limit; i < n; i++) {
    from[i + offset] = to[i];
  }
}

function readByte(bb) {
  return bb.bytes[advance(bb, 1)];
}

function writeByte(bb, value) {
  let offset = grow(bb, 1);
  bb.bytes[offset] = value;
}

function readFloat(bb) {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f32_u8[0] = bytes[offset++];
  f32_u8[1] = bytes[offset++];
  f32_u8[2] = bytes[offset++];
  f32_u8[3] = bytes[offset++];
  return f32[0];
}

function writeFloat(bb, value) {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  f32[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f32_u8[0];
  bytes[offset++] = f32_u8[1];
  bytes[offset++] = f32_u8[2];
  bytes[offset++] = f32_u8[3];
}

function readDouble(bb) {
  let offset = advance(bb, 8);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f64_u8[0] = bytes[offset++];
  f64_u8[1] = bytes[offset++];
  f64_u8[2] = bytes[offset++];
  f64_u8[3] = bytes[offset++];
  f64_u8[4] = bytes[offset++];
  f64_u8[5] = bytes[offset++];
  f64_u8[6] = bytes[offset++];
  f64_u8[7] = bytes[offset++];
  return f64[0];
}

function writeDouble(bb, value) {
  let offset = grow(bb, 8);
  let bytes = bb.bytes;
  f64[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f64_u8[0];
  bytes[offset++] = f64_u8[1];
  bytes[offset++] = f64_u8[2];
  bytes[offset++] = f64_u8[3];
  bytes[offset++] = f64_u8[4];
  bytes[offset++] = f64_u8[5];
  bytes[offset++] = f64_u8[6];
  bytes[offset++] = f64_u8[7];
}

function readInt32(bb) {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  );
}

function writeInt32(bb, value) {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  bytes[offset] = value;
  bytes[offset + 1] = value >> 8;
  bytes[offset + 2] = value >> 16;
  bytes[offset + 3] = value >> 24;
}

function readInt64(bb, unsigned) {
  return {
    low: readInt32(bb),
    high: readInt32(bb),
    unsigned,
  };
}

function writeInt64(bb, value) {
  writeInt32(bb, value.low);
  writeInt32(bb, value.high);
}

function readVarint32(bb) {
  let c = 0;
  let value = 0;
  let b;
  do {
    b = readByte(bb);
    if (c < 32) value |= (b & 0x7F) << c;
    c += 7;
  } while (b & 0x80);
  return value;
}

function writeVarint32(bb, value) {
  value >>>= 0;
  while (value >= 0x80) {
    writeByte(bb, (value & 0x7f) | 0x80);
    value >>>= 7;
  }
  writeByte(bb, value);
}

function readVarint64(bb, unsigned) {
  let part0 = 0;
  let part1 = 0;
  let part2 = 0;
  let b;

  b = readByte(bb); part0 = (b & 0x7F); if (b & 0x80) {
    b = readByte(bb); part0 |= (b & 0x7F) << 7; if (b & 0x80) {
      b = readByte(bb); part0 |= (b & 0x7F) << 14; if (b & 0x80) {
        b = readByte(bb); part0 |= (b & 0x7F) << 21; if (b & 0x80) {

          b = readByte(bb); part1 = (b & 0x7F); if (b & 0x80) {
            b = readByte(bb); part1 |= (b & 0x7F) << 7; if (b & 0x80) {
              b = readByte(bb); part1 |= (b & 0x7F) << 14; if (b & 0x80) {
                b = readByte(bb); part1 |= (b & 0x7F) << 21; if (b & 0x80) {

                  b = readByte(bb); part2 = (b & 0x7F); if (b & 0x80) {
                    b = readByte(bb); part2 |= (b & 0x7F) << 7;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    low: part0 | (part1 << 28),
    high: (part1 >>> 4) | (part2 << 24),
    unsigned,
  };
}

function writeVarint64(bb, value) {
  let part0 = value.low >>> 0;
  let part1 = ((value.low >>> 28) | (value.high << 4)) >>> 0;
  let part2 = value.high >>> 24;

  // ref: src/google/protobuf/io/coded_stream.cc
  let size =
    part2 === 0 ?
      part1 === 0 ?
        part0 < 1 << 14 ?
          part0 < 1 << 7 ? 1 : 2 :
          part0 < 1 << 21 ? 3 : 4 :
        part1 < 1 << 14 ?
          part1 < 1 << 7 ? 5 : 6 :
          part1 < 1 << 21 ? 7 : 8 :
      part2 < 1 << 7 ? 9 : 10;

  let offset = grow(bb, size);
  let bytes = bb.bytes;

  switch (size) {
    case 10: bytes[offset + 9] = (part2 >>> 7) & 0x01;
    case 9: bytes[offset + 8] = size !== 9 ? part2 | 0x80 : part2 & 0x7F;
    case 8: bytes[offset + 7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
    case 7: bytes[offset + 6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
    case 6: bytes[offset + 5] = size !== 6 ? (part1 >>> 7) | 0x80 : (part1 >>> 7) & 0x7F;
    case 5: bytes[offset + 4] = size !== 5 ? part1 | 0x80 : part1 & 0x7F;
    case 4: bytes[offset + 3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
    case 3: bytes[offset + 2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
    case 2: bytes[offset + 1] = size !== 2 ? (part0 >>> 7) | 0x80 : (part0 >>> 7) & 0x7F;
    case 1: bytes[offset] = size !== 1 ? part0 | 0x80 : part0 & 0x7F;
  }
}

function readVarint32ZigZag(bb) {
  let value = readVarint32(bb);

  // ref: src/google/protobuf/wire_format_lite.h
  return (value >>> 1) ^ -(value & 1);
}

function writeVarint32ZigZag(bb, value) {
  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint32(bb, (value << 1) ^ (value >> 31));
}

function readVarint64ZigZag(bb) {
  let value = readVarint64(bb, /* unsigned */ false);
  let low = value.low;
  let high = value.high;
  let flip = -(low & 1);

  // ref: src/google/protobuf/wire_format_lite.h
  return {
    low: ((low >>> 1) | (high << 31)) ^ flip,
    high: (high >>> 1) ^ flip,
    unsigned: false,
  };
}

function writeVarint64ZigZag(bb, value) {
  let low = value.low;
  let high = value.high;
  let flip = high >> 31;

  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint64(bb, {
    low: (low << 1) ^ flip,
    high: ((high << 1) | (low >>> 31)) ^ flip,
    unsigned: false,
  });
}
