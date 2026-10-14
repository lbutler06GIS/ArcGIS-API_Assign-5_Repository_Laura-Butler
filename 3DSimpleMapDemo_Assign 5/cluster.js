// since ArcGIS API for clustering specifically mentions that it's clustering feature does not work on
// 3D maps; I am using W3 schools to piece together coding from tutorials to make this work. More details in readme.md file

// this tells another JavaScript file that.. Hey, I'm here, read me, use me. I think.
export function findClusters(locations) {
    const locationList = Object.entries(locations); //will create an array which apparently makes it easier to work with.
    
    locationList.forEach(function(location) {
        console.log(location[0], location[1].coord);
});
// code to retrieve coordinates of two different locations independently. 
const firstLocation = locationList[0][1].coord;
const secondLocation = locationList[6][1].coord;

console.log("First location:", firstLocation);
console.log("Second location:", secondLocation);

// Calculate the difference between the coordinates

const longitudeDifference = Math.abs(firstLocation[0] - secondLocation[0]);
const latitudeDifference = Math.abs(firstLocation[1] - secondLocation[1]);

console.log("Longitude difference:", longitudeDifference);
console.log("Latitude difference:", latitudeDifference);

// if is checking whether a 'condition' is true. Picked less than 2 degrees in both directions. && means AND both conditions must be true

if (longitudeDifference < 2 && latitudeDifference < 2) {
    console.log("These locations are close enough to cluster.");
}
    // else tells JavaScript what to do when the conditions are not both true.
    else {
    console.log("These locations are too far apart to cluster");
}
}



}





