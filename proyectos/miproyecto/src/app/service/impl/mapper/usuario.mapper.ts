import { DatosDeUsuario } from "src/app/models/usuario.model";
import { DatosDeUsuarioREST } from "../dto/usuario.dto.model";

export function datosUsuarioRest2datosUsuario(datosDeUsuarioRest:DatosDeUsuarioREST): DatosDeUsuario{
    return {
        id: datosDeUsuarioRest.id,
        nombre: datosDeUsuarioRest.nombre,
        apellidos: datosDeUsuarioRest.apellidos,
        edad: datosDeUsuarioRest.edad,
        email: datosDeUsuarioRest.email
    }
}