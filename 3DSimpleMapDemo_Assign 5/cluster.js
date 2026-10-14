// since ArcGIS API for clustering specifically mentions that it's clustering feature does not work on
// 3D maps; I am using W3 schools to piece together coding from tutorials to make this work. More details in readme.md file

// this tells another JavaScript file that.. Hey, I'm here, read me, use me. I think.
export function setupCluster(view, myPoints, Graphic, myStuff, reactiveUtils) {
    //Get the coordinates for Sparfish and Gillette.
    const spearfish = myStuff["Graduate School"].coord;
    const gillette = myStuff["Where I Grew Up"].coord;

    // Calculate the center between the two Locations
    const middleLongitude = (spearfish[0] + gillette[0]) / 2;
    const middleLatitude = (spearfish[1] + gillette[1]) / 2;

    // Create a cluster marker conatining the number 2.
    const clusterMarker = new Graphic({
        geometry: {
            type: "point",
            longitude: middleLongitude,
            latitude: middleLatitude,
            z: 10000
        },

        symbol: {
            type: "simple-marker",
            style: "circle",
            color: "purple",
            size: 30,
            outline: {
                color: "white",
                width: 2
            }
        },

        popupTemplate: {
            title: "2 Locations",
            content: "Graduate School; Spearfish, SD and Where I Grew Up: Gillette, WY"
        }
    });

    // Put the cluster in its own layer.
    const clusterLayer = new myPoints.constructor();
    view.map.add(clusterLayer);
    clusterLayer.add(clusterMarker);

    // Find the two original stick-figure markers.
    const originalMarkers = myPoints.graphics.toArray().filter(function(graphic) {
        return graphic.attributes &&
        (graphic.attributes.name === "Graduate School" ||
        graphic.attributes.name === "Where I Grew Up");
        
    });

    // Switch between the cluster and the original markers.
    function updateCluster() {
        if (view.zoom < 6) {
            clusterLayer.visible = true;
            originalMarkers.forEach(function(marker) {
                marker.visible = false;
            });
        } else {
            clusterLayer.visible = false;
            originalMarkers.forEach(function(marker) {
                marker.visible = true;
            });
        }
    }

    // Run when the map zoom changes.
    reactiveUtils.watch(
        () => view.zoom,
        updateCluster,
        { initial: true }
    );
}
