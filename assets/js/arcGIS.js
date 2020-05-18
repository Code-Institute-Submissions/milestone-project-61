let mapDays = 3; //take values 1, 2 or 3
let waterJourney = true //takes true/false value 
//load esri modules  
function loadMap(mapDays, waterJourney){
require(["esri/Map", "esri/WebScene","esri/views/SceneView","esri/widgets/BasemapToggle", "esri/widgets/BasemapGallery", "esri/Graphic", "esri/layers/GraphicsLayer", "esri/widgets/Sketch", "esri/symbols/PolygonSymbol3D","esri/symbols/ExtrudeSymbol3DLayer"],
    function(Map, WebScene, SceneView, BasemapToggle, BasemapGallery, Graphic, GraphicsLayer, Sketch, PolygonSymbol3D, ExtrudeSymbol3DLayer, HQgraphic){
        //mapinit
        var graphicsLayer = new GraphicsLayer({
            screenSizePerspectiveEnabled: true, //make points further away smaller, increase depth perception
        });
        var map = new Map({
            basemap: "topo-vector", //set default basemap to topographical 
            ground: "world-elevation", //use world elevation service for 3D ground modelling 
            layers: [graphicsLayer]
        }); 
        var view = new SceneView({
            container: "mapContainer", 
            map: map, 
            camera: {
                position: { 
                    x: -3.340692, //lon-E-
                    y: 56.777759,  //lat-N- 
                    z: 10000 // altitude in meters -aerial zoom-
                }, 
            tilt: 70  // perspective in degrees
            }
        });
        map.add(graphicsLayer);

        HQgraphic();
         //add icons depending on user input
        if (mapDays == 1){ 
            pickupGraphic1();
            if (waterJourney == true){
                waterGraphic1();
            }
        }
        else if(mapDays == 2){
            campGraphic1();
            pickupGraphic2();
            if (waterJourney == true){
                waterGraphic2();
            }
        }
        else {
            campGraphic1();
            campGraphic2();
            if (waterJourney == true) {
                pickupGraphicWater3();
                waterGraphic2();
                waterGraphic3();
            }
            else {
                pickupGraphic3();
            }
        }
        
        //Add marker over HQ
        function HQgraphic(){
            var hqMarker = new Graphic({
                geometry: {
                    type: "point",
                    longitude: -3.340692,
                    latitude: 57.007759
                },
                symbol: {
                    type: "picture-marker",
                    url: "assets/img/marker-img/marker-hq.png",
                    width: "30px",
                    height: "30px", 
                    xoffset: 0,
                    yoffset: 30,
                },
                popupTemplate: {
                    title: "Cairngorms Outdoors HQ",
                    content: "Invercauld Road, Braemar, Aberdeenshire, AB35 5XR",
                }
            });
            graphicsLayer.add(hqMarker);
        }
        function campGraphic1(){
            var campGraphic = new Graphic({
                geometry: {
                    type: "point",
                    longitude: -3.668879,
                    latitude: 57.070710
                },
                symbol: {
                    type: "picture-marker",
                    url: "assets/img/marker-img/marker-camp.png",
                    width: "30px", //max 200px for sceneView
                    height: "30px", 
                    xoffset: 0,
                    yoffset: 30,
                },
                popupTemplate: {
                    title: "Camp on the summit of Ben Macdui",
                    content: "The highest peak in the Cairngorms",
                } 
            })
            graphicsLayer.add(campGraphic);
        }
        function campGraphic2(){
            var campGraphic = new Graphic({
                geometry: {
                    type: "point",
                    longitude: -4.053160,
                    latitude: 56.945606
                },
                symbol: {
                    type: "picture-marker",
                    url: "assets/img/marker-img/marker-camp.png",
                    width: "30px", //max 200px for sceneView
                    height: "30px", 
                    xoffset: 0,
                    yoffset: 30,
                },
                popupTemplate: {
                    title: "Camp on the beach of Loch an T-Seilich",
                    content: "",
                } 
            })
            graphicsLayer.add(campGraphic);
        }
        function waterGraphic1(){
            var waterGraphic = new Graphic({
                geometry: {
                    type: "point",
                    longitude: -3.674994,
                    latitude: 57.020003
                },
                symbol: {
                    type: "picture-marker",
                    url: "assets/img/marker-img/marker-water.png",
                    width: "30px",
                    height: "30px", 
                    xoffset: 0,
                    yoffset: 30,
                },
                popupTemplate: {
                    title: "Paddle down the river Dee",
                    content: "Take in this awesome landscape as the water carries you to your pickup point",
                } 
            })
            graphicsLayer.add(waterGraphic);
        }
        function waterGraphic2(){
        //56.989550, -4.043326
           var waterGraphic = new Graphic({
                geometry: {
                    type: "point",
                    longitude: -4.043326,
                    latitude: 56.989550
                },
                symbol: {
                    type: "picture-marker",
                    url: "assets/img/marker-img/marker-water.png",
                    width: "30px",
                    height: "30px", 
                    xoffset: 0,
                    yoffset: 30,
                },
                popupTemplate: {
                    title: "Paddle down the River Tromie",
                    content: "Take in this awesome landscape as the water carries towards Gaick Lodge",
                } 
            })
            graphicsLayer.add(waterGraphic);
        }
        function waterGraphic3(){
            var waterGraphic = new Graphic({
                geometry: {
                    type: "point",
                    longitude: -4.248634,
                    latitude: 56.927478
                },
                symbol: {
                    type: "picture-marker",
                    url: "assets/img/marker-img/marker-water.png",
                    width: "30px",
                    height: "30px", 
                    xoffset: 0,
                    yoffset: 30,
                },
                popupTemplate: {
                    title: "Travel 14 miles along Loch Ericht by boat",
                    content: "Arrive at your pickup point in style!",
                } 
            })
            graphicsLayer.add(waterGraphic);
        }
        function pickupGraphic1(){ 
            var pickupGraphic = new Graphic({
                geometry: {
                    type: "point",
                    longitude: -3.615609,
                    latitude: 56.977300,
                },
                symbol: {
                    type: "picture-marker",
                    url: "assets/img/marker-img/marker-van.png",
                    width: "30px", 
                    height: "30px", 
                    xoffset: 0,
                    yoffset: 30,
                },
                popupTemplate: {
                    title: "Pickup Point",
                    content: "Drive the scenic route back to HQ",
                } 
            })
            graphicsLayer.add(pickupGraphic);
        }
        function pickupGraphic2(){
            var pickupGraphic = new Graphic({
                geometry: {
                    type: "point",
                    longitude: -4.042070, 
                    latitude: 56.944850
                },
                symbol: {
                    type: "picture-marker",
                    url: "assets/img/marker-img/marker-van.png",
                    width: "30px", 
                    height: "30px", 
                    xoffset: 0,
                    yoffset: 30,
                },
                popupTemplate: {
                    title: "Pickup Point: Gaick Lodge",
                    content: "Drive the scenic route back to HQ",
                } 
            })
            graphicsLayer.add(pickupGraphic);
        }
        function pickupGraphic3(){
              var pickupGraphic = new Graphic({
                geometry: {
                    type: "point",
                    longitude: -4.248634,
                    latitude: 56.927478
                },
                symbol: {
                    type: "picture-marker",
                    url: "assets/img/marker-img/marker-van.png",
                    width: "30px", 
                    height: "30px", 
                    xoffset: 0,
                    yoffset: 30,
                },
                popupTemplate: {
                    title: "Pickup Point: Loch Ericht",
                    content: "Drive the scenic route back to HQ",
                } 
            })
            graphicsLayer.add(pickupGraphic);
        }      
        function pickupGraphicWater2(){
              var pickupGraphic = new Graphic({
                geometry: {
                    type: "point",
                    longitude: -4.438109,
                    latitude: 56.733385
                },
                symbol: {
                    type: "picture-marker",
                    url: "assets/img/marker-img/marker-van.png",
                    width: "30px", 
                    height: "30px", 
                    xoffset: 0,
                    yoffset: 30,
                },
                popupTemplate: {
                    title: "Pickup Point",
                    content: "Switch over from boat to landrover and drive the scenic route back to HQ",
                } 
            })
            graphicsLayer.add(pickupGraphic);
        }
        function pickupGraphicWater3(){
              var pickupGraphic = new Graphic({
                geometry: {
                    type: "point",
                    longitude: -4.438109,
                    latitude: 56.733385
                },
                symbol: {
                    type: "picture-marker",
                    url: "assets/img/marker-img/marker-van.png",
                    width: "30px", 
                    height: "30px", 
                    xoffset: 0,
                    yoffset: 30,
                },
                popupTemplate: {
                    title: "Pickup Point",
                    content: "Switch over from boat to landrover and drive the scenic route back to HQ",
                } 
            })
            graphicsLayer.add(pickupGraphic);
        }

    }
);
}

loadMap(mapDays, waterJourney);