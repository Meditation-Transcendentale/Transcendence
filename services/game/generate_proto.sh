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
  npm install -g protobufjs-cli
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
  "notifications"
  "tournament"
  "friends-service"
  "spa"
)

echo "🛠 Starting protobuf generation for all services..."

for svc in "${SERVICES[@]}"; do
  # 5. Determine output directory based on service type
  case "$svc" in
    frontend-pong)
      OUT_DIR="../../frontend/src/pong/utils/proto"
      ;;
    notifications)
      OUT_DIR="../../services/notifications/notifications-manager/src/proto"
      ;;
    frontend-pongbr)
      OUT_DIR="../../frontend/src/pongbr/utils/proto"
      ;;
    friends-service)
      OUT_DIR="../../services/user/friends-service/src/proto"
      ;;
    spa)
      OUT_DIR="../../frontend/src/spa/proto"
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
      # ai needs shared types
      PROTO_SOURCES=(
        "$SHARED_PROTO_DIR/shared.proto"
      )
      ;;
    "user-interface")
      # user-interface needs shared types + UI-specific messages
      PROTO_SOURCES=(
        "$SHARED_PROTO_DIR/shared.proto"
        "$SHARED_PROTO_DIR/ui.proto"
        "$SHARED_PROTO_DIR/notif.proto"
      )
      ;;
    "lobby-manager")
      # lobby-manager needs shared types + lobby-specific messages
      PROTO_SOURCES=(
        "$SHARED_PROTO_DIR/shared.proto"
        "$SHARED_PROTO_DIR/lobby.proto"
        "$SHARED_PROTO_DIR/notif.proto"
      )
      ;;
    "notifications")
      # lobby-manager needs shared types + lobby-specific messages
      PROTO_SOURCES=(
        "$SHARED_PROTO_DIR/notif.proto"
      )
      ;;
    "frontend-pong"|"frontend-pongbr")
      # Frontend games need shared types + UI messages
      PROTO_SOURCES=(
        "$SHARED_PROTO_DIR/shared.proto"
        "$SHARED_PROTO_DIR/ui.proto"
      )
      ;;
    "tournament")
      PROTO_SOURCES=(
        "$SHARED_PROTO_DIR/shared.proto"
        "$SHARED_PROTO_DIR/ui.proto"
    "friends-service")
      PROTO_SOURCES=(
        "$SHARED_PROTO_DIR/notif.proto"
      )
      ;;
    "spa")
      PROTO_SOURCES=(
        "$SHARED_PROTO_DIR/notif.proto"
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

  # 8. Debug: Show what we're processing
  echo "   Proto sources: ${PROTO_SOURCES[*]}"
  echo "   Output: $OUT_DIR/message.js"

  # 9. Run pbjs to generate JavaScript
  echo "   Running pbjs for $svc..."
  if ! npx pbjs \
    -t static-module \
    -w es6 \
	--no-long \
    -o "$OUT_DIR/message.js" \
    "${PROTO_SOURCES[@]}" 2> "/tmp/pbjs_error_${svc}.log"; then
    
    echo "❌ pbjs failed for $svc. Error details:"
    cat "/tmp/pbjs_error_${svc}.log"
    exit 1
  fi

  # 10. Run pbts to generate TypeScript definitions
  echo "   Running pbts for $svc..."
  if ! npx pbts \
    -o "$OUT_DIR/message.d.ts" \
    "$OUT_DIR/message.js" 2> "/tmp/pbts_error_${svc}.log"; then
    
    echo "❌ pbts failed for $svc. Error details:"
    cat "/tmp/pbts_error_${svc}.log"
    # Continue anyway since TypeScript definitions are optional
  fi

  # 11. Patch the generated code for ESM compatibility
  echo "   Patching generated files..."
  if [ -f "$OUT_DIR/message.js" ]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
      # macOS uses different sed syntax
      sed -i '' 's|^import \* as \$protobuf from "protobufjs/minimal";|import * as $protobuf from "protobufjs/minimal.js";|' "$OUT_DIR/message.js"
      sed -i '' 's|\$protobuf\.Reader|\$protobuf.default.Reader|g' "$OUT_DIR/message.js"
      sed -i '' 's|\$protobuf\.Writer|\$protobuf.default.Writer|g' "$OUT_DIR/message.js"
      sed -i '' 's|\$protobuf\.util|\$protobuf.default.util|g' "$OUT_DIR/message.js"
      sed -i '' 's|\$protobuf\.roots\["default"\]|\$protobuf.default.roots|g' "$OUT_DIR/message.js"
    else
      # Linux sed syntax
      sed -i 's|^import \* as \$protobuf from "protobufjs/minimal";|import * as $protobuf from "protobufjs/minimal.js";|' "$OUT_DIR/message.js"
      sed -i 's|\$protobuf\.Reader|\$protobuf.default.Reader|g' "$OUT_DIR/message.js"
      sed -i 's|\$protobuf\.Writer|\$protobuf.default.Writer|g' "$OUT_DIR/message.js"
      sed -i 's|\$protobuf\.util|\$protobuf.default.util|g' "$OUT_DIR/message.js"
      sed -i 's|\$protobuf\.roots\["default"\]|\$protobuf.default.roots|g' "$OUT_DIR/message.js"
    fi
  fi

  echo "✅ Completed: $svc"
done

echo "🎉 All protobufs generated and patched for services: ${SERVICES[*]}"
