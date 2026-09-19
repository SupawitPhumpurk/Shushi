<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3D Model Viewer - Three.js</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #1a1a1a;
    }
    #canvas-container {
      width: 100vw;
      height: 100vh;
    }
    #loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-family: sans-serif;
      font-size: 18px;
      pointer-events: none;
    }
  </style>
  
  <!-- นำเข้า Import Map สำหรับจัดการ Three.js โมดูล -->
  <script type="importmap">
    {
      "imports": {
        "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
        "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
      }
    }
  </script>
</head>
<body>

  <div id="loading">กำลังโหลดโมเดล 3D...</div>
  <div id="canvas-container"></div>

  <script type="module">
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

    // 1. สร้าง Scene, Camera และ Renderer
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222); // สีพื้นหลัง

    const camera = new THREE.PerspectiveCamera(
      45, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 2, 5); // ตำแหน่งเริ่มต้นของกล้อง

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 2. เพิ่มการควบคุมกล้องด้วยเมาส์ (OrbitControls)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // 3. เพิ่มแสงสว่างให้กับฉาก
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // แสงรอบทิศทาง
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // แสงอาทิตย์/แสงส่องสว่าง
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // 4. โหลดไฟล์โมเดล Shushi.glb
    const loader = new GLTFLoader();
    const loadingEl = document.getElementById('loading');

    loader.load(
      'Shushi.glb', // ชื่อไฟล์ GLB ใน Repository
      (gltf) => {
        const model = gltf.scene;
        
        // จัดการให้โมเดลอยู่กึ่งกลาง
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        scene.add(model);
        
        // ซ่อนข้อความ Loading เมื่อโหลดเสร็จ
        loadingEl.style.display = 'none';
      },
      (xhr) => {
        // แสดงความคืบหน้าการโหลด (%)
        if (xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          loadingEl.innerText = `กำลังโหลดโมเดล 3D... ${percent}%`;
        }
      },
      (error) => {
        console.error('เกิดข้อผิดพลาดในการโหลดโมเดล:', error);
        loadingEl.innerText = 'ไม่สามารถโหลดโมเดล 3D ได้';
      }
    );

    // 5. ปรับขนาดการแสดงผลเมื่อย่อ/ขยายหน้าจอ
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 6. Loop การเรนเดอร์ภาพ
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  </script>

</body>
</html>
