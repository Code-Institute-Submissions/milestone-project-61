function loadMap(mapClientType, mapGroupType, mapDays, mapWater,){
    //load required modules from esri service for 3d map, basemap type, graphics layer etc
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
            //set starting position of map
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
            //function to create a marker object
            function ConstructMarker(long, lat, markerType, markerSize, popupTitle, popupImgURL){
                this.long = long
                this.lat = lat
                this.markerType = markerType
                this.markerSize = markerSize
                this.title = popupTitle
                this.imgURL = popupImgURL
            };
            //function to take marker object values and use them to add a new marker to the map
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
            };
            //marker objects
            hqMarker = new ConstructMarker (-3.340692, 57.007759, "hq", 30, "Cairngorms Outdoors HQ, Invercauld Road, Braemar, AB35 5XR", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/hq.jpg")
            campMarker1 = new ConstructMarker (-3.668879, 57.070710, "camp", 30, "Camp on the summit of Ben Macdui", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/camp1.gif")
            campMarker2 = new ConstructMarker (-4.042070, 56.944850, "camp", 30, "Camp on the beach of Loch an T-Seilich", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/camp2.gif")
            waterMarker1 = new ConstructMarker (-3.674994, 57.020003, "water", 30, "Paddle down the river Dee", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/riverDee.gif")
            waterMarker2 = new ConstructMarker (-4.043326, 56.989550, "water", 30, "Paddle down the wild River Tromie", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/riverTromie.gif"), 
            waterMarker3 = new ConstructMarker (-4.248634, 56.927478, "water", 30, "Travel 14 miles along Loch Ericht by power boat", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/boatEricht.png")
            pickupMarker1 = new ConstructMarker (-3.615609, 56.977300, "van", 30, "Pickup Point: River Dee", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/pickup.jpg")
            pickupMarker2 = new ConstructMarker (-4.042070, 56.944850, "van", 30, "Pickup Point: Gaick Lodge", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/pickup2.jpg")
            pickupMarker3 = new ConstructMarker (-4.248634, 56.927478, "van", 30, "Pickup Point: Loch Ericht", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/pickup3.jpg")
            pickupMarker3Water = new ConstructMarker (-4.438334, 56.733432, "van", 30, "Pickup Point: Loch Ericht", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/pickup3.jpg")

            //function to create a new polyline object 
            function ConstructPolyline(colour, geocoordinates){
                this.colour = colour
                this.geocoordinates = geocoordinates
            };
            //function to take polyline object values and use them to add a new polyline to the map 
            function addPolyline(polylineObject){
	            var polylineGraphic = new Graphic({
		        geometry: {
			        type: "polyline", 
                    paths: polylineObject.geocoordinates
		        },
		        symbol: {
			        type: "simple-line",
			        color: polylineObject.colour,
			        width: 3
		        }
	        })
            graphicsLayer.add(polylineGraphic); 
            alert("adding line graphic!")
            };
            
            //polyline objects
            mainRoute1 = new ConstructPolyline ();
            mainRoute2 = new ConstructPolyline ();
            mainRoute3 = new ConstructPolyline ();
            waterRoute1 = new ConstructPolyline ("#10a5f5", [[-3.675442, 57.019940],[-3.675270, 57.019382],[-3.675270, 57.019382],[-3.675560, 57.018815],[-3.673940, 57.017285],[-3.672738, 57.016999],[-3.671536, 57.016520],[-3.670967, 57.016164],[-3.671042, 57.015656],[-3.671332, 57.015054],[-3.671257, 57.013991],[-3.671643, 57.013354],[-3.671471, 57.013103],[-3.670548, 57.012250],[-3.670172, 57.010941],[-3.669614, 57.010409],[-3.668788, 57.009965],[-3.668799, 57.009001],[-3.668713, 57.008499],[-3.669389, 57.007722],[-3.669550, 57.007377],[-3.669142, 57.006682],[-3.668176, 57.005917],[-3.668004, 57.005619],[-3.667983, 57.005023],[-3.668112, 57.004415],[-3.667028, 57.002680],[-3.665655, 57.001465],[-3.663327, 56.999619],[-3.662651, 56.998772],[-3.662039, 56.998497],[-3.660204, 56.998129],[-3.658992, 56.998147],[-3.655205, 56.997300],[-3.654690, 56.996792],[-3.653531, 56.995904],[-3.652898, 56.994402],[-3.652490, 56.992888],[-3.652833, 56.990129],[-3.652887, 56.989924],[-3.649765, 56.987650],[-3.649454, 56.987492],[-3.648306, 56.987270],[-3.648070, 56.986341],[-3.646214, 56.985154],[-3.645313, 56.984762],[-3.644262, 56.984020],[-3.640990, 56.982903],[-3.639939, 56.982517],[-3.638008, 56.982225],[-3.636763, 56.981278],[-3.634242, 56.980272],[-3.632987, 56.979518],[-3.631721, 56.978992],[-3.629908, 56.978635],[-3.628749, 56.978617],[-3.627333, 56.978161],[-3.625928, 56.978477],[-3.624093, 56.978138],[-3.622516, 56.977664],[-3.619147, 56.977524],[-3.616744, 56.976922],[-3.615609, 56.977300]])
            waterRoute2 = new ConstructPolyline ("#10a5f5",[[-4.043326, 56.989550],[-4.043283, 56.988837],[-4.043626, 56.988165],[-4.043401, 56.987680],[-4.042167, 56.987411],[-4.040751, 56.986499],[-4.038809, 56.986213],[-4.036663, 56.985745],[-4.035569, 56.985079],[-4.035443, 56.984729],[-4.035765, 56.983723],[-4.035604, 56.982577],[-4.036022, 56.981285],[-4.035668, 56.980373],[-4.036537, 56.978946],[-4.036676, 56.978268],[-4.037116, 56.977473],[-4.037052, 56.977134],[-4.034853, 56.975900],[-4.033566, 56.975204],[-4.032954, 56.974099],[-4.033104, 56.973883],[-4.034306, 56.973415],[-4.035658, 56.972456],[-4.035250, 56.971497],[-4.035089, 56.971117],[-4.035861, 56.970585],[-4.035646, 56.969445],[-4.035764, 56.968790],[-4.036054, 56.968264],[-4.036075, 56.967650],[-4.036633, 56.966007],[-4.038757, 56.965580],[-4.041203, 56.963159],[-4.042405, 56.961205],[-4.038808, 56.958237],[-4.038368, 56.956119],[-4.038668, 56.953978],[-4.042005, 56.949157],[-4.043571, 56.947823],[-4.042949, 56.945939],[-4.042756, 56.944488],[-4.042070, 56.944850]]);
            waterRoute3 = new ConstructPolyline ("#10a5f5",[[-4.248634, 56.927478],[-4.250986, 56.928053],[-4.253775, 56.928000],[-4.261757, 56.926290],[-4.276692, 56.920599],[-4.306744, 56.897901],[-4.339167, 56.874949],[-4.350754, 56.864277],[-4.363639, 56.846808],[-4.384668, 56.826713],[-4.387887, 56.821188],[-4.450694, 56.764745],[-4.453795, 56.757347],[-4.450018, 56.747071],[-4.449203, 56.738387],[-4.448001, 56.737222],[-4.446799, 56.735757],[-4.445243, 56.734403],[-4.444503, 56.732673],[-4.440394, 56.732632],[-4.438334, 56.733432]]);
            noWaterRoute1 = new ConstructPolyline ();
            noWaterRoute2 = new ConstructPolyline ();
            addMarker(hqMarker);
            //use parameters (which are user responses to "about you form") to determine which markers to display
            if (mapDays == 1){ 
                addMarker(pickupMarker1);
                if (mapWater == "true"){
                    addMarker(waterMarker1);
                    addPolyline(waterRoute1);
                }
            }
            else if(mapDays == 2){
                addMarker(campMarker1);
                addMarker(pickupMarker2);
                if (mapWater == "true"){
                    addPolyline(waterRoute2);
                    addMarker(waterMarker2);
                }
            }
            else if(mapDays == 3) {
                addMarker(campMarker1);
                addMarker(campMarker2);
                if (mapWater == "true") {
                    addPolyline(waterRoute2);
                    addPolyline(waterRoute3);
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

