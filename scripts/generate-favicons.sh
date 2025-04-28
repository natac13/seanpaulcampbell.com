#!/bin/bash

# Script to generate favicons from an input image using ffmpeg

# --- Configuration ---
INPUT_IMAGE="apps/website/src/assets/images/avatar.jpg"
OUTPUT_DIR="apps/website/public"
# Sizes for the .ico file
ICO_SIZES="16 32 48"
# Other common PNG sizes
PNG_SIZES="192 512"
APPLE_TOUCH_ICON_SIZE="180"
# --- End Configuration ---

# Check if ffmpeg is installed
if ! command -v ffmpeg &>/dev/null; then
  echo "Error: ffmpeg is not installed. Please install it (e.g., 'brew install ffmpeg' or 'sudo apt install ffmpeg')."
  exit 1
fi

# Check if input image exists
if [ ! -f "$INPUT_IMAGE" ]; then
  echo "Error: Input image not found at $INPUT_IMAGE"
  exit 1
fi

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"
echo "Output directory: $OUTPUT_DIR"

# --- Generate PNGs for ICO ---
ico_inputs=""
for size in $ICO_SIZES; do
  output_png="${OUTPUT_DIR}/favicon-${size}x${size}.png"
  echo "Generating $output_png..."
  ffmpeg -i "$INPUT_IMAGE" -vf scale=${size}:${size} -y "$output_png" >/dev/null 2>&1
  if [ $? -ne 0 ]; then
    echo "Error generating $output_png"
    exit 1
  fi
  ico_inputs+="$output_png "
done

# --- Combine PNGs into favicon.ico ---
favicon_ico="${OUTPUT_DIR}/favicon.ico"
echo "Generating $favicon_ico..."

ffmpeg -i "$INPUT_IMAGE" -vf "scale=256:256" -y "$favicon_ico" >/dev/null 2>&1
# # Combine the generated PNGs into a single ICO file
# # List the specific PNGs as inputs
# ffmpeg \
#   -i "${OUTPUT_DIR}/favicon-16x16.png" \
#   -i "${OUTPUT_DIR}/favicon-32x32.png" \
#   -i "${OUTPUT_DIR}/favicon-48x48.png" \
#   -c copy "$favicon_ico" -y >/dev/null 2>&1 # Use -c copy and redirect output again

if [ $? -ne 0 ]; then
  echo "Error generating $favicon_ico using PNG inputs. ffmpeg might have failed."
  # Add alternative or just notify
  # exit 1 # Optional: exit if ico is critical
fi

# --- Generate other PNG sizes ---
for size in $PNG_SIZES; do
  output_png="${OUTPUT_DIR}/favicon-${size}x${size}.png"
  echo "Generating $output_png..."
  ffmpeg -i "$INPUT_IMAGE" -vf scale=${size}:${size} -y "$output_png" >/dev/null 2>&1
  if [ $? -ne 0 ]; then
    echo "Error generating $output_png"
    exit 1
  fi
done

# --- Generate Apple Touch Icon ---
apple_icon="${OUTPUT_DIR}/apple-touch-icon.png"
echo "Generating $apple_icon..."
ffmpeg -i "$INPUT_IMAGE" -vf scale=${APPLE_TOUCH_ICON_SIZE}:${APPLE_TOUCH_ICON_SIZE} -y "$apple_icon" >/dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "Error generating $apple_icon"
  exit 1
fi

echo "Favicon generation complete!"

# --- Optional: Update web manifest (if exists) ---
MANIFEST_FILE="${OUTPUT_DIR}/site.webmanifest"
if [ -f "$MANIFEST_FILE" ]; then
  echo "Note: You might want to update $MANIFEST_FILE to reference the generated icons (e.g., favicon-192x192.png, favicon-512x512.png)."
fi

exit 0
