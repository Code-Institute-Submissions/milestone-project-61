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
        //add widget to toggle between topovector and img basemap 
        var toggle = new BasemapToggle({
            //set detault to view/topovector 
            view: view,
            //set second basemap to satellite/img
            nextBasemap: "satellite"
        });
        view.ui.add(toggle, "bottom-left");
        //change zoom icon on popups
        $(".esri-icon-zoom-in-magnifying-glass").html('<ion-icon name="trail-sign-outline"></ion-icon>');
        $(".esri-popup__action-text").html("go to location");

        function ConstructMarker(long, lat, markerType, markerSize, popupTitle, popupImgURL){
            this.long = long
            this.lat = lat
            this.markerType = markerType
            this.markerSize = markerSize
            this.title = popupTitle
            this.imgURL = popupImgURL
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
                    width: `${markerObject.markerSize}px`,
                    height: `${markerObject.markerSize}px`, 
                    xoffset: 0,
                    yoffset: 30,
                },
                popupTemplate: {
                    title: `<img src='${markerObject.imgURL}' class="popupImg"><br><p class="roboto weight-reg">${markerObject.title}</p>`,
                } 
            })
            graphicsLayer.add(markerGraphic);
        }
        hqMarker = new ConstructMarker (-3.340692, 57.007759, "hq", 30, "Cairngorms Outdoors HQ, Invercauld Road, Braemar, AB35 5XR", "https://media.giphy.com/media/7uMpPzHsB6ojC/giphy.gif")
        campMarker1 = new ConstructMarker (-3.668879, 57.070710, "camp", 30, "Camp on the summit of Ben Macdui")
        campMarker2 = new ConstructMarker (-4.053160, 56.945606, "camp", 30, "Camp on the beach of Loch an T-Seilich")
        waterMarker1 = new ConstructMarker (-3.674994, 57.020003, "water", 30, "Paddle down the river Dee")
        waterMarker2 = new ConstructMarker (-4.043326, 56.989550, "water", 30, "Paddle down the wild River Tromie")
        waterMarker3 = new ConstructMarker (-4.248634, 56.927478, "water", 30, "Travel 14 miles along Loch Ericht by power boat")
        pickupMarker1 = new ConstructMarker (-3.615609, 56.977300, "van", 30, "Pickup Point: River Dee")
        pickupMarker2 = new ConstructMarker (-4.042070, 56.944850, "van", 30, "Pickup Point: Gaick Lodge")
        pickupMarker3 = new ConstructMarker (-4.248634, 56.927478, "van", 30, "Pickup Point: Loch Ericht")
        pickupMarkerWater1 = new ConstructMarker (-4.438109, 56.733385, "van", 30, "Pickup Point: Loch Ericht")

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