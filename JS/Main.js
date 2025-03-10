const barcos = [
  { name: "Portaaviones", size: 5 },
  { name: "Acorazado", size: 4 },
  { name: "Crucero", size: 3 },
  { name: "Submarino", size: 3 },
  { name: "Destructor", size: 2 },
];

// Definición de la clase Casilla
class Casilla {
  constructor(x, y, ocupada = false, impactada = false, nombreBarco = "") {
    this.x = x;
    this.y = y;
    this.ocupada = ocupada;
    this.impactada = impactada;
    this.nombreBarco = nombreBarco;
  }
}

// Definición de la clase Tablero
class Tablero {
  constructor(size) {
    this.size = size;
    this.casillas = this.crearTablero();
  }

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

  colocarBarco(barco) {
    let direccion = Math.random() < 0.5 ? "horizontal" : "vertical";
    let x, y;
    let colocado = false;

    // Repetir hasta colocar el barco
    while (!colocado) {
      x = Math.floor(Math.random() * this.size);
      y = Math.floor(Math.random() * this.size);

      // Variable para verificar si hay espacio suficiente
      let espacioLibre = true;

      // Comprobar si hay espacio dependiendo de la dirección
      if (direccion === "horizontal" && y + barco.size <= this.size) {
        espacioLibre = true;

        // Verificamos si las casillas en la fila están ocupadas
        for (let i = 0; i < barco.size; i++) {
          if (this.casillas[x][y + i].ocupada) {
            espacioLibre = false;
          }
        }

        // Si hay espacio, colocamos el barco
        if (espacioLibre) {
          for (let i = 0; i < barco.size; i++) {
            this.casillas[x][y + i].ocupada = true;
            this.casillas[x][y + i].nombreBarco = barco.name;
          }
          colocado = true;
        }
      } else if (direccion === "vertical" && x + barco.size <= this.size) {
        espacioLibre = true;

        // Verificamos si las casillas en la columna están ocupadas
        for (let i = 0; i < barco.size; i++) {
          if (this.casillas[x + i][y].ocupada) {
            espacioLibre = false;
          }
        }

        // Si hay espacio, colocamos el barco
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

  // Recorrer todas las casillas del tablero y agregarlas al contenedor
  for (let x = 0; x < tablero.size; x++) {
    let fila = document.createElement("div");
    fila.classList.add("fila");

    for (let y = 0; y < tablero.size; y++) {
      let casilla = document.createElement("div");
      casilla.classList.add("casilla");

      // Si la casilla está ocupada, mostrar el nombre del barco
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

  // Colocar los barcos en el tablero de forma aleatoria
  barcos.forEach((barco) => {
    tablero.colocarBarco(barco);
  });

  console.log(tablero.casillas);
  añadirAlDom('tablero',tablero);
}
