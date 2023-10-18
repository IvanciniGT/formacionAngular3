
# < accion-confirmable >

## Inputs

| Input   | type    | default |
| ------- | :-----: | ------- |
| caption | String  | Ninguno |
| captionConfirmar | String  | `"Aceptar"` |
| captionCancelar | String  | `"Cancelar"`  |
| activateConfirmationButton | boolean | true |
| confirmableCancelationButton | boolean | false |

## Eventos

| Outputs | Descripción |
| ------- | - |
| onAccionSolitada | Cuando se apreta en el botón con texto: `caption` |
| onAccionConfirmada | Cuando se apreta en el botón con texto: `captionConfirmar` |
| onAccionCancelada | Cuando se apreta en el botón con texto: `captionCancelar` |

## Estados

```mermaid
stateDiagram-v2
    PENDIENTE_SOLICITAR_LA_ACCION --> ACCION_SOLICITADA : click en el botón de acción
    ACCION_SOLICITADA --> PENDIENTE_SOLICITAR_LA_ACCION : click en el botón de confirmar
    ACCION_SOLICITADA --> PENDIENTE_SOLICITAR_LA_ACCION : click en el botón de cancelar(siempre que la cancelación no requiera de confirmación)
    ACCION_SOLICITADA --> PENDIENTE_CONFIRMAR_CANCELACION : click en el botón de cancelar(cuando la cancelación requiere de confirmación)
    PENDIENTE_CONFIRMAR_CANCELACION --> PENDIENTE_SOLICITAR_LA_ACCION: click confirmar el cancelar
    PENDIENTE_CONFIRMAR_CANCELACION --> ACCION_SOLICITADA: click en cancelar el cancelar
    
```

## Uso

```html
<accion-confirmable
    caption="Editar"
    captionConfirmar="Guardar"
    captionCancelar="Cancelar"
    activateConfirmationButton="true"
    confirmableCancelationButton="true"
    onAccionSolitada="EVENTO"
    onAccionConfirmada="EVENTO"
    onAccionCancelada="EVENTO"
>
```

        [Editar] * click   -->       [ Guardar ]  [ Cancelar ]
    DATOS DE UN USUARIO    -->       FORMULARIO CON LOS DATOS DE UN USUARIO (padre)
                                        Si no he tocado anda... el botón de Guardar debe estar Desactivado
                                                                el botón de cancelar debe estar Activo... y si le pincho: Se cancela... Aviso al padre y yo vuelvo a sacar qué botón?  [ Editar ]
                                        Y si he tocado algo?... el botón de Guardar debe estar Activo
                                                                el botón de cancelar debe estar activo... y si le doy: Otra confirmación!
                                                                Es decir... en este caso el botón cancelar es OTRA acción confirmable

        [Editar] * click   -->       [ Guardar ]  [ Cancelar ] * click      ->        [Confirmar cancelación]  [Cancelar cancelación]
         ^ desaparece al                ^ desaparece al 
         hacer click en editar          hacer click en cancelar
