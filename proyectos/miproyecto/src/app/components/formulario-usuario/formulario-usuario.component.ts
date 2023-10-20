import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EstadosComponenteFormularioUsuario } from './formulario-usuario.component.states';
import { DatosDeUsuario } from 'src/app/models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css']
})
export class FormularioUsuarioComponent implements OnInit{

  @Input()
  data?:DatosDeUsuario;

  @Output()
  onValido = new EventEmitter<DatosDeUsuario>()
  @Output()
  onInvalido = new EventEmitter<void>()

  Estados = EstadosComponenteFormularioUsuario
  estado = EstadosComponenteFormularioUsuario.SIN_TOCAR

  formulario?: FormGroup

  constructor(private formBuilder: FormBuilder) { 
  }
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nombre: [this.data?.nombre, [Validators.required, Validators.maxLength(50), Validators.pattern("^([A-ZÁÉÍÓÚ][a-záéíóúñç]{0,20}(( [a-z]{0,3})* [A-ZÁÉÍÓÚ][a-záéíóúñç]{0,20})*)$")]],
      apellidos: [this.data?.apellidos, [Validators.required, Validators.maxLength(50), Validators.pattern("^((( ?[a-z]{0,3} )*[A-ZÁÉÍÓÚ][a-záéíóúñç]{0,20})+)$")]],
      edad: [this.data?.edad, [Validators.required, Validators.min(18), Validators.max(120)]],
      email: [this.data?.email, [Validators.email]]
    })
    this.formulario.valueChanges.subscribe( { next: () => this.checkFormulario() } )
  }

  checkFormulario(){
    if (this.formulario!.valid){
      this.formularioGuay(this.formulario!.value)
    }else{
      this.formularioRuina()
    }
  }

  formularioGuay(datos:DatosDeUsuario){
    this.estado = EstadosComponenteFormularioUsuario.BIEN
    this.onValido.emit(datos)
  }
  formularioRuina(){
    if (this.estado !== EstadosComponenteFormularioUsuario.MAL){
      this.onInvalido.emit()
    }
    this.estado = EstadosComponenteFormularioUsuario.MAL
  }
}
