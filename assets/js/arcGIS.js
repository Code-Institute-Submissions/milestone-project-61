//load esri modules 
require(["esri/Map", "esri/WebScene","esri/views/SceneView","esri/widgets/BasemapToggle", "esri/widgets/BasemapGallery", "esri/Graphic", "esri/layers/GraphicsLayer", "esri/widgets/Sketch", "esri/symbols/PolygonSymbol3D","esri/symbols/ExtrudeSymbol3DLayer"],
    function(Map, WebScene, SceneView, BasemapToggle, BasemapGallery, Graphic, GraphicsLayer, Sketch, PolygonSymbol3D, ExtrudeSymbol3DLayer, HQgraphic){
        /*mapinit*/
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
    //Add marker over HQ
        var pictureGraphic = new Graphic({
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
        graphicsLayer.add(pictureGraphic);
    }
)
