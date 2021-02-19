import * as THREE from '/build/three.module.js';                 
import {OrbitControls} from '/jsm/controls/OrbitControls.js';

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera (75, window.innerWidth/window.innerHeight, 0.1, 10000);
scene.add(camera);
camera.position.set(-500,900,-1700);

var renderer = new THREE.WebGLRenderer ();
renderer.setSize (window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', ()=>{window.location.reload()});

var controls = new OrbitControls(camera, renderer.domElement);

//ADDING ALL THE CELESTRIAL BODIES
var geometry_s = new THREE.SphereGeometry(5000, 64,64);
var material_s = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('galaxy_starfield.png'), side: THREE.DoubleSide});
var starfield = new THREE.Mesh (geometry_s, material_s);
scene.add(starfield);

var sun_geom = new THREE.SphereGeometry (250, 32, 32);
var sun_mat = new THREE.MeshBasicMaterial ({map : new THREE.TextureLoader().load('sun_detailed.jpg'), side: THREE.DoubleSide});
var sun = new THREE.Mesh (sun_geom, sun_mat);
sun.position.set(0,0,0);
scene.add(sun);

var mercury_geom = new THREE.SphereGeometry (20, 32, 32);
var mercury_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('mercury_terrain.png'), side: THREE.DoubleSide, color: 0xaaaaaa,
shininess: 25});
var mercury = new THREE.Mesh (mercury_geom, mercury_mat);
mercury.position.set(400,0,0);
scene.add(mercury);

var venus_geom = new THREE.SphereGeometry (45, 32, 32);
var venus_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('venus_terrain.png'), side: THREE.DoubleSide, color: 0xaaaaaa,
shininess: 25});
var venus = new THREE.Mesh (venus_geom, venus_mat);
venus.position.set(600,0,0);
scene.add(venus);
                          
var earth_geom = new THREE.SphereGeometry (50, 32, 32);
var earth_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('earth_terrain_4k.jpg'), side: THREE.DoubleSide, color: 0xaaaaaa,
shininess: 25});
var earth = new THREE.Mesh (earth_geom, earth_mat);
earth.position.set(850,0,0);
scene.add(earth);

var geometry_m = new THREE.SphereGeometry (14 , 32 , 32);
var material_m = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('moon_4k.jpg'), side: THREE.FrontSide, color: 0xaaaaaa, shininess:25});
var moon = new THREE.Mesh(geometry_m, material_m);
moon.position.set(850,0,0);
earth.add(moon);

var mars_geom = new THREE.SphereGeometry (27, 32, 32);
var mars_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('mars_terrain.png'), side: THREE.DoubleSide, color: 0xaaaaaa,
shininess: 25});
var mars = new THREE.Mesh (mars_geom, mars_mat);
mars.position.set(1100,0,0);
scene.add(mars);

var jupiter_geom = new THREE.SphereGeometry (80, 32, 32);
var jupiter_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('jupiter_terrain.png'), side: THREE.DoubleSide, color: 0xaaaaaa,
shininess: 25});
var jupiter = new THREE.Mesh (jupiter_geom, jupiter_mat);
jupiter.position.set(1500,0,0);
scene.add(jupiter);

var saturn_geom = new THREE.SphereGeometry (72, 32, 32);
var saturn_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('saturn_terrain.png'), side: THREE.DoubleSide, color: 0xaaaaaa,
shininess: 25});
var saturn = new THREE.Mesh (saturn_geom, saturn_mat);
saturn.position.set(1750,0,0);
scene.add(saturn);

var uranus_geom = new THREE.SphereGeometry (62, 32, 32);
var uranus_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('uranus_terrain.png'), side: THREE.DoubleSide, color: 0xaaaaaa,
shininess: 25});
var uranus = new THREE.Mesh (uranus_geom, uranus_mat);
uranus.position.set(2000,0,0);
scene.add(uranus);

var neptune_geom = new THREE.SphereGeometry (57, 32, 32);
var neptune_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('neptune_terrain.png'), side: THREE.DoubleSide, color: 0xaaaaaa,
shininess: 25});
var neptune = new THREE.Mesh (neptune_geom, neptune_mat);
neptune.position.set(2300,0,0);
scene.add(neptune);

//SETTING LIGHT
const light = new THREE.AmbientLight( 0x404040 ); 
scene.add( light );

const light_p = new THREE.PointLight( 0xffffff, 6, 4000 );
light_p.position.set( 0, 0, 0 );
scene.add( light_p );

//MAKING ORBITS
var orbits = function(name, radius, delta){
    var theta =0;
    var diff = 2 * Math.PI / delta;
    var material_o = new THREE.MeshBasicMaterial ({color :0xaaaaaa, side: THREE.DoubleSide});
    var geometry_o = new THREE.RingGeometry(radius,radius+2,32);
    var orbit = new THREE.Mesh(geometry_o, material_o);
    orbit.rotation.x  = Math.PI/2;
    scene.add(orbit);
}
orbits(mercury, 400, 3000);
orbits(venus, 600, 3000);
orbits(earth, 850, 3000);
orbits(mars, 1100, 3000);
orbits(jupiter, 1500, 3000);
orbits(saturn, 1750, 3000);
orbits(uranus, 2000, 3000);
orbits(neptune, 2300, 3000);

//SATURN RINGS
var orbit_sat = function(sat, radius, cl, delta){
    var theta =0;
    var diff = 2 * Math.PI / delta;
    var material_o = new THREE.MeshBasicMaterial ({color : cl, side: THREE.DoubleSide});
    var geometry_o = new THREE.RingGeometry(sat,radius+2,32);
    var orbit = new THREE.Mesh(geometry_o, material_o);
    orbit.rotation.x  = Math.PI/4;
    saturn.add(orbit);
}
orbit_sat(75, 82,0xcd853f, 3000);
orbit_sat(82, 87,0x000000, 3000);
orbit_sat(87, 94,0xa0522d, 3000);

//ASTEROID FIELD
var orbitals = function(temp, radius, delta, str){
    var theta =0;
    var diff = 2 * Math.PI / delta;
    var material_o = new THREE.MeshBasicMaterial ({map: new THREE.TextureLoader().load(str), side: THREE.DoubleSide});
    var geometry_o = new THREE.RingGeometry(temp,radius+2,32);
    var orbit = new THREE.Mesh(geometry_o, material_o);
    orbit.rotation.x  = Math.PI/2;
    scene.add(orbit);
}
orbitals(1200, 1210, 3000, 'astroid_belt.PNG');
orbitals(1210, 1220, 3000, 'astroid_belt_1.PNG');
orbitals(1220, 1230, 3000, 'astroid_belt_2.PNG');
orbitals(1230, 1240, 3000, 'astroid_belt_1.PNG');
orbitals(1240, 1250, 3000, 'astroid_belt_3.PNG');
orbitals(1250, 1260, 3000, 'astroid_belt_1.PNG');
orbitals(1260, 1270, 3000, 'astroid_belt.PNG');
orbitals(1270, 1280, 3000, 'astroid_belt_3.PNG');
orbitals(1280, 1290, 3000, 'astroid_belt.PNG');
orbitals(1290, 1300, 3000, 'astroid_belt_2.PNG');
orbitals(1300, 1310, 3000, 'astroid_belt_3.PNG');
orbitals(1310, 1320, 3000, 'astroid_belt_1.PNG');

//REVOLUTION FUNCTIONS
var theta_mercury = 0;
var revolution_mercury = function(radius, delta, name){
    var diff = 3.18 * Math.PI/delta;
    name.position.x = radius * Math.cos(theta_mercury);
    name.position.z = radius * Math.sin(theta_mercury);
    
    theta_mercury+=diff;

}

var theta_venus = 0;
var revolution_venus = function(radius, delta, name){
    var diff = 2.4 * Math.PI/delta;
    name.position.x = radius * Math.cos(theta_venus);
    name.position.z = radius * Math.sin(theta_venus);
    
    theta_venus+=diff;

}

var theta_earth = 0;
var revolution_earth = function(radius, delta, name){
    var diff = 2 * Math.PI/delta;
    name.position.x = radius * Math.cos(theta_earth);
    name.position.z = radius * Math.sin(theta_earth);
    
    theta_earth+=diff;

}

var theta_moon = 0;
var revolution_moon = function(radius, delta, name){
    var mtheta = 2 * Math.PI/delta;
    name.position.x = radius * Math.cos(theta_earth) * 1.2;
    name.position.z = radius * Math.sin(theta_earth);
    
    theta_moon+=mtheta;

}

var theta_mars = 0;
var revolution_mars = function(radius, delta, name){
    var diff = 1.6 * Math.PI/delta;
    name.position.x = radius * Math.cos(theta_mars);
    name.position.z = radius * Math.sin(theta_mars);
    
    theta_mars+=diff;

}

var theta_jupiter = 0;
var revolution_jupiter = function(radius, delta, name){
    var diff = 0.9 * Math.PI/delta;
    name.position.x = radius * Math.cos(theta_jupiter);
    name.position.z = radius * Math.sin(theta_jupiter);
    
    theta_jupiter+=diff;

}

var theta_saturn = 0;
var revolution_saturn = function(radius, delta, name){
    var diff = 0.7 * Math.PI/delta;
    name.position.x = radius * Math.cos(theta_saturn);
    name.position.z = radius * Math.sin(theta_saturn);
    
    theta_saturn+=diff;

}

var theta_uranus = 0;
var revolution_uranus = function(radius, delta, name){
    var diff = 0.45 * Math.PI/delta;
    name.position.x = radius * Math.cos(theta_uranus);
    name.position.z = radius * Math.sin(theta_uranus);
    
    theta_uranus+=diff;

}

var theta_neptune = 0;
var revolution_neptune = function(radius, delta, name){
    var diff = 0.38 * Math.PI/delta;
    name.position.x = radius * Math.cos(theta_neptune);
    name.position.z = radius * Math.sin(theta_neptune);
    
    theta_neptune+=diff;

}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event){
    
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
}

window.addEventListener('click', onMouseMove, false);

var FollowPlanet = function(name){
    camera.position.x = name.position.x + 100;
    camera.position.y = name.position.y + 100;
    camera.position.z = name.position.z + 100;
    
    camera.lookAt(name.position);
}

var mercury_flag = 0;

document.addEventListener("keydown", function(event) {
    if(event.keyCode === 27){
        console.log('esc working');
        mercury_flag=0;
        
        document.getElementById('mercury_text').style.display = 'none';
                
   }
});

var venus_flag = 0;

document.addEventListener("keydown", function(event) {
    if(event.keyCode === 27){
        console.log('esc working');
        venus_flag=0;
        
        document.getElementById('venus_text').style.display = 'none';
                
   }
});

var earth_flag = 0;

document.addEventListener("keydown", function(event) {
    if(event.keyCode === 27){
        console.log('esc working');
        earth_flag=0;
        
        document.getElementById('earth_text').style.display = 'none';
                
   }
});

var mars_flag = 0;

document.addEventListener("keydown", function(event) {
    if(event.keyCode === 27){
        console.log('esc working');
        mars_flag=0;
        
        document.getElementById('mars_text').style.display = 'none';
                
   }
});

var jupiter_flag = 0;

document.addEventListener("keydown", function(event) {
    if(event.keyCode === 27){
        console.log('esc working');
        jupiter_flag=0;
        
        document.getElementById('jupiter_text').style.display = 'none';
                
   }
});

var saturn_flag = 0;

document.addEventListener("keydown", function(event) {
    if(event.keyCode === 27){
        console.log('esc working');
        saturn_flag=0;
        
        document.getElementById('saturn_text').style.display = 'none';
                
   }
});

var uranus_flag = 0;

document.addEventListener("keydown", function(event) {
    if(event.keyCode === 27){
        console.log('esc working');
        uranus_flag=0;
        
        document.getElementById('uranus_text').style.display = 'none';
                
   }
});

var neptune_flag = 0;

document.addEventListener("keydown", function(event) {
    if(event.keyCode === 27){
        console.log('esc working');
        neptune_flag=0;
        
        document.getElementById('neptune_text').style.display = 'none';
                
   }
});

function animate(){
    mercury.rotation.y += 0.01;
    revolution_mercury(400, 3000, mercury);
    venus.rotation.y += 0.01;
    revolution_venus(600, 3000, venus);
    earth.rotation.y += 0.01;
    revolution_earth(850, 3000, earth);
    revolution_moon(90, 1000, moon);
    mars.rotation.y += 0.01;
    revolution_mars(1100, 3000, mars);
    jupiter.rotation.y += 0.01;
    revolution_jupiter(1500, 3000, jupiter);
    saturn.rotation.y += 0.01;
    revolution_saturn(1750, 3000, saturn);
    uranus.rotation.y += 0.01;
    revolution_uranus(2000, 3000, uranus);
    neptune.rotation.y += 0.01;
    revolution_neptune(2300, 3000, neptune);

    raycaster.setFromCamera (mouse, camera);
    const intersects_mercury = raycaster.intersectObjects ([mercury]);
    if (intersects_mercury[0]){
        console.log(intersects_mercury[0].object.geometry.id);
        switch(intersects_mercury[0].object.geometry.id){
            case 6:{
                console.log('mercury flag');
                mercury_flag=1;
                
                break;
            }
            
            default:{
                
                mercury_flag=0;
                
                
            }


        }

    }
    const intersects_venus = raycaster.intersectObjects ([venus]);
    if (intersects_venus[0]){
        console.log(intersects_venus[0].object.geometry.id);
        switch(intersects_venus[0].object.geometry.id){
            case 6:{
                console.log('venus flag');
                venus_flag=1;
                
                break;
            }
            
            default:{
                
                venus_flag=0;
                
                
            }


        }

    }
    const intersects_earth = raycaster.intersectObjects ([earth]);
    if (intersects_earth[0]){
        console.log(intersects_earth[0].object.geometry.id);
        switch(intersects_earth[0].object.geometry.id){
            case 6:{
                console.log('earth flag');
                earth_flag=1;
                
                break;
            }
            
            default:{
                
                earth_flag=0;
                
                
            }


        }

    }
    const intersects_mars= raycaster.intersectObjects ([mars]);
    if (intersects_mars[0]){
        console.log(intersects_mars[0].object.geometry.id);
        switch(intersects_mars[0].object.geometry.id){
            case 6:{
                console.log('mars flag');
                mars_flag=1;
                
                break;
            }
            
            default:{
                
                mars_flag=0;
                
                
            }


        }

    }
    const intersects_jupiter = raycaster.intersectObjects ([jupiter]);
    if (intersects_jupiter[0]){
        console.log(intersects_jupiter[0].object.geometry.id);
        switch(intersects_jupiter[0].object.geometry.id){
            case 6:{
                console.log('jupiter flag');
                jupiter_flag=1;
                
                break;
            }
            
            default:{
                
                jupiter_flag=0;
                
                
            }


        }

    }
    const intersects_saturn = raycaster.intersectObjects ([saturn]);
    if (intersects_saturn[0]){
        console.log(intersects_saturn[0].object.geometry.id);
        switch(intersects_saturn[0].object.geometry.id){
            case 6:{
                console.log('saturn flag');
                saturn_flag=1;
                
                break;
            }
            
            default:{
                
                saturn_flag=0;
                
                
            }


        }

    }
    const intersects_uranus = raycaster.intersectObjects ([uranus]);
    if (intersects_uranus[0]){
        console.log(intersects_uranus[0].object.geometry.id);
        switch(intersects_uranus[0].object.geometry.id){
            case 6:{
                console.log('uranus flag');
                uranus_flag=1;
                
                break;
            }
            
            default:{
                
                uranus_flag=0;
                
                
            }


        }

    }
    const intersects_neptune = raycaster.intersectObjects ([neptune]);
    if (intersects_neptune[0]){
        console.log(intersects_neptune[0].object.geometry.id);
        switch(intersects_neptune[0].object.geometry.id){
            case 6:{
                console.log('neptune flag');
                neptune_flag=1;
                
                break;
            }
            
            default:{
                
                neptune_flag=0;
                
                
            }


        }

    }
    
    if (mercury_flag==1){
        FollowPlanet(mercury);
        document.getElementById('mercury_text').style.display = 'block'
        
    }
    else if (venus_flag==1){
        FollowPlanet(venus);
        document.getElementById('venus_text').style.display = 'block'
        
    }
    else if(earth_flag==1){
        FollowPlanet(earth);
        document.getElementById('earth_text').style.display = 'block'
    }
    else if (mars_flag==1){
        FollowPlanet(mars);
        document.getElementById('mars_text').style.display = 'block'
        
    }
    else if (jupiter_flag==1){
        FollowPlanet(jupiter);
        document.getElementById('jupiter_text').style.display = 'block'
        
    }
    else if (saturn_flag==1){
        FollowPlanet(saturn);
        document.getElementById('saturn_text').style.display = 'block'
        
    }
    else if (uranus_flag==1){
        FollowPlanet(uranus);
        document.getElementById('uranus_text').style.display = 'block'
        
    }
    else if (neptune_flag==1){
        FollowPlanet(neptune);
        document.getElementById('neptune_text').style.display = 'block'
        
    }
    else {
        controls.update();
    }

    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}
animate();