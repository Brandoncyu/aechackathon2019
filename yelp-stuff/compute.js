//const rhino3dm = require("rhino3dm");
//import { sunPos } from "./sunPos.js";


var polyline = null;

var bldgs = {
    polylines: []
};
//var sun = [150,200,0]

var path = null;
var pathPts = [];
let sun = null;
let Rays=[];
let Intersections=[];

// pop up a dialog asking the user to authorise the compute client
RhinoCompute.authToken = RhinoCompute.getAuthToken(true);

rhino3dm().then((rhino) => {
    
    //Get sun Position as XYZ
    //sun=sunPos.CalcPos();
    sun=[450,100,0]


    //Get the analysis Path and convert to points
    path = new rhino.Polyline();
    path.add(200, 0, 0);
    path.add(150, 400, 0);
    numPt = 5;
    for (let i = 0; i < numPt; i++) {
        let pt = path.pointAt(i / numPt);
        pathPts.push(pt);
    }

    //Create the first building footprint
    polyline = new rhino.Polyline();
    polyline.add(200, 200, 0);
    polyline.add(300, 200, 0);
    polyline.add(300, 300, 0);
    polyline.add(200, 300, 0);
    bldgs.polylines.push(polyline)

    //create the second building footprint
    polyline = new rhino.Polyline();
    polyline.add(300, 150, 0);
    polyline.add(400, 150, 0);
    polyline.add(400, 100, 0);
    polyline.add(300, 100, 0);
    bldgs.polylines.push(polyline)

    // create sun rays to path
    for (let i = 0; i < pathPts.length; i++) {
        polyline = new rhino.Polyline();
        polyline.add(sun[0],sun[1],sun[2]);
        polyline.add(pathPts[i][0],pathPts[i][1],pathPts[i][2]);
        Rays.push(polyline);
    }

     //intersect sun rays
     for (let j = 0; j < bldgs.polylines.length; j++){
        for (let i = 0; i < Rays.length; i++) {
            console.log(createIntersection(bldgs.polylines[j],Rays[i]));
        }
     }
    
   
    console.log(bldgs.polylines.length)
})

async function createIntersection(curveA,curveB) {
    let unionCurves = [];
  
    // catch errors in the compute call and deserialisation
    try {
      // send curves to compute for boolean union operation
      
      let res = await RhinoCompute.Intersection.curveCurve(curveA.toNurbsCurve(), curveB.toNurbsCurve(), 0.01, 0.01, multiple=false)
  
      // deserialise opennurbs curves individually
      for (let i=0; i<res.length; i++) {
        Intersections.push(curveA.toNurbsCurve().pointAt(res[i].ParameterA));
        console.log(curveA.toNurbsCurve().pointAt(res[i].ParameterA));
      }

      draw();
    } catch (e) {
      // log errors to console
      console.error(e);
    }
  
  
    }

// /* * * * * * * * * * * * * * * * *  drawing   * * * * * * * * * * * * * * * * */
function getCanvas() {
    return document.getElementById('canvas');
}


// clears the canvas and draws the model
function draw() {
    // get canvas' 2d context
    let canvas = getCanvas();
    let ctx = canvas.getContext('2d');

    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw building polylines
    for (let i = 0; i < bldgs.polylines.length; i++) {
        drawPolyline(ctx, bldgs.polylines[i]);
    }
    
    //draw path points
    // for (let i = 0; i < pathPts.length; i++) {
    //     drawCircle(ctx,pathPts[i])
    // }

    //draw intersection points
    for (let i = 0; i < Intersections.length; i++) {
        drawCircle(ctx,Intersections[i])
    }

    //draw sun rays
    for (let i = 0; i < Rays.length; i++) {
        drawPolyline(ctx,Rays[i])
    }

    //draw sun pt
    drawCircle(ctx,sun);

    //draw path
    drawPolyline(ctx, path);

    //creates a point or small circle
    function drawCircle(ctx, point) {
        ctx.beginPath();
        ctx.arc(point[0], point[1], 4, 0, 2 * Math.PI, false);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    // draws a polyline
    function drawPolyline(ctx, points) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        for (let i = 0; i < points.count; i++) {
            let [x, y, z] = points.get(i);
            if (0 === i)
                ctx.moveTo(x, y);
            else
                ctx.lineTo(x, y);
        }
        // draw all polylines closed
        if (points.get(0) !== points.get(points.count - 1)) {
            let [x, y, z] = points.get(0);
            ctx.lineTo(x, y, 0);
        }
        ctx.stroke();
    }
}
