function loadMap(mapClientType, mapGroupType, mapDays, mapWater,){
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
                    x: -3.470692, //lon-E-
                    y: 56.337759,  //lat-N- 
                    z: 20000 // -aerial zoom-
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
                    title: `<img src='${markerObject.imgURL}' class="popup-img"><br><p class="roboto weight-reg">${markerObject.title}</p>`,
                } 
            })
            graphicsLayer.add(markerGraphic);
        } 
        hqMarker = new ConstructMarker (-3.340692, 57.007759, "hq", 30, "Cairngorms Outdoors HQ, Invercauld Road, Braemar, AB35 5XR", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/hq.jpg")
        campMarker1 = new ConstructMarker (-3.668879, 57.070710, "camp", 30, "Camp on the summit of Ben Macdui", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/camp1.gif")
        campMarker2 = new ConstructMarker (-4.053160, 56.945606, "camp", 30, "Camp on the beach of Loch an T-Seilich", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/camp2.gif")
        waterMarker1 = new ConstructMarker (-3.674994, 57.020003, "water", 30, "Paddle down the river Dee", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/riverDee.gif")
        waterMarker2 = new ConstructMarker (-4.043326, 56.989550, "water", 30, "Paddle down the wild River Tromie", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/riverTromie.gif"), 
        waterMarker3 = new ConstructMarker (-4.248634, 56.927478, "water", 30, "Travel 14 miles along Loch Ericht by power boat", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/boatEricht.png")
        pickupMarker1 = new ConstructMarker (-3.615609, 56.977300, "van", 30, "Pickup Point: River Dee", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/pickup.jpg")
        pickupMarker2 = new ConstructMarker (-4.042070, 56.944850, "van", 30, "Pickup Point: Gaick Lodge", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/pickup2.jpg")
        pickupMarker3 = new ConstructMarker (-4.248634, 56.927478, "van", 30, "Pickup Point: Loch Ericht", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/pickup3.jpg")
        pickupMarker3Water = new ConstructMarker (-4.438109, 56.733385, "van", 30, "Pickup Point: Loch Ericht", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/pickup3.jpg")

        addMarker(hqMarker);

        if (mapDays == 1){ 
            addMarker(pickupMarker1);
            if (mapWater == "true"){
                   addMarker(waterMarker1);
            }
        }
        else if(mapDays == 2){
            addMarker(campMarker1);
            addMarker(pickupMarker2);
            if (mapWater == "true"){
                addMarker(waterMarker2);
            }
        }
        else if(mapDays == 3) {
            addMarker(campMarker1);
            addMarker(campMarker2);
            if (mapWater == "true") {
                addMarker(pickupMarker3Water);
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

