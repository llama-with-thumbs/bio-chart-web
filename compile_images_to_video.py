import cv2
import os
import datetime

def compile_images_into_video(image_directory, output_video_path, frame_rate):
    image_files = [f for f in os.listdir(image_directory) if f.endswith('.jpg')]
    image_files.sort()

    if len(image_files) == 0:
        print("No image files found in the directory.")
        return

    first_image = cv2.imread(os.path.join(image_directory, image_files[0]))
    height, width, _ = first_image.shape

    fourcc = cv2.VideoWriter_fourcc(*'XVID')
    video_writer = cv2.VideoWriter(output_video_path, fourcc, frame_rate, (width, height))

    for image_file in image_files:
        image_path = os.path.join(image_directory, image_file)
        frame = cv2.imread(image_path)
        video_writer.write(frame)

    video_writer.release()
    print(f"Video saved at {output_video_path}")

def create_and_compile_video_folder(input_image_directory):
    output_video_folder = 'compiled_videos'
    if not os.path.exists(output_video_folder):
        os.makedirs(output_video_folder)

    timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    output_video_path = os.path.join(output_video_folder, f"video_{timestamp}.avi")

    frame_rate = 10  # Adjust the frame rate as needed

    compile_images_into_video(input_image_directory, output_video_path, frame_rate)

if __name__ == "__main__":
    input_image_directory = 'captured_images'
    create_and_compile_video_folder(input_image_directory)
