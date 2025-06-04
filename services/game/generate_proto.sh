#!/usr/bin/env bash
set -euo pipefail

# ----------------------------------------------------------------------
# Script: scripts/generate_protos_all.sh
# Purpose: Generate and patch protobuf ESM files for all services,
#          choosing the correct .proto files for each service.
# Usage: 
#   chmod +x scripts/generate_protos_all.sh 
#   ./scripts/generate_protos_all.sh
# ----------------------------------------------------------------------

# 1. Load nvm so that `npx` (and node) are on $PATH.
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  source "$NVM_DIR/nvm.sh"
  nvm use 22.16.0 > /dev/null
else
  echo "⚠️  Could not find nvm at $NVM_DIR. Make sure nvm is installed."
  exit 1
fi

# 2. Shared directory containing all .proto files
SHARED_PROTO_DIR="./proto"

# 3. List of service names (must match your folders under ./services/)
SERVICES=(
  "game-manager"
  "pong-physics"
  "user-interface"
  "lobby-manager"
)

echo "🛠 Starting protobuf generation for all services..."

for svc in "${SERVICES[@]}"; do
  OUT_DIR="$svc/src/proto"
  echo "📦 Generating for service: $svc → $OUT_DIR"

  # Ensure output directory exists
  mkdir -p "$OUT_DIR"

  # 4. Decide which .proto sources each service needs:
  case "$svc" in
    "game-manager")
      # game-manager needs shared types + physics + its own match messages
      PROTO_SOURCES=(
        "$SHARED_PROTO_DIR/shared.proto"
        "$SHARED_PROTO_DIR/physics.proto"
        # If you have a separate gamemanager.proto, include it here:
        # "$SHARED_PROTO_DIR/gamemanager.proto"
      )
      ;;
    "pong-physics")
      # pong-physics only cares about physics messages (and shared types)
      PROTO_SOURCES=(
        "$SHARED_PROTO_DIR/shared.proto"
        "$SHARED_PROTO_DIR/physics.proto"
      )
      ;;
    "user-interface")
      # user-interface needs shared types + UI-specific messages
      PROTO_SOURCES=(
        "$SHARED_PROTO_DIR/shared.proto"
        "$SHARED_PROTO_DIR/ui.proto"
      )
      ;;
    "lobby-manager")
      # lobby-manager needs shared types + lobby-specific messages
      PROTO_SOURCES=(
        "$SHARED_PROTO_DIR/shared.proto"
        "$SHARED_PROTO_DIR/lobby.proto"
      )
      ;;
    *)
      echo "❌ Unknown service: $svc"
      exit 1
      ;;
  esac

  # 5. Run pbjs & pbts via npx, adding --no-long to disable Long support
  npx pbjs \
    -t static-module \
    -w es6 \
    --no-long \
    -o "$OUT_DIR/message.js" \
    "${PROTO_SOURCES[@]}"
  npx pbts -o "$OUT_DIR/message.d.ts" "$OUT_DIR/message.js"

  # 6. Patch the generated code:
  #    a) Fix the import so Node.js ESM finds minimal.js
  sed -i '
    s|^import \* as \$protobuf from "protobufjs/minimal";|import * as $protobuf from "protobufjs/minimal.js";|
  ' "$OUT_DIR/message.js"

  #    b) Swap Reader/Writer/util → default.Reader / default.Writer / default.util
  sed -i 's|\$protobuf\.Reader|\$protobuf.default.Reader|g' "$OUT_DIR/message.js"
  sed -i 's|\$protobuf\.Writer|\$protobuf.default.Writer|g' "$OUT_DIR/message.js"
  sed -i 's|\$protobuf\.util|\$protobuf.default.util|g' "$OUT_DIR/message.js"

  #    c) Replace any roots["default"] → default.roots
  sed -i 's|\$protobuf\.roots\["default"\]|\$protobuf.default.roots|g' "$OUT_DIR/message.js"

  echo "✅ Completed: $svc"
done

echo "🎉 All protobufs generated and patched for services: ${SERVICES[*]}"

