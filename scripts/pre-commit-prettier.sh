#!/bin/bash
# Prettier pre-commit hook script

# Get the list of staged files
files=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx|js|jsx|json|css|md)$')

if [ -z "$files" ]; then
    echo "No files to format with Prettier"
    exit 0
fi

echo "Running Prettier on staged files..."
echo "$files"

# Run Prettier on staged files
npx prettier --write $files

# Check if Prettier succeeded
if [ $? -ne 0 ]; then
    echo "Prettier found issues. Please fix them before committing."
    exit 1
fi

echo "Prettier passed successfully!"
exit 0
