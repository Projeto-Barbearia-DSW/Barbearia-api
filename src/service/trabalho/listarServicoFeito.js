import {listarServicosFeitos} from "../../repository/trabalhoRepository.js";

export default async function listarServicoFeito() {
    let registros = await listarServicosFeitos();
    return registros;
}