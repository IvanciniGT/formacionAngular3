import { Observable, of } from "rxjs";
import { DatosDeUsuario } from "src/app/models/usuario.model";
import { UsuariosService } from "../usuario.service";
import { Injectable } from "@angular/core";

@Injectable()
// Le indico a Angular que puede usar una instancia de esta clase, 
// cuando alguien le solicite una instancia de la interfaz UsuariosService
export class UsuarioServiceFake extends UsuariosService {
    
    getDatosDeUsuario(id: number): Observable<DatosDeUsuario> {
        return of({
            id,
            nombre: "lucas",
            apellidos: "los que sea",
            edad: 33,
            email: "lucas@loquesea.com"
        })
        // La función of... genera un observable de un dato...
        // IDEAL PARA PRUEBAS !
    }
    
}