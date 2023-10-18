import { Component, Input, OnInit } from '@angular/core';
import { EstadoComponenteUsuario } from './usuario.component.states';
import { DatosDeUsuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/service/usuario.service';

@Component({
  selector: 'usuario',
  templateUrl: './usuario.component.html', // Esta clase lleva asociada esta plantilla
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{

  @Input() // Atributo de entrada para la marca HTML
  data!: DatosDeUsuario | number // !: No te preocupes que el dato te llega... es obligatorio
  @Input()
  editable = false  
  @Input()
  borrable = false
  @Input()
  modoCompacto = false

  estado: EstadoComponenteUsuario = EstadoComponenteUsuario.INICIANDO
  datosDelUsuario?: DatosDeUsuario // Estos son los que saco por pantalla
  // La plantilla html solo tiene acceso a los datos/funciones del componente asociado
  // No tiene acceso a nada más
  // Cacho truco rastrero...
  // Me creo una prop en el componente que guarda la enum... para poder acceder a ella desde la plantilla
  EstadoComponenteUsuario = EstadoComponenteUsuario;

  constructor(private servicioDeUsuarios: UsuariosService){ // Solicito una inyección de dependencias... A quién? a ANGULAR !
    // AQUI PONGO DE NADA A MENOS CODIGO... en general
  }

  ngOnInit(): void { // Esta función se invocará cuando Angular injecte el componente WEB en el DOM HTML del navegador
                     // Normalmente aquí es donde hacemos esas capturas de información... inicializaciones
    if( typeof this.data === 'number'){     // me han pasado el id
      this.estado = EstadoComponenteUsuario.REALIZANDO_CARGA
      setTimeout( () => // Esto luego fuera.. solo por trampear
        // Esta petición es asíncrona
        this.servicioDeUsuarios.getDatosDeUsuario(this.data as number).subscribe(
          {
            next:  (datosDeUsuario:DatosDeUsuario) => {
              this.datosDelUsuario = datosDeUsuario
              this.estado = EstadoComponenteUsuario.NORMAL
            }, // funcion que reciba los datosDeUsuario y que devuelva NADA
               // Esta función se ejecuta diferida en el tiempo... cuando el servicio de usuarios me devuelva los datos
            error: (error:any) =>{
              this.estado = EstadoComponenteUsuario.ERROR
              console.error("Error al recuperar los datos del usuario", this.data, error)
            } 
          }
        ), 1000);
    }else{                                  // me han pasado los datos
      this.datosDelUsuario = this.data
      this.estado = EstadoComponenteUsuario.NORMAL
    }
  }
}

