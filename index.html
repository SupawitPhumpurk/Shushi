<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Model - Shushi</title>
    <style>
        body { 
            margin: 0; 
            overflow: hidden; 
            background-color: #1a1a1a; 
        }
        canvas { 
            display: block; 
            width: 100vw; 
            height: 100vh; 
        }
    </style>
</head>
<body>

    <!-- Core Three.js & Loaders -->
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/DRACOLoader.js"></script>

    <script>
        // 1. Setup Scene & Camera
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a1a);

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        
        // แก้สีเพี้ยน
        renderer.outputEncoding = THREE.sRGBEncoding;

        document.body.appendChild(renderer.domElement);

        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // แสงสว่าง
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(0, 10, 10);
        scene.add(directionalLight);

        // 3. โหลดโมเดล Shushi.glb
        const loader = new THREE.GLTFLoader();
        const dracoLoader = new THREE.DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
        loader.setDRACOLoader(dracoLoader);

        loader.load('https://supawitphumpurk.github.io/Shushi/Shushi.glb', (gltf) => {
            const model = gltf.scene;

            // --- [หมุนโมเดลไปทางซ้าย 90 องศา] ---
            model.rotation.y = -Math.PI / 2;

            // คำนวณขนาดและจุดศูนย์กลางหลังจากหมุน
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            // จัดกึ่งกลางโมเดล
            model.position.sub(center);

            // คำนวณระยะถอยกล้องให้พอดีหน้าจอ
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / (2 * Math.tan(fov / 2)));
            cameraZ *= 1.35; // เผื่อระยะขอบ

            // ตั้งตำแหน่งกล้องตรงหน้า
            camera.position.set(0, 0, cameraZ);
            controls.target.set(0, 0, 0);
            controls.update();

            scene.add(model);
        }, undefined, (error) => {
            console.error('เกิดข้อผิดพลาดในการโหลดโมเดล:', error);
        });

        // 4. Loop Render
        function animate() {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();

        // ปรับขนาดอัตโนมัติเมื่อย่อ/ขยายหน้าจอ
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    </script>
</body>
</html>
