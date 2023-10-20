import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/service/servicio-prueba/servicio.service';

@Component({
  selector: 'app-componente-b',
  templateUrl: './componente-b.component.html',
  styleUrls: ['./componente-b.component.css']
})
export class ComponenteBComponent implements OnInit{
   dato?:string ="Valor por defecto del dato";

   constructor(private servicioDelDatos: ServicioService) { }

   ngOnInit(): void {
      this.servicioDelDatos.obteniendoObservableDato().subscribe({
        next: (dato: string) => this.dato = dato,
        error: (error: any) => console.error(error)
     })
  }

}
