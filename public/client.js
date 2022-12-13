import * as THREE from '/build/three.module.js';
import {GLTFLoader} from './jsm/loaders/GLTFLoader.js';
import {OrbitControls} from './jsm/controls/OrbitControls.js';
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

//console.log("poop",model_container);

// Obtain API driven vars in reverse from GET params.
let zvars = (window.location.href).split('?')[(window.location.href).split('?').length-1].split("&");
console.log(zvars);

create_div_dynamic(zvars[0]);


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
    console.log(sky);
    scene.add(sky);


    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.autoClear = false;
    renderer.setClearColor(0x0000000, 0.0);

    console.log("shoop",renderer);

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

    /*const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    const points = [];
    points.push( new THREE.Vector3( - 10, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 10, 0 ) );
    points.push( new THREE.Vector3( 10, 0, 0 ) );

    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    const line = new THREE.Line( geometry, material );
    scene.add(line);
*/

    controls = new OrbitControls (camera, model_container);

    animate();
}

const render = ()=>{
    renderer.render(scene,camera);
}

function animate() {
    controls.update();
    requestAnimationFrame(animate);
    render();
}

function create_div_dynamic(theText){
    let dv = document.createElement('div'); // create dynamically div tag
    dv.setAttribute('id',"lyr1");       //give id to it
    dv.className="divFloat";                 // set the style classname
    //set the inner styling of the div tag
    dv.style.position="fixed";
    dv.style.pixelLeft=20;
    dv.style.pixelTop=100;
    dv.style.pixelWidth=10;
    dv.style.pixelHeight=20;
    dv.style.zIndex = -1;
    dv.style.backgroundColor="red";
    //set the html content inside the div tag
    dv.innerHTML='<br> '+theText+' <br>';
    
    //finally add the div to our body
    document.body.appendChild(dv);
}



window.onload = init;