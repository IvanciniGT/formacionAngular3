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

  EstadosComponenteListadoUsuarios = EstadosComponenteListadoUsuarios
  usuarioConOperacionEnCurso?: number
  listadoDeUsuarios?: DatosDeUsuario[];
  usuariosAMostrar: DatosDeUsuario[] = [];

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
  edicionConfirmadaParaUsuario(userId: number) {
    if (this.usuarioConOperacionEnCurso !== userId)
      throw new Error("No se puede confirmar una edición que no está en curso") // BUG MIO
    this.estado = EstadosComponenteListadoUsuarios.NORMAL
    this.usuarioConOperacionEnCurso = undefined
    // Todo ... habrá datos nuevos... que tendré que actualizar en mi listado
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
    // TODO: Borrarlo de mi listado
  }

  buscar(texto: string = "") {
    if (texto.length === 0)
      this.usuariosAMostrar = this.listadoDeUsuarios as DatosDeUsuario[]
    else if (!this.listadoDeUsuarios)
      this.usuariosAMostrar = []
    else
      this.usuariosAMostrar = this.listadoDeUsuarios!.filter(usuario => (usuario.nombre + " " + usuario.apellidos + " " + usuario.email).includes(texto))
  }

}
