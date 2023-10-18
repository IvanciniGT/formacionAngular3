# Comunicaciones entre componentes:

Los componentes WEB que cree, deben ser componente totalmente independientes (DESACOPLADOS):
CUALQUIER COMUNICACION ENTRE COMPONENTES DEBO HACERLA SIEMPRE (BAJO PENA DE MUERTE) mediante:
- Atributos HTML (padre-hijo)
- Eventos (hijo/padres)

No accedemos a propiedades NUNCA de los componentes desde otros !!!! = CAGARLA: ACOPLO COMPONENTES
Para eso he definido un API en mi componente! Input / Output

---

# Componente listado de usuarios

<listado-usuarios
    buscador="true"
    usuariosBorrables="true"
    usuariosEditables="true">
</listado-usuarios>

    Buscador | escriba algo aquí  |

    Felipe García       [Borrar] [Editar]
    Menchu Hernandez    [Borrar] [Editar]
    Federico Ruiz       [Borrar] [Editar]
                        ^ Cuando le saco la accion confirmable de borrar: 
                            - usuariosBorrables en true
                            - listado esté en estado normal
                            - o cuando estando en estado USUARIO_EN_BORRADO
                              el usuario que se esté borrando sea Federico 


Vamos a hacer que nuestro listado-usuarios solicite los datos de los usuarios que debe mostrar a quién? ServicioDeUsuarios

## Estados de este componente

```mermaid
stateDiagram-v2
    INICIAL --> REALIZANDO_CARGA: cuando se crea un listado
    REALIZANDO_CARGA --> ERROR: Si hay un problema en la carga
    REALIZANDO_CARGA--> NORMAL: Cuando recibo los datos del servicio
    NORMAL --> USUARIO_EN_EDICION: Cuando en usuario se pulse en editar
    NORMAL --> USUARIO_EN_BORRADO: Cuando en usuario se pulse en borrar
    USUARIO_EN_EDICION --> NORMAL: Cuando se pulse en cancelar
    USUARIO_EN_EDICION --> NORMAL: Cuando se pulse en guardar
    USUARIO_EN_BORRADO --> NORMAL: Cuando se pulse en cancelar
    USUARIO_EN_BORRADO --> NORMAL: Cuando se pulse en confirmar
```

El buscador debe mostrarse solo cuando el listado esté en estado NORMAL

Dentro del componente:
- Listado de Todos los usuarios que me haya devuelto el servicio
- Listado de los usuarios que mostramos en pantalla en un momento dado... Éste se genera mediante un filtrado del anterior.


---

En la realidad


```mermaid
stateDiagram-v2
    INICIAL --> REALIZANDO_CARGA: cuando se crea un listado
    REALIZANDO_CARGA --> ERROR: Si hay un problema en la carga
    REALIZANDO_CARGA--> NORMAL: Cuando recibo los datos del servicio
    NORMAL --> USUARIO_EN_EDICION: Cuando en usuario se pulse en editar
    NORMAL --> USUARIO_EN_BORRADO: Cuando en usuario se pulse en borrar
    USUARIO_EN_EDICION --> NORMAL: Cuando se pulse en cancelar
    USUARIO_EN_EDICION --> ACTUALIZANDO_USUARIO_EN_BACKEND: Cuando se pulse en guardar
    ACTUALIZANDO_USUARIO_EN_BACKEND --> ERROR_EN_ACTUALIZACION_DE_DATOS: Si hay un problema en la actualización
    ERROR_EN_ACTUALIZACION_DE_DATOS --> ACTUALIZANDO_USUARIO_EN_BACKEND: Quizás monte un temporizador que reintente la operación en 2 segundos... 3 veces
    ACTUALIZANDO_USUARIO_EN_BACKEND --> NORMAL: Si cancelan
    ACTUALIZANDO_USUARIO_EN_BACKEND --> NORMAL: Si va bien
    ACTUALIZANDO_USUARIO_EN_BACKEND --> USUARIO_EN_EDICION
    USUARIO_EN_BORRADO --> NORMAL: Cuando se pulse en cancelar
    USUARIO_EN_BORRADO --> BORRANDO_USUARIO_EN_BACKEND: Cuando se pulse en guardar
    BORRANDO_USUARIO_EN_BACKEND --> ERROR_EN_BORRADO_DE_DATOS: Si hay un problema en la actualización
    ERROR_EN_BORRADO_DE_DATOS --> BORRANDO_USUARIO_EN_BACKEND: Quizás monte un temporizador que reintente la operación en 2 segundos... 3 veces
    BORRANDO_USUARIO_EN_BACKEND --> NORMAL: Si cancelan
    BORRANDO_USUARIO_EN_BACKEND --> NORMAL: Si va bien

```

ERROR_EN_ACTUALIZACION_DE_DATOS:
    No hemos podido comunicar con el backend... vamos intentarlo de nuevo en 5seg [CANCELAR] [Volver al formulario]