import {listarHorarios} from "../../repository/trabalhoRepository.js";

export default async function listarHora() {
    let registros = await listarHorarios();
    return registros;
}