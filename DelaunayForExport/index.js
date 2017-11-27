
var Point = function(x,y){
    this.x = x || 0;
    this.y = y || 0;
};

var Circle = function(x,y,radius){
    this.x = x || 0;
    this.y = y || 0;
    this.radius = radius || 0;
};

/* DELAUNAY TRIANGULATION

    algorithm:

    goal :  with a set of points, find a set of triangles
            where no triangle's circumcircle contains any point of the point set.

    steps:
        1. build a super triangle that encloses all points
            add super triangle to solution
        2. for all the points of the set
            if any of the circumcircles of the triangles of the solution contain the point
                remove the triangles from solution
                use their edges to build X new triangles with the point
        3. remove the super triangle points and indices from solution
        4. have a cigar

 */

var Delaunay = function( exports ){

    var EPSILON = 0.00001;
    var SUPER_TRIANGLE_RADIUS = 1000000;

    var indices;
    var circles;

    //computes the Delaunay triangulation of a point set
    exports.compute = function( points, cleanup ){

        //early bail out:
        //if there's less than 3 points, there's no solution
        var nv = points.length;
        if (nv < 3) return null;

        //if there's exactly 3 points, there's only one solution
        if (nv === 3) return [0,1,2];

        //otherwise, creates a super triangle
        var d = SUPER_TRIANGLE_RADIUS;

        //adds the super triangle's points to the point set
        var p0 = new Point( 0, -d );
        var p1 = new Point( d, d );
        var p2 = new Point( -d, d );

        points.push( p0 );
        points.push( p1 );
        points.push( p2 );

        //stores the super triangle's indices as part of the solution
        indices = [];
        indices.push( points.length - 3 );
        indices.push( points.length - 2 );
        indices.push( points.length - 1 );

        //stores the circumcircle of the super triangle
        circles = [];
        circles.push( computeCircumcircle( p0, p1, p2 ) );

        //temp vars
        var currentIndex, j, k, id0, id1, id2;
        //for each point of the set ( not considering the points of the super triangle)
        for ( currentIndex = 0; currentIndex < nv; currentIndex++ ){


            // check all the triangles we created so far
            // to see if the current point is contained
            // by any of the circumcircles of the existing triangles
            var currentPoint = points[ currentIndex ];

            // if an existing triangle contains the point,
            // we'll store the triangle's indices int his array
            // it will later be use dto rebuild new triangles
            var tmpIndices = [];

            j = 0;
            while( j < indices.length ){

                //retrieve the circle corresponding to this triangle
                var circleId = ~~( j / 3 );

                //if the circle is big enough
                if( circles[ circleId ].radius > EPSILON

                    //and if the circumcircle contains the current Point
                    &&  circleContains( circles[ circleId ], currentPoint )	){

                    id0 = indices[ j ];
                    id1 = indices[ j + 1 ];
                    id2 = indices[ j + 2 ];

                    //stores the 3 sides of the invalid triangle
                    // A-B
                    tmpIndices.push( id0 );
                    tmpIndices.push( id1 );
                    // B-C
                    tmpIndices.push( id1 );
                    tmpIndices.push( id2 );
                    // C-A
                    tmpIndices.push( id2 );
                    tmpIndices.push( id0 );

                    // and remove it from the valid triangles' list
                    indices.splice( j, 3 );

                    // also remove the circle corresponding to this triangle
                    circles.splice( circleId, 1 );

                    // and decrement the iterator as we reduced
                    // the length of the indices' array
                    j -= 3;
                }
                j += 3;
            }

            //remove duplicate edges to prevent infinite loops:
            //for each edge, check if they use the same nodes (points)
            // (there's probably a better way to do that)

            //the '2' below corresponds to how we stored edges above ( A-B, B-C, C-A )
            j = 0;
            while ( j < tmpIndices.length ){

                k = ( j + 2 );
                while ( k < tmpIndices.length ){

                    if(	(	tmpIndices[ j ] === tmpIndices[ k ] && tmpIndices[ j + 1 ] === tmpIndices[ k + 1 ]	)
                    ||	(	tmpIndices[ j + 1 ] === tmpIndices[ k ] && tmpIndices[ j ] === tmpIndices[ k + 1 ]	)	){

                        tmpIndices.splice( k, 2 );
                        tmpIndices.splice( j, 2 );
                        j -= 2;
                        k -= 2;
                        if ( j < 0 || j > tmpIndices.length - 1 ) break;
                        if ( k < 0 || k > tmpIndices.length - 1 ) break;
                    }
                    k += 2;
                }
                j += 2;
            }

            // finally, for all the valid indices pairs left in tmpIndices
            // we create new triangles and compute their associated circumcirle
            j = 0;
            while( j < tmpIndices.length ){

                // add the current point to solution
                indices.push( currentIndex );

                // add the indices of the edge stored in tmpIndices to the solution
                var tmpId0 = tmpIndices[ j ];
                var tmpId1 = tmpIndices[ j + 1 ];

                indices.push( tmpId0 );
                indices.push( tmpId1 );

                // retrieves the points of the edges
                p1 = points[ tmpId0 ];
                p2 = points[ tmpId1 ];

                //and compute the circumcircle from the 3 points
                var circle = computeCircumcircle( currentPoint, p1, p2 );
                circles.push( circle );
                j += 2;

            }

        }

        //clean up :
        // remove all triangles that use one of the points of the super triangle
        if( Boolean( cleanup ) === true ){

            //super triangle points' ids
            id0 = points.length - 3;
            id1 = points.length - 2;
            id2 = points.length - 1;

            //if any of the indices of the solution's triangles
            //belongs to the super triangle, delete it
            currentIndex = 0;
            while( currentIndex < indices.length ){

                var tri_0 = indices[ currentIndex ];
                var tri_1 = indices[ currentIndex + 1 ];
                var tri_2 = indices[ currentIndex + 2 ];

                if( tri_0 === id0 || tri_0 === id1 || tri_0 === id2
                ||	tri_1 === id0 || tri_1 === id1 || tri_1 === id2
                ||	tri_2 === id0 || tri_2 === id1 || tri_2 === id2 ){
                    indices.splice( currentIndex, 3 );
                    circles.splice( currentIndex/3, 1 );
                    if( currentIndex > 0 ) currentIndex-=3;
                    continue;
                }
                currentIndex += 3;
            }

            //removes the points we added to the points set to create the super triangle
            points.pop();
            points.pop();
            points.pop();

        }
        //TADA !
        exports.circles = circles;//for debug only
        //have a cigar.
        return indices;

    };

    /**
     * checks if a circle contains a point
     * @param c the circle
     * @param p the point
     * @returns {Boolean} true if the cirrcle contains the point
     */
    function circleContains( c, p ){
        var dx = c.x - p.x;
        var dy = c.y - p.y;
        return c.radius > dx * dx + dy * dy;
    }

    /**
     * computes the circumcircle of a triangle
     * @param p0
     * @param p1
     * @param p2
     * @returns {Circle} the circumcircle of the triangle described by the 3 points
     */
    function computeCircumcircle( p0, p1, p2 ){

        var A = p1.x - p0.x;
        var B = p1.y - p0.y;
        var C = p2.x - p0.x;
        var D = p2.y - p0.y;

        var E = A * (p0.x + p1.x) + B * (p0.y + p1.y);
        var F = C * (p0.x + p2.x) + D * (p0.y + p2.y);
        var G = 2.0 * (A * (p2.y - p1.y) - B * (p2.x - p1.x));

        var x = (D * E - B * F) / G;
        var y = (A * F - C * E) / G;

        var dx = x - p0.x;
        var dy = y - p0.y;
        var radius = dx * dx + dy * dy;

        return new Circle( x, y, radius );
    }
    return exports;
}({});


/////////////////////////////////////////////////////////////////////

// TEST

/////////////////////////////////////////////////////////////////////


var w = 5000;//window.innerWidth;
var h = 2800;//window.innerHeight;
var canvas = document.createElement("canvas");
canvas.width = w;
canvas.height = h;
document.body.appendChild( canvas );
var ctx = canvas.getContext("2d");

var points = [];
for( var i = 0; i < 50; i++ ){
    var p = new Point( Math.random() * w, Math.random() * h );
    points.push( p );
}

//computes the triangles' indices' triplets from a point set
//true removes the super triangle / false leaves it in the result.
var result = Delaunay.compute( points, true );

ctx.globalAlpha = 1;
ctx.beginPath();
var setOfPoints = new Set();

var objForExport = {};

for( i = 0; i < result.length; i+= 3 ){

    var i0 = result[i];
    var i1 = result[i+1];
    var i2 = result[i+2];

    var p0 = points[ i0 ];
    var p1 = points[ i1 ];
    var p2 = points[ i2 ];

    setOfPoints.add(p0);
    setOfPoints.add(p1);
    setOfPoints.add(p2);


    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p0.x, p0.y);

    var arr1 = [...setOfPoints];

    objForExport["indeksi"] =  result;
    objForExport["tacke"]= arr1;

}
ctx.stroke();

//debug : shows the circumcircle
ctx.globalAlpha = .1;
Delaunay.circles.forEach(function(c){
    ctx.beginPath();
    ctx.arc( c.x, c.y, Math.sqrt( c.radius ), 0., Math.PI * 2 );
    ctx.stroke();
});

(function(console){
    console.save = function(data, filename){
        if(!data) {
            console.error('Console.save: No data')
            return;
        }
        if(!filename) filename = 'console.json'

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }


        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)

console.log(objForExport);

console.save(objForExport,"indicesPlusPoints.json");
