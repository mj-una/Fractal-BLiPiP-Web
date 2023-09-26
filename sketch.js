/*     ____.-2-._______.-5-_______..-O-.._______.-2-._______.-5-.____                       
###########################################################################
##                                                                       ##
##                             martin julio                              ##
##                          Fractal BLiPiP Web                           ##
##                               prueba 3                                ##
##                                                                       ##
## [final 26-9-23 ] ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ [ 75 chars ->] */

///////////////////
// Instrucciones:
// Presionar sobre el circulo para avanzar de nivel.

///////////////////
// Ajustes:

// PROFUNDIDAD. Cantidad total de niveles
// - recomendacion probar primero con [3] (=> 343 circulos)
// - luego ir aumentando de uno en uno hasta [6] (=> 117.649 circulos)
// - aprox, a partir de [7] (=> 823.543 circulos) se puede demorar mucho

let profMax = 6; // CUIDADO ! ! !

// DENSIDAD. Cantidad de repeticiones de cada ciclo
// - desde [1] solo central, hasta [7] laterales completas 

let densidad = 7;

// RESOLUCION. Fraccionamiento interno de la imagen
// - recomendado entre [400] y [2000]. medida relativa
// - si supera la res. de pantalla no se nota diferencia
// - tamaño final (pixeles) depende del tamaño de la ventana

let res = 1000;

//_________________________________________________________________________

// Variables de estado
let calculando = false;
let negacion = false;
let sobreCirc = false;
let cantClick = 0;

//_________________________________________________________________________

function setup() {

  createCanvas(res, res); // Resolucion interna
  windowResized(); // Tamaño externo (responsive)
  background(0);
  angleMode(DEGREES);
  noStroke();
}

//_________________________________________________________________________

function draw() {

  translate(res / 2, res / 2);

  // Posicion mouse
  let distMouse = dist(mouseX, mouseY, res / 2, res / 2);
  if (distMouse < res / 2) sobreCirc = true;
  else sobreCirc = false;

  // Primer nivel
  if (frameCount == 1) mouseClicked();

  // Dibujo ursor
  cursor(ARROW);
  if (sobreCirc) {
    cursor(HAND);
    if (calculando) cursor(WAIT);
  }

// console.log("CALC="+calculando+" _NEGA="+negacion+" _CLIK="+cantClick);
}

//_________________________________________________________________________

function mousePressed() {
  
  // Estados
  if (calculando) negacion = true;
  if (mouseButton != LEFT) negacion = true;
  if (!negacion && sobreCirc) calculando = true;
}

//_________________________________________________________________________

function mouseClicked() {
  
  // Validacion
  if (negacion) {
    negacion = false;
    return;
  }

  if (cantClick < profMax) {
    console.log("entra de " + cantClick + " a " + (cantClick + 1));
    // Actualizacion
    cantClick++;
    // LLAMADA INICIO                                              <=== f()
    fractal(0, 0, 0, cantClick);
    console.log("sale de " + (cantClick - 1) + " a " + cantClick);
  }

  // Fin proceso
  if (cantClick > 5) alert("Nivel " + cantClick + " de " + profMax);
  calculando = false;
}

//_________________________________________________________________________

/* Argumentos
  => pX: coordenada central en x
  => pY: coordenada central en y
  => nivel: nivel de profundidad en fractal
  => total: cantidad total de niveles del fractal
  =============>  ##  ##   ##     ##    */
function fractal (pX, pY, nivel, total) { 

  // Caso Base
  if (total <= nivel) return; // CUIDADO ! ! ! NO QUITAR NUNCA ! ! !

  // Dibujo
  let diam = res / Math.pow(3, nivel);  
  let col = (255 / total) * (nivel + 1);
  fill(col);
  circle(pX, pY, diam);

  // Ciclo llamadas recursivas
  for (let i = 0; i < densidad; i++) {

    // LLAMADA CENTRAL                                             <=== r()
    if (i == 0) fractal(pX, pY, nivel + 1, total);
    else {
      let rot = i * 60;
      let npX = pX + cos(rot) * (diam / 3);
      let npY = pY + sin(rot) * (diam / 3);
      // LLAMADAS LATERALES                                        <=== r()
      fractal(npX, npY, nivel + 1, total);
    }
  }
}

//_________________________________________________________________________

function windowResized() {

  document.getElementById("cont").style.backgroundColor = "rgb(1, 1, 1)";
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
  }
  else {
    document.getElementById("cont").style.width = "100vw";
    document.getElementById("defaultCanvas0").style.height = "96vw";
    document.getElementById("defaultCanvas0").style.width = "96vw";
    document.getElementById("defaultCanvas0").style.margin = "2vw";
  }
}
