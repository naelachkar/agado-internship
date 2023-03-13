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
  const stacyPoints = {};

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

  

  // Swaping x and y
  //   console.log(stacyPoints);
  //   for (let key in stacyPoints) {
  //     const temp = stacyPoints[key].x;
  //     stacyPoints[key].x = stacyPoints[key].y;
  //     stacyPoints[key].y = temp;
  //   }
  //   console.log(stacyPoints);

  // Starting transformation
  stacyPoints.HipsBone = { start: { x: 0, y: 0, z: 0 }, end: stacyPoints.Hips };
  stacyPoints.Spine1Bone = { start: stacyPoints.Hips, end: stacyPoints.Spine1 };
  const { HipsBone, Spine1Bone } = stacyPoints;

  HipsBone.tgbone = HipsBone.end;
  HipsBone.rgbone = Math.atan(
    (HipsBone.end.y - HipsBone.start.y) / (HipsBone.end.x - HipsBone.start.x)
  );

  Spine1Bone.tgbone = Spine1Bone.end;
  Spine1Bone.rgbone = Math.atan(
    (Spine1Bone.end.y - Spine1Bone.start.y) /
      (Spine1Bone.end.x - Spine1Bone.start.x)
  );
  Spine1Bone.rbone = Spine1Bone.rgbone - HipsBone.rgbone;
  Spine1Bone.tgbone2 = subsVec3(Spine1Bone.tgbone, HipsBone.tgbone);
  Spine1Bone.tbone = {
    x:
      Spine1Bone.tgbone2.x * Math.cos(-HipsBone.rgbone) -
      Spine1Bone.tgbone2.y * Math.sin(-HipsBone.rgbone),
    y:
      Spine1Bone.tgbone2.x * Math.sin(-HipsBone.rgbone) -
      Spine1Bone.tgbone2.y * Math.cos(-HipsBone.rgbone),
    z: 0,
  };

  return stacyPoints;
}
