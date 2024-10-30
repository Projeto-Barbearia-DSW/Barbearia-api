import {deletarServicoFeito} from "../../repository/trabalhoRepository.js";

export default async function excluirServicoFeito(id) {
    if (!id) {
        throw new Error("ID do turma é obrigatório");
    }

    let linhasAfetadas = await deletarServicoFeito(id);
    if (linhasAfetadas === 0) {
        throw new Error("Nenhum serviço encontrado com o ID fornecido");
    }

    return linhasAfetadas;
}