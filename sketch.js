/*     ____.-2-._______.-5-_______..-O-.._______.-2-._______.-5-.____
###########################################################################
##                                                                       ##
##                                                                       ##
##                             martin julio                              ##
##                                                                       ##
##                          Fractal BLiPiP Web                           ##
##                                                                       ##
##                              25 Sept 23                               ##
##                                 demo                                  ##
##                                                                       ##
###########################################################################
/* [final 11-10-23 ] ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ [ 75 chars. ancho ->] */


                            /*   licencia   */
                            /*    GPL3.0    */
                              

///////////////////
// Repositorio:
// https://github.com/mj-una/Fractal-BLiPiP-Web

///////////////////
// Instrucciones:
// Presionar sobre el circulo para avanzar de nivel.

///////////////////
// Ajustes:

// PROFUNDIDAD. Cantidad maxima de niveles
// - recomendacion probar primero con: [3] (=> 57 circulos -> para dens = 7)
// - luego ir aumentando de uno en uno hasta: [6] (=> 19.608 circulos)
// - aprox, a partir de: [7] (=> 137.257 circulos) se puede tardar bastante

let profMax = 6; // CUIDADO ! ! !

// DENSIDAD. Cantidad de repeticiones de cada ciclo
// - desde: [1] (=> solo 1 central) en adelante (=> enteros positivos)
// - ideal en 2d: [7] (=> 6 laterales optimizadas y no superpuestas) 

let dens = 7;

// RESOLUCION. Fraccionamiento interno de la imagen
// - recomendacion entre: [400] y: [2000]. medida relativa
// - si supera la res. de pantalla no se nota diferencia

let res = 1000;

//_________________________________________________________________________

// Variables de estado
let calculando = false;
let negacion = false;
let sobreCirc = false;
let cantClick = 0;
let contador = 0;

//_________________________________________________________________________

function setup() {

  createCanvas(res, res); // Resolucion interna
  windowResized(); // Tamaño externo (responsive)
  background(0);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  noStroke();
}

//_________________________________________________________________________

function draw() {

  translate(res / 2, res / 2);

  // Posicion mouse
  let distMouse = dist(mouseX, mouseY, res / 2, res / 2);
  if (distMouse < res / 2) sobreCirc = true;
  else sobreCirc = false;

  // Borra temporizador por posicion
  if (contador && !sobreCirc) clearTimeout(contador);
  
  // Primer nivel
  if (frameCount == 1) primNiv();

  // Dibujo cursor
  cursor(ARROW);
  if (sobreCirc) cursor(HAND);
  if (calculando || (mouseIsPressed && sobreCirc)) cursor(WAIT);
  
  // Test
  // if (frameCount % 30 == 0) {
  //   console.log("CALC="+calculando+" _NEGA="+negacion+
  //   " _CLIK="+cantClick+ " _MOUS: "+ sobreCirc);
  // }
}

//_________________________________________________________________________

function primNiv() {
  
  // Primera llamada
  sobreCirc = true;
  mouseButton = LEFT;
  touchEnded();
  
  // Texto centro
  fill(0);
  textSize(res / 5);
  textStyle(BOLD);
  text("Fractal", 0, - res / 6 - res / 16);
  text("BLiPiP", 0,  - res / 16);
  text("Web", 0, res / 6 - res / 16);
  
  // Texto abajo
  textSize(res / 18);
  textStyle(ITALIC );
  text("Presiona sobre el circulo", 0, res / 5 + res / 16);
  text("para continuar", 0, res / 5 + res / 8);
  
  // Texto izquierda
  textSize(res / 28);
  textStyle(NORMAL);
  text("Profundidad", - res / 3 - res / 24, res / 5 - res / 8);
  text(profMax, - res / 3 - res / 24, res / 5 - res / 12);
  
  // Texto derecha
  text("Densidad", + res / 3 + res / 24,  res / 5 - res / 8);
  text(dens, res / 3 + res / 24, res / 5 - res / 12);
  
  // Texto arriba
  textStyle(NORMAL);
  text("2 . 5 . O . 2 . 5", 0, - res / 3 - res / 16)
}

//_________________________________________________________________________

function touchStarted() {
  
  // Entrada invalida
  if (mouseButton != LEFT) negacion = true;
  if (calculando || !sobreCirc) negacion = true;
  
  // Inicia emporizador para reiniciar
  if (cantClick == profMax) contador = setTimeout(reiniciar, 1500);
}

//_________________________________________________________________________

function reiniciar() {
  
  // Ejecutar setup
  calculando = false;
  cantClick = 0;
  setup();
  
  // Primer nivel
  translate(res / 2, res / 2);
  primNiv();
  
  // Evita proximo touchEnded()
  negacion = true;
}

//_________________________________________________________________________

function touchEnded() {
  
  // Borra temporizador por tiempo
  if (contador) clearTimeout(contador);
  
  // Validacion
  if (!negacion && sobreCirc) calculando = true;
  else {
    negacion = false;
    return false;
  }
  
  // Actualizacion
  if (cantClick < profMax) {
    cantClick++;
    
    // LLAMADA FUNCION ORIGINAL
    // console.log("entra de "+(cantClick-1)+" a "+cantClick);
    fractal(0, 0, 0, cantClick, dens);                           //  <=fn()
    console.log("sale de "+(cantClick-1)+" a "+cantClick);
  }

  // Notificacion fin proceso lento
  if (cantClick == profMax) {
    alert("\nManten presionado sobre el circulo para reiniciar." +
          "\nRevisa el codigo para modificar profundidad y/o densidad." +
          "\nhttps://editor.p5js.org/martin_julio/sketches/Xe8LTYz3J" +
          "\n\n[  NIVEL " + cantClick+" DE "+profMax+"  ]"); 
  }
  else if (cantClick > 5) {
    alert("\n[  NIVEL " + cantClick + " DE " + profMax + "  ]");
  }
  
  // Fin proceso
  calculando = false;
  return false;
}

//_________________________________________________________________________
///////////////////////////////////////////////////////////////////////////
                                                                         //
                                                                         //
/* Argumentos                                                            //
  => pX: coordenada central en x                                         //
  => pY: coordenada central en y                                         //
  => nivel: nivel de profundidad en fractal                              //
  => total: cantidad total de niveles del fractal                        //
  => densidad: cantidad de nuevas recursiones por cada llamda            //
  =============>  ##  ##   ##     ##     ##       */                     //
function fractal (pX, pY, nivel, total, densidad) {                      //
                                                                         //
  // Caso Base                                                           //
  if (total <= nivel) return; // CUIDADO ! ! ! NO QUITAR NUNCA ! ! !     //
                                                                         //
  // Dibujo                                                              //
  let diam = res / Math.pow(3, nivel);                                   //
  let col = (255 / total) * (nivel + 1);                                 //
  fill(col);                                                             //
  circle(pX, pY, diam);                                                  //
                                                                         //
  // Ciclo rotacion                                                      //
  for (let i = 0; i < densidad; i++) {                                   //
                                                                         //
    // LLAMADA RECURSION CENTRAL                                         //
    if (i == 0) fractal(pX, pY, nivel + 1, total, densidad); //  <=rcr() //
                                                                         //
    // LLAMADAS RECURSIONES LATERALES                                    //
    else {                                                               //
      let rot = i * (360 / (densidad - 1));                              //
      let npX = pX + cos(rot) * (diam / 3);                              //
      let npY = pY + sin(rot) * (diam / 3);                              //
      fractal(npX, npY, nivel + 1, total, densidad);         //  <=rcr() //
    }                                                                    //
                                                                         //
    // Test                                                              //
    // console.log("__n=" + nivel + " __px=" + pX + " __py=" + pY);      //
  }                                                                      //
}                                                                        //
                                                                         //
                                                                         //
///////////////////////////////////////////////////////////////////////////

//_________________________________________________________________________

function windowResized() {
  
  // Guardar body y canvas
  const pg = document.getElementsByTagName("body")[0];
  const cnv = document.getElementById("defaultCanvas0");
  
  // Estilo body
  pg.style.backgroundColor = "rgb(0,0,0)";
  pg.style.display = "flex";
  pg.style.justifyContent = "center";
  pg.style.alignItems = "center";
  pg.style.overflow = "hidden";
  pg.style.width = "100vw";
  pg.style.height = "100vh";
  
  // Estilo canvas
  if (windowWidth > windowHeight ) {
    cnv.style.height = "96vh";
    cnv.style.width = "96vh";
  }
  else {
    cnv.style.height = "96vw";
    cnv.style.width = "96vw";
  }
}
