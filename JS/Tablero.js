const json = `[
   { "name": "Portaaviones", "size": 5 },
   { "name": "Acorazado", "size": 4 },
   { "name": "Crucero", "size": 3 },
   { "name": "Submarino", "size": 3 },
   { "name": "Destructor", "size": 2 }
]`;

//casillas
export class Tablero {}

// x,y,ocupada,impactada,nombreBarco
class casilla {
  x;
  y;
  impactada;
  nombreBarco;
}
