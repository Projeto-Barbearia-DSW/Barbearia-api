import {listarAgendamento} from "../../repository/trabalhoRepository.js";

export default async function listarAgendamentos() {
    let registros = await listarAgendamento();
    return registros;
}