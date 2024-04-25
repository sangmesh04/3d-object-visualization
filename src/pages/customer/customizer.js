/* eslint-disable */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter"
import GLTFExporter from "three-gltf-exporter";

import React from "react";

import { colors } from "./texture";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../axios";
import { useParams } from "react-router-dom";

const Customizer = () => {
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
  let productSize = {};

  const [customization, setCustomization] = useState(); // State variable to store meshcolor
  const [model, setModel] = useState(); // State variable to store 3d Model
  const [arlink, setArlink] = useState(); // Stores link of AR File that is generated after clicking 'Proceed'
  const [arShow, setARShow] = useState();
  const [product, setProduct] = useState({
    arFile:
      "https://3d-object-visualization.s3.ap-south-1.amazonaws.com/products/Arm Chair1712057004724-arm_chair__furniture.glb",
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

  // API to get Product details

  const params = useParams();

  // useEffect(() => {
  //   const load = toast.loading("loading...");
  //   axiosInstance
  //     .get(`/product/${params.productId}`)
  //     .then((res) => {
  //       // setProduct(res.data.data);
  //       toast.dismiss(load);
  //     })
  //     .catch((err) => {
  //       toast.dismiss(load);
  //       toast.error("Something went wrong!");
  //     });
  // }, []);

  // Function to Load Model
  useEffect(() => {
    // if (product !== undefined && !loaded) {
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
            // if (o.name in product.design.color) {
            //   o.material = setColor(product.design.color[o.name]);
            // }
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
    // }
  }, []);

  var controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI / 2;
  controls.minPolarAngle = Math.PI / 3;
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.dampingFactor = 0.1;
  controls.autoRotate = true; // Toggle this if you'd like the chair to automatically rotate
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
      let s = product.design.size;
      productSize = s;

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
        console.log(result);
        if (result instanceof ArrayBuffer) {
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

  function save(blob, fileName) {
    console.log("Blob", blob);
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    console.log(link.href);
    setARShow(link.href);

    const formData = new FormData();
    //console.log(file)
    formData.append("file", blob);
    formData.append("fileName", fileName);
    console.log(formData);

    // axios.post(`${backendUrl}/uploadApproval`, formData)
    // .then(res=>{
    //     console.log(res)
    //     const a = res.data.filename
    //     setArlink(a)

    // })
    setStep(2);
  }

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
  const ChangeColors = (color) => {
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

  // //API to make customization request
  // const addCustomizationRequest = () => {
  //   //setCustomization({...customization, image: arlink})
  //   let cc = customization;
  //   cc['image'] = arlink
  //   console.log("Customization", cc)

  //   const request = {
  //       user:user,
  //       product: product,
  //       customization: cc
  //   }

  //   axios.post(`${backendUrl}/addCustomizationRequest/`, request)
  //   .then(res=>{
  //       console.log(res.data)
  //       alert(res.data.message)
  //       props.history.push('/approvals')
  //   })
  //   .catch(err=>{
  //       alert("Something went wrong")
  //   })
  // }

  const extraCustomization = () => {
    setCustomization({ ...customization, size: productSize });
    if (extras) setStep(3);
    else setStep(4);
  };

  const changeSize = (p, value) => {
    productSize[p] = value;
  };

  const changeExtras = (index, n) => {
    let e = extras;
    e[index].qty = e[index].qty + n;
    getExtras(e);
    setCustomization({ ...customization, extras: e });
    console.log("New Extras", extras);
  };

  if (!model) {
    return <div className="loading-model my-">Retrieving model...</div>;
  }

  return (
    <div className="customization-page">
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

      {step === 1 ? (
        <>
          <div className="p-2">
            <div className="row">
              <div className="col-6 text-left">
                <button
                  className="btn btn-warning"
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
                  //   onClick={addCustomizationRequest}
                >
                  Ask for Approval
                </button>
              </div>
            </div>

            {/* <model-viewer
          style={{
            height: "30rem",
            width: "100%",
            backgroundColor: "#17171A!important",
          }}
          src={product.arFile}
          ar
          alt="A 3D model of a furniture"
          camera-orbit="-90deg"
          auto-rotate=""
          camera-controls=""
          background-color="#455A64"
        ></model-viewer> */}
            <div id="obj" style={{ marginTop: "35px" }}></div>
            <div style={{ textAlign: "center", padding: "1rem" }}>
              <div id="selected-part"></div>
              {meshes && meshes.length != 0
                ? meshes.map((mesh, i) => (
                    <button
                      className="btn m-1"
                      style={{ backgroundColor: "#b3b3b3" }}
                      id={`${mesh}`}
                      key={mesh}
                      onClick={() => {
                        setPart(mesh);
                      }}
                    >
                      {`Mesh part ` + (i + 1)}
                    </button>
                  ))
                : null}
              <br />
            </div>
          </div>

          <div className="p-2 text-center">
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
            </div>
            <div className="mx-3">
              Select Custom Color from this input:{" "}
              <input
                type="color"
                className="choose-input-color"
                onChange={(e) => {
                  ChangeColors(e.target.value);
                }}
              />
            </div>

            <div style={{ textAlign: "center", padding: "1rem" }}>
              <button className="btn btn-primary m-2" onClick={download}>
                Proceed
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {step === 2 ? (
        <div className="m-50 text-center">
          <div style={{ fontSize: "16px" }}>
            Product Original Dimensions (in inches): {product.length} x{" "}
            {product.breadth} x {product.height}
          </div>
          <br />
          <br />
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>
            Customize product size
          </div>
          <div className="p-1 text-center">
            <h6>Enter your Dimensions (in inches)</h6>
            <input
              className="input-lg1-text"
              type="text"
              onChange={(event) => {
                changeSize("length", event.target.value);
              }}
              placeholder="Length"
            />
            <br />
            <input
              className="input-lg1-text"
              type="text"
              onChange={(event) => {
                changeSize("breadth", event.target.value);
              }}
              placeholder="Breadth"
            />
            <br />
            <input
              className="input-lg1-text"
              type="text"
              onChange={(event) => {
                changeSize("height", event.target.value);
              }}
              placeholder="Height"
            />
            <br />
          </div>

          <button className="btn btn-primary m-2" onClick={extraCustomization}>
            Proceed
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Customizer;
