import { Component, Input, OnInit } from '@angular/core';
import { EstadosComponenteListadoUsuarios } from './listado-usuarios.component.states';
import { UsuariosService } from 'src/app/service/usuario.service';
import { DatosDeUsuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  @Input()
  buscador: Boolean = true
  @Input()
  usuariosBorrables: Boolean = false
  @Input()
  usuariosEditables: Boolean = false

  estado: EstadosComponenteListadoUsuarios = EstadosComponenteListadoUsuarios.INICIAL

  Estado = EstadosComponenteListadoUsuarios
  usuarioConOperacionEnCurso?: number
  listadoDeUsuarios?: DatosDeUsuario[];
  usuariosAMostrar: DatosDeUsuario[] = [];
  usuariosSeleccionados: number[] = [];

  constructor(private servicioDeUsuarios: UsuariosService) { }

  ngOnInit(): void {
    this.iniciarCarga();
  }

  //INICIAL --> REALIZANDO_CARGA: cuando se crea un listado
  iniciarCarga() {
    this.estado = EstadosComponenteListadoUsuarios.REALIZANDO_CARGA
    this.servicioDeUsuarios.getDatosDeTodosLosUsuariosDelMundoMundial().subscribe({
      next: (listado: DatosDeUsuario[]) => this.datosCargados(listado),
      error: (error: any) => this.errorCargando(error)
    })
  }
  //REALIZANDO_CARGA --> ERROR: Si hay un problema en la carga
  errorCargando(error: any) {
    this.estado = EstadosComponenteListadoUsuarios.ERROR
    console.error(error)
  }
  //REALIZANDO_CARGA--> NORMAL: Cuando recibo los datos del servicio
  datosCargados(listado: DatosDeUsuario[]) {
    this.estado = EstadosComponenteListadoUsuarios.NORMAL
    this.listadoDeUsuarios = listado
    this.buscar() // Para que se rellene el listado a mostrar
  }
  //NORMAL --> USUARIO_EN_EDICION: Cuando en usuario se pulse en editar
  usuarioEnEdicion(userId: number) {
    this.estado = EstadosComponenteListadoUsuarios.USUARIO_EN_EDICION
    this.usuarioConOperacionEnCurso = userId
  }
  //NORMAL --> USUARIO_EN_BORRADO: Cuando en usuario se pulse en borrar
  usuarioEnBorrado(userId: number) {
    this.estado = EstadosComponenteListadoUsuarios.USUARIO_EN_BORRADO
    this.usuarioConOperacionEnCurso = userId
  }
  //USUARIO_EN_EDICION --> NORMAL: Cuando se pulse en cancelar
  edicionCanceladaParaUsuario(userId: number) {
    if (this.usuarioConOperacionEnCurso !== userId)
      throw new Error("No se puede cancelar una edición que no está en curso") // BUG MIO
    this.estado = EstadosComponenteListadoUsuarios.NORMAL
    this.usuarioConOperacionEnCurso = undefined
  }
  //USUARIO_EN_EDICION --> NORMAL: Cuando se pulse en guardar
  edicionConfirmadaParaUsuario(datos:DatosDeUsuario) {
    if (this.usuarioConOperacionEnCurso !== datos.id)
      throw new Error("No se puede confirmar una edición que no está en curso") // BUG MIO
    this.estado = EstadosComponenteListadoUsuarios.NORMAL
    this.usuarioConOperacionEnCurso = undefined
    this.listadoDeUsuarios = this.listadoDeUsuarios!.map(
      usuario => usuario.id === datos.id ? datos : usuario
      )
      // TODO: Mandarlo a un servicio
  }
  //USUARIO_EN_BORRADO --> NORMAL: Cuando se pulse en cancelar
  borradoCanceladoParaUsuario(userId: number) {
    if (this.usuarioConOperacionEnCurso !== userId)
      throw new Error("No se puede cancelar un borrado que no está en curso") // BUG MIO
    this.estado = EstadosComponenteListadoUsuarios.NORMAL
    this.usuarioConOperacionEnCurso = undefined
  }
  //USUARIO_EN_BORRADO --> NORMAL: Cuando se pulse en confirmar
  borradoConfirmadoParaUsuario(userId: number) {
    if (this.usuarioConOperacionEnCurso !== userId)
      throw new Error("No se puede confirmar un borrado que no está en curso") // BUG MIO
    this.estado = EstadosComponenteListadoUsuarios.NORMAL
    this.usuarioConOperacionEnCurso = undefined
  
    this.servicioDeUsuarios.borrarUsuario(userId).subscribe({
      next: () => {
        this.listadoDeUsuarios = this.listadoDeUsuarios!.filter(usuario => usuario.id !== userId)
        this.buscar() // Para que se rellene el listado a mostrar    
      },
      error: (error: any) => console.error("Error borrando usuario", error)
    })
    // TODO: Mandarlo a un servicio
  }

  buscar(texto: string = "") {
    if (texto.length === 0)
      this.usuariosAMostrar = this.listadoDeUsuarios as DatosDeUsuario[]
    else if (!this.listadoDeUsuarios)
      this.usuariosAMostrar = []
    else
      this.usuariosAMostrar = this.listadoDeUsuarios!.filter(usuario => (usuario.nombre + " " + usuario.apellidos + " " + usuario.email).includes(texto))
  }

  busquedaProgramada:any
  programarBusqueda(texto: string){
    if(this.busquedaProgramada)
      clearTimeout(this.busquedaProgramada) // Anula la anterior si la hay
    this.busquedaProgramada = setTimeout( ()=> {
      this.busquedaProgramada = undefined
      this.buscar(texto)
    }, 200 )
  }

  nuevoUsuarioSeleccionado(userId: number) {
    this.usuariosSeleccionados.push(userId)
    if(this.usuariosSeleccionados.length === this.usuariosAMostrar.length)
      this.estado = EstadosComponenteListadoUsuarios.TODOS_USUARIOS_SELECCIONADOS
    else
      this.estado = EstadosComponenteListadoUsuarios.ALGUN_USUARIO_SELECCIONADO
  }

  usuarioDeseleccionado(userId: number) {
    this.usuariosSeleccionados = this.usuariosSeleccionados.filter(id => id !== userId)
    if(this.usuariosSeleccionados.length > 0)
      this.estado = EstadosComponenteListadoUsuarios.ALGUN_USUARIO_SELECCIONADO
    else
      this.estado = EstadosComponenteListadoUsuarios.NORMAL
  }

  todosUsuariosSeleccionados() {
    this.usuariosSeleccionados = this.usuariosAMostrar.map(usuario => usuario.id)
    this.estado = EstadosComponenteListadoUsuarios.TODOS_USUARIOS_SELECCIONADOS
  }

  deseleccionarUsuariosSeleccionados() {
    this.usuariosSeleccionados = []
    this.estado = EstadosComponenteListadoUsuarios.NORMAL
  }
  borrarTodosLosUsuariosSeleccionados(){
    console.log("Borrando usuarios", this.usuariosSeleccionados)
    this.listadoDeUsuarios = this.listadoDeUsuarios!.filter(usuario => !this.usuariosSeleccionados.includes(usuario.id))
    this.buscar() // Para que se rellene el listado a mostrar
    this.estado = EstadosComponenteListadoUsuarios.NORMAL
  }
}
