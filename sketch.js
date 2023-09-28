// Fractal BLiPiP Web (demo)
// Martin Julio
// 25-9-23
// licencia GPL3.0
// https://editor.p5js.org/martin_julio/sketches/Xe8LTYz3J

let profMax = 8; // CUIDADO ! ! !
let densidad = 7;
let res = 1000;
let calculando = false;
let negacion = false;
let sobreCirc = false;
let cantClick = 0;
let contador = 0;

function setup() {
  createCanvas(res, res);
  windowResized();
  background(0);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  noStroke();
}

function draw() {
  translate(res / 2, res / 2);
  let distMouse = dist(mouseX, mouseY, res / 2, res / 2);
  if (distMouse < res / 2) sobreCirc = true;
  else sobreCirc = false;
  if (contador && !sobreCirc) clearTimeout(contador);
  if (frameCount == 1) primNiv();
  cursor(ARROW);
  if (sobreCirc) cursor(HAND);
  if (calculando || (mouseIsPressed && sobreCirc)) cursor(WAIT);
}

function primNiv() {
  sobreCirc = true;
  mouseButton = LEFT;
  touchEnded();
  fill(0);
  textSize(res / 5);
  textStyle(BOLD);
  text("Fractal", 0, - res / 6 - res / 16);
  text("BLiPiP", 0,  - res / 16);
  text("Web", 0, res / 6 - res / 16);
  textSize(res / 18);
  textStyle(ITALIC );
  text("Presiona sobre el circulo", 0, res / 5 + res / 16);
  text("para continuar", 0, res / 5 + res / 8);
  textSize(res / 28);
  textStyle(NORMAL);
  text("Profundidad", - res / 3 - res / 24, res / 5 - res / 8);
  text(profMax, - res / 3 - res / 24, res / 5 - res / 12);
  text("Densidad", + res / 3 + res / 24,  res / 5 - res / 8);
  text(densidad, res / 3 + res / 24, res / 5 - res / 12);
  textStyle(NORMAL);
  text("2 . 5 . O . 2 . 5", 0, - res / 3 - res / 16)
}

function touchStarted() {
  if (mouseButton != LEFT) negacion = true;
  if (calculando || !sobreCirc) negacion = true;
  if (cantClick == profMax) contador = setTimeout(reiniciar, 1500);
}

function reiniciar() {
  calculando = false;
  cantClick = 0;
  setup();
  translate(res / 2, res / 2);
  primNiv();
  negacion = true;
}

function touchEnded() {
  if (contador) clearTimeout(contador);
  if (!negacion && sobreCirc) calculando = true;
  else {
    negacion = false;
    return false;
  }
  if (cantClick < profMax) {
    cantClick++;
    fractal(0, 0, 0, cantClick);
  }
  if (cantClick == profMax) {
    alert("\nManten presionado sobre el circulo para reiniciar." +
          "\nRevisa el codigo para modificar profundidad y/o densidad." +
          "\nhttps://editor.p5js.org/martin_julio/sketches/Xe8LTYz3J" +
          "\n\n[  NIVEL " + cantClick+" DE "+profMax+"  ]"); 
  }
  else if (cantClick > 5) {
    alert("\n[  NIVEL " + cantClick + " DE " + profMax + "  ]");
  }
  calculando = false;
  return false;
}

function fractal (pX, pY, nivel, total) { 
  if (total <= nivel) return; // CUIDADO ! ! ! NO QUITAR NUNCA ! ! !
  let diam = res / Math.pow(3, nivel);  
  let col = (255 / total) * (nivel + 1);
  fill(col);
  circle(pX, pY, diam);
  for (let i = 0; i < densidad; i++) {
    if (i == 0) fractal(pX, pY, nivel + 1, total);
    else {
      let rot = i * 60;
      let npX = pX + cos(rot) * (diam / 3);
      let npY = pY + sin(rot) * (diam / 3);
      fractal(npX, npY, nivel + 1, total);
    }
  }
}

function windowResized() {
  const pg = document.getElementById("pg");
  const cnv = document.getElementById("defaultCanvas0");
  pg.style.backgroundColor = "rgb(0,0,0)";
  pg.style.display = "flex";
  pg.style.justifyContent = "center";
  pg.style.alignItems = "center";
  pg.style.overflow = "hidden";
  pg.style.width = "100vw";
  pg.style.height = "100vh";
  cnv.style.margin = "2vw";
  if (windowWidth > windowHeight ) {
    cnv.style.height = "96vh";
    cnv.style.width = "96vh";
  } else {
    cnv.style.height = "96vw";
    cnv.style.width = "96vw";
  }
}
