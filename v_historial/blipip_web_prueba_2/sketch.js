// blipip web
// prueba 2
// 25-9-23

// cantidad circulos internos
densidad = 7;

// profundidad fractal: entre 1 y 6 (cantidad total de niveles)
let profMax = 8; // !!!
let cant = 1;

//resolution: entre 200 y 1800
let res = 6000;

function setup() {
  createCanvas(res, res);
  angleMode(DEGREES);
  noStroke();
  background(200);
  translate(res / 2, res / 2);
  windowResized()
  mouseClicked();
}

function mouseClicked() {
  alert("entrada nivel " + cant);
  if (cant < profMax) cant++;
  
    /*        ##     ##     ##     ##     ##     ##
  fractal (pos_x, pos_y, level, total, ciclo, ident)                   // <===
  
    => pos_x: coordenada central en eje x
    => pos_y: coordenada central en eje y
    => level: nivel de profundidad en fractal
    => total: cantidad total de niveles del fractal
    => ciclo: posicion (angulo relativo) actual respecto al centro
              0 -> centro
              1 -> derecha
              2 -> abajo der
              3 -> abajo izq
              4 -> izquierda
              5 -> arriba izq
              6 -> arriba der
    => ident: secuencia unica con todas las posiciones recorridas  
    
            ##       ##      ##  ##   ## ##                       */
  // fractal(res/2, res/2, 0, cant, 0, 0);                     
  fractal(0, 0, 0, cant, 0, 0);                                        // <===
  console.log("_______________________________");
  console.log(" ");
  
  if (cant < profMax) alert("salida nivel " + (cant - 1));
  else alert("salida nivel " + (cant) + "  [final]");
}

function fractal(pX, pY, level, total, ciclo, ante) {                  // <===
  // caso base !!!
  if (level >= total) return;

  let diam = res / Math.pow(3, level);
  let col = (255 * level) / total;

  noStroke();
  fill(col);
  // if (ciclo == 0) fill(col, col * 0.8, col * 0.7);
  // else if (ciclo == 2) fill(255-col, 255-col, col);
  // else fill(col, col + ciclo * 5, col + ciclo * 10);

  circle(pX, pY, diam);

  // fill(255);
  // textSize(diam / 5);
  // text(ciclo + "-" + ante, pX, pY - diam / 5);

  console.log(":: A._._ :: inn-fun lvl=" + level + "  ciclo=" + ciclo);

  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////

  // ciclo llamadas recursivas
  for (let i = 0; i < densidad; i++) {
    console.log(":: _.B._ :: cic-for lvl=" + level + "  i=" + i);
    
    // central
    if (i == 0) {
      // (actual anterior) => [rotacion] [x_actual] [x_anterior] [desplazamiento]
      console.log("("+i+"-"+ciclo+") => [r:not] [x:"+pX+"] [xa:"+pX+"] [d:not]");
      fractal(pX, pY, level+1, total, i, ciclo);                  // <===
    }
    // laterales
    else {
      let rot = i * 60;
      let npX = pX + cos(rot) * (diam / 3);
      let npY = pY + sin(rot) * (diam / 3);
      
      // (actual anterior) => [rotacion] [x_actual] [x_anterior] [desplazamiento]
      console.log("("+i+"-"+ciclo+") => [r:"+rot+"] [x:"+npX+"] [xa:"+pX+"] [d:"+diam / 3+"]");
      
      fractal(npX, npY, level+1, total, i, ciclo);                          // <===
    }
  }
  console.log(":: _._.C :: out-fun lvl=" + level);
}

function windowResized() {
  document.getElementById("cont").style.backgroundColor = "rgb(0, 0, 0)";
  document.getElementById("cont").style.margin = "0";
  document.getElementById("cont").style.padding = "0";
  document.getElementById("cont").style.display = "flex";
  document.getElementById("cont").style.justifyContent = "center";
  document.getElementById("cont").style.alignItems = "center";
  document.getElementById("cont").style.overflow = "hidden";
  if (windowWidth > windowHeight ) {
    document.getElementById("cont").style.height = "100vh";
    document.getElementById("defaultCanvas0").style.height = "96vh";
    document.getElementById("defaultCanvas0").style.width = "96vh";
    document.getElementById("defaultCanvas0").style.margin = "2vh";
  } else {
    document.getElementById("cont").style.width = "100vw";
    document.getElementById("defaultCanvas0").style.height = "96vw";
    document.getElementById("defaultCanvas0").style.width = "96vw";
    document.getElementById("defaultCanvas0").style.margin = "2vw";
  }
}