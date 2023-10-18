import { Component, EventEmitter, Input, Output } from '@angular/core';



enum ESTADOS_DE_LA_ACCION_CONFIRMABLE{
  PENDIENTE_SOLICITAR_LA_ACCION,
  ACCION_SOLICITADA,
  PENDIENTE_CONFIRMAR_CANCELACION
}

@Component({
  selector: 'accion-confirmable',
  templateUrl: './accion-confirmable.component.html',
  styleUrls: ['./accion-confirmable.component.css']
})
export class AccionConfirmableComponent {

  @Input()
  caption!:String
  @Input()
  confirmationCaption:String = "Aceptar"
  @Input()
  cancellationCaption:String = "Cancelar"
  @Input()
  confirmCancellationCaption:String = "Aceptar"
  @Input()
  cancelCancellationCaption:String = "Cancelar"
  @Input()
  confirmationMessage?:String
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

  estado = ESTADOS_DE_LA_ACCION_CONFIRMABLE.PENDIENTE_SOLICITAR_LA_ACCION
  ESTADOS_DE_LA_ACCION_CONFIRMABLE = ESTADOS_DE_LA_ACCION_CONFIRMABLE
  
  constructor() { 
  }

  accionSolicitada() {
    this.estado = ESTADOS_DE_LA_ACCION_CONFIRMABLE.ACCION_SOLICITADA
    this.onAccionSolicitada.emit()
  }
  accionConfirmada() {
    this.estado = ESTADOS_DE_LA_ACCION_CONFIRMABLE.PENDIENTE_SOLICITAR_LA_ACCION
    this.onAccionConfirmada.emit()
  }
  accionCancelada() {
    this.estado = ESTADOS_DE_LA_ACCION_CONFIRMABLE.PENDIENTE_SOLICITAR_LA_ACCION
    this.onAccionCancelada.emit()
  }
  solicitadaCancelacion() {
    this.estado = ESTADOS_DE_LA_ACCION_CONFIRMABLE.PENDIENTE_CONFIRMAR_CANCELACION
  }
  canceladaLaCancelacion() {
    this.estado = ESTADOS_DE_LA_ACCION_CONFIRMABLE.ACCION_SOLICITADA
  }

}
