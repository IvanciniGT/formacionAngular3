import { Observable, catchError, map, of, throwError } from "rxjs";
import { DatosDeUsuario } from "src/app/models/usuario.model";
import { UsuariosService } from "../usuario.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { DatosDeUsuarioREST } from "./dto/usuario.dto.model";
import {datosUsuarioRest2datosUsuario} from "./mapper/usuario.mapper";

@Injectable()
export class UsuarioServiceImpl extends UsuariosService {


    readonly urlBackEnd = "http://localhost:3000/usuarios";

    constructor(private clienteHttp: HttpClient) {
        super();
    }

    override getDatosDeTodosLosUsuariosDelMundoMundial(): Observable<DatosDeUsuario[]> {
        let observableDelArray = this.clienteHttp.get<Array<DatosDeUsuarioREST>>(this.urlBackEnd)
        // Cuando me lleguen dtos, quiero que ejecutes un trabajo:
        let observableConDatosDeMiTipo:Observable<DatosDeUsuario[]> = observableDelArray.pipe(
            // Que ese array se mapee a otro array, pero de mi tipo:
            map(
                                                                    // Convertir cada dato del array en un dato de mi tipo:
                                                                    // v
                    datosRecibidos                => datosRecibidos.map(dato => datosUsuarioRest2datosUsuario(dato))
                        // ^^                           
                        // Array<DatosUsuarioREST>--> Array<DatosUsuario>
            )
        )
        return observableConDatosDeMiTipo;
    }
    override getDatosDeUsuario(id: number): Observable<DatosDeUsuario> {
        let respuestaComoObservable: Observable<DatosDeUsuarioREST> = this.clienteHttp.get<DatosDeUsuarioREST>(this.urlBackEnd+"/"+id);
        // Dejar configurado que los datos que nos lleguen,
        let nuevoObservable: Observable<DatosDeUsuario> = respuestaComoObservable.pipe(
            // mapeen a un objeto de nuestro propio tipo:
            map ( usuario => datosUsuarioRest2datosUsuario(usuario) )
            // Al hacer una petición , puede ocurrir:
            // - que no haya servicio de backend: ERROR
            // - que el usuario que estoy pidiendo no exista
            // - que me devuelva una cosa que no espero : BUG .... Me debe devolver lo que espero... API REST:
                // METODO: GET
                // ENDPOINT: /usuarios/{id:number}
                // Si el usuario existe: 
                    // RESPUESTA: JSON {id:number, nombre:string, apellidos:string, edad:number, email:string}
                    // CODIGO DE RESPUESTA: 200
                // Si el usuario no existe: 
                    // CODIGO DE RESPUESTA: 404: NOT_FOUND
           ).pipe(
                catchError( (error:HttpErrorResponse) => {
                    if (error.status == 500)
                        // Mostrar un overlay en la app "Servicio no disponible... espere unos segundos mientras intentamos reconectar"
                        // ADEMAS HAGO OTRAS COSAS
                        return throwError(()=>new Error("No hay servicio de backend"))
                    //if(error.status == 404)
                    return throwError(()=>error) // ESTE ERROR SERA CAPTURADO POR QUIEN ESTE SUSCRITO AL OBSERVABLE
                }))
           
        return nuevoObservable;
    }

    override borrarUsuario(id: number): Observable<Object> {
        return this.clienteHttp.delete(this.urlBackEnd+"/"+id)
        // ERRORS .pipe
    }
}
