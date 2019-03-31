//const rhino3dm = require("rhino3dm");


var polyline = null;

var bldgs ={
    polylines:[]
    };
//var sun = [150,200,0]

var path =null;
var pathPts=[];
        
rhino3dm().then((rhino) => {

    path =  new rhino.Polyline();
    path.add(200,0,0);
    path.add(200,200,0);
    numPt=20;
    for (let i=0; i<numPt; i++) {
        let pt= path.pointAt(i/numPt);
        // let cir = new rhino.Circle(3);
        // cir.center=pt;
        // let pl = new rhino.Polyline();
        // pl.createCircumscribedPolygon(cir, 8);
        pathPts.push(pt);
    }

    polyline = new rhino.Polyline();

    polyline.add(0,0,0);
    polyline.add(100,0,0);
    polyline.add(100,100,0);
    polyline.add(0,100,0);
    bldgs.polylines.push(polyline)

    polyline = new rhino.Polyline();

    polyline.add(300,0,0);
    polyline.add(400,0,0);
    polyline.add(400,100,0);
    polyline.add(300,100,0);
    bldgs.polylines.push(polyline)
    // setTimeout(draw ,3000) 
    
    draw();
//  // construct a polyline from the points list
    
//  for (let i=0; i<model.points.count; i++) {
//    let [x, y, z] = model.points[i];
//    polyline.add(x, y, z);
//  }
console.log(bldgs.polylines.length)
})

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
    
    // draw saved polylines
    for (let i=0; i<bldgs.polylines.length; i++) {
        drawPolyline(ctx, bldgs.polylines[i]);
    }
    
    for (let i=0; i<pathPts.length; i++) {
        ctx.beginPath();
        ctx.arc(pathPts[i][0], pathPts[i][1], 4, 0, 2 * Math.PI, false);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }


    drawPolyline(ctx, path);
    
    
    
    // draws a polyline
    function drawPolyline(ctx, points) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    for (let i=0; i<points.count; i++) {
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
