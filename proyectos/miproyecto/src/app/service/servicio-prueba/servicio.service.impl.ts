import { Injectable } from '@angular/core';
import { ServicioService } from './servicio.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioServiceImpl extends ServicioService {

  private dato:BehaviorSubject<string> = new BehaviorSubject<string>("Valor por defecto del dato en el servicio");

  override nuevoDato(dato: string): void {
    this.dato.next(dato);
  }
  override obteniendoObservableDato(): Observable<string> {
    return this.dato.asObservable();
  }

}
