let rains = [];
let snows = [];
renderer();

//rain snow sun wind sounds

function renderer(){
    let width = window.innerWidth;
    let height = window.innerHeight;
    var weatherApi = "http://api.openweathermap.org/data/2.5/forecast?id=2756071&APPID=4a772742d3124f8737d890a2284b0cad&units=metric";
    $.getJSON( weatherApi , function ( result ){
        //var icon = result.list[0].weather[0].icon;
        var icon = "01d";
        console.log("renderer result" + icon);

        if ( icon == "01d" || icon == "01n" ){ //clearsky
            clearsunobj();
            console.log("succes if statement");
            bgclear();
            if (icon == "01n") {
                $("html").css({"filter": "brightness(0.5)"});
            }
        }

        if (icon == "10d" || icon == "10n"){ //rain
            raincloudsobj();
            sunobj();
            bgclear();
            drawRains();
            if (icon == "10n"){
                $("html").css({"filter": "brightness(0.5)", "background": "linear-gradient(#202e44,#535353)"});
            }
        }   
        if (icon == "09d" || icon == "09n"){ //showerrain
            darkcloudsobj();
            bgdark();
            drawRains();
            if (icon == "09n"){
                $("html").css({"filter": "brightness(0.5)", "background": "linear-gradient(#202e44,#535353)"});
            }
        }
        if (icon == "02d" || icon == "02n"){ //fewclouds
            lightcloudsobj();
            sunobj();
            bgclear();
            if (icon == "02n"){
                $("html").css({"filter": "brightness(0.5)", "background": "linear-gradient(#202e44,#535353)"});
            }
        }
        if (icon == "03d" || icon == "03n"){ //scatteredclouds
            lightcloudsobj();
            bgclear();
            if (icon == "03n"){
                $("html").css({"filter": "brightness(0.5)", "background": "linear-gradient(#202e44,#535353)"});
            }
        }
        if (icon == "04d" || icon == "04n"){//brokenclouds
            darkcloudsobj();
            bgdark();
            if (icon == "04n"){
                $("html").css({"filter": "brightness(0.5)", "background": "linear-gradient(#202e44,#535353)"});
            }
        }
        if (icon == "11d" || icon == "11n"){  //thunderstorm  
            thunderobj();
            thunderdynamic();
            darkcloudsobj();
            bgdark();
            if (icon == "11n"){
                $("html").css({"filter": "brightness(0.5)", "background": "linear-gradient(#202e44,#535353)"});
            }
        }
        if (icon == "13d" || icon == "13n"){ //snow
            bgsnow();
            raincloudsobj();
            drawSnows();
            if (icon == "13n"){
                $("html").css({"filter": "brightness(0.5)", "background": "linear-gradient(#202e44,#535353)"});
            }
        }
        if (icon == "50d" || icon == "50n"){ //mist
            miststrokes();
            bgmist();
            lightcloudsobj();
            if (icon == "50n"){
                $("html").css({"filter": "brightness(0.5)", "background": "linear-gradient(#202e44,#535353)"});
            }
        }
    });

    var renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setClearColor(0xff0000, 0); //transparant
    renderer.setPixelRatio(2);
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    animate();

    var scene = new THREE.Scene();

    var alight = new THREE.AmbientLight(0x808080);
    scene.add( alight );
    //scene.fog = new THREE.Fog(0xfcfcfc, 0.3, 16);
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.z = 1;
    directionalLight.position.y = 0.2;
    scene.add( directionalLight );

    var pcamera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
    
    pcamera.position.z = 5;
    scene.add( pcamera );

    function bgclear(){
        var textureLoader = THREE.ImageUtils.crossOrigin = '';
        planeTexture =  THREE.ImageUtils.loadTexture('bgclear.png');
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(65,45,200), new THREE.MeshBasicMaterial({map:planeTexture})
        );
        scene.add(plane);
        plane.position.z = -10;
    } 

    function bgdark(){
        var textureLoader = THREE.ImageUtils.crossOrigin = '';
        planeTexture =  THREE.ImageUtils.loadTexture('bgdark.png');
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(65,45,200), new THREE.MeshBasicMaterial({map:planeTexture})
        );
        scene.add(plane);
        plane.position.z = -10;
    }

    function bgsnow(){
        var textureLoader = THREE.ImageUtils.crossOrigin = '';
        planeTexture =  THREE.ImageUtils.loadTexture('bgsnow.png');
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(65,45,200), new THREE.MeshBasicMaterial({map:planeTexture})
        );
        scene.add(plane);
        plane.position.z = -10;
    }

    function bgmist(){
        var textureLoader = THREE.ImageUtils.crossOrigin = '';
        planeTexture =  THREE.ImageUtils.loadTexture('bgmist.png');
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(65,45,200), new THREE.MeshBasicMaterial({map:planeTexture})
        );
        scene.add(plane);
        plane.position.z = -10;
    }  

    function clearsunobj(){
        var sunclear = new THREE.SphereGeometry(1.3, 18, 20);
        var sunclearmaterial = new THREE.MeshLambertMaterial( { color: 0xf4b942 } );
        var sunclearcenter = new THREE.Mesh( sunclear, sunclearmaterial );
        scene.add( sunclearcenter );
        sunclearcenter.position.x=0;
        sunclearcenter.position.y=0.2;
        sunclearcenter.position.z=-1;

        var sunlight = new THREE.DirectionalLight( 0xf4b942, 0.9 );
        sunlight.position.x = 0;
        sunlight.position.y = -1;
        sunlight.position.z = 0.2;
        scene.add( sunlight );
    }

    function sunobj(){
        var sunmaterial = new THREE.MeshLambertMaterial( { color: 0xf4b942 } );
        var sun1 = new THREE.SphereGeometry( 1.3, 18, 20 );
        var sun = new THREE.Mesh( sun1, sunmaterial );
        sun.position.x=2.8;
        sun.position.y=2.2;
        sun.position.z=-2;
        scene.add( sun );
        var sunlight = new THREE.DirectionalLight( 0xf4b942, 0.2 );
        sunlight.position.x = 0;
        sunlight.position.y = -1;
        sunlight.position.z = 0.2;
        scene.add( sunlight );
    }

    function thunderobj(){
        var geometry = new THREE.BoxGeometry( 0.7, 2, 0.2 );
        var tmaterial = new THREE.MeshLambertMaterial( { color: 0xaaaaa44} );
        var thunder1= new THREE.Mesh( geometry, tmaterial );
        scene.add( thunder1 );
        thunder1.rotation.y = 0.2;
        thunder1.rotation.z = -0.2;
        thunder1.position.x = 0.6;
        thunder1.position.y = -0.3;
        var geometry = new THREE.BoxGeometry( 0.7, 1, 0.2 );
        var thunder2= new THREE.Mesh( geometry, tmaterial );
        scene.add( thunder2 );
        thunder2.rotation.y = 0.2;
        thunder2.rotation.z = 0.2;
        thunder2.position.x = 0.5;
        thunder2.position.y = -1.6;
    }

    function thunderdynamic(){
        var time = Math.floor((Math.random() * 10000) + 9000);
        var delay = 80;                   
        var lightingTimer = setInterval(lightning, time);
        var lightingTimer = setInterval(clightning, time+delay);

            function lightning() {
                $("html").css({"filter": "brightness(2.0)"});
                var newtime = Math.floor((Math.random() *10000) + 2000);  
                time = newtime;
             }
            function clightning() {
                $("html").css({"filter": "brightness(1.0)"})
                var audio = new Audio('sound/thunder.mp3');
                audio.play();
            }
    }

    function darkcloudsobj(){
        var cmaterial = new THREE.MeshLambertMaterial( { color: 0x4f5560} )
        var cloud1 = new THREE.BoxGeometry(1,1,1);
        var cube1 = new THREE.Mesh( cloud1, cmaterial);
        cube1.rotation.x += 1;
        cube1.rotation.y += 5;
        cube1.rotation.z += 3;
        cube1.position.x = -1.7
        cube1.position.y = 1;
        scene.add( cube1 );

        var geometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5 );
        var cube2 = new THREE.Mesh( geometry, cmaterial );
        scene.add( cube2 );
        cube2.rotation.x += 2;
        cube2.rotation.y += 2;
        cube2.rotation.z += 2;
        cube2.position.x = -0.7;
        cube2.position.y = 0.9;

        var geometry = new THREE.BoxGeometry( 1.1, 1.1, 1.1 );
        var cube3 = new THREE.Mesh( geometry, cmaterial );
        scene.add( cube3 );
        cube3.rotation.x += 1;
        cube3.rotation.y += 1.3;
        cube3.rotation.z += -1.8;
        cube3.position.x = 0.3;
        cube3.position.y = 1;
        cube3.position.z = 0.25;

        var geometry = new THREE.BoxGeometry( 1.3, 1.3, 1.3 );
        var cube4 = new THREE.Mesh( geometry, cmaterial );
        scene.add( cube4 );
        cube4.rotation.x += 1.3;
        cube4.rotation.y += 0.4;
        cube4.rotation.z += -2.4;
        cube4.position.x = 1;
        cube4.position.y = 1.1;

        var geometry = new THREE.BoxGeometry( 0.8, 0.8, 0.8 );
        var cube5 = new THREE.Mesh( geometry, cmaterial );
        scene.add( cube5 );

        cube5.rotation.x += 0.5;
        cube5.rotation.y += 0.9;
        cube5.rotation.z += -1;
        cube5.position.x = 1.8;
        cube5.position.y = 0.8;
    }

    function lightcloudsobj(){ 
        var cmaterial = new THREE.MeshLambertMaterial( { color:0xe1e3e8 } );
        var cloud1 = new THREE.BoxGeometry(1,1,1);
        var cube1 = new THREE.Mesh( cloud1, cmaterial);
        cube1.rotation.x += 1;
        cube1.rotation.y += 5;
        cube1.rotation.z += 3;
        cube1.position.x = -1.7
        cube1.position.y = 1;
        scene.add( cube1 );

        var geometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5 );
        var cube2 = new THREE.Mesh( geometry, cmaterial );
        scene.add( cube2 );
        cube2.rotation.x += 2;
        cube2.rotation.y += 2;
        cube2.rotation.z += 2;
        cube2.position.x = -0.7;
        cube2.position.y = 0.9;

        var geometry = new THREE.BoxGeometry( 1.1, 1.1, 1.1 );
        var cube3 = new THREE.Mesh( geometry, cmaterial );
        scene.add( cube3 );
        cube3.rotation.x += 1;
        cube3.rotation.y += 1.3;
        cube3.rotation.z += -1.8;
        cube3.position.x = 0.3;
        cube3.position.y = 1;
        cube3.position.z = 0.25;

        var geometry = new THREE.BoxGeometry( 1.3, 1.3, 1.3 );
        var cube4 = new THREE.Mesh( geometry, cmaterial );
        scene.add( cube4 );
        cube4.rotation.x += 1.3;
        cube4.rotation.y += 0.4;
        cube4.rotation.z += -2.4;
        cube4.position.x = 1;
        cube4.position.y = 1.1;

        var geometry = new THREE.BoxGeometry( 0.8, 0.8, 0.8 );
        var cube5 = new THREE.Mesh( geometry, cmaterial );
        scene.add( cube5 );

        cube5.rotation.x += 0.5;
        cube5.rotation.y += 0.9;
        cube5.rotation.z += -1;
        cube5.position.x = 1.8;
        cube5.position.y = 0.8;
    }

    function raincloudsobj(){
        var cmaterial = new THREE.MeshLambertMaterial( { color: 0x949ba8 } );
        var cloud1 = new THREE.BoxGeometry(1,1,1);
        var cube1 = new THREE.Mesh( cloud1, cmaterial);
        cube1.rotation.x += 1;
        cube1.rotation.y += 5;
        cube1.rotation.z += 3;
        cube1.position.x = -1.7
        cube1.position.y = 1;
        scene.add( cube1 );

        var geometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5 );
        var cube2 = new THREE.Mesh( geometry, cmaterial );
        scene.add( cube2 );
        cube2.rotation.x += 2;
        cube2.rotation.y += 2;
        cube2.rotation.z += 2;
        cube2.position.x = -0.7;
        cube2.position.y = 0.9;

        var geometry = new THREE.BoxGeometry( 1.1, 1.1, 1.1 );
        var cube3 = new THREE.Mesh( geometry, cmaterial );
        scene.add( cube3 );
        cube3.rotation.x += 1;
        cube3.rotation.y += 1.3;
        cube3.rotation.z += -1.8;
        cube3.position.x = 0.3;
        cube3.position.y = 1;
        cube3.position.z = 0.25;

        var geometry = new THREE.BoxGeometry( 1.3, 1.3, 1.3 );
        var cube4 = new THREE.Mesh( geometry, cmaterial );
        scene.add( cube4 );
        cube4.rotation.x += 1.3;
        cube4.rotation.y += 0.4;
        cube4.rotation.z += -2.4;
        cube4.position.x = 1;
        cube4.position.y = 1.1;

        var geometry = new THREE.BoxGeometry( 0.8, 0.8, 0.8 );
        var cube5 = new THREE.Mesh( geometry, cmaterial );
        scene.add( cube5 );

        cube5.rotation.x += 0.5;
        cube5.rotation.y += 0.9;
        cube5.rotation.z += -1;
        cube5.position.x = 1.8;
        cube5.position.y = 0.8;
    }

    function miststrokes(){
        var geometry = new THREE.BoxGeometry( 5, 0.07, 0.07 );
                var material = new THREE.MeshLambertMaterial( { color: 0x9f9f9f});
                var stroke = new THREE.Mesh( geometry, material );
                scene.add( stroke );

                stroke.rotation.x = 1;
                stroke.position.x = 0;
                stroke.position.y = 1.1;
                stroke.position.z = 0.7;

                var geometry = new THREE.BoxGeometry( 5, 0.07, 0.07 );
                var material = new THREE.MeshLambertMaterial( { color: 0x9f9f9f});
                var stroke1 = new THREE.Mesh( geometry, material );
                scene.add( stroke1 );

                stroke1.rotation.x = 1;
                stroke1.position.x = 0;
                stroke1.position.y = 0.5;
                stroke1.position.z = 0.7;
    }

    function drawRains() {
        const rainGeometry = new THREE.BoxGeometry( 0.06, 0.4, 0.06 ); 
        const rainMaterial = new THREE.MeshLambertMaterial( { color: 0xfcfcfc } ); 
        const numOfLines = 5; 
        const rainsInLine =4; 
        for(let line = 0; line < numOfLines; line++) { 
            for(let i = 0; i < rainsInLine; i++) {
                const rain = new THREE.Mesh(rainGeometry, rainMaterial); 
                const randomW = Math.random(-12, 12) - i/10 ; 
                const randomH = Math.random() - line *0.9; 
                const randomZ = Math.random(-1.5 , -0.1); 
                rain.rotation.set(0, Math.random(-1,1), 0); 
                rain.position.set(randomW, randomH, randomZ); 
                scene.add(rain); 

                            rain.origX = rain.position.x; 
                            rain.origY = rain.position.y; 
                            rains.push(rain); 
                        }
                    }

    }

    function drawSnows() {
                    const snowGeometry = new THREE.SphereGeometry( 0.06 ,5 , 4 );

                    const snowMaterial = new THREE.MeshLambertMaterial( { color: 0xfcfcfc } );

                    const numOfLines = 5;
                    const snowsInLine = 8;

                    


                    for(let line = 0; line < numOfLines; line++) {
                        for(let i = 0; i < snowsInLine; i++) {

                            const snow = new THREE.Mesh(snowGeometry, snowMaterial);

                            const randomW = Math.random(-12, 12) - i/10 ;
                            const randomH = Math.random() - line *0.9;
                            const randomZ = Math.random(-1.5 , -0.1);
                            snow.rotation.set(0, Math.random(-10,10), 0);
                            snow.position.set(randomW, randomH, randomZ);
                            scene.add(snow);

                            snow.origX = snow.position.x;
                            snow.origY = snow.position.y;
                            snows.push(snow);
                        }
                    }
                }


    function animate(){
        requestAnimationFrame(animate);
        render();
    }

    window.addEventListener('resize', onResize);
    function onResize(){
        var width = window.innerWidth;
        var height = window.innerHeight;
        pcamera.aspect = width / height;
        pcamera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    function render(){
        for(let s = 0, sl = rains.length; s < sl; s++) {
                        const rain = rains[s]; 
                        if (rain.position.y > -3.5) { 
                            rain.origY -= 0.15; 
                            rain.position.y -= 0.15; 
                        } else { 
                            rain.origY = Math.random(-1, -0.7);
                            rain.origX = Math.random(-12,12) -s/10 + 0.7;
                            rain.position.y = rain.origY;
                            rain.position.x = rain.origX;
                        }
                    }

        for(let s = 0, sl = snows.length; s < sl; s++) {
                        const snow = snows[s];
                        if (snow.position.y > -5) {
                            snow.origY -= Math.random(0.09,0.03)/10;
                            //snow.position.y -= Math.random(0.009,0.03)/40;
                            snow.position.x -= Math.sin(snow.position.y)*0.01;
                            snow.position.y -= Math.cos(snow.position.x)*0.015+0.016;
                        } else {
                            snow.origY = Math.random(-1, -0.7);
                            snow.origX = Math.random(-8,8) -s/15 + 1;
                            snow.position.y = snow.origY;
                            snow.position.x = snow.origX;                           
                        }
                    }
        renderer.render(scene, pcamera);
    }

    $(document).on('mousemove', function(e){
        
                    var xPos = e.clientX-(innerWidth/2);
                    var yPos = e.clientY-(innerHeight/2);
                    pcamera.position.x =  + (xPos / 2800 );
                    pcamera.position.y =  - (yPos / 4800 );
                    pcamera.rotation.y = + (xPos / 10000);
                });
}

