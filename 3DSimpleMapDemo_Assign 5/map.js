var Main;

// Assuming you're using a bundler or ES module-compatible environment

import Map from "https://js.arcgis.com/5.1/@arcgis/core/Map.js";
import Graphic from "https://js.arcgis.com/5.1/@arcgis/core/Graphic.js";
import GraphicsLayer from "https://js.arcgis.com/5.1/@arcgis/core/layers/GraphicsLayer.js";
import ElevationLayer from "https://js.arcgis.com/5.1/@arcgis/core/layers/ElevationLayer.js";
import SceneView from "https://js.arcgis.com/5.1/@arcgis/core/views/SceneView.js";
import Search from "https://js.arcgis.com/5.1/@arcgis/core/widgets/Search.js";
import { findClusters } from "./cluster.js";

Main = (function() {
    const layer = new ElevationLayer({
        url: "http://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
    });
    const map = new Map({
        basemap: "hybrid",
        ground: {
            layers: [layer]
         },
    });
    // this is info governing how the map is seen and where it shows up geographically
    const view = new SceneView({
        container: "map",
        viewingMode: "global",
        map: map,
        camera: {
            position: {
                x: -105.503,
                y: 44.270,
                z: 20000000,
                spatialReference: {
                    wkid: 4326
    
                }
            },
            heading: 0,
            tilt: 0
        },
        popup: {
            dockEnabled: true,
            dockOptions: {
                breakpoint: false
            }
        },
        // enable shadows to be cast from the features
        environment: {
            lighting: {
                directShadowsEnabled: false
            }
        }
    });

    //adding code for a 'search' bar
    const searchWidget = new Search({
        view: view
    });
    view.ui.add(searchWidget, {
        position: "top-left",
        index: 2
    });

// moved this piece of code and renamed it myPoints so it could also be used with the zoom function. So, myPoints creates new empty layer on map where stick
// stick-figure markers are stored.
    const myPoints = new GraphicsLayer();
    map.add(myPoints); //adds each marker to the new graphic layer

// this sets up the 'event' which is a click on my stick-figure
    view.on("click", function(event) {
        view.hitTest(event).then(function(response) {
            const clickedGraphic = response.results.find(function(result) {
                return result.graphic && result.graphic.layer === myPoints; // this checks if a marker in myPoints was clicked. If it was... then next code.
            });
    // this is tying in the click event to the locations that were made into stick-figures (markers). This is different than other coding
    // i've done where you'd have to link it to the obj.js file.
             if (clickedGraphic) {
                view.goTo({
                    target: clickedGraphic.graphic.geometry,
                        zoom: 10

                 });
            }
        });
    });
                
    const initMap = function(){
      
        for (const [key, value] of Object.entries(myStuff)){                       
            console.log(key, value)
                        
            const point = {                        
                type: "point",                             
                x: value.coord[0],                        
                y: value.coord[1],                            
                z: 10000                          
            };
                                
            const markerSymbol = {                            
                type: "picture-marker",
                url: "./images/Stickfigure.png",                             
                width: 40,                            
                height: 40 
                          
            };
            
            const pointGraphic = new Graphic({                            
                geometry: point,                            
                symbol: markerSymbol,                            
                popupTemplate: {                                
                    title: key,                     
                      
                content: "<b>Location:</b> " + (value.city || value.park) + "<br><b>State/Region:</b> " +
                    (value.state || value.province || value.region || value.prefecture) + "<br><b>Country:</b> " +
                    (value.country)
                }          
            });
                          
            myPoints.add(pointGraphic);
                    
                    
        }
                                    
    }
                
    initMap()

    //linking my cluster.js to obj.js.
    findClusters(myStuff);
                
    return {};

            
})();



    
