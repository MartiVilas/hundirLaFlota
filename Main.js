//Objeto con la informacion de los barcos
let barcos = [
  { name: "Portaaviones", size: 5 },
  { name: "Acorazado", size: 4 },
  { name: "Crucero", size: 3 },
  { name: "Submarino", size: 3 },
  { name: "Destructor", size: 2 },
];

// Clase casilla
class Casilla {
  constructor(x, y, ocupada = false, impactada = false, nombreBarco = "") {
    this.x = x;
    this.y = y;
    this.ocupada = ocupada;
    this.impactada = impactada;
    this.nombreBarco = nombreBarco;
  }
}

// Clase tablero
class Tablero {
  constructor(size) {
    this.size = size;
    this.casillas = this.crearTablero();
  }

  //Metodo para crear el tablero
  crearTablero() {
    let matriz = [];
    for (let x = 0; x < this.size; x++) {
      let fila = [];
      for (let y = 0; y < this.size; y++) {
        fila.push(new Casilla(x, y));
      }
      matriz.push(fila);
    }
    return matriz;
  }
  // Metodo para conesguir la posicion y la direccion en la que ira el barco
  colocarBarco(barco) {
    let direccion = Math.random() < 0.5 ? "horizontal" : "vertical";
    let x, y;
    let colocado = false;

    // Repetir hasta colocar el barco
    while (!colocado) {
      x = Math.floor(Math.random() * this.size);
      y = Math.floor(Math.random() * this.size);

      // Variable para ver si hay espacio suficiente
      let espacioLibre = true;

      // Mirar si hay espacio dependiendo de la dirección en este caso horizontal despues miraremos vertical.
      if (direccion === "horizontal" && y + barco.size <= this.size) {
        espacioLibre = true;

        // Miramos si las casillas en la fila están ocupadas
        for (let i = 0; i < barco.size; i++) {
          if (this.casillas[x][y + i].ocupada) {
            espacioLibre = false;
          }
        }

        // Si hay espacio, ponemos el barco
        if (espacioLibre) {
          for (let i = 0; i < barco.size; i++) {
            this.casillas[x][y + i].ocupada = true;
            this.casillas[x][y + i].nombreBarco = barco.name;
          }
          colocado = true;
        }
        // Mirar si hay espacio dependiendo de la dirección en este caso vertial una bez ya comprovado el horizontal
      } else if (direccion === "vertical" && x + barco.size <= this.size) {
        espacioLibre = true;

        // Miramos si las casillas en la columna están ocupadas
        for (let i = 0; i < barco.size; i++) {
          if (this.casillas[x + i][y].ocupada) {
            espacioLibre = false;
          }
        }

        // Si hay espacio, ponemos el barco
        if (espacioLibre) {
          for (let i = 0; i < barco.size; i++) {
            this.casillas[x + i][y].ocupada = true;
            this.casillas[x + i][y].nombreBarco = barco.name;
          }
          colocado = true;
        }
      }
    }
  }
}


// Función para agregar el tablero al DOM
function añadirAlDom(id, tablero) {
  const container = document.getElementById(id);
  container.innerHTML = ""; 

  // Pasar por todas las casillas del tablero para ponerlas en el contenedor
  for (let x = 0; x < tablero.size; x++) {
    let fila = document.createElement("div");
    fila.classList.add("fila");

    for (let y = 0; y < tablero.size; y++) {
      let casilla = document.createElement("div");
      casilla.classList.add("casilla");

      // Si la casilla esta ocupada, poner el nombre del barco
      if (tablero.casillas[x][y].ocupada) {
        casilla.textContent = tablero.casillas[x][y].nombreBarco;
        casilla.style.backgroundColor = "lightblue";
      } else {
        casilla.textContent = "";
        casilla.style.backgroundColor = "white";
      }
      fila.appendChild(casilla);
    }
    container.appendChild(fila);
  }
}

function init() {
  let tablero = new Tablero(10);

  // Poner los barcos en el tablero de forma randome
  barcos.forEach((barco) => {
    tablero.colocarBarco(barco);
  });

  //Poner el tablero creado en el dom y mostrar la estructura por consola.
  console.log(tablero.casillas);
  añadirAlDom('tablero',tablero);
}
