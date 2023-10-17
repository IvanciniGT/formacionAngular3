import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
// Angular, en función del tipo de navegador que tenga, arranca una aplicación... mi aplicación... 
// Por cierto... si hay algún pete, me lo sacas por consola.
// SABEIS QUE ES ESTA LINEA ? Inversión de control