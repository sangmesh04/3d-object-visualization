/* eslint-disable */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
// import GLTFExporter from "three-gltf-exporter";

import React from "react";

import { colors } from "./texture";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import axiosInstance from "../../axios";

const Customizer = (props) => {
  document.title = "Product Customizer";

  //Initialze Camera for viewing 3D Model
  var camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    60
  );
  camera.position.z = 5; //Farness

  var loaded = false; // Model is loaded or not
  let initRotate = 0; // Rotating the model
  let meshcolor = {}; // Object storing the meshes and colors in it Eg:- {legs:"Blue", cushion:"Black"}
  const [productSize, setProductSize] = useState({
    length: null,
    breadth: null,
    height: null,
  });

  const location = useLocation();

  const [customization, setCustomization] = useState(); // State variable to store meshcolor
  const [model, setModel] = useState(); // State variable to store 3d Model
  const [arlink, setArlink] = useState(); // Stores link of AR File that is generated after clicking 'Proceed'
  const [arShow, setARShow] = useState();
  const [product, setProduct] = useState({
    arFile: location.state.image,
    length: 200,
    breadth: 500,
    height: 300,
    design: {
      color: "777777",
      size: "200x500x300",
    },
  }); // Product Details

  const [step, setStep] = useState(1);
  const [extras, getExtras] = useState();

  let m = [];
  let part; // Part Selected to customize
  const [meshes, setMeshes] = useState(); // Array to store Meshes/Parts Name

  const [initScene, setScene] = useState(); // State Variable to store Scene
  const scene = new THREE.Scene(); //Initialize Scene
  scene.background = new THREE.Color(0xffffff);

  const material = new THREE.MeshStandardMaterial({ color: 0x777777 }); // Initial Material of product

  const renderer = new THREE.WebGLRenderer({ antialias: true }); // Renderer which generates a div in which model gets loaded
  renderer.setSize(window.innerWidth, 500); // Size of div
  renderer.shadowMap.enabled = true;

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61); // Light for visibiltity of model in Camera
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5); // Light for visibiltity of model in Camera
  dirLight.target.position.set(0, 0, -1);
  dirLight.add(dirLight.target);
  dirLight.lookAt(-1, -1, 0);
  dirLight.name = "DirectionalLight";
  scene.add(dirLight);

  var loader = new GLTFLoader();

  // Function to Load Model
  useEffect(() => {
    if (product !== undefined && !loaded) {
      loader.load(
        product.arFile,
        function (gltf) {
          console.log("Loader", scene);
          var theModel = gltf.scene;
          theModel.traverse((o) => {
            //Going through each Mesh
            if (o.isMesh) {
              m.push(o.name); // Put name of Mesh in Array of Buttons
              o.nameID = o.name;
              o.castShadow = true;
              o.receiveShadow = true;
              //   if (o.name in product.design.color) {
              //     o.material = setColor(product.design.color[o.name]);
              //   }
              //o.material = material; // Assigning initial Material
            }
          });
          theModel.scale.set(1, 1, 1);
          theModel.rotation.y = Math.PI;
          theModel.position.y = 0;
          scene.add(theModel); // Adding model to the scene
          setModel(theModel);
          setMeshes(m);
          setScene(scene);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );

      animate(); // For assigning controls and rotations of model
    }
  }, [product]);

  var controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI / 2;
  controls.minPolarAngle = Math.PI / 3;
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.dampingFactor = 0.1;
  controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
  controls.autoRotateSpeed = 0.2;

  function animate() {
    controls.update();
    renderer.render(scene, camera); // Render
    requestAnimationFrame(animate);

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    if (model != null && loaded == false) {
      initialRotation();
    }
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvasPixelWidth = canvas.width / window.devicePixelRatio;
    var canvasPixelHeight = canvas.height / window.devicePixelRatio;

    const needResize =
      canvasPixelWidth !== width || canvasPixelHeight !== height;
    // if (needResize) {
    //     renderer.setSize(width, 350, false);
    // }
    return needResize;
  }

  function initialRotation() {
    initRotate++;
    if (initRotate <= 120) {
      model.rotation.y += Math.PI / 60;
    } else {
      loaded = true;
    }
  }

  // Div which was created above is placed to DIV with id 'obj'
  useEffect(() => {
    const r = renderer.domElement;
    const t = document.getElementById("obj");
    if (!model && t && product) {
      t.appendChild(r);
      console.log("Obj", renderer);
    }
    if (model && !extras) {
      model.traverse((o) => {
        if (o.isMesh) {
          let n = o.name;
          meshcolor[n] = product.design.color
            ? product.design.color[n]
            : { color: "777777" };
        }
      });

      console.log("Product Size: ", product.design.size);

      const l = Object.keys(product.design).length;
      if (l > 2) {
        let e = product.design.extras;
        getExtras(e);
      } else getExtras();
    }
  }, [renderer]);

  // onClick of Proceed this function runs
  const download = () => {
    const exporter = new GLTFExporter();
    console.log("Download", initScene);
    console.log("Dict", meshcolor);
    setCustomization({ ...customization, color: meshcolor });
    exporter.parse(
      initScene,
      function (result) {
        console.log("result", result);
        if (result && result instanceof ArrayBuffer) {
          saveArrayBuffer(result, "scene.glb");
        } else {
          const output = JSON.stringify(result, null, 2);
          saveString(output, "scene.gltf");
        }
      },
      function (error) {
        console.log(error);
      },
      { binary: true }
    );
  };

  const link = document.createElement("a");
  link.style.display = "none";
  document.body.appendChild(link);

  function saveArrayBuffer(buffer, fileName) {
    save(new Blob([buffer], { type: "model/gltf-binary" }), fileName);
  }

  function saveString(text, filename) {
    save(new Blob([text], { type: "text/plain" }), filename);
  }

  const save = async (blob, fileName) => {
    const load = toast.loading("loading...");
    console.log("Blob", blob);
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    console.log(link.href);

    const s3Client = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
      },
    });
    const keypath = `customize/${
      location.state.name + Date.now() + "-" + fileName
    }`;
    const params = {
      Bucket: "3d-object-visualization",
      Key: keypath,
      Body: blob,
    };
    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);
    // const data = true;
    if (data) {
      toast.dismiss(load);
      setArlink(
        `https://3d-object-visualization.s3.ap-south-1.amazonaws.com/${keypath}`
        // "https://3d-object-visualization.s3.ap-south-1.amazonaws.com/customize/Arm+Chair1714543799674-scene.glb"
      );
      toast.success("Customized file uploaded!");
    } else {
      toast.dismiss(load);
      toast.error("Unable to upload image!");
    }
    // axios.post(`${backendUrl}/uploadApproval`, formData)
    // .then(res=>{
    //     console.log(res)
    //     const a = res.data.filename
    //     setArlink(a)

    // })
    setStep(2);
  };

  // Runs when we change texture or color from predefined colors in pallete
  const changeColor = (color) => {
    if (!part) {
      toast.error("Select a mesh part!");
    } else {
      let new_mtl;
      if (color.texture) {
        let txt = new THREE.TextureLoader().load(color.texture);

        txt.repeat.set(color.size[0], color.size[1], color.size[2]);
        txt.wrapS = THREE.RepeatWrapping;
        txt.wrapT = THREE.RepeatWrapping;

        new_mtl = new THREE.MeshStandardMaterial({
          map: txt,
        });

        meshcolor[part] = { texture: color.texture };
      } else {
        new_mtl = new THREE.MeshStandardMaterial({
          color: parseInt("0x" + color.color),
          //shininess: color.shininess ? color.shininess : 10
        });
        meshcolor[part] = { color: color.color };
      }

      model.traverse((o) => {
        if (o.isMesh && o.nameID != null) {
          if (o.name == part) {
            // if Mesh Name matches Part Name selected
            o.material = new_mtl; // New material assigned to that mesh
          }
        }
      });
    }
  };

  const setColor = (color) => {
    let new_mtl;
    if (color.texture) {
      let txt = new THREE.TextureLoader().load(color.texture);

      txt.repeat.set(4, 4, 4);
      txt.wrapS = THREE.RepeatWrapping;
      txt.wrapT = THREE.RepeatWrapping;

      new_mtl = new THREE.MeshStandardMaterial({
        map: txt,
      });
    } else {
      new_mtl = new THREE.MeshStandardMaterial({
        color: parseInt("0x" + color.color),
      });
    }
    return new_mtl;
  };

  // Runs when we click a mesh name like 'legs' , 'back'
  const setPart = (mesh) => {
    if (part) {
      document.getElementById(`${part}`).style.backgroundColor = "#b3b3b3";
      document.getElementById(`${part}`).style.borderColor = "#b3b3b3";
      document.getElementById(`${part}`).style.color = "#000000";
    }
    part = mesh;
    console.log(part);
    document.getElementById(`${mesh}`).style.backgroundColor = "#333333";
    document.getElementById(`${mesh}`).style.borderColor = "#333333";
    document.getElementById(`${mesh}`).style.color = "#ffffff";
  };
  // All this document.getElementById is for changing CSS of buttons

  // Runs when we change color from custom input
  const cColor = (color) => {
    if (!part) {
      toast.error("Select a mesh part!");
    } else {
      let new_mtl = new THREE.MeshStandardMaterial({
        color: parseInt("0x" + color.substring(1)),
        //shininess: color.shininess ? color.shininess : 10
      });

      meshcolor[part] = { color: color.substring(1) };

      model.traverse((o) => {
        if (o.isMesh && o.nameID != null) {
          if (o.name == part) {
            o.material = new_mtl;
          }
        }
      });
    }
  };

  //API to make customization request
  const addCustomizationRequest = () => {
    //setCustomization({...customization, image: arlink})

    const request = {
      productId: location.state._id,
      image: arlink,
      customization,
    };

    axiosInstance
      .post(`/customize/add`, { ...request })
      .then((res) => {
        toast.success("Customization request sent successfully!");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  const extraCustomization = (cmd) => {
    if (cmd === "add") {
      setCustomization({ ...customization, size: { ...productSize } });
    }
    setStep(4);
  };

  return (
    <div className="customization-page">
      {!model ? <div className="loading-model">Retrieving Model...</div> : null}

      <div className="step-box text-center">
        <div
          className={
            step === 1
              ? "ind-step customization-step-on"
              : "ind-step customization-step"
          }
        >
          Color Customization
        </div>
        <div
          className={
            step === 2
              ? "ind-step customization-step-on"
              : "ind-step customization-step"
          }
        >
          Size Customization
        </div>
        {extras ? (
          <div
            className={
              step === 3
                ? "ind-step customization-step-on"
                : "ind-step customization-step"
            }
          >
            Extra Customization
          </div>
        ) : null}
        <div
          className={
            step === 4
              ? "ind-step customization-step-on"
              : "ind-step customization-step"
          }
        >
          View in AR
        </div>
      </div>

      {step === 4 ? (
        arlink ? (
          <div className="p-2">
            <div className="row">
              <div className="col-6 text-left">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Customize Again
                </button>
              </div>
              <div className="col-6 text-right">
                <button
                  className="btn btn-dark align-right"
                  onClick={addCustomizationRequest}
                >
                  Ask for Approval
                </button>
              </div>
            </div>

            <div className="my-3">
              <model-viewer
                style={{
                  height: "500px",
                  width: "100%",
                  backgroundColor: "#17171A!important",
                }}
                src={arlink}
                ar
                alt="A 3D model of a furniture"
                camera-orbit="-90deg"
                auto-rotate=""
                camera-controls=""
                background-color="#455A64"
              ></model-viewer>
            </div>
          </div>
        ) : (
          <p>Loading Model...</p>
        )
      ) : null}

      {step === 1 ? (
        <div className="p-2 text-center">
          <div id="obj" style={{ height: "50vh" }}></div>
          <div className="row mx-3 color-pallete justify-content-md-center">
            {colors && colors.length !== 0
              ? colors.map((color, index) => (
                  <div
                    key={index}
                    className="choose-color"
                    style={
                      color.texture
                        ? { backgroundImage: `url(${color.texture})` }
                        : { backgroundColor: `#${color.color}` }
                    }
                    onClick={() => changeColor(color)}
                  />
                ))
              : null}
            <br />
          </div>
          <div className="mx-3">
            Select Custom Color from this input:{" "}
            <input
              type="color"
              className="choose-input-color"
              onChange={(e) => {
                cColor(e.target.value);
              }}
            />
          </div>

          <div style={{ textAlign: "center", padding: "1rem" }}>
            <div id="selected-part"></div>
            {meshes && meshes.length != 0
              ? meshes.map((mesh, index) => (
                  <button
                    className="btn m-1"
                    style={{ backgroundColor: "#b3b3b3" }}
                    id={`${mesh}`}
                    onClick={() => {
                      setPart(mesh);
                    }}
                  >
                    {"Mesh part " + (index + 1)}
                  </button>
                ))
              : null}
            <br />
            <button className="btn btn-info m-2" onClick={download}>
              Proceed
            </button>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="m-50 text-center">
          <br />
          <div style={{ fontSize: "16px" }}>
            Product Original Dimensions (in inches): {product.length} x{" "}
            {product.breadth} x {product.height}
          </div>
          <br />
          <br />
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>
            Customize product size
          </div>
          <div
            className="p-1 text-center"
            style={{ width: "300px", margin: "12px auto" }}
          >
            <h6>Enter your Dimensions (in inches)</h6>
            <input
              className="input-lg1-text form-control"
              type="text"
              onChange={(event) => {
                setProductSize({ ...productSize, length: event.target.value });
              }}
              placeholder="Length"
            />
            <br />
            <input
              className="input-lg1-text form-control"
              type="text"
              onChange={(event) => {
                setProductSize({ ...productSize, breadth: event.target.value });
              }}
              placeholder="Breadth"
            />
            <br />
            <input
              className="input-lg1-text form-control"
              type="text"
              onChange={(event) => {
                setProductSize({ ...productSize, height: event.target.value });
              }}
              placeholder="Height"
            />
            <br />
          </div>
          <button
            className="btn btn-proceed m-2"
            onClick={() => extraCustomization("skip")}
          >
            Skip
          </button>
          <button
            className="btn btn-info m-2"
            onClick={() => extraCustomization("add")}
          >
            Proceed
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Customizer;
