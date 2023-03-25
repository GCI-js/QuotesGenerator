import os
from PIL import Image

def convert_png_to_jpg(source_folder, dest_folder):
    if not os.path.exists(dest_folder):
        os.makedirs(dest_folder)

    for file in os.listdir(source_folder):
        if file.endswith(".png"):
            png_image = Image.open(os.path.join(source_folder, file))
            file_without_extension = os.path.splitext(file)[0]
            jpg_image = png_image.convert("RGB")
            jpg_image.save(os.path.join(dest_folder, f"{file_without_extension}.jpg"))

if __name__ == "__main__":
    source_folder = "./"
    dest_folder = "./"
    convert_png_to_jpg(source_folder, dest_folder)