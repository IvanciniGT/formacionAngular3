import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioServiceFake } from './service/impl/usuario.service.fake';
import { UsuariosService } from './service/usuario.service';

// LENGUAJE DECLARATIVO
@NgModule({
  declarations: [ // Componentes web
    AppComponent, 
    UsuarioComponent
  ],
  imports: [      // Necesitará de algunos paquetes adicionales para funcionar... algunos de angular... otros no...... que angular tendrá que arrancar
    BrowserModule
  ],
  providers: [
    { provide: UsuariosService, useClass: UsuarioServiceFake}
    // Cuando alguien te pida un UsuarioService, que ofrezca una instancia de un UsuarioServiceFake
  ],  // Los componentes de mi módulo, necesitarán dependencias...
                  // Y aquí configuro cómo debe realizarse la inyección de dependencias
  bootstrap: [AppComponent] // Y este es el módulo de arranque.. el principal.
})
// Angular, en mi app ha de haber un módulo
// Ese modulo ... damos la configuración del módulo
export class AppModule { }
