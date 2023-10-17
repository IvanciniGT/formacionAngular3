# Framework

Conjunto de librerías qur impone una forma de uso de las mismas.

# Angular

Framework de JS para montar aplicaciones...WEB...SPA

## Single Page Application

Antiguamente, las apps WEB (la parte del frontal) generaban documentos HTML completos...
Cada interactuación con un sitio WEB(app) obligaba a la recarga de la página web completa...
Teníamos trucos... AJAX

En un momento dado planteamos las apps web de forma diferente:
- De entrada estableciendo una clara separación entre BACK y FRONT
  - Hoy en día todo el HTML se genera en el Navegador
- El HTML que generamos tiene la capacidad de ir mutando
- De hecho, comenzamos a plantearnos que una página WEB va a estar compuesta de COMPONENTES WEB

La necesidad de tener algo como los componentes WEB es la que da lugar a todos los frameworks y libs de JS que usamos hoy en día (de este tipo): Angular, React, Vue...

Hoy en día, existe un estándar del W3C(HTML, XML, CSS...) que define los Componentes web: WebComponents

Un SPA es un conjunto de Componentes WEB interactuando entre si.

## Componente WEB

Es una etiqueta HTML que nosotros creamos... con:
- Su propia representación gráfica
- Su propia lógica

## Por qué hoy en día ya no generamos el HTML en los servidores de Backend?

- No sobrecargar los servidores de backend.
- Interactividad
- Código poco reutilizable
- Hoy en día trabajamos con otro tipo de arquitecturas... ya que los tiempos han cambiado
  - Hace 20 años... el frontal de una aplicación:
    - App desktop
    - Web
  - Y hoy en día... qué frontal tiene una app?
    - App desktop: Computadora de sobremesa
    - Web
    - Teléfonos: iOS, Android
    - Asistentes de voz
    - Sistema de voz interactivo: Centralita de un banco
  - Antiguamente la mayoría de apps tenían solo un frontal web... y montábamos sistemas monolíticos
    - Este tipo de sistema mostraron con el paso del tiempo un problema GIGANTE DE MNTO

## Hay un conjunto de principios que hoy en día tratamos de seguir cuando montamos una aplicación (software)

Que han demostrado generar software más fácilmente mantenible que el que generábamos hace años: SOLID

## SOLID

Acrónimo, que usamos para representar 5 principios que debo tener hoy en día en cuenta a la hora de monatr un software:

- Principio de la inversión de la dependencia
  Un componente de alto nivel de un sistema no debería depender de implementaciones de componentes de más bajo nivel... sino de abstracciones (API, interfaz)

  Una forma de escribir código que nos permita cumplir con este principio es: Inyección de dependencias

## Inyección de dependencias

Patrón de diseño de software (OO) por el cual, una clase no crea instancias de los objetos que necesita... sino que le son suministradas.

## Inversión de control

Es otro patron de diseño de software por el cuál, nosotros dejamos de controlar el flujo de la aplicación (es más, dejamos incluso de escribirlo), dejando esa responsabilidad a un framework.

Una de las ventajas de la inversión de control es que facilita la inyección de dependencias... que es una de las formas de respetar el principio de la inversión de dependencias.

Fijaros si este es importante que hemos creado frameworks GIGANTESCOS en el mundo del software sólo para conseguir respectar ese principio (Inversión de dependencias): 
 - ANGULAR, SPRING... Son frameworks de Inversión de control

---

# Ejemplo 

Quiero montar una app de consola que me permita buscar una palabra en un diccionario de un determinado idioma...
Y al final me diga si la palabra existe o si no en el diccionario. Caso de existir que me diga su(s) significado(s).
$ diccionario "ES" "manzana"

Pregunta 1: En qué lenguaje de programación podría hacer esto? JS (por supuesto) / JAVA
Pregunta 2: Cuantos repos de git creo para este sistema? 3 (Ivan)
- Uno para el "front" -> App de consola / Comando -> Lee desde la consola y escribe a la consola.
- Otro para el "back" -> Gestión / persistencia de las palabras y los diccionarios
  - BBDD
  - Ficheros XML, JSON, YAML
  - Microservicio...
- La comunicación entre ellos (API)

## API : Una librería de gestión de diccionarios ...  ->    
```java
diccionario-api.jar

    package com.diccionario;

        public interface Diccionario {
            boolean existe(String palabra);
            Optional<List<String>> getSignificados(String palabra);
        }

        public interface SuministradorDeDiccionarios {
            boolean tienesDiccionarioDe(String idioma);
            Optional<Diccionario> getDiccionario(String idioma);
        }
```
## Implementación de ese API mediante ficheros

    package com.diccionario.impl;

        public class DiccionarioImpl implements Diccionario {
            boolean existe(String palabra) {...}
            Optional<List<String>> getSignificados(String palabra) {...}
        }

        public class SuministradorDeDiccionariosImpl implements SuministradorDeDiccionarios {
            boolean tienesDiccionarioDe(String idioma) {...} 
            Optional<Diccionario> getDiccionario(String idioma) {...}
        }

## App de consola que usa la librería de diccionarios

    import com.diccionario.Diccionario;
    import com.diccionario.SuministradorDeDiccionarios;
//    import com.diccionario.impl.SuministradorDeDiccionariosImpl;   // Y AQUI POR FIN LA REGAMOS !
            // ESTA LINEA ^^^^^^  ES LA MUERTE DE MI PROYECTO !
            // Nos acabamos de cagar en el ppo de INVERSION DE DEPENDENCIAS 

    public class App {

        public void procesarPeticion(String idioma, String palabra, SuministradorDeDiccionario miSuministrador){ 
                                                                    //  ^^^  Inyección de dependencias
            // Algo de código
            boolean existeLaPalabra = false;
//            SuministradorDeDiccionario miSuministrador = new SuministradorDeDiccionariosImpl();
            if(miSuministrador.tienesDiccionarioDe(idioma))
                if(miSuministrador.getDiccionario(idioma).get().existe(palabra))
                    existeLaPalabra = true;
            // Hago lo que quiero con esa variable ya rellena...
            // Mo muestro por consola.
        }

    }

// Con esta solución solo he post-puesto el problema... me lo he llevado a otro sitio...
// Al final... en algún sitio he de decir: 'new SuministradorDeDiccionariosImpl()'

Usar un framework de Inversión de control (angular, Spring) me permite olvidarme de esa linea...
Y que sea el framework el que la escriba por mi.... ya que el framework... al hacer la inversión de control, es el que va a tomar control del flujo de mi aplicación.

El escribir software de esta forma, me permitirá:
- Crear un software más fácilmente mantenible
- Vamos a poder generar buenas pruebas sobre mi software.

---

# Javascript / TypeScript

Javascript es un lenguaje de programación... realmente el nombre del lenguaje es: ECMAScript

## Taxonomías para clasificar los lenguajes de programación:

### Compilados / Interpretados

- JS: Interpretado (requiere de un intérprete)
- JAVA: Compilado / Interpretado
  .java -> compilación -> .class --> Interpretados --> JVM (JIT Just in time Compiler)
                            ^ byte-code
                            v
  .kt   -> compilación -> .class
  .scala -> compilación -> .class

    Cada navegador hizo su propio motor de procesamiento (intérprete) de JS... 
    Una cosa es el lenguaje... y otra un interprete de ese lenguaje.
    Había un problema... NO EXISTIA UN ESTANDAR acerca del lenguaje
    Ese estandar aparece de manos de la ECMA -> ECMAScript

### Tipado estático / Dinámico

- Tipado estático (JAVA)    Las variables tienen un tipo pre-asignado e invariante
- Tipado dinámico (JS)      Las variables no tiene tipo.

```java
String texto = "hola"; // Asigna el valor "hola" a la variable "texto"
```

    - "hola"        --> Crear un objeto de tipo String en memoria RAM con el valor "hola"
    - String texto  --> Crea una variable de tipo String, con el nombre "texto"
                        Qué significa de tipo String en una variable? Que solo puede referenciar (apuntar) a objetos de tipo String
    - =             --> Asigna la variable al dato "HOLA"

    texto = "adios";
        - "adios"   --> Crear un objeto de tipo String en memoria RAM con el valor "adios"
                        Dónde? en el mismo sitio donde ponía "hola"? NO... en otro
                        Y llegados a este punto, en memoria tengo 2 textos guardados: "hola" y "adios"
        - texto     --> Arranco el post-it de donde estaba pegao!
        - =         --> Asigno la variable al dato "adios" (el post-it lo muevo de sitio... lo VARIO)
                        En este momento, el dato "hola" se queda sin post-it al lado...
                        Y por tanto se convierte en un dato IRRECUPERABLE: GARBAGE
                        Y quedará en memoria hasta que sea eliminado auto. por el GARBAGE COLLECTOR... Y eso pasa en Java... y en JS? IGUAL !

                        Java es un lenguaje que hace un destrozo (uso muy ineficiente) con la RAM
                        Eso es bueno o malo? ES UNA FEATURE ! de Java... cuando se crea JAVA dicen...
                            Vamos a hacer un leng. que destroce la RAM!

```js
var texto = "hola";
```
    - "hola"        --> Crear un objeto de tipo String en memoria RAM con el valor "hola"
    - String texto  --> Crea una variable, con el nombre "texto" que puede apuntar (referenciar) a lo que sea.
    - =             --> Asigna la variable al dato "HOLA"

    texto = 17;

Que es mejor? 
- Tipado estático <<< ESTO ES GENIAL !!!!!
  - Tengo control (compilación). Puedo validar que los tipos de datos que se pasan y reciben en las funciones sean adecuados.
  - Tengo información de cómo hablar con otros...
- Tipado dinámico <<< ESTO ES RUINA  !!!! aunque para los neófitos cómodo.
  - No tengo control, ni información de cómo hablar con funciones....

        function generarInforme(titulo, datos) {

        }

        // titulo? El título del informe (String)... o si quiero título en el informe (boolean)

    En cuanto quisimos hacer proyectos con JS más grandes... el tipado dinámico era un problema...
    Hubo que crear un lenguaje nuevo que tuviera tipado estático: TypeScript
        OJO: Que es otro lenguaje de programación diferente

        Typescript
            .ts ----> transpilación ---> .js ---> Interpretaré 

### Paradigmas que soportan (JS/JAVA)

Son formas de usar un lenguaje para expresar unas ideas.

    FELIPE!! Si no hay sillas... entonces al IKEA a por una silla!
    FELIPE !!! IF !! Hay algo que no sea una silla debajo de la ventana
        FELIPE !! QUITALO !!!!
    FELIPE !!! IF no hay ya una silla debajo de la ventana!
    Felipe!! Pon una silla debajo de la ventana!        Imperativo. Nos gusta? Cada día menos... es asqueroso!
                                                            Me centro en lo que Felipe debe hacer... y piedo de vista lo que quiero conseguir.
    Felipe!! Quiero una silla debajo de la ventana !    Desiderativa/Declarativo
                                                        Lo adoramos... todas las herramientas de software / lenguajes que triunfan a día de hoy usan lenguaje Declarativo:
                                                            Terraform, Kubernetes (OpenShift), Ansible, Spring, Angular
                                                            Me centro en lo que quiero conseguir...
                                                            Y dejo a Felipe la responsabilidad de conseguirlo

- Imperativo    Escribo ideas (órdenes) que deben procesarse secuencialmente... en ocasiones para tener algo de control
                en el flujo de las órdenes, uso ciertas palabras típicas de lenguajes imperativos: IF, FOR, WHILE, UNTIL, CASE-SWITCH, GOTO
- Procedural    Cuando el lenguaje me permite definir funciones(subrutinas, métodos, procedimientos) 
                e invocarlas posteriormente
- Funcional     Cuando el lenguaje me permite que una variable apunte a una función...
                y posteriormente ejecutar la función desde la variable. 
                La cuestión no es lo que es la programación funcional...
                Sino el impacto que tiene.
                    Desde el momento que puedo referenciar a una función desde una variable, puedo:
                        - Definir funciones que reciban funciones como argumentos
                        - Definir funciones que devuelvan funciones como resultado
                    Y AQUI ES DONDE LOS CEREBROS SE LICUAN !!!! 
- OO            Cuando el lenguaje me permite definir mis propios Tipos de datos, con sus características y métodos
                particulares.
                                        Características                 Funciones
                        String           una secuencia de caracteres        upperCase... trim
                        LocalDate        dia/mes/año                        enQueDiaDeLaSemanaCae()
                        Usuario          nombre, apellidos, edad            eresMayorDeEdad()
- Declarativo   @Component 
                    Spring: Spring!!! quiero tener un componente en mi aplicación.
                         @Getter: Lombok!! quiero tener funciones getter de mis propiedades (o de esta propiedad)
                    Angular: Angular!! quiero tener un componente WEB en mi aplicación.
---
# NODE

El equivalente en el mundo JS a la máquina virtual de JAVA.
El antiguo motor de procesamiento de JS del navegador Chromium (Chrome, Edge, Opera, Brave...).

El código que vamos a generar mediante Angular (frontal web)... dónde se va a ejecutar? 
En un navegador de un cliente ( o muchos clientes)....
Necesitamos para ejecutar nuestra app Angular Web Node? NO

Pero... de cara a esta formación os han debido pedir 2 cosas instaladas: 
- Visual Studio Code
- Git
- Node

Para crearlas si... 
- Para transpilar el código TS a JS... el transpilador está desarrollado en JS... y para ejecutarlo desde fuera de un navegador necesito Node.
- Para probar la app

---

# Frontales

Vamos a montar un  frontal... 
Un frontal debe responder a los acciones/eventos de un usuario... de forma interactiva.
Hay muchos tipos de frontales.. y una de las quejas tradicionales de los frontales web: Poca interactividad

Los frontales deben ser muy interactivos -> Necesitaremos estar haciendo varias cosas de distinta naturaleza simultaneamente.

Ejemplo: Abro una página... y pido hacer una búsqueda... PINCHO EN BÚSQUEDA EN EL MENU
Me sale un formulario... que relleno y le doy a "BUSCAR"... qué debe ocurrir en ese momento?

- Se llama al Backend... para hacer la búsqueda:
  - Es síncrona o asíncrona? ASINCRONA !
    Mi aplicación, entre tanto debe al menos hacer otra cosa: Informar al usuario de que la búsqueda está en proceso
    Si no hago esto... vuelvo a las cutre-aplicaciones web de hace 20 años.

## Sincronía / Asincronía

- Petición síncrona: El solicitante de la petición ha de esperar la respuesta para seguir haciendo trabajo.
- Petición asíncrona: El solicitante de la petición puede seguir haciendo cosas mientras la petición se procesa.

    El problema es cuando hago una petición asíncrona (LOS FRONTALES SON PURAS PETICIONES ASINCRONAS)
    y necesito hacer cosas una vez finalizada (procesada) la petición.


    TAREA
      - > SOLICITAR DATOS
      - > Hago otras cosas
      - > Una vez recibidos los datos solicitados, hago otras cosas...

    Patrones que podemos utilizar para conseguir esto:

    ```js

    function hacerLaBusqueda(dato){
        // PATRON CALLBACK
            llamarAlBackend(dato, conjuntoDeCosas2); // <<< @Output
                                // Función de CALLBACK
                // De forma que cuando llamarAlBackend acabe su trabajo, autom. invoque a la función que le suministro.
            // Hago un  conjunto de cosas 1...
        // PATRON PROMESAS
            // JS : Promise... hay algo en Java equivalente? 
            var promesaDeRespuesta = llamarAlBackend(dato);
            promesaDeRespuesta.then( conjuntoDeCosas1 )
            // En angular usamos principalmente éste patrón... pero... Angular trabaja con una librería llamada: rxjs
            // Que ofrece su propia implementación de lo que es una promesa: Observable
            // Un observables es equivalente a una promesa.. sólo que las promesas de JS están pensadas para resolverse una vez.
            // Un observable puede resolverse muchas veces.
                // A una promesa le indico qué debe hacer cuando la promesa se resuelva
                // A un observable me suscribo... de forma que le indico qué debe hacer, cada vez que reciba un nuevo valor.
            promesaDeRespuesta.subscribe( {next: conjuntoDeCosas1} )

        // Una vez tengo el dato.. hago otro conjunto de cosas 2
    }

    function conjuntoDeCosas1(){
        // ALGUNAS COSAS
    }
    function conjuntoDeCosas2(){
        // OTRAS COSAS
    }

    ```

# Pruebas de software

## Vocabulario

- Error     Los humanos cometemos ERRORes (por estar cansados, poco concentrados, falta de conocimiento)
- Defecto   Al cometer un error, podemos introducir un DEFECTO en un producto
- Fallo     Ese defecto en un momento dado puede manifestarse en forma de FALLO

## Para qué sirven las pruebas

- Asegurar el cumplimiento de unos requisitos.
- Buscar FALLOS... para lo cuál hace falta ejecutar nuestro programa.
  - Una vez identificado un FALLO, es necesario identificar el DEFECTO que lo produce (debugging o depuración) <- DESARROLLO 1***
- Proveer la información que permita una rápida identificación de un DEFECTO desde un FALLO.
- Buscar DEFECTOS... para lo cuál muchas veces no necesitamos ni ejecutar el programa.
  - Revisión de los requisitos: DEFECTO en un requisito
  - Revisión de un modelo de BBDD
  - Revisión de calidad del código (antes la hacía un senior): SONAR !
- Conocer mejor mi sistema / producto -> extraer información -> que aplicar a futuros proyectos.
- Para saber que tal va mi proyecto! < ASPECTO CRITICO EN MET. AGILES!

## Tipos de pruebas:

Toda prueba, da igual el tipo que sea, se debe centrar en un UNICO ASPECTO / CARACTERISTICA de mi SISTEMA / COMPONENTE.
Por qué?  Véase 1***

Las pruebas se clasifican en base a diferentes taxonomías:

### En base al objeto de la prueba (lo que pruebo)

- Funcionales: Se centran en la funcionalidad
- No funcionales: Se centran en otros aspectos
  - Rendimiento
  - Carga
  - Estrés
  - UX
  - Seguridad
  - ...

### En base al nivel de la prueba

- Unitarias             Se centra en una característica de un componente AISLADO de un sistema
                        Y en ocasiones es muy complejo hacerlas.

                        QUIERO MONTAR UN TREN
                            Motor
                            Ruedas
                            Sistema de freno
                            Asientos

- Integración           Se centra en la COMUNICACION entre 2 COMPONENTES
                            Sistema de freno -> Ruedas

- Sistema (end2End)     Se centran en el COMPORTAMIENTO del sistema en su conjunto

---

REQUISITO v1: Tu servicio rest en back tiene que tener unos tiempos de respuesta aceptables. MIERDA GIGANTE!
REQUISITO v2: Tu servicio rest en back tiene que ejecutar en menos de 100ms. MIERDA GIGANTE!
REQUISITO v3: Cuando se hace tal petición (bien especificada) a tu servicio rest back, estando instalado en un entornos con tales características, estando sometido el sistema a tal carga de trabajo, el servicio debe contestar con un percentil 95 antes de 100ms

Mido la latencia de la red... de mi servidor de back (donde está montado el servicio de marras) a la BBDD: 50ms
---

Una web que... entre otras cosas muestre un listado de usuarios... en la pantalla.
    FRONTAL: 
        Componente WEB - Etiqueta HTML <listado-usuarios/>
        ServicioDeUsuarios  ---> Backend

    BACKEND
        Controlador REST            Exponer ese servicio mediante un protocolo          Controlador SOAP
            vvvv                                                                            vvvv
        UsuariosService             Gestionar mi lógica de negocio
            vvvv
        UsuariosRepository          Gestionar la persistencia de Usuarios
            BBDD (usuarios)


                            Test-Doubles (Dummies, Stubs, Fakes, Spies, Mocks)
                         |
        Componente WEB ->| ServicioDeUsuarios ---> Controlador REST ---> UsuariosService ---> UsuariosRepository ---> BBDD (usuarios)
           ^^^
        Prueba unitaria
---

# DEV--->OPS

Cultura / Movimiento / Filosofía de trabajo en pro de la AUTOMATIZACION de todo lo que hay entre el DEV y la OPS de un sistema informático.

## INTEGRACION CONTINUA (lo del Jenkins=Travis/Github Actions/Gitlab CI-CD/TeamCity/Bamboo)

Tener CONTINUAMENTE la última versión del código que está en el GIT (SCM) instalada en el entorno de INTEGRACION,
realizándose sobre ellas pruebas AUTOMATIZADAS que permitan continuamente generar un INFORME DE PRUEBAS.


---

# Cambios en los requisitos

- Bien por que el analista/desarrollador no se ha empapado adecuadamente
- A veces porque el cliente no sabe ni lo que quiere
- Simplemente el requisito cambia por factores externos.

Esto lleva resuelto muchos años ya... Que hicimos para resolver este problema: METODOLOGIAS AGILES

## Característica principal de una met. ágil? 

- Entregar el proyecto a mi cliente de forma incremental.
    A los 30 días de comenzar el proyecto: ENTREGA 1 en producción -> 100% funcional
        Entrega 1:              5% de la funcionalidad < Sprint
            -> Pruebas a nivel de producción        5%
        Entrega 2 (45 días)    +5% de la funcionalidad
            -> Pruebas a nivel de producción        5% +5%
        Entrega 3 (60 días)   +10% de la funcionalidad
            -> Pruebas a nivel de producción        5% +5% +10%

    Qué me permite esto? FeedBack: Quiero una rápida retroalimentación por parte de mi cliente. Lo antes posible enterarme de los cambios

Las met. ágiles han resuelto muchos problemas... pero han venido con sus propios problemas nuevos:
- Las pruebas en met. ágiles se multiplican.
- Igual que las instalaciones (Pasos a producción)
De dónde saco la pasta? y las personas? y el tiempo? No la hay!
    Este problema sólo tiene una solución! AUTOMATIZAR TRABAJOS
---

El software funcionando es la MEDIDA principal de progreso.

La MEDIDA principal de progreso es el SOFTWARE FUNCIONANDO.
La forma en la que a partir de ahora vamos a medir el grado de avance en nuestros proyectos es SOFTWARE FUNCIONANDO:
Me están definiendo un Indicador del grado de avance de un proyecto.

SOFTWARE FUNCIONANDO? Software que funciona... que no falla... quién dice eso? Pruebas

Hoy en día lo que miro es Cuantas pruebas se han superado esta semana? de las pruebas que hay que superar para este sprint.

---

HITO es una palabra que hoy en día ha desaparecido del vocabulario informático... estaba de moda en las met tradicionales(en cascada)

    HITO : FECHA + **REQUISITOS** satisfechos
    Hito 1: 10-enero ... R1, R2, R10 -> 
        Si llegado el 10 enero solo tenía el R1, R2?
            - OSTIAS PA TOS LOS LAOS
            - Se replanificaba el proyecto -> nueva fecha del HITO 1: 15-enero VAMOS CON RETRASO!

    Hito 2: 10-feb  .... R3, R5, R9

    Planificar y saber en que estado se encuentra el proyecto. Si va con retraso o vaq bien para tomar medidas.

    SPRING : **FECHA** + REQUISITOS satisfechos
    Sprint 1: 10-enero ... R1, R2, R10
        Si llegado el 10 enero solo tengo el R1, R2?
            Instalo en producción el R1 y R2...
            Y el R10, queda para la próxima entrega

    Sprint 2: 10-feb  .... R3, R5, R9