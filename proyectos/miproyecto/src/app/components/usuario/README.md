# Componente <usuario>

Este componente está regido por una máquina de estados.

```mermaid
stateDiagram-v2
    [*] --> NORMAL: Si se pasan los datos
    [*] --> REALIZANDO_CARGA: Si me pasan solo el id
    REALIZANDO_CARGA --> NORMAL: Si la carga se hace bien
    REALIZANDO_CARGA --> ERROR: Si la carga se hace mal
    NORMAL --> EN_EDICION: Al pulsar en editar.
    note right of EN_EDICION: Solo si soy editable
    EN_EDICION --> EDICION_VALIDA: Cuando los datos son válidos
    EN_EDICION --> EDICION_INVALIDA: Cuando los datos son inválidos
    EN_EDICION --> NORMAL: Cuando cancelo
    EDICION_INVALIDA --> NORMAL: Cuando cancelo
    EDICION_VALIDA --> NORMAL: Cuando cancelo
    EDICION_VALIDA --> NORMAL: Cuando guardo
    NORMAL --> EN_BORRADO: al pulsar en borrar
    note right of EN_BORRADO: Solo si soy borrable
    EN_BORRADO --> NORMAL: Cuando cancelo
    EN_BORRADO --> NORMAL: Cuando confirmo
```

En función del estado en que el componente se encuentre, así será la representación gráfica del componente.

El componente debe definir todas esas acciones: CAMBIOS DE ESTADO.
Voy a generar eventos para todas esas acciones (flechas)