// blipip web
// prueba 1
// 25-9-23

// profundidad maxima: entre 1 y 7 (cantidad total de niveles)
let profMax = 6;
let cant = 1;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  noStroke();
  background(255);
  // translate(width / 2, height / 2);
  windowResized()
  mouseClicked();
}

function mouseClicked() {
  
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
    
          ## ## ##  ##   ## ##                                 */
  fractal(width/2, height/2, 0, cant, 0, 0);                                       // <===
  // fractal(0, 0, 0, cant, 0, 0);                                       
  console.log("_______________________________");
  console.log(" ");
}

function fractal(pX, pY, level, total, ciclo, ante) {                  // <===

  let diam = width / Math.pow(3, level);
  let col = 210 * (1 - level / total);
  
  if (ciclo == 0) fill(col, col * 0.8, col * 0.7);
  else if (ciclo == 2) {
    fill(255-col, 255-col, col);
    if (ante == 2) fill(255, 100);
  }
  else fill(col, col + ciclo * 5, col + ciclo * 10);

  noStroke();
  circle(pX, pY, diam);
  if (ciclo == 2 && ante == 1) {
    fill(255,0,0, 100);
    stroke(0,0,255);
    circle(pX, pY, diam * 3);
    circle(pX, pY, diam * 2.5);
  }

  fill(255);
  textSize(diam/5);
  text(ciclo + "-" + ante, pX - diam/5, pY - diam/5);

  console.log(":: A._._ :: lvl=" + level + "  ciclo=" + ciclo);

  // update
  level++;

  // caso base !!!
  if (level >= total) return;

  // recursiones
  for (let i = 0; i < 4; i++) {
    console.log(":: _.B._ :: lvl=" + level);
    
    // central
    if (i == 0) {
      // (actual anterior) => [rotacion] [x_actual] [x_anterior] [desplazamiento]
      console.log("("+i+"-"+ciclo+") => [r:not] [x:"+pX+"] [xa:"+pX+"] [d:not]");
      fractal(pX, pY, level, total, i, ciclo);                  // <===
    }
    // laterales
    else {
      let rot = i * 60;
      let npX = cos(rot) * (pX + diam / 3);
      let npY = sin(rot) * (pY + diam / 3);
      
      // (actual anterior) => [rotacion] [x_actual] [x_anterior] [desplazamiento]
      console.log("("+i+"-"+ciclo+") => [r:"+rot+"] [x:"+npX+"] [xa:"+pX+"] [d:"+diam / 3+"]");
      
      fractal(npX, npY, level, total, i, ciclo);                          // <===
    }
  }
  console.log(":: _._.C :: lvl=" + level);
}

function windowResized() {
  document.getElementById("cont").style.backgroundColor = "rgb(200, 200, 200)";
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