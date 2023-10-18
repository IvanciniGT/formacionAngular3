import { Observable, of } from "rxjs";
import { DatosDeUsuario } from "src/app/models/usuario.model";
import { UsuariosService } from "../usuario.service";
import { Injectable } from "@angular/core";

@Injectable()
// Le indico a Angular que puede usar una instancia de esta clase, 
// cuando alguien le solicite una instancia de la interfaz UsuariosService
export class UsuarioServiceFake extends UsuariosService {
    override getDatosDeTodosLosUsuariosDelMundoMundial(): Observable<DatosDeUsuario[]> {
        return of([
            {
                id: 1,
                nombre: "lucas",
                apellidos: "los que sea",
                edad: 33,
                email: "lucas@lucas.com"
            },
            {
                id: 2,
                nombre: "pepe",
                apellidos: "los que sea pepe",
                edad: 44,
                email: "pepe@pp.com"
            },
            {
                id: 4,
                nombre: "trini",
                apellidos: "los que sea trini",
                edad: 55,
                email: "trini@dad.com"
            }
        ])
    }
    
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