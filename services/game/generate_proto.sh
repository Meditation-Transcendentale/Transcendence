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

# 2. Check if protobufjs is installed
if ! npx --yes pbjs --version > /dev/null 2>&1; then
  echo "📦 Installing protobufjs..."
  npm install -g protobufjs
fi

# 3. Shared directory containing all .proto files
SHARED_PROTO_DIR="./proto"

# 4. List of service names (backend services + frontend games)
SERVICES=(
  "game-manager"
  "pong-physics"
  "pongBR-physics"
  "user-interface"
  "lobby-manager"
  "frontend-pong"
  "frontend-pongbr"
  "ai"
)

echo "🛠 Starting protobuf generation for all services..."

for svc in "${SERVICES[@]}"; do
  # 5. Determine output directory based on service type
  case "$svc" in
    frontend-pong)
      OUT_DIR="../../frontend/src/pong/utils/proto"
      ;;
    frontend-pongbr)
      OUT_DIR="../../frontend/src/pongbr/utils/proto"
      ;;
    *)
      OUT_DIR="$svc/src/proto"
      ;;
  esac
  
  echo "📦 Generating for service: $svc → $OUT_DIR"
  
  # Ensure output directory exists
  mkdir -p "$OUT_DIR"
  
  # 6. Decide which .proto sources each service needs:
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
    "pongBR-physics")
      # pongbr-physics needs shared types + physics messages for battle royale
      PROTO_SOURCES=(
        "$SHARED_PROTO_DIR/shared.proto"
        "$SHARED_PROTO_DIR/physics.proto"
      )
      ;;
    "ai")
      # pongbr-physics needs shared types + physics messages for battle royale
      PROTO_SOURCES=(
        "$SHARED_PROTO_DIR/shared.proto"
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
    "frontend-pong"|"frontend-pongbr")
      # Frontend games need shared types + UI messages
      PROTO_SOURCES=(
        "$SHARED_PROTO_DIR/shared.proto"
        "$SHARED_PROTO_DIR/ui.proto"
      )
      ;;
    *)
      echo "❌ Unknown service: $svc"
      exit 1
      ;;
  esac

  # 7. Check if all proto files exist
  for proto_file in "${PROTO_SOURCES[@]}"; do
    if [ ! -f "$proto_file" ]; then
      echo "❌ Proto file not found: $proto_file"
      exit 1
    fi
  done

  # 8. Run pbjs & pbts directly (they come with protobufjs package)
 echo "   Running pbjs for $svc..."
  npx pbjs \
    --target static-module \
    --wrap es6 \
    --es6 \
    --force-number \
    --out "$OUT_DIR/message.js" \
    "${PROTO_SOURCES[@]}"

  echo "   Running pbts for $svc..."
  npx pbts \
    --out "$OUT_DIR/message.d.ts" \
    "$OUT_DIR/message.js"
  # 9. Patch the generated code:
  #    a) Fix the import so Node.js ESM finds minimal.js
  echo "   Patching generated files..."
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS uses different sed syntax
    sed -i '' '
      s|^import \* as \$protobuf from "protobufjs/minimal";|import * as $protobuf from "protobufjs/minimal.js";|
    ' "$OUT_DIR/message.js"
    
    #    b) Swap Reader/Writer/util → default.Reader / default.Writer / default.util
    sed -i '' 's|\$protobuf\.Reader|\$protobuf.default.Reader|g' "$OUT_DIR/message.js"
    sed -i '' 's|\$protobuf\.Writer|\$protobuf.default.Writer|g' "$OUT_DIR/message.js"
    sed -i '' 's|\$protobuf\.util|\$protobuf.default.util|g' "$OUT_DIR/message.js"
    
    #    c) Replace any roots["default"] → default.roots
    sed -i '' 's|\$protobuf\.roots\["default"\]|\$protobuf.default.roots|g' "$OUT_DIR/message.js"
  else
    # Linux sed syntax
    sed -i '
      s|^import \* as \$protobuf from "protobufjs/minimal";|import * as $protobuf from "protobufjs/minimal.js";|
    ' "$OUT_DIR/message.js"
    
    #    b) Swap Reader/Writer/util → default.Reader / default.Writer / default.util
    sed -i 's|\$protobuf\.Reader|\$protobuf.default.Reader|g' "$OUT_DIR/message.js"
    sed -i 's|\$protobuf\.Writer|\$protobuf.default.Writer|g' "$OUT_DIR/message.js"
    sed -i 's|\$protobuf\.util|\$protobuf.default.util|g' "$OUT_DIR/message.js"
    
    #    c) Replace any roots["default"] → default.roots
    sed -i 's|\$protobuf\.roots\["default"\]|\$protobuf.default.roots|g' "$OUT_DIR/message.js"
  fi

  echo "✅ Completed: $svc"
done

echo "🎉 All protobufs generated and patched for services: ${SERVICES[*]}"
