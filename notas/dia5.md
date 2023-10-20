# Listado de usuarios

| Seleccionar todos | Deseleccionar seleccionados | Borrar seleccionados |
                                                    |
                                                    v
                                                    Confirmable

Seleccionar todos: Está activo en estado normal y si no están ya todos seleccionados
Deseleccionar todos: Está activo si alguno está seleccionado
Borrar seleccionados: Está activo si alguno está seleccionado

Listado con los seleccionados

---

Quién puede marcar a un usuario como seleccionado: Qué componente web?
- El propio componente usuario puede marcarse como seleccionado:
  - Se seleccione -> evento -> lista de usuarios    (2)
  - Él cambia su representación gráfica
    - BOTONES EDITAR, BORRAR: Se desactivan??
- El listado también puede marcar los usuarios como seleccionados
  - Debe avisar a los hijos (usuarios) para que cambien su estilo (1)

---

# Componente usuario:

Cambiar API
- Input nuevos
  - seleccionado <- boolean : Para que desde fuera me digan si estoy seleccionado (1)
  - seleccionable <- boolean : Para que desde fuera me digan si me pueden seleccionar (1)
- Output nuevos
  - onSeleccionado <- boolean : Para yo aviar a otros (mis padres) de que me han seleccionado (2)
  - onDeseleccionado <- boolean : Para yo aviar a otros (mis padres) de que me han seleccionado (2)

- ESTADOS: NORMAL --> SELECCIONADO - SELECCIONADO --> NORMAL


---

El meollo esta en definir esos componentes que vamos creando...
Teniendo muy en cuenta las comunicaciones posibles entre ellos
- Input     --->    Componente padre mande información componente hijo
- Output    --->    Componente hijo mande información componente padre

Y si quiero comunicar 2 componentes que no guardan relación?
Y si quiero comunicar 3 componentes entre si... y que no guardan relación?

---

# Aplicación de gestión de expedientes de lo que sea...

<app>
  <cabecera> (usuario conectado, logo..., desconectar... enlace settings del usuario)
    <usuario>
  <menu>
    <menu-item> CLICK ->


  <listado-expedientes estado="EN_CURSO">
    <filtro-expedientes>
    <listado>
      <accion-confirmable AprobarTodos>
      <resumen-expediente>


  <detalle-expediente>

Mi app acabará con 50 componentes... dentro de esa carpeta /src/app/componentes
Mi app tendrá una carpeta de modelos /src/app/modelos
  Que describa los datos que estoy manejando en la aplicación:
    Expediente
    Usuario
Mi app tendrá una carpeta de servicios /src/app/servicios
  Que describa los servicios que estoy usando en la aplicación:
    ExpedientesService -> getExpedientes, getExpediente, updateExpediente, deleteExpediente
    UsuariosService    -> doLogin doLogout
      Por detrás serán peticiones a un backend...
      Por detrás serán peticiones a un Service Worker...
          Service Worker: Programas JS que puedo poner a funcionar ASINCRONAMENTE asociados a una URL -> PWA
        Que a su vez haga las peticiones a un backend...
        Pero si en un momento no hay backend disponible, que trabaje con una BBDD propia dentro del navegador

Los servicios me ayudan también a tener comunicaciones entre componentes.

  class UsuariosService{

    private usuarioConectado: <Observable>Usuario;

    doLogin(usuario:String, contraseña: String){}
    doLogout(){
      //this.usuarioConectado = null;
      empujar un nuevo valor en el observable.. que se notificaría a los subscritos en el next!!!

    }
    getUsuarioConectado(): Observable<Usuario>{
      return this.usuarioConectado;
    }
  }

<cabecera>
  <button (click)="...UsuariosService.doLogout()">Desconectar</button>

<menu>
  Tiene sentido que esté preguntando continuamente al Servicio si el usuario conectado ha cambiado? NO
  -->Lo que tendría sentido es que UsuariosService.. pudiera avisar al componente menu!
  Cuando arranca, solicita al servicio de usuarios el usuario conectado:Observable<Usuario>
  al que el componente menu se suscribe y se entera de los cambios que se produzcan en el usuario conectado


Esta forma de trabajar es muy común en Angular... el tener servicios que ofrezcan Observables... a los que
los componentes puedan subscribirse


  ComponenteA > SERVICIO > ComponenteB (que previamente se hayan subscrito al servicio)
                  v
              Son los que guardan la información
  

2 componentes
  - Componente A
      <input> <button>
      Cuando se apriete en el button, el contenido del input se manda a un servicio
  - Componente B
      <div> Que muestra el dato que se esté guardando en el servicio

Servicio    --->      ServicioImpl
  - nuevoDato(dato:String)
  - obteniendoObservableDato():Observable<String>


    Servicios con Observables
           ^
El montar eso que acabamos de montar es pan para hoy y hambre para mañana !!!!!
Es una práctica muy habitual en Angular... veréis muchos proyectos así montados.
Y es algo que PERSONALMENTE nunca entenderé.

---

En mundo del frontal está muy dividido:
  - Madrid / Barça
  - Angular / React

React es una libraría que también nos permite montar componentes WEB
Pero... Angular no es solo una librería... es un FRAMEWORK

A la gente de Angular le encanta Angular por imponer una forma de trabajo.
Y ese motivo es precisamente por el que a la gente de React no le gusta Angular.

En React hago lo que me da la gana... tengo total libertad.
---
Curiosamente en Angular para este tipo de comunicaciones entre componentes usamos (mucha gente... la mayoría) Servicios / Observables => LOCURA DE GESTION !!!!!
  Esto se vuelve inmantenible... Y más que cada persona va creando eso como le viene bien!
    ---> Esto echa tufo a REACT !

Curiosamente en React para este tipo de comunicaciones entre componentes usamos (mucha gente... la mayoría) no usa Servicios / Observables => por ser una LOCURA DE GESTION !!!!!
Y usa una librería llamada REDUX que nos permite gestionar el estado GLOBAL de la aplicación de una forma centralizada.
  Esto se vuelve muy mantenible...y rígido en cuanto a su procedimiento de trabajo Y más que cada persona va creando eso como le viene bien!
    ---> Esto echa tufo a ANGULAR !

En Angular... también podemos usar REDUX... y mucha gente lo usa... pero no es tan habitual.

---

Frameworks/Librerías para montar apps o componentes Web
  - Angular -> Dentro lleva el AngularMaterial
  - React
  - Vue
  - Polymer

Librerías para estados de apps : REDUX

Librarías para observables : RXJS

Librerías para estilos de componentes: 
  - Bootstrap, 
  - Material, 
  - PrimeNG