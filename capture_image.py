import cv2
import os
import datetime

def capture_and_save_image(output_directory):
    # Open the webcam
    webcam = cv2.VideoCapture(0)

    # Read a frame from the webcam
    ret, frame = webcam.read()

    # Check if the frame was captured successfully
    if ret:
        # Create the output directory if it doesn't exist
        if not os.path.exists(output_directory):
            os.makedirs(output_directory)

        # Generate a timestamp for the image filename
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        image_filename = f"captured_image_{timestamp}.jpg"

        # Save the captured frame as an image
        image_path = os.path.join(output_directory, image_filename)
        cv2.imwrite(image_path, frame)
        print(f"Image saved at {image_path}")

    # Release the webcam
    webcam.release()

def capture_image():
    # Specify the directory where you want to save the captured image
    output_directory = 'captured_images'

    # Call the function to capture and save the image
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)
    capture_and_save_image(output_directory)

if __name__ == "__main__":
    capture_image()
