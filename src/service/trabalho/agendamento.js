import {inserirAgendamento} from '../../repository/trabalhoRepository.js';
import validarAgendamento from "../../validation/inserirValidation.js";


export default async function agendarTrabalho(agendar) {
    validarAgendamento(agendar);


    let id = await inserirAgendamento(agendar);
    return id;
}