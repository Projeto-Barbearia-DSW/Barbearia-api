import {deletarServico} from "../../repository/trabalhoRepository.js";

export default async function excluirServico(id) {
    if (!id) {
        throw new Error("ID do serviço é obrigatório");
    }

    let linhasAfetadas = await deletarServico(id);
    if (linhasAfetadas === 0) {
        throw new Error("Nenhum serviço encontrado com o ID fornecido");
    }

    return linhasAfetadas;
}