import img from "../../assets/AgadoStacy.jpeg";
import mediapipeToMixamo from "./mediapipeToMixamo";
import shula from './shula.json';

async function StacyScript() {
  const mediaPipe = [
    [
      0.5184473991394043, 0.19857102632522583, -0.4661916494369507,
      0.9999380111694336,
    ],
    [
      0.5129076838493347, 0.18722839653491974, -0.433306485414505,
      0.9999089241027832,
    ],
    [
      0.5160479545593262, 0.18674170970916748, -0.4338514804840088,
      0.9998816251754761,
    ],
    [
      0.5187481641769409, 0.1860240399837494, -0.433749794960022,
      0.9999138116836548,
    ],
    [
      0.5020149350166321, 0.1879521608352661, -0.4711328446865082,
      0.999954342842102,
    ],
    [
      0.49476301670074463, 0.1880979686975479, -0.47156670689582825,
      0.9999581575393677,
    ],
    [
      0.4866214096546173, 0.18882864713668823, -0.47178855538368225,
      0.9999587535858154,
    ],
    [
      0.5034785866737366, 0.1925061047077179, -0.22678159177303314,
      0.9999306201934814,
    ],
    [
      0.46174517273902893, 0.19603635370731354, -0.40305137634277344,
      0.999884843826294,
    ],
    [
      0.5219654440879822, 0.2075759321451187, -0.3825068175792694,
      0.9999147653579712,
    ],
    [
      0.505943238735199, 0.2088380753993988, -0.4364081919193268,
      0.9999150037765503,
    ],
    [
      0.550936222076416, 0.2546997368335724, -0.037486519664525986,
      0.9999656677246094,
    ],
    [
      0.4064693748950958, 0.26170068979263306, -0.39366310834884644,
      0.999937891960144,
    ],
    [
      0.6147176027297974, 0.31728506088256836, -0.15687943994998932,
      0.613289475440979,
    ],
    [
      0.45581722259521484, 0.33261364698410034, -0.669360339641571,
      0.9783005118370056,
    ],
    [
      0.6129634976387024, 0.2444310486316681, -0.5151222348213196,
      0.9155669212341309,
    ],
    [
      0.4670288562774658, 0.24943692982196808, -0.949566662311554,
      0.9925957322120667,
    ],
    [
      0.6087474226951599, 0.2294623851776123, -0.5653623342514038,
      0.8893728256225586,
    ],
    [
      0.46332675218582153, 0.23852841556072235, -1.0400984287261963,
      0.9895573258399963,
    ],
    [
      0.597891628742218, 0.22339902818202972, -0.5696360468864441,
      0.8766529560089111,
    ],
    [
      0.44876545667648315, 0.23436687886714935, -1.0303035974502563,
      0.9878892302513123,
    ],
    [
      0.5918992161750793, 0.23101332783699036, -0.5246537923812866,
      0.8134378790855408,
    ],
    [
      0.45318689942359924, 0.23831532895565033, -0.9543798565864563,
      0.9708070755004883,
    ],
    [
      0.5382571220397949, 0.40107491612434387, 0.12368778139352798,
      0.9999783039093018,
    ],
    [
      0.4532555937767029, 0.40129175782203674, -0.12379671633243561,
      0.9999792575836182,
    ],
    [
      0.5417776703834534, 0.49615994095802307, 0.4205757975578308,
      0.28017207980155945,
    ],
    [
      0.4591883718967438, 0.5050889253616333, -0.149933323264122,
      0.9285887479782104,
    ],
    [
      0.5417945981025696, 0.5702221989631653, 0.8147954344749451,
      0.7250357270240784,
    ],
    [
      0.4254809021949768, 0.599043607711792, 0.035987891256809235,
      0.9696704149246216,
    ],
    [
      0.5224378108978271, 0.5871374011039734, 0.8441605567932129,
      0.714364767074585,
    ],
    [
      0.40907198190689087, 0.6120690107345581, 0.0473012812435627,
      0.7977349162101746,
    ],
    [
      0.6137090921401978, 0.5972755551338196, 0.7303290367126465,
      0.8330100774765015,
    ],
    [
      0.46534353494644165, 0.6402043104171753, -0.13935737311840057,
      0.9576383233070374,
    ],
  ];

  // Set our main variables
  let scene,
    renderer,
    camera,
    model, // Our character
    neck, // Reference to the neck bone in the skeleton
    waist, // Reference to the waist bone in the skeleton
    head,
    rightShoulder,
    leftShoulder,
    rightArm,
    leftArm,
    rightForeArm,
    leftForeArm,
    rightHand,
    leftHand,
    rightUpLeg,
    leftUpLeg,
    rightLeg,
    leftLeg,
    rightFoot,
    leftFoot,
    mixer, // THREE.js animations mixer
    clock = new THREE.Clock(); // Used for anims, which run to a clock instead of frame rate

  init();

  async function init() {
    const MODEL_PATH =
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy_lightweight.glb";

    const canvas = document.querySelector("#c");
    const backgroundColor = 0xf1f1f1;

    // Init the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);

    // Init the renderer
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);

    const wrapper = document.getElementById("wrapper");
    wrapper.appendChild(renderer.domElement);

    // Add a camera
    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    camera.position.x = 0;
    camera.position.y = -3;

    let stacy_txt = new THREE.TextureLoader().load(img);

    stacy_txt.flipY = false; // we flip the texture so that its the right way up

    const stacy_mtl = new THREE.MeshPhongMaterial({
      map: stacy_txt,
      color: 0xffffff,
      skinning: true,
    });

    var loader = new THREE.GLTFLoader();

    // async function loadJson() {
    //   try {
    //     const response = await fetch("/component/avatar/Stacy2/shula.json");
    //     const data = await response.json();
    //     return data;
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
    // const jsonExample = await loadJson();
    
    // console.log(shula);
    const converted = mediapipeToMixamo(shula);
    console.log("Converted: ", converted);

    loader.load(
      MODEL_PATH,
      function (gltf) {
        // A lot is going to happen here
        model = gltf.scene;
        let fileAnimations = gltf.animations;

        model.traverse((o) => {
          //To get the list of all the bones
          // console.log(o.name);

          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            o.material = stacy_mtl;
          }

          // Reference the neck and waist bones
          if (o.isBone && o.name === "mixamorigHead") {
            head = o;
          }
          if (o.isBone && o.name === "mixamorigNeck") {
            neck = o;
          }
          if (o.isBone && o.name === "mixamorigSpine") {
            waist = o;
          }
        });

        // Set the models initial scale (its size)
        model.scale.set(12, 12, 12);
        model.position.y = -11;

        // Other methods available:
        // add(object) - Adds a child object to the current object.
        // remove(object) - Removes a child object from the current object.
        // getPosition() - Returns the current position of the object.
        // setPosition(x, y, z) - Sets the position of the object to the specified coordinates.
        // translateX(distance) - Translates the object along the x-axis by the specified distance.
        // translateY(distance) - Translates the object along the y-axis by the specified distance.
        // translateZ(distance) - Translates the object along the z-axis by the specified distance.
        // rotateX(angle) - Rotates the object around the x-axis by the specified angle.
        // rotateY(angle) - Rotates the object around the y-axis by the specified angle.
        // rotateZ(angle) - Rotates the object around the z-axis by the specified angle.
        // scale.set(x, y, z) - Sets the scale of the object to the specified values in each direction.

        head.position.x = mediaPipe[0][0];
        head.position.y = mediaPipe[0][1];
        head.position.z = mediaPipe[0][2];

        scene.add(model);
      },
      undefined, // We don't need this function
      function (error) {
        console.error(error);
      }
    );

    // Add lights
    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
    hemiLight.position.set(0, 50, 0);
    // Add hemisphere light to scene
    scene.add(hemiLight);

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
    scene.add(dirLight);

    // Floor
    let floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
    let floorMaterial = new THREE.MeshPhongMaterial({
      color: 0xdcdcdc,
      shininess: 0,
    });

    let floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -0.5 * Math.PI; // This is 90 degrees by the way
    floor.receiveShadow = true;
    floor.position.y = -11;
    scene.add(floor);

    let geometry = new THREE.SphereGeometry(8, 32, 32);
    let material = new THREE.MeshBasicMaterial({ color: 0x8183f7 }); // 0xf2ce2e
    let sphere = new THREE.Mesh(geometry, material);
    sphere.position.z = -15;
    sphere.position.y = -2.5;
    sphere.position.x = -0.25;
    scene.add(sphere);
  }

  function update() {
    if (mixer) {
      mixer.update(clock.getDelta());
    }
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);
    requestAnimationFrame(update);
  }
  update();

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let canvasPixelWidth = canvas.width / window.devicePixelRatio;
    let canvasPixelHeight = canvas.height / window.devicePixelRatio;

    const needResize =
      canvasPixelWidth !== width || canvasPixelHeight !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
}

export default StacyScript;
