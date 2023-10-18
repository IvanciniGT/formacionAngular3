import { Component } from '@angular/core';

// LENGUAJE DECLARATIVO
// Angular, esta clase define el componente AppComponent
@Component({
  selector: 'app-root', // Es decir: Quiero que uses la marca nueva html <app-root>
  templateUrl: './app.component.html', // Ésta es la plantilla a usar para renderizar esa marca
  styleUrls: ['./app.component.css'] // A la que aplicarás estos estilos
})
// Aquí abajo te dejo la lógica de este componente
export class AppComponent {
  title = 'miproyecto'; // Inferencia de tipos: La variable tiene un tipo... 
                        // que se calcula en base al primer dato que guardo

  log(mensaje:String){
    alert(mensaje)
  }
}