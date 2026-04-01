import os
from PIL import Image

input_folder = "intro"
output_folder = "intro-webp"

os.makedirs(output_folder, exist_ok=True)

for filename in os.listdir(input_folder):
    if filename.lower().endswith(".png"):
        png_path = os.path.join(input_folder, filename)
        webp_path = os.path.join(output_folder, filename.replace(".png", ".webp"))

        with Image.open(png_path) as img:
            img.save(webp_path, "WEBP", quality=80)

print("Conversion complete 🎉")