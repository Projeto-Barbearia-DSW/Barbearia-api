import {deletarAgendamento} from "../../repository/trabalhoRepository.js";

export default async function excluirAgendamentos(id) {
    if (!id) {
        throw new Error("ID do turma é obrigatório");
    }

    let linhasAfetadas = await deletarAgendamento(id);
    if (linhasAfetadas === 0) {
        throw new Error("Nenhum agendamento encontrado com o ID fornecido");
    }

    return linhasAfetadas;
}