#!/bin/bash
# ESLint pre-commit hook script

# Get the list of staged files
files=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx|js|jsx)$')

if [ -z "$files" ]; then
    echo "No TypeScript/JavaScript files to lint"
    exit 0
fi

echo "Running ESLint on staged files..."
echo "$files"

# Run ESLint on staged files
npx eslint $files --fix

# Check if ESLint succeeded
if [ $? -ne 0 ]; then
    echo "ESLint found issues. Please fix them before committing."
    exit 1
fi

echo "ESLint passed successfully!"
exit 0
