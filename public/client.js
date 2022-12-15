import * as THREE from '/build/three.module.js';
import {GLTFLoader} from './jsm/loaders/GLTFLoader.js';
import {OrbitControls} from './jsm/controls/OrbitControls.js';
import {FontLoader} from './jsm/loaders/FontLoader.js';
import {TextGeometry} from './jsm/geometries/TextGeometry.js';




//console.log(GLTFLoader);
console.log(OrbitControls);
console.log(THREE);

let scene;
let camera;
let renderer;
let house; 
let model_container = document.querySelector('.web-gl');
let ambientLight;
let loader;
let loaderz;
let texture;
let controls;
let skyGeo;
let sky;
let textGeometry;
//var font = "Script MT Bold";
//let font;

//console.log("poop",model_container);

// Obtain API driven vars in reverse from GET params.
let zvars = (window.location.href).split('?')[(window.location.href).split('?').length-1].split("&");
console.log(zvars);




const init = () =>{
    scene = new THREE.Scene();
    // console.log(scene);

    const fov = 40;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1; 
    const far = 5000;  
    camera = new THREE.PerspectiveCamera( fov, aspect , near, far );
    
    camera.position.set( 0, 10, 75 );

    camera.lookAt( 0, 100, 0);
    scene.add(camera);
    console.log(camera);

    skyGeo = new THREE.SphereGeometry(100000, 25, 25); 
    loaderz  = new THREE.TextureLoader(),
    texture = loaderz.load( "./images/space.jpg" );

    var loadert = new FontLoader();
    
    var textMaterial = new THREE.MeshPhongMaterial( { color: 0x440000, specular: 0x050505, shininess: 100 }); 
    textMaterial.refractionRatio = 0.95;   
    
    console.log(loadert, "FontLoader");
   
/*     loadert.manager.onLoad = () => {console.log(this,"load")};
    loadert.manager.onError = () => {console.log(this,"error")};    
    loadert.manager.onProgress = () => {console.log(this,"progress b")};  
    loadert.manager.onStart = () => {console.log(this,"make start start")};      
    loadert.manager.onChange = (loadert) => {console.log(this,"changed")};    */
   

    loadert.load( './fonts/Script MT Bold_Regular.json', function (font){
        
        var _3dt = decodeURIComponent((zvars[0]).split("=")[1]);
        console.log(typeof _3dt,"76");

        if (typeof _3dt === "undefined") {
            _3dt = "Hello World";
        }
        if (_3dt === "undefined") {
            _3dt = "Hello World";
        }        
        if (typeof _3dt === null) {
            _3dt = "Hello World";
        }        
        
        textGeometry = new TextGeometry(_3dt , {
            font: font,
            size: 5,
            height: 1,
            curveSegments: 12,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            roughness: 0,
            transmission: 1,
            thickness: 2,  
            bevelEnabled: true
                
        });

      
        var mesht = new THREE.Mesh( textGeometry, textMaterial );
        
        scene.add( mesht );  
        mesht.position.set(30, 0, 0);
        
        let poz = new THREE.Vector3( 1290, 1, 0 );
        // mesht.position = poz;
        console.log("foop", mesht);
        

    });  // end loadert.load('',(){});

    renderer = new THREE.WebGLRenderer({
        antialias: true, 
        alpha: true,
        canvas: model_container
    });

    var material = new THREE.MeshPhongMaterial({ 
        map: texture,
    });

    sky = new THREE.Mesh(skyGeo, material);
    sky.material.side = THREE.BackSide;
    console.log(sky,"sky");
    scene.add(sky);


    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.autoClear = false;
    renderer.setClearColor(0x0000000, 0.0);

    console.log("renderer",renderer);

    ambientLight = new THREE.AmbientLight(0xfff3ff, 2);
    scene.add(ambientLight);

    loader = new GLTFLoader().setPath( './model/' );

    loader.load('borg4.glb', (logsolid)=>{
        logsolid.scene.name = "DS2";
        logsolid.scene.scale.set(7,7,7); // scale here
        logsolid.scene.position.setZ(0);
        logsolid.scene.position.setY(-25);
        console.log(logsolid.scene)
        scene.add( logsolid.scene );

    });

/*     const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    const points = [];
    points.push( new THREE.Vector3( - 10, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 10, 0 ) );
    points.push( new THREE.Vector3( 10, 0, 0 ) );

    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    const line = new THREE.Line( geometry, material );
    scene.add(line); */


    controls = new OrbitControls (camera, model_container);

    animate();
    
} // end init()

const render = ()=>{
    renderer.render(scene,camera);
}

function animate() {
    controls.update();
    requestAnimationFrame(animate);
    render();
}


window.onload = init;