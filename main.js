
var array1 = [];
const array = [];
var uncovered = 0

function setGame(b) {

    var a = "<div class=\"btn-toolbar mb-3\" role=\"toolbar\" aria-label=\"Toolbar with button groups\"><div class=\"btn-group-vertical\" id = \"buttonsSet\"><div class=\"btn-group me-2\" role=\"group\" aria-label=\"First group\">";
    var mapHeight, mapWidth, nrMines, mapSize;
    if (b == 1) {
        mapHeight = 9, mapWidth = 9, nrMines = 10;
    }
    if (b == 2) {
        mapHeight = 16, mapWidth = 16, nrMines = 40;
    }
    if (b == 3) {
        mapHeight = 16, mapWidth = 30, nrMines = 99;
    }
    mapSize = mapHeight * mapWidth;
    insertMines(mapHeight, mapWidth, nrMines);
    randomizeMap(mapHeight, mapWidth);
    addNrMinesNear(mapHeight, mapWidth);
    var p = 1;
    for (var i = 0; i < mapHeight; ++i) {
        for (var j = 0; j < mapWidth; ++j) {
            array[p] = array1[i][j];
            ++p;
        }
    }
    for (var i = 1; i <= mapSize; ++i) {
        a += "<button type=\"button\" class=\"btn btn-outline-secondary\"  oncontextmenu=\"return flagThis(this); return false;\" onclick=\"return showValue(this, " + mapHeight + ", " + mapWidth + ", " + nrMines +");\"style=\"width: 2.4rem; height: 2.4rem;\" id=\"" + i + "\"></button>";
        if (i % mapWidth == 0) {
            a += "</div> <div class=\"btn-group me-2\" role=\"group\" aria-label=\"First group\">";
        }
    }
    a += "</div></div>"
    document.getElementById("page1").innerHTML=a;
    document.getElementById("whatToDo").innerHTML="Now you have to find where are the mines and not press on them";
    return false;
}

function insertMines(mapHeight, mapWidth, nrMines) {
    var mines = 1;
    for (var i = 0; i < mapHeight; ++i) {
        array1.push([]);
        array1[i].push( new Array(mapWidth));
        for (var j = 0; j < mapWidth; ++j) {
            if (mines <= nrMines) {
                array1[i][j] = 'M';
            } else {
                array1[i][j] = 0;
            }
            ++mines;
        }
    }
}

function randomizeMap (mapHeight, mapWidth) {
    for (var i = 0; i < mapHeight; ++i) {
        for (var j = 0; j < mapWidth; ++j) {
            var q = Math.floor(Math.random() * mapHeight);
            var w = Math.floor(Math.random() * mapWidth);
            var tempq = array1[i][j];
            var tempw = array1[q][w];
            array1[i][j] = tempw;
            array1[q][w] = tempq;
        }
    }
}

function addNrMinesNear(mapHeight, mapWidth) {
    for (var i = 0; i < mapHeight; ++i) {
        for (var j = 0; j < mapWidth; ++j) {
            if (array1[i][j] == 'M') {
                if (j != 0 && array1[i][j - 1] != 'M') {
                    ++array1[i][j - 1];
                }
                if (j != mapWidth-1 && array1[i][j + 1] != 'M') {
                    ++array1[i][j + 1];
                }
                if (i != mapHeight-1 && array1[i + 1][j] != 'M') {
                    ++array1[i + 1][j];
                }
                if (i != mapHeight-1 && j != 0 && array1[i + 1][j - 1] != 'M') {
                    ++array1[i + 1][j - 1];
                }
                if (j != 0 && i != 0 && array1[i - 1][j - 1] != 'M') {
                    ++array1[i - 1][j - 1];
                }
                if (i != 0 && array1[i - 1][j] != 'M') {
                    ++array1[i - 1][j];
                }
                if (i != 0 && j != mapWidth-1 && array1[i - 1][j + 1] != 'M') {
                    ++array1[i - 1][j + 1];
                }
                if (i != mapHeight-1 && j != mapWidth-1 && array1[i + 1][j + 1] != 'M') {
                    ++array1[i + 1][j + 1];
                }
            }
        }
    }
}

function uncover(v, mapHeight, mapWidth) {
    var g = Number(v);
    if (document.getElementById(g).disabled==false) {
        document.getElementById(g).disabled=true;
        document.getElementById(g).innerHTML=array[g];
        ++uncovered;
    }
    if ((g-1) % mapWidth != 0 && document.getElementById(g-1).disabled==false) {
        discover(g-1, mapHeight, mapWidth);
    }
    if ((g+1) % mapWidth != 1 && document.getElementById(g+1).disabled==false) {
        discover(g+1, mapHeight, mapWidth);
    }
    if ((g+mapWidth) / (mapWidth * mapHeight) <= 1 && document.getElementById(g+mapWidth).disabled==false) {
        discover(g+mapWidth, mapHeight, mapWidth);
    }
    if ((g+mapWidth-1) / (mapWidth * mapHeight) < 1 && (g+mapWidth-1) % mapWidth != 0 && document.getElementById(g+mapWidth-1).disabled==false) {
        discover(g+mapWidth-1, mapHeight, mapWidth);
    }
    if ((g+mapWidth+1) / (mapWidth * mapHeight) <= 1 && (g+mapWidth+1) % mapWidth != 1 && document.getElementById(g+mapWidth+1).disabled==false) {
        discover(g+mapWidth+1, mapHeight, mapWidth);
    }
    if ((g-mapWidth) > 0 && document.getElementById(g-mapWidth).disabled==false) {
        discover(g-mapWidth, mapHeight, mapWidth);
    }
    if ((g-mapWidth-1) > 0 && (g-mapWidth-1) % mapWidth != 0 && document.getElementById(g-mapWidth-1).disabled==false) {
        discover(g-mapWidth-1, mapHeight, mapWidth);
    }
    if ((g-mapWidth+1) > 0 && (g-mapWidth+1) % mapWidth != 1 && document.getElementById(g-mapWidth+1).disabled==false) {
        discover(g-mapWidth+1, mapHeight, mapWidth);
    }
}

function discover(id, mapHeight, mapWidth) {
    document.getElementById(id).disabled=true;
    document.getElementById(id).innerHTML=array[id];
    ++uncovered;
    if (array[id] == 0) {
        uncover(id, mapHeight, mapWidth);
    }
}

function showValue(e, mapHeight, mapWidth, nrMines) {
    if (array[e.id] == 'M') {
        document.getElementById(e.id).style.backgroundColor="red";
        document.getElementById("whatToDo").innerHTML="<H4 style=\"font-size: 50px;\">GAME OVER</H4> <button class=\"btn btn-primary\" type=\"button\" onclick=\"return restart();\">Restart Game</button>"
        for (var i = 0; i <= mapHeight * mapWidth; ++i) {
            if (array[i] == 'M') {
                document.getElementById(i).disabled=true;
                document.getElementById(i).innerHTML=array[i];
            } 
        }
    } else if (array[e.id] == 0) {
        uncover(e.id, mapHeight, mapWidth);
    }
    if (document.getElementById(e.id).disabled==false) {
        document.getElementById(e.id).disabled=true;
        document.getElementById(e.id).innerHTML=array[e.id];
        ++uncovered;
    }
    if (mapHeight * mapWidth - uncovered == nrMines) {
        document.getElementById("whatToDo").innerHTML="<H4 style=\"font-size: 50px;\">Congratulation!</H4> <button class=\"btn btn-primary\" type=\"button\" onclick=\"return restart();\">Restart Game</button>"
        
    }
    return false;
}

function flagThis(e) {
    
    if (document.getElementById(e.id).innerHTML=="<img src=\"redFlag.png\">") {
        document.getElementById(e.id).innerHTML=""
    } else {
        document.getElementById(e.id).innerHTML="<img src=\"redFlag.png\">"
    }
    return false;
}

function restart() {
    location.reload();
    return false;
}
