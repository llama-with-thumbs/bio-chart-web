import schedule
import time
from capture_image import capture_image

# Schedule the capture_image_every_5_minutes function to run every 5 minutes
schedule.every(0.1).minutes.do(capture_image)

# Keep the script running to allow scheduled tasks
while True:
    schedule.run_pending()
    time.sleep(1)