import { Observable } from "rxjs"

export abstract class ServicioService {
  abstract nuevoDato(dato:string):void
  abstract obteniendoObservableDato():Observable<string>
}
