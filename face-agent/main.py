import os
import time
import urllib.request as ur
from threading import Thread

import cv2
import face_recognition
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

CONNECTION_STRING = os.environ["MONGODB_URI"]
client = MongoClient(CONNECTION_STRING)

db = client.db
users_collection = db["users"]
access_log_collection = db["access_log"]

users = users_collection.find()

known_face_encodings = []
known_face_names = []

cooldown = []


def add_cooldown(user_id):
    cooldown.append(user_id)
    time.sleep(10)
    cooldown.remove(user_id)

print("Loading users...")
for user in users:
    try:
        print(f"Loading {user['name']}...")
        decoded = ur.urlopen(user["photo"])
        image_loaded = face_recognition.load_image_file(decoded)
        image_encodings = face_recognition.face_encodings(image_loaded)
        if len(image_encodings) == 0:
            print(f"No face found in image {user['name']}")
            continue
        image_encoding = image_encodings[0]
        known_face_encodings.append(image_encoding)
        known_face_names.append(str(user["_id"]))
        print(f"Added {user['name']} to known faces")
    except Exception as e:
        print(f"Error loading {user['name']}: {e}")

video_capture = cv2.VideoCapture(0)

face_locations = []
face_encodings = []
process_this_frame = True

print("Starting face recognition...")
while True:    
    ret, frame = video_capture.read()
    small_frame = cv2.resize(frame, (0, 0), fx=0.25,
                             fy=0.25, interpolation=cv2.INTER_AREA)
    rgb_small_frame = small_frame[:, :, ::-1]

    face_locations = face_recognition.face_locations(rgb_small_frame)
    face_encodings = face_recognition.face_encodings(
        rgb_small_frame, face_locations)
    if len(face_encodings) == 0:
        continue

    face_locations = [face_locations[0]]
    face_encodings = [face_encodings[0]]
    face_names = []

    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces(
            known_face_encodings, face_encoding, tolerance=0.4)

        if True in matches:
            first_match_index = matches.index(True)
            name = known_face_names[first_match_index]
            face_names.append(name)
            if name not in cooldown:
                print("Access granted to " + name)
                access_log_collection.insert_one(
                    {"user_id": name, "timestamp": int(time.time())})
                thread = Thread(target=add_cooldown, args=(name,))
                thread.start()
    top = face_locations[0][0] * 4
    right = face_locations[0][1] * 4
    bottom = face_locations[0][2] * 4
    left = face_locations[0][3] * 4

    name = name if face_names else "Unknown"
    color = (0, 255, 0) if face_names else (0, 0, 255)
    cv2.rectangle(frame, (left, top), (right, bottom), color, 2)

    cv2.rectangle(frame, (left, bottom - 35),
                  (right, bottom), color, cv2.FILLED)
    font = cv2.FONT_HERSHEY_DUPLEX
    cv2.putText(frame, name, (left + 6, bottom - 6),
                font, 1.0, (255, 255, 255), 1)

    cv2.imshow('Video', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
video_capture.release()
cv2.destroyAllWindows()
