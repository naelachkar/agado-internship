import glm
import json
import numpy as np
import enum
from enum import auto, IntEnum


class Keypoints(enum.IntEnum):
    NOSE = 0,
    LEFT_EYE_INNER = 1,
    LEFT_EYE = 2,
    LEFT_EYE_OUTER = 3,
    RIGHT_EYE_INNER = 4,
    RIGHT_EYE = 5,
    RIGHT_EYE_OUTER = 6,
    LEFT_EAR = 7,
    RIGHT_EAR = 8,
    MOUTH_LEFT = 9,
    MOUTH_RIGHT = 10,
    LEFT_SHOULDER = 11,
    RIGHT_SHOULDER = 12,
    LEFT_ELBOW = 13,
    RIGHT_ELBOW = 14,
    LEFT_WRIST = 15,
    RIGHT_WRIST = 16,
    LEFT_PINKY = 17,
    RIGHT_PINKY = 18,
    LEFT_INDEX = 19,
    RIGHT_INDEX = 20,
    LEFT_THUMB = 21,
    RIGHT_THUMB = 22,
    LEFT_HIP = 23,
    RIGHT_HIP = 24,
    LEFT_KNEE = 25,
    RIGHT_KNEE = 26,
    LEFT_ANKLE = 27,
    RIGHT_ANKLE = 28,
    LEFT_HEEL = 29,
    RIGHT_HEEL = 30,
    LEFT_FOOT_INDEX = 31,
    RIGHT_FOOT_INDEX = 32


class Mixamo(IntEnum):
    Hips = 0
    Spine = auto()
    Spine1 = auto()
    Spine2 = auto()
    Neck = auto()
    Head = auto()
    LeftArm = auto()
    LeftForeArm = auto()
    LeftHand = auto()
    LeftHandThumb1 = auto()
    LeftHandIndex1 = auto()
    LeftHandPinky1 = auto()
    RightArm = auto()
    RightForeArm = auto()
    RightHand = auto()
    RightHandThumb1 = auto()
    RightHandIndex1 = auto()
    RightHandPinky1 = auto()
    LeftUpLeg = auto()
    LeftLeg = auto()
    LeftFoot = auto()
    LeftToeBase = auto()
    RightUpLeg = auto()
    RightLeg = auto()
    RightFoot = auto()
    RightToeBase = auto()


def avg_vec3(v1, v2):
    v3 = glm.vec3((v1.x + v2.x) * 0.5,
                  (v1.y + v2.y) * 0.5,
                  (v1.z + v2.z) * 0.5)
    return v3


def get_name_idx_map():
    mediapipe_names = [
        "nose",
        "left_eye_inner", "left_eye", "left_eye_outer", "right_eye_inner", "right_eye", "right_eye_outer", "left_ear", "right_ear", "mouth_left", "mouth_right", "left_shoulder", "right_shoulder", "left_elbow", "right_elbow", "left_wrist", "right_wrist", "left_pinky", "right_pinky", "left_index", "right_index", "left_thumb", "right_thumb", "left_hip", "right_hip", "left_knee", "right_knee", "left_ankle", "right_ankle", "left_heel", "right_heel", "left_foot_index", "right_foot_index"]

    name_idx_map = {}
    for idx in range(0, len(mediapipe_names)):
        name_idx_map[mediapipe_names[idx]] = idx
    return name_idx_map


def get_mixamo_names():
    return [
        ['Hips', 0, -1],  # left hip <->right hip
        ['Spine', 1, 0],
        ['Spine1', 2, 1],
        ['Spine2', 3, 2],

        ['Neck', 4, 3],  # left_shoulder <-> right_shoulder
        ['Head', 5, 4],  # left_ear <-> right_ear

        ['LeftArm', 6, 3, "left_shoulder"],
        ['LeftForeArm', 7, 6, "left_elbow"],
        ['LeftHand', 8, 7, "left_wrist"],
        ['LeftHandThumb1', 9, 8, "left_thumb"],
        ['LeftHandIndex1', 10, 8, "left_index"],
        ['LeftHandPinky1', 11, 8, "left_pinky"],

        ['RightArm', 12, 3, "right_shoulder"],
        ['RightForeArm', 13, 12, "right_elbow"],
        ['RightHand', 14, 13, "right_wrist"],
        ['RightHandThumb1', 15, 14, "right_thumb"],
        ['RightHandIndex1', 16, 14, "right_index"],
        ['RightHandPinky1', 17, 14, "right_pinky"],

        ['LeftUpLeg', 18, 0, "left_hip"],
        ['LeftLeg', 19, 18, "left_knee"],
        ['LeftFoot', 20, 19, "left_ankle"],
        ['LeftToeBase', 21, 20, "left_foot_index"],

        ['RightUpLeg', 22, 0, "right_hip"],
        ['RightLeg', 23, 22, "right_knee"],
        ['RightFoot', 24, 23, "right_ankle"],
        ['RightToeBase', 25, 24, "right_foot_index"]
    ]


def get_mixamo_name_idx_map():
    mixamo_names = get_mixamo_names()
    mixamo_name_idx_map = {}
    for name in mixamo_names:
        mixamo_name_idx_map[name[0]] = name[1]
    return mixamo_name_idx_map


def get_mixamo_name_mediapipe_name_map():
    mixamo_name_mediapipe_name_map = {}
    mixamo_names = get_mixamo_names()
    for idx in range(6, len(mixamo_names)):
        mixamo_name_mediapipe_name_map[mixamo_names[idx]
                                       [0]] = mixamo_names[idx][3]
    return mixamo_name_mediapipe_name_map


def trying_stuff(landmark, mp_idx_mm_idx_map):
    # Create a copy of the input image.

    # Initialize a list to store the detected landmarks.
    glm_list = [None]*26
    visibility_list = [None]*26
    hip2d_left, hip2d_right = glm.vec3(0.0, 0.0, 0.0), glm.vec3(0.0, 0.0, 0.0)

    landmark = [glm.vec3(kpt[:-1]) for kpt in landmark]
    visibilities = [kpt[-1] for kpt in landmark]

    glm_list[Mixamo.Hips] = avg_vec3(
        landmark[Keypoints.LEFT_HIP], landmark[Keypoints.RIGHT_HIP])

    visibility_list[Mixamo.Hips] = (visibilities[Keypoints.LEFT_HIP] +
                                    visibilities[Keypoints.RIGHT_HIP])*0.5

    glm_list[Mixamo.Neck] = avg_vec3(
        landmark[Keypoints.LEFT_SHOULDER], landmark[Keypoints.RIGHT_SHOULDER])
    # visibility_list[Mixamo.Neck] = (landmark[Keypoints.LEFT_SHOULDER].visibility +
    #                                 landmark[Keypoints.RIGHT_SHOULDER].visibility)*0.5
    glm_list[Mixamo.Spine1] = avg_vec3(
        glm_list[Mixamo.Hips], glm_list[Mixamo.Neck])
    # visibility_list[Mixamo.Spine1] = (
    #     visibility_list[Mixamo.Hips] + visibility_list[Mixamo.Neck])*0.5
    glm_list[Mixamo.Spine] = avg_vec3(
        glm_list[Mixamo.Hips], glm_list[Mixamo.Spine1])
    # visibility_list[Mixamo.Spine] = (
    #     visibility_list[Mixamo.Hips] + visibility_list[Mixamo.Spine1])*0.5
    glm_list[Mixamo.Spine2] = avg_vec3(
        glm_list[Mixamo.Spine1], glm_list[Mixamo.Neck])
    # visibility_list[Mixamo.Spine2] = (
    #     visibility_list[Mixamo.Spine1] + visibility_list[Mixamo.Neck])*0.5
    glm_list[Mixamo.Head] = avg_vec3(
        landmark[Keypoints.LEFT_EAR], landmark[Keypoints.RIGHT_EAR])
    # visibility_list[Mixamo.Head] = (landmark[Keypoints.LEFT_EAR].visibility +
    #                                 landmark[Keypoints.RIGHT_EAR].visibility)*0.5

    glm_list[Mixamo.Spine].y *= -1
    glm_list[Mixamo.Neck].y *= -1
    glm_list[Mixamo.Spine1].y *= -1
    glm_list[Mixamo.Spine2].y *= -1
    glm_list[Mixamo.Head].y *= -1

    glm_list[Mixamo.Neck].z *= -1
    glm_list[Mixamo.Spine].z *= -1
    glm_list[Mixamo.Spine1].z *= -1
    glm_list[Mixamo.Spine2].z *= -1
    glm_list[Mixamo.Head].z *= -1
    for mp_idx in mp_idx_mm_idx_map.keys():
        mm_idx = mp_idx_mm_idx_map[mp_idx]
        glm_list[mm_idx] = glm.vec3(
            landmark[mp_idx].x, -landmark[mp_idx].y, -landmark[mp_idx].z)
        # visibility_list[mm_idx] = landmark[mp_idx].visibility

    # # calculate hips2d
    # if results.pose_landmarks:
    #     landmark = results.pose_landmarks.landmark
    #     hip2d_left.x = landmark[mp_manager.mp_pose.PoseLandmark.LEFT_HIP].x
    #     hip2d_left.y = landmark[mp_manager.mp_pose.PoseLandmark.LEFT_HIP].y
    #     hip2d_left.z = landmark[mp_manager.mp_pose.PoseLandmark.LEFT_HIP].z
    #     hip2d_right = glm.vec3(landmark[mp_manager.mp_pose.PoseLandmark.RIGHT_HIP].x,
    #                            landmark[mp_manager.mp_pose.PoseLandmark.RIGHT_HIP].y, landmark[mp_manager.mp_pose.PoseLandmark.RIGHT_HIP].z)
    #
    # mp_manager.mp_drawing.draw_landmarks(image=output_image, landmark_list=results.pose_landmarks,
    #                                      connections=mp_manager.mp_pose.POSE_CONNECTIONS, landmark_drawing_spec=mp_manager.mp_drawing_styles.get_default_pose_landmarks_style())

    # return glm_list, visibility_list, hip2d_left, hip2d_right
    return glm_list, visibility_list


path = '/mnt/hdd2/AgadoVision_sharepoint/AgadoVision/data/data/squats/2022-07-10_shula_squat_1/frames_mediapipe_mp2.json'


with open(path, 'r') as f:
    file = json.load(f)

frames = file['frames']
poses = [elem['2d_pose'] for elem in frames]
poses = np.array(poses)

mp_name_idx_map = get_name_idx_map()
mm_mp_map = get_mixamo_name_mediapipe_name_map()
mm_name_idx_map = get_mixamo_name_idx_map()
mp_idx_mm_idx_map = dict()
for mm_name in mm_mp_map.keys():
    mp_name = mm_mp_map[mm_name]
    mp_idx = mp_name_idx_map[mp_name]
    mm_idx = mm_name_idx_map[mm_name]
    mp_idx_mm_idx_map[mp_idx] = mm_idx


glm_poses = []
for pose in poses:
    glm_list, visibility_list = trying_stuff(pose, mp_idx_mm_idx_map)
    glm_poses.append(glm_list)
