export default function mediapipeToMixamo(arg) {
  function vec3(a, b, c) {
    return {
      x: a,
      y: b,
      z: c,
    };
  }

  const Keypoints = Object.freeze({
    NOSE: 0,
    LEFT_EYE_INNER: 1,
    LEFT_EYE: 2,
    LEFT_EYE_OUTER: 3,
    RIGHT_EYE_INNER: 4,
    RIGHT_EYE: 5,
    RIGHT_EYE_OUTER: 6,
    LEFT_EAR: 7,
    RIGHT_EAR: 8,
    MOUTH_LEFT: 9,
    MOUTH_RIGHT: 10,
    LEFT_SHOULDER: 11,
    RIGHT_SHOULDER: 12,
    LEFT_ELBOW: 13,
    RIGHT_ELBOW: 14,
    LEFT_WRIST: 15,
    RIGHT_WRIST: 16,
    LEFT_PINKY: 17,
    RIGHT_PINKY: 18,
    LEFT_INDEX: 19,
    RIGHT_INDEX: 20,
    LEFT_THUMB: 21,
    RIGHT_THUMB: 22,
    LEFT_HIP: 23,
    RIGHT_HIP: 24,
    LEFT_KNEE: 25,
    RIGHT_KNEE: 26,
    LEFT_ANKLE: 27,
    RIGHT_ANKLE: 28,
    LEFT_HEEL: 29,
    RIGHT_HEEL: 30,
    LEFT_FOOT_INDEX: 31,
    RIGHT_FOOT_INDEX: 32,
  });

  const Mixamo = Object.freeze({
    Hips: 0,
    Spine: 1,
    Spine1: 2,
    Spine2: 3,
    Neck: 4,
    Head: 5,
    LeftArm: 6,
    LeftForeArm: 7,
    LeftHand: 8,
    LeftHandThumb1: 9,
    LeftHandIndex1: 10,
    LeftHandPinky1: 11,
    RightArm: 12,
    RightForeArm: 13,
    RightHand: 14,
    RightHandThumb1: 15,
    RightHandIndex1: 16,
    RightHandPinky1: 17,
    LeftUpLeg: 18,
    LeftLeg: 19,
    LeftFoot: 20,
    LeftToeBase: 21,
    RightUpLeg: 22,
    RightLeg: 23,
    RightFoot: 24,
    RightToeBase: 25,
  });

  function avg_vec3(v1, v2) {
    const v3 = {
      x: (v1.x + v2.x) * 0.5,
      y: (v1.y + v2.y) * 0.5,
      z: (v1.z + v2.z) * 0.5,
    };
    return v3;
  }

  function get_name_idx_map() {
    const mediapipe_names = [
      "nose",
      "left_eye_inner",
      "left_eye",
      "left_eye_outer",
      "right_eye_inner",
      "right_eye",
      "right_eye_outer",
      "left_ear",
      "right_ear",
      "mouth_left",
      "mouth_right",
      "left_shoulder",
      "right_shoulder",
      "left_elbow",
      "right_elbow",
      "left_wrist",
      "right_wrist",
      "left_pinky",
      "right_pinky",
      "left_index",
      "right_index",
      "left_thumb",
      "right_thumb",
      "left_hip",
      "right_hip",
      "left_knee",
      "right_knee",
      "left_ankle",
      "right_ankle",
      "left_heel",
      "right_heel",
      "left_foot_index",
      "right_foot_index",
    ];

    const name_idx_map = {};
    for (let idx = 0; idx < mediapipe_names.length; idx++) {
      name_idx_map[mediapipe_names[idx]] = idx;
    }
    return name_idx_map;
  }

  function get_mixamo_names() {
    return [
      ["Hips", 0, -1], // left hip <->right hip
      ["Spine", 1, 0],
      ["Spine1", 2, 1],
      ["Spine2", 3, 2],

      ["Neck", 4, 3], // left_shoulder <-> right_shoulder
      ["Head", 5, 4], // left_ear <-> right_ear

      ["LeftArm", 6, 3, "left_shoulder"],
      ["LeftForeArm", 7, 6, "left_elbow"],
      ["LeftHand", 8, 7, "left_wrist"],
      ["LeftHandThumb1", 9, 8, "left_thumb"],
      ["LeftHandIndex1", 10, 8, "left_index"],
      ["LeftHandPinky1", 11, 8, "left_pinky"],

      ["RightArm", 12, 3, "right_shoulder"],
      ["RightForeArm", 13, 12, "right_elbow"],
      ["RightHand", 14, 13, "right_wrist"],
      ["RightHandThumb1", 15, 14, "right_thumb"],
      ["RightHandIndex1", 16, 14, "right_index"],
      ["RightHandPinky1", 17, 14, "right_pinky"],

      ["LeftUpLeg", 18, 0, "left_hip"],
      ["LeftLeg", 19, 18, "left_knee"],
      ["LeftFoot", 20, 19, "left_ankle"],
      ["LeftToeBase", 21, 20, "left_foot_index"],

      ["RightUpLeg", 22, 0, "right_hip"],
      ["RightLeg", 23, 22, "right_knee"],
      ["RightFoot", 24, 23, "right_ankle"],
      ["RightToeBase", 25, 24, "right_foot_index"],
    ];
  }

  function get_mixamo_name_idx_map() {
    const mixamo_names = get_mixamo_names();
    const mixamo_name_idx_map = {};
    for (let name of mixamo_names) {
      mixamo_name_idx_map[name[0]] = name[1];
    }
    return mixamo_name_idx_map;
  }

  function get_mixamo_name_mediapipe_name_map() {
    const mixamo_name_mediapipe_name_map = {};
    const mixamo_names = get_mixamo_names();
    for (let idx = 6; idx < mixamo_names.length; idx++) {
      mixamo_name_mediapipe_name_map[mixamo_names[idx][0]] =
        mixamo_names[idx][3];
    }
    return mixamo_name_mediapipe_name_map;
  }

  function mediapipe_to_glm(landmark, mp_idx_mm_idx_map) {
    // console.log(landmark);
    // const glm_list = new Array(26);
    const glm_list = [];
    const visibility_list = new Array(26);
    // const hip2d_left = vec3(0.0, 0.0, 0.0);
    // const hip2d_right = vec3(0.0, 0.0, 0.0);

    // Original ChatGPT had 'vec3.fromValues()':
    let landmarks = landmark.map((kpt) => vec3(...kpt.slice(0, 3)));

    glm_list[Mixamo.Hips] = avg_vec3(
      landmarks[Keypoints.LEFT_HIP],
      landmarks[Keypoints.RIGHT_HIP]
    );

    glm_list[Mixamo.Neck] = avg_vec3(
      landmarks[Keypoints.LEFT_SHOULDER],
      landmarks[Keypoints.RIGHT_SHOULDER]
    );

    glm_list[Mixamo.Spine1] = avg_vec3(
      glm_list[Mixamo.Hips],
      glm_list[Mixamo.Neck]
    );

    glm_list[Mixamo.Spine] = avg_vec3(
      glm_list[Mixamo.Hips],
      glm_list[Mixamo.Spine1]
    );

    glm_list[Mixamo.Spine2] = avg_vec3(
      glm_list[Mixamo.Spine1],
      glm_list[Mixamo.Neck]
    );

    glm_list[Mixamo.Head] = avg_vec3(
      landmarks[Keypoints.LEFT_EAR],
      landmarks[Keypoints.RIGHT_EAR]
    );

    glm_list[Mixamo.Spine].y *= -1;
    glm_list[Mixamo.Neck].y *= -1;
    glm_list[Mixamo.Spine1].y *= -1;
    glm_list[Mixamo.Spine2].y *= -1;
    glm_list[Mixamo.Head].y *= -1;

    glm_list[Mixamo.Neck].z *= -1;
    glm_list[Mixamo.Spine].z *= -1;
    glm_list[Mixamo.Spine1].z *= -1;
    glm_list[Mixamo.Spine2].z *= -1;
    glm_list[Mixamo.Head].z *= -1;

    for (let mp_idx of Object.keys(mp_idx_mm_idx_map)) {
      let mm_idx = mp_idx_mm_idx_map[mp_idx];
      // Original ChatGPT had 'vec3.fromValues()':
      glm_list[mm_idx] = vec3(
        landmarks[mp_idx].x,
        -landmarks[mp_idx].y,
        -landmarks[mp_idx].z
      );
    }

    return [glm_list, visibility_list];
  }

  const frames = arg.frames;
  const poses = frames.map((elem) => elem["2d_pose"]);

  const mp_name_idx_map = get_name_idx_map();
  const mm_mp_map = get_mixamo_name_mediapipe_name_map();
  const mm_name_idx_map = get_mixamo_name_idx_map();
  const mp_idx_mm_idx_map = {};

  for (const mm_name in mm_mp_map) {
    const mp_name = mm_mp_map[mm_name];
    const mp_idx = mp_name_idx_map[mp_name];
    const mm_idx = mm_name_idx_map[mm_name];
    mp_idx_mm_idx_map[mp_idx] = mm_idx;
  }

  const glm_poses = [];
  for (const pose of poses) {
    const [glm_list, visibility_list] = mediapipe_to_glm(
      pose,
      mp_idx_mm_idx_map
    );
    glm_poses.push(glm_list);
  }

  return glm_poses;
}

const MixamoBones = Object.freeze({
  Hips: 0,
  Spine: 1,
  Spine1: 2,
  Spine2: 3,
  Neck: 4,
  Head: 5,
  LeftArm: 6,
  LeftForeArm: 7,
  LeftHand: 8,
  LeftHandThumb1: 9,
  LeftHandIndex1: 10,
  LeftHandPinky1: 11,
  RightArm: 12,
  RightForeArm: 13,
  RightHand: 14,
  RightHandThumb1: 15,
  RightHandIndex1: 16,
  RightHandPinky1: 17,
  LeftUpLeg: 18,
  LeftLeg: 19,
  LeftFoot: 20,
  LeftToeBase: 21,
  RightUpLeg: 22,
  RightLeg: 23,
  RightFoot: 24,
  RightToeBase: 25,
});

export { MixamoBones };
