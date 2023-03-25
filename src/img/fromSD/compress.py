import os
from PIL import Image

def compress_jpg_files(source_folder, dest_folder, quality=85):
    if not os.path.exists(dest_folder):
        os.makedirs(dest_folder)

    for file in os.listdir(source_folder):
        if file.endswith(".jpg") or file.endswith(".jpeg"):
            img = Image.open(os.path.join(source_folder, file))
            file_without_extension = os.path.splitext(file)[0]
            img.save(os.path.join(dest_folder, f"{file_without_extension}.jpg"), "JPEG", quality=quality)

if __name__ == "__main__":
    source_folder = "./"
    dest_folder = "./"
    quality = 60  # Set the desired compression quality (0-100, lower value means higher compression)

    compress_jpg_files(source_folder, dest_folder, quality)
