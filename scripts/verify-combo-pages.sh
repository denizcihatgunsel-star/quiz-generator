#!/bin/bash
# Verify all 25 combo pages on Vercel preview deployment
# Usage: ./verify-combo-pages.sh <preview-url>

PREVIEW_URL="${1:-quiz-generator-git-cursor-seo-combo-batch-3a-3f10-denizcihatgunsel-stars-projects.vercel.app}"
BASE_URL="https://$PREVIEW_URL"

echo "Testing combo pages on: $BASE_URL"
echo "========================================"
echo

# All 25 combo page URLs
COMBO_PAGES=(
  "/subjects/vocabulary/quiz"
  "/subjects/vocabulary/flashcards"
  "/subjects/math/flashcards"
  "/subjects/math/practice-questions"
  "/subjects/math/worksheet-generator"
  "/subjects/spanish/flashcards"
  "/subjects/spanish/quiz"
  "/subjects/biology/practice-questions"
  "/subjects/biology/quiz"
  "/subjects/chemistry/quiz"
  "/subjects/chemistry/flashcards"
  "/subjects/english/practice-questions"
  "/subjects/english/quiz"
  "/subjects/spelling/flashcards"
  "/subjects/spelling/worksheet-generator"
  "/subjects/spelling/quiz-generator"
  "/subjects/grammar/quiz"
  "/subjects/algebra/practice-questions"
  "/subjects/algebra/quiz"
  "/subjects/geometry/quiz"
  "/subjects/geometry/practice-questions"
  "/subjects/world-history/quiz"
  "/subjects/french/flashcards"
  "/exams/ap-us-history/practice-questions"
  "/exams/ap-psychology/flashcards"
)

# Test each combo page
PASS=0
FAIL=0

for path in "${COMBO_PAGES[@]}"; do
  url="$BASE_URL$path"
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  
  if [ "$status" = "200" ]; then
    echo "✓ $path (200)"
    ((PASS++))
  else
    echo "✗ $path ($status)"
    ((FAIL++))
  fi
done

echo
echo "========================================"
echo "Results: $PASS passed, $FAIL failed"
echo "Total combo pages: ${#COMBO_PAGES[@]}"

# Test 404 for unknown combo
echo
echo "Testing 404 for unknown combo:"
status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/subjects/math/does-not-exist")
if [ "$status" = "404" ]; then
  echo "✓ /subjects/math/does-not-exist returns 404"
else
  echo "✗ /subjects/math/does-not-exist returns $status (expected 404)"
fi

# Test existing hub still works
echo
echo "Testing existing hub pages:"
for hub in "/subjects/math" "/subjects/biology" "/exams/ap" "/exams/mcat"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$hub")
  if [ "$status" = "200" ]; then
    echo "✓ $hub (200)"
  else
    echo "✗ $hub ($status)"
  fi
done

echo
echo "Verification complete!"
