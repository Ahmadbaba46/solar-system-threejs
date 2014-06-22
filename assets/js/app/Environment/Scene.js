define(function() {

    var Scene = {
        planets: [],
        astroids: [],
        tilt: 40,
        scene: null,
        camera: null,
        brightness: 1.5,
        zoom: {
            x: 0,
            y: -1050
        },

        setContainer: function() {
            Scene.container = document.getElementById('solar-system');

            // document.body.appendChild(Scene.container);
        },

        setScene: function() {
            Scene.scene = new THREE.Scene();
            // Scene.scene.add(new THREE.AxisHelper(5000));
        },

        setLights: function() {
            var directionalLightFromTop    = new THREE.DirectionalLight(0xffffff, Scene.brightness),
                directionalLightFromBottom = new THREE.DirectionalLight(0xffffff, Scene.brightness)
            ;

            directionalLightFromTop.position.set(0, 1500, 0);
            directionalLightFromBottom.position.set(0, -1500, 0);

            Scene.scene.add(directionalLightFromTop);
            Scene.scene.add(directionalLightFromBottom);
        },

        setCamera: function() {
            Scene.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 200000 * 10);
        },

        setCameraControls: function() {
            Scene.controls = new THREE.OrbitControls(Scene.camera);
            Scene.controls.addEventListener('change', render);
        },

        setRender: function() {
            Scene.renderer = new THREE.WebGLRenderer({ antialias: true });
            Scene.renderer.setSize(window.innerWidth, window.innerHeight);

            Scene.container.appendChild(Scene.renderer.domElement);
        },

        setStats: function() {
            Scene.stats = new Stats();
            // Scene.stats.domElement.style.position = 'absolute';
            // Scene.stats.domElement.style.top = '0px';

            // Scene.container.appendChild(Scene.stats.domElement);
        },

        setCameraPosition: function(target) {
            Scene.camera.focalPoint = target;

            Scene.camera.position.x = Scene.zoom.x;
            Scene.camera.position.y = Scene.zoom.y;
            Scene.camera.position.z = Scene.tilt;

            Scene.camera.lookAt(target);
        },

        init: function() {
            return $.Deferred(function(promise) {
                Scene.setContainer();
                Scene.setScene();
                Scene.setLights();
                Scene.setCamera();
                // Scene.setCameraControls();
                Scene.setRender();
                // Scene.setStats();
                // Scene.setCameraPosition(Scene.scene.position);

                promise.resolve();
            });
        }
    };

    return Scene;
});