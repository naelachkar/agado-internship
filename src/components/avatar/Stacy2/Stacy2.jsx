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

        this.model.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            o.material = stacy_mtl;
          }
          if (o.isBone && o.name === "mixamorigNeck") {
            this.neck = o;
          } else if (o.isBone && o.name === "mixamorigHead") {
            this.head = o;
          } else if (o.isBone && o.name === "mixamorigRightShoulder") {
            this.right_shoulder = o;
          } else if (o.isBone && o.name === "mixamorigLeftShoulder") {
            this.left_shoulder = o;
          } else if (o.isBone && o.name === "mixamorigRightArm") {
            this.right_arm = o;
          } else if (o.isBone && o.name === "mixamorigRightForeArm") {
            this.right_fore_arm = o;
          } else if (o.isBone && o.name === "mixamorigLeftArm") {
            this.left_arm = o;
          } else if (o.isBone && o.name === "mixamorigLeftForeArm") {
            this.left_fore_arm = o;
          } else if (o.isBone && o.name === "mixamorigRightHand") {
            this.right_hand = o;
          } else if (o.isBone && o.name === "mixamorigLeftHand") {
            this.left_hand = o;
          } else if (o.isBone && o.name === "mixamorigRightHandIndex4") {
            this.right_hand_index_4 = o;
          } else if (o.isBone && o.name === "mixamorigRightThumb4") {
            this.right_thumb_4 = o;
            this.right_thumb_4.removeFromParent();
            if (this.right_hand) {
              this.right_thumb_4.attach(this.right_hand);
              console.log("right_thumb_4 attached to right_hand");
            }
          } else if (o.isBone && o.name === "mixamorigLeftThumb4") {
            this.left_thumb_4 = o;
            this.left_thumb_4.removeFromParent();
            if (this.left_hand) {
              this.left_thumb_4.attach(this.right_hand);
              console.log("left_thumb_4 attached to right_hand");
            }
          } else if (o.isBone && o.name === "mixamorigRightLeg") {
            this.right_leg = o;
          } else if (o.isBone && o.name === "mixamorigSpine1") {
            this.spine_1 = o;
          } else if (o.isBone && o.name === "mixamorigSpine2") {
            this.spine_2 = o;
          } else if (o.isBone && o.name === "mixamorigSpine") {
            this.spine = o;
          } else if (o.isBone && o.name === "mixamorigHips") {
            this.hips = o;
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
