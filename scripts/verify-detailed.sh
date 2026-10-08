#!/bin/bash
# Detailed verification: word count, sample items, FAQ, schema
BASE_URL="$1"

check_page() {
  local url="$2"
  local path="$3"
  
  # Fetch page
  html=$(curl -s "$url")
  
  # Count visible words (rough estimate: strip HTML tags)
  words=$(echo "$html" | sed 's/<[^>]*>//g' | wc -w)
  
  # Count sample items (look for explanation text blocks)
  samples=$(echo "$html" | grep -o '"explanation":' | wc -l)
  
  # Check for FAQPage schema
  faq_count=$(echo "$html" | grep -o '"@type":"FAQPage"' | wc -l)
  
  # Check for schema types
  schemas=$(echo "$html" | grep -oP '"@type":"[^"]+' | sort -u | sed 's/"@type":"/ /' | tr '\n' ',' | sed 's/,$//')
  
  echo "$path,$words,$samples,$faq_count,$schemas"
}

echo "URL,Visible Words,Sample Items,FAQPage Count,Schema Types"

# Test a sample of combo pages
for path in \
  "/subjects/vocabulary/quiz" \
  "/subjects/math/flashcards" \
  "/subjects/spanish/quiz" \
  "/subjects/biology/practice-questions" \
  "/subjects/chemistry/flashcards" \
  "/subjects/english/quiz" \
  "/subjects/spelling/flashcards" \
  "/subjects/grammar/quiz" \
  "/subjects/algebra/practice-questions" \
  "/subjects/geometry/quiz" \
  "/subjects/world-history/quiz" \
  "/subjects/french/flashcards" \
  "/exams/ap-us-history/practice-questions" \
  "/exams/ap-psychology/flashcards"
do
  check_page "$BASE_URL" "$BASE_URL$path" "$path"
done
