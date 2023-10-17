import { Component, Input } from '@angular/core';
import { EstadoComponenteUsuario } from './usuario.component.states';
import { DatosDeUsuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  @Input() // Atributo de entrada para la marca HTML
  data!: DatosDeUsuario | number // !: No te preocupes que el dato te llega... es obligatorio
  @Input()
  editable = false  
  @Input()
  borrable = false
  @Input()
  modoCompacto = false

  estado: EstadoComponenteUsuario = EstadoComponenteUsuario.INICIANDO
  datosDelUsuario?: DatosDeUsuario

  constructor(){
    // AQUI PONGO DE NADA A MENOS CODIGO... en general
  }
}

