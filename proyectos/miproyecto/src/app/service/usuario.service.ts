import { Observable } from "rxjs";
import { DatosDeUsuario } from "../models/usuario.model";

export abstract class UsuariosService {
    abstract getDatosDeUsuario(id:number):Observable<DatosDeUsuario>;
    // La función em devuelva "la promesa" de que en algún momento me entregará los 
    // datos de un usuario

    
}