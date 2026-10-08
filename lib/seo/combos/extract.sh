#!/bin/bash
# Extract individual combo files from combined files

# Helper function to extract a specific export
extract_export() {
  local source_file=$1
  local export_name=$2
  local target_file=$3
  
  echo "/**" > "$target_file"
  echo " * Auto-extracted from $source_file" >> "$target_file"
  echo " */" >> "$target_file"
  echo 'import type { ComboData } from "./types";' >> "$target_file"
  echo "" >> "$target_file"
  
  # Extract the specific export block
  awk "/^export const ${export_name}:/,/^];$/ { print }" "$source_file" >> "$target_file"
}

# Extract from new-subjects-1.ts
extract_export "new-subjects-1.ts" "SPELLING_COMBOS" "spelling.ts"
extract_export "new-subjects-1.ts" "GRAMMAR_COMBOS" "grammar.ts"

# Extract from new-subjects-2.ts
extract_export "new-subjects-2.ts" "ALGEBRA_COMBOS" "algebra.ts"
extract_export "new-subjects-2.ts" "GEOMETRY_COMBOS" "geometry.ts"
extract_export "new-subjects-2.ts" "WORLD_HISTORY_COMBOS" "world-history.ts"
extract_export "new-subjects-2.ts" "FRENCH_COMBOS" "french.ts"
extract_export "new-subjects-2.ts" "AP_US_HISTORY_COMBOS" "ap-us-history.ts"
extract_export "new-subjects-2.ts" "AP_PSYCHOLOGY_COMBOS" "ap-psychology.ts"

echo "Extracted all combo files!"
