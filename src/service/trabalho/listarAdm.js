import {listarAdmin} from "../../repository/trabalhoRepository.js";

export default async function listarAdm() {
    let registros = await listarAdmin();
    return registros;
}