var data = (function(){


/*
    Sirovi podaci o čvorovima grafa.
    Redosled od nodes određuje redosled formiranja potega
*/

/* Indeksi sirovih cvorova */
var myIndex = [
    14,
    13,
    3,
    14,
    3,
    5,
    18,
    14,
    5,
    18,
    9,
    14,
    21,
    11,
    2,
    21,
    2,
    15,
    21,
    15,
    6,
    23,
    12,
    8,
    24,
    23,
    16,
    25,
    14,
    9,
    25,
    18,
    1,
    25,
    9,
    18,
    27,
    13,
    14,
    27,
    14,
    25,
    28,
    0,
    13,
    28,
    13,
    27,
    28,
    27,
    25,
    28,
    25,
    11,
    30,
    4,
    3,
    31,
    21,
    6,
    31,
    6,
    26,
    31,
    26,
    10,
    34,
    29,
    22,
    34,
    22,
    4,
    34,
    30,
    19,
    34,
    4,
    30,
    34,
    33,
    29,
    35,
    20,
    16,
    35,
    16,
    7,
    35,
    33,
    20,
    35,
    29,
    33,
    36,
    26,
    24,
    36,
    19,
    26,
    36,
    34,
    19,
    36,
    20,
    33,
    36,
    33,
    34,
    37,
    4,
    22,
    37,
    22,
    29,
    37,
    29,
    35,
    38,
    32,
    17,
    39,
    38,
    1,
    39,
    32,
    38,
    40,
    18,
    5,
    40,
    1,
    18,
    40,
    39,
    1,
    40,
    5,
    39,
    41,
    28,
    11,
    41,
    0,
    28,
    41,
    31,
    10,
    41,
    10,
    0,
    41,
    11,
    21,
    41,
    21,
    31,
    42,
    16,
    20,
    42,
    20,
    36,
    42,
    36,
    24,
    42,
    24,
    16,
    43,
    3,
    13,
    43,
    13,
    0,
    43,
    0,
    10,
    43,
    30,
    3,
    43,
    10,
    30,
    44,
    26,
    19,
    44,
    19,
    30,
    44,
    30,
    10,
    44,
    10,
    26,
    45,
    7,
    16,
    45,
    23,
    8,
    45,
    16,
    23,
    46,
    15,
    12,
    46,
    12,
    23,
    46,
    23,
    24,
    46,
    6,
    15,
    46,
    26,
    6,
    46,
    24,
    26,
    47,
    5,
    3,
    47,
    3,
    17,
    47,
    17,
    32,
    47,
    39,
    5,
    47,
    32,
    39,
    48,
    2,
    8,
    48,
    8,
    12,
    48,
    15,
    2,
    48,
    12,
    15,
    49,
    17,
    3,
    49,
    3,
    4,
    49,
    4,
    37,
    49,
    1,
    38,
    49,
    38,
    17
]
var myRawNodes = [{
        "x": 2153.822008603159,
        "y": 433.80571613719906
    },
    {
        "x": 150.07358721762097,
        "y": 2500.282921813898
    },
    {
        "x": 4949.050425813224,
        "y": 50.79934402157554
    },
    {
        "x": 1728.7754032120051,
        "y": 1750.0899428205128
    },
    {
        "x": 2248.2108093798324,
        "y": 2193.128311938005
    },
    {
        "x": 1000.570192002199,
        "y": 1300.534820913053
    },
    {
        "x": 3532.496934885506,
        "y": 338.84119109631825
    },
    {
        "x": 4581.030291912619,
        "y": 2533.240424315444
    },
    {
        "x": 4989.957809002519,
        "y": 1616.4971254099655
    },
    {
        "x": 578.7065972369776,
        "y": 700.397039116906
    },
    {
        "x": 2289.098771239129,
        "y": 928.6907910092892
    },
    {
        "x": 2413.1206527917816,
        "y": 14.747726629068314
    },
    {
        "x": 4500.832869767589,
        "y": 883.3108916293703
    },
    {
        "x": 1765.8037022372075,
        "y": 571.5825564220453
    },
    {
        "x": 1158.2118935328067,
        "y": 424.51267866065143
    },
    {
        "x": 4454.503122970065,
        "y": 278.1493784904945
    },
    {
        "x": 4100.811681689389,
        "y": 2021.176412527423
    },
    {
        "x": 1300.9563586587647,
        "y": 2200.8047761121315
    },
    {
        "x": 472.1781631368771,
        "y": 1186.5050855260733
    },
    {
        "x": 3092.8597877591214,
        "y": 1516.3074513337554
    },
    {
        "x": 3646.433993847561,
        "y": 2140.7452354234715
    },
    {
        "x": 3203.9474790309428,
        /* 21 */
        "y": 150.69366049159096
    },
    {
        "x": 2314.0578192577877,
        "y": 2417.7955009056977
    },
    {
        "x": 4200.414049132981,
        "y": 1600.7851220775244
    },
    {
        "x": 3819.7771939504623,
        "y": 1264.0853893524181
    },
    {
        "x": 150.054894055667,
        "y": 100.12670284143076
    },
    {
        "x": 3281.5603309163976,
        "y": 963.4252379535939
    },
    {
        "x": 1627.698037106572,
        "y": 334.6370414122856
    },
    {
        "x": 1882.8682144127906,
        "y": 230.73389076675684
    },
    {
        "x": 2574.5158291339076,
        "y": 2651.1246084763134
    },
    {
        "x": 2606.729318822071,
        "y": 1475.5748497150362
    },
    {
        "x": 2900.5393777542413,
        /* 31 */
        "y": 500.59766247723076
    },
    {
        "x": 1015.34826149141,
        "y": 2193.4452994554827
    },
    {
        "x": 3234.5827160244435,
        "y": 2300.0889929832088
    },
    {
        "x": 2651.2472186220693,
        "y": 2073.8545081806847
    },
    {
        "x": 3751.5417062416823,
        "y": 2729.8832681285744
    },
    {
        "x": 3270.082294069412,
        "y": 1672.5706794059242
    },
    {
        "x": 2114.7009972760466,
        "y": 2760.2393935815467
    },
    {
        "x": 1029.5101051236065,
        "y": 2445.379872625326
    },
    {
        "x": 757.5950128604014,
        "y": 2127.805532682733
    },
    {
        "x": 535.3137767079263,
        "y": 1900.3678336235816
    },
    {
        "x": 2500.6673086132405,
        "y": 376.33786453837195
    },
    {
        "x": 3563.0911683278587,
        "y": 1772.5302455548128
    },
    {
        "x": 2085.709269219639,
        "y": 1027.0939558602615
    },
    {
        "x": 2750.1829948978593,
        "y": 1200.601474272436
    },
    {
        "x": 4934.478956999261,
        "y": 2124.567907891836
    },
    {
        "x": 3868.6460141756797,
        "y": 591.0496784297026
    },
    {
        "x": 981.632318662018,
        "y": 1918.822834627196
    },
    {
        "x": 4843.782418059872,
        "y": 777.2918169877883
    },
    {
        "x": 1485.718474330291,
        "y": 2756.959927561224
    }
]

/* obrađeni čvorovi i potezi, koriste se u algoritmima*/
var myNodes = [];
/* obrađeni potezi */
var myEdges = [];
/* rezultujući edgevi nakon mst algoritma, ovo crtam crveno */
var myResultEdges = [];


/* obrada sirovih čvorova, dobijaju se konačni*/
(function (raw) {
    raw.forEach((element, indeks) => {
        var newNode = new MSTNode(~~(element["x"]), ~~(element["y"] + 50), indeks);
        // na y koordinatu + 50 zbog translacije čvorova na top ivici ivici
        myNodes.push(newNode);
    });
})(myRawNodes);


/* kreiranje potega*/
(function(){

    for (var i = 0; i < myIndex.length; i += 3) {
        var i0 = myIndex[i];
        var i1 = myIndex[i + 1];
        var i2 = myIndex[i + 2];

        var n0 = myNodes[i0];
        var n1 = myNodes[i1];
        var n2 = myNodes[i2];

        var e0 = new MSTEdge(n0, n1, 0, 0);
        n0.addAdjacentNodeTolist(n1);
        n1.addAdjacentNodeTolist(n0);

        var e1 = new MSTEdge(n1, n2, 0, 0);
        n1.addAdjacentNodeTolist(n2);
        n2.addAdjacentNodeTolist(n1);

        var e2 = new MSTEdge(n2, n0, 0, 0);
        n2.addAdjacentNodeTolist(n0);
        n0.addAdjacentNodeTolist(n2);

        if ((myEdges.filter(function (element) {
                return element.firstNode == n1 && element.secondNode == n0;
            })).length == 0) {
            myEdges.push(e0);
            n0.addEdgeToList(e0);
            n1.addEdgeToList(e0);
        }

        if ((myEdges.filter(function (element) {
                return element.firstNode == n2 && element.secondNode == n1;
            })).length == 0) {
            myEdges.push(e1);
            n1.addEdgeToList(e1);
            n2.addEdgeToList(e1);
        }

        if ((myEdges.filter(function (element) {
                return element.firstNode == n0 && element.secondNode == n2;
            })).length == 0) {
            myEdges.push(e2);
            n2.addEdgeToList(e2);
            n0.addEdgeToList(e2);
        }
    }

    myEdges.forEach(function (tmpEdge, index) {
        tmpEdge.setIdAndWeight(index);
    });

    myNodes.forEach(function (tmpNode) {
        tmpNode.removeDuplicates();
    });
    console.log(myNodes);
    console.log(myEdges);
})();

  return {
    myNodes,
    myEdges
  }

})();
