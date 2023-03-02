import { Component } from "react";
// import StacyScript2 from "./StacyScript2";
import "../StacyStyle.css";

export default class Stacy2 extends Component {
  constructor() {
    super();

    const canvasElement = document.createElement("canvas");
    this.clock = new THREE.Clock();
    this.model;

    // Sizes
    let sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    canvasElement.width = sizes.width;
    canvasElement.height = sizes.height;
    canvasElement.style.position = "absolute";
    canvasElement.style.left = "0px";
    canvasElement.style.top = "0px";
    canvasElement.style.zIndex = 5;

    this.body_pose = [];
    this.init = false;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    // Init the renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvasElement,
      alpha: true,
      antialias: true,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(canvasElement);

    const MODEL_PATH =
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy_lightweight.glb";
    let stacy_txt = new THREE.TextureLoader().load(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy.jpg"
    );
    stacy_txt.flipY = false;

    const stacy_mtl = new THREE.MeshPhongMaterial({
      map: stacy_txt,
      color: 0xffffff,
      skinning: true,
    });

    var model_loader = new THREE.GLTFLoader();

    model_loader.load(
      MODEL_PATH,
      (gltf) => {
        this.model = gltf.scene;
        const self = this;
        this.model.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            o.material = stacy_mtl;
          }
          if (o.isBone && o.name === "mixamorigNeck") {
            self.neck = o;
          } else if (o.isBone && o.name === "mixamorigHead") {
            self.head = o;
          } else if (o.isBone && o.name === "mixamorigRightShoulder") {
            self.right_shoulder = o;
          } else if (o.isBone && o.name === "mixamorigLeftShoulder") {
            self.left_shoulder = o;
          } else if (o.isBone && o.name === "mixamorigRightArm") {
            self.right_arm = o;
          } else if (o.isBone && o.name === "mixamorigRightForeArm") {
            self.right_fore_arm = o;
          } else if (o.isBone && o.name === "mixamorigLeftArm") {
            self.left_arm = o;
          } else if (o.isBone && o.name === "mixamorigLeftForeArm") {
            self.left_fore_arm = o;
          } else if (o.isBone && o.name === "mixamorigRightHand") {
            self.right_hand = o;
          } else if (o.isBone && o.name === "mixamorigLeftHand") {
            self.left_hand = o;
          } else if (o.isBone && o.name === "mixamorigRightHandIndex4") {
            self.right_hand_index_4 = o;
          } else if (o.isBone && o.name === "mixamorigRightThumb4") {
            self.right_thumb_4 = o;
            self.right_thumb_4.removeFromParent();
            if (this.right_hand) {
              this.right_thumb_4.attach(this.right_hand);
              console.log("right_thumb_4 attached to right_hand");
            }
          } else if (o.isBone && o.name === "mixamorigLeftThumb4") {
            self.left_thumb_4 = o;
            self.left_thumb_4.removeFromParent();
            if (this.left_hand) {
              self.left_thumb_4.attach(this.right_hand);
              console.log("left_thumb_4 attached to right_hand");
            }
          } else if (o.isBone && o.name === "mixamorigRightLeg") {
            self.right_leg = o;
          } else if (o.isBone && o.name === "mixamorigSpine1") {
            self.spine_1 = o;
          } else if (o.isBone && o.name === "mixamorigSpine2") {
            self.spine_2 = o;
          } else if (o.isBone && o.name === "mixamorigSpine") {
            self.spine = o;
          } else if (o.isBone && o.name === "mixamorigHips") {
            self.hips = o;
          }
        });

        // this.model.scale.set(7, 10, 7);
        this.model.scale.set(4, 7, 4);
        this.model.position.x = 0;
        this.model.position.y = -2; // -11
        this.model.position.z = 0;

        this.scene.add(this.model);

        const skeletonHelper = new THREE.SkeletonHelper(this.model);
        this.scene.add(skeletonHelper);
        // this.model.visible = false;

        var helper_axes = new THREE.AxesHelper(80);
        this.spine.add(helper_axes);
      },
      undefined, // We don't need this function
      function (error) {
        console.error(error);
      }
    );

    let fov = 75;
    let near = 0.01;
    let far = 1000;
    this.camera = new THREE.PerspectiveCamera(fov, 640 / 480, near, far);

    this.camera.position.x = 0;
    this.camera.position.y = 5;
    this.camera.position.z = 10;

    this.renderer.setSize(sizes.width, sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Add lights
    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
    hemiLight.position.set(0, 50, 0);
    // Add hemisphere light to scene
    this.scene.add(hemiLight);

    let d = 8.25;
    let dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
    dirLight.position.set(-8, 12, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 1500;
    dirLight.shadow.camera.left = d * -1;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = d * -1;
    // Add directional Light to scene
    this.scene.add(dirLight);

    function update_data(body_pose) {
      this.body_pose = body_pose;

      if (this.neck) {
        // this.poseAngles(this.neck);
      }

      if (this.right_arm) {
        this.poseAngles(this.right_arm);
      }
      if (this.right_fore_arm) {
        this.poseAngles(this.right_fore_arm);
      }
      if (this.left_arm) {
        this.poseAngles(this.left_arm);
      }
      if (this.left_fore_arm) {
        this.poseAngles(this.left_fore_arm);
      }
      if (this.right_hand) {
        this.poseAngles(this.right_hand);
      }
      if (this.left_hand) {
        this.poseAngles(this.left_hand);
      }
    }

    function poseAngles(joint) {
      if (this.body_pose.length == 0) return;
      const pose_left_shoulder = new THREE.Vector3(
        this.body_pose[11].slice(0, 3)[0],
        -this.body_pose[11].slice(0, 3)[1],
        -this.body_pose[11].slice(0, 3)[2]
      );
      const pose_right_shoulder = new THREE.Vector3(
        this.body_pose[12].slice(0, 3)[0],
        -this.body_pose[12].slice(0, 3)[1],
        -this.body_pose[12].slice(0, 3)[2]
      );
      const pose_left_elbow = new THREE.Vector3(
        this.body_pose[13].slice(0, 3)[0],
        -this.body_pose[13].slice(0, 3)[1],
        -this.body_pose[13].slice(0, 3)[2]
      );
      const pose_right_elbow = new THREE.Vector3(
        this.body_pose[14].slice(0, 3)[0],
        -this.body_pose[14].slice(0, 3)[1],
        -this.body_pose[14].slice(0, 3)[2]
      );
      const pose_left_hand = new THREE.Vector3(
        this.body_pose[15].slice(0, 3)[0],
        -this.body_pose[15].slice(0, 3)[1],
        -this.body_pose[15].slice(0, 3)[2]
      );
      const pose_right_hand = new THREE.Vector3(
        this.body_pose[16].slice(0, 3)[0],
        -this.body_pose[16].slice(0, 3)[1],
        -this.body_pose[16].slice(0, 3)[2]
      );
      const pose_left_hand_thumb_4 = new THREE.Vector3(
        this.body_pose[21].slice(0, 3)[0],
        -this.body_pose[21].slice(0, 3)[1],
        -this.body_pose[21].slice(0, 3)[2]
      );
      const pose_right_hand_thumb_4 = new THREE.Vector3(
        this.body_pose[22].slice(0, 3)[0],
        -this.body_pose[22].slice(0, 3)[1],
        -this.body_pose[22].slice(0, 3)[2]
      );
      const pose_left_hip = new THREE.Vector3(
        this.body_pose[23].slice(0, 3)[0],
        -this.body_pose[23].slice(0, 3)[1],
        -this.body_pose[23].slice(0, 3)[2]
      );
      const pose_right_hip = new THREE.Vector3(
        this.body_pose[24].slice(0, 3)[0],
        -this.body_pose[24].slice(0, 3)[1],
        -this.body_pose[24].slice(0, 3)[2]
      );

      const pose_hips = new THREE.Vector3()
        .copy(pose_left_hip)
        .add(pose_right_hip)
        .multiplyScalar(0.5);
      const pose_spine_2 = new THREE.Vector3()
        .copy(pose_right_shoulder)
        .add(pose_left_shoulder)
        .multiplyScalar(0.5); //.multiplyScalar(0.728);

      var point_parent;
      var point_articulation;
      var point_child;
      if (joint == this.neck) {
        var point_parent = pose_hips;
        var point_articulation = pose_spine_2;
        var point_arm = pose_right_elbow;

        const vec_parent = new THREE.Vector3()
          .subVectors(point_articulation, point_parent)
          .multiplyScalar(0.375);
        const vec_bone = new THREE.Vector3().subVectors(
          point_arm,
          point_articulation
        );

        setJointAnglesFromVects(joint, vec_bone, vec_parent);
      } else if (joint == this.right_arm) {
        point_parent = pose_spine_2;
        point_articulation = pose_right_shoulder;
        point_child = pose_right_elbow;
      } else if (joint == this.left_arm) {
        point_parent = pose_spine_2;
        point_articulation = pose_left_shoulder;
        point_child = pose_left_elbow;
      } else if (joint == this.right_fore_arm) {
        point_parent = pose_right_shoulder;
        point_articulation = pose_right_elbow;
        point_child = pose_right_hand;
      } else if (joint == this.left_fore_arm) {
        point_parent = pose_left_shoulder;
        point_articulation = pose_left_elbow;
        point_child = pose_left_hand;
      } else if (joint == this.right_hand) {
        point_parent = pose_right_elbow;
        point_articulation = pose_right_hand;
        point_child = pose_right_hand_thumb_4;
      } else if (joint == this.left_hand) {
        point_parent = pose_left_elbow;
        point_articulation = pose_left_hand;
        point_child = pose_left_hand_thumb_4;
      }
      const vec_parent = new THREE.Vector3().subVectors(
        point_articulation,
        point_parent
      );
      const vec_bone = new THREE.Vector3().subVectors(
        point_child,
        point_articulation
      );
      setJointAnglesFromVects(joint, vec_parent, vec_bone);
    }

    function setJointAnglesFromVects(joint, vec_parent_world, vec_child_world) {
      const vec_child_local = joint.parent
        .clone()
        .worldToLocal(vec_child_world.clone());
      const vec_parent_local = joint.parent
        .clone()
        .worldToLocal(vec_parent_world.clone());
      var quat_pose_rot = new THREE.Quaternion();
      quat_pose_rot.setFromUnitVectors(
        vec_parent_local.clone().normalize(),
        vec_child_local.clone().normalize()
      );
      joint.quaternion.rotateTowards(quat_pose_rot.clone(), 0.05);
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

// export default function Stacy2() {
//   useEffect(() => {
//     StacyScript2();
//   }, []);

//   return (
//     <div className="flex column">
//       <h1>Stacy Test</h1>
//       <div id="wrapper">
//         <canvas id="c"></canvas>
//       </div>
//     </div>
//   );
// }
