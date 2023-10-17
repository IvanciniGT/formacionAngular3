
# Node

Dentro de node ... cuando lo instalo... me viene de regalo un comando llamado npm

# npm

npm a js es lo mismo que maven a java

Son herramientas de automatización. Me permiten automatizar tareas habituales dentro de mi proyecto:
- compilación/transpilación
- ejecución
- empaquetado
- ejecución de unas pruebas
- gestión de las dependencias

---

# Proyecto que vamos a montar

Componente WEB: 
    <usuario 
        id="18274" 
        mode="compact" 
        editable="true" 
        borrable="true"

        onBorradoSolicitado=""
        onBorradoCancelado=""
        onBorradoConfirmado=""

        onEditadoSolicitado=""
        onEditadoCancelado=""
        onEditadoConfirmado=""

        onCargado=""
        onCargaIniciada=""
        onError=""

    />

Un usuario... tendrá que cargar sus datos... o no... quizás le vienen

    <div onClick="??Función que debe ejecutase cuando se hace click??">
El borrar siempre significa lo mismo? NO. 
    Deberíamos de tener forma de explicarle al componente lo que debe hacer cuando se pulse en borrar...

Que nos permita visualizar los datos de un usuario

## MODO NORMAL DE VISUALIZACION

| vvv | Nombre: Iván              |
| O O | Apellidos: Osuna          |
|  X  | Edad: 44                  |
| --- | Email: ivan@ivan.com      |

## MODO COMPACTO DE VISUALIZACION

| :) Iván Osuna [v]|
              ^ Correo... si hago click, se me copia el email al portapapeles
              ^ con doble click, mandar email
              ^ tooltip que se muestre el correo

### App de solicitud de vacaciones

HEADER: Logged user | :) Iván Osuna [v] | [desconectar]
                    <usuario id="17"/>

SOLICITUD DE VACACIONES:

    Solicitante                 Aprobador
    <usuario id="23"/>          <usuario id="45"/>

## App de gestión de usuarios

Listado de usuarios

Buscar |       |
[Marcar todos] [Desmarcar todos] [Borrar seleccionados]
| :) Iván Osuna   [v] |  [Borrar] [Editar]
| :( Lucas García [v] |  [Borrar] [Editar]

<listado-usuarios> < query
                ^ Estoy en edición
    <usuario datos="?"/>
    <usuario datos="?" editable="true"/>
</listado-usuarios>

    vvvvvvv

## Click en borrar
Buscar |       |
| :) Iván Osuna   [v] |  Esta seguro? [SI] [NO]
| :( Lucas García [v] |  

## Click en Editar
Buscar |       |
| :) Iván Osuna   [v] |  [Guardado] [Cancelar]
| :( Lucas García [v] |  
| :( Lucas García [v] |  
| :( Lucas García [v] |  

## App de gestión de expedientes de lo que sea

Datos de un expediente JPQ1827438

Revisores [Añadir]                                 Aprobadores [Añadir] 
Buscar |       |                                   Buscar |           |
| :) Iván Osuna   [v] |  [Borrar]                  | :( Menchu García [v] |  [Borrar]
| :( Lucas García [v] |  [Borrar]

## Comunicación entre componentes

### Quiero montar una librería
REQUISITOS
Picar código: Empiezo por el API

Cuando monto un componente:
- Comunicación con ese componente
  - Datos de entrada -> atributos HTML (COMUNICACION PADRE -> HIJO)
  - Datos de salida  -> eventos        (COMUNICACION HIJO -> PADRE)
- Asociar a ese componente una máquina de estados

---

[Borrar seleccionados]  Confirmar borrado | Cancelar
[Borrar]                Confirmar borrado | Cancelar
[Editar]                Guardar           | Cancelar

Son acciones CONFIRMABLES