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
}
/*
public class AppComponent {
  private String title = "miproyecto";
  public AppComponent(){}

  public String getTitle(){
    return title;
  }
  public void setTitle(String newValue){
    this.title = newValue;
  }
}
Estos ^^^^^ getter y los setter solo están para facilitar el mnto/evol futuro de la app

AppComponent appComponent1 = new AppComponent();
appComponent1.setTitle("Nuevo título");
System.out.println(appComponent1.getTitle());
---

// Día 1: Creo esta clase
public class AppComponent {
  public String title = "miproyecto";
  public AppComponent(){
    var texto = "hola"; // Java 11... inferencia de tipos
  }
}// MALA PRACTICA ... a la hoguera... esto no lo puedes hacer en JAVA... Y ES VERDAD !

// Dia 2 al día 100... gente usando mi clase.... ASI vvvvv
AppComponent appComponent1 = new AppComponent();
appComponent1.title = "Nuevo título";
System.out.println(appComponent1.title);

// Día 101... se me ocurre la feliz idea de: 
// Quiero que el title se convierta a mayúsculas cuando me lo enchufen
// Qué tengo que hacer? VOY JODIDO... si lo cambio = KALASNIKOV !!!!
*/