#!/usr/bin/env bash
# Recursively find all .json files and insert "// filename" at the top
find . -type f -name '*.json' | while read -r file; do
  echo "Processing $file"
  # GNU sed: insert at line 1
  sed -i "1i// $(basename "$file")" "$file"
done

