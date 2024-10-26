import {inserirServico} from "../../repository/trabalhoRepository.js";
import validarServico from "../../validation/validationServico.js";

export default async function inserirServicoService(servico) {
    validarServico(servico);

    let id = await inserirServico(servico);
    return id;
}