import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/service/servicio-prueba/servicio.service';

@Component({
  selector: 'app-componente-a',
  templateUrl: './componente-a.component.html',
  styleUrls: ['./componente-a.component.css']
})
export class ComponenteAComponent implements OnInit {

  valorDelInput?:string;

  constructor(private servicioDelDatos: ServicioService) { }

  ngOnInit(): void {
    this.servicioDelDatos.obteniendoObservableDato().subscribe({
      next: (dato: string) => this.valorDelInput = dato,
      error: (error: any) => console.error(error)
    })
  }


  enviarDato(dato:string) {
    this.servicioDelDatos.nuevoDato(dato);
  }
}
