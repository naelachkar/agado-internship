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

const MixamoParent = Object.freeze({
  Hips: undefined,
  Spine: "Hips",
  Spine1: "Spine",
  Spine2: "Spine1",
  Neck: "Spine2",
  Head: "Neck",
  LeftShoulder: "Spine2",
  LeftArm: "LeftShoulder",
  LeftForeArm: "LeftArm",
  LeftHand: "LeftForeArm",
  LeftHandThumb1: "LeftHand",
  LeftHandIndex1: "LeftHand",
  LeftHandPinky1: "LeftHand",
  RightShoulder: "Spine2",
  RightArm: "RightShoulder",
  RightForeArm: "RightArm",
  RightHand: "RightForeArm",
  RightHandThumb1: "RightHand",
  RightHandIndex1: "RightHand",
  RightHandPinky1: "RightHand",
  LeftUpLeg: "Hips",
  LeftLeg: "LeftUpLeg",
  LeftFoot: "LeftLeg",
  LeftToeBase: "LeftToeBase",
  RightUpLeg: "Hips",
  RightLeg: "RightUpLeg",
  RightFoot: "RightLeg",
  RightToeBase: "RightFoot",
});

function vec3(a, b, c) {
  return {
    x: a,
    y: b,
    z: c,
  };
}

function avgVec3(v1, v2) {
  const v3 = {
    x: (v1[0] + v2[0]) * 0.5,
    y: (v1[1] + v2[1]) * 0.5,
    z: (v1[2] + v2[2]) * 0.5,
  };
  return v3;
}

function avgVec3_2(v1, v2) {
  const v3 = {
    x: (v1.x + v2.x) * 0.5,
    y: (v1.y + v2.y) * 0.5,
    z: (v1.z + v2.z) * 0.5,
  };
  return v3;
}

function subsVec3(v1, v2) {
  const v3 = {
    x: v1.x - v2.x,
    y: v1.y - v2.y,
    z: v1.z - v2.z,
  };
  return v3;
}

export default function testFunction(MediaPipe) {
  console.log(MediaPipe);
  // Initialisation
  const stacyPoints = {};
  const stacyBones = {};

  stacyPoints.Hips = avgVec3(
    MediaPipe[Keypoints.LEFT_HIP],
    MediaPipe[Keypoints.RIGHT_HIP]
  );
  stacyPoints.Neck = avgVec3(
    MediaPipe[Keypoints.LEFT_SHOULDER],
    MediaPipe[Keypoints.RIGHT_SHOULDER]
  );
  stacyPoints.Spine1 = avgVec3_2(stacyPoints.Hips, stacyPoints.Neck);
  stacyPoints.Spine = avgVec3_2(stacyPoints.Hips, stacyPoints.Spine1);
  stacyPoints.Spine2 = avgVec3_2(stacyPoints.Spine1, stacyPoints.Neck);
  stacyPoints.Head = avgVec3(
    MediaPipe[Keypoints.LEFT_EAR],
    MediaPipe[Keypoints.RIGHT_EAR]
  );

  // stacyPoints.LeftArm = vec3(
  //   MediaPipe[Keypoints.LEFT_SHOULDER][0],
  //   MediaPipe[Keypoints.LEFT_SHOULDER][1],
  //   MediaPipe[Keypoints.LEFT_SHOULDER][2]
  // );
  // stacyPoints.LeftShoulder = avgVec3_2(stacyPoints.Neck, stacyPoints.LeftArm);
  // stacyPoints.LeftForeArm = vec3(MediaPipe[Keypoints.LEFT_ELBOW][0], MediaPipe[Keypoints.LEFT_ELBOW][1], MediaPipe[Keypoints.LEFT_ELBOW][2]);
  // stacyPoints.LeftHand = MediaPipe[Keypoints.LEFT_WRIST];
  // stacyPoints.LeftHandThumb1 = MediaPipe[Keypoints.LEFT_THUMB];
  // stacyPoints.LeftHandIndex1 = MediaPipe[Keypoints.LEFT_INDEX];
  // stacyPoints.LeftHandPinky1 = MediaPipe[Keypoints.LEFT_PINKY];
  // stacyPoints.RightArm = MediaPipe[Keypoints.RIGHT_SHOULDER];
  // stacyPoints.RightShoulder = avgVec3_2(stacyPoints.Neck, stacyPoints.RightArm);
  // stacyPoints.RightForeArm = MediaPipe[Keypoints.RIGHT_ELBOW];
  // stacyPoints.RightHand = MediaPipe[Keypoints.RIGHT_WRIST];
  // stacyPoints.RightHandThumb1 = MediaPipe[Keypoints.RIGHT_THUMB];
  // stacyPoints.RightHandIndex1 = MediaPipe[Keypoints.RIGHT_INDEX];
  // stacyPoints.RightHandPinky1 = MediaPipe[Keypoints.RIGHT_PINKY];
  // stacyPoints.LeftUpLeg = MediaPipe[Keypoints.LEFT_HIP];
  // stacyPoints.LeftLeg = MediaPipe[Keypoints.LEFT_KNEE];
  // stacyPoints.LeftFoot = MediaPipe[Keypoints.LEFT_ANKLE];
  // stacyPoints.LeftToeBase = MediaPipe[Keypoints.LEFT_FOOT_INDEX];
  // stacyPoints.RightUpLeg = MediaPipe[Keypoints.RIGHT_HIP];
  // stacyPoints.RightLeg = MediaPipe[Keypoints.RIGHT_KNEE];
  // stacyPoints.RightFoot = MediaPipe[Keypoints.RIGHT_ANKLE];
  // stacyPoints.RightToeBase = MediaPipe[Keypoints.RIGHT_FOOT_INDEX];

  // console.log(stacyPoints);

  stacyBones.Hips = { start: { x: 0, y: 0, z: 0 }, end: stacyPoints.Hips };
  const { Hips } = stacyBones;
  Hips.tgbone = Hips.end;
  Hips.rgbone = Math.atan(
    (Hips.end.y - Hips.start.y) / (Hips.end.x - Hips.start.x)
  );

  // Starting transformation
  stacyBones.Spine1 = { start: stacyPoints.Hips, end: stacyPoints.Spine1 };
  const { Spine1 } = stacyBones;
  Spine1.tgbone = Spine1.end;
  Spine1.rgbone = Math.atan(
    (Spine1.end.y - Spine1.start.y) / (Spine1.end.x - Spine1.start.x)
  );
  Spine1.rbone = Spine1.rgbone - Hips.rgbone;
  Spine1.tgbone2 = subsVec3(Spine1.tgbone, Hips.tgbone);
  Spine1.tbone = {
    x:
      Spine1.tgbone2.x * Math.cos(-Hips.rgbone) -
      Spine1.tgbone2.y * Math.sin(-Hips.rgbone),
    y:
      Spine1.tgbone2.x * Math.sin(-Hips.rgbone) -
      Spine1.tgbone2.y * Math.cos(-Hips.rgbone),
    z: 0,
  };

  return stacyBones;
}
