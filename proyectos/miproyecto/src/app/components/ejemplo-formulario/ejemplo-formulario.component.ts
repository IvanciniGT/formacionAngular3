import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ejemplo-formulario',
  templateUrl: './ejemplo-formulario.component.html',
  styleUrls: ['./ejemplo-formulario.component.css']
})
export class EjemploFormularioComponent implements OnInit{

  formulario!: FormGroup // Es un formulario

  constructor(private formBuilder: FormBuilder) { // Inyección de dependencias
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
            //  v Valor por defecto
            //  v     v Validaciones
      nombre: [null, [ Validators.required, Validators.maxLength(50), Validators.pattern("^([A-ZÁÉÍÓÚ][a-záéíóúñç]{0,20}(( [a-z]{0,3})* [A-ZÁÉÍÓÚ][a-záéíóúñç]{0,20})*)$")] ],
      apellidos: [ null,[ Validators.required, Validators.maxLength(50), Validators.pattern("^((( ?[a-z]{0,3} )*[A-ZÁÉÍÓÚ][a-záéíóúñç]{0,20})+)$")]],
      edad: [null, [ Validators.required, Validators.min(18), Validators.max(120) ]],
      email: [null, [ Validators.email ]],
    }) // Inicializar el formulario

    // Las validaciones que hemos puesto arriba, son validaciones que se aplican campo a campo... de forma independiente
    // Esas validaciones se van ejecutando de forma asíncrona, a medida que el usuario va escribiendo en el formulario

    // Pero angular también nos permite meter validaciones a nivel del formulario... que también se irían procesando de forma asíncrona.
    // Éstas las usamos para validaciones cruzadas... por ejemplo, que la edad sea menor que la fecha de nacimiento
    // this.formulario.addAsyncValidators

  }

  enviarFormulario(){
    console.log(this.formulario)
  }

}


/*

Formulario de Alta de una Persona
---------------------------------
Nombre:   Ivan  |   Federico333x   | ivan | María de los Ángeles | Maria de los angeles
Apellidos:
Edad:
Email:
Conduce:
Tiene vehículo propio:
Genero:
DireccionES:
  Via:
  Número:
  Población:
  CP:


- Crear un modelo para guardar los datos
- Definir los estado? Tiene un formulario estados?
  - Valido / No válido                  < Definir unas reglas de validación
  - Modificado / No modificado -> Dirty
- Tiene lógica un formulario? Más allá de esas validaciones?
  - Campos relacionados: Fecha de nacimiento - Edad: Uno se calcula desde el otro
  - Cambia la estructura de un formulario dinámicamente? Podría ser
  - Si conduce, puede tener coche
  - La cantidad de direcciones que tiene

- Dónde definimos la lógica del formulario / Modelo / validaciones?
  - .ts   <<<< Lógica del componente/Formulario/...
  - .html >>>> Representar por pantalla, con unos estilitos, que quede mono!
               Ésto puede implicar cierta lógica, pero no es la lógica del formulario
                                                  sino lógica de representación de datos 
---

Hay muchos tipos de lógica.... Cada una, va en su sitio ... y debe ir en su sitio.
- Imagina que monto un sistema completo (front/back)... en el que se dan de alta personas con un DNI
- Hay que validar el DNI.... me dicen que SOLO puedo usar UN SITIO para hacer la validación del DNI (lógica del DATO)  19283764T

  Edad -> NUMERICO / NO NULO

Cuál? 

  FRONT ->                                BACK
                                          Controlador SOAP
                   Extraer datos de un back  Exponer un servicio mediante un determinado protocolo
                        v                     v
   Componente WEB -> Servicio en Front -> Controlador en Back REST -> Servicio Back -> Repositorio -> BBDD
   Formulario                                                         ^                               **** (PL/SQL)
   ^                                                                                                  ^ QUERY    
   Capturar datos                                                    lógica de negocio
                                                                            Al dar de alta un usuario en mi sistema: Mandar un email

   lógica de representación

   TABLE Personas {
    DNI VARCHAR(9) NOT NULL;

   }



   ----

   BBDD

*/


