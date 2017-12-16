
let Point = function(x,y){
    this.x = x;
    this.y = y;
};

let Circle = function(x,y,radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
};

/* DELAUNAY


    cilj :  za dati skup tacaka, naci skup trouglova
    tako da svaki opisani krug oko trouglova ne sadrzi
    nijednu tacku iz skupa tacaka

    algoritam:
        1. dodati super trougao koji sadrzi sve tacke
            u resenje
        2. za sve tacke u skupu(bez supertrougla)
            Ako bilo koji od opisanih krugova trouglova iz resenja sadrzi tacku
                obrisi trougao iz resenja
                koristiti njegove grane da se naprave novi trouglovi sa tom tackom

        3. izbrisati super trougao iz resenja


 */

let Delaunay = function( exports ){

    let EPSILON = 0.00001;
    let SUPER_TRIANGLE_RADIUS = 1000000;

    let indices;
    let circles;

    //racuna triangulaciju
    exports.compute = function( points, cleanup ){


        //manje od tri tacke..
        let nv = points.length;
        if (nv < 3) return null;

        //tacno tri tacke
        if (nv === 3) return [0,1,2];

        //kreiranje super trougla
        let d = SUPER_TRIANGLE_RADIUS;

        //dodavanje tacaka super trougla
        let p0 = new Point( 0, -d );
        let p1 = new Point( d, d );
        let p2 = new Point( -d, d );

        points.push( p0 );
        points.push( p1 );
        points.push( p2 );

        //indeksi tacaka super trougla se cuvaju
        indices = [];
        indices.push( points.length - 3 );
        indices.push( points.length - 2 );
        indices.push( points.length - 1 );

        //cuva opisane krugove
        //inicijalno krug opisan oko super trougla
        circles = [];
        circles.push( computeCircumcircle( p0, p1, p2 ) );

        //tmpIndices
        let currentIndex, j, k, id0, id1, id2;
        //za svaku tacku u skupu tacaka (bez tacaka super trougla)
        for ( currentIndex = 0; currentIndex < nv; currentIndex++ ){


            // proveri trouglove koji su kreirani do sad
            // i provera da li je trenutna tacka sadrzana
            // u bilo kom krugu postojecih trouglova
            let currentPoint = points[ currentIndex ];

            // ako neki postojeci trougao vec sadrzi tacku
            // koristimo indekse trougla kasnije za pravljenje novih trouglova
            let tmpIndices = [];

            j = 0;
            while( j < indices.length ){

                //indeks trougla smestamo u circleId
                //~~ floor bitwise
                let circleId = ~~( j / 3 );

                //ako je trougao dovoljno veliki
                if( circles[ circleId ].radius > EPSILON

                    //i ako trougao sadrzi tacku
                    &&  circleContains( circles[ circleId ], currentPoint )	){

                    id0 = indices[ j ];
                    id1 = indices[ j + 1 ];
                    id2 = indices[ j + 2 ];

                    //sacuvamo stranice trougla

                    // A-B
                    tmpIndices.push( id0 );
                    tmpIndices.push( id1 );

                    // B-C
                    tmpIndices.push( id1 );
                    tmpIndices.push( id2 );

                    // C-A
                    tmpIndices.push( id2 );
                    tmpIndices.push( id0 );

                    // i izbrisemo iz validnih trouglova
                    indices.splice( j, 3 );

                    // obrisemo i krug koji odgovara  trouglu
                    circles.splice( circleId, 1 );

                    // smanjimo iterator zbog izbacenog trougla
                    j -= 3;
                }//end if za nevalidne trouglove
                j += 3;
            }//end while

            //izbrisati duple stranice da bi se sprecile beskonacne petlje
            //za svaku stranicu provera da li koriste iste tack
            //( A-B, B-C, C-A )

            //2 while za svaku granu obidje sve grane da proveri
            //da li postoje duplikati

            j = 0;

            while ( j < tmpIndices.length ){


                k = ( j + 2 );

                while ( k < tmpIndices.length ){

                    if(	(	tmpIndices[ j ] === tmpIndices[ k ] && tmpIndices[ j + 1 ] === tmpIndices[ k + 1 ]	)
                    ||	(	tmpIndices[ j + 1 ] === tmpIndices[ k ] && tmpIndices[ j ] === tmpIndices[ k + 1 ]	)	){

                        //brisemo dve grane*
                        tmpIndices.splice( k, 2 );

                        tmpIndices.splice( j, 2 );
                        //*

                        j -= 2;
                        k -= 2;

                    }
                    k += 2;
                }

                j += 2;
            }

            // za sve validne parove indeksa kreiramo trouglove
            // i racunamo opisane krugove

            j = 0;
            while( j < tmpIndices.length ){

                //dodaje trenutnu tacku u resenje
                indices.push( currentIndex );

                //dodaje index stranice iz tmpIndices u resenje
                let tmpId0 = tmpIndices[ j ];
                let tmpId1 = tmpIndices[ j + 1 ];

                indices.push( tmpId0 );
                indices.push( tmpId1 );

                // uzima tacke na osnovu stranice
                p1 = points[ tmpId0 ];
                p2 = points[ tmpId1 ];

                //racunamo opisan krug na osnovu 3 tacke
                let circle = computeCircumcircle( currentPoint, p1, p2 );
                circles.push( circle );
                j += 2;

            }

        }//za svaku tacku u points end


        // brise sve trouglove koji sadrze neku tacku super trougla
        if( cleanup  === true ){

            //id-evi super trougla
            id0 = points.length - 3;
            id1 = points.length - 2;
            id2 = points.length - 1;

            //ako neki id od trouglova iz resenja
            //pripada super trouglu => brisemo ga

            currentIndex = 0;

            while( currentIndex < indices.length ){

                let tri_0 = indices[ currentIndex ];
                let tri_1 = indices[ currentIndex + 1 ];
                let tri_2 = indices[ currentIndex + 2 ];

                if( tri_0 === id0 || tri_0 === id1 || tri_0 === id2
                ||	tri_1 === id0 || tri_1 === id1 || tri_1 === id2
                ||	tri_2 === id0 || tri_2 === id1 || tri_2 === id2 ){

                    indices.splice( currentIndex, 3 );
                    circles.splice( currentIndex/3, 1 );

                    if( currentIndex > 0 )
                      currentIndex-=3;

                    continue;
                }

                currentIndex += 3;
            }

            //obrisemo super trougao iz resenja
            points.pop();
            points.pop();
            points.pop();

        }
        //dodajemo u object exports krugove
        exports.circles = circles;

        //indeksi koji se koriste za crtanje trouglova
        return indices;

    };//end compute

    /**
     * provera da li krug sadrzi tacku
     * @param c krug
     * @param p tacka
     * @returns {Boolean} tacno ako krug sadrzi tacku
     * https://math.stackexchange.com/questions/198764/how-to-know-if-a-point-is-inside-a-circle#answer-198769
     */
    function circleContains( c, p ){
        let dx = c.x - p.x;
        let dy = c.y - p.y;

        return c.radius > dx * dx + dy * dy;
    }

    /**
     * racuna opisani krug
     * @param p0
     * @param p1
     * @param p2
     * @returns {Circle} krug opisan oko tri tacke
     */
    function computeCircumcircle( p0, p1, p2 ){
        //https://en.wikipedia.org/wiki/Circumscribed_circle#Cartesian_coordinates_2

        let A = p1.x - p0.x;//Bx-Ax
        let B = p1.y - p0.y;//By-Ay

        let C = p2.x - p0.x;//Cx-Ax
        let D = p2.y - p0.y;//Cy-Ay

        let E = A * (p0.x + p1.x) + B * (p0.y + p1.y);//Bx²-Ax² + By²-Ay²
        let F = C * (p0.x + p2.x) + D * (p0.y + p2.y);//Cx²-Ax² + Cy²-Ay²

        //D.jpg
        let G = 2.0 * (A * (p2.y - p1.y) - B * (p2.x - p1.x));

        //calcXY.jpg
        let x = (D * E - B * F) / G;
        let y = (A * F - C * E) / G;

        let dx = x - p0.x;
        let dy = y - p0.y;

        let radius = dx * dx + dy * dy;


        return new Circle( x, y, radius );

    }


    return exports;

}({});
//IIFE prosledjen prazan obj vraca exports;

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


let w = 5000;
let h = 2800;

let canvas = document.createElement("canvas");
canvas.width = w;
canvas.height = h;
document.body.appendChild( canvas );
let ctx = canvas.getContext("2d");

//random generisanje tacaka

let points = [];
for( let i = 0; i < 50; i++ ){
    let p = new Point( Math.random() * w, Math.random() * h );
    points.push( p );
}

//racuna indekse trouglova (uredjeni par trojki) iz skupa tacaka
//true ocisti super trougao iz resenja
let result = Delaunay.compute( points, true );

ctx.globalAlpha = 1;
ctx.beginPath();

let objForExport = {};

for( i = 0; i < result.length; i+= 3 ){

    let i0 = result[i];
    let i1 = result[i+1];
    let i2 = result[i+2];

    let p0 = points[ i0 ];
    let p1 = points[ i1 ];
    let p2 = points[ i2 ];


    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p0.x, p0.y);


    objForExport["indeksi"] =  result;
    objForExport["tacke"]= points;

}
ctx.stroke();

//za crtanje krugova
ctx.globalAlpha = .1;

Delaunay.circles.forEach(function(c){
    ctx.beginPath();
    ctx.arc( c.x, c.y, Math.sqrt( c.radius ), 0., Math.PI * 2 );
    ctx.stroke();
});

//funkcija save cuva u .json indekse(uredjeni par trojki)
// i tacke (x,y)

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


        let blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)

console.log(objForExport);

//console.save(objForExport,"indicesPlusPoints.json");
