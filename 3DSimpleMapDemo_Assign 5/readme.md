# Assignment 5 - ArcGIS API Practice Creating 3D Map

3D Map created for this assignment can be found at the following link:


## 1. Project Overview

For this assignment, I modified the instructor's ArcGIS JavaScript example to create an interactive 3D globe
displaying eight locations that have personal significance to me. 

The map uses the ArcGIS Maps SDK for JavaScript, including SceneView, GraphicsLayer, and Graphic.

I customized the markers, popups, map interactions, and added a search functionality. I also created a custom
clustering effect for two nearby locations. I say 'custom' because it isn't a true clustering according to what
I found, but they are 'together'. I'll discuss more indepthly later on in this report. 

## 2. Personal Locations

The eight locations are:
- Graduate School: Spearfish, South Dakota
- Favorite Travel Spot #1: La Fortuna, Costa Rica
- Current Residence: Marysville, Kansas
- Favorite Travel Spot #2: Banff National Park, Canada
- Place of Birth: Oceanside, California
- Annual Family Vacation: Buena Vista, Colorado
- Where I Grew Up: Gillette, Wyoming
- A Place I Want to Visit: Kanazawa, Japan

## 3. Changes to the Original Map

### Custom Markers

I replaced the orginal point symbols with a waving stick-figure image stored in my 'images' folder. 
I used the ArcGIS picture-marker symbol and adjusted its width and height. 
This was surprisingly easier than I thought it would be, the coding worked exactly as it was in the module, I 
didn't have to edit or piece anything together. Super nice for a change. 

### Customized Popups

I modified the popups to display each location's name, city or park, state/province/region, and country.
I used code from previous assignments to organize them such as HTML <b> for bold labels and <br> to separate 
information onto different lines. 
I also removed the original 'Zoom To' button because I added my own click to zoom functionality. 

### Click to Zoom

I added functionality that automatically zooms toward a location when its stick-figure marker is clicked.

This uses:
    - view.on("click:) to detect a mouse click.
    - view.hitTest() to identify what was clicked.
    -JavaScript .find to select a graphic from the results.
    - view.go to move the viewer toward the selected location.


I did struggle with this part a bit. 
I had to work through two different errors. 1. It didn't like my name. 2. It didn't like my placement of the name change.
After digging around the internet I found that since GraphicsLayer is the ArcGIS class used to create a layer that holds 
graphics, and I named my variable graphicsLayer, it was messing everything up. Apparently they are too similar and it sees it as an error.
So, I changed my name to myPoints because it is the layer that holds my stick-figure markers. Then to fix the second
part of the errors, which happened when I tried to start creating the zoom feature, I learned that I needed myPoints layer
to be outside of initMap() not inside of it. What I understand, is that leaving myPoints inside of initMap() was just including
it in the loop that grabs locations and assigns the details to them. I needed a way to grap all those details and use them 
in different features. So I linked the loop to the myPoints layer by modifying the pointGraphic code. Then I could make my stick figures do things, like click to zoom and later on, clustering. 

### Search Bar

I added the ArcGIS Search widget to allow users to serach for various locations.
I used the code example in ArcGIS API documentation.

### Custom Clustering

This was an assignment requirement, had it not been, I would have aborted this process. 

The problem: ArcGIS API does not provide a cluster code for 3D maps. The only option I could find was FeatureReductionCluster
and surprise, surprise, it only works on 2D maps. Awesome. 
My choices were then to create an entire new map in 2d, just for clustering or figure out another way to do this. So, I did what I've
been doing, I started google-ing questions on how to create a cluster effect in a 3d map, when the ArcGIS API doesn't have
any available.

This led me to hours spent trying to make something work that only became more complicated as I tried to fix each error. What I did:
        - Object.entries() - to try to convert location data into an array.
        - forEach() - to examine each individual location.
        - Nested - for loops to compare all eight locations.
        - Math.abs() - to calculate coordinate differences.
        - if else - to determine whether locations were nearby.
        - push() - to store nearby pairs in an array.

        I did successfully get it to tell me that Spearfish and Gillete were nearby locations, but the code just kept growing and 
        growning and becoming more challenging. So after hours of note taking and trial and error. I bailed in search of a more 
        simple method. Not one where I barely understood what was happening. I decided that I didn't need the code to tell me which 
        locations were nearby, I could do that myself.

What I did instead. I researched how to cluster two location points together and tried to use code that I had already used, instead 
of trying to learn a bunch of new codes.
        - The coordinates are retrieved for Spearfish and Gillette from obj.js.
        - I used JavaScript code to calculate the midpoint between those coordinates. This is where the new marker will go.
        - A purple circular marker represents the two locations when the globe is zoomed out.
        - The individual stick-figures are hidden while the cluster is visible.
        - Zooming closer hides the cluster and displays the two original markers.
        - The cluster popup identifies both locations and gives instructions to the users to zoom in to see separate locations.
        - reactiveUtils.watch() - monitors the map's zoom level.
        - if else - to determine which markers should be visible.

## 4. References

### ArcGIS Maps API

- SceneView API: https://developers.arcgis.com/javascript/latest/references/core/views/SceneView/ 
    * used for the 3D map creation, click events, hitTest(), and goTo().
- Graphic API: https://developers.arcgis.com/javascript/latest/references/core/Graphic/
    * used for graphics, symbols, attributes, and popup templates.
- GraphicsLayer API: https://developers.arcgis.com/javascript/latest/references/core/layers/GraphicsLayer/
    * used for organizing the map graphics.
- Search Widget API: https://developers.arcgis.com/javascript/latest/references/core/widgets/Search/
    * used to add location search bar.
- Cluster API: https://developers.arcgis.com/javascript/latest/references/core/layers/support/FeatureReductionCluster/
    * where I learned that clustering was going to be a miserable task. Here incase I ever need it for a 2D map.
- Collection API: https://developers.arcgis.com/javascript/latest/references/core/core/Collection/
    * used for storing, converting, and retrieving location coordinate data.
- ReactiveUtils API: https://developers.arcgis.com/javascript/latest/references/core/core/reactiveUtils/
    * used to monitor changes to the map view.
- Collection API: https://developers.arcgis.com/javascript/latest/references/core/core/Collection/
    * used to convert ArcGIS collections to arrays.

### W3 Schools

#### JavaScript

- Functions: https://www.w3schools.com/js/js_functions.asp
- Arrays: https://www.w3schools.com/js/js_arrays.asp
- Objects: https://www.w3schools.com/js/js_objects.asp
- Modules: https://www.w3schools.com/js/js_modules.asp
- Loops: https://www.w3schools.com/js/js_loop_for.asp
- if else: https://www.w3schools.com/js/js_if_else.asp
- Array for each(): https://www.w3schools.com/jsref/jsref_foreach.asp
- Array filter(): https://www.w3schools.com/jsref/jsref_filter.asp
- Array push(): https://www.w3schools.com/jsref/jsref_push.asp
- Math.abs(): https://www.w3schools.com/jsref/jsref_abs.asp
- Arithmetic: https://www.w3schools.com/js/js_arithmetic.asp
- Array find(): https://www.w3schools.com/jsref/jsref_find.asp

#### HTML

- br Tag: https://www.w3schools.com/tags/tag_br.asp
- b Tag: https://www.w3schools.com/tags/tag_b.asp

## 5. Final Thoughts

The most challenging part of this assignment was definitely creating the cluster funtion. 

I also discovered that recognizing JavaScript syntax and understanding what existing code does are very
different from knowing which methods to search for and how to combine them.

This assignment gave me practice working with multiple JavaScript files, manipulating map graphics, troubleshooting 
errors, and learning how to ask questions about what I want to do in a way that leads to useful tutorials.

Also, so much JavaScript... so much. 