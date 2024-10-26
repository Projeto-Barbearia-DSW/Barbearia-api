export default function validarServico(servico){
    if(!servico.imagemServico) throw new Error('imagem é obrigatório');
    if(!servico.nomeServico) throw new Error('nome é obrigatório');
    if(!servico.valorServico) throw new Error('Valor é obrigatório');
    if(!servico.tempoServico) throw new Error('tempo é obrigatório');
}