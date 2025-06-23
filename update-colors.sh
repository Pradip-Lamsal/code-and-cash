#!/bin/bash

# Colors to replace
# Background replacements
find ./src -type f -name "*.jsx" -exec sed -i '' 's/bg-\[#1a1b4b\]/bg-navy/g' {} \;
find ./src -type f -name "*.jsx" -exec sed -i '' 's/bg-\[#2a2b5b\]/bg-navy-light/g' {} \;

# Button and hover colors
find ./src -type f -name "*.jsx" -exec sed -i '' 's/bg-blue-600/bg-purple/g' {} \;
find ./src -type f -name "*.jsx" -exec sed -i '' 's/hover:bg-blue-700/hover:bg-purple-hover/g' {} \;
find ./src -type f -name "*.jsx" -exec sed -i '' 's/bg-purple-600/bg-purple/g' {} \;
find ./src -type f -name "*.jsx" -exec sed -i '' 's/hover:bg-purple-700/hover:bg-purple-hover/g' {} \;

# Text colors
find ./src -type f -name "*.jsx" -exec sed -i '' 's/text-gray-300/text-text-secondary/g' {} \;
find ./src -type f -name "*.jsx" -exec sed -i '' 's/text-gray-600/text-text-secondary/g' {} \;
find ./src -type f -name "*.jsx" -exec sed -i '' 's/text-white/text-text-primary/g' {} \;
find ./src -type f -name "*.jsx" -exec sed -i '' 's/text-blue-600/text-accent-blue/g' {} \;
find ./src -type f -name "*.jsx" -exec sed -i '' 's/text-purple-400/text-accent-lavender/g' {} \;

# Focus and borders
find ./src -type f -name "*.jsx" -exec sed -i '' 's/focus:border-purple-500/focus:border-purple/g' {} \;
find ./src -type f -name "*.jsx" -exec sed -i '' 's/focus:ring-purple-200/focus:ring-purple-light/g' {} \;
find ./src -type f -name "*.jsx" -exec sed -i '' 's/border-gray-600/border-navy-light/g' {} \;

# Status colors
find ./src -type f -name "*.jsx" -exec sed -i '' 's/text-red-500/text-status-error/g' {} \;
find ./src -type f -name "*.jsx" -exec sed -i '' 's/text-green-500/text-status-success/g' {} \;
find ./src -type f -name "*.jsx" -exec sed -i '' 's/bg-red-500/bg-status-error/g' {} \;
find ./src -type f -name "*.jsx" -exec sed -i '' 's/bg-green-500/bg-status-success/g' {} \;

# Update gradients
find ./src -type f -name "*.jsx" -exec sed -i '' 's/bg-gradient-to-r from-blue-50 to-blue-100/bg-gradient-to-r from-navy via-navy-light to-purple-hover/g' {} \;

echo "Color classes updated successfully!"
