import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/app/app.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioServiceFake } from './service/impl/usuario.service.fake';
import { UsuariosService } from './service/usuario.service';
import { AccionConfirmableComponent } from './components/accion-confirmable/accion-confirmable.component';
import { ListadoUsuariosComponent } from './components/listado-usuarios/listado-usuarios.component';
import { EjemploFormularioComponent } from './components/ejemplo-formulario/ejemplo-formulario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormularioUsuarioComponent } from './components/formulario-usuario/formulario-usuario.component';
import { ComponenteAComponent } from './components/componente-a/componente-a.component';
import { ComponenteBComponent } from './components/componente-b/componente-b.component';
import { ServicioService } from './service/servicio-prueba/servicio.service';
import { ServicioServiceImpl } from './service/servicio-prueba/servicio.service.impl';
import { UsuarioServiceImpl } from './service/impl/usuario.service.impl';

// LENGUAJE DECLARATIVO
@NgModule({
  declarations: [ // Componentes web
    AppComponent, 
    UsuarioComponent, 
    AccionConfirmableComponent, 
    ListadoUsuariosComponent, 
    EjemploFormularioComponent, 
    FormularioUsuarioComponent, 
    ComponenteAComponent, 
    ComponenteBComponent
  ],
  imports: [      // Necesitará de algunos paquetes adicionales para funcionar... algunos de angular... otros no...... que angular tendrá que arrancar
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: UsuariosService, useClass: UsuarioServiceImpl},
    { provide: ServicioService, useClass: ServicioServiceImpl}
    // Cuando alguien te pida un UsuarioService, que ofrezca una instancia de un UsuarioServiceFake
  ],  // Los componentes de mi módulo, necesitarán dependencias...
                  // Y aquí configuro cómo debe realizarse la inyección de dependencias
  bootstrap: [AppComponent] // Y este es el módulo de arranque.. el principal.
})
// Angular, en mi app ha de haber un módulo
// Ese modulo ... damos la configuración del módulo
export class AppModule { }
