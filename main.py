#!/usr/bin/env python3
from multiprocessing.pool import ThreadPool
from deepface.detectors import FaceDetector
import shutil
import cv2
import os
import time

os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

detector_name = "retinaface"
detector = FaceDetector.build_model(detector_name) #set opencv, ssd, dlib, mtcnn or retinaface


def f(img_path):
  try:
    img = cv2.imread(img_path)
    obj = FaceDetector.detect_faces(detector, detector_name, img)
  except Exception as e:
    print(e, img_path)
    return [img_path, 0]
  return [img_path, len(obj)]

if __name__ == '__main__':
  photos = []
  for channel in os.listdir('images'):
    for im in os.listdir(f'images/{channel}'):
      if im.endswith('.jpg'):
        photos.append(os.path.realpath(f'images/{channel}/{im}'))


  with ThreadPool(16) as p:
    for i, results in enumerate(p.imap(f, photos)):
      img_path, faces = results
      print(i, '/', len(photos))
      if faces > 0:
        print(img_path, faces)
        channel = os.path.basename(os.path.dirname(img_path))
        cpath = f'faces/{channel}'
        os.makedirs(cpath, exist_ok=True)
        shutil.copy(img_path, cpath)


# with Pool(5) as p:
#   print(p.map(f, [1, 2, 3]))
      
