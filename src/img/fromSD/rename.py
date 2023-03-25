import os

def rename_files(source_folder, dest_folder):
    if not os.path.exists(dest_folder):
        os.makedirs(dest_folder)

    i = 0
    for file in os.listdir(source_folder):
        if file.endswith(".jpg") or file.endswith(".jpeg"):
            src = os.path.join(source_folder, file)
            dst = os.path.join(dest_folder, f"{i}.jpg")
            os.rename(src, dst)
            i += 1

if __name__ == "__main__":
    source_folder = "./"
    dest_folder = "./"

    rename_files(source_folder, dest_folder)
