function loadMap(mapClientType, mapGroupType, mapDays, mapWater){
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
            function ConstructMarker(long, lat, markerType, markerSize, yOffset, popupTitle, popupImgURL){
                this.long = long
                this.lat = lat
                this.markerType = markerType
                this.markerSize = markerSize
                this.yOffset = yOffset
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
                        yoffset: markerObject.yOffset,
                    }, 
                    popupTemplate: {
                        title: `<img src='${markerObject.imgURL}' class="popup-img"><br><p class="roboto weight-reg">${markerObject.title}</p>`,
                    } 
                })
                graphicsLayer.add(markerGraphic);
            };
            //marker objects
            hqMarker = new ConstructMarker (-3.340692, 57.007759, "hq", 30, 45, "Cairngorms Outdoors HQ, Invercauld Road, Braemar, AB35 5XR", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/hq.jpg");
            campMarker1 = new ConstructMarker (-3.668879, 57.070710, "camp", 30, 45,  "Camp on the summit of Ben Macdui", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/camp1.gif");
            campMarker2 = new ConstructMarker (-4.042070, 56.944850, "camp", 30, 45, "Camp on the beach of Loch an T-Seilich", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/camp2.gif");
            waterMarker1 = new ConstructMarker (-3.674994, 57.020003, "water", 30, 45, "Paddle down the river Dee", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/riverDee.gif");
            waterMarker2 = new ConstructMarker (-4.043326, 56.989550, "water", 30, 45,"Paddle down the wild River Tromie", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/riverTromie.gif");
            waterMarker3 = new ConstructMarker (-4.248634, 56.927478, "water", 30, 45,"Travel 14 miles along Loch Ericht by power boat", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/boatEricht.png");
            pickupMarker1 = new ConstructMarker (-3.615609, 56.977300, "van", 30, 45,"Pickup Point: River Dee", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/pickup.jpg");
            pickupMarker2 = new ConstructMarker (-4.042070, 56.944850, "van", 30, 45,"Pickup Point: Gaick Lodge", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/pickup2.jpg");
            pickupMarker3 = new ConstructMarker (-4.248634, 56.927478, "van", 30, 45,"Pickup Point: Loch Ericht", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/pickup3.jpg");
            pickupMarker3Water = new ConstructMarker (-4.438334, 56.733432, "van", 30, 25, "Pickup Point: Loch Ericht", "https://a1fcb092-9296-4f1a-a880-fe1353552e59.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/pickup3.jpg");
            ridgeMarker1 = new ConstructMarker (-3.450130, 57.066026, "photo", 25, 25, "Walk along the thin ridges of the Cairngorms peaks", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/ridge1.png");
            ridgeMarker2 = new ConstructMarker (-3.644826, 57.070512, "photo", 25, 25, "Climb higher into the Cairngorms", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/ridge2.jpg");
            lochMarker1 = new ConstructMarker (-3.644826, 57.070512, "photo", 25, 25, "Take in the beautiful views of the loch below", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/loch1.jpg");
            ridgeMarker3 = new ConstructMarker (-3.450130, 57.066026, "photo", 25, 25, "Stop and take in the views along the thin ridges of the cairngorms peaks", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/ridge3.jpg");
            forestMarker1 = new ConstructMarker (-3.914447, 57.060672, "photo", 25, 25, "Get lost among the trees", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/forest1.jpg");
            peakMarker1 = new ConstructMarker (-3.728852, 57.077996, "photo", 25, 25, "See the wide skies from the peak of Braeriach", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/peak1.jpg");
            peakMarker2 = new ConstructMarker (-3.710913, 57.054314, "photo", 25, 25, "Look down on Loch Dee from the peak of Cairn Toul", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/peak2.jpg");
            riverMarker1 = new ConstructMarker (-3.622516, 56.977664, "photo", 25, 25, "Nearly there!", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/rivermarker1.gif");
            riverMarker2 = new ConstructMarker (-3.622516, 56.977664, "photo", 25, 25, "All river adventures should end with a smile", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/rivermarker2.gif");
            riverMarker3 = new ConstructMarker (-3.622516, 56.977664, "photo", 25, 25, "Be prepared for the River Dee to be a little wild", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/rivermarker3.gif");
            noWaterMarker1 = new ConstructMarker (-3.673897, 57.017884, "photo", 25, 25, "Walk along the bank of the wild River Dee", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/nowater1.jpg");
            noWaterMarker2 = new ConstructMarker (-4.043326, 56.989550, "photo", 25, 25, "Walk along tte bank of the wild River Tromie", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/nowater2.jpg"); 
            abseilMaker1 = new ConstructMarker (-3.785170, 57.060123, "photo", 25, 25, "Abseil into the crater of Loch Eniach", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/abseil1.jpg");
            climbMarker1 = new ConstructMarker (-3.796557, 57.060693, "photo", 25, 25, "Time to climb back out of Loch Eniach", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/climb1.jpg");
            riverMarker4 = new ConstructMarker (-4.036075, 56.967650, "photo", 25, 25, "Nearly there!", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/rivermarker1.gif");
            riverMarker5 = new ConstructMarker (-4.036075, 56.967650, "photo", 25, 25, "All river adventures should end with a smile", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/rivermarker2.gif");
            riverMarker6 = new ConstructMarker (-4.036075, 56.967650, "photo", 25, 25,  "Be prepared for the River Tromie to be a little wild", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/rivermarker3.gif");
            gorgeMarker = new ConstructMarker (-4.091434, 56.916269, "photo", 25, 25, "If we can't go over it, under it, or round it, we'll have to go through it", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/gorge1.jpg");
            ridgeMarker4 = new ConstructMarker (-4.066483, 56.937980, "photo", 25, 25, "Time for one more peak", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/ridge4.jpg");
            ridgeMarker5 = new ConstructMarker (-4.066483, 56.937980, "photo", 25, 25, "Time for one more peak", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/ridge5.jpg");
            lochMarker2 = new ConstructMarker (-4.150458, 56.895537, "photo", 25, 25, "Take in the views of the huge loch Ericht", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/loch2.jpg");
            lockMarker3 = new ConstructMarker (-4.387887, 56.821188, "photo", 25, 25, "Pause in the middle of Loch Ericht and take in the views", "https://bdc45652-473e-4c62-af30-fe1665e6e122.ws-eu01.gitpod.io/mini-browser/workspace/milestone-project-2/assets/img/map-img/loch3.jpg");
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
            };
            
            //polyline objects
            mainRoutePart1 = new ConstructPolyline ("#b33000", [[-3.340692, 57.007759],[-3.349049, 57.018909],[-3.350229, 57.038714],[-3.372025, 57.054588],[-3.376526, 57.058555],[-3.379825, 57.062475],[-3.438356, 57.062802],[-3.441848, 57.066063],[-3.444713, 57.066734],[-3.446718, 57.066376],[-3.448274, 57.066014],[-3.450130, 57.066026],[-3.451439, 57.065676],[-3.453928, 57.064976],[-3.457522, 57.063699],[-3.477091, 57.070512],[-3.481973, 57.069602],[-3.550509, 57.094492],[-3.573683, 57.080367],[-3.582556, 57.074810],[-3.596632, 57.067654],[-3.607683, 57.064493],[-3.644826, 57.070512],[-3.660276, 57.067882],[-3.668879, 57.070710]]);
            mainRoutePart2 = new ConstructPolyline ("#b33000", [[-3.668879, 57.070710],[-3.684985, 57.067934],[-3.699791, 57.078017],[-3.710037, 57.077626],[-3.720659, 57.079673],[-3.724260, 57.079331],[-3.728112, 57.078031],[-3.728852, 57.077996],[-3.751050, 57.062278],[-3.750299, 57.058521],[-3.731009, 57.054460],[-3.720784, 57.053375],[-3.714078, 57.053188],[-3.710913, 57.054314],[-3.703403, 57.057570],[-3.699390, 57.053515],[-3.693006, 57.048047],[-3.679906, 57.045047],[-3.679616, 57.044411],[-3.679283, 57.043728],[-3.677523, 57.043384],[-3.677190, 57.041960],[-3.677544, 57.041079],[-3.675442, 57.019940]]);
            mainRoutePart3 = new ConstructPolyline ("#b33000",[[-3.668879, 57.070710],[-3.684985, 57.067934],[-3.699791, 57.078017],[-3.710037, 57.077626],[-3.720659, 57.079673],[-3.724260, 57.079331],[-3.728112, 57.078031],[-3.728852, 57.077996],[-3.727622, 57.078619],[-3.742846, 57.074152],[-3.751578, 57.066353],[-3.774259, 57.058408],[-3.780203, 57.058816],[-3.785170, 57.060123],[-3.791704, 57.059388],[-3.794440, 57.059872],[-3.796557, 57.060693],[-3.797920, 57.059830],[-3.803563, 57.058097],[-3.807039, 57.055857],[-3.821147, 57.047758],[-3.836060, 57.041554],[-3.853956, 57.035857],[-3.863827, 57.035688],[-3.886036, 57.041064],[-3.898911, 57.054603],[-3.899641, 57.054615],[-3.900639, 57.055029],[-3.900854, 57.055292],[-3.901197, 57.055450],[-3.904008, 57.056903],[-3.905317, 57.057481],[-3.907313, 57.058181],[-3.909963, 57.058969],[-3.912999, 57.059342],[-3.913889, 57.060415],[-3.914447, 57.060672],[-3.915756, 57.061209],[-3.916679, 57.062172],[-3.928602, 57.062677],[-3.926885, 57.059788],[-3.940618, 57.056054],[-3.999863, 57.031769],[-4.001024, 57.030069],[-4.004929, 57.027115],[-4.003330, 57.014314],[-4.007203, 57.003933],[-4.011173, 57.003442],[-4.014134, 57.003354],[-4.016376, 57.002565],[-4.024787, 56.998153],[-4.043326, 56.989550]]);
            mainRoutePart4 = new ConstructPolyline ("#b33000",[[-4.042070, 56.944850],[-4.054244, 56.943796],[-4.063042, 56.940800],[-4.063972, 56.939777],[-4.066483, 56.937980],[-4.067449, 56.937717],[-4.075667, 56.937963],[-4.078961, 56.937893],[-4.087448, 56.926021],[-4.088231, 56.923240],[-4.094593, 56.919235],[-4.091750, 56.916319],[-4.091686, 56.916146],[-4.091434, 56.916269],[-4.091101, 56.916228],[-4.090516, 56.916123],[-4.089840, 56.915880],[-4.089228, 56.915628],[-4.086224, 56.915183],[-4.080409, 56.914334],[-4.080114, 56.913441],[-4.081863, 56.911613],[-4.084309, 56.910451],[-4.086337, 56.909057],[-4.091036, 56.905630],[-4.093375, 56.902812],[-4.094426, 56.902466],[-4.094823, 56.901851],[-4.095477, 56.901505],[-4.097969, 56.900696],[-4.105043, 56.887960],[-4.124001, 56.890568],[-4.128464, 56.891107],[-4.133796, 56.891505],[-4.136811, 56.892982],[-4.150458, 56.895537],[-4.166122, 56.897435],[-4.175628, 56.900845],[-4.182065, 56.903546],[-4.192225, 56.904190],[-4.197547, 56.906709],[-4.202343, 56.908414],[-4.206087, 56.911893],[-4.209660, 56.913843],[-4.229873, 56.919231],[-4.232161, 56.919609],[-4.234747, 56.920645],[-4.236152, 56.921629],[-4.237225, 56.921600],[-4.237826, 56.924586],[-4.238484, 56.927201],[-4.240147, 56.927904],[-4.241166, 56.927658],[-4.244449, 56.927055],[-4.245659, 56.927446],[-4.246853, 56.927455],[-4.248634, 56.927478]]);
            waterRoute1 = new ConstructPolyline ("#10a5f5", [[-3.675442, 57.019940],[-3.675270, 57.019382],[-3.675270, 57.019382],[-3.675560, 57.018815],[-3.673940, 57.017285],[-3.672738, 57.016999],[-3.671536, 57.016520],[-3.670967, 57.016164],[-3.671042, 57.015656],[-3.671332, 57.015054],[-3.671257, 57.013991],[-3.671643, 57.013354],[-3.671471, 57.013103],[-3.670548, 57.012250],[-3.670172, 57.010941],[-3.669614, 57.010409],[-3.668788, 57.009965],[-3.668799, 57.009001],[-3.668713, 57.008499],[-3.669389, 57.007722],[-3.669550, 57.007377],[-3.669142, 57.006682],[-3.668176, 57.005917],[-3.668004, 57.005619],[-3.667983, 57.005023],[-3.668112, 57.004415],[-3.667028, 57.002680],[-3.665655, 57.001465],[-3.663327, 56.999619],[-3.662651, 56.998772],[-3.662039, 56.998497],[-3.660204, 56.998129],[-3.658992, 56.998147],[-3.655205, 56.997300],[-3.654690, 56.996792],[-3.653531, 56.995904],[-3.652898, 56.994402],[-3.652490, 56.992888],[-3.652833, 56.990129],[-3.652887, 56.989924],[-3.649765, 56.987650],[-3.649454, 56.987492],[-3.648306, 56.987270],[-3.648070, 56.986341],[-3.646214, 56.985154],[-3.645313, 56.984762],[-3.644262, 56.984020],[-3.640990, 56.982903],[-3.639939, 56.982517],[-3.638008, 56.982225],[-3.636763, 56.981278],[-3.634242, 56.980272],[-3.632987, 56.979518],[-3.631721, 56.978992],[-3.629908, 56.978635],[-3.628749, 56.978617],[-3.627333, 56.978161],[-3.625928, 56.978477],[-3.624093, 56.978138],[-3.622516, 56.977664],[-3.619147, 56.977524],[-3.616744, 56.976922],[-3.615609, 56.977300]])
            waterRoute2 = new ConstructPolyline ("#10a5f5",[[-4.043326, 56.989550],[-4.043283, 56.988837],[-4.043626, 56.988165],[-4.043401, 56.987680],[-4.042167, 56.987411],[-4.040751, 56.986499],[-4.038809, 56.986213],[-4.036663, 56.985745],[-4.035569, 56.985079],[-4.035443, 56.984729],[-4.035765, 56.983723],[-4.035604, 56.982577],[-4.036022, 56.981285],[-4.035668, 56.980373],[-4.036537, 56.978946],[-4.036676, 56.978268],[-4.037116, 56.977473],[-4.037052, 56.977134],[-4.034853, 56.975900],[-4.033566, 56.975204],[-4.032954, 56.974099],[-4.033104, 56.973883],[-4.034306, 56.973415],[-4.035658, 56.972456],[-4.035250, 56.971497],[-4.035089, 56.971117],[-4.035861, 56.970585],[-4.035646, 56.969445],[-4.035764, 56.968790],[-4.036054, 56.968264],[-4.036075, 56.967650],[-4.036633, 56.966007],[-4.038757, 56.965580],[-4.041203, 56.963159],[-4.042405, 56.961205],[-4.038808, 56.958237],[-4.038368, 56.956119],[-4.038668, 56.953978],[-4.042005, 56.949157],[-4.043571, 56.947823],[-4.042949, 56.945939],[-4.042756, 56.944488],[-4.042070, 56.944850]]);
            waterRoute3 = new ConstructPolyline ("#10a5f5",[[-4.248634, 56.927478],[-4.250986, 56.928053],[-4.253775, 56.928000],[-4.261757, 56.926290],[-4.276692, 56.920599],[-4.306744, 56.897901],[-4.339167, 56.874949],[-4.350754, 56.864277],[-4.363639, 56.846808],[-4.384668, 56.826713],[-4.387887, 56.821188],[-4.450694, 56.764745],[-4.453795, 56.757347],[-4.450018, 56.747071],[-4.449203, 56.738387],[-4.448001, 56.737222],[-4.446799, 56.735757],[-4.445243, 56.734403],[-4.444503, 56.732673],[-4.440394, 56.732632],[-4.438334, 56.733432]]);
            noWaterRoute1 = new ConstructPolyline ("#b33000", [[-3.675442, 57.019940],[-3.673897, 57.017884],[-3.675442, 57.019940],[-3.670528, 57.016453],[-3.664080, 57.015010],[-3.663721, 57.006696],[-3.661810, 57.002653],[-3.653924, 56.997908],[-3.652551, 56.997148],[-3.651317, 56.994670],[-3.650813, 56.990579],[-3.644397, 56.991345],[-3.629087, 56.993256],[-3.628304, 56.993186],[-3.619088, 56.992485],[-3.617318, 56.991562],[-3.613338, 56.988517],[-3.613263, 56.986974],[-3.619647, 56.983595],[-3.622801, 56.980555],[-3.624507, 56.979812],[-3.622168, 56.979467],[-3.622415, 56.978643],[-3.620763, 56.977737],[-3.617941, 56.977480],[-3.615742, 56.977299],[-3.615699, 56.977077],[-3.615609, 56.977300]]);
            noWaterRoute2 = new ConstructPolyline ("#b33000",[[-4.043326, 56.989550],[-4.043084, 56.989364],[-4.040724, 56.987167],[-4.037570, 56.986454],[-4.034630, 56.985086],[-4.034641, 56.981485],[-4.035392, 56.979509],[-4.036293, 56.977241],[-4.032119, 56.974528],[-4.034351, 56.970786],[-4.035038, 56.967909],[-4.035596, 56.962341],[-4.035596, 56.959253],[-4.036004, 56.956024],[-4.037420, 56.952069],[-4.040982, 56.947739],[-4.041969, 56.946101],[-4.041846, 56.945533],[56.944781, -4.042198],[-4.042070, 56.944850]]);
            //add HQ marker to map 
            addMarker(hqMarker);
            //use parameters (which are user responses to "about you form") to determine which markers to display
            if (mapDays == 1){ 
                addMarker(pickupMarker1);
                addMarker(lochMarker1);
                addMarker(peakMarker1);
                addMarker(peakMarker2);
                addPolyline(mainRoutePart1);
                addPolyline(mainRoutePart2);
                if (mapClientType == "group") {
                    addMarker(ridgeMarker1);
                    addMarker(ridgeMarker2);
                    if (mapWater == "true") {
                        if (mapGroupType == "school") {
                            addMarker(riverMarker1);
                        }
                        else {
                            addMarker(riverMarker2);
                        }
                    }
                }
                else {
                    addMarker(ridgeMarker3)
                    if (mapWater == "true") {
                        addMarker(riverMarker3);
                    }
                }
                if (mapWater == "true"){
                    addMarker(waterMarker1);
                    addPolyline(waterRoute1);
                    
                }
                else {
                    addPolyline(noWaterRoute1);
                    addMarker(noWaterMarker1);
                }
            }
            else if(mapDays == 2){
                addMarker(campMarker1);
                addMarker(pickupMarker2);
                addMarker(lochMarker1);
                addPolyline(mainRoutePart1);
                addPolyline(mainRoutePart3);
                addMarker(forestMarker1);
                addMarker(abseilMaker1);
                addMarker(climbMarker1);
                if (mapClientType == "group") {
                    addMarker(ridgeMarker1);
                    addMarker(ridgeMarker2);
                    addMarker(ridgeMarker4);
                }
                else {
                    addMarker(ridgeMarker3)
                }
                if (mapWater == "true"){
                    addPolyline(waterRoute2);
                    addMarker(waterMarker2);
                    if (mapClientType == "group"){
                        if (mapGroupType == "school") {
                            addMarker(riverMarker4);
                        }
                        else {
                            addMarker(riverMarker5);
                        }
                    }
                    else {
                        addMarker(riverMarker6)
                    }
                }
                else {
                    addPolyline(noWaterRoute2);
                    addMarker(noWater2);
                }
            }
            else if(mapDays == 3) {
                addMarker(forestMarker1);
                addMarker(campMarker1);
                addMarker(campMarker2);
                addMarker(lochMarker1);
                addMarker(abseilMaker1);
                addMarker(climbMarker1);
                addMarker(gorgeMarker);
                addMarker(lochMarker2);
                addPolyline(mainRoutePart1);
                addPolyline(mainRoutePart3);
                addPolyline(mainRoutePart4);
                if (mapClientType == "group") {
                    addMarker(ridgeMarker1);
                    addMarker(ridgeMarker2); 
                }
                else {
                    addMarker(ridgeMarker3)
                }
                if (mapWater == "true") {
                    addPolyline(waterRoute2);
                    addPolyline(waterRoute3);
                    addMarker(pickupMarker3Water);
                    addMarker(waterMarker2); 
                    addMarker(waterMarker3); 
                    addMarker(lochMarker3);
                    if (mapClientType == "group"){
                        if (mapGroupType == "school") {
                            addMarker(riverMarker4);
                        }
                        else {
                            addMarker(riverMarker5);
                        }
                    }
                    else {
                        addMarker(riverMarker6)
                    }
                }
                else {
                    addMarker(pickupMarker3);
                    addMarker(noWater2);
                }
            } 
        }   
    );
}

