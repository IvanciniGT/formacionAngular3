import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'accion-confirmable',
  templateUrl: './accion-confirmable.component.html',
  styleUrls: ['./accion-confirmable.component.css']
})
export class AccionConfirmableComponent {

  @Input()
  caption!:String
  @Input()
  captionConfirmar:String = "Aceptar"
  @Input()
  captionCancelar:String = "Cancelar"
  @Input()
  activateConfirmationButton = true
  @Input()
  confirmableCancelationButton = false

  @Output()                             // Tipo de evento que se lanza.
                                        // Es útil si quiero que mi evento pase información adicional
                                        // Cosa que en este caso no necesito para nada de nada !
                                        // vv
  onAccionSolicitada = new EventEmitter<void>() // Declarando un emisor de eventos
  @Output()
  onAccionConfirmada = new EventEmitter<void>()
  @Output()
  onAccionCancelada = new EventEmitter<void>()

  confirmandoLaSolicitud:Boolean
  
  constructor() { 
    this.confirmandoLaSolicitud = false
  }
  accionSolicitada() {
    this.confirmandoLaSolicitud = true;
    this.onAccionSolicitada.emit()
  }
  accionConfirmada() {
    this.confirmandoLaSolicitud = false;
    this.onAccionConfirmada.emit()
  }
  accionCancelada() {
    this.confirmandoLaSolicitud = false;
    this.onAccionCancelada.emit()
  }

}
