import {inserirServicoFeito} from "../../repository/trabalhoRepository.js";
import validarServicoFeito from "../../validation/validationServicoFeito.js";

export default async function inserirServicoService(servicoFeito) {
    validarServicoFeito(servicoFeito);

    let id = await inserirServicoFeito(servicoFeito);
    return id;
}