// def avg_vec3(v1, v2):
//     v3 = glm.vec3((v1.x + v2.x)* 0.5,
//                  (v1.y + v2.y)* 0.5,
//                  (v1.z + v2.z)* 0.5)
//     return v3

function avg_vec3(v1, v2) {
  return {
    x: (v1.x + v2.x) * 0.5,
    y: (v1.y + v2.y) * 0.5,
    z: (v1.z + v2.z) * 0.5,
  };
}

// npm install glm-js
// PY glm.vec3(x, y, x) => JS glm.vec3(x, y, z) // Identical

// function createVec3(x, y, z) {
//     return glm.vec3(x, y, z);
// }

function detectPose2(mp_pose) {
  // Initialize a list to store the detected landmarks.
  const glm_list = new Array(26);
  const visibility_list = new Array(26);
  const hip2d = glm.vec3(0.0, 0.0, 0.0);

  //! landmark = results.pose_world_landmarks.landmark
}
