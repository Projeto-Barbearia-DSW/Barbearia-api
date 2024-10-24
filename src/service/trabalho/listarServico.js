import {listarServicos} from "../../repository/trabalhoRepository.js";

export default async function listarServico() {
    let registros = await listarServicos();
    return registros;
}