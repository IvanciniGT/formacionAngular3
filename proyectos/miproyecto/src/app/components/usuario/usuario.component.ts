import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() 
  onBorradoSolicitado=new EventEmitter<number>()
  @Output() 
  onBorradoCancelado=new EventEmitter<number>()
  @Output() 
  onBorradoConfirmado=new EventEmitter<number>()
  @Output() 
  onEditadoSolicitado=new EventEmitter<number>()
  @Output() 
  onEditadoCancelado=new EventEmitter<number>()
  @Output() 
  onEditadoConfirmado=new EventEmitter<number>()
  @Output() 
  onCargado=new EventEmitter<number>()
  @Output() 
  onCargaIniciada=new EventEmitter<number>()
  @Output() 
  onError=new EventEmitter<number>()

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
      this.iniciarCarga(this.data as number)
    }else{                                  // me han pasado los datos
      this.datosCargados(this.data as DatosDeUsuario)
    }
  }

  // Todas mis funciones de cambio de estado
  iniciarCarga(id:number){
    this.estado = EstadoComponenteUsuario.REALIZANDO_CARGA
    this.onCargaIniciada.emit(id)
    setTimeout( () => // Esto luego fuera.. solo por trampear
        // Esta petición es asíncrona
        this.servicioDeUsuarios.getDatosDeUsuario(id).subscribe(
          {
            next:  (datosDeUsuario:DatosDeUsuario) => this.datosCargados(datosDeUsuario)
            ,     // funcion que reciba los datosDeUsuario y que devuelva NADA
                  // Esta función se ejecuta diferida en el tiempo... cuando el servicio de usuarios me devuelva los datos
            error: (error:any) => this.errorEnCargaDeDatos(error)
          }
        ), 1000);
  }
  datosCargados(datos: DatosDeUsuario){
    this.datosDelUsuario = datos
    this.estado = EstadoComponenteUsuario.NORMAL
    this.onCargado.emit(this.datosDelUsuario.id)
  }
  errorEnCargaDeDatos(error:any){
    this.estado = EstadoComponenteUsuario.ERROR
    console.error("Error al recuperar los datos del usuario", this.data, error)
    this.onError.emit(this.data as number)
  }
  edicionIniciada(){
    this.estado = EstadoComponenteUsuario.EN_EDICION
    this.onEditadoSolicitado.emit(this.datosDelUsuario!.id as number)
  }
  edicionCancelada(){
    this.estado = EstadoComponenteUsuario.NORMAL
    this.onEditadoCancelado.emit(this.datosDelUsuario!.id as number)
  }
  edicionConfirmada(){ // TODO: GUARDAR los nuevos datos
    this.estado = EstadoComponenteUsuario.NORMAL
    this.onEditadoConfirmado.emit(this.datosDelUsuario!.id as number)
  }
  borradoIniciado(){
    this.estado = EstadoComponenteUsuario.EN_BORRADO
    this.onBorradoSolicitado.emit(this.datosDelUsuario!.id as number)
  }
  borradoCancelado(){
    this.estado = EstadoComponenteUsuario.NORMAL
    this.onBorradoCancelado.emit(this.datosDelUsuario!.id as number)
  }
  borradoConfirmado(){ 
    this.estado = EstadoComponenteUsuario.NORMAL
    this.onBorradoConfirmado.emit(this.datosDelUsuario!.id as number)
  }


}

