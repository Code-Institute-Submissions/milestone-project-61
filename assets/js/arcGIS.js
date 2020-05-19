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

        function ConstructMarker(long, lat, markerType, popupTitle, popupContent, popupImg){
            this.long = long
            this.lat = lat
            this.markerType = markerType
            this.title = popupTitle
            this.content = popupContent 
            this.img = popupImg
        }	
        function addMarker(markerObject){
            var markerGraphic = new Graphic({
                geometry: {
                    type: "point",
                    longitude: markerObject.long,
                    latitude: markerObject.lat
                },
                symbol: {
                    type: "picture-marker",
                    url: `assets/img/marker-img/marker-${markerObject.markerType}.png`,
                    width: "30px",
                    height: "30px", 
                    xoffset: 0,
                    yoffset: 30,
                },
                popupTemplate: {
                    title: markerObject.title,
                    content: markerObject.content,
                } 
            })
            graphicsLayer.add(markerGraphic);
        }
        hqMarker = new ConstructMarker (-3.340692, 57.007759, "hq", "Cairngorms Outdoors HQ", "Invercauld Road, Braemar, Aberdeenshire, AB35 5XR")
        campMarker1 = new ConstructMarker (-3.668879, 57.070710, "camp", "Camp on the summit of Ben Macdui", "The highest peak in the Cairngorms")
        campMarker2 = new ConstructMarker (-4.053160, 56.945606, "camp", "Camp on the beach of Loch an T-Seilich", "..")
        waterMarker1 = new ConstructMarker (-3.674994, 57.020003, "water", "Paddle down the river Dee", "Take in this awesome landscape as the water carries you to your pickup point")
        waterMarker2 = new ConstructMarker (-4.043326, 56.989550, "water", "Paddle down the wild River Tromie", "Take in this awesome landscape as the water carries towards Gaick Lodge")
        waterMarker3 = new ConstructMarker (-4.248634, 56.927478, "water", "Travel 14 miles along Loch Ericht by power boat", "Arrive at your pickup point in style!")
        pickupMarker1 = new ConstructMarker (-3.615609, 56.977300, "van", "Pickup Point: River Dee", "Drive the scenic route back to HQ")
        pickupMarker2 = new ConstructMarker (-4.042070, 56.944850, "van", "Pickup Point: Gaick Lodge", "Drive the scenic route back to HQ")
        pickupMarker3 = new ConstructMarker (-4.248634, 56.927478, "van", "Pickup Point: Loch Ericht", "Drive the scenic route back to HQ")
        pickupMarkerWater1 = new ConstructMarker (-4.438109, 56.733385, "van", "Pickup Point: Loch Ericht", "Switch over from boat to landrover and drive the scenic route back to HQ")

        addMarker(hqMarker);

        if (mapDays == 1){ 
            addMarker(pickupMarker1);
            if (waterJourney == true){
                   addMarker(waterMarker1);
            }
        }
        else if(mapDays == 2){
            addMarker(campMarker1);
            addMarker(pickupMarker2);
            if (waterJourney == true){
                addMarker(waterMarker2);
            }
        }
        else {
            addMarker(campMarker1);
              addMarker(campMarker2);
            if (waterJourney == true) {
                addMarker(pickupMarkerWater1);
                addMarker(waterMarker2); 
                addMarker(waterMarker3); 
            }
            else {
                addMarker(pickupMarker3);
            }
        } 
    }
);
}

loadMap(mapDays, waterJourney);